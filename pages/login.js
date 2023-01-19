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
import { auth, db, storage } from "../app/firebase";
import useFirebaseAuth from "../feature/hook/useFirebaseAuth";
import { useSelector } from "react-redux";
import { LogoLink } from "../components/LogoLink";

export default function Home() {
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

    useEffect(() => {
        if (authUser.uid) router.push("/home");
    }, [authUser]);

    const showPassword = () => {
        setIsPasswordShowed(!isPasswordShowed);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formValues.email !== "" && formValues.password !== "") {
            setLoading(true);

            try {
                const res = await signInWithEmailAndPassword(
                    auth,
                    formValues.email,
                    formValues.password
                );

                toast({
                    variant: "subtle",
                    position: "top",
                    title: "Berhasil login!",
                    description: "Silakan mulai cari teman belajarmu di sini!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });

                setLoading(false);
                router.push("/home");
            } catch (error) {
                const errorCode = error.code;
                let errorMessage = "Terjadi kesalahan silahkan coba lagi...";

                switch (errorCode) {
                    case "auth/wrong-password":
                        errorMessage = "Email atau password salah, coba lagi!";
                        break;
                    case "auth/user-not-found":
                        errorMessage = "Akun dengan email tersebut tidak ditemukan";
                        break;
                }

                toast({
                    variant: "subtle",
                    position: "top",
                    title: "Terjadi kesalahan",
                    description: errorMessage,
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
                    <LogoLink />

                    <Box mt="40px">
                        <Heading fontWeight="bold" fontSize="h3">
                            Selamat datang kembali!
                        </Heading>
                        <Text fontSize="p3" color="neutral.60" mt="12px">
                            Mulai temukan teman belajarmu di sini!
                        </Text>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Flex alignItems="stretch" gap="20px" mt="40px" flexDir="column">
                            <FormControl>
                                <FormLabel fontWeight="bold" color="neutral.60">
                                    Email
                                </FormLabel>
                                <Input
                                    required
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
                                        required
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
                            <Button type="submit" variant="primary" size="full" isLoading={loading}>
                                Login
                            </Button>
                        </Flex>
                    </form>
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
