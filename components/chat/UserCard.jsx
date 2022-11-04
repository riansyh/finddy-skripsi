import { Avatar, Flex, Link, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import NextLink from "next/link";
import React from "react";
import { showMessageTime } from "../../feature/showMessageTime";
import { BidangPill } from "../friend/BidangPill";

export const UserCard = ({ chat, href = "#" }) => {
    const { date, userInfo } = chat;

    return (
        <NextLink href={href} passHref>
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
                    <Avatar showBorder borderColor="primary.calmblue" src={userInfo?.imgUrl} />
                    <Flex flexDir="column" alignItems="left" w="100%">
                        <Flex justifyContent="space-between" alignItems="center">
                            <Text fontWeight="bold" fontSize="h7" textAlign="left">
                                {userInfo?.name}
                            </Text>
                            <Text fontSize="10px">{date && showMessageTime(date.toDate())}</Text>
                        </Flex>
                        {/* <Flex gap="4px" mt="4px">
                            {userInfo?.bidang.map((bidang, index) => (
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
                        </Flex> */}
                        <Flex justifyContent="space-between" alignItems="center">
                            <Text
                                color="neutral.60"
                                mt="8px"
                                fontSize={{ base: "14px", md: "14px" }}
                                textAlign="left"
                                w="100%"
                                maxW={{ base: "75vw", md: "422px" }}
                                noOfLines="2"
                            >
                                {chat.lastMessage?.text}
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Link>
        </NextLink>
    );
};
