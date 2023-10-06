"use client"

import Navbar from "../components/navbar";
import Quill from "quill";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const Post = () => {
    const quillConfig = {
        modules: {
            toolbar: false,
        },
        formats: [],
    };

    const editorStyles = {
        border: 'none !important'
    };

    const demo = {
        title: "Demo post which shows the post page",
        imageUrl: "http://res.cloudinary.com/dz27v8vsy/image/upload/v1696348603/new-coin_r7adoz.png",
        body: "<p>This is the post body which demonstrate sthe demo post body. Here all the body of the post will be shown evey one has there own story to share.</p>"

    }

    return (
        <div>
            <Navbar />
            <div className="px-48 flex flex-col items-center pt-28">
                <div className="red mt-2 w-full flex flex-col items-center">
                    <img src={demo.imageUrl} alt="post-thumbnail" className="w-3/4" />
                    <h2 className="text-4xl self-start px-36 font-medium mt-5">{demo.title}</h2>
                    <div className="px-36">
                        <ReactQuill
                            value={demo.body}
                            readOnly={true}
                            modules={quillConfig.modules}
                            formats={quillConfig.formats}
                            style={editorStyles}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;