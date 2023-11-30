
import {  FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import useAuth from "../../../components/hooks/useAuth";
import useMyPost from "../../../components/hooks/useMyPost";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";





const MyProfile = () => {
    const {user} = useAuth()
    const [post,loading, refetch] = useMyPost()
    

    
    const axiosSecure = useAxiosSecure()

   const {data: payments = []} = useQuery({
       queryKey: ['payments', user.email],
       queryFn: async() =>{
           const res = await axiosSecure.get(`/payments/${user.email}`)
           return res.data;
       }
   })
    
    return (
        <div>
          <h1 className="text-2xl">Total payments: {payments.length}</h1>
            <h2 className="text-3xl text-white ml-3 font-bold">My Profile</h2>
            <div className="flex lg:flex-row flex-col gap-20  mt-20 pl-3 backdrop-blur-md bg-white/10">
            <div >
    {
      user.photoURL === null ? <div className="avatar">
      <div className="lg:w-52 mask mask-squircle">
        <img src="https://i.ibb.co/BNRhYBZ/depositphotos-105962630-stock-illustration-male-avatar-profile-picture-vector.webp" />
      </div>
    </div> 
      :
      <div className="avatar">
  <div className="  mask mask-squircle">
    <img src={user.photoURL} />
  </div>
</div>
    }

          
    </div>
            <div className="text-white pt-8">
                    <h1 className="font-bold underline">Your Name</h1>
                    <h1 className="text-2xl font-medium">{user.displayName}</h1>
                    <h1 className="font-bold mt-4 underline">Your Email</h1>
                    <h1 className="text-2xl font-medium">{user.email}</h1>
            </div>
            
            <div className="text-center text-white font-bold">
                <h1>Your badges</h1>
                <div className="flex">
                { user ? <img className="rounded-full w-36" src="https://i.ibb.co/mXp01rv/Pngtree-vector-painted-silver-metallic-coins-1039920.png" alt="" />
                :
                "Your Have no reword"
                }
                <div>
                 { payments.length > 0 ? 
                 <div className="">
                <img className="rounded-full w-36" src="https://www.onlygfx.com/wp-content/uploads/2022/04/blank-gold-badge-label-2.png" alt="" />
                </div> 
                 :
                 ""
                 }
                </div>
                </div>
                
            </div>

        </div>
        <div>
        <div className="text-center mt-10">
            <h2 className="text-3xl font-bold underline text-cyan-400">Your Recent Post</h2>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 col-span-1 gap-10 mx-3 mt-8">

    { 
           post.map( (item) => <div
           key={item._id}
           
           >
               <div  className=" flex flex-col rounded-xl backdrop-blur-md bg-white/10  text-white shadow-md " >
  <figure><img  className="rounded-t-lg lg:h-80 h-full w-full" src={item.post_image} alt="car!"/></figure>
  <div className=" flex flex-col gap-3 px-2 pb-6 " >
    
    <h1 className="text-3xl border-b-2 border-t-2 mt-5 border-sky-300 py-2">{item.post_title}</h1>
    <div className="flex gap-3 items-center">
    {
      item.author_image === null ? <div className="avatar">
      <div className="w-10 mask mask-squircle">
        <img src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" />
      </div>
    </div> 
      :
      <div className="avatar">
  <div className="w-10 mask mask-squircle">
    <img src={item.author_image} />
  </div>
</div>
    }
    <h2 className="text-2xl font-bold">{item.author_name}</h2>
    <p className="font-medium">tag : {item.tags}</p>
    </div>
    <p>Post Date: {item.time}</p>

   <div className="flex gap-10 ">
   <p className="flex gap-1 items-center "><FaRegThumbsUp className="text-2xl text-cyan-500"/> {item.up_votes_count}</p>
    <p className="flex gap-1 items-center pt-2"><FaRegThumbsDown className="text-2xl text-cyan-500"/> {item.down_votes_count}</p>
   </div>

  </div>
</div>
               </div>)
        }

    </div>
        </div>
    </div>
    );
};

export default MyProfile;