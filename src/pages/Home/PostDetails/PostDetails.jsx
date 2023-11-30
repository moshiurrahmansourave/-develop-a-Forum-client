import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaCommentDots, FaShare, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { useLoaderData, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../components/hooks/useAuth";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import { FacebookShareButton } from "react-share";




const PostDetails = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setDisIsLiked] = useState(false);

  //for comment
  const axiosSecure = useAxiosSecure()
  const {user} = useContext(AuthContext)
  console.log(user)
  // for comment end

    const detailsData = useLoaderData()
    const {author_name, post_image, author_image, post_title, description, time, _id} = detailsData;


//like related work mama


const handleLike = async (id) => {
  setIsLiked(true);
  console.log(id);
  try {
    await axios.put(`https://assignment-12-final-server-three.vercel.app/UpVote/${id}`);
  
  } catch (error) {
    console.error("Error upvoting post:", error);
  }
};


const handleDisLike = async (id) => {
  setDisIsLiked(true);
  console.log(id);
  try {
    await axios.put(`https://assignment-12-final-server-three.vercel.app/downVote/${id}`);
    
  } catch (error) {
    console.error("Error upvoting post:", error);
  }
};


const handleComment = async (e, id) => {
  console.log(id);
  e.preventDefault();
  document.getElementById("my_modal_1").close();

  const commentText = e.target.comment.value;
  console.log(commentText);

  const myComment = {
    postId: id,
    email: user.email,
    name: user.displayName,
    comment: commentText,
  };

  const res = await axiosSecure.post("/comment", myComment).then((res) => {
    console.log(res.data);
    if (res.data?.insertedId) {
      // customRefetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });

  console.log(res.data);
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

                        <div
              onClick={() => document.getElementById("my_modal_1").showModal()}
              className="btn text-lg flex"
            >
             <FaCommentDots />
              <h2 className="">Comment</h2>
            </div>

<dialog id="my_modal_1" className="modal text-black">
  <div className="modal-box">
  <form
            className="modal-action flex  flex-col  mx-auto"
            onSubmit={(e) => handleComment(e,_id)}
          >
            <textarea
              name="comment"
              className="textarea w-full mt-5"
              placeholder="Comment"
            ></textarea>
            <div className="justify-center text-center mt-4">
              <button className="btn bg-cyan-600 text-white text-lg"  type="submit">Send</button>
            </div>
          </form>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-warning">X</button>
      </form>
    </div>
  </div>
</dialog>
                        
                        <button 
                        onClick={() => handleLike(_id)} 
                        className={`btn`}
                        style={{ color: isLiked ? 'blue' : 'black' }}
                        >
                        <FaThumbsUp className={`text-2xl`} />
                        </button>

                        <button
                        onClick={() => handleDisLike(_id)} 
                        className={`btn`}
                        style={{ color: isDisLiked ? 'blue' : 'black' }}
                        >
                        <FaThumbsDown className={`text-2xl`} />
                        </button>

                        <button className=" btn-info">
              <FacebookShareButton url={_id}>
              <p className="btn"><FaShare className="text-2xl" /></p>
              </FacebookShareButton>
            </button>
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