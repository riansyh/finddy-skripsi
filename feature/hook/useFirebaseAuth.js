import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../app/firebase";
import { login, logout } from "../authUser/authUserSlice";

export default function useFirebaseAuth() {
    const dispatch = useDispatch();

    const authStateChanged = async (authState) => {
        if (!authState) {
            dispatch(logout());
            return;
        }

        dispatch(
            login({
                uid: authState.uid,
                name: authState.displayName,
                email: authState.email,
            })
        );
    };

    // listen for Firebase state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, authStateChanged);
        return () => unsubscribe();
    }, []);
}
