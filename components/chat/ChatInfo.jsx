import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { FiChevronLeft, FiMoreVertical } from "react-icons/fi";
import { BidangPill } from "../friend/BidangPill";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import NextLink from "next/link";
import { useSelector } from "react-redux";
import { sendMessage } from "../../feature/sendMessage";

export const ChatInfo = ({ user, chatId, userId }) => {
    const authUser = useSelector((state) => state.authUser);

    const handleRequestContact = async () => {
        await sendMessage("Halo, boleh minta kontaknya ga?", chatId, authUser, userId);
    };

    const handleSendContact = async () => {
        await sendMessage(`Ini kontaknya ya ${user.kontak}`, chatId, authUser, userId);
    };

    return (
        <Flex
            w="100%"
            alignItems="center"
            justifyContent="center"
            bg="white"
            as="header"
            position="sticky"
            top="0"
            zIndex="100"
            boxShadow="card"
            minH="80px"
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
                    <Flex
                        gap="32px"
                        alignItems="center"
                        justifyContent="space-between"
                        color="neutral.80"
                        w="100%"
                    >
                        <NextLink href={`/chat`} passHref>
                            <Link>
                                <Button bg="transparent" p="0">
                                    <FiChevronLeft />
                                </Button>
                            </Link>
                        </NextLink>

                        <Flex alignItems="center" flexDir="column" gap="4px">
                            <NextLink href={`/user/${user.uid}`} passHref>
                                <Link>
                                    <Text>{user.name}</Text>
                                </Link>
                            </NextLink>
                            <Flex gap="4px">
                                {user.bidangMinat?.map((bidang, index) => (
                                    <BidangPill
                                        key={`bidang${index}`}
                                        color={
                                            index == 0
                                                ? "accent.sky"
                                                : index == 1
                                                ? "accent.grass"
                                                : "accent.sunshine"
                                        }
                                        name={bidang.name}
                                    />
                                ))}
                            </Flex>
                        </Flex>

                        <Menu>
                            <MenuButton>
                                <FiMoreVertical />
                            </MenuButton>
                            <MenuList>
                                <MenuItem _focus={{ bg: "transparent" }}>
                                    <NextLink href={`/user/${user.uid}`} passHref>
                                        <Link>Lihat profil</Link>
                                    </NextLink>
                                </MenuItem>
                                <MenuItem
                                    _focus={{ bg: "transparent" }}
                                    onClick={handleRequestContact}
                                >
                                    Minta kontak
                                </MenuItem>
                                <MenuItem
                                    _focus={{ bg: "transparent" }}
                                    onClick={handleSendContact}
                                >
                                    Kirim kontak
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    );
};
