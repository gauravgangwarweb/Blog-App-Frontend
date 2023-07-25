"use client"

import axios from "axios";
import Cookies from "js-cookie";

import { baseUrl } from "../api/api";
import { Slide, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "@/redux/reducers/utilsSlice";


const Login = () => {
    const[loading, setLoading] = useState(false)
    const registerPage = useSelector(state => state.utils.register)
    // console.log(registerPage);
    const router = useRouter()
    const dispatch = useDispatch()

    const [emailLog, setEmailLog] = useState("")
    const [passwordLog, setPasswordLog] = useState("")

    const handleChange = (e, key) => {
        key(e.target.value)
    }

    const handleLogIn = async (e) => {
        e.preventDefault();
        setLoading(true)
        const toastId = "login"
        await axios.post(`${baseUrl}/login`, {
            email: emailLog,
            password: passwordLog
        })
            .then((res) => {
                Cookies.set('token', res.data.token, { expires: 1, sameSite: 'strict' })
                Cookies.set('id', res.data.user._id, { expires: 1, sameSite: 'strict' })
                Cookies.set('profileImg', res.data.user.imageUrl, { expires: 1, sameSite:'strict' })

                toast.success(res.data.msg, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    toastId,
                    transition: Slide
                })
                dispatch(login(true))
                setLoading(false)
                router.push('/')
            })
            .catch((error) => {
                console.error(error)
                setLoading(false)

                toast.error(error.response.data.error, {
                    position: toast.POSITION.TOP_CENTER,
                    toastId
                })

            })
    }

    const handleClick = () => {
        dispatch(register())
    }

    return (
        <div className={registerPage == false ? "hidden" : "flex flex-col"}>
            <h2 className="text-3xl font-bold text-center">Login</h2>
            <form className="mt-8" onSubmit={handleLogIn}>
                <div className="flex flex-col relative mb-[35px] w-[300px] h-[50px] inputbox">
                    <input
                        type="text"
                        name="email"
                        required
                        className="input absolute top-0 left-0 w-full border-2 border-solid border-red-600 outline-none bg-none p-[10px] rounded-[10px]"
                        onChange={e => handleChange(e, setEmailLog)}
                    />
                    <label>
                        Email
                    </label>
                </div>
                <div className="flex flex-col relative mb-[50px] w-[300px] h-[50px] inputbox">
                    <input
                        type="password"
                        name="password"
                        required
                        className="input absolute top-0 left-0 w-full border-2 border-solid border-red-600 outline-none bg-none p-[10px] rounded-[10px]"
                        onChange={e => handleChange(e, setPasswordLog)}
                    />
                    <label>Password</label>
                </div>
                <button className="w-full flex justify-center items-center bg-red-500 hover:bg-red-600 text-white rounded-lg py-2" type="submit">
                    {loading ? <span class="loader"></span> : "LogIn"}
                </button>
            </form>
            <p className="mt-2 text-center">
                Don’t have an account yet?
                <span
                    className="text-red-500 cursor-pointer"
                    onClick={handleClick}
                >
                    Register
                </span>
            </p>
        </div>
    );
}

export default Login;