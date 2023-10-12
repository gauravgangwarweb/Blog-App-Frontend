"use client"

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setPost } from "@/redux/reducers/postSlice";

const Card = (props) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const handleClick = () => {
        dispatch(setPost(props.id));
        router.push('/post')
    }

    return (
        <div
            className="flex flex-col gap-2 justify-center py-3 pb-5 rounded-lg bg-[#EEEEEE] cursor-pointer box-shadow"
            onClick={handleClick}
        >
            <div className="rounded-lg flex justify-center w-42 h-42 overflow-hidden">
                <img src={props.imageUrl} alt={props.name} className="rounded-lg max-w-fit max-h-44 object-cover" />
            </div>
            <div className="px-1">
                <p className="text-lg text-black font-medium px-6">{props.title}</p>
            </div>
        </div>
    );
}

export default Card;