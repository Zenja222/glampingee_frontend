import React, {createContext, useContext, useEffect, useState} from 'react';
import {auth} from '../firebase';
import {getUserRole} from '../firestore/userService';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return auth.onAuthStateChanged(async (user) => {
            setCurrentUser(user);
            setLoading(true);  // Set loading to true each time user state changes

            if (user) {
                try {
                    const userRole = await getUserRole(user.uid);
                    setRole(userRole);
                } catch (error) {
                    console.error("Failed to fetch user role:", error);
                    setRole(null);  // Handle any issues with setting the role
                }
            } else {
                setRole(null);
            }

            setLoading(false);  // Set loading to false once role and user are set
        });
    }, []);

    // Optional: Add a signOut function to use in the app
    const signOut = async () => {
        await auth.signOut();
        setCurrentUser(null);
        setRole(null);
    };

    const value = {
        currentUser,
        role,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}