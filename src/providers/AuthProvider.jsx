import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../components/hooks/useAxiosPublic";


export const AuthContext = createContext(null);

const auth = getAuth(app);



const AuthProvider = ({children}) => {
    const [ user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const createuser = (email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email,password)
    }

    const singIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSingIn = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () =>{
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) =>{
      return  updateProfile(auth.currentUser,{
            displayName:name,photoURL:photo
        });
    }

    useEffect(()=>{
        
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if(currentUser){
                // get token and store client site
                const userInfo = {email: currentUser.email}
                axiosPublic.post('/jwt', userInfo)
                .then(res =>{
                    if(res.data.token){
                        setLoading(true)
                        localStorage.setItem('access-token', res.data.token)
                        setLoading(false);
                    }
                })
            }
            else{
                //do somethings
                localStorage.removeItem('access-token');
                setLoading(false);
            }
            
        });
        return () =>{
            return unsubscribe();

        }
    },[axiosPublic])

    const authInfo = {
        user,
        loading,
        createuser,
        singIn,
        googleSingIn,
        logOut,
        updateUserProfile

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;