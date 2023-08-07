"use client"

import axios from 'axios';
import { Image } from 'cloudinary-react';
import { useState } from 'react';
import Navbar from '../components/navbar';
import Cookies from 'js-cookie';
import { baseUrl } from '../api/api';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const NewPost = () => {
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState("")
    const [publicId, setPublicId] = useState("")
    const id = Cookies.get("id")
    const token = Cookies.get("token")

    const [formData, setFormData] = useState({
        title: "",
        publicId: "",
        imageUrl: "",
        userId: id,
        body: ""
    })

    const handleChange = (e) => {
        setFormData((formData) => ({
            ...formData,
            [e.target.name]: e.target.value
        }))
    }

    //Cloudinary functions
    const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME
    const upload_preset = process.env.NEXT_PUBLIC_UPLOAD_PRESET
    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', upload_preset);

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                formData
            )

            setImageUrl(response.data.url)
            setPublicId(response.data.public_id)
            setFormData((formData) => ({
                ...formData,
                imageUrl: response.data.url,
                publicId: response.data.public_id
            }))
        } catch (error) {
            console.error("Error while uploading image:", error)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0];
        handleImageUpload(file)
    }

    const handelDragOver = (e) => {
        e.preventDefault()
    }

    //delete pic function
    

    //form functions
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const toastId = "post"
        const headers = {
            "authorization": token
        }
        console.log(headers)
        await axios.post(`${baseUrl}/post/new`, formData, {
            headers: headers,
        })
            .then((res) => {
                toast.success(res.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    toastId,
                    transition: Slide
                })
                setLoading(false)
                window.location.replace('/')
            })
            .catch((error) => {
                console.error(error)
                setLoading(false)

                toast.error(error.response.data.error, {
                    position: toast.POSITION.TOP_CENTER,
                    toastId
                })

            })
    };

    console.log(formData)
    return (
        <div>
            <Navbar />
            <div className="toast-container"><ToastContainer limit={1} /></div>
            <div className="w-full px-8 py-3 pt-24">
                <div className="flex justify-between items-center pr-2">
                    <p className="text-4xl font-bold">Create your post</p>
                    <button className="w-24 flex justify-center items-center bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 mt-10" type='submit' form='postForm'>
                        {loading ? <span className="loader"></span> : "Publish"}
                    </button>
                </div>
                <div className="px-8 py-5 border-4 border-[#ff0000] rounded-lg mt-8">
                    <div
                        className="border-2 border-dashed border-[grey] p-5 py-32 mb-3 flex justify-center"
                        onDrop={handleDrop}
                        onDragOver={handelDragOver}
                    >
                        {
                            imageUrl ?
                                <div>
                                    <Image cloudName={cloudName} publicId={publicId} width="300" />
                                    <button className="flex justify-center items-center bg-red-500 hover:bg-red-600 text-white rounded-lg py-2" onClick={handleImageDelete}>Delete</button>
                                </div> :
                                <p>Drag and drop your image here</p>
                        }
                    </div>
                    <form className="center" id='postForm' onSubmit={handleSubmit}>
                        <div className="flex flex-col relative mb-[35px] w-full h-[50px] inputbox mt-10">
                            <input
                                type="text"
                                name="title"
                                required
                                className="input absolute top-0 left-0 w-full border-2 border-solid border-black outline-none bg-none p-[10px] rounded-[10px]"
                                onChange={handleChange}
                            />
                            <label>
                                Title
                            </label>
                        </div>
                        <div className="flex flex-col relative w-full h-[100px] inputbox mt-10 mb-20">
                            <textarea
                                type="text"
                                name="body"
                                required
                                className="input absolute top-0 left-0 w-full border-2 border-solid border-black outline-none bg-none p-[10px] rounded-[10px]"
                                onChange={handleChange}
                            />
                            <label>
                                Tell Your Story
                            </label>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewPost;