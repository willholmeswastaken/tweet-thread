import type { ChangeEvent } from 'react';
import React from 'react'

type ComposerProps = {
    onChange: (text: string) => void;
    value: string;
};

const Composer = ({ onChange, value }: ComposerProps) => {
    const onComposerValueChange = (e: ChangeEvent<HTMLTextAreaElement>): void => onChange(e.target.value);
    return (
        <textarea
            onChange={onComposerValueChange}
            value={value}
            name="tweet-content"
            id="tweet-content"
            className="w-full h-full rounded-2xl focus:outline-[#1da1f2] caret-black p-6"
            placeholder='Start composing your tweet here...'
            cols={30}
            rows={10} />
    )
};

export default Composer