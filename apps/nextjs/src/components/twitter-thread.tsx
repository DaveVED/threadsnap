"use client";

import { Bookmark, Eye, Heart, MessageCircle, Repeat2 } from 'lucide-react';
import { motion } from 'framer-motion';

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

const tweetVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

function TweetAction({ icon, count, className }: TweetActionProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        "flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary",
        className,
      )}
    >
      {icon}
      <span className="text-sm">{count}</span>
    </motion.button>
  );
}

export default function TwitterThread({ thread }: TwitterThreadProps) {
  return (
    <motion.div 
      className="mx-auto max-w-2xl overflow-hidden rounded-lg bg-background/50 backdrop-blur-sm shadow-lg"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      <div className="p-4">
        <h2 className="text-lg font-semibold">Twitter Thread</h2>
      </div>
      <div>
        {thread.map((tweet, index) => (
          <motion.div
            key={tweet.id}
            variants={tweetVariants}
            custom={index}
            className="px-4 py-3 transition-colors hover:bg-muted/40"
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
                  <motion.div
                    key={mediaIndex}
                    className="mt-3 overflow-hidden rounded-lg bg-muted/20"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 * (mediaIndex + 1) }}
                  >
                    <img
                      src={media.media_url_https}
                      alt="Tweet media"
                      className="h-auto w-full"
                    />
                  </motion.div>
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
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

