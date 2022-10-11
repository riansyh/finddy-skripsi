import { Avatar, Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { FiMapPin } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa";
import { BidangPill } from "./BidangPill";

export const FriendCard = ({ href, onClick, chat }) => {
    return (
        <NextLink href="/user" passHref onClick={onClick}>
            <Link _hover={{ textDecor: "none" }}>
                <Flex
                    gap="12px"
                    p="12px"
                    alignItems="center"
                    borderRadius="12px"
                    boxShadow={chat ? "" : "card"}
                    w="100%"
                    bg="white"
                    _hover={{ bg: "primary.white" }}
                    transitionDuration="500ms"
                    transition="ease"
                    transitionProperty="all"
                    cursor="pointer"
                >
                    <Avatar showBorder borderColor="primary.calmblue" />
                    <Flex flexDir="column" alignItems="left" w="100%">
                        <Flex justifyContent="space-between" alignItems="center">
                            <Text fontWeight="bold" fontSize="h7" textAlign="left">
                                Rian Febriansyah
                            </Text>
                            {/* tambah kondisi udah disimpan atau belum */}
                            <FaBookmark color="#107CC7" size="12px" />
                        </Flex>
                        <Flex gap="4px" alignItems="center" color="neutral.60">
                            <FiMapPin size="12px" />
                            <Text fontSize="p4">Majalengka</Text>
                        </Flex>
                        <Flex gap="4px" mt="4px">
                            <BidangPill color="accent.sky" name="UI/UX Designer" />
                            <BidangPill color="accent.grass" name="Web Developer" />
                            {/* <BidangPill color="accent.sunshine" name="UI/UX Designer" /> */}
                        </Flex>
                    </Flex>
                </Flex>
            </Link>
        </NextLink>
    );
};
