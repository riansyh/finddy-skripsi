import { Avatar, Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa";
import { BidangPill } from "./BidangPill";
import { useSelector } from "react-redux";

export const FriendCard = ({ href = "#", onClick, chat, user }) => {
    const authUser = useSelector((state) => state.authUser);
    const [isSaved, setIsSaved] = useState(authUser?.data.friends.includes(user.uid));

    return (
        <NextLink href={href} passHref>
            <Link _hover={{ textDecor: "none" }}>
                <Flex
                    onClick={onClick}
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
                    <Avatar showBorder borderColor="primary.calmblue" src={user.imgUrl} />
                    <Flex flexDir="column" alignItems="left" w="100%">
                        <Flex justifyContent="space-between" alignItems="center">
                            <Text fontWeight="bold" fontSize="h7" textAlign="left">
                                {user.name}
                            </Text>
                            {isSaved && <FaBookmark color="#107CC7" size="12px" />}
                        </Flex>
                        <Flex gap="4px" alignItems="center" color="neutral.60">
                            <FiMapPin size="12px" />
                            <Text fontSize="p4">{user.kabupaten}</Text>
                        </Flex>
                        <Flex gap="4px" mt="4px">
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
                </Flex>
            </Link>
        </NextLink>
    );
};
