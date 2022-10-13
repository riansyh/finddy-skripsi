import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Link,
    Select,
    Text,
    useDisclosure,
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
import { FaPlus } from "react-icons/fa";
import NextLink from "next/link";
import { FriendList } from "../../components/chat/FriendList";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../app/firebase";

export default function Chat() {
    const [heroHeight, setHeroHeight] = useState(0);
    const ref = useRef(null);
    const authUser = useSelector((state) => state.authUser);
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", authUser.uid), (doc) => {
                console.log("Current data: ", Object.entries(doc.data()));
                setChats(doc.data());
            });

            return () => {
                unsub();
            };
        };

        authUser.uid && getChats();
    }, [authUser.uid]);

    // Object.entries(chats)

    useEffect(() => {
        setHeroHeight(ref.current.clientHeight);
    }, []);

    // useEffect(() => {
    //     if (authUser.uid == null) router.push("/login");
    //     if (!authUser.isComplete) router.push("/register/lengkapi-data");
    // }, [authUser]);

    useEffect(() => {
        setHeroHeight(ref.current.clientHeight);
    }, []);

    return (
        <>
            <Head>
                <title>Finddy | Pesan</title>
                <meta name="description" content="" />
                <link rel="icon" href="/logo.svg" />
            </Head>

            <Box position="relative" pb="100px" mt="-80px">
                <Navbar heroHeight={heroHeight} />
                <Flex
                    w="100%"
                    alignItems="center"
                    justifyContent="center"
                    bg="white"
                    py={{ base: "40px", md: "60px" }}
                    ref={ref}
                    pb={{ base: "24px", md: "24px" }}
                    pt={{ base: "80px", md: "140px" }}
                >
                    <Flex
                        maxW="1320px"
                        color="neutral.80"
                        px={{ base: "24px", md: "80px", lg: "120px" }}
                        w="100%"
                        textAlign={{ base: "left", md: "center" }}
                        flexDir="column"
                        justifyContent="center"
                        alignItems={{ base: "start", md: "center" }}
                    >
                        <Heading
                            maxW="550px"
                            fontWeight="bold"
                            fontSize={{ base: "h4", md: "48px" }}
                            lineHeight={{ md: "64.8px" }}
                            as="h1"
                        >
                            Pesan
                        </Heading>
                        <Text mt="4px" opacity="0.7" maxW="550px" fontWeight="normal" fontSize="p3">
                            Tempat berdiskusi dan berbagi dengan teman belajar
                        </Text>
                    </Flex>
                </Flex>

                <Flex w="100%" alignItems="center" justifyContent="center">
                    <Flex
                        maxW="1320px"
                        color="neutral.90"
                        px={{ base: "24px", md: "80px", lg: "120px" }}
                        w="100%"
                        textAlign={{ base: "center", md: "left" }}
                        flexDir="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid
                            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
                            w="100%"
                            rowGap="12px"
                            columnGap="16px"
                        >
                            {Object.entries(chats)
                                .sort((a, b) => b[1].date - a[1].date)
                                ?.map((chat) => (
                                    <GridItem w="100%" key={chat[0]}>
                                        <UserCard
                                            href={`chat/${chat[0]}/${chat[1].userInfo?.uid}`}
                                            chat={chat[1]}
                                        />
                                    </GridItem>
                                ))}
                        </Grid>

                        {Object.entries(chats).length == 0 && (
                            <EmptyStates
                                text="Kamu belum memiliki satupun pesan"
                                btnText="Kirim pesan sekarang"
                                btnHref="/search"
                            />
                        )}
                    </Flex>
                </Flex>
            </Box>
            <Box position="fixed" bottom={{ base: "94px", md: "24px" }} right="24px">
                <Button borderRadius="100px" variant="primary" w="52px" h="52px" onClick={onOpen}>
                    <FaPlus />
                </Button>
            </Box>
            <Menubar />
            <FriendList isOpen={isOpen} onClose={onClose} />
        </>
    );
}
