import axios from 'axios'
import React, { useContext, useState , useEffect } from 'react'
import { ContextContent } from '../provider/ContextProvider';

function AddpeopleSearch({setsearchtap}) {

    const token = localStorage.getItem('ca_token')

    const { setselectedchat } = useContext(ContextContent)

    const [users, setusers] = useState(null);

    const [search, setsearch] = useState('');
    const [searchChange, setsearchChange] = useState(false);

    const HandlerSearch = (e) => {
        setsearchChange(!searchChange)
        setsearch(e.target.value)
    }

    const usersFecth = async () => {
        try {
            const { data, status } = await axios.get(`${import.meta.env.VITE_LOCALPATH}/api/user/allusers?search=${search}`, { headers: { Authorization: `Bearer ${token}` } })
            if (status === 200) {
                setusers(data.users)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        usersFecth()
    }, [searchChange]);


    return (
        <>
            <div>
                <div className='h-[50px] relative shadow-md flex px-6 gap-x-5 items-center'>
                    <svg onClick={() => setsearchtap(2)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 p-1 px-2 rounded-lg hover:bg-gray-100 cursor-pointer text-stone-500 hover: font-semibold h-9">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    <input type="text" value={search} onChange={HandlerSearch} placeholder='search ...' className='h-full w-full focus:outline-none font-[500] placeholder:font-[400] text-stone-600  placeholder:text-stone-500 tracking-wide' />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 absolute top-3 text-stone-500 cursor-pointer right-3 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
        
                </div>
                <div>
                    <button>Add Comfirm</button>
                </div>
                <div className='flex flex-col px-2 justify-center items-center'>
                    { users && users.length > 0 ? users.map((i) => {
                            const { avatar, name, email, _id } = i
                            return (
                                <div key={_id} className='flex w-full items-center gap-x-6 rounded-md cursor-pointer hover:bg-gray-100 mt-2 m-1 py-1 px-5'>
                                    <img className='w-10 h-10 rounded-full shadow-lg object-cover' title={email} src={avatar} alt="" />
                                    <p className='font-[600] capitalize text-stone-700 text-[16px]'>{name}</p>
                                </div>
                            )
                        }) : <p className=' tracking-wide'>No user found</p>
                    }
                </div>
            </div>
        </>
    )
}

export default AddpeopleSearch