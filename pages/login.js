import {
    Box,
    Button,
    Input,
    InputGroup,
    InputRightElement,
    Flex,
    Text,
    Heading,
    Fade,
    Image,
    FormLabel,
} from "@chakra-ui/react";

import { FiEye, FiEyeOff } from "react-icons/fi";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
    const [isPasswordShowed, setIsPasswordShowed] = useState(false);

    const router = useRouter();

    const showPassword = () => {
        setIsPasswordShowed(!isPasswordShowed);
    };

    return (
        <div>
            <Head>
                <title>Finddy | Login</title>
                <link rel="icon" href="/logo.svg" />
            </Head>

            <Flex
                as="main"
                minH="100vh"
                minW="100vw"
                justify="center"
                alignItems="center"
                bg="primary.lightblue"
            >
                <Flex
                    minH={{ base: "100vh", md: "600px" }}
                    w="100vw"
                    maxW={{ md: "500px" }}
                    maxH={{ md: "400px" }}
                    borderRadius={{ md: "12px" }}
                    bg="white"
                    px="24px"
                    flexDir="column"
                    py="32px"
                    overflowY="scroll"
                    position="relative"
                >
                    <Box w="40px" h="40px" borderRadius="12px" zIndex="2" overflow="hidden">
                        <Image src="/images/logo.png" alt="Logo Finddy"></Image>
                    </Box>

                    <Box mt="40px">
                        <Heading fontWeight="bold" fontSize="h3">
                            Selamat datang kembali!
                        </Heading>
                        <Text fontSize="p3" color="neutral.60" mt="12px">
                            Mulai temukan teman belajarmu di sini!
                        </Text>
                    </Box>

                    <Flex alignItems="stretch" gap="20px" mt="40px" flexDir="column">
                        <Box>
                            <FormLabel fontWeight="bold" color="neutral.60">
                                Email
                            </FormLabel>
                            <Input placeholder="finddy@gmail.com" type="email"></Input>
                        </Box>
                        <Box>
                            <FormLabel fontWeight="bold" color="neutral.60">
                                Password
                            </FormLabel>
                            <InputGroup>
                                <Input
                                    placeholder="******"
                                    type={isPasswordShowed ? "text" : "password"}
                                ></Input>
                                <InputRightElement>
                                    <Box cursor="pointer">
                                        {isPasswordShowed ? (
                                            <FiEye color="#333333" onClick={showPassword} />
                                        ) : (
                                            <FiEyeOff color="#333333" onClick={showPassword} />
                                        )}
                                    </Box>
                                </InputRightElement>
                            </InputGroup>
                        </Box>
                    </Flex>

                    <Flex gap="16px" flexDir="column" mt="40px" w="100%">
                        <Button variant="primary" size="full" onClick={() => router.push("/login")}>
                            Login
                        </Button>
                    </Flex>
                    <Flex gap="8px" flexDir="column" mt="60px" w="100%">
                        <Text fontSize="p3" color="neutral.60" textAlign="center">
                            Belum memiliki akun?
                        </Text>
                        <Button
                            variant="secondary"
                            size="full"
                            onClick={() => router.push("/register")}
                        >
                            Registrasi Sekarang
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </div>
    );
}
