"use client"

import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const NewPostButton = () => {
    const [user, setUser] = useState("")
    const id = Cookies.get('id')
    useEffect(() => {
        setUser(id)
    }, [])
    const eroorMessage = () => {
        const toastId = "error"
        toast.error("Login First", {
            position: toast.POSITION.TOP_CENTER,
            toastId
        })
    }

    return (
        <div>
            {
                user ?
                    <Link
                        className="flex justify-center items-center bg-red-500 hover:bg-red-600 font-medium text-white px-2.5 py-1.5 rounded-lg mb-2"
                        href="/new-post"
                    >
                        New Post
                    </Link> :
                    <button
                        className="flex justify-center items-center bg-red-500 hover:bg-red-600 font-medium text-white px-2.5 py-1.5 rounded-lg mb-2"
                        onClick={eroorMessage}
                    >
                        New Post
                    </button>
            }

        </div>
    );
}

export default NewPostButton;