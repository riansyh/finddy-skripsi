import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Carousel } from "react-responsive-carousel";

export const Motivations = () => {
    return (
        <Flex
            w="100%"
            maxW="550px"
            boxShadow="card"
            borderRadius="16px"
            bg="white"
            flexDir="column"
            alignItems="center"
            pt="16px"
        >
            <Text fontSize="16px" fontWeight="bold" letterSpacing="2px">
                MOTIVASI HARIAN
            </Text>
            <Carousel
                infiniteLoop
                showArrows={false}
                showStatus={false}
                showThumbs={false}
                autoPlay
                interval="5000"
            >
                <Flex
                    h="160px"
                    px="24px"
                    w="100%"
                    bg="white"
                    alignItems="center"
                    justifyContent="center"
                    pb="32px"
                    flexDir="column"
                    gap="8px"
                >
                    <Text fontSize="14px">
                        &quot;Belajar tanpa keinginan merusak ingatan, dan tidak menyimpan apa pun
                        yang diperlukan.&quot;
                    </Text>
                    <Text fontSize="14px" color="primary.orange">
                        - Leonardo da Vinci
                    </Text>
                </Flex>
                <Flex
                    h="160px"
                    px="24px"
                    w="100%"
                    bg="white"
                    alignItems="center"
                    justifyContent="center"
                    pb="32px"
                    flexDir="column"
                    gap="4px"
                >
                    <Text fontSize="14px">
                        &quot;Milikilah semangat, karena itulah satu-satunya modal dasar yang harus
                        dipelihara.&quot;
                    </Text>
                </Flex>
                <Flex
                    h="160px"
                    px="24px"
                    w="100%"
                    bg="white"
                    alignItems="center"
                    justifyContent="center"
                    pb="32px"
                    flexDir="column"
                    gap="8px"
                >
                    <Text fontSize="14px">
                        &quot;Hiduplah seolah-olah kamu akan mati besok. Belajarlah seolah-olah Anda
                        hidup selamanya.&quot;
                    </Text>
                    <Text fontSize="14px" color="primary.orange">
                        - Mahatma Gandhi
                    </Text>
                </Flex>
            </Carousel>
        </Flex>
    );
};
