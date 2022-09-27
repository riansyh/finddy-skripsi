import { Box, Flex } from "@chakra-ui/react";
import Head from "next/head";
import { useState, useEffect } from "react";
import { Data } from "../../components/register/Data";
import { PreferensiBelajar } from "../../components/register/PreferensiBelajar";
import { BidangMinat } from "../../components/register/BidangMinat";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import useFirebaseAuth from "../../feature/hook/useFirebaseAuth";

export default function Home() {
    const [slider, setSlider] = useState(0);
    const [isTransiting, setIsTransiting] = useState(false);

    const router = useRouter();
    useFirebaseAuth();

    const authUser = useSelector((state) => state.authUser);

    useEffect(() => {
        if (authUser.uid == null) router.push("/login");
        if (authUser.isComplete) router.push("/home");
    }, [authUser]);

    const handleSlide = (number) => {
        setTimeout(() => {
            setIsTransiting(false);
            setSlider(slider + number);
            window.scrollTo(0, 0);
        }, 200);
        setIsTransiting(true);
    };

    return (
        <div>
            <Head>
                <title>Finddy | Lengkapi Data</title>
                <meta name="description" content="" />
                <link rel="icon" href="/logo.svg" />
            </Head>

            <Flex
                as="main"
                minH="100vh"
                minW="100%"
                justify="center"
                alignItems="center"
                bg="primary.lightblue"
            >
                <Flex
                    minH={{ base: "100vh", md: "600px" }}
                    w="100%"
                    maxW={{ md: "600px" }}                    
                    bg="white"
                    px="24px"
                    flexDir="column"
                    py="32px"
                    overflowY="auto"
                    position="relative"
                >
                    <Flex position="absolute" top="0" left="0" right="0" gap="8px">
                        <Box h="8px" w="100%" bg={slider >= 0 ? "#87BDE3" : "#E6E6E6"}></Box>
                        <Box h="8px" w="100%" bg={slider >= 1 ? "#87BDE3" : "#E6E6E6"}></Box>
                        <Box h="8px" w="100%" bg={slider >= 2 ? "#87BDE3" : "#E6E6E6"}></Box>
                    </Flex>

                    <Box
                        opacity={isTransiting ? "0.1" : "1"}
                        transition="ease-in"
                        transitionDuration="150ms"
                    >
                        {slider == 0 && (
                            <Data authUser={authUser} nextFunction={() => handleSlide(1)} />
                        )}
                        {slider == 1 && (
                            <BidangMinat
                                nextFunction={() => handleSlide(1)}
                                prevFunction={() => handleSlide(-1)}
                            />
                        )}
                        {slider == 2 && (
                            <PreferensiBelajar
                                saveFunction={() => handleSlide(1)}
                                prevFunction={() => handleSlide(-1)}
                            />
                        )}
                    </Box>
                </Flex>
            </Flex>
        </div>
    );
}
