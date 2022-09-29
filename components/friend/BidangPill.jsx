import { Box } from "@chakra-ui/react";
import React from "react";

export const BidangPill = ({ color, name }) => {
    return (
        <Box borderRadius="50px" px="10px" py="2px" fontSize="10px" color="neutral.80" bg={color}>
            {name}
        </Box>
    );
};
