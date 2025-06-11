import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      setUser(loggedUser);
      setLoading(false);
      if(loggedUser?.email){
        const userData ={email:loggedUser.email};
        axios.post('http://localhost:3000/jwt',userData)
        .then(res=>{
          console.log('token after jwt',res.data);
        })
        .catch(error => console.log(error));
      }
      console.log('user in the auth state change',loggedUser);
    });

    return () => unsubscribe();
  }, []);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log("User logged out");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <AuthContext.Provider value={{ user, loading, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
