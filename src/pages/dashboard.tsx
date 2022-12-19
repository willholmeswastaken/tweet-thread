import type { NextPage } from "next";
import Head from "next/head";
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
    const isPublishable = useMemo<boolean>(() => state.tweetsAsSingularString.length > 0, [state.tweetsAsSingularString]);
    const onCloseModal = useCallback(() => {
        if (state.tweetPublishStatus === 'published') {
            state.reset();
        } else {
            state.resetPublishStatus();
        }
    }, [state]);

    const onThreadTextUpdate = (newThreadText: string): void => state.setTweets(newThreadText);
    const onPreviewSelected = (): void => state.setView('preview');
    const onComposeSelected = (): void => state.setView('compose');
    const onPublishSelected = async (): Promise<void> => await state.publishTweets(async () => {
        const tweetThreadUrl = await tweetMutation.mutateAsync({ tweets: state.tweets });
        return tweetThreadUrl;
    });
    const onResetSelected = (): void => state.reset();

    return (
        <>
            <Head>
                <title>Tweet Thread - Dashboard</title>
                <meta name="description" content="Twitter thread creation and publishing made easy." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
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
                        isPublishDisabled={!isPublishable}
                        onPublishSelected={onPublishSelected}
                        onPreviewSelected={onPreviewSelected}
                        onComposeSelected={onComposeSelected}
                        onResetSelected={onResetSelected}
                    />
                </div>
                <DesktopButtons
                    isLoading={isLoading}
                    isPublishDisabled={!isPublishable}
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