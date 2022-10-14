import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Input,
    Flex,
    Text,
    Heading,
    FormLabel,
    FormControl,
    Avatar,
    AvatarBadge,
    Link,
    useToast,
} from "@chakra-ui/react";

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
} from "@chakra-ui/react";

import { AiFillCamera, AiFillInfoCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { change } from "./../../feature/register/registerSlice";
import { db, storage } from "../../app/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Head from "next/head";
import { FiChevronLeft } from "react-icons/fi";
import NextLink from "next/link";
import { useRouter } from "next/router";
import useFirebaseAuth from "../../feature/hook/useFirebaseAuth";
import { doc, updateDoc } from "firebase/firestore";

export default function User() {
    const form = useSelector((state) => state.register);
    const authUser = useSelector((state) => state.authUser);
    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    useFirebaseAuth();

    useEffect(() => {
        dispatch(change({ name: "imgUrl", value: authUser.data?.imgUrl }));
        dispatch(change({ name: "username", value: authUser.data?.username }));
        dispatch(change({ name: "perguruanTinggi", value: authUser.data?.perguruanTinggi }));
        dispatch(change({ name: "kabupaten", value: authUser.data?.kabupaten }));
        dispatch(change({ name: "provinsi", value: authUser.data?.provinsi }));
        dispatch(change({ name: "kontak", value: authUser.data?.kontak }));
    }, [authUser]);

    const handleUploadImage = async (e) => {
        try {
            if (!e.target.files || e.target.files.length === 0) {
                return;
            }

            const storageRef = await ref(storage, `profile/${authUser.email}.png`);
            const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

            uploadTask.on(
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        dispatch(change({ name: "imgUrl", value: downloadURL }));
                    });
                }
            );
        } catch (error) {}
    };

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
            });

            toast({
                variant: "subtle",
                position: "top",
                title: "Akun berhasil diupdate!",
                description: "Data kamu saat ini sudah lengkap",
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
                <title>Finddy | Edit Profil</title>
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
                                    Edit Profil
                                </Heading>
                            </Flex>
                        </Box>

                        <Flex alignItems="center" gap="20px" mt="40px" flexDir="column">
                            <FormControl display="flex" justifyContent="center">
                                <FormLabel
                                    fontWeight="bold"
                                    color="neutral.60"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    width="fit-content"
                                    cursor="pointer"
                                >
                                    <Avatar size="xl" src={form.imgUrl != "" ? form.imgUrl : ""}>
                                        <AvatarBadge boxSize="1em" borderColor="transparent">
                                            <AiFillCamera />
                                        </AvatarBadge>
                                    </Avatar>
                                </FormLabel>
                                <Input
                                    type="file"
                                    opacity="0"
                                    display="none"
                                    onChange={handleUploadImage}
                                ></Input>
                            </FormControl>

                            <FormControl>
                                <FormLabel fontWeight="bold" color="neutral.60">
                                    Email
                                </FormLabel>
                                <Input
                                    placeholder="Rian Febriansyah"
                                    type="text"
                                    id="email"
                                    isDisabled
                                    value={authUser.email}
                                ></Input>
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight="bold" color="neutral.60">
                                    Username
                                </FormLabel>
                                <Input
                                    placeholder="Rian Febriansyah"
                                    type="text"
                                    id="username"
                                    value={form.username}
                                    onChange={(e) =>
                                        dispatch(
                                            change({ name: "username", value: e.target.value })
                                        )
                                    }
                                ></Input>
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight="bold" color="neutral.60">
                                    Asal Perguruan Tinggi
                                </FormLabel>
                                <Input
                                    placeholder="Universitas Padjadjaran"
                                    type="text"
                                    id="perguruanTinggi"
                                    value={form.perguruanTinggi}
                                    onChange={(e) =>
                                        dispatch(
                                            change({
                                                name: "perguruanTinggi",
                                                value: e.target.value,
                                            })
                                        )
                                    }
                                ></Input>
                            </FormControl>
                            <Flex gap="8px" w="100%" alignItems="end">
                                <FormControl>
                                    <FormLabel fontWeight="bold" color="neutral.60">
                                        Lokasi
                                    </FormLabel>
                                    <Input
                                        placeholder="Kabupaten/kota"
                                        type="text"
                                        value={form.kabupaten}
                                        onChange={(e) =>
                                            dispatch(
                                                change({ name: "kabupaten", value: e.target.value })
                                            )
                                        }
                                    ></Input>
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontWeight="bold" color="neutral.60"></FormLabel>
                                    <Input
                                        placeholder="Provinsi"
                                        type="text"
                                        value={form.provinsi}
                                        onChange={(e) =>
                                            dispatch(
                                                change({ name: "provinsi", value: e.target.value })
                                            )
                                        }
                                    ></Input>
                                </FormControl>
                            </Flex>

                            <FormControl>
                                <FormLabel fontWeight="bold" color="neutral.60">
                                    <Flex alignItems="center" gap="4px">
                                        <Text> Kontak (No. WhatsApp)</Text>
                                        <Popover>
                                            <PopoverTrigger>
                                                <button>
                                                    <AiFillInfoCircle color="#FE922F" />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <PopoverArrow />
                                                <PopoverBody fontWeight="normal" fontSize="14px">
                                                    Kontak hanya ditampilkan kepada teman belajar
                                                    yang kamu izinkan saja
                                                </PopoverBody>
                                            </PopoverContent>
                                        </Popover>
                                    </Flex>
                                </FormLabel>
                                <Input
                                    placeholder="0851xxxxxxxx"
                                    type="tel"
                                    id="kontak"
                                    value={form.kontak}
                                    onChange={(e) =>
                                        dispatch(change({ name: "kontak", value: e.target.value }))
                                    }
                                ></Input>
                            </FormControl>
                            <NextLink href="/" passHref>
                                <Link
                                    fontSize="h6"
                                    fontWeight="bold"
                                    color="primary.calmblue"
                                    alignSelf="flex-start"
                                >
                                    Ubah password
                                </Link>
                            </NextLink>
                        </Flex>

                        <Flex gap="16px" flexDir="column" mt="40px" w="100%">
                            <Button
                                variant="primary"
                                size="full"
                                disabled={
                                    form.username === "" ||
                                    form.perguruanTinggi === "" ||
                                    form.kabupaten === "" ||
                                    form.provinsi === "" ||
                                    form.kontak === ""
                                }
                                onClick={handleSubmit}
                                isLoading={loading}
                            >
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
