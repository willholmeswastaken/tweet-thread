import React, { useMemo } from 'react'
import Tweet from './Tweet';

type ThreadPreviewProps = {
    tweets: Array<string>;
};

const ThreadPreview = ({ tweets }: ThreadPreviewProps) => {
    const hasMoreThanOneTweet = useMemo<boolean>(() => tweets.length > 1, [tweets]);
    const totalTweets = useMemo<number>(() => tweets.length, [tweets]);
    return (
        <div className="flex flex-col bg-white rounded-2xl w-full p-4 drop-shadow-2xl">
            {
                totalTweets > 0 && tweets.map((tweet, index) => (
                    <Tweet
                        key={index}
                        tweet={tweet}
                        hasTrailingTweet={hasMoreThanOneTweet && totalTweets !== (index + 1)}
                    />
                ))
            }
        </div>
    )
}

export default ThreadPreview