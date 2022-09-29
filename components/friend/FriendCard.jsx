import { Avatar, Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { FiMapPin } from "react-icons/fi";
import { BidangPill } from "./BidangPill";

export const FriendCard = () => {
    return (
        <NextLink href="/" passHref>
            <Link _hover={{ textDecor: "none" }}>
                <Flex
                    gap="12px"
                    p="12px"
                    alignItems="center"
                    borderRadius="12px"
                    boxShadow="card"
                    w="100%"
                    _hover={{ bg: "primary.white" }}
                    transitionDuration="500ms"
                    transition="ease"
                    transitionProperty="all"
                    cursor="pointer"
                >
                    <Avatar />
                    <Flex flexDir="column" alignItems="left">
                        <Text fontWeight="bold" fontSize="h7" textAlign="left">
                            Rian Febriansyah
                        </Text>
                        <Flex gap="4px" alignItems="center" color="neutral.60">
                            <FiMapPin size="12px" />
                            <Text fontSize="p4">Majalengka</Text>
                        </Flex>
                        <Flex gap="4px" mt="4px">
                            <BidangPill color="accent.sky" name="UI/UX Designer" />
                            <BidangPill color="accent.sky" name="UI/UX Designer" />
                        </Flex>
                    </Flex>
                </Flex>
            </Link>
        </NextLink>
    );
};
