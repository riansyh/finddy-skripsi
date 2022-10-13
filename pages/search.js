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
import { BidangOption } from "../components/BidangOption";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../app/firebase";

export default function Search() {
    const [heroHeight, setHeroHeight] = useState(0);
    const [users, setUsers] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [filters, setFilters] = useState({
        bidang: "",
        kemampuan: "pemula",
        lokasi: "",
    });

    const ref = useRef(null);
    const authUser = useSelector((state) => state.authUser);
    const router = useRouter();

    useEffect(() => {
        setHeroHeight(ref.current.clientHeight);
    }, []);

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
        setFilters((val) => ({ ...val, bidang: authUser.data?.bidangMinat[0].name }));
    }, [authUser]);

    // useEffect(() => {
    //     if (!authUser) {
    //         router.push("/login");
    //     } else {
    //         if (!authUser.isComplete) router.push("/register/lengkapi-data");
    //     }
    // }, [authUser]);

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
                    pt={{ base: "100px", md: "140px" }}
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
                            Cari teman belajar
                        </Heading>
                        <Text mt="4px" opacity="0.7" maxW="550px" fontWeight="normal" fontSize="p3">
                            Cari berdasarkan bidang/minat, kemampuan, dan lokasi
                        </Text>

                        <InputGroup bg="white" mt="24px" borderRadius="4px">
                            <Input
                                placeholder="Cari berdasarkan nama/username"
                                type="text"
                                value={searchKey}
                                outline="none"
                                borderColor="transparent"
                                boxShadow="card"
                                onChange={(e) => {
                                    setSearchKey(e.target.value);
                                }}
                            ></Input>
                            <InputRightElement>
                                <FiSearch color="#107CC7" />
                            </InputRightElement>
                        </InputGroup>

                        <Flex
                            w="100%"
                            flexDir={{ base: "column", md: "row" }}
                            gap={{ base: "4px", md: "16px" }}
                        >
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
                                <Flex
                                    mt="4px"
                                    gap="8px"
                                    maxW="100%"
                                    overflowX="auto"
                                    className="no-scroll"
                                >
                                    {authUser.data?.bidangMinat.map((bidang, index) => (
                                        <BidangOption
                                            key={`bidang-${index}`}
                                            isActive={filters.bidang == bidang.name}
                                            onClick={() => {
                                                setFilters((val) => ({
                                                    ...val,
                                                    bidang: bidang.name,
                                                }));
                                            }}
                                        >
                                            {bidang.name}
                                        </BidangOption>
                                    ))}
                                </Flex>
                            </Box>

                            <Flex gap="16px">
                                <Box mt="12px" w={{ base: "100%", md: "auto" }}>
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
                                        <Select
                                            size="sm"
                                            bg="white"
                                            mt="4px"
                                            borderColor="neutral.20"
                                            w={{ base: "100%", md: "auto" }}
                                            value={filters.kemampuan}
                                            onChange={(e) =>
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    kemampuan: e.target.value,
                                                }))
                                            }
                                        >
                                            <option value="pemula">Pemula</option>
                                            <option value="menengah">Menengah</option>
                                            <option value="ahli">Ahli</option>
                                        </Select>
                                    </Flex>
                                </Box>
                                <Box mt="12px" w={{ base: "100%", md: "auto" }}>
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
                                        <Select
                                            size="sm"
                                            bg="white"
                                            mt="4px"
                                            borderColor="neutral.20"
                                            w={{ base: "100%", md: "auto" }}
                                            value={filters.lokasi}
                                            onChange={(e) =>
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    lokasi: e.target.value,
                                                }))
                                            }
                                        >
                                            <option value="pemula">Semua lokasi</option>
                                            <option value="menengah">Lokasiku</option>
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

                <Flex w="100%" alignItems="center" justifyContent="center" mt="24px">
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
                        <Flex w="100%" justifyContent="center" alignItems="center" gap="4px">
                            <FiSearch color="#999" />
                            <Text fontSize="h6" color="neutral.40">
                                Hasil pencarian
                            </Text>
                        </Flex>

                        <Grid
                            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
                            w="100%"
                            rowGap="12px"
                            columnGap="16px"
                            mt="8px"
                        >
                            {users?.map((user, index) => (
                                <FriendCard
                                    key={`friend-${index}`}
                                    user={user}
                                    href={`/user/${user.uid}`}
                                />
                            ))}
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
