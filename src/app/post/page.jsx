"use client"

import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Quill from "quill";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../api/api";
import DOMPurify from "dompurify";

const Post = () => {
    const postId = useSelector(state => state.post)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState()

    const getData = async (postId) => {
        // setLoading(true)
        try {
            const response = await axios.get(`${baseUrl}/post/${postId.post}`);
            setLoading(false)
            return response.data;
        } catch (error) {
            setLoading(false)
            console.log(error);
            return null;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const post = await getData(postId);
            setData(post);
        };

        fetchData()
    }, [])

    console.log(data);
    const quillConfig = {
        modules: {
            toolbar: false,
        },
        formats: [],
    };

    const editorStyles = {
        border: 'none !important',
    };

    let sanitizedHTML = ""
    if (!loading) {
        sanitizedHTML = DOMPurify.sanitize(data.data.body);
    }

    return (
        <div>
            <Navbar />
            <div className="px-48 flex flex-col items-center pt-28">
                {
                    loading ?
                        <p>Post Loading</p> :
                        <div className="mt-2 w-full flex flex-col items-center pb-10">
                            <img src={data.data.imageUrl} alt="post-thumbnail" className="w-3/4" />
                            <h2 className="text-4xl self-start px-36 font-medium mt-5">{data.data.title}</h2>
                            <div
                                className="max-w-full self-start px-36 mt-10"
                                dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
                            />
                        </div>
                }
            </div>
        </div>
    );
}

export default Post;