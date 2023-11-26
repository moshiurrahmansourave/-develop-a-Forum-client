import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";


const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const location = useLocation()
    if(loading){
       return <span className="loading loading-spinner loading-lg"></span>
    }
    
    if(user){
        return children;
    }
    return <Navigate to="/register" state={{from:location}} replace></Navigate>
};

export default PrivateRoute;