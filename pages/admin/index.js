import {
    Box,
    Button,
    Input,
    InputGroup,
    InputRightElement,
    Flex,
    Text,
    Heading,
    FormControl,
    Image,
    FormLabel,
    useToast,
} from "@chakra-ui/react";

import { FiEye, FiEyeOff } from "react-icons/fi";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../app/firebase";
import useFirebaseAuth from "../../feature/hook/useFirebaseAuth";
import { useSelector } from "react-redux";
import { LogoLink } from "../../components/LogoLink";

export default function AdminLogin() {
    const [isPasswordShowed, setIsPasswordShowed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });

    useFirebaseAuth();
    const router = useRouter();
    const toast = useToast();
    const authUser = useSelector((state) => state.authUser);

    const showPassword = () => {
        setIsPasswordShowed(!isPasswordShowed);
    };

    const handleSubmit = async () => {
        if (formValues.email !== "" && formValues.password !== "") {
            setLoading(true);

            if (formValues.email == "admin@finddy.com" && formValues.password == "admin") {
                toast({
                    variant: "subtle",
                    position: "top",
                    title: "Berhasil login!",
                    description: "Selamat datang admin!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });

                setLoading(false);
                router.push("/admin/laporan");
            } else {
                toast({
                    variant: "subtle",
                    position: "top",
                    title: "Email atau Kata sandi salah",
                    description: "Silakan coba lagi",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });

                setLoading(false);
            }
        }
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
                minW="100%"
                justify="center"
                alignItems="center"
                bg="primary.lightblue"
                flexDir="column"
                gap="40px"
            >
                <Heading fontSize="h4">Login Admin</Heading>
                <Flex
                    w="100%"
                    maxW={{ md: "600px" }}
                    h="fit-content"
                    bg="white"
                    px="24px"
                    flexDir="column"
                    py="32px"
                    overflowY="auto"
                    position="relative"
                    borderRadius="12px"
                >
                    <Flex alignItems="stretch" gap="20px" flexDir="column">
                        <FormControl>
                            <FormLabel fontWeight="bold" color="neutral.60">
                                Email
                            </FormLabel>
                            <Input
                                placeholder="finddy@gmail.com"
                                type="email"
                                id="email"
                                value={formValues.email}
                                onChange={(e) =>
                                    setFormValues((prev) => ({
                                        ...prev,
                                        [e.target.id]: e.target.value,
                                    }))
                                }
                            ></Input>
                        </FormControl>
                        <FormControl>
                            <FormLabel fontWeight="bold" color="neutral.60">
                                Password
                            </FormLabel>
                            <InputGroup>
                                <Input
                                    placeholder="******"
                                    type={isPasswordShowed ? "text" : "password"}
                                    id="password"
                                    value={formValues.password}
                                    onChange={(e) =>
                                        setFormValues((prev) => ({
                                            ...prev,
                                            [e.target.id]: e.target.value,
                                        }))
                                    }
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
                        </FormControl>
                    </Flex>

                    <Flex gap="16px" flexDir="column" mt="40px" w="100%">
                        <Button
                            variant="primary"
                            size="full"
                            onClick={handleSubmit}
                            isLoading={loading}
                        >
                            Login
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </div>
    );
}
