import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Membership from "../pages/Membership/Membership";
import PostDetails from "../pages/Home/PostDetails/PostDetails";
import Login from "../pages/Login/Login";
import Registation from "../pages/Registation/Registation";



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
            element: <Membership></Membership>
        },
        {
          path: '/postDetails/:id',
          element: <PostDetails></PostDetails>,
          loader:({params}) => fetch(`http://localhost:5001/allPost/${params.id}`)
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Registation></Registation>
        }
      ]
    },
  ]);