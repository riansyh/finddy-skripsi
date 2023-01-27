import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Checkbox, useToast } from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { changePref } from "../../feature/register/registerSlice";

import Head from "next/head";
import { FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/router";
import useFirebaseAuth from "../../feature/hook/useFirebaseAuth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../app/firebase";

export default function User() {
    const [loading, setLoading] = useState(false);

    const form = useSelector((state) => state.register);
    const authUser = useSelector((state) => state.authUser);
    const dispatch = useDispatch();
    const toast = useToast();
    const router = useRouter();

    useFirebaseAuth();

    useEffect(() => {
        dispatch(changePref({ index: 0, value: authUser.data?.pref[0] }));
        dispatch(changePref({ index: 1, value: authUser.data?.pref[1] }));
        dispatch(changePref({ index: 2, value: authUser.data?.pref[2] }));
        dispatch(changePref({ index: 3, value: authUser.data?.pref[3] }));
    }, [authUser]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await updateDoc(doc(db, "users", authUser.uid), {
                pref: form.pref,
            });

            toast({
                variant: "subtle",
                position: "top",
                title: "Berhasil",
                description: "Preferensi teman belajar berhasil diperbarui!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            setLoading(false);
            router.push("/profile");
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
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
    };

    return (
        <>
            <Head>
                <title>Finddy | Edit Preferensi Teman</title>
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
                    maxW={{ md: "600px" }}
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
                                    Edit Preferensi Belajar
                                </Heading>
                            </Flex>
                        </Box>

                        <Flex
                            flexDir="column"
                            alignItems="center"
                            justifyContent="space-between"
                            minH="100vh"
                        >
                            <Flex
                                alignItems="stretch"
                                mt="40px"
                                flexDir="column"
                                gap="12px"
                                w="100%"
                            >
                                <Box px="12px" py="8px" borderRadius="8px" boxShadow="card">
                                    <Checkbox
                                        spacing="12px"
                                        fontSize="p2"
                                        isChecked={form.pref[0]}
                                        onChange={(e) =>
                                            dispatch(
                                                changePref({
                                                    index: 0,
                                                    value: e.target.checked,
                                                })
                                            )
                                        }
                                    >
                                        Mencari teman belajar untuk belajar bersama
                                    </Checkbox>
                                </Box>
                                <Box px="12px" py="8px" borderRadius="8px" boxShadow="card">
                                    <Checkbox
                                        spacing="12px"
                                        fontSize="p2"
                                        isChecked={form.pref[1]}
                                        onChange={(e) =>
                                            dispatch(
                                                changePref({
                                                    index: 1,
                                                    value: e.target.checked,
                                                })
                                            )
                                        }
                                    >
                                        Mencari teman belajar sebagai mentor
                                    </Checkbox>
                                </Box>
                                <Box px="12px" py="8px" borderRadius="8px" boxShadow="card">
                                    <Checkbox
                                        spacing="12px"
                                        fontSize="p2"
                                        isChecked={form.pref[2]}
                                        onChange={(e) =>
                                            dispatch(
                                                changePref({
                                                    index: 2,
                                                    value: e.target.checked,
                                                })
                                            )
                                        }
                                    >
                                        Mencari teman belajar untuk bertanya dan sharing
                                    </Checkbox>
                                </Box>
                                <Box px="12px" py="8px" borderRadius="8px" boxShadow="card">
                                    <Checkbox
                                        spacing="12px"
                                        fontSize="p2"
                                        isChecked={form.pref[3]}
                                        onChange={(e) =>
                                            dispatch(
                                                changePref({
                                                    index: 3,
                                                    value: e.target.checked,
                                                })
                                            )
                                        }
                                    >
                                        Mencari teman belajar sebagai teman seperjuangan
                                    </Checkbox>
                                </Box>
                            </Flex>

                            <Flex gap="16px" flexDir="column" mt="40px" w="100%">
                                <Button
                                    variant="primary"
                                    size="full"
                                    onClick={handleSubmit}
                                    isLoading={loading}
                                    disabled={!form.pref.includes(true)}
                                >
                                    Simpan perubahan
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="full"
                                    onClick={() => router.back()}
                                >
                                    Batalkan
                                </Button>
                            </Flex>
                        </Flex>
                    </Box>
                </Flex>
            </Flex>
        </>
    );
}
