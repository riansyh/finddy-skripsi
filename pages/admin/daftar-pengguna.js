import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Grid, Heading, Link, Text } from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { LogoLink } from "../../components/LogoLink";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../app/firebase";

export default function Pengguna() {
    const router = useRouter();
    const [users, setUsers] = useState(null);

    useEffect(() => {
        const showUser = async () => {
            const querySnapshot = await getDocs(collection(db, "users"));

            const users = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                users.push(data);
            });
            setUsers(users);
        };

        showUser();
    }, []);

    return (
        <>
            <Head>
                <title>Finddy | Find Your Buddy to Boost Your Study</title>
                <meta name="description" content="" />
                <link rel="icon" href="/logo.svg" />
            </Head>

            <Box position="relative" pb="100px">
                <Flex
                    w="100%"
                    alignItems="center"
                    justifyContent="center"
                    as="header"
                    position="sticky"
                    top="0"
                    zIndex="100"
                    boxShadow="card"
                    bg="white"
                >
                    <Box maxW="1320px" px={{ base: "24px", md: "80px", lg: "120px" }} w="100%">
                        <Flex
                            as="nav"
                            w="100%"
                            maxH="80px"
                            py="16px"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Flex gap="32px" alignItems="center" color="white">
                                <LogoLink />

                                <Flex
                                    gap="24px"
                                    display={{ base: "none", md: "flex" }}
                                    color="neutral.80"
                                >
                                    <NextLink href="/admin/laporan" passHref>
                                        <Link
                                            w="fit-content"
                                            h="fit-content"
                                            opacity={
                                                router.pathname == "/admin/laporan" ? "1" : "0.7"
                                            }
                                        >
                                            Laporan
                                        </Link>
                                    </NextLink>
                                    <NextLink href="/admin/daftar-pengguna" passHref>
                                        <Link
                                            w="fit-content"
                                            h="fit-content"
                                            opacity={
                                                router.pathname == "/admin/daftar-pengguna"
                                                    ? "1"
                                                    : "0.7"
                                            }
                                        >
                                            Daftar pengguna
                                        </Link>
                                    </NextLink>
                                </Flex>
                            </Flex>

                            <Flex gap="8px" display={{ base: "none", md: "flex" }}>
                                <NextLink href="/admin" passHref>
                                    <Link _hover={{ textDecoration: "none" }}>
                                        <Button variant="primary">Logout</Button>
                                    </Link>
                                </NextLink>
                            </Flex>
                        </Flex>
                    </Box>
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
                        <Flex w="100%" justifyContent="space-between" flexDir="column" gap="48px">
                            <Heading fontSize="h4" textAlign="center">
                                Daftar Pengguna
                            </Heading>
                            <TableContainer w="100%">
                                <Table variant="simple">
                                    <Thead>
                                        <Tr>
                                            <Th>No.</Th>
                                            <Th>Username</Th>
                                            <Th>Nama lengkap</Th>
                                            <Th>Asal perguruan tinggi</Th>
                                            <Th>Asal</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {users?.map((user, index) => (
                                            <Tr key={index}>
                                                <Td>{index + 1}</Td>
                                                <Td>{user.username}</Td>
                                                <Td>{user.name}</Td>
                                                <Td>{user.perguruanTinggi}</Td>
                                                <Td>
                                                    {user.kabupaten}, {user.provinsi}
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
