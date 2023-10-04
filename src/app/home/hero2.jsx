import axios from "axios";
import { baseUrl } from "../api/api";
import Card from "../components/card";
import NewPostButton from "./newPostButton";

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
    console.log(post.data)

    return (
        <div className="px-8 mt-6">
            <div className="flex justify-between border-b-2 border-black">
                <div></div>
                <NewPostButton />
            </div>
            <div className="mt-5">
                <Card />
                {/* {post.data.length == 0 || post == null ?
                    <p>There are no posts to show</p> :
                    post.data.map(e => (
                        <Card title={e.title} imageUrl={e.imageUrl} />
                    ))
                } */}
            </div>
        </div>
    );
}

export default Hero2;