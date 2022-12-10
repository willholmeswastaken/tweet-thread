import React from 'react'

type TweetProps = {
    tweet: string;
    hasTrailingTweet: boolean;
};

const Tweet = ({ tweet, hasTrailingTweet }: TweetProps) => {
    return (
        <div className="flex flex-row gap-x-3 h-full">
            <div className="flex flex-col items-center">
                <img
                    src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png"
                    alt="profile image"
                    className="rounded-full w-16 h-16" />
                {
                    hasTrailingTweet && <div className="h-full bg-blue-500 w-1 "></div>
                }
            </div>
            <div className="flex-1">
                {
                    tweet.length === 0
                        ? <p className="italic">Start typing to see the preview</p>
                        : <p style={{ wordBreak: 'break-word' }}>{tweet}</p>
                }
            </div>
        </div>
    )
}

export default Tweet