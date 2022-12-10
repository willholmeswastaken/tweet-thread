import React from 'react'

type ButtonProps = {
    children: string;
    onClick: () => void;
    className?: string;
};

const Button = ({ children, onClick, className }: ButtonProps) => {
    return (
        <button
            className={`rounded-full bg-white/10 px-4 py-1 font-semibold text-white no-underline transition hover:bg-white/20 w-full ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button