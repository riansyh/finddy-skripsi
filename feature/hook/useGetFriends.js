import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../app/firebase";

const useGetFriend = () => {
    const authUser = useSelector((state) => state.authUser);
    const [friends, setFriends] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const showUser = async () => {
            const querySnapshot = await getDocs(collection(db, "users"));

            let users = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (authUser.uid && data.uid != authUser.uid && data.isComplete) users.push(data);
            });

            setUsers(users);
        };

        showUser();
    }, [authUser]);

    useEffect(() => {
        console.log(users);
        const filteredUsers = users?.filter((user) => {
            return authUser?.data?.friends?.some((friendUid) => {
                return friendUid === user.uid;
            });
        });

        setFriends(filteredUsers);
    }, [authUser, users]);

    return friends;
};

export default useGetFriend;
