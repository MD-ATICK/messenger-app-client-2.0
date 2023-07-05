import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const ContextContent = createContext(null)



export default function ContextProvider({ children }) {


    const token = localStorage.getItem('ca_token')
    const [user, setuser] = useState(null);

    const [selectedchat, setselectedchat] = useState(null);

    const [chatchange, setchatchange] = useState(false);


    const [avatar, setavatar] = useState('');
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');


    const ContextInfo = {
        email,
        setemail,
        password,
        setpassword,
        name,
        setname,
        avatar,
        setavatar,
        user,
        setuser,
        selectedchat,
        setselectedchat,
        chatchange , 
        setchatchange ,
    }

    const userFetch = async () => {
        try {
            const { data, status } = await axios.get(`${import.meta.env.VITE_LOCALPATH}/api/user/me`, { headers: { Authorization: `Bearer ${token}` } })
            if (status === 202) {
                setuser(null)
                localStorage.removeItem('ca_token')
            } else if (status === 200) {
                setuser(data.user)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        token && userFetch()
    }, []);

    return <ContextContent.Provider value={ContextInfo} >
        {children}
    </ContextContent.Provider>

}