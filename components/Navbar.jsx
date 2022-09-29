import {
    Avatar,
    Box,
    Button,
    CloseButton,
    Flex,
    Link,
    Text,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { Drawer, DrawerBody, DrawerOverlay, DrawerContent } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { auth } from "../app/firebase";
import useFirebaseAuth from "../feature/hook/useFirebaseAuth";
import { LogoLink } from "./LogoLink";
import { FiMenu, FiUser } from "react-icons/fi";
import useScrollPosition from "../feature/hook/useScrollPosition";

export const Navbar = ({ isLanding, heroHeight }) => {
    useFirebaseAuth();
    const btnRef = React.useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const authUser = useSelector((state) => state.authUser);
    const toast = useToast();
    const scrollPosition = useScrollPosition();

    return (
        <Flex
            w="100%"
            alignItems="center"
            justifyContent="center"
            bg={scrollPosition > heroHeight ? "white" : "primary.calmblue"}
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
                                color={scrollPosition > heroHeight ? "neutral.80" : "white"}
                            >
                                <NextLink href="/home" passHref>
                                    <Link w="fit-content" h="fit-content" opacity="0.8">
                                        Beranda
                                    </Link>
                                </NextLink>
                                <NextLink href="/register" passHref>
                                    <Link w="fit-content" h="fit-content" opacity="0.8">
                                        Cari teman
                                    </Link>
                                </NextLink>
                                <NextLink href="/register" passHref>
                                    <Link w="fit-content" h="fit-content" opacity="0.8">
                                        Pesan
                                    </Link>
                                </NextLink>
                            </Flex>
                        )}
                    </Flex>

                    {authUser.uid ? (
                        <Flex gap="24px" display={{ base: "none", md: "flex" }} alignItems="center">
                            <Flex
                                alignItems="center"
                                gap="4px"
                                color={scrollPosition > heroHeight ? "#333" : "#fff"}
                            >
                                <NextLink href="/profile" passHref>
                                    <Link>
                                        <FiUser />
                                    </Link>
                                </NextLink>
                                <Text>Halo, {authUser.name}</Text>
                            </Flex>
                            <Button
                                variant={scrollPosition > heroHeight ? "secondary" : "primary"}
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
                            color={scrollPosition > heroHeight ? "#222222" : "#fff"}
                        />
                    </Box>
                    <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerBody px={{ base: "24px", md: "80px", lg: "120px" }} py="40px">
                                {authUser.uid ? (
                                    <Flex flexDir="column" gap="8px">
                                        <Flex gap="12px" alignItems="center" mb="24px">
                                            <Avatar
                                                h="52px"
                                                w="52px"
                                                src={authUser.data ? authUser.data.imgUrl : ""}
                                            ></Avatar>
                                            <Box w="100%">
                                                <Flex w="100%" justifyContent="space-between">
                                                    <Text
                                                        size="h7"
                                                        color="neutra.80"
                                                        fontWeight="bold"
                                                    >
                                                        {authUser.name}
                                                    </Text>
                                                    <CloseButton size="sm" onClick={onClose} />
                                                </Flex>
                                                <NextLink href="/login" passHref>
                                                    <Link color="primary.orange">
                                                        <Text size="12px">Halaman profil</Text>
                                                    </Link>
                                                </NextLink>
                                            </Box>
                                        </Flex>

                                        {isLanding && (
                                            <Flex gap="24px" flexDir="column" mb="32px">
                                                <NextLink href="/home" passHref>
                                                    <Link w="fit-content" h="fit-content">
                                                        Beranda
                                                    </Link>
                                                </NextLink>
                                                <NextLink href="/register" passHref>
                                                    <Link w="fit-content" h="fit-content">
                                                        Cari teman
                                                    </Link>
                                                </NextLink>
                                                <NextLink href="/register" passHref>
                                                    <Link w="fit-content" h="fit-content">
                                                        Pesan
                                                    </Link>
                                                </NextLink>
                                            </Flex>
                                        )}

                                        <Button
                                            variant="secondary"
                                            size="full"
                                            onClick={() => {
                                                auth.signOut();
                                                toast({
                                                    position: "top",
                                                    title: "Berhasil logout!",
                                                    status: "success",
                                                    duration: 3000,
                                                    isClosable: true,
                                                });
                                            }}
                                        >
                                            Logout
                                        </Button>
                                    </Flex>
                                ) : (
                                    <Flex gap="8px" flexDir="column">
                                        <NextLink href="/login" passHref>
                                            <Button variant="secondary">Login</Button>
                                        </NextLink>
                                        <NextLink href="/register" passHref>
                                            <Button variant="primary">Registrasi</Button>
                                        </NextLink>
                                    </Flex>
                                )}
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </Flex>
            </Box>
        </Flex>
    );
};
