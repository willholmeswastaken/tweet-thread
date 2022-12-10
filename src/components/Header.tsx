import { signOut, useSession } from 'next-auth/react';
import React from 'react'

const Header = () => {
    const { data: sessionData } = useSession();
    if (!sessionData?.user) return null;
    const onSignOut = (): Promise<undefined> => signOut();
    return (
        <div className='flex flex-row m-4 md:m-5'>
            <h1 className="flex-grow font-extrabold tracking-tight text-white text-3xl">
                Tweet<span className="text-[hsl(211,100%,70%)]">Thread</span>
            </h1>
            <button
                className="rounded-full bg-white/10 px-4 py-1 font-semibold text-white no-underline transition hover:bg-white/20 mr-2"
                onClick={onSignOut}
            >
                Sign out
            </button>
        </div>
    )
}

export default Header