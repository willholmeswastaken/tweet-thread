import type { NextPage } from "next";
import type { ChangeEvent } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { requireAuth } from "../utils/requireAuth";

export const getServerSideProps = requireAuth(async (_) => {
    return { props: {} };
}, 'dashboard');

type ThreadView = 'compose' | 'preview';
const TWEET_MAX_CHARS = 280;

const Dashboard: NextPage = () => {
    const [threadText, setThreadText] = useState<string>('');
    const [view, setView] = useState<ThreadView>('compose');
    const tweets = useMemo<Array<string>>(() => {
        const res: Array<string> = [];
        for (let i = 0; i < threadText.length; i += TWEET_MAX_CHARS) {
            res.push(threadText.slice(i, i + TWEET_MAX_CHARS));
        }
        if (res.length === 0) res.push('');
        return res;
    }, [threadText]);
    const onThreadTextUpdate = (e: ChangeEvent<HTMLTextAreaElement>) => setThreadText(e.target.value);
    const onPreviewSelected = () => setView('preview');
    const onComposeSelected = () => setView('compose');
    const onResetSelected = () => setThreadText('');

    return (
        <div className="flex flex-col">
            <div className="flex flex-col md:flex-row mt-4">
                <div id="composer" className={`p-4 w-full flex-1 ${view === 'compose' ? 'flex' : 'hidden'} md:flex`}>
                    <textarea
                        onChange={onThreadTextUpdate}
                        value={threadText}
                        name="tweet-content"
                        id="tweet-content"
                        className="w-full h-full rounded-2xl focus:outline-[#1da1f2] caret-black p-6"
                        placeholder='Start composing your tweet here...'
                        cols={30}
                        rows={10} />
                </div>
                <div id="preview" className={`p-4 flex-1 ${view === 'preview' ? 'flex' : 'hidden'} md:flex`}>
                    <div className="flex flex-col bg-white rounded-2xl w-full p-4">
                        {
                            tweets && tweets.length > 0 && tweets.map((tweet, index) => (
                                <div key={index} className="flex flex-row gap-x-3 h-full">
                                    <div className="flex flex-col items-center">
                                        <img
                                            src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png"
                                            alt="profile image"
                                            className="rounded-full w-16 h-16" />
                                        {
                                            tweets.length > 1 && tweets.length !== (index + 1) && <div className="h-full bg-blue-500 w-1 "></div>
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
                            ))
                        }
                    </div>
                </div>
                <div id="mobile-buttons" className="flex flex-col md:hidden p-4 justify-center items-center gap-y-3">
                    {
                        view === 'compose'
                            ? <button
                                className="rounded-full bg-white/10 px-4 py-1 font-semibold text-white no-underline transition hover:bg-white/20 w-full"
                                onClick={onPreviewSelected}
                            >
                                Preview
                            </button>
                            : <>
                                <button
                                    className="rounded-full bg-white/10 py-1 font-semibold text-white no-underline transition hover:bg-white/20 w-full"
                                    onClick={onResetSelected}
                                >
                                    Publish to twitter
                                </button><button
                                    className="rounded-full bg-white/10 px-4 py-1 font-semibold text-white no-underline transition hover:bg-white/20 w-full"
                                    onClick={onComposeSelected}
                                >
                                    Edit
                                </button>
                            </>
                    }
                    {/* todo: Refactor button style to be a generic button component */}

                    <button
                        className="rounded-full bg-white/10 px-4 py-1 font-semibold text-white no-underline transition hover:bg-white/20 w-full"
                        onClick={onResetSelected}
                    >
                        Reset
                    </button>
                </div>
            </div>
            <div className="hidden md:flex flex-row">
                <div className="flex-1">t</div>
                <div className="flex-1 pl-12 pr-4">
                    <div className="flex flex-col gap-y-3">
                        <button
                            className="rounded-full bg-white/10 py-1 font-semibold text-white no-underline transition hover:bg-white/20 w-full"
                        >
                            Publish to twitter
                        </button>
                        <button
                            className="rounded-full bg-white/10 py-1 font-semibold text-white no-underline transition hover:bg-white/20 w-full"
                            onClick={onResetSelected}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
