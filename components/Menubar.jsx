import { Box, Button, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

const NavItem = ({ href = "", icon, text, isActive, isUserDetail }) => {
    const baseImgUrl = isUserDetail ? "./../images/icon/" : "./images/icon/";
    return (
        <NextLink href={href} passHref>
            <Link _hover={{ textDecor: "none", color: "primary.calmblue" }}>
                <Flex w="74px" flexDir="column" gap="4px" alignItems="center">
                    <Image
                        w="24px"
                        h="24px"
                        alt={`icon-${icon}`}
                        src={
                            isActive
                                ? `${baseImgUrl}${icon}-active.svg`
                                : `${baseImgUrl}${icon}.svg`
                        }
                    ></Image>
                    <Text
                        color={isActive ? "neutral.80" : "neutral.40"}
                        letterSpacing="1px"
                        fontSize="12px"
                    >
                        {text}
                    </Text>
                </Flex>
            </Link>
        </NextLink>
    );
};

export const Menubar = ({ isUserDetail }) => {
    const router = useRouter();

    return (
        <Flex
            display={{ base: "flex", md: "none" }}
            position="fixed"
            h="70px"
            bg="white"
            zIndex="100"
            boxShadow="nav"
            bottom="0"
            alignItems="center"
            w="100%"
            px="24px"
            justifyContent="space-between"
        >
            <NavItem
                isUserDetail
                href="/home"
                icon="home"
                text="Beranda"
                isActive={router.pathname == "/home"}
            />
            <NavItem
                isUserDetail
                href="/search"
                icon="search"
                text="Cari Teman"
                isActive={router.pathname == "/search"}
            />
            <NavItem
                isUserDetail
                href="/chat"
                icon="chat"
                text="Pesan"
                isActive={router.pathname == "/chat"}
            />
        </Flex>
    );
};
