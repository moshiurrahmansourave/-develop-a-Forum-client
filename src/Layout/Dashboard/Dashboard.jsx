import { FaAngleDoubleLeft, FaClipboardList,  FaEnvelope, FaHome, FaList, FaMoneyCheck, FaRegFilePowerpoint,  FaUsers, } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../components/hooks/useAdmin";


const Dashboard = () => {

    const[isAdmin] = useAdmin()
    
    return (
        <div className="flex flex-col lg:flex-row">
        {/* dashboard side bar */}
        <div id="style" className="lg:w-1/4 lg:min-h-screen backdrop-blur-md bg-white/10  text-white shadow-md font-bold ">
            <ul className="menu flex lg:flex-col flex-row gap-6 ">
                {  isAdmin ?

                     <>
                     <li className="text-teal-300">
                     <NavLink to="/">
                     <FaAngleDoubleLeft />
                      Back To Home</NavLink>
                 </li>
                     <li>
                     <NavLink to="/dashboard/adminProfile">
                     <FaHome />
                      Admin Profile</NavLink>
                 </li>
                 <li>
                     <NavLink to="/dashboard/ManageUser">
                     <FaUsers></FaUsers>
                      Manage Users</NavLink>
                 </li>
                 <li>
                     <NavLink to="/dashboard/reported">
                     <FaList />
                     Reported Comment</NavLink>
                 </li>
                 <li>
                     <NavLink to="/dashboard/announce">
                     <FaMoneyCheck />
                     Make Announcement</NavLink>
                 </li>
             
                     </>
                     :
                    //for user
                     <>
                     <li className="text-teal-300">
                     <NavLink to="/">
                     <FaAngleDoubleLeft />
                      Back To Home</NavLink>
                 </li>
                     <li>
                     <NavLink to="/dashboard/myProfile">
                     <FaHome />
                      My Profile</NavLink>
                 </li>
                 
                 <li>
                     <NavLink to="/dashboard/addPost">
                     <FaRegFilePowerpoint />
                      Add Post</NavLink>
                 </li>
                 <li>
                     <NavLink to="/dashboard/myPost">
                     <FaClipboardList />
                      My Posts</NavLink>
                 </li>
                     </>
                }
                

                {/* shared nav link */}
                <div className="divider"></div>
                <li>
                    <NavLink to="/dashboard/contact">
                    <FaEnvelope />
                     Contact us</NavLink>
                </li>
            </ul>
        </div>
        {/* dashboard content */}
        <div className="flex-1 lg:mx-10 lg:py-5 backdrop-blur-md bg-white/10">
            <Outlet></Outlet>
        </div>
    </div>
    );
};

export default Dashboard;