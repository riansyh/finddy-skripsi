import { Box, Flex } from "@chakra-ui/react";
import React from "react";

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
                    <Flex gap="32px" alignItems="center" color="white">
                        Test
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    );
};
