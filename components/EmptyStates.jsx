import { Button, Flex, Image, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

export const EmptyStates = ({ text, children, isHaveButton, btnText, btnHref }) => {
    return (
        <Flex flexDir="column" alignItems="center" justifyContent="center" gap="4px" py="60px">
            <Image
                w="160px"
                h="127px"
                alt="empty state illustration"
                src="./images/empty.svg"
            ></Image>
            <Text color="neutral.40" mb="8px" textAlign="center">
                {text}
            </Text>
            {isHaveButton && (
                <NextLink href={btnHref} passHref>
                    <Link _hover={{ textDecoration: "none" }}>
                        <Button variant="secondary" mt="12px">
                            {btnText}
                        </Button>
                    </Link>
                </NextLink>
            )}
        </Flex>
    );
};
