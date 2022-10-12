import { Text } from "@chakra-ui/react";
import React from "react";

export const BidangPill = ({ color, name }) => {
    return (
        <Text
            borderRadius="50px"
            px="10px"
            py="2px"
            fontSize="10px"
            color="neutral.80"
            bg={color}
            noOfLines="1"
            w="fit-content"
        >
            {name}
        </Text>
    );
};
