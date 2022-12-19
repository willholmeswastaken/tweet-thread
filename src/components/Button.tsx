import React from 'react'

type ButtonProps = {
    children: string;
    onClick: () => void;
    className?: string;
    isLoading?: boolean;
    disabled?: boolean;
};

const Button = ({ children, onClick, className, isLoading, disabled }: ButtonProps) => {
    return (
        <button
            className={`inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-1 font-semibold text-white no-underline transition hover:bg-white/20 w-full disabled:cursor-not-allowed disabled:bg-gray-400 ${className}`}
            onClick={onClick}
            disabled={disabled || isLoading}
        >
            {
                isLoading && (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )
            }
            {children}
        </button>
    )
}

export default Button