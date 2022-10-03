import { Alert, AlertIcon, Box, Button, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { LogoLink } from "../components/LogoLink";
import { Navbar } from "../components/Navbar";

const Fitur = ({ title, children, img, isCenter, isFeature }) => {
    return (
        <Flex
            flexDir="column"
            alignItems="center"
            gap="4px"
            maxW="210px"
            textAlign="center"
            mb={isCenter ? { md: "40px" } : ""}
            alignSelf={isFeature ? "end" : ""}
        >
            <Box w="140px" h="140px">
                <Image src={`./images/${img}`} alt={`illustration-${img}`}></Image>
            </Box>
            {isFeature && (
                <Heading as="h3" fontSize="20px" mt="8px">
                    {title}
                </Heading>
            )}

            <Text color="neutral.60">{children}</Text>
        </Flex>
    );
};

export default function Index() {
    const [heroHeight, setHeroHeight] = useState(0);
    const authUser = useSelector((state) => state.authUser);
    const ref = useRef(null);

    useEffect(() => {
        setHeroHeight(ref.current.clientHeight);
    }, []);

    return (
        <>
            <Head>
                <title>Finddy | Find Your Buddy to Boost Your Study</title>
                <meta name="description" content="" />
                <link rel="icon" href="/logo.svg" />
            </Head>
            <Box position="relative">
                <Navbar isLanding isHome heroHeight={heroHeight} />
                <Flex
                    w="100%"
                    alignItems="center"
                    justifyContent="center"
                    bg="primary.calmblue"
                    py="80px"
                    ref={ref}
                >
                    <Flex
                        maxW="1320px"
                        color="white"
                        px={{ base: "24px", md: "80px", lg: "120px" }}
                        w="100%"
                        textAlign={{ base: "left", md: "center" }}
                        flexDir="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Heading
                            maxW="550px"
                            fontWeight="normal"
                            fontSize={{ base: "h3", md: "48px" }}
                            lineHeight={{ md: "64.8px" }}
                            as="h1"
                        >
                            Solusi tepat untuk mencari{" "}
                            <Box display="inline" fontWeight="bold">
                                teman belajar
                            </Box>
                        </Heading>
                        <Text mt="12px" opacity="0.7" maxW="550px" fontWeight="normal">
                            Temukan teman belajar di sekitarmu berdasarkan bidang/minat yang sedang
                            kamu pelajari
                        </Text>
                        <Button mt="40px" variant="secondary" size={{ base: "full", md: "" }}>
                            Mulai Perjalananku
                        </Button>
                    </Flex>
                </Flex>

                {authUser.uid && !authUser.isComplete && (
                    <Box mt="24px" px={{ base: "24px", md: "80px", lg: "120px" }} maxW="1320px">
                        <Alert status="warning" variant="left-accent">
                            <AlertIcon />
                            Kamu belum melengkapi data! Untuk bisa menikmati fitur aplikasi ini
                            silakan lengkapi{" "}
                            <Box
                                display="inline"
                                ml="4px"
                                fontWeight="bold"
                                textDecoration="underline"
                            >
                                <NextLink href="/register/lengkapi-data" passHref>
                                    <Link>di sini</Link>
                                </NextLink>
                            </Box>
                        </Alert>
                    </Box>
                )}

                <Flex w="100%" alignItems="center" justifyContent="center" mt="120px">
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
                        <Flex
                            justifyContent="space-between"
                            w="100%"
                            alignItems="center"
                            flexDir={{ base: "column", md: "row" }}
                            gap="32px"
                        >
                            <Box maxW="343px">
                                <Heading
                                    fontSize={{ base: "h4", md: "h3" }}
                                    lineHeight={{ md: "47.8px" }}
                                    as="h2"
                                >
                                    Fitur yang memudahkanmu
                                </Heading>
                                <Text mt="12px" opacity="0.7" maxW="550px" fontWeight="normal">
                                    Finddy mempermudah kamu untuk mencari teman belajar yang sesuai
                                    dengan bidang/minat
                                </Text>
                            </Box>
                            <Flex
                                gap={{ base: "40px", md: "24px" }}
                                flexDir={{ base: "column", md: "row" }}
                            >
                                <Fitur title="Cari teman" img="fitur-1.svg" isFeature>
                                    Cari berdasarkan lokasi dan bidang/minat
                                </Fitur>
                                <Fitur title="Motivasi Harian" img="fitur-2.svg" isCenter isFeature>
                                    Dapatkan motivasi belajar setiap hari
                                </Fitur>
                                <Fitur title="Hubungi Teman" img="fitur-3.svg" isFeature>
                                    Kirim pesan dan mulai belajar
                                </Fitur>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>

                <Flex w="100%" alignItems="center" justifyContent="center" mt="120px">
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
                        <Heading
                            fontSize={{ base: "h4", md: "h3" }}
                            lineHeight={{ md: "47.8px" }}
                            as="h2"
                        >
                            Kenapa harus Finddy?
                        </Heading>

                        <Flex
                            gap={{ base: "40px", md: "24px" }}
                            mt="40px"
                            justifyContent="space-between"
                            w="100%"
                            flexDir={{ base: "column", md: "row" }}
                            alignItems="center"
                        >
                            <Fitur img="reason-1.svg">
                                Membantumu ketika belajar secara mandiri
                            </Fitur>
                            <Fitur img="reason-2.svg">Jalin koneksi dengan berbagai pengguna</Fitur>
                            <Fitur img="reason-3.svg">
                                Tampilan yang sederhana dan mudah digunakan
                            </Fitur>
                        </Flex>
                    </Flex>
                </Flex>

                <Flex
                    w="100%"
                    alignItems="center"
                    justifyContent="center"
                    mt="120px"
                    bg="primary.lightblue"
                    py="36px"
                >
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
                        <Text maxW="550px" fontWeight="normal" color="primary.calmblue">
                            Belajar dengan Kami
                        </Text>
                        <Heading
                            fontSize={{ base: "h4", md: "h2" }}
                            as="h2"
                            maxW="774px"
                            textAlign="center"
                            mt="16px"
                        >
                            Tingkatkan semangat belajarmu dengan teman belajar!
                        </Heading>

                        <Text
                            mt="12px"
                            opacity="0.7"
                            maxW="550px"
                            fontWeight="normal"
                            color="black"
                        >
                            Tunggu apa lagi, mulai daftar dan temukan teman belajarmu di sini
                        </Text>

                        <Button variant="primary" mt="24px">
                            Registrasi Sekarang
                        </Button>
                    </Flex>
                </Flex>

                <Flex
                    w="100%"
                    alignItems="center"
                    justifyContent="center"
                    mt="120px"
                    pt="24px"
                    pb="40px"
                    as="footer"
                >
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
                        <Flex
                            justifyContent="space-between"
                            w="100%"
                            alignItems="center"
                            flexDir={{ base: "column", md: "row" }}
                            gap="40px"
                        >
                            <Flex gap="40px" alignItems="center">
                                <NextLink href="/register" passHref>
                                    <Link w="fit-content">
                                        <Image
                                            src="./images/logotype.svg"
                                            alt="Finddy logo"
                                            h="40px"
                                        ></Image>
                                    </Link>
                                </NextLink>
                                <NextLink href="/register" passHref>
                                    <Link w="fit-content">Registrasi</Link>
                                </NextLink>
                                <NextLink href="/login" passHref>
                                    <Link w="fit-content">Login</Link>
                                </NextLink>
                            </Flex>
                            <Text>© Finddy 2022</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
