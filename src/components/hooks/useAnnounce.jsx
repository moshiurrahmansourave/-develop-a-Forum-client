import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const useAnnounce = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useContext(AuthContext)
    const {refetch ,data: announce} = useQuery({
        queryKey: ['announce', user?.email],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/announce?email=${user?.email}`)
            return res.data
        }
    })
    return [announce, refetch]
};

export default useAnnounce;