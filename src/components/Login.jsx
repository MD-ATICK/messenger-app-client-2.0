import React, { useContext, useState } from 'react'
import { ContextContent } from '../provider/ContextProvider'
import { useNavigate } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'
import axios from 'axios'

function Login({ setactivetaps }) {

    const { email, setemail, password, setpassword } = useContext(ContextContent)
    const [Loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const LoginHanlder = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data, status } = await axios.post(`${import.meta.env.VITE_LOCALPATH}/api/user/login`, { email, password })
            if (status === 201) {
                localStorage.setItem('ca_token', data.token)
                setLoading(false)
                navigate('/chats')
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <div className='max-w-[500px] w-full border-2'>
            <img src="./messenger.png" className='border-4 border-white h-12 w-12 mx-auto' alt="" />
            <h2 className='text-[27px] font-[600] pt-4 pb-6 fonts text-center text-stone-700'>Welcome in to your account</h2>
            <form action='' onSubmit={LoginHanlder} className='w-full flex flex-col bg-white rounded-lg p-10 py-14'>
                <div>
                    <label htmlFor="email" className='text-stone-500 text-[16px] tracking-wide font-sans font-semibold' >Email Address *</label>
                    <input className=' text-stone-600 text-[16px] font-semibold font-sans tracking-[0.020em]' value={email} onChange={(e) => setemail(e.target.value)} type="text" name="" id="" />
                </div>
                <div>
                    <label htmlFor="email" className='text-stone-500 text-[16px] tracking-wide font-sans font-semibold' >Password *</label>
                    <input className=' text-stone-600 font-sans font-semibold tracking-wide' value={password} onChange={(e) => setpassword(e.target.value)} type="text" name="" id="" />
                </div>
                <button className='bg-[#0089d3] py-2 mt-4 rounded-lg shadow-lg text-white' > {Loading ? <PulseLoader color='#f5f5f5' size={10} /> : 'Sign up'} </button>
                <p className='text-stone-600 pt-10 pb-2 text-center'>Now to Messenger? <span className='underline text-stone-600 cursor-pointer' onClick={() => setactivetaps(2)} >Create an account</span></p>
            </form>
        </div>
    )
}

export default Login