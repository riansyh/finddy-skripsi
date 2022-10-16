import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import { sendMessage } from "../../feature/sendMessage";
import { showMessageTime } from "../../feature/showMessageTime";

export const BubbleChat = ({ isMyChat, children, time, user, chatId, userId }) => {
    const ref = useRef();
    const authUser = useSelector((state) => state.authUser);

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [children]);

    const handleSendContact = async () => {
        await sendMessage(`Ini kontaknya ya ${user.kontak}`, chatId, authUser, userId);
    };

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
                {children == "Halo, boleh minta kontaknya ga?" && (
                    <>
                        <Divider borderColor="neutral.40" my="4px" />
                        <Box
                            bg={isMyChat ? "accent.grass" : "#E5EBEE"}
                            cursor="pointer"
                            onClick={handleSendContact}
                        >
                            <Flex
                                alignItems="center"
                                justifyContent="center"
                                gap="4px"
                                w="100%"
                                fontWeight="bold"
                                color="primary.calmblue"
                            >
                                <FiSend />
                                Kirim kontak
                            </Flex>
                        </Box>
                    </>
                )}
            </Box>
            <Text color="#7E7E7E" mt="2px" fontSize="8px">
                {showMessageTime(time, true)}
            </Text>
        </Flex>
    );
};
