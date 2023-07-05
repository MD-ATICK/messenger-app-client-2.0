
import React, { useContext } from 'react'
import { ContextContent } from '../provider/ContextProvider'

function ChatSidebar() {

    const { user } = useContext(ContextContent)


    return (
        <>
            <div className='flex flex-col gap-y-5'>
                <svg xmlns="http://www.w3.org/2000/svg" fill='#616161ce' viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 hover:fill-[#0073ba] hover:scale-105 cursor-pointer text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#616161ce" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 hover:fill-[#0073ba] hover:scale-105 cursor-pointer hover:text-[#0073ba] text-[#6a6a6ac9]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 hover:text-red-800 hover:scale-105">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                <div className='relative'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#616161ce" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 hover:fill-[#0073ba] hover:scale-105 cursor-pointer hover:text-[#0073ba] text-[#61616173]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                    </svg>
                    <p className='w-[18px] h-[18px] bg-[#0063c1] rounded-full flex justify-center items-center text-[12px] text-white absolute -right-[3px] -top-[2px] border-[3px] border-white'>5</p>
                </div>
            </div>
            <div className=' relative'>
                <img className='h-10 w-10 rounded-full object-cover shadow-lg' src={user ? user.avatar : "https://i.pinimg.com/736x/55/9a/7c/559a7c4557f80baa87d66fbbb51373eb.jpg"} alt="" />
                <p className='w-[13px] h-[13px] bg-[#12b041] rounded-full absolute -right-1 top-0 border-[3px] border-white'></p>
            </div>
        </>
    )
}

export default ChatSidebar