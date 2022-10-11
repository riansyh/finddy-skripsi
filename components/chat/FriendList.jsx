import React from "react";
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
} from "@chakra-ui/react";
import { FriendCard } from "../friend/FriendCard";
import { doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../../app/firebase";

export const FriendList = ({ onClose, isOpen }) => {
    const authUser = useSelector((state) => state.authUser);

    const handleUserSelect = async ({ user }) => {
        // check apakah user grup sudah ada, kalo belum buat grup chat dan kalo ada langsung redirect ke url terkait
        const combineId =
            authUser.uid > user.uid ? authUser.uid + user.uid : user.uid + authUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combineId));

            if (!res.exists()) {
                //create chat collections
                await setDoc(doc, (db, "chats", combineId), { messages: [] });

                // create user chats
                await updateDoc(doc, (db, "userChats", authUser.uid), {
                    [combineId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        imgUrl: user.imgUrl,
                        bidang: user.data.bidangMinat,
                    },
                    [combineId + ".date"]: serverTimestamp(),
                });

                await updateDoc(doc, (db, "userChats", user.uid), {
                    [combineId + ".userInfo"]: {
                        uid: authUser.uid,
                        displayName: authUser.displayName,
                        imgUrl: authUser.imgUrl,
                        bidang: authUser.data.bidangMinat,
                    },
                    [combineId + ".date"]: serverTimestamp(),
                });
            }
        } catch (error) {}
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
                        <FriendCard chat />
                        <FriendCard chat />
                        <FriendCard chat />
                        <FriendCard chat />
                        <FriendCard chat />
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
