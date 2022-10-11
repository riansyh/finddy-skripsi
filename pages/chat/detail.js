import {
    Box,
    Flex,
    Grid,
    GridItem,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Text,
} from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { EmptyStates } from "../../components/EmptyStates";
import { Menubar } from "../../components/Menubar";
import { Navbar } from "../../components/Navbar";
import { FriendCard } from "../../components/friend/FriendCard";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { FiBook, FiMapPin, FiSearch, FiSliders } from "react-icons/fi";
import { BidangOption } from "../../components/BidangOption";
import { UserCard } from "../../components/chat/UserCard";
import { Chatbar } from "../../components/chat/Chatbar";
import { ChatInfo } from "../../components/chat/ChatInfo";
import { BubbleChat } from "../../components/chat/BubbleChat";
import { onSnapshot } from "firebase/firestore";

export default function Detail() {
    const [heroHeight, setHeroHeight] = useState(0);
    const ref = useRef(null);
    const authUser = useSelector((state) => state.authUser);
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Finddy | Detail Pesan</title>
                <meta name="description" content="" />
                <link rel="icon" href="/logo.svg" />
            </Head>

            <Box position="relative">
                <ChatInfo />

                <Flex w="100%" alignItems="start" justifyContent="center" bg="#F1F9FF" minH="80vh">
                    <Flex
                        maxW="1320px"
                        color="neutral.90"
                        px={{ base: "24px", md: "80px", lg: "120px" }}
                        w="100%"
                        flexDir="column"
                        bg="#F1F9FF"
                        py="20px"
                        gap="16px"
                        overflowY="auto"
                    >
                        <BubbleChat time="12.00">Haloo</BubbleChat>
                        <BubbleChat type="friend" time="12.00">
                            Haloo
                        </BubbleChat>

                        {false && (
                            <EmptyStates
                                text="Kamu belum memiliki satupun teman belajar tersimpan"
                                btnText="Cari teman sekarang"
                                btnHref="/search"
                                isHaveButton
                            />
                        )}
                    </Flex>
                </Flex>
            </Box>

            <Chatbar />
        </>
    );
}
