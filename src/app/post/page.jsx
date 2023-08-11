import Navbar from "../components/navbar";

const Post = () => {
    return (
        <div>
            <Navbar />
            <div className="px-28 flex flex-col items-center pt-28">
                <h2 className="text-5xl font-semibold self-start">The first post I have written</h2>
                <img src="https://res.cloudinary.com/dz27v8vsy/image/upload/v1689484277/blog-log_fhm2yc.png" alt="post-img" className="mt-5" />
                <p></p>
            </div>
        </div>
    );
}

export default Post;