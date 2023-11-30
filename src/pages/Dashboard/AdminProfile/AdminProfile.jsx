import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../components/hooks/useAuth";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";


const AdminProfile = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    const {data: stats} = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async() =>{
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });



    return (
        <div>
             <h2 className="text-3xl text-white ml-3 font-bold">Admin Profile</h2>
            <div className="flex lg:flex-row flex-col gap-20 items-center py-5 mt-20 pl-3 backdrop-blur-md bg-white/10">
            <div >
    {
      user.photoURL === null ? <div className="avatar">
      <div className="lg:w-52 mask mask-squircle">
        <img src="https://i.ibb.co/BNRhYBZ/depositphotos-105962630-stock-illustration-male-avatar-profile-picture-vector.webp" />
      </div>
    </div> 
      :
      <div className="avatar">
  <div className=" lg:w-44 mask mask-squircle">
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

        </div>

       <div>
       <div className="text-center">
       <h1 className="text-cyan-500 mt-8 text-2xl font-bold underline">Website Information</h1>
       </div>
        <div className="text-center mt-3">
        <div className="stats shadow">
  
  <div className="stat place-items-center">
    <div className="stat-title text-xl font-bold">All Users</div>
    <div className="stat-value text-cyan-500">{stats?.users}</div>
    
  </div>
  
  <div className="stat place-items-center">
    <div className="stat-title text-xl font-bold">All Posts</div>
    <div className="stat-value text-cyan-500">{stats?.totalPosts}</div>
    
  </div>
  
  <div className="stat place-items-center">
    <div className="stat-title font-bold text-xl">Comments</div>
    <div className="stat-value">{stats?.totalComment}</div>
  </div>
  
</div>
        </div>
       </div>
        </div>
    );
};

export default AdminProfile;