import { Transition, Dialog } from '@headlessui/react';
import React, { Fragment, useMemo } from 'react'
import type TweetPublishStatus from '../types/TweetPublishStatus'

type ThreadPublishModalProps = {
    tweetPublishStatus: TweetPublishStatus;
    tweetThreadUrl: string;
    isOpen: boolean;
    onClose: () => void;
};

const ThreadPublishModal = ({ tweetPublishStatus, tweetThreadUrl, isOpen, onClose }: ThreadPublishModalProps) => {
    const threadPublished = useMemo<boolean>(() => tweetPublishStatus === 'published', [tweetPublishStatus]);
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="flex flex-col items-center w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Thread Publish {threadPublished ? 'Successful' : 'Failed'}!
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            {
                                                threadPublished ? 'Click the button below to view your thread!' : 'Oops, something went wrong. Please try again, if this fails then log out and log back in.'
                                            }
                                        </p>
                                    </div>

                                    <div className="mt-4 w-full flex flex-col sm:flex-row gap-y-2 sm:gap-y-0 sm:gap-x-2">
                                        {
                                            threadPublished && (
                                                <a
                                                    href={tweetThreadUrl}
                                                    className={`w-full rounded-md border border-transparent px-4 py-2 text-sm text-center font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                                                >
                                                    View tweet
                                                </a>
                                            )
                                        }
                                        <button
                                            type="button"
                                            className={`w-full rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white ${threadPublished ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600 '}focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
                                            onClick={onClose}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default ThreadPublishModal