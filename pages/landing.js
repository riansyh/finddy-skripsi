import { Box, Button, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { LogoLink } from "../components/LogoLink";
import { Navbar } from "../components/Navbar";

const Fitur = ({ title, children, img }) => {
    return (
        <Flex flexDir="column" alignItems="center" gap="4px" maxW="210px" textAlign="center">
            <Box w="140px" h="140px" bg="neutral.20" borderRadius="8px"></Box>
            <Heading as="h3" fontSize="20px" mt="8px">
                {title}
            </Heading>
            <Text color="neutral.60">{children}</Text>
        </Flex>
    );
};

export default function Index() {
    return (
        <Box position="relative">
            <Navbar isLanding />
            <Flex
                w="100%"
                alignItems="center"
                justifyContent="center"
                bg="primary.calmblue"
                py="80px"
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
                        Temukan teman belajar di sekitarmu berdasarkan bidang/minat yang sedang kamu
                        pelajari
                    </Text>
                    <Button mt="40px" variant="secondary" size={{ base: "full", md: "" }}>
                        Mulai Perjalananku
                    </Button>
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
                            <Fitur title="Cari teman">
                                Cari berdasarkan lokasi dan bidang/minat
                            </Fitur>
                            <Fitur title="Motivasi Harian">
                                Dapatkan motivasi belajar setiap hari
                            </Fitur>
                            <Fitur title="Hubungi Teman">Kirim pesan dan mulai belajar</Fitur>
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
                        <Fitur title="Cari teman">Cari berdasarkan lokasi dan bidang/minat</Fitur>
                        <Fitur title="Motivasi Harian">Dapatkan motivasi belajar setiap hari</Fitur>
                        <Fitur title="Hubungi Teman">Kirim pesan dan mulai belajar</Fitur>
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

                    <Text mt="12px" opacity="0.7" maxW="550px" fontWeight="normal" color="black">
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
    );
}
