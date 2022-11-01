import React, { useState } from "react";
import {
    Box,
    Button,
    Input,
    Flex,
    Heading,
    FormLabel,
    FormControl,
    InputGroup,
    InputRightElement,
    useToast,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { FiChevronLeft, FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter } from "next/router";
import useFirebaseAuth from "../../feature/hook/useFirebaseAuth";
import { auth } from "../../app/firebase";
import {
    EmailAuthCredential,
    EmailAuthProvider,
    reauthenticateWithCredential,
    signOut,
    updatePassword,
} from "firebase/auth";

export default function User() {
    const authUser = useSelector((state) => state.authUser);
    const router = useRouter();
    const toast = useToast();

    const [form, setForm] = useState({ current: "", new: "", newConfirm: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useFirebaseAuth();

    const handleChangePassword = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const authCredential = EmailAuthProvider.credential(authUser.email, form.current);

        reauthenticateWithCredential(auth.currentUser, authCredential)
            .then(() => {
                updatePassword(auth.currentUser, form.new).then(() => {
                    toast({
                        variant: "subtle",
                        position: "top",
                        title: "Berhasil",
                        description: "Password berhasil diubah, silahkan login kembali",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                    });
                    auth.signOut();
                    setIsLoading(false);
                    router.push("/login");
                });
            })
            .catch((error) => {
                toast({
                    variant: "subtle",
                    position: "top",
                    title: "Terjadi kesalahan...",
                    description: error.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                setIsLoading(false);
            });
    };

    return (
        <>
            <Head>
                <title>Finddy | Ubah Password</title>
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
                    maxW="600px"
                    w="100%"
                    bg="white"
                    px="24px"
                    flexDir="column"
                    py="32px"
                    overflowY="auto"
                    position="relative"
                >
                    <form onSubmit={handleChangePassword}>
                        <Box transition="ease-in" transitionDuration="150ms">
                            <Box>
                                <Flex alignItems="center" gap="8px" color="neutral.80">
                                    <FiChevronLeft
                                        onClick={() => router.back()}
                                        size="16px"
                                        cursor="pointer"
                                    />

                                    <Heading fontWeight="bold" fontSize="h6">
                                        Ubah Password
                                    </Heading>
                                </Flex>
                            </Box>

                            <Flex alignItems="center" gap="20px" mt="40px" flexDir="column">
                                <FormControl>
                                    <FormLabel fontWeight="bold" color="neutral.60">
                                        Password saat ini
                                    </FormLabel>
                                    <InputGroup>
                                        <Input
                                            placeholder="Masukkan password saat ini"
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            value={form.current}
                                            onChange={(e) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    current: e.target.value,
                                                }))
                                            }
                                        ></Input>
                                        <InputRightElement>
                                            <Box cursor="pointer">
                                                {showPassword ? (
                                                    <FiEye
                                                        color="#333333"
                                                        onClick={() =>
                                                            setShowPassword(!showPassword)
                                                        }
                                                    />
                                                ) : (
                                                    <FiEyeOff
                                                        color="#333333"
                                                        onClick={() =>
                                                            setShowPassword(!showPassword)
                                                        }
                                                    />
                                                )}
                                            </Box>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontWeight="bold" color="neutral.60">
                                        Password baru
                                    </FormLabel>
                                    <InputGroup>
                                        <Input
                                            placeholder="Masukkan password baru"
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            value={form.new}
                                            onChange={(e) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    new: e.target.value,
                                                }))
                                            }
                                        ></Input>
                                        <InputRightElement>
                                            <Box cursor="pointer">
                                                {showPassword ? (
                                                    <FiEye
                                                        color="#333333"
                                                        onClick={() =>
                                                            setShowPassword(!showPassword)
                                                        }
                                                    />
                                                ) : (
                                                    <FiEyeOff
                                                        color="#333333"
                                                        onClick={() =>
                                                            setShowPassword(!showPassword)
                                                        }
                                                    />
                                                )}
                                            </Box>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontWeight="bold" color="neutral.60">
                                        Konfirmasi password baru
                                    </FormLabel>
                                    <InputGroup>
                                        <Input
                                            placeholder="Masukkan kembali password baru"
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            value={form.newConfirm}
                                            onChange={(e) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    newConfirm: e.target.value,
                                                }))
                                            }
                                        ></Input>
                                        <InputRightElement>
                                            <Box cursor="pointer">
                                                {showPassword ? (
                                                    <FiEye
                                                        color="#333333"
                                                        onClick={() =>
                                                            setShowPassword(!showPassword)
                                                        }
                                                    />
                                                ) : (
                                                    <FiEyeOff
                                                        color="#333333"
                                                        onClick={() =>
                                                            setShowPassword(!showPassword)
                                                        }
                                                    />
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
                                    type="submit"
                                    isLoading={isLoading}
                                    isDisabled={
                                        form.new !== form.newConfirm ||
                                        (form.current.length == 0) | (form.new.length == 0) ||
                                        form.newConfirm.length == 0
                                    }
                                >
                                    Ubah password
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="full"
                                    onClick={() => router.back()}
                                >
                                    Batalkan
                                </Button>
                            </Flex>
                        </Box>
                    </form>
                </Flex>
            </Flex>
        </>
    );
}
