import { Button } from "@chakra-ui/react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { auth } from "../app/firebase";
import useFirebaseAuth from "../feature/hook/useFirebaseAuth";

export default function Home() {
    const [user, setUser] = useState(null);
    const router = useRouter();
    useFirebaseAuth();

    const authUser = useSelector((state) => state.authUser);

    useEffect(() => {
        if (authUser.uid == null) router.push("/login");
    }, [authUser]);

    return (
        <div>
            {user ? user.displayName : ""}
            <Button onClick={() => auth.signOut()}>Logout</Button>
        </div>
    );
}
