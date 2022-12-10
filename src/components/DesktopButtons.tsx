import React from 'react'
import Button from './Button';

type DesktopButtonsProps = {
    onPublishSelected: () => void;
    onResetSelected: () => void;
}

const DesktopButtons = ({ onPublishSelected, onResetSelected }: DesktopButtonsProps) => {
    return (
        <div className="hidden md:flex flex-row">
            <div className="flex-1">t</div>
            <div className="flex-1 pl-12 pr-4">
                <div className="flex flex-col gap-y-3">
                    <Button onClick={onPublishSelected}>Publish to twitter</Button>
                    <Button onClick={onResetSelected}>Reset</Button>
                </div>
            </div>
        </div>
    )
}

export default DesktopButtons