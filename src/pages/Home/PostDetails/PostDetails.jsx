import axios from "axios";
import { useState } from "react";
import { FaShare, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";




const PostDetails = () => {
    const detailsData = useLoaderData()
    const {author_name, post_image, author_image, post_title, description, time, comments_count, votes_count,_id} = detailsData;


//like related work mama
const [isLiked, setIsLiked] = useState(false);
const [isDisliked, setIsDisliked] = useState(false);

const handleLike = async () => {
    try {
      const response = await axios.post(`http://localhost:5001/allPost/${_id}/like`);
      if (response.status === 200) {
        setIsLiked(true);
        // Update other relevant data or UI based on the like
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await axios.post(`http://localhost:5001/allPost/${_id}/dislike`);
      if (response.status === 200) {
        setIsDisliked(true);
        // Update other relevant data or UI based on the dislike
      }
    } catch (error) {
      console.error('Error disliking post:', error);
    }
  };


    return (
        <div>
            <div className=" lg:py-36 py-10 text-white ">
            <div id="detail" className="col-span-2 border py-9 rounded-3xl">
                   <div className="mb-5">
                   <div className=" lg:mx-24 flex lg:flex-row flex-col items-center gap-10">
                        <div>
                        {
      author_image === null ?
      
      <img className="lg:w-52 w-40 " src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" alt="" />

      :
      <img className="lg:w-52 w-40 " src={author_image} alt="" />
    }
                        
                        <p className=" text-xl font-bold ml-3 mb-4">name : {author_name}</p>
                        </div>
                        
                       <div className=" border-l-2 flex flex-col justify-center pl-5 lg:w-[683px]">
                       <div className=" ">
                       <img className="rounded-2xl" src={post_image} alt="" />
                       </div>
                       
                        <div className="flex flex-col pb-2 border-b-2 justify-center items-center">
                            <h2 className="border-b-2 text-lg font-bold ">THE POST ON</h2>
                        <p className=" text-3xl ml-3 font-semibold">{post_title}</p>
                        </div>
                        <p className=" text-xl ml-3 font-bold my-6"> Description : {description} </p>
                        <p className=" ml-3 font-bold"> Date : {time} </p>
                        
                        <div className="flex gap-5 mt-7">

                        <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>comment</button>
<dialog id="my_modal_1" className="modal text-black">
  <div className="modal-box">
  <form className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">Write your comment</span>
  </label>
  <textarea name="comment" className="textarea textarea-bordered" placeholder="comment hare"></textarea>
  <button className="btn mt-3 bg-teal-600">Send</button>
</form>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-warning">X</button>
      </form>
    </div>
  </div>
</dialog>
                        
                        <button onClick={handleLike} disabled={isLiked} className="btn"><FaThumbsUp className="text-2xl" /></button>

                        <button onClick={handleDislike} disabled={isDisliked} className="btn"><FaThumbsDown className="text-2xl" /></button>

                        <button className="btn"><FaShare className="text-2xl" /></button>
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