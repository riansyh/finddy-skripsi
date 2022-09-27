import React, { useState } from "react";
import { Box, Button, Flex, Text, Heading, Checkbox, useToast } from "@chakra-ui/react";
import { changePref } from "./../../feature/register/registerSlice";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../app/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";

export const PreferensiBelajar = ({ saveFunction, prevFunction }) => {
    const [loading, setLoading] = useState(false);

    const form = useSelector((state) => state.register);
    const authUser = useSelector((state) => state.authUser);
    const dispatch = useDispatch();
    const toast = useToast();
    const router = useRouter();

    const handleSubmit = async () => {
        setLoading(true);

        try {
            await updateDoc(doc(db, "users", authUser.uid), {
                username: form.username,
                imgUrl: form.imgUrl,
                perguruanTinggi: form.perguruanTinggi,
                kabupaten: form.kabupaten,
                provinsi: form.provinsi,
                kontak: form.kontak,
                bidangMinat: form.bidangMinat,
                pref: form.pref,
                isComplete: true,
            });

            toast({
                variant: "subtle",
                title: "Akun berhasil diupdate!",
                description: "Data kamu saat ini sudah lengkap",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            setLoading(false);
            router.push("/home");
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast({
                variant: "subtle",
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
        <Flex flexDir="column" alignItems="center" justifyContent="space-between" minH="100vh">
            <Box mt="40px">
                <Heading fontWeight="bold" fontSize="h3">
                    Tentukan preferensi teman belajar
                </Heading>
                <Text fontSize="p3" color="neutral.60" mt="12px">
                    Pilih beberapa kriteria berikut yang akan membantu proses pencarian teman
                    belajarmu
                </Text>
                <Flex alignItems="stretch" mt="40px" flexDir="column" gap="12px" w="100%">
                    <Box px="12px" py="8px" borderRadius="8px" boxShadow="card">
                        <Checkbox
                            spacing="12px"
                            fontSize="p2"
                            isChecked={form.pref[0]}
                            onChange={(e) =>
                                dispatch(changePref({ index: 0, value: e.target.checked }))
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
                                dispatch(changePref({ index: 1, value: e.target.checked }))
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
                                dispatch(changePref({ index: 2, value: e.target.checked }))
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
                                dispatch(changePref({ index: 3, value: e.target.checked }))
                            }
                        >
                            Mencari teman belajar sebagai teman seperjuangan
                        </Checkbox>
                    </Box>
                </Flex>
            </Box>

            <Flex gap="16px" flexDir="column" mt="40px" w="100%">
                <Button variant="primary" size="full" onClick={handleSubmit} isLoading={loading}>
                    Simpan Data
                </Button>
                <Button variant="secondary" size="full" onClick={prevFunction}>
                    Kembali
                </Button>
            </Flex>
        </Flex>
    );
};
