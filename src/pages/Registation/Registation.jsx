import { FaFacebook, FaGithub, FaGooglePlusG, FaLinkedin } from "react-icons/fa";
import '../Registation/Registation.css'
import { useState } from "react";





const Registation = () => {

    const [isActive, setIsActive] = useState(false);

    const handleRegisterClick = () => {
      setIsActive(true);
    };
  
    const handleLoginClick = () => {
      setIsActive(false);
    };

    return (
       <div className="register-body">
         <div className={`container ${isActive ? 'active' : ''}`} id="container">
            {/* registration form */}
        <div className="form-container sing-up">
            <form>
                <h1 className="text-3xl">Create Account</h1>
                <div className="social-icons ">
                    <h4><FaGooglePlusG /></h4>
                    <h4><FaFacebook /></h4>
                    <h4><FaGithub /></h4>
                    <h4><FaLinkedin /></h4>
                </div>
                <span>or use your email for registration</span>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="email" />
                <input type="password" placeholder="password" />
                <button>Sing Up</button>
            </form>
        </div>


         {/* login form */}
        <div className="form-container sing-in">
            <form>
                <h1 className="text-3xl">Sing In</h1>
                <div className="social-icons ">
                    <h4><FaGooglePlusG /></h4>
                    <h4><FaFacebook /></h4>
                    <h4><FaGithub /></h4>
                    <h4><FaLinkedin /></h4>
                </div>
                <span>or use your email password</span>
                <input type="email" placeholder="email" />
                <input type="password" placeholder="password" />
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