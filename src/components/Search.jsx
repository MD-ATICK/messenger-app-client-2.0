import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { PulseLoader } from 'react-spinners'
import { ContextContent } from '../provider/ContextProvider'


function Search({ setsearchtap }) {

    const token = localStorage.getItem('ca_token')

    const { setselectedchat } = useContext(ContextContent)

    const [users, setusers] = useState(null);

    const [search, setsearch] = useState('');
    const [searchChange, setsearchChange] = useState(false);
    const [Loading, setLoading] = useState(false);

    const HandlerSearch = (e) => {
        setsearchChange(!searchChange)
        setsearch(e.target.value)
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

    const Accesschat = async (id) => {
        try {
            setLoading(true)
            const { data, status } = await axios.post(`${import.meta.env.VITE_LOCALPATH}/api/chat`, { oppositeUserId: id }, { headers: { Authorization: `Bearer ${token}` } })
            if (status === 201) {
                setselectedchat(data.olderChat[0])
                setLoading(false)
                setsearchtap(1)
            }
        } catch (error) { 
            setLoading(false)
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
                    <svg onClick={() => setsearchtap(1)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 p-1 px-2 rounded-lg hover:bg-gray-100 cursor-pointer text-stone-500 hover: font-semibold h-9">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    <input type="text" value={search} onChange={HandlerSearch} placeholder='search ...' className='h-full w-full focus:outline-none font-[500] placeholder:font-[400] text-stone-600  placeholder:text-stone-500 tracking-wide' />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 absolute top-3 text-stone-500 cursor-pointer right-3 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>

                </div>
                <div className='flex items-center p-4 gap-x-3 cursor-pointer duration-150 hover:bg-gray-100 rounded-lg m-3' onClick={() => setsearchtap(3)} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                    <p>Create an group</p>
                </div>
                <div className='flex flex-col px-2 justify-center items-center'>
                    {Loading ? <div className='m-4' >  <PulseLoader color='#0085b1' /> </div> :
                        users && users.length > 0 ? users.map((i) => {
                            const { avatar, name, email, _id } = i
                            return (
                                <div key={_id} onClick={() => Accesschat(_id)} className='flex w-full items-center gap-x-6 rounded-md cursor-pointer hover:bg-gray-100 mt-2 m-1 py-1 px-5'>
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

export default Search