import React, { useContext } from 'react'
import { ContextContent } from '../provider/ContextProvider'
import axios from 'axios'
import { useState } from 'react'

function SpepicProfile({ setspecifictap }) {

    const { selectedchat , setselectedchat } = useContext(ContextContent)

    const token = localStorage.getItem('ca_token')

    const [renameShow, setrenameShow] = useState(false);
    const [rename, setrename] = useState(selectedchat && selectedchat.chatName);

    const RenameHanlder = async () => {
        try {
            const { data, status } = await axios.put(`${import.meta.env.VITE_LOCALHOST}/api/chat/rename`, { chatID: selectedchat._id, chatName: rename }, { headers: { Authorization: `Bearer ${token}` } })
            if (status === 201) {
                setrenameShow(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const AddPeopleHanlder = () => {
        setspecifictap(3)
    }

    const LeaveGroupHanlder = async () => {
        try {
            const { data, status } = await axios.put(`${import.meta.env.VITE_LOCALHOST}/api/chat/leaveGroup`, { chatID: selectedchat._id }, { headers: { Authorization: `Bearer ${token}` } })
            if (status === 201) {
                setselectedchat(null)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const dltUserHanlder = async (id) => {
        try {
            const { data, status } = await axios.put(`${import.meta.env.VITE_LOCALHOST}/api/chat/removeuser`, { chatID: selectedchat._id, userID: id }, { headers: { Authorization: `Bearer ${token}` } })
            if (status === 201) {
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        selectedchat &&
        <div className='h-screen flex-col gap-y-3 w-full flex items-center p-2 px-6'>
            {
                renameShow && <div className='h-screen flex justify-center items-center w-full bg-[#0101016c]'>
                    <div className='bg-white shadow-lg w-[400px] p-8'>
                        <label htmlFor="email" className='text-stone-500 text-[16px] tracking-wide font-sans font-semibold' >Rename Group *</label>
                        <input className=' text-stone-600 w-full text-[16px] font-semibold font-sans tracking-[0.020em]' value={rename} onChange={(e) => setrename(e.target.value)} type="text" name="" id="" />
                        <button onClick={RenameHanlder} className='bg-blue-500 hover:bg-blue-600 text-white rounded-lg mt-4 tracking-wide'>Save</button>
                    </div>
                </div>
            }
            <div className='p-3 flex w-full justify-between'>
                <svg onClick={() => setspecifictap(1)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 p-1 px-2 rounded-lg hover:bg-gray-100 cursor-pointer text-stone-500 hover: font-semibold h-9">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <p className="text-[18px] font-[600] py-2 px-5 hover:bg-gray-200 text-stone-700 rounded-md cursor-pointer" >Next</p>
            </div>
            <div className='h-28 w-28 relative bg-gray-200 pt-3 pb-2 shadow-gray-300 border-stone-300 rounded-full shadow-lg flex flex-wrap gap-x-1 justify-center items-center'>
                {selectedchat.isGroupChat ? selectedchat.users.slice(0, 3).map((i, index) => {
                    return <img key={index} className='w-10 h-10 rounded-full object-cover shadow-lg' src={i.avatar} alt="" />
                }) :
                    <img className='h-28 w-28 rounded-full object-cover shadow-lg' src={selectedchat.users[1].avatar} alt="" />
                }
                <p className='w-[18px] h-[18px] bg-[#03902d] rounded-full absolute right-0 top-3 border-[3px] border-white'></p>

            </div>
            <p className='text-2xl font-bold mt-3 capitalize text-stone-700 tracking-wide'>{selectedchat.isGroupChat ? selectedchat.chatName : selectedchat.users[1].name} </p>
            <div>
                <button onClick={() => setrenameShow(true)} >Rename</button>
                <button onClick={AddPeopleHanlder} >Add People</button>
                <button onClick={LeaveGroupHanlder} >Leave Group</button>
            </div>
            <div>
                <p>All users</p>
                <div className='flex flex-col px-2 justify-center items-center'>
                    {selectedchat && selectedchat.users.map((i) => {
                        const { avatar, name, email, _id } = i
                        return (
                            <div key={_id} className='flex w-full justify-between items-center gap-x-6 rounded-md cursor-pointer hover:bg-gray-100 mt-2 m-1 py-1 px-5 pr-10'>
                                <div className='flex gap-x-5 items-center'>
                                    <img className='w-10 h-10 rounded-full shadow-lg object-cover' title={email} src={avatar} alt="" />
                                    <label htmlFor='atick' className='font-[600] capitalize text-stone-700 text-[16px]'>{name}</label>
                                </div>
                                <button className='text-red-700' onClick={() => dltUserHanlder(_id)}>Dlt</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SpepicProfile