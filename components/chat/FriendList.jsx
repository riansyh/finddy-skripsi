import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Flex,
    Input,
    Text,
} from "@chakra-ui/react";
import { FriendCard } from "../friend/FriendCard";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../app/firebase";
import { useRouter } from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";
import useGetFriend from "../../feature/hook/useGetFriends";

export const FriendList = ({ onClose, isOpen }) => {
    const authUser = useSelector((state) => state.authUser);
    const router = useRouter();
    const friends = useGetFriend();
    const [users, setUsers] = useState(null);

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

    const handleUserSelect = async (user) => {
        // check apakah user grup sudah ada, kalo belum buat grup chat dan kalo ada langsung redirect ke url terkait
        const combineId =
            authUser.uid > user.uid ? authUser.uid + user.uid : user.uid + authUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combineId));

            console.log(user, authUser);

            if (!res.exists()) {
                //create chat collections
                await setDoc(doc(db, "chats", combineId), { messages: [] });

                // create user chats
                await updateDoc(doc(db, "userChats", authUser.uid), {
                    [combineId + ".userInfo"]: {
                        uid: user.uid,
                        name: user.name,
                        imgUrl: user.imgUrl,
                        bidang: user.bidangMinat,
                    },
                    [combineId + ".date"]: serverTimestamp(),
                });

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combineId + ".userInfo"]: {
                        uid: authUser.uid,
                        name: authUser.name,
                        imgUrl: authUser.data.imgUrl,
                        bidang: authUser.data.bidangMinat,
                    },
                    [combineId + ".date"]: serverTimestamp(),
                });

                console.log("beres euy");
                router.push(`/chat/${combineId}/${user.uid}`);
            } else {
                router.push("/chat/detail");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent mx="24px">
                <ModalHeader>Kirim pesan baru</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input type="text" placeholder="Cari teman" mb="12px" />
                    <Flex flexDir="column" gap="8px">
                        {/* ngefetch dari list teman tersimpan dan belum meiliki pesan */}
                        {friends?.map((user, index) => (
                            <FriendCard
                                key={`friend-${index}`}
                                chat
                                user={user}
                                onClick={() => handleUserSelect(user)}
                            />
                        ))}
                        {friends.length == 0 && (
                            <Text textAlign="center" color="neutral.40" py="24px">
                                Kamu belum memiliki teman tersimpan
                            </Text>
                        )}
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
