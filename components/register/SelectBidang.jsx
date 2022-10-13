import { Box } from "@chakra-ui/react";
import React from "react";

export const SelectBidang = ({ children, clickHandler }) => {
    return (
        <Box
            borderRadius="4px"
            px="8px"
            py="4px"
            transition="ease"
            transitionDuration="300ms"
            onClick={clickHandler}
            cursor="pointer"
            _hover={{ bg: "#f9f9f9" }}
        >
            {children}
        </Box>
    );
};
