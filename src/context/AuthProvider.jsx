import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase.config";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);

   
    const register = async ({ name, email, password, photoURL }) => {
        setLoading(true);
        const res = await createUserWithEmailAndPassword(auth, email, password);

       
        if (name || photoURL) {
            await updateProfile(res.user, {
                displayName: name || res.user.displayName || "",
                photoURL: photoURL || res.user.photoURL || "",
            });

            
            setUser({
                ...res.user,
                displayName: name,
                photoURL,
            });
        } else {
            setUser(res.user);
        }

        setLoading(false);
        return res.user;
    };

    
    const login = async (email, password) => {
        setLoading(true);
        const res = await signInWithEmailAndPassword(auth, email, password);
        setUser(res.user);
        setLoading(false);
        return res.user;
    };

    
    const signInWithGoogle = async () => {
        setLoading(true);
        const res = await signInWithPopup(auth, googleProvider);
        setUser(res.user);
        setLoading(false);
        return res.user;
    };

    
    const logout = async () => {
        setLoading(true);
        await signOut(auth);
        setUser(null);
        setLoading(false);
    };

    
    const updateUserProfile = async ({ displayName, photoURL }) => {
        if (!auth.currentUser) throw new Error("No authenticated user");

        await updateProfile(auth.currentUser, {
            displayName,
            photoURL,
        });

        
        setUser({ ...auth.currentUser });
        return auth.currentUser;
    };

    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (current) => {
            setUser(current);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value = {
        user,
        loading,
        register,
        login,
        signInWithGoogle,
        logout,
        updateUserProfile,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
