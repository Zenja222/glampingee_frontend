import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { getUserRole } from '../firestore/userService';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setCurrentUser(user);
            if (user) {
                const userRole = await getUserRole(user.uid);
                setRole(userRole);
            } else {
                setRole(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        role,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
