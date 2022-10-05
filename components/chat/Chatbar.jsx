import { Box, Button, Flex, Heading, Image, Input, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";

export const Chatbar = () => {
    const router = useRouter();

    return (
        <Flex
            display={{ base: "flex", md: "none" }}
            position="fixed"
            h="67px"
            bg="white"
            zIndex="100"
            boxShadow="nav"
            bottom="0"
            alignItems="center"
            w="100%"
            py="12px"
            px="8px"
            gap="12px"
            justifyContent="space-between"
        >
            <Input borderRadius="40px" fontSize="12px"></Input>
            <Button variant="primary" borderRadius="80px">
                <FiSend />
            </Button>
        </Flex>
    );
};
