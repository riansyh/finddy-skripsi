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

export default function Detail() {
    const [heroHeight, setHeroHeight] = useState(0);
    const ref = useRef(null);
    const authUser = useSelector((state) => state.authUser);
    const router = useRouter();

    const [searchKey, setSearchKey] = useState("");

    // useEffect(() => {
    //     if (authUser.uid == null) router.push("/login");
    //     if (!authUser.isComplete) router.push("/register/lengkapi-data");
    // }, [authUser]);

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
                        textAlign={{ base: "center", md: "left" }}
                        flexDir="column"
                        justifyContent="center"
                        alignItems="center"
                        bg="#F1F9FF"
                        py="20px"
                    >
                        <Grid
                            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
                            w="100%"
                            rowGap="12px"
                            columnGap="16px"
                        >
                            <GridItem w="100%">
                                <UserCard />
                            </GridItem>
                            <GridItem w="100%">
                                <UserCard />
                            </GridItem>
                            <GridItem w="100%">
                                <UserCard />
                            </GridItem>
                        </Grid>

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
