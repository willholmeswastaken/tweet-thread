import { signOut, useSession } from 'next-auth/react';
import React from 'react'

const Header = () => {
    const { data: sessionData } = useSession();
    if (!sessionData?.user) return null;
    const onSignOut = (): Promise<undefined> => signOut();
    return (
        <div className='flex flex-row m-4 md:m-5'>
            <div className='flex-grow'>
                <h1 className="font-extrabold tracking-tight text-white text-2xl sm:text-4xl">
                    Tweet<span className="text-[hsl(211,100%,70%)]">Thread</span>
                </h1>
                <span className='text-white italic hidden sm:block text-sm'>Twitter thread creation and publishing made easy.</span>
            </div>
            <button
                className="rounded-full bg-white/10 px-4 py-1 font-semibold text-white no-underline transition hover:bg-white/20 mr-2 h-8 text-sm"
                onClick={onSignOut}
            >
                Sign out
            </button>
        </div>
    )
}

export default Header