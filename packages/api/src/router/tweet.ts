import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";
import { unstable_cache } from 'next/cache';

import { publicProcedure } from "../trpc";

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
  ['twitter-thread'],
  { revalidate: 3600, tags: ['twitter-thread'] } // Cache for 1 hour
);

export const tweetRouter = {
  byThreadId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      try {
        const tweets = await fetchAllTweets(input.id);
        return {
          status: 200,
          data: tweets,
        };
      } catch (error) {
        console.error("Error fetching thread:", error);
        return {
          status: 500,
          error: "An error occurred while fetching the thread",
        };
      }
    }),
} satisfies TRPCRouterRecord;

