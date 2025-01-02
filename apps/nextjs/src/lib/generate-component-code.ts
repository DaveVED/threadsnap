export function generateTwitterThreadCode(threadData: any[]) {
  // Convert the thread data to a formatted string
  const formattedData = JSON.stringify(threadData, null, 2)
    .replace(/"([^"]+)":/g, "$1:") // Convert "key": to key:
    .replace(/"/g, "'"); // Convert double quotes to single quotes

  return `'use client'
  
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  import { MessageCircle, Repeat2, Heart, Eye, Bookmark } from 'lucide-react'
  import { cn } from "@/lib/utils"
  
  interface Tweet {
    id: number
    full_text: string
    user: {
      name: string
      screen_name: string
      profile_image_url_https: string
    }
    tweet_created_at: string
    reply_count: number
    retweet_count: number
    favorite_count: number
    views_count: number
    entities?: {
      media?: Array<{
        media_url_https: string
        type: string
      }>
    }
  }
  
  // Your thread data
  const sampleThread: Tweet[] = ${formattedData}
  
  interface TwitterThreadProps {
    thread?: Tweet[] // Made optional since we'll use sampleThread as default
  }
  
  interface TweetActionProps {
    icon: React.ReactNode
    count: number
    className?: string
  }
  
  function TweetAction({ icon, count, className }: TweetActionProps) {
    return (
      <button className={cn(
        "flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors", 
        className
      )}>
        {icon}
        <span className="text-sm">{count}</span>
      </button>
    )
  }
  
  export default function TwitterThread({ thread = sampleThread }: TwitterThreadProps) {
    return (
      <div className="bg-background border rounded-lg overflow-hidden max-w-2xl mx-auto h-[600px] flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Twitter Thread</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {thread.map((tweet) => (
            <div 
              key={tweet.id} 
              className="px-4 py-3 border-b last:border-b-0 hover:bg-muted/40 transition-colors"
            >
              <div className="flex gap-3">
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarImage src={tweet.user.profile_image_url_https} alt={tweet.user.name} />
                  <AvatarFallback>{tweet.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 text-sm">
                    <span className="font-bold truncate hover:underline">
                      {tweet.user.name}
                    </span>
                    <span className="text-muted-foreground truncate">
                      @{tweet.user.screen_name}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[0.9375rem] whitespace-pre-wrap break-words">
                    {tweet.full_text}
                  </p>
                  {tweet.entities?.media && tweet.entities.media.map((media, mediaIndex) => (
                    <div 
                      key={mediaIndex} 
                      className="mt-3 rounded-lg overflow-hidden bg-muted/20"
                    >
                      <img
                        src={media.media_url_https}
                        alt="Tweet media"
                        className="w-full h-auto"
                      />
                    </div>
                  ))}
                  <div className="flex justify-between mt-3 max-w-md">
                    <TweetAction 
                      icon={<MessageCircle className="w-4 h-4" />} 
                      count={tweet.reply_count}
                      className="hover:text-blue-500"
                    />
                    <TweetAction 
                      icon={<Repeat2 className="w-4 h-4" />} 
                      count={tweet.retweet_count}
                      className="hover:text-green-500"
                    />
                    <TweetAction 
                      icon={<Heart className="w-4 h-4" />} 
                      count={tweet.favorite_count}
                      className="hover:text-pink-500"
                    />
                    <TweetAction 
                      icon={<Eye className="w-4 h-4" />} 
                      count={tweet.views_count}
                    />
                    <TweetAction 
                      icon={<Bookmark className="w-4 h-4" />} 
                      count={0}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }`;
}
