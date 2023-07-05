import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { PulseLoader } from 'react-spinners';

function GroupTap({ setsearchtap }) {

    const token = localStorage.getItem('ca_token')

    const [searchChange, setsearchChange] = useState(false);

    const [Loading, setLoading] = useState('');
    const [search, setsearch] = useState('');
    const [users, setusers] = useState(null);

    const [grpname, setgrpname] = useState('');

    const [checkedUsers, setcheckedUsers] = useState([]);

    const HandlerSearch = (e) => {
        setsearchChange(!searchChange)
        setsearch(e.target.value)
    }

    const CreateGroupHanlder = async () => {
        if(checkedUsers.length <= 2) return alert('at last add 3 member')
        try {
            const { data, status } = await axios.post(`${import.meta.env.VITE_LOCALPATH}/api/chat/group`, { grpname , users : JSON.stringify(checkedUsers)}, { headers: { Authorization: `Bearer ${token}` } })
            if (status === 201) {
                setsearchtap(1)
            }
        } catch (error) { 
        }
    }


    const usersFecth = async () => {
        try {
            setLoading(true)
            const { data, status } = await axios.get(`${import.meta.env.VITE_LOCALPATH}/api/user/allusers?search=${search}`, { headers: { Authorization: `Bearer ${token}` } })
            if (status === 200) {
                setusers(data.users)
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }


    const handleChange = (user) => {
        const Find = checkedUsers.find((i) => i._id === user._id)

        if (Find) {
            const filter = checkedUsers.filter((i) => i._id !== user._id)
            return setcheckedUsers(filter)
        }

        setcheckedUsers([...checkedUsers, user])

    }

    const HanlderRemover = (id) => {
        const filter = checkedUsers.filter((i) => i._id !== id)
        setcheckedUsers(filter)
    }

    useEffect(() => {
        usersFecth()
    }, [searchChange]);

    return (
        <div>
            {/* => top section of next and back */}
            <div className='p-3 flex justify-between'>
                <svg onClick={() => setsearchtap(2)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 p-1 px-2 rounded-lg hover:bg-gray-100 cursor-pointer text-stone-500 hover: font-semibold h-9">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <p onClick={CreateGroupHanlder} className="text-[18px] font-[600] py-2 px-5 hover:bg-gray-200 text-stone-700 rounded-md cursor-pointer" >Next</p>
            </div>

            {/* => seciton of search of participents */}
            <div className='h-[40px] px-4 mb-2'>
                <input type="text" value={search} onChange={HandlerSearch} className='rounded-full py-2 px-4 placeholder:text-stone-400 font-sans font-[600] outline-none text-[16px] tracking-wide bg-gray-200 h-full placeholder:font-medium w-full border' placeholder='Search ...' />
            </div>

            {/* => chat name  */}
            <div className='p-4'>
                <p className='font-[600] text-center'>Name your New Chat</p>
                <input value={grpname} onChange={(e) => setgrpname(e.target.value)} type="text" className='w-full outline-none border-b-2 py-2 mt-2 font-sans font-[600] tracking-wide px-3 placeholder:text-stone-400 border-gray-300' placeholder='Group Name (Required)' />
            </div>

            {/* => all checked push */}
            <div className=' flex items-center gap-x-4 p-4'>
                {
                    checkedUsers.length > 0 && checkedUsers.map((i) => {
                        const { avatar, name, _id } = i
                        return (
                            <div key={_id} className=' relative' onClick={(() => HanlderRemover(_id))}>
                                <img className='w-10 h-10 rounded-full shadow-lg object-cover' title={name} src={avatar} alt="" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" absolute -top-1 text-white shadow-lg -right-1 bg-blue-500 rounded-full p-[1px] w-4 cursor-pointer h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                        )
                    })
                }
            </div>

            {/* => all particiepent display by fetch */}
            <div className='p-4'>
                <p className='text-[15px] font-[500] text-stone-500'>All participent</p>
                <div className='flex flex-col px-2 justify-center items-center'>
                    {Loading ? <div className='m-4' >  <PulseLoader color='#0085b1' /> </div> :
                        users && users.length > 0 ? users.map((i) => {
                            const { avatar, name, email, _id } = i
                            return (
                                <div key={_id} className='flex w-full justify-between items-center gap-x-6 rounded-md cursor-pointer hover:bg-gray-100 mt-2 m-1 py-1 px-5 pr-10'>
                                    <div className='flex gap-x-5 items-center'>
                                        <img className='w-10 h-10 rounded-full shadow-lg object-cover' title={email} src={avatar} alt="" />
                                        <label htmlFor='atick' className='font-[600] capitalize text-stone-700 text-[16px]'>{name}</label>
                                    </div>
                                    <input type="checkbox" checked={checkedUsers.find((i) => i._id === _id ? true : false)} onClick={() => handleChange(i)} className='' name="atick" id="atick" />
                                </div>
                            )
                        }) : <p className=' tracking-wide'>No user found</p>
                    }
                </div>
            </div>

        </div>
    )
}

export default GroupTap