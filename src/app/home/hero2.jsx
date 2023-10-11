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
        return null;
    }
}

const Hero2 = async () => {
    const post = await getData()

    return (
        <div className="md:px-8 mt-6">
            <div className="flex justify-between border-b-2 border-black px-2">
                <div></div>
                <NewPostButton />
            </div>
            <div className="mt-5 md:px-24 grid md:grid-cols-3 items-center gap-7 pb-10 px-2">
                {post.data.length == 0 || post == null ?
                    <p>There are no posts to show</p> :
                    post.data.map(e => (
                        <Card 
                        key={e._id}
                        id={e._id}
                        title={e.title} 
                        imageUrl={e.imageUrl} 
                        name={e.publicId}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Hero2;