import { FaFacebook, FaGithub, FaGooglePlusG, FaLinkedin } from "react-icons/fa";


const Login = () => {
    return (
        <div className="pt-28 text-white">
            <div className="form-container sing-up">
                <form>
                    <h1>Create Account</h1>
                    <div className="social-icons">
                        <p><FaGooglePlusG /></p>
                        <p><FaFacebook /></p>
                        <p><FaGithub /></p>
                        <p><FaLinkedin /></p>
                    </div>
                    <span>or use your email for Login</span>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                </form>
            </div>
        </div>
    );
};

export default Login;