import { Box, Flex } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Chatbar } from "../../components/chat/Chatbar";
import { ChatInfo } from "../../components/chat/ChatInfo";
import { BubbleChat } from "../../components/chat/BubbleChat";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../app/firebase";
import useFirebaseAuth from "../../feature/hook/useFirebaseAuth";

export default function Detail({ chats, userData, chatId, userId }) {
    const authUser = useSelector((state) => state.authUser);
    const [messages, setMessages] = useState([]);

    useFirebaseAuth();

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unsub();
        };
    }, [messages, chatId]);

    return (
        <>
            <Head>
                <title>Finddy | Detail Pesan</title>
                <meta name="description" content="" />
                <link rel="icon" href="/logo.svg" />
            </Head>

            <Box position="relative">
                <ChatInfo user={userData} chatId={chatId} userId={userId} />

                <Flex w="100%" alignItems="start" justifyContent="center" bg="#F1F9FF" minH="80vh">
                    <Flex
                        maxW="1320px"
                        color="neutral.90"
                        px={{ base: "24px", md: "80px", lg: "120px" }}
                        w="100%"
                        flexDir="column"
                        bg="#F1F9FF"
                        py="20px"
                        pb="90px"
                        gap="16px"
                        overflowY="auto"
                    >
                        {messages.map((message, index) => (
                            <BubbleChat
                                key={`message-${index}`}
                                time={message.date.toDate()}
                                isMyChat={message.senderId == authUser.uid}
                                user={userData}
                                chatId={chatId}
                                userId={userId}
                                file={message.file ? message.file : false}
                            >
                                {message.text}
                            </BubbleChat>
                        ))}
                    </Flex>
                </Flex>
            </Box>

            <Chatbar authUser={authUser} chatId={chatId} userId={userId} />
        </>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.query;

    const chatRef = doc(db, "chats", id[0]);
    const chatSnap = await getDoc(chatRef);

    const userRef = doc(db, "users", id[1]);
    const userSnap = await getDoc(userRef);

    const messages = chatSnap.data().messages.map((message) => ({
        ...message,
        date: `${message.date.toDate()}`,
    }));

    return {
        props: {
            chatId: id[0],
            userId: id[1],
            chats: messages,
            userData: userSnap.data(),
        },
    };
}
