import {
    AiOutlineLike,
    AiOutlineDislike,
    AiOutlineShareAlt,
  } from "react-icons/ai";
  import { BiSolidCommentAdd } from "react-icons/bi";
  import { useParams } from "react-router-dom";
  import { useContext, useEffect, useState } from "react";
  import { FacebookShareButton } from "react-share";
  import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
  import { AuthContext } from "../../Provider/AuthProvider";
  import Swal from "sweetalert2";
import axios from "axios";

const MyPostCard = () => {



    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [singlePost, setSinglePost] = useState({});
    const params = useParams();
    const [change, setIsChange] = useState(false);
  
    const [comments, setComments] = useState([]);
    const customRefetch = () => {
      setIsChange(!change);
    };
  
    const formattedTime = new Date(singlePost?.post_time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  
    // console.log(singlePost);
  
    const getPostDetails = async () => {
      const res = await axios.get(`http://localhost:5000/posts/${params.id}`);
      setSinglePost(res.data);
    };
  
    const handleLike = async (id) => {
      console.log(id);
      try {
        await axios.put(`http://localhost:5000/UpVote/${id}`);
        getPostDetails();
      } catch (error) {
        console.error("Error upvoting post:", error);
      }
    };
    const handleDisLike = async (id) => {
      console.log(id);
      try {
        await axios.put(`http://localhost:5000/downVote/${id}`);
        getPostDetails();
      } catch (error) {
        console.error("Error upvoting post:", error);
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch post details
          await getPostDetails();
  
          // Fetch comments only if singlePost is defined
          if (singlePost) {
            const response = await axios.get(
              `http://localhost:5000/post-comments/${singlePost._id}`
            );
            setComments(response.data);
            console.log(response.data);
          }
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      };
  
      fetchData(); // Call the fetchData function
    }, [singlePost._id, change]);
  
    const handleComment = async (e, id) => {
      console.log(id);
      e.preventDefault();
      document.getElementById("my_modal_5").close();
  
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
          customRefetch();
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
              <div className="mb-24">
      <SectionTitle
        title={"Jwt web Token"}
        subtitle={"Details...."}
      ></SectionTitle>
      <div className="bg-slate-300 mt-24 flex space-x-4 w-3/4 px-5 py-6  mx-auto">
        <div className="space-y-4">
          <img
            className="w-[50px] rounded-full"
            src={singlePost?.author_image}
            alt=""
          />
          <h4 className="font-bold">{formattedTime}</h4>
        </div>

        <div className="space-y-5">
          <div>
            <h3 className="text-xl font-bold">{singlePost?.post_title}</h3>
            <a className="font-semibold">
              Tag:-
              <span className="text-blue-800 underline font-semibold">
                {singlePost?.tag}
              </span>
            </a>
          </div>
          <p>{singlePost?.post_description}</p>
          <div className="divider divider-start"></div>
          <div className="flex items-center text-center space-x-6">
            <button
              onClick={() => handleLike(singlePost._id)}
              className="btn btn-outline btn-info"
            >
              <AiOutlineLike className="text-2xl text-black" />
              {singlePost.upVote}
            </button>
            <button
              onClick={() => handleDisLike(singlePost._id)}
              className="btn btn-outline btn-info"
            >
              <AiOutlineDislike className="text-2xl text-black" />
              {singlePost.downVote}
            </button>

            <div
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="btn btn-outline btn-info flex"
            >
              <button>
                <BiSolidCommentAdd className="text-2xl text-black" />
              </button>
              <h2 className="text-black">Comment....</h2>
            </div>
            <button className="btn btn-outline btn-info"></button>
        </div>
        </div>
        </div>
        </div>
        </div>
    );
};

export default MyPostCard;