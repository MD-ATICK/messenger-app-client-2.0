import React, { useContext, useEffect, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { ContextContent } from '../provider/ContextProvider'
import axios from 'axios';
import io from 'socket.io-client'

const ENDPOINT = "http://localhost:9999" // => server port 
let socket, selectedChatCompare;

function ChatSpecific({ setspecifictap }) {

    const { selectedchat, user, chatchange, setchatchange } = useContext(ContextContent)

    const [newmessage, setnewmessage] = useState('');
    const [messages, setmessages] = useState(null);

    const token = localStorage.getItem('ca_token')

    const [socketConnected, setsocketConnected] = useState(false);

    const SendMessageHanlder = async (e) => {
        e.preventDefault()
        setnewmessage('')
        try {
            const { data, status } = await axios.post(`${import.meta.env.VITE_LOCALPATH}/api/message`, { chatId: selectedchat._id, content: newmessage }, { headers: { Authorization: `Bearer ${token}` } })
            if (status === 201) {

                socket.emit('new message', data.message)
                setmessages([...messages, data.message])
                setchatchange(!chatchange)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const FetchMessages = async () => {
        if (!selectedchat) return;
        try {
            const { data, status } = await axios.get(`${import.meta.env.VITE_LOCALPATH}/api/message/${selectedchat._id}`, { headers: { Authorization: `Bearer ${token}` } })
            if (status === 200) {
                socket.emit('join chat', selectedchat._id)
                setmessages(data.messages)
                return data.messages
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        socket = io(ENDPOINT)
        user && socket.emit("setup", user) // kono message fataite hole 
        socket.on('connection', () => setsocketConnected(true))
    }, [])

    useEffect(() => {
        FetchMessages()
        selectedChatCompare = selectedchat

    }, [selectedchat]);

    useEffect(() => {
        console.log('render' , messages)
        socket.on('message recived', (newMsgRecived) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMsgRecived.chat._id) {
                // give notification
            } else {
                console.log('messages', ...messages, 'newmsgg', newMsgRecived)
                setmessages([...messages, newMsgRecived])
            }
        })
    }, [selectedchat]);




    return (
        <>
            {
                !selectedchat ? <div className='h-[80vh] flex justify-center items-center'><p className=' tracking-wide'>No Message ar Createing ...</p></div> :
                    <div className='relative'>
                        {/* => extra */}
                        <div className='h-[60px] flex justify-between px-6 items-center shadow-md'>
                            <div className='flex items-center gap-x-4'>
                                <div className=' relative'>
                                    <div className='h-10 w-10 flex flex-wrap gap-x-1 justify-center items-center'>
                                        {selectedchat && selectedchat.isGroupChat ? selectedchat.users.slice(0, 3).map((i, index) => {
                                            return <img key={index} className='w-4 h-4 rounded-full object-cover shadow-lg' src={i.avatar} alt="" />
                                        }) : <img className='h-10 w-10 rounded-full object-cover shadow-lg' src={selectedchat.users[1].avatar} alt="" />
                                        }
                                    </div>
                                    {/* <img className='h-10 w-10 rounded-full object-cover shadow-lg' src={selectedchat && selectedchat.users[1].avatar} alt="" /> */}
                                    <p className='w-[14px] h-[14px] bg-[#03902d] rounded-full absolute -right-1 top-0 border-[3px] border-white'></p>
                                </div>
                                <div>
                                    <p className='font-[600] text-stone-600 text-[16px]'>{selectedchat && selectedchat.isGroupChat ? selectedchat.chatName : selectedchat.users[0].name}</p>
                                    <p className='text-[13px] text-stone-500 font-[400] tracking-wide'>Active</p>
                                </div>
                            </div>
                            <BsThreeDots onClick={() => setspecifictap(2)} className='text-[#0b7ba8] text-4xl p-2 rounded-full hover:bg-gray-100 cursor-pointer' />
                        </div>

                        {/* => messages all - IMT */}
                        <div className='p-6 h-[90vh] pb-28 border-b-4 overflow-y-scroll'>
                            {
                                messages && user && messages.length > 0 ? messages.map((i, index) => {
                                    const previousMsg = index > 0 ? messages[index - 1] : null
                                    if (i.sender._id === user._id) {
                                        if (previousMsg && previousMsg.sender._id === i.sender._id) {
                                            return <div key={index} className='w-full inline-flex justify-end'> <p className='text-[15px] mt-1 inline-flex justify-end tracking-wide mr-8 font-sans  text-gray-100 rounded-full px-4 py-[6px]  bg-[#0099ff] font-[500]'>{i.content}</p></div>
                                        } else {
                                            return <div key={index} className='flex flex-col  justify-end mt-4 mb-2'>
                                                <div>
                                                    <div className='relative gap-x-3 flex mt-8 justify-end ml-3'>
                                                        <p className='text-[14px] pl-6 tracking-wide font-sans font-[500] text-stone-500'>{i.sender.name} <span className='text-[13px] pl-1 font-[400]'>11:05 PM</span></p>
                                                        <img className='h-10 w-10 rounded-full object-cover shadow-sm shadow-blue-900' src={i.sender.avatar} alt="" />
                                                        <p className='w-[14px] h-[14px] bg-[#03902d] rounded-full absolute -right-1 top-0 border-[3px] border-white'></p>
                                                    </div>
                                                    <div className=' inline-flex  flex-col w-full items-end'>
                                                        <p className='text-[15px] tracking-wide mr-10 font-sans  text-gray-100 rounded-full px-4 py-[6px] mt-2 bg-[#0099ff] font-[500]'>{i.content}</p>
                                                        {/* <p className='text-[15px] tracking-wide mr-10 font-sans  text-gray-100 rounded-full px-4 py-[6px] mt-2 bg-[#0099ff] font-[500]'>{i.content}</p> */}
                                                        {/* <p className='text-[15px] tracking-wide font-sans  text-gray-100 rounded-full px-4 py-[6px] mt-2 bg-[#0099ff] font-[500]'>Hello vai?</p>
                                                <p className='text-[15px] tracking-wide     font-sans  text-gray-100 rounded-full px-4 py-[6px] mt-2 bg-[#0099ff] font-[500]'>oi beda kmn acos?</p>
                                            <p className='text-[15px] tracking-wide font-sans  text-gray-100 rounded-full px-4 py-[6px] mt-2 bg-[#0099ff] font-[500]'>?</p> */}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    } else {
                                        if (previousMsg && previousMsg.sender._id === i.sender._id) {
                                            return <div key={index} className='w-full inline-flex justify-start'> <p className='text-[15px] mt-1 inline-flex justify-end tracking-wide ml-[52px] font-sans  text-gray-100 rounded-full px-4 py-[6px]  bg-[#0099ff] font-[500]'>{i.content}</p></div>
                                        } else {
                                            return <div key={index} className='flex mt-8 gap-x-3'>
                                                <div className=' relative'>
                                                    <img className='h-10 w-10 rounded-full object-cover shadow-lg' src={i.sender.avatar} alt="" />
                                                    <p className='w-[14px] h-[14px] bg-[#03902d] rounded-full absolute -right-1 top-0 border-[3px] border-white'></p>
                                                </div>
                                                <div>
                                                    <p className='text-[14px] tracking-wide font-sans font-[500] text-stone-500'>{i.sender.name}<span className='text-[13px] pl-1 font-[400]'>11:05 PM</span></p>
                                                    <div className=' inline-flex flex-col items-start'>
                                                        <p className='text-[15px] tracking-wide font-sans  text-gray-100 rounded-full px-4 py-[6px] mt-2 bg-[#0099ff] font-[500]'>{i.content}</p>
                                                        {/* <p className='text-[15px] tracking-wide font-sans  text-gray-100 rounded-full px-4 py-[6px] mt-2 bg-[#0099ff] font-[500]'>{i.content} herlrlfdlj lfd slf dl  </p> */}
                                                        {/* <p className='text-[15px] tracking-wide font-sans  text-gray-100 rounded-full px-4 py-[6px] mt-2 bg-[#0099ff] font-[500]'>Hello vai?</p>
                                                <p className='text-[15px] tracking-wide font-sans  text-gray-100 rounded-full px-4 py-[6px] mt-2 bg-[#0099ff] font-[500]'>oi beda kmn acos?</p>
                                                <p className='text-[15px] tracking-wide font-sans  text-gray-100 rounded-full px-4 py-[6px] mt-2 bg-[#0099ff] font-[500]'>?</p> */}
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    }
                                }) : <p className='text-center tracking-wide mt-6 text-stone-600'>Write something ...</p>
                            }
                            {/* <div className='flex gap-x-3'>
                                <div className=' relative'>
                                    <img className='h-10 w-10 rounded-full object-cover shadow-lg' src="https://i.pinimg.com/736x/55/9a/7c/559a7c4557f80baa87d66fbbb51373eb.jpg" alt="" />
                                    <p className='w-[14px] h-[14px] bg-[#03902d] rounded-full absolute -right-1 top-0 border-[3px] border-white'></p>
                                </div>
                                <div>
                                    <p className='text-[14px] tracking-wide font-sans font-[500] text-stone-500'>John Due <span className='text-[13px] pl-1 font-[400]'>11:05 PM</span></p>
                                    <div className=' inline-flex flex-col items-start'>
                                        <p className='text-[15px] tracking-wide font-sans  text-gray-100 rounded-full px-4 py-[6px] mt-2 bg-[#0099ff] font-[500]'>hi!</p>
                                        <p className='text-[15px] tracking-wide font-sans  text-gray-100 rounded-full px-4 py-[6px] mt-2 bg-[#0099ff] font-[500]'>Hello vai?</p>
                                        <p className='text-[15px] tracking-wide font-sans  text-gray-100 rounded-full px-4 py-[6px] mt-2 bg-[#0099ff] font-[500]'>oi beda kmn acos?</p>
                                        <p className='text-[15px] tracking-wide font-sans  text-gray-100 rounded-full px-4 py-[6px] mt-2 bg-[#0099ff] font-[500]'>?</p>
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-end mt-2'>
                                <div>
                                    <p className='text-[14px] pl-6 tracking-wide font-sans font-[500] text-stone-500'>John Due <span className='text-[13px] pl-1 font-[400]'>11:05 PM</span></p>
                                    <div className=' inline-flex flex-col items-end'>
                                        <p className='text-[15px] tracking-wide font-sans  text-gray-100 rounded-full px-4 py-[6px] mt-2 bg-[#0099ff] font-[500]'>hi!</p>
                                        <p className='text-[15px] tracking-wide font-sans  text-gray-100 rounded-full px-4 py-[6px] mt-2 bg-[#0099ff] font-[500]'>Hello vai?</p>
                                        <p className='text-[15px] tracking-wide  font-sans  text-gray-100 rounded-full px-4 py-[6px] mt-2 bg-[#0099ff] font-[500]'>oi beda kmn acos?</p>
                                        <p className='text-[15px] tracking-wide font-sans  text-gray-100 rounded-full px-4 py-[6px] mt-2 bg-[#0099ff] font-[500]'>?</p>
                                    </div>
                                </div>
                                <div className='relative'>
                                    <img className='h-10 w-10 rounded-full object-cover shadow-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_wzfUiq3tsmFIvqZBBiySfHsXZZv9iaXPxw&usqp=CAU" alt="" />
                                    <p className='w-[14px] h-[14px] bg-[#03902d] rounded-full absolute -right-1 top-0 border-[3px] border-white'></p>
                                </div>
                            </div> */}

                        </div>

                        {/* => extra */}
                        <div className='w-full border-t-[2px] border-stone-300 flex justify-center items-center z-50 shadow-lg absolute bg-white bottom-0 left-0 h-[80px] px-10 '>
                            <p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 text-blue-600 cursor-pointer h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            </p>
                            <form action='' onSubmit={SendMessageHanlder} className=' flex-grow flex items-center gap-x-2 px-4'>
                                <input type="text" value={newmessage} onChange={(e) => setnewmessage(e.target.value)} className='rounded-full h-[40px] py-2 px-4 placeholder:text-stone-500 font-[400] outline-none text-[15px] tracking-wide bg-gray-200 w-full border' placeholder='Writing message ...' />
                                <button type='submit'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 p-[6px] text-white bg-blue-500 rounded-full h-9">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                </svg>
                                </button>
                            </form>
                        </div>
                    </div>
            }

        </>
    )
}

export default ChatSpecific