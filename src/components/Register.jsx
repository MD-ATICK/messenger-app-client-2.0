import React, { useContext, useState } from 'react'
import axios from 'axios'
import { ContextContent } from '../provider/ContextProvider'
import { PulseLoader } from 'react-spinners';

function Register({ setactivetaps }) {


    const [Loading, setLoading] = useState(false);
    const { email, setemail, password, setpassword, name, setname, avatar, setavatar } = useContext(ContextContent)

    const RegisterHanlder = async (e) => {
        e.preventDefault()

        setLoading(true)
        if (!avatar) return;

        const form = new FormData()
        form.append("image", avatar)
        const { data, status } = await axios.post(`https://api.imgbb.com/1/upload?key=6226ca30d95b139a79184223cfbc266a`, form)
        if (status === 200) {
            setavatar(data.data.url)
            try {
                const { status } = await axios.post(`${import.meta.env.VITE_LOCALPATH}/api/user/register`, { name, email, password, avatar: data.data.url })
                if (status === 201) {
                    setLoading(false)
                    setactivetaps(1)
                }
            } catch (error) {
                setLoading(false)
                console.log(error)
            }

        }
    }

    return (
        <div className='max-w-[500px] w-full border-2'>
            <img src="./messenger.png" className='border-4 border-white h-12 w-12 mx-auto' alt="" />
            <h2 className='text-[27px] font-[600] pt-3 pb-4 fonts text-center text-stone-800'>Sign in to your account</h2>
            <form action='' onSubmit={RegisterHanlder} className='w-full flex flex-col bg-white rounded-lg p-10 py-8'>
                <div className='mb-4'>
                    <label htmlFor="email" className='text-stone-500 text-[16px] tracking-wide font-sans font-semibold' >Name *</label>
                    <input className=' text-stone-600 text-[16px] font-semibold font-sans tracking-[0.020em]' value={name} onChange={(e) => setname(e.target.value)} type="text" name="" id="" />
                </div>
                <div className='mb-4'>
                    <label htmlFor="email" className='text-stone-500 text-[16px] tracking-wide font-sans font-semibold' >Email Address *</label>
                    <input className=' text-stone-600 text-[16px] font-semibold font-sans tracking-[0.020em]' value={email} onChange={(e) => setemail(e.target.value)} type="text" name="" id="" />
                </div>
                <div className='mb-4'>
                    <label htmlFor="email" className='text-stone-500 text-[16px] tracking-wide font-sans font-semibold' >Password *</label>
                    <input className=' text-stone-600 font-sans font-semibold tracking-wide' value={password} onChange={(e) => setpassword(e.target.value)} type="text" name="" id="" />
                </div>
                <div className='mb-4'>
                    <label htmlFor="email" className='text-stone-500 text-[16px] tracking-wide font-sans font-semibold' >Photo *</label>
                    <input className=' text-stone-600 font-sans font-semibold tracking-wide' onChange={(e) => setavatar(e.target.files[0])} type="file" name="" id="" />
                </div>
                <button className='bg-[#0089d3] py-2 mt-4 rounded-lg shadow-lg text-white' > {Loading ? <PulseLoader color='#f5f5f5' size={10} /> : 'Register'} </button>
                <p className='text-stone-600 pt-6 text-center'>alrealy have account? <span className='underline text-stone-600 cursor-pointer' onClick={() => setactivetaps(1)} >sign in account</span></p>
            </form>
        </div>
    )
}

export default Register