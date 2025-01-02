"use client";

import { Bookmark, Eye, Heart, MessageCircle, Repeat2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { cn } from "~/lib/utils";

interface Tweet {
  id: number;
  full_text: string;
  user: {
    name: string;
    screen_name: string;
    profile_image_url_https: string;
  };
  tweet_created_at: string;
  reply_count: number;
  retweet_count: number;
  favorite_count: number;
  views_count: number;
  entities?: {
    media?: {
      media_url_https: string;
      type: string;
    }[];
  };
}

interface TwitterThreadProps {
  thread: Tweet[];
}

interface TweetActionProps {
  icon: React.ReactNode;
  count: number;
  className?: string;
}

function TweetAction({ icon, count, className }: TweetActionProps) {
  return (
    <button
      className={cn(
        "flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary",
        className,
      )}
    >
      {icon}
      <span className="text-sm">{count}</span>
    </button>
  );
}

export default function TwitterThread({ thread }: TwitterThreadProps) {
  return (
    <div className="mx-auto max-w-2xl overflow-hidden rounded-lg border bg-background">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">Twitter Thread</h2>
      </div>
      <div>
        {thread.map((tweet) => (
          <div
            key={tweet.id}
            className="border-b px-4 py-3 transition-colors last:border-b-0 hover:bg-muted/40"
          >
            <div className="flex gap-3">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage
                  src={tweet.user.profile_image_url_https}
                  alt={tweet.user.name}
                />
                <AvatarFallback>{tweet.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 text-sm">
                  <span className="truncate font-bold hover:underline">
                    {tweet.user.name}
                  </span>
                  <span className="truncate text-muted-foreground">
                    @{tweet.user.screen_name}
                  </span>
                </div>
                <p className="mt-0.5 whitespace-pre-wrap break-words text-[0.9375rem]">
                  {tweet.full_text}
                </p>
                {tweet.entities?.media?.map((media, mediaIndex) => (
                  <div
                    key={mediaIndex}
                    className="mt-3 overflow-hidden rounded-lg bg-muted/20"
                  >
                    <img
                      src={media.media_url_https}
                      alt="Tweet media"
                      className="h-auto w-full"
                    />
                  </div>
                ))}
                <div className="mt-3 flex max-w-md justify-between">
                  <TweetAction
                    icon={<MessageCircle className="h-4 w-4" />}
                    count={tweet.reply_count}
                    className="hover:text-blue-500"
                  />
                  <TweetAction
                    icon={<Repeat2 className="h-4 w-4" />}
                    count={tweet.retweet_count}
                    className="hover:text-green-500"
                  />
                  <TweetAction
                    icon={<Heart className="h-4 w-4" />}
                    count={tweet.favorite_count}
                    className="hover:text-pink-500"
                  />
                  <TweetAction
                    icon={<Eye className="h-4 w-4" />}
                    count={tweet.views_count}
                  />
                  <TweetAction
                    icon={<Bookmark className="h-4 w-4" />}
                    count={0}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
