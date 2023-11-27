import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";


const useMyPost = () =>{
    
    const axiosPublic = useAxiosPublic()
   const {user} = useContext(AuthContext)

    const {data: menu = [], isPending: loading, refetch} = useQuery({
        queryKey: ['myallPost'],
        queryFn: async () =>{
            const res = await axiosPublic.get(`/myallPost/${user.email}`);
            return res.data;
        }
    })


    return [menu,loading, refetch]
}

export default useMyPost;