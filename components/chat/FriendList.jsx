import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Flex,
    Input,
    Text,
    useToast,
} from "@chakra-ui/react";
import { FriendCard } from "../friend/FriendCard";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    serverTimestamp,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../app/firebase";
import { useRouter } from "next/router";
import useGetFriend from "../../feature/hook/useGetFriends";

export const FriendList = ({ onClose, isOpen }) => {
    const authUser = useSelector((state) => state.authUser);
    const router = useRouter();
    const friends = useGetFriend();
    const [users, setUsers] = useState(null);
    const toast = useToast();

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
        const combineId =
            authUser.uid > user.uid ? authUser.uid + user.uid : user.uid + authUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combineId));

            if (!res.exists()) {
                await setDoc(doc(db, "chats", combineId), { messages: [] });

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

                router.push(`/chat/${combineId}/${user.uid}`);
            } else {
                router.push("/chat/detail");
            }
        } catch (error) {
            toast({
                variant: "subtle",
                position: "top",
                title: "Terjadi kesalahan",
                description: "Silahkan coba lagi",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
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
