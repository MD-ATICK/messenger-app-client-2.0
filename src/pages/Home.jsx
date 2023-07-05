
import React, { useEffect, useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register';
import { useNavigate } from 'react-router-dom';

function Home() {

  const [activetaps, setactivetaps] = useState(1);
  const navigate = useNavigate()

  const token = localStorage.getItem('ca_token')

  useEffect(() => {
      token && navigate('/chats')
  }, []);

  return (
    !token && <div className='h-screen bg-gray-200 p-6 w-full flex justify-center items-center'>
      {activetaps === 1 ? <Login setactivetaps={setactivetaps} /> :
        <Register setactivetaps={setactivetaps} />}
    </div>
  )
}

export default Home