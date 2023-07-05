import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ChatSidebar from '../components/ChatSidebar'
import ChatAllUsers from '../components/ChatAllUsers'
import ChatSpecific from '../components/ChatSpecific'
import Search from '../components/Search'
import GroupTap from '../components/GroupTap'
import { useNavigate } from 'react-router-dom'
import SpepicProfile from '../components/SpepicProfile'
import AddpeopleSearch from '../components/AddpeopleSearch'

function Chats() {

    const [searchtap, setsearchtap] = useState(1);
    const navigate = useNavigate()
    const [specifictap, setspecifictap] = useState(1);


    const token = localStorage.getItem('ca_token')



    useEffect(() => {
        !token && navigate('/')
    }, []);

    return (
        token && <section className='flex h-screen w-full border-2'>

            <div className='w-20 hidden md:flex flex-col justify-between py-4 items-center gap-y-8 border-2'>
                <ChatSidebar />
            </div>

            <div className='w-full md:w-[400px] border-2'>
                {
                    searchtap === 1 && <ChatAllUsers setsearchtap={setsearchtap} /> ||
                    searchtap === 2 && <Search setsearchtap={setsearchtap} /> ||
                    searchtap === 3 && <GroupTap setsearchtap={setsearchtap} />
                }
            </div>

            <div className={`flex-grow hidden md:block border-4`}>
                {
                    specifictap === 1 && <ChatSpecific setspecifictap={setspecifictap} /> ||
                    specifictap === 2 && <SpepicProfile setspecifictap={setspecifictap} /> ||
                    specifictap === 3 && <AddpeopleSearch setspecifictap={setspecifictap} />
                }
            </div>

        </section>
    )
}

export default Chats