"use client"

import axios from 'axios';
import dotenv from 'dotenv'
import { Image } from 'cloudinary-react';
import { useState } from 'react';
import Navbar from '../components/navbar';

const NewPost = () => {
    const [imageUrl, setImageUrl] = useState("")
    const [publicId, setPublicId] = useState("")
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

    return (
        <div>
            <Navbar />
            <div className="w-full px-8 py-3 pt-24">
                <div className="flex justify-between pr-2">
                    <p className="text-4xl font-bold">Create your post</p>
                    <button className="text-white text-lg bg-[#ff0000] px-3 py-1 rounded-lg mt-5">Publish</button>
                </div>
                <div className="px-8 py-5 border-4 border-[#ff0000] rounded-lg mt-8">
                    <div
                        className="border-2 border-dashed border-[grey] p-5 py-32 mb-3 flex justify-center"
                        onDrop={handleDrop}
                        onDragOver={handelDragOver}
                    >
                        {
                            imageUrl ? <Image cloudName={cloudName} publicId={publicId} width="300" /> : <p>Drag and drop your image here</p>
                        }
                    </div>
                    <form className="center">
                        <div className="flex flex-col relative mb-[35px] w-full h-[50px] inputbox mt-10">
                            <input
                                type="text"
                                name="title"
                                required
                                className="input absolute top-0 left-0 w-full border-2 border-solid border-black outline-none bg-none p-[10px] rounded-[10px]"
                                onChange={e => console.log("hii")}
                            />
                            <label>
                                Title
                            </label>
                        </div>
                        <div className="flex flex-col relative mb-[35px] w-full h-[50px] inputbox mt-10">
                            <textarea
                                type="text"
                                name="body"
                                required
                                className="input absolute top-0 left-0 w-full border-2 border-solid border-black outline-none bg-none p-[10px] rounded-[10px]"
                                onChange={e => console.log("hii")}
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