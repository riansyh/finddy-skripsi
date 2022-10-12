import { Box } from "@chakra-ui/react";
import React from "react";

export const BidangOption = ({ children, isActive, onClick }) => {
    return (
        <Box
            px="10px"
            py="10px"
            minW="max-content"
            color={isActive ? "white" : "neutral.80"}
            bg={isActive ? "primary.calmblue" : "#C8E8FF"}
            borderRadius="50px"
            cursor="pointer"
            transition="ease"
            transitionDuration="400ms"
            fontSize="10px"
            lineHeight="12.6px"
            onClick={onClick}
            _hover={isActive ? { bg: "#146AA6" } : { bg: "#A9D3F0" }}
        >
            {children}
        </Box>
    );
};
