"use client"

import { useState } from "react";
import Navbar from "../components/navbar";
import { Image } from "cloudinary-react";
import { cloudName, deleteImage, imageUpload } from "../assets/cloudinaryFunctions";

const NewPost = () => {
    const [imageUrl, setImageUrl] = useState("")
    const [publicId, setPublicId] = useState("")
    console.log(imageUrl, publicId)
    const handleImageUpload = async(e) => {
        e.preventDefault()
        const file = e.target.files[0]
        console.log(file)
        const data = await imageUpload(file)
        setImageUrl(data.url)
        setPublicId(data.publicId)
        console.log(data)
    }

    const handleDeleteImage = (e) => {
        e.preventDefault()
        deleteImage(publicId)
    }
    console.log(publicId)
    return (
        <div>
            <Navbar />
            <div className="pt-28 px-8 flex items-center">
                <form className="flex flex-col gap-5 pl-20">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        className="border-none bg-inherit text-6xl focus:outline-none placeholder:pl-1 crimson"
                    />
                    <input
                        type="text"
                        name="title"
                        placeholder="Tell your story"
                        className="border-none bg-inherit text-3xl focus:outline-none placeholder:pl-1 font-sans"
                    />
                </form>
                <div className="mt-10">
                    {
                        !imageUrl ?
                            <input
                                type="file"
                                accept=".jpg, .jpeg, .png, .svg"
                                className="border-2 border-[#ccc] p-4 cursor-pointer focus:outline-none invalid:border-[#e74c3c]"
                                onChange={handleImageUpload}
                            /> :
                            <div className="border-2 border-[#ccc] p-4 flex w-full gap-48 items-center">
                                <img src={imageUrl} alt="Uploaded Image" className="w-32" />
                                <button className="flex justify-center items-center bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 px-4" onClick={handleDeleteImage}>Delete</button>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default NewPost;