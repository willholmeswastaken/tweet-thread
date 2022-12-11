import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { useState } from "react";
import Composer from "../components/Composer";
import DesktopButtons from "../components/DesktopButtons";
import MobileButtons from "../components/MobileButtons";
import ThreadPreview from "../components/ThreadPreview";
import type { ThreadView } from "../types/ThreadView";
import { requireAuth } from "../utils/requireAuth";
import { tweetSplitter } from "../utils/tweet-splitter";

export const getServerSideProps = requireAuth(async (_) => {
    return { props: {} };
}, 'dashboard');

const Dashboard: NextPage = () => {
    const { data: sessionData } = useSession();
    const [threadText, setThreadText] = useState<string>('');
    const [view, setView] = useState<ThreadView>('compose');
    const tweets = useMemo<Array<string>>(() => tweetSplitter(threadText), [threadText]);

    const onThreadTextUpdate = (newThreadText: string): void => setThreadText(newThreadText);

    const onPreviewSelected = () => setView('preview');
    const onComposeSelected = () => setView('compose');

    const onResetSelected = () => setThreadText('');

    return (
        <div className="flex flex-col">
            <button onClick={() => console.log(sessionData)}>clikc me</button>
            <div className="flex flex-col md:flex-row mt-4">
                <div className={`p-4 w-full flex-1 ${view === 'compose' ? 'flex' : 'hidden'} md:flex`}>
                    <Composer onChange={onThreadTextUpdate} value={threadText} />
                </div>
                <div className={`p-4 flex-1 ${view === 'preview' ? 'flex' : 'hidden'} md:flex`}>
                    <ThreadPreview tweets={tweets} />
                </div>
                <MobileButtons
                    view={view}
                    onPublishSelected={onPreviewSelected}
                    onPreviewSelected={onPreviewSelected}
                    onComposeSelected={onComposeSelected}
                    onResetSelected={onResetSelected}
                />
            </div>
            <DesktopButtons
                onPublishSelected={onPreviewSelected}
                onResetSelected={onResetSelected}
            />
        </div>
    )
}

export default Dashboard;
