import {
    Avatar,
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    Image,
    Link,
    Text,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { EmptyStates } from "../components/EmptyStates";
import { LogoLink } from "../components/LogoLink";
import { Menubar } from "../components/Menubar";
import { Motivations } from "../components/Motivations";
import { Navbar } from "../components/Navbar";
import { FiMapPin } from "react-icons/fi";
import { FriendCard } from "../components/friend/FriendCard";

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

            <Box position="relative" pb="100px">
                <Navbar heroHeight={heroHeight} />
                <Flex
                    w="100%"
                    alignItems="center"
                    justifyContent="center"
                    bg="primary.calmblue"
                    py={{base: "40px", md:"60px"}}
                    ref={ref}
                    pb={{base: "140px", md:"140px"}}
                >
                    <Flex
                        maxW="1320px"
                        color="white"
                        px={{ base: "24px", md: "80px", lg: "120px" }}
                        w="100%"
                        textAlign={{ base: "left", md: "center" }}
                        flexDir="column"
                        justifyContent="center"
                        alignItems={{ base: "start", md: "center" }}
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
                            Temukan teman belajarmu secara lebih mudah di sini
                        </Text>
                    </Flex>
                </Flex>

                <Flex w="100%" alignItems="center" justifyContent="center" mt="-100px">
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
                        <Motivations></Motivations>
                    </Flex>
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
                        <Flex w="100%" justifyContent="space-between">
                            <Heading as="h2" fontSize="h6">
                                Teman belajar
                            </Heading>
                            <NextLink href="/daftar-teman" passHref>
                                <Link color="primary.orange">
                                    <Text fontSize="p3">Lihat semua</Text>
                                </Link>
                            </NextLink>
                        </Flex>

                        <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} w="100%" rowGap="12px" columnGap="16px" mt="24px">
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
