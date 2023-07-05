
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { ContextContent } from '../provider/ContextProvider';

function ChatAllUsers({ setlastsideshow, setsearchtap }) {

  const token = localStorage.getItem('ca_token')
  const [mychats, setmychats] = useState(null);


  const { selectedchat, setselectedchat , chatchange } = useContext(ContextContent)


  const MyChats = async () => {
    try {
      const { data, status } = await axios.get(`${import.meta.env.VITE_LOCALPATH}/api/chat`, { headers: { Authorization: `Bearer ${token}` } })
      if (status === 200) {
        setmychats(data.myChats)
      }
    } catch (error) {
      console.log(error)
    }
  }



  const chatClick = (user) => {
    setselectedchat(user)
  }

  useEffect(() => {
    MyChats()
  }, [chatchange]);

  return (
    <>
      <div className='flex justify-between p-4'>
        <h1 className=' font-[700] text-[27px] text-stone-600' >Messages</h1>
        <div className='flex items-center'>
          <svg onClick={() => setsearchtap(2)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 bg-gray-200 cursor-pointer shadow-lg rounded-full p-[9px] text-stone-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-5 bg-gray-300 cursor-pointer shadow-lg rounded-full p-1 text-stone-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
          </svg> */}
        </div>
      </div>
      <div className='p-6 flex flex-col gap-y-3'>
        {
          mychats && mychats.map((i) => {
            const { users, isGroupChat, _id, chatName } = i
            // if(isGroupChat){
            // => aikane grouop ar kaj colbe
            // }
            return (
              <div title={_id} key={_id} onClick={() => chatClick(i)} className={`flex ${selectedchat && selectedchat._id === _id ? "bg-blue-500 duration-300" : "bg-gray-100 duration-300"} rounded-lg py-[6px] cursor-pointer px-3 justify-between`}>
                <div className='flex gap-x-4'>
                  <div className=' relative'>
                    <div className='h-10 w-10 flex flex-wrap gap-x-1 justify-center items-center'>
                      {isGroupChat ? users.slice(0, 3).map((i, index) => {
                        return <img key={index} className='w-4 h-4 rounded-full object-cover shadow-lg' src={i.avatar} alt="" />
                      }) :
                        <img className='h-10 w-10 rounded-full object-cover shadow-lg' src={users[1].avatar} alt="" />
                      }
                    </div>
                    <p className='w-[14px] h-[14px] bg-[#03902d] rounded-full absolute -right-1 top-0 border-[3px] border-white'></p>
                  </div>
                  <div>
                    <p className={`${selectedchat && selectedchat._id === _id ? "font-[500] text-white" : "text-stone-700 font-[600]"}  text-[16px]`}>{isGroupChat ? chatName : users[1].name}</p>
                    <p className={`text-[14px] ${selectedchat && selectedchat._id === _id ? "text-white font-[500]" : "text-stone-600 font-[600]"} font-sans tracking-wide`}>{i.latestMessage ?i.latestMessage.content : 'type new message!!' }</p>
                  </div>
                </div>
                <p className='text-[#0a0a0aca] text-[14px] font-[600] tracking-wider'>11:10 PM</p>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default ChatAllUsers