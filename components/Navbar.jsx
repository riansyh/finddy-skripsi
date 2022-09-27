import { Avatar, Box, Button, Flex, Link, Text, useDisclosure } from "@chakra-ui/react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { auth } from "../app/firebase";
import useFirebaseAuth from "../feature/hook/useFirebaseAuth";
import { LogoLink } from "./LogoLink";
import { FiMenu } from "react-icons/fi";

export const Navbar = ({ isLanding }) => {
    useFirebaseAuth();
    const btnRef = React.useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const authUser = useSelector((state) => state.authUser);

    return (
        <Flex
            w="100%"
            alignItems="center"
            justifyContent="center"
            bg="primary.calmblue"
            as="header"
            position="sticky"
            top="0"
            zIndex="100"
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

                        {authUser.uid && isLanding && (
                            <Flex gap="24px" display={{ base: "none", md: "none" }}>
                                <NextLink href="/register" passHref>
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
                        <Flex gap="8px" display={{ base: "none", md: "flex" }}>
                            <Button variant="primary" onClick={() => auth.signOut()}>
                                Logout
                            </Button>
                        </Flex>
                    ) : (
                        <Flex gap="8px" display={{ base: "none", md: "flex" }}>
                            <NextLink href="/register" passHref>
                                <Link>
                                    <Button variant="primary">Registrasi</Button>
                                </Link>
                            </NextLink>
                            <NextLink href="/login" passHref>
                                <Link>
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
                        <FiMenu size="32px" color="#ffffff" />
                    </Box>
                    <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerBody px={{ base: "24px", md: "80px", lg: "120px" }} py="40px">
                                {authUser.uid ? (
                                    <Flex flexDir="column" gap="8px">
                                        <Flex p="12px" gap="12px" alignItems="center" mb="24px">
                                            <Avatar
                                                h="52px"
                                                w="52px"
                                                src={authUser.data ? authUser.data.imgUrl : ""}
                                            ></Avatar>
                                            <Box>
                                                <Text size="h7" color="neutra.80" fontWeight="bold">
                                                    {authUser.name}
                                                </Text>
                                                <NextLink href="/login" passHref>
                                                    <Link color="primary.orange">
                                                        <Text size="12px">Halaman profil</Text>
                                                    </Link>
                                                </NextLink>
                                            </Box>
                                        </Flex>

                                        {isLanding && (
                                            <Flex gap="24px" flexDir="column" mb="32px">
                                                <NextLink href="/register" passHref>
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
                                            onClick={() => auth.signOut()}
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
