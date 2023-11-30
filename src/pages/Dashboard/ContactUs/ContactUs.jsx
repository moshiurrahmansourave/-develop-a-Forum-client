import useAuth from "../../../components/hooks/useAuth";


const ContactUs = () => {
    const {user} = useAuth()
    return (
        <div>
            <h2 className="text-5xl font-bold text-center text-cyan-400 ">
                <span>Hi, Welcome </span>
                {

                    user?.displayName ? user.displayName : 'Back'
                }
            </h2>
        </div>
    );
};

export default ContactUs;