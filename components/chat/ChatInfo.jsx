import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { FiChevronLeft, FiMoreVertical } from "react-icons/fi";
import { BidangPill } from "../friend/BidangPill";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import NextLink from "next/link";

export const ChatInfo = () => {
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
                        <NextLink href="/chat" passHref>
                            <Link>
                                <Button bg="transparent" p="0">
                                    <FiChevronLeft />
                                </Button>
                            </Link>
                        </NextLink>

                        <Flex alignItems="center" flexDir="column" gap="4px">
                            <NextLink href="/user" passHref>
                                <Link>
                                    <Text>Rian Febriansyah</Text>
                                </Link>
                            </NextLink>
                            <Flex gap="4px">
                                <BidangPill color="accent.grass" name="UI/UX" />
                                <BidangPill color="accent.sky" name="Web Dev." />
                            </Flex>
                        </Flex>

                        <Menu>
                            <MenuButton>
                                <FiMoreVertical />
                            </MenuButton>
                            <MenuList>
                                <MenuItem _focus={{ bg: "transparent" }}>
                                    <NextLink href="/user" passHref>
                                        <Link>Lihat profil</Link>
                                    </NextLink>
                                </MenuItem>
                                <MenuItem _focus={{ bg: "transparent" }}>Minta kontak</MenuItem>
                                <MenuItem _focus={{ bg: "transparent" }}>Kirim kontak</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    );
};
