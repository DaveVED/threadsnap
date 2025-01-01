export const mockThread = {
    author: "Dan Abramov",
    handle: "@dan_abramov",
    avatar: "/placeholder.svg?height=48&width=48",
    tweets: [
      {
        id: "1",
        content: "🧵 Let's talk about React Server Components and why they're a game changer for web development.",
        timestamp: "10:00 AM · Dec 31, 2023",
        likes: 1200,
        retweets: 400,
        replies: 50,
        views: 10000,
      },
      {
        id: "2",
        content: "1/ Server Components let you write UI that runs and renders on the server. This means you can access databases and filesystem directly in your components.",
        timestamp: "10:01 AM · Dec 31, 2023",
        likes: 800,
        retweets: 250,
        replies: 30,
        views: 8000,
      },
      {
        id: "3",
        content: "2/ They automatically split client and server code. You don't ship server code to the client, reducing bundle size significantly.",
        timestamp: "10:02 AM · Dec 31, 2023",
        likes: 900,
        retweets: 300,
        replies: 40,
        views: 9000,
      }
    ]
  }

export const mockThreadCode = `import React from 'react';

interface Tweet {
  id: string;
  content: string;
  timestamp: string;
  likes: number;
  retweets: number;
  replies: number;
  views: number;
}

interface ThreadProps {
  author: string;
  handle: string;
  avatar: string;
  tweets: Tweet[];
}

export const TwitterThread: React.FC<ThreadProps> = ({ author, handle, avatar, tweets }) => {
  return (
    <div className="rounded-lg border bg-white p-4 dark:bg-gray-800 dark:border-gray-700 space-y-4">
      {tweets.map((tweet, index) => (
        <div key={tweet.id} className="flex space-x-4">
          {index === 0 && (
            <img src={avatar} alt={author} className="w-12 h-12 rounded-full" />
          )}
          {index !== 0 && <div className="w-12" />}
          <div className="flex-1 space-y-2">
            {index === 0 && (
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold">{author}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {handle}
                </span>
              </div>
            )}
            <p className="text-sm leading-loose">{tweet.content}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center space-x-1">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                <span>{tweet.replies}</span>
              </span>
              <span className="flex items-center space-x-1">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                <span>{tweet.retweets}</span>
              </span>
              <span className="flex items-center space-x-1">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                <span>{tweet.likes}</span>
              </span>
              <span className="flex items-center space-x-1">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                <span>{tweet.views}</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const thread = ${JSON.stringify(mockThread, null, 2)};

  return (
    <TwitterThread
      author={thread.author}
      handle={thread.handle}
      avatar={thread.avatar}
      tweets={thread.tweets}
    />
  );
}`

