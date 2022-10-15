import { Box, Button, Flex, Heading, Image, Input, Link, Text } from "@chakra-ui/react";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { ref } from "firebase/storage";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { v4 as uuid } from "uuid";
import { db, storage } from "../../app/firebase";

export const Chatbar = ({ authUser, chatId, userId }) => {
    const router = useRouter();
    const [text, setText] = useState("");
    const [img, setImg] = useState("");

    const handleSend = async (e) => {
        e.preventDefault();
        if (text == "" || text == " ") return;

        if (img) {
            const storageRef = await ref(storage, uuid);
            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: authUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }),
                        });
                    });
                }
            );
        } else {
            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: authUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }

        await updateDoc(doc(db, "userChats", authUser.uid), {
            [chatId + ".lastMessage"]: {
                text,
            },
            [chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", userId), {
            [chatId + ".lastMessage"]: {
                text,
            },
            [chatId + ".date"]: serverTimestamp(),
        });

        setText("");
        setImg(null);
    };

    return (
        <form onSubmit={handleSend}>
            <Flex
                position="fixed"
                h="60px"
                bg="white"
                zIndex="100"
                boxShadow="nav"
                bottom="0"
                alignItems="center"
                w="100%"
                py="12px"
                px={{ base: "8px", md: "80px", lg: "120px" }}
                gap="12px"
                justifyContent="space-between"
            >
                <Input
                    borderRadius="40px"
                    fontSize="12px"
                    py="10px"
                    h="max-content"
                    placeholder="Masukkan pesan"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></Input>
                <Button type="submit" variant="primary" borderRadius="80px" height="auto">
                    <FiSend />
                </Button>
            </Flex>
        </form>
    );
};
