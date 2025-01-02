import type { TRPCRouterRecord } from "@trpc/server";
import { unstable_cache } from "next/cache";
import { z } from "zod";

import { eq, sql } from "@acme/db";
import {
  CreateSearchSchema,
  Searches,
  searchTotals,
  User,
  UserSavedHistory,
} from "@acme/db/schema";

import { protectedProcedure, publicProcedure } from "../trpc";

async function fetchAllTweetsUncached(id: string): Promise<any[]> {
  let allTweets: any[] = [];
  let nextCursor: string | null = null;

  do {
    const url = new URL(`https://api.socialdata.tools/twitter/thread/${id}`);
    if (nextCursor) {
      url.searchParams.append("cursor", nextCursor);
    }

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${process.env.SOCIAL_DATA_API_KEY!}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    allTweets = allTweets.concat(data.tweets);
    nextCursor = data.next_cursor;

    // Respect rate limits, remove later.
    if (nextCursor) {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Wait 500ms between requests
    }
  } while (nextCursor);

  return allTweets;
}

const fetchAllTweets = unstable_cache(
  async (id: string) => fetchAllTweetsUncached(id),
  ["twitter-thread"],
  { revalidate: 3600, tags: ["twitter-thread"] }, // Cache for 1 hour
);

export const tweetRouter = {
  byThreadId: publicProcedure
    .input(z.object({ id: z.string(), userId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      try {
        const threadId = input.id;
        const tweets = await fetchAllTweets(threadId);

        const newSearch = CreateSearchSchema.parse({
          thread_id: threadId,
          user_id: input.userId || null,
          response_data: tweets,
          is_saved: false,
          is_active: true,
        });

        // Insert the new search record
        const searchRecord = await ctx.db
          .insert(Searches)
          .values(newSearch)
          .returning()
          .execute();

        // Update or insert into search_totals table
        await ctx.db
          .insert(searchTotals)
          .values({
            thread_id: threadId,
            total_searches: 1,
            last_searched_at: new Date(),
          })
          .onConflictDoUpdate({
            target: [searchTotals.thread_id],
            set: {
              total_searches: sql`${searchTotals.total_searches} + 1`,
              last_searched_at: new Date(),
            },
          })
          .execute();

        if (input.userId) {
          await ctx.db
            .update(User)
            .set({
              search_attempts: sql`${User.search_attempts} + 1`,
            })
            .where(eq(User.id, input.userId))
            .execute();
        }

        return {
          status: 200,
          data: tweets,
          searchId: searchRecord[0]?.id,
        };
      } catch (error) {
        console.error("Error fetching thread:", error);
        return {
          status: 500,
          error: "An error occurred while fetching the thread",
        };
      }
    }),

  saveThread: protectedProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        searchId: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Insert into user_saved_history
        await ctx.db
          .insert(UserSavedHistory)
          .values({
            user_id: input.userId,
            search_id: input.searchId,
            saved_at: new Date(),
          })
          .execute();

        return {
          status: 200,
          message: "Thread saved successfully.",
        };
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error saving thread:", error.message);
          return {
            status: 500,
            error: error.message,
          };
        }

        console.error("Error saving thread:", error);
        return {
          status: 500,
          error: "An error occurred while saving the thread.",
        };
      }
    }),
} satisfies TRPCRouterRecord;
