import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

export const Feature = ({ title, children, img, isCenter, isFeature }) => {
    return (
        <Flex
            flexDir="column"
            alignItems="center"
            gap="4px"
            maxW="210px"
            textAlign="center"
            mb={isCenter ? { md: "40px" } : ""}
            alignSelf={isFeature ? "end" : ""}
        >
            <Box w="140px" h="140px">
                <Image src={`./images/${img}`} alt={`illustration-${img}`}></Image>
            </Box>
            {isFeature && (
                <Heading as="h3" fontSize="20px" mt="8px">
                    {title}
                </Heading>
            )}

            <Text color="neutral.60">{children}</Text>
        </Flex>
    );
};
