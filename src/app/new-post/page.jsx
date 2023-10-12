"use client"

import { Slide, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { cloudName, imageUpload } from "../assets/cloudinaryFunctions";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { baseUrl } from "../api/api";
import axios from "axios";
import cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const NewPost = () => {
    const [imageUrl, setImageUrl] = useState("")
    const [title, setTitle] = useState("")
    const [publicId, setPublicId] = useState("")
    const [editorValue, setEditorValue] = useState("")
    const [loading, setLoading] = useState(false)
    const [userId, setuserId] = useState("")
    const [token, setToken] = useState("")
    const router = useRouter()
    useEffect(() => {
        setuserId(cookies.get("id"));
        setToken(cookies.get("token"))
    }, [])
    const handleImageUpload = async (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        const data = await imageUpload(file)
        setImageUrl(data.url)
        setPublicId(data.publicId)
    }
   
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const toastId = "post"
        const postData = {
            title,
            publicId,
            imageUrl,
            userId,
            body: editorValue
        }
        console.log(postData);
        if (!postData.title || !postData.publicId || !postData.imageUrl || !postData.userId || !postData.body) {
            setLoading(false)
            toast.error("Some of the post fields are empty. Please fill in all required fields.", {
                position: toast.POSITION.TOP_CENTER,
                toastId
            })
        } else {
            await axios.post(`${baseUrl}/post/new`, postData, {
                headers: {
                    Authorization: token, 
                },
            })
                .then((res) => {
                    setLoading(false)
                    console.log(res);
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
                    router.push('/')
                })
                .catch((error) => {
                    console.error(error)
                    setLoading(false)
                    toast.error(error, {
                        position: toast.POSITION.TOP_CENTER,
                        toastId
                    })
                })
        }
    }

    return (
        <div>
            <Navbar />
            <div className="toast-container"><ToastContainer limit={1} /></div>
            <div className="pt-28 px-8 gap-2 flex flex-col items-center">
                <div className="w-3/4 flex px-20 border-2 border-dashed py-10">
                    {
                        !imageUrl ?
                            <input
                                type="file"
                                onChange={handleImageUpload}
                                className="items-start justify-start"
                            /> :
                            <img src={imageUrl} alt="uploaded image" className="w-32" />
                    }
                </div>
                <form className="w-3/4 flex flex-col gap-5 px-20 border-2 py-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        className="text-4xl border placeholder:pl-1 crimson w-full px-2 py-1"
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                    <div className="border-black border w-full">
                        <ReactQuill
                            value={editorValue}
                            onChange={value => setEditorValue(value)}
                            modules={{
                                toolbar: [
                                    [{ 'header': [1, 2, false] }],
                                    [{ font: [] }, { size: [] }, 'bold', 'italic', 'underline', 'strike', 'blockquote', { color: [] }],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }, 'code-block', 'blockquote'],
                                    ['link', 'image'],
                                    ['clean']
                                ]
                            }}
                            theme="snow"
                            placeholder="Add your Story"
                        />
                    </div>
                    <button onClick={handleSubmit} className="bg-red-500 w-36 self-end text-white py-1 text-lg font-bold rounded-lg">Post</button>
                </form>

            </div>
        </div>
    );
}

export default NewPost;