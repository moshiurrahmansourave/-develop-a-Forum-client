import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";


const PostDetails = () => {
    const detailsData = useLoaderData()
    const {author_name, author_image, post_title, description, time, comments_count, votes_count} = detailsData;
    return (
        <div>
            <div className=" lg:py-36 py-10 text-white ">
            <div className="col-span-2 border py-9 rounded-3xl ">
                   <div className="mb-5">
                   <div className=" lg:mx-24 flex lg:flex-row flex-col items-center gap-10">
                        <img className="lg:w-52 rounded-2xl" src={author_image} alt="" />
                        
                       <div>
                       <p className=" text-xl font-bold ml-3 mb-4">Author Name : {author_name}</p>
                        <p className=" text-xl ml-3 font-bold">Title: {post_title}</p>
                        <p className=" text-xl ml-3 font-bold my-6"> Description : {description} </p>
                        <p className=" ml-3 font-bold"> Date : {time} </p>
                        
                        <div className="flex gap-5 mt-7">
                        <button className="btn">Comment</button>
                        
                        <button className="btn"><FaThumbsUp className="text-2xl" /></button>

                        <button className="btn"><FaThumbsDown className="text-2xl" /></button>
                       </div>
                    </div>
                    </div>
                    
                   </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;