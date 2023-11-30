
import { useEffect, useState } from "react";
import axios from "axios";
import {  useParams } from "react-router-dom";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";


const MyPostComment = () => {
    
    const [allData, setAllData] = useState([])
    const [comments, setComments] = useState([]);
    const params = useParams()
    console.log(params.id)
    
    
  
     useEffect(()=>{
      fetch(`http://localhost:5001/allPost/${params.id}`)
      .then(res => res.json())
      .then(data => setAllData(data))
     },[params])
     

      useEffect(()=>{

        const fetchData = async () => {
            try { 
                await axios.get(`http://localhost:5001/allPost-comments/${params.id}`)
                .then((res) => {
                  console.log(res.data);
      
                  setComments(res.data);
                });

            } catch (error) {
              console.error("Error fetching comments:", error);
            }
          };
          fetchData();
    
      },[params])

      console.log(allData)
      console.log(comments)
    return (


        <div>
            <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-white underline">Posts Details</h1>
            </div>
    <div className="grid lg:grid-cols-1 grid-cols-1 col-span-1 gap-10 mx-3">

    <div className="flex flex-col lg:flex-row rounded-xl backdrop-blur-md bg-white/10  text-white shadow-md " >
               <figure><img  className="rounded-t-lg lg:h-80 h-full w-full" src={allData.post_image} alt="car!"/></figure>
               <div className=" flex flex-col gap-3 px-2 pb-6 w-1/2" >
                 
                 <h1 className="text-3xl border-b-2 border-t-2 mt-5 border-sky-300 py-2">{allData.post_title}</h1>
                   
                 <p>Post Date: {allData.time}</p>
                 <p>Post id: {}</p>
               
                <div className="flex justify-between">
                <div className="flex gap-10 ">
                <p className="flex gap-1 items-center "><FaRegThumbsUp className="text-2xl text-cyan-500"/> {allData.up_votes_count}</p>
                 <p className="flex gap-1 items-center pt-2"><FaRegThumbsDown className="text-2xl text-cyan-500"/> {allData.down_votes_count}</p>
                </div>
                 
                </div>
                     <div>
                        <h2 className="text-xl font-bold underline">All the comments on post</h2>
                        <div className="border">
                            
                            <div>
                            {comments.length > 0
              ? comments.map((cmt) => (
                  <div
                    key={cmt._id}
                    
                  >
                    <div className="text-lg underline flex">
                            <h2 className="font-bold text-cyan-500">Commenter :-</h2>
                            <h2 className="text-cyan-500"> {cmt.email}</h2>
                            </div>
                            <h1> <span className="font-bold text-lg text-cyan-500">comment :</span> 
                               <p>{cmt.comment}</p>
                            </h1>
                  </div>
                ))
              : "No comments"}
                            </div>
                            
                            
                        </div>
                     </div>
               </div>
             </div>

    </div>

        </div>


    );
};

export default MyPostComment;