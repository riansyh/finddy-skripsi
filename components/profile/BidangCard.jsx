import { Text, Box } from "@chakra-ui/react";

import React from "react";

export const BidangCard = ({ children, skill }) => {
    const skillColor =
        skill == "Pemula"
            ? "accent.grass"
            : skill == "Menengah"
            ? "accent.lavendar"
            : "accent.skin";

    return (
        <Box
            p="12px"
            boxShadow="card"
            borderRadius="8px"
            border="1px"
            borderColor="primary.lightblue"
            w="100%"
        >
            <Text fontSize="h6" color="primary.calmblue" fontWeight="bold" textAlign="left">
                {children}
            </Text>
            <Box
                mt="6px"
                px="10px"
                py="2px"
                borderRadius="40px"
                color="neutral.80"
                bg={skillColor}
                w="fit-content"
                fontSize="p4"
            >
                {skill}
            </Box>
        </Box>
    );
};
