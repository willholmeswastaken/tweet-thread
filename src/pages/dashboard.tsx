import type { NextPage } from "next";
import { useCallback, useMemo } from "react";
import Composer from "../components/Composer";
import DesktopButtons from "../components/DesktopButtons";
import MobileButtons from "../components/MobileButtons";
import ThreadPreview from "../components/ThreadPreview";
import ThreadPublishModal from "../components/ThreadPublishModal";
import useTweetStore from "../store";
import type TweetPublishStatus from "../types/TweetPublishStatus";
import { requireAuth } from "../utils/requireAuth";
import { trpc } from "../utils/trpc";

export const getServerSideProps = requireAuth(async (_) => {
    return { props: {} };
}, 'dashboard');

const Dashboard: NextPage = () => {
    const state = useTweetStore();
    const tweetMutation = trpc.twitter.createTweetThread.useMutation();
    const isLoading = useMemo<boolean>(() => state.tweetPublishStatus === 'publishing', [state.tweetPublishStatus]);
    const showModal = useMemo<boolean>(() => (['published', 'failed'] as Array<TweetPublishStatus>).includes(state.tweetPublishStatus), [state.tweetPublishStatus]);
    const onCloseModal = useCallback(() => {
        if (state.tweetPublishStatus === 'published') {
            state.reset();
        } else {
            state.resetPublishStatus();
        }
    }, [state]);
    const onThreadTextUpdate = (newThreadText: string): void => state.setTweets(newThreadText);
    const onPreviewSelected = () => state.setView('preview');
    const onComposeSelected = () => state.setView('compose');
    const onPublishSelected = async () => await state.publishTweets(async () => {
        const tweetThreadUrl = await tweetMutation.mutateAsync({ tweets: state.tweets });
        return tweetThreadUrl;
    });
    const onResetSelected = () => state.reset();

    return (
        <>
            <div className="flex flex-col">
                <div className="flex flex-col md:flex-row mt-4">
                    <div className={`p-4 w-full flex-1 ${state.activeView === 'compose' ? 'flex' : 'hidden'} md:flex`}>
                        <Composer onChange={onThreadTextUpdate} value={state.tweetsAsSingularString} />
                    </div>
                    <div className={`p-4 flex-1 ${state.activeView === 'preview' ? 'flex' : 'hidden'} md:flex`}>
                        <ThreadPreview tweets={state.tweets} />
                    </div>
                    <MobileButtons
                        view={state.activeView}
                        isLoading={isLoading}
                        onPublishSelected={onPublishSelected}
                        onPreviewSelected={onPreviewSelected}
                        onComposeSelected={onComposeSelected}
                        onResetSelected={onResetSelected}
                    />
                </div>
                <DesktopButtons
                    isLoading={isLoading}
                    onPublishSelected={onPublishSelected}
                    onResetSelected={onResetSelected}
                />
            </div>
            <ThreadPublishModal
                isOpen={showModal}
                onClose={onCloseModal}
                tweetPublishStatus={state.tweetPublishStatus}
                tweetThreadUrl={state.tweetThreadUrl}
            />
        </>
    )
}

export default Dashboard;
