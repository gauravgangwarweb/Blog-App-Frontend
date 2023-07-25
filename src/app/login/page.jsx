"use client"

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./login";
import Register from "./register";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";


const page = () => {
    const [user, setUser] = useState(undefined)
    const userId = Cookies.get('profileImg') || undefined
    
    useEffect(() => {
        setUser(userId)
    })

    return (
        <div className="w-full min-h-[100vh] flex m-0 px-0 relative center">
            <div className="toast-container"><ToastContainer limit={1} /></div>
            <div className="hidden md:block md:w-2/3 bg-[url('https://res.cloudinary.com/dz27v8vsy/image/upload/v1689484277/blog-log_fhm2yc.png')] bg-cover bg-center bg-no-repeat">
            </div>
            <div className={user ? "w-full md:w-1/3 flex flex-col justify-center items-center": "hidden"}>
                <p>You are already logged in</p>
            </div>
            <div className={!user ? "w-full md:w-1/3 flex flex-col justify-center items-center": "hidden"}>
                <Login />
                <Register />
            </div>
        </div>
    );
}

export default page;