import React from 'react'
import type { ThreadView } from '../types/ThreadView'
import Button from './Button';

type MobileButtonsProps = {
    view: ThreadView;
    onPublishSelected: () => void;
    onPreviewSelected: () => void;
    onComposeSelected: () => void;
    onResetSelected: () => void;
};

const MobileButtons = ({ view, onPublishSelected, onPreviewSelected, onComposeSelected, onResetSelected }: MobileButtonsProps) => {
    return (
        <div className="flex flex-col md:hidden p-4 justify-center items-center gap-y-3">
            {
                view === 'compose'
                    ? <Button onClick={onPreviewSelected}>Preview</Button>
                    : <>
                        <Button onClick={onPublishSelected}>Publish to twitter</Button>
                        <Button onClick={onComposeSelected}>Edit</Button>
                    </>
            }
            <Button onClick={onResetSelected}>Reset</Button>
        </div>
    )
}

export default MobileButtons