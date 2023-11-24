import { useLoaderData } from "react-router-dom";


const PostDetails = () => {
    const detailsData = useLoaderData()
    const {author_name, author_image, post_title, description, time, comments_count, votes_count} = detailsData;
    return (
        <div>
            <div className="grid md:grid-cols-4 grid-cols-1 lg:gap-6  text-white">
            <div className="col-span-2 border border-white py-9 rounded-3xl my-32">
                   <div className="mb-5">
                   <div className=" lg:mx-24">
                        <img className="w-full rounded-2xl" src={author_image} alt="" />
                        <h2 className="text-3xl ml-3 font-semibold mt-4 mb-2">Details</h2>
                        <p className=" text-xl font-bold ml-3 ">Name: {author_name}</p>
                        <p className=" text-xl ml-3 font-bold">Brand: {post_title}</p>
                        <p className=" text-xl ml-3 font-bold"> Price: {time} </p>
                        
                    </div>
                    <div>
                        
                    </div>
                   </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;