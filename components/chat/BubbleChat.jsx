import { Box, Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { useEffect, useRef } from "react";
import { showMessageTime } from "../../feature/showMessageTime";

export const BubbleChat = ({ isMyChat, children, time }) => {
    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [children]);

    return (
        <Flex flexDir="column" alignItems={isMyChat ? "flex-end" : "flex-start"} ref={ref}>
            <Box
                color="#333"
                bg={isMyChat ? "accent.grass" : "#E5EBEE"}
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
            <Text color="#7E7E7E" mt="2px" fontSize="8px">
                {showMessageTime(time, true)}
            </Text>
        </Flex>
    );
};
