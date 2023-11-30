
import Swal from "sweetalert2";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const ManageUser = () => {
    const axiosSecure = useAxiosSecure()
    const {data: users = [], refetch} = useQuery( {
        queryKey: ['users'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleMakeAdmin = user =>{
        console.log(user._id)
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} Is An Admin Now?`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }


    return (
        <div>
            <div className="flex justify-center py-4">
            <h2 className="text-3xl text-[cyan] underline">All Users</h2>
            </div>
            <div className="overflow-x-auto">
  <table className="table bg-cyan-900 text-white ">
    {/* head */}
    <thead className="text-white">
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody className="text-lg font-semibold">
      {
        users.map((user, index) => <tr
        key={user._id}

        >
            <th>{index + 1}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
            { user.role === 'admin'? 'Admin'
            :
                <button
              onClick={()=>handleMakeAdmin(user)}
              className="btn btn-sm bg-cyan-900 text-[cyan] ">
              Make admin
              </button>}
            </td>
            <td>
            { 
              user?.badge === 'bronze' ? 'User' 
              :
              <p className="text-cyan-400">
                Membership
              </p>
            }
            </td>
          </tr>)
      }
      
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default ManageUser;