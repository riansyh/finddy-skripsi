import { Avatar, Box, Button, CloseButton, Flex, Link, Text, useToast } from "@chakra-ui/react";
import { Drawer, DrawerBody, DrawerOverlay, DrawerContent } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useSelector } from "react-redux";
import { auth } from "../app/firebase";
import { useRouter } from "next/router";

export const DrawerMenu = ({ onClose, isOpen, isLanding }) => {
    const authUser = useSelector((state) => state.authUser);
    const toast = useToast();
    const router = useRouter();

    return (
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
                                        <Text size="h7" color="neutra.80" fontWeight="bold">
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
                                    <NextLink href="/search" passHref>
                                        <Link w="fit-content" h="fit-content">
                                            Cari teman
                                        </Link>
                                    </NextLink>
                                    <NextLink href="/chat" passHref>
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
                                    router.push("/login");
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
    );
};
