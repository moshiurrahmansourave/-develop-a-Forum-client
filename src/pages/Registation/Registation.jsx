import {  FaGooglePlusG } from "react-icons/fa";
import '../Registation/Registation.css'
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../components/hooks/useAxiosPublic";
import useAuth from "../../components/hooks/useAuth";



const Registation = () => {
    const axiosPublic = useAxiosPublic()
    const [isActive, setIsActive] = useState(false);
    const handleRegisterClick = e => {
        e.preventDefault()
      setIsActive(true);
    };
  
    const handleLoginClick = e => {
      e.preventDefault()
      setIsActive(false);
    };


//login site    
    const{singIn, createuser, updateUserProfile} = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
//login end



// singUp site
const { register,reset, formState: { errors }, handleSubmit, } = useForm();
// singUp end

   //login with google

   const {googleSingIn} = useAuth()
    
   const handleGoogleSingIn = () =>{
    googleSingIn()
        .then(result => {
            console.log(result.user)
            const userInfo ={
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users',userInfo)
            .then(res =>{
                console.log(res.data)
                navigate('/')
            })
        })

}

//handle login setup
    const handleLogin = e =>{
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        singIn(email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
          
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User login successful",
            showConfirmButton: false,
            timer: 1500
          });
          navigate(from, {replace:true})
        })
    }
//handle registration setup
const onSubmit = (data) => {
    console.log(data);
    createuser(data.email, data.password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser)
        updateUserProfile(data.name, data.photoUrl)
        .then(() =>{
            // create user entry in database
            //set user entry on the data base
            const userInfo = {
                name: data.name,
                photoUrl: data.photoUrl,
                email: data.email,
                badge: 'bronze'
              }
            axiosPublic.post('/users', userInfo)
           .then(res => {
                if (res.data.insertedId) {
                  console.log('user added to the database')
                  reset();
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "User login successful",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/')
                }
              })
        })
       
          navigate(from, {replace:true})

      })
  };

    return (
       <div className="register-body">
         <div className={`container ${isActive ? 'active' : ''}`} id="container">
            {/* registration form */}
        <div className="form-container sing-up">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-3xl">Create Account</h1>
                <div className="social-icons ">
                <h5 className="btn" onClick={handleGoogleSingIn}>
                        <FaGooglePlusG className="text-3xl text-indigo-700" />
                    </h5>
                </div>
                <span>or use your email for registration</span>
                <input type="text" {...register("name", { required: true })}  placeholder="Name" />
                <input type="text" {...register("photoUrl", { required: true })}  placeholder="photoUrl" />
                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" />
               
                <input type="password" {...register("password", { pattern: /(?=.*[A-Z])(?=.*[0-9])(?=.*[A-Z])/ }, { required: true, minLength: 6 })} name="password" placeholder="password" />
                {errors.password?.type === 'required' && <span className="text-red-500">please input password</span>}
                {errors.password?.type === 'pattern' && <span className="text-red-500">Password must be first carecter is uper case and one number</span>}
                {errors.password?.type === 'minLength' && <span className="text-red-500">Password must be 6 carecter</span>}
                <button>Sing Up</button>
            </form>
        </div>


         {/* login form */}
        <div className="form-container sing-in">
            <form onSubmit={handleLogin}> 
                <h1 className="text-3xl">Sing In</h1>
                <div className="social-icons ">
                    <h5 className="btn" onClick={handleGoogleSingIn}>
                        <FaGooglePlusG className="text-3xl text-indigo-700" />
                    </h5>
                </div>
                <span>or use your email password</span>
                <input type="email" name="email" placeholder="email" />
                <input type="password" name="password" placeholder="password" />
                <a href="#">Forget Your Password</a>
                <button>Sing In</button>
            </form>
        </div>



        <div className="togg-container">
            <div className="togg">
                <div className="togg-panel togg-left">
                        <h1 className="text-3xl">Welcome Back!</h1>
                        <p>Enter your personal details to use all of site features</p>
                        <button onClick={handleLoginClick} className="hidde" id="login"> Sing In</button>
                </div>
                <div className="togg-panel togg-right">
                        <h1 className="text-3xl">Hello, Friend!</h1>
                        <p>Register your personal details to use all of site features</p>
                        <button onClick={handleRegisterClick} className="hidde" id="register"> Sing Up</button>
                </div>
            </div>
        </div>
    </div>
       </div>
    );
};

export default Registation;