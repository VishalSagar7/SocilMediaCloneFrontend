import { Avatar } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/authSlice';
import { LuMessageCircleCode } from "react-icons/lu";

const ChatPage = () => {

    const { user, suggestedUsers, selectedUser } = useSelector(store => store.auth);
    const isOnline = false;
    const dispatch = useDispatch();


    return (
        <div className='flex ml-[16%] h-screen' >
            <section className=' w-full md:w-1/4 mb-4'>
                <h1 className='font-bold my-4 px-3 text-xl'>{user?.username}</h1>
                <hr className='mb-4 border-gray-300' />

                <div className='overflow-y-auto h-[80vh]'>
                    {
                        suggestedUsers?.map((suggestedUser) => {
                            return (
                                <div
                                    onClick={() => dispatch(setSelectedUser(suggestedUser))}
                                    className='flex gap-3 items-center p-3 hover:bg-gray-100 cursor-pointer'
                                    key={suggestedUser?._id}
                                >
                                    <Avatar src={suggestedUser?.profilePicture} />
                                    <div className='flex flex-col'>
                                        <span className='font-medium'>{suggestedUser?.username}</span>
                                        <span
                                            className={`text-xs font-bold ${isOnline ? 'text-green-600' : 'text-red-600'}`}
                                        >
                                            {isOnline ? "online" : "offline"}
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </section>

            {
                selectedUser ? (
                    <section className='flex-1 border-l border-gray-300 flex flex-col h-full'>
                        <div className='flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10'>
                            <Avatar src={selectedUser?.profilePicture} />
                            <div className='flex flex-col'>
                                <span>{selectedUser?.username}</span>
                            </div>
                        </div>

                        messages ayenge

                        <div className='flex items-center p-4 border-t border-gray-300'>
                            <input
                                type="text" className='flex-1 mr-2 focus-visible:ring-transparent'
                                placeholder='Messages...'
                            />
                            <button>Send</button>
                        </div>

                    </section>
                ) : (
                    <div className='flex flex-col items-center justify-center mx-auto'>
                        <LuMessageCircleCode className='w-32 h-32 my-4' />
                        <h1 className='font-medium text-xl'>Your messages</h1>
                        <span>Send a message to start a chat.</span>
                    </div>
                )
            }
        </div>
    )
}

export default ChatPage;
