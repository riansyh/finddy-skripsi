import React from "react";
import { Box, Button, Flex, Link, Text, useDisclosure, useToast } from "@chakra-ui/react";
import NextLink from "next/link";
import { useSelector } from "react-redux";
import { auth } from "../app/firebase";
import useFirebaseAuth from "../feature/hook/useFirebaseAuth";
import { LogoLink } from "./LogoLink";
import { FiMenu, FiUser } from "react-icons/fi";
import useScrollPosition from "../feature/hook/useScrollPosition";
import { useRouter } from "next/router";
import { DrawerMenu } from "./Drawer";

export const Navbar = ({ isLanding, heroHeight, isHome }) => {
    useFirebaseAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const toast = useToast();
    const router = useRouter();
    const scrollPosition = useScrollPosition();
    const authUser = useSelector((state) => state.authUser);

    return (
        <Flex
            w="100%"
            alignItems="center"
            justifyContent="center"
            bg={
                isHome
                    ? scrollPosition > heroHeight
                        ? "white"
                        : "primary.calmblue"
                    : scrollPosition > 20
                    ? "white"
                    : "transparent"
            }
            as="header"
            position="sticky"
            top="0"
            zIndex="100"
            boxShadow={scrollPosition > heroHeight ? "card" : ""}
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

                        {authUser.uid && (
                            <Flex
                                gap="24px"
                                display={{ base: "none", md: "flex" }}
                                color={
                                    scrollPosition > heroHeight || !isHome ? "neutral.80" : "white"
                                }
                            >
                                <NextLink href="/home" passHref>
                                    <Link
                                        w="fit-content"
                                        h="fit-content"
                                        opacity={router.pathname == "/home" ? "1" : "0.7"}
                                    >
                                        Beranda
                                    </Link>
                                </NextLink>
                                <NextLink href="/search" passHref>
                                    <Link
                                        w="fit-content"
                                        h="fit-content"
                                        opacity={router.pathname == "/search" ? "1" : "0.7"}
                                    >
                                        Cari teman
                                    </Link>
                                </NextLink>
                                <NextLink href="/chat" passHref>
                                    <Link
                                        w="fit-content"
                                        h="fit-content"
                                        opacity={router.pathname == "/chat" ? "1" : "0.7"}
                                    >
                                        Pesan
                                    </Link>
                                </NextLink>
                            </Flex>
                        )}
                    </Flex>

                    {authUser.uid ? (
                        <Flex gap="24px" display={{ base: "none", md: "flex" }} alignItems="center">
                            <NextLink href="/profile" passHref>
                                <Link>
                                    <Flex
                                        alignItems="center"
                                        gap="4px"
                                        color={
                                            scrollPosition > heroHeight || !isHome ? "#333" : "#fff"
                                        }
                                    >
                                        <FiUser />
                                        <Text>Halo, {authUser.name}</Text>
                                    </Flex>
                                </Link>
                            </NextLink>
                            <Button
                                variant={
                                    scrollPosition > heroHeight || !isHome ? "secondary" : "primary"
                                }
                                onClick={() => {
                                    auth.signOut();
                                    onClose();
                                    toast({
                                        position: "top",
                                        title: "Berhasil logout!",
                                        status: "success",
                                        duration: 3000,
                                        isClosable: true,
                                    });
                                    router.push("/login");
                                }}
                            >
                                Logout
                            </Button>
                        </Flex>
                    ) : (
                        <Flex gap="8px" display={{ base: "none", md: "flex" }}>
                            <NextLink href="/register" passHref>
                                <Link _hover={{ textDecoration: "none" }}>
                                    <Button variant="primary">Registrasi</Button>
                                </Link>
                            </NextLink>
                            <NextLink href="/login" passHref>
                                <Link _hover={{ textDecoration: "none" }}>
                                    <Button variant="secondary">Login</Button>
                                </Link>
                            </NextLink>
                        </Flex>
                    )}

                    <Box
                        ref={btnRef}
                        onClick={onOpen}
                        display={{ base: "block", md: "none" }}
                        cursor="pointer"
                    >
                        <FiMenu
                            size="32px"
                            color={scrollPosition > heroHeight || !isHome ? "#222222" : "#fff"}
                        />
                    </Box>

                    <DrawerMenu isOpen={isOpen} onClose={onClose} isLanding={isLanding} />
                </Flex>
            </Box>
        </Flex>
    );
};
