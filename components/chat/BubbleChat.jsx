import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

export const BubbleChat = ({ type = "mine", children, time }) => {
    return (
        <Flex flexDir="column" alignItems={type == "mine" ? "flex-end" : "flex-start"}>
            <Box
                color="#333"
                bg={type == "mine" ? "accent.grass" : "primary.lightblue"}
                fontSize="12px"
                minW="100px"
                borderRadius="4px"
                px="10px"
                py="8px"
                w="fit-content"
                maxW="90%"
            >
                {children}
            </Box>
            <Text color="#7E7E7E" mt="4px" fontSize="8px">
                {time}
            </Text>
        </Flex>
    );
};
