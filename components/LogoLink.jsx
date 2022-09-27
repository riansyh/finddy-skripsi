import React from "react";
import NextLink from "next/link";
import { Box, Image, Link } from "@chakra-ui/react";

export const LogoLink = () => {
    return (
        <NextLink href="/" passHref>
            <Link w="fit-content">
                <Box
                    w="40px"
                    h="40px"
                    borderRadius="12px"
                    zIndex="2"
                    overflow="hidden"
                    cursor="pointer"
                >
                    <Image src="/images/logo.png" alt="Logo Finddy"></Image>
                </Box>
            </Link>
        </NextLink>
    );
};
