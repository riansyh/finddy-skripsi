import {
    Box,
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
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { EmptyStates } from "../components/EmptyStates";
import { Menubar } from "../components/Menubar";
import { Navbar } from "../components/Navbar";
import { FriendCard } from "../components/friend/FriendCard";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { FiBook, FiMapPin, FiSearch, FiSliders } from "react-icons/fi";

export default function Search() {
    const [heroHeight, setHeroHeight] = useState(0);
    const ref = useRef(null);
    const authUser = useSelector((state) => state.authUser);
    const router = useRouter();

    const [searchKey, setSearchKey] = useState("");

    useEffect(() => {
        setHeroHeight(ref.current.clientHeight);
    }, []);

    useEffect(() => {
        if (authUser.uid == null) router.push("/login");
        if (!authUser.isComplete) router.push("/register/lengkapi-data");
    }, [authUser]);

    useEffect(() => {
        setHeroHeight(ref.current.clientHeight);
    }, []);

    return (
        <>
            <Head>
                <title>Finddy | Cari Teman Belajar</title>
                <meta name="description" content="" />
                <link rel="icon" href="/logo.svg" />
            </Head>

            <Box position="relative" pb="100px" mt="-80px">
                <Navbar heroHeight={heroHeight} />
                <Flex
                    w="100%"
                    alignItems="center"
                    justifyContent="center"
                    bg="#F1F9FF"
                    py={{ base: "40px", md: "60px" }}
                    ref={ref}
                    pb={{ base: "24px", md: "24px" }}
                    pt={{ base: "120px", md: "140px" }}
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
                            fontSize={{ base: "h3", md: "48px" }}
                            lineHeight={{ md: "64.8px" }}
                            as="h1"
                        >
                            Cari teman belajar
                        </Heading>
                        <Text mt="4px" opacity="0.7" maxW="550px" fontWeight="normal">
                            Cari berdasarkan bidang/minat, kemampuan, dan lokasi
                        </Text>
                        <InputGroup bg="white" mt="24px">
                            <Input
                                placeholder="Cari berdasarkan nama/username"
                                type="text"
                                value={searchKey}
                                onChange={(e) => {
                                    setSearchKey(e.target.value);
                                }}
                            ></Input>
                            <InputRightElement>
                                <FiSearch color="#666666" />
                            </InputRightElement>
                        </InputGroup>

                        <Flex w="100%" flexDir="column" gap="4px">
                            <Box mt="12px">
                                <Flex
                                    gap="4px"
                                    fontSize="p4"
                                    color="neutral.40"
                                    alignItems="center"
                                >
                                    <FiBook />
                                    <Text>Bidang/minat</Text>
                                </Flex>
                                <Flex>Bidang bidang</Flex>
                            </Box>

                            <Flex gap="16px">
                                <Box mt="12px">
                                    <Flex
                                        gap="4px"
                                        fontSize="p4"
                                        color="neutral.40"
                                        alignItems="center"
                                    >
                                        <FiSliders />
                                        <Text>Kemampuan</Text>
                                    </Flex>
                                    <Flex>
                                        <Select size="md" bg="white" mt="2px">
                                            <option value="pemula">Pemula</option>
                                            <option value="menengah">Menengah</option>
                                            <option value="ahli">Ahli</option>
                                        </Select>
                                    </Flex>
                                </Box>
                                <Box mt="12px">
                                    <Flex
                                        gap="4px"
                                        fontSize="p4"
                                        color="neutral.40"
                                        alignItems="center"
                                    >
                                        <FiMapPin />
                                        <Text>Lokasi</Text>
                                    </Flex>
                                    <Flex>
                                        <Select size="md" bg="white" mt="2px">
                                            <option value="pemula">Pemula</option>
                                            <option value="menengah">Menengah</option>
                                            <option value="ahli">Ahli</option>
                                        </Select>
                                    </Flex>
                                </Box>
                            </Flex>
                        </Flex>
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
                    ></Flex>
                </Flex>

                <Flex w="100%" alignItems="center" justifyContent="center" mt="32px">
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
                        <Flex w="100%" justifyContent="center">
                            <Text fontSize="h6" color="neutral.40">
                                Hasil pencarian
                            </Text>
                        </Flex>

                        <Grid
                            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
                            w="100%"
                            rowGap="12px"
                            columnGap="16px"
                            mt="24px"
                        >
                            <GridItem w="100%">
                                <FriendCard />
                            </GridItem>
                            <GridItem w="100%">
                                <FriendCard />
                            </GridItem>
                            <GridItem w="100%">
                                <FriendCard />
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

            <Menubar />
        </>
    );
}
