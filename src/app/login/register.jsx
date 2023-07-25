"use client"

import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../api/api";
import { Slide, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/redux/reducers/utilsSlice";

const Register = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const registerPage = useSelector(state => state.utils.register)

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = "register"

        await axios.post(`${baseUrl}/user/new`, formData)
            .then((res) => {
                console.log(res);
                toast.success("User created successfully 🎉🎉", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    toastId,
                    transition: Slide
                })

                // router.push("/login")
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                    toastId
                })
            })
    }

    return (
        <div className={!registerPage ? "flex flex-col" : "hidden"}>
            <h2 className="text-3xl font-bold text-center">
                Register
            </h2>
            <form className="mt-8" onSubmit={handleSubmit}>
                <div className="flex flex-col relative mb-[35px] w-[300px] h-[50px] inputbox">
                    <input
                        type="text"
                        name="firstName"
                        required
                        onChange={handleChange}
                        className="input absolute top-0 left-0 w-full border-2 border-solid border-red-600 outline-none bg-none p-[10px] rounded-[10px]"
                    />
                    <label>
                        First Name
                    </label>
                </div>
                <div className="flex flex-col relative mb-[35px] w-[300px] h-[50px] inputbox">
                    <input
                        type="text"
                        name="lastName"
                        required
                        onChange={handleChange}
                        className="input absolute top-0 left-0 w-full border-2 border-solid border-red-600 outline-none bg-none p-[10px] rounded-[10px]"
                    />
                    <label>
                        Last Name
                    </label>
                </div>
                <div className="flex flex-col relative mb-[35px] w-[300px] h-[50px] inputbox">
                    <input
                        type="text"
                        name="email"
                        required
                        onChange={handleChange}
                        className="input absolute top-0 left-0 w-full border-2 border-solid border-red-600 outline-none bg-none p-[10px] rounded-[10px]"
                    />
                    <label>
                        Email
                    </label>
                </div>
                <div className="flex flex-col relative mb-[35px] w-[300px] h-[50px] inputbox">
                    <input
                        type="password"
                        name="password"
                        required
                        onChange={handleChange}
                        className="input absolute top-0 left-0 w-full border-2 border-solid border-red-600 outline-none bg-none p-[10px] rounded-[10px]"
                    />
                    <label>
                        Password
                    </label>
                </div>
                <button className="w-full flex justify-center items-center bg-red-500 hover:bg-red-600 text-white rounded-lg py-2" type="submit">
                    Register
                </button>
            </form>
            <p className="mt-2 text-center">
                Already have an account? 
                <span className="text-red-500 cursor-pointer" onClick={(e) => dispatch(register())}>
                    Login
                </span>
            </p>
        </div>
    );
}

export default Register;