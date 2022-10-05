import { Avatar, Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { FiMapPin } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa";
import { BidangPill } from "../friend/BidangPill";

export const UserCard = () => {
    return (
        <NextLink href="/chat/detail" passHref>
            <Link _hover={{ textDecor: "none" }}>
                <Flex
                    gap="12px"
                    p="12px"
                    alignItems="center"
                    borderRadius="12px"
                    boxShadow="card"
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
                            <Text fontSize="10px">13/02/2022</Text>
                        </Flex>
                        <Flex gap="4px" mt="4px">
                            <BidangPill color="accent.sky" name="UI/UX Designer" />
                            <BidangPill color="accent.grass" name="Web Developer" />
                            {/* <BidangPill color="accent.sunshine" name="UI/UX Designer" /> */}
                        </Flex>
                        <Text mt="12px" fontSize={{ base: "10px", md: "12px" }} textAlign="left">
                            Lorem ipsum dolor amet sit esta mana sidu dolor amet sit esta mana sidu
                        </Text>
                    </Flex>
                </Flex>
            </Link>
        </NextLink>
    );
};
