import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { FiChevronLeft, FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter } from "next/router";
import useFirebaseAuth from "../../feature/hook/useFirebaseAuth";

export default function User() {
    const authUser = useSelector((state) => state.authUser);
    const dispatch = useDispatch();
    const router = useRouter();

    const [form, setForm] = useState({ current: "", new: "", newConfirm: "" });
    const [showPassword, setShowPassword] = useState(false);

    useFirebaseAuth();

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
                    w="100%"
                    bg="white"
                    px="24px"
                    flexDir="column"
                    py="32px"
                    overflowY="auto"
                    position="relative"
                >
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
                                                    onClick={() => setShowPassword(!showPassword)}
                                                />
                                            ) : (
                                                <FiEyeOff
                                                    color="#333333"
                                                    onClick={() => setShowPassword(!showPassword)}
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
                                            setForm((prev) => ({ ...prev, new: e.target.value }))
                                        }
                                    ></Input>
                                    <InputRightElement>
                                        <Box cursor="pointer">
                                            {showPassword ? (
                                                <FiEye
                                                    color="#333333"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                />
                                            ) : (
                                                <FiEyeOff
                                                    color="#333333"
                                                    onClick={() => setShowPassword(!showPassword)}
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
                                                    onClick={() => setShowPassword(!showPassword)}
                                                />
                                            ) : (
                                                <FiEyeOff
                                                    color="#333333"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                />
                                            )}
                                        </Box>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                        </Flex>

                        <Flex gap="16px" flexDir="column" mt="40px" w="100%">
                            <Button variant="primary" size="full">
                                Simpan perubahan
                            </Button>
                            <Button variant="secondary" size="full" onClick={() => router.back()}>
                                Batalkan
                            </Button>
                        </Flex>
                    </Box>
                </Flex>
            </Flex>
        </>
    );
}
