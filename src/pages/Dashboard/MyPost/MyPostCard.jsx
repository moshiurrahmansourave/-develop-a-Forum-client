import { AiOutlineLike } from "react-icons/ai";
import { MdDelete, MdOutlineComment } from "react-icons/md";
import SectionTitle from "../../Shared/SectionTitle";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const MyPostCard = () => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { data: post = [], refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/singlePost?email=${user?.email}`);
      return res.data;
    },
  });

  const fetchData = async (id) => {
    try {
      if (post) {
        await axios
          .get(`http://localhost:5000/post-comments/${id}`)
          .then((res) => {
            console.log(res.data);

            setComments(res.data);
          });
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/singlePosts/${id}`).then((res) => {
          console.log(res.data);
          if (res.data?.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div className="bg-slate-300 p-8 mx-auto space-y-5">
      <Helmet>
        <title>Dev || My-Post</title>
      </Helmet>
      <SectionTitle title={"My Posts"} subtitle={""}></SectionTitle>
      <div className="grid grid-cols-4 gap-5">
        {post?.map((item) => (
          <div key={item._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{item.post_title}</h2>
              <div className="flex justify-between">
                <div>
                  <p className="flex items-center text-blue-800 font-bold btn btn-sm btn-outline">
                    {item.downVote && item.upVote
                      ? item.upVote + item.downVote
                      : "0 Vote"}
                    <AiOutlineLike />
                  </p>
                </div>
                <div
                  onClick={() =>
                    document.getElementById("my_modal_2").showModal()
                  }
                  className="btn btn-sm btn-outline flex"
                >
                  <button onClick={() => fetchData(item._id)}>
                    <MdOutlineComment className="text-2xl text-black" />
                  </button>
                </div>
              </div>
              <div
                onClick={() => handleDelete(item._id)}
                className="btn btn-outline btn-sm flex"
              >
                <button>
                  <MdDelete className="text-2xl text-black" />
                </button>
                <h2 className="text-black">Delete</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Comments</h3>
          <div className="space-y-3">
            {comments.length > 0
              ? comments.map((cmt) => (
                  <div
                    key={cmt._id}
                    className="chat-bubble chat-bubble-warning"
                  >
                    {cmt.comment}
                  </div>
                ))
              : "No comments"}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default MyPostCard;