"use client"

import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

const NewPostButton = () => {
    const [user, setUser] = useState("")
    const id = Cookies.get('id')
    const router = useRouter()
    const [innerWidth, setInnerWidth] = useState(0)

    useEffect(() => {
        setInnerWidth(window.innerWidth)
        setUser(id)
    }, [])

    const handleClick = () => {
        const toastId = "error"
        if (innerWidth <= 768) {
            toast.error("This feature is active only for desktop users", {
                position: toast.POSITION.TOP_CENTER,
                toastId
            })
        } else if (!user && innerWidth > 768) {
            toast.error("Login First", {
                position: toast.POSITION.TOP_CENTER,
                toastId
            })
        } else if (user && innerWidth > 768) {
            router.push('/new-post')
        }
    }

    return (
        <div>
            <button
                className="flex justify-center items-center bg-red-500 hover:bg-red-600 font-medium text-white px-2.5 py-1.5 rounded-lg mb-2"
                onClick={handleClick}
            >
                New Post
            </button>

        </div>
    );
}

export default NewPostButton;