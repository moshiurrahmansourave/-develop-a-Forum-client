import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Membership from "../pages/Membership/Membership";
import PostDetails from "../pages/Home/PostDetails/PostDetails";
import Registation from "../pages/Registation/Registation";
import Dashboard from "../Layout/Dashboard/Dashboard";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import AdminProfile from "../pages/Dashboard/AdminProfile/AdminProfile";
import ManageUser from "../pages/Dashboard/ManageUser/ManageUser";
import Reported from "../pages/Dashboard/Reported/Reported";
import Annunce from "../pages/Dashboard/Annunce/Annunce";
import AddPost from "../pages/Dashboard/AddPost/AddPost";
import MyPost from "../pages/Dashboard/MyPost/MyPost";
import ContactUs from "../pages/Dashboard/ContactUs/ContactUs";
import Announcements from "../pages/Home/Announcements/Announcements";
import PrivateRoute from "./PrivateRoute";
import MyPostComment from "../pages/Dashboard/MyPost/MyPostComment";
import Payment from "../pages/Membership/Payment";



  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path: '/',
            element: <Home></Home>,
            loader:() => fetch('http://localhost:5001/allPostCount')
        },
        {
            path: '/membership',
            element: <PrivateRoute><Membership></Membership></PrivateRoute>
        },
        {
          path:'payment',
          element: <Payment></Payment>
        },
        {
          path: '/postDetails/:id',
          element: <PrivateRoute><PostDetails></PostDetails></PrivateRoute>,
          loader:({params}) => fetch(`http://localhost:5001/allPost/${params.id}`)
        },
        {
          path: '/register',
          element: <Registation></Registation>
        },
        {
          path: '/announcement',
          element: <PrivateRoute><Announcements></Announcements></PrivateRoute>
        }
        
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        //user routs
        {
          path: 'myProfile',
          element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
        },
        {
          path:'addPost',
          element: <PrivateRoute><AddPost></AddPost></PrivateRoute>
        },
        {
          path:'myPost',
          element: <PrivateRoute> <MyPost></MyPost></PrivateRoute>
        },
        {
          path:'postComments/:id',
          element: <PrivateRoute><MyPostComment></MyPostComment></PrivateRoute>
          
        },
        
        //admin routs
        {
          path: 'adminProfile',
          element: <AdminProfile></AdminProfile>
        },
        {
          path: 'manageUser',
          element: <ManageUser></ManageUser>
        },
        {
          path: 'reported',
          element: <Reported></Reported>
        },
        {
          path: 'announce',
          element: <Annunce></Annunce>
        },
        {
          path:'contact',
          element: <ContactUs></ContactUs>
        }
      ]
    }
  ]);