import axios from "axios";
import { baseUrl } from "../api/api";
import Card from "../components/card";

const getData = async () => {
    try {
        const response = await axios.get(`${baseUrl}/posts`);
        return response.data;
    } catch (error) {
        console.log(error);
        // You may want to handle the error and return an appropriate value here
        return null;
    }
}

const Hero2 = async () => {
    const post = await getData()

    return (
        <div className="px-8 mt-6">
            <div className="flex justify-between border-b-2 border-black">
                <div></div>
                <button className="flex justify-center items-center bg-red-500 hover:bg-red-600 font-medium text-white px-2.5 py-1.5 rounded-lg mb-2">New Post</button>
            </div>
            <div>
                {post.data.length == 0 || post == null ?
                    <p>There are no posts to show</p> :
                    <Card />
                }
            </div>
        </div>
    );
}

export default Hero2;