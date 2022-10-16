import {
    Avatar,
    Box,
    Button,
    Flex,
    Heading,
    Link,
    ListItem,
    OrderedList,
    Text,
    Textarea,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    useToast,
} from "@chakra-ui/react";

import Head from "next/head";
import NextLink from "next/link";
import React from "react";
import { Menubar } from "../../components/Menubar";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { FiChevronLeft, FiMapPin, FiEdit2, FiEdit, FiLogOut } from "react-icons/fi";
import { IoMdSchool } from "react-icons/io";
import { AiOutlineWarning } from "react-icons/ai";
import { BidangCard } from "../../components/profile/BidangCard";
import useFirebaseAuth from "../../feature/hook/useFirebaseAuth";
import { auth } from "../../app/firebase";
import { signOut } from "firebase/auth";

export default function Profile() {
    useFirebaseAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const authUser = useSelector((state) => state.authUser);
    const router = useRouter();
    const toast = useToast();

    const handleSignOut = () => {
        auth.signOut();

        toast({
            position: "top",
            title: "Berhasil logout!",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        router.push("/login");
    };

    return (
        <>
            <Head>
                <title>Finddy | Profilku</title>
                <meta name="description" content="" />
                <link rel="icon" href="/logo.svg" />
            </Head>

            <Box position="relative" py="32px" pb="100px">
                <Flex w="100%" alignItems="center" justifyContent="center">
                    <Flex
                        maxW="1320px"
                        color="neutral.80"
                        px={{ base: "24px", md: "80px", lg: "120px" }}
                        w="100%"
                        textAlign={{ base: "left", md: "center" }}
                        flexDir="column"
                        justifyContent="center"
                    >
                        <Flex alignItems="center" onClick={() => router.back()} cursor="pointer">
                            <FiChevronLeft />
                            <Text fontSize="p3" opacity="0.7" maxW="550px" fontWeight="normal">
                                Kembali
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>

                <Flex w="100%" alignItems="center" justifyContent="center" mt="32px">
                    <Flex
                        maxW="1320px"
                        color="neutral.90"
                        px={{ base: "24px", md: "80px", lg: "120px" }}
                        w="100%"
                        textAlign={{ base: "center", md: "left" }}
                        flexDir="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Avatar
                            showBorder
                            borderColor="primary.calmblue"
                            w="100px"
                            h="100px"
                            src={authUser.data?.imgUrl}
                        />
                        <Heading as="h1" mt="4px" fontSize="h5">
                            {authUser.name}
                        </Heading>
                        <Text mt="4px" fontSize="p4" color="neutral.60">
                            @{authUser.data?.username}
                        </Text>
                        <Flex gap="4px" alignItems="center">
                            <IoMdSchool color="#666" />
                            <Text mt="4px" fontSize="p4" color="neutral.60">
                                {authUser.data?.perguruanTinggi}
                            </Text>
                        </Flex>
                        <Flex gap="8px" alignItems="center" mt="32px" w="100%">
                            <Button
                                variant="primary"
                                size="full"
                                onClick={() => router.push("/profile/edit")}
                            >
                                <FiEdit2 />
                                <Text ml="6px">Edit Profil</Text>
                            </Button>
                        </Flex>

                        <Flex gap="8px" alignItems="start" w="100%" mt="40px" flexDir="column">
                            <Flex w="100%" justifyContent="space-between" alignItems="center">
                                <Heading as="h2" fontSize="h6" color="neutral.80">
                                    Bidang/minat
                                </Heading>
                                <NextLink href="/profile/edit-bidang">
                                    <Link>
                                        <FiEdit color="#374151" size="16px" />
                                    </Link>
                                </NextLink>
                            </Flex>
                            <Flex flexDir="column" gap="12px" w="100%">
                                {authUser.data?.bidangMinat?.map((bidang, index) => (
                                    <BidangCard key={`bidangMinat-${index}`} skill={bidang.skill}>
                                        {bidang.name}
                                    </BidangCard>
                                ))}
                            </Flex>
                        </Flex>
                        <Flex gap="8px" alignItems="start" w="100%" mt="24px" flexDir="column">
                            <Flex w="100%" justifyContent="space-between" alignItems="center">
                                <Heading as="h2" fontSize="h6" color="neutral.80">
                                    Lokasi
                                </Heading>
                            </Flex>
                            <Box
                                p="12px"
                                boxShadow="card"
                                borderRadius="8px"
                                border="1px"
                                borderColor="primary.lightblue"
                                w="100%"
                            >
                                <Flex alignItems="center" gap="4px">
                                    <FiMapPin size="16px" color="#107CC7" />
                                    <Text
                                        fontSize="h6"
                                        color="primary.calmblue"
                                        fontWeight="bold"
                                        textAlign="left"
                                    >
                                        {authUser.data?.kabupaten}
                                    </Text>
                                </Flex>
                                <Text fontSize="p4" color="neutral.80" textAlign="left" mt="6px">
                                    {authUser.data?.provinsi}
                                </Text>
                            </Box>
                        </Flex>
                        <Flex gap="8px" alignItems="start" w="100%" mt="24px" flexDir="column">
                            <Flex w="100%" justifyContent="space-between" alignItems="center">
                                <Heading as="h2" fontSize="h6" color="neutral.80">
                                    Preferensi teman belajar
                                </Heading>
                                <NextLink href="/profile/edit-preferensi">
                                    <Link>
                                        <FiEdit color="#374151" size="16px" />
                                    </Link>
                                </NextLink>
                            </Flex>
                            <Box
                                p="12px"
                                boxShadow="card"
                                borderRadius="8px"
                                border="1px"
                                borderColor="primary.lightblue"
                                w="100%"
                                textAlign="left"
                                fontSize="14px"
                                lineHeight="28.1px"
                            >
                                <OrderedList>
                                    {authUser.data?.pref[0] && (
                                        <ListItem>Teman belajar untuk sharing</ListItem>
                                    )}
                                    {authUser.data?.pref[1] && (
                                        <ListItem>Teman belajar untuk menjadi mentor</ListItem>
                                    )}
                                    {authUser.data?.pref[2] && (
                                        <ListItem>Teman belajar untuk belajar bersama</ListItem>
                                    )}
                                    {authUser.data?.pref[3] && (
                                        <ListItem>
                                            Teman belajar untuk menjadi teman seperjuangan
                                        </ListItem>
                                    )}
                                </OrderedList>
                            </Box>
                        </Flex>
                        <Flex
                            gap="8px"
                            alignItems="center"
                            w="100%"
                            mt="24px"
                            as="button"
                            color="state.error"
                            onClick={handleSignOut}
                        >
                            <FiLogOut />
                            <Text fontSize="h6" fontWeight="bold">
                                Logout
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>

            <Menubar />

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent mx="24px" py="24px">
                    <ModalBody>
                        <Flex alignItems="center" flexDir="column">
                            <AiOutlineWarning size="40px" color="#FE922F" />
                            <Heading as="h2" fontSize="p1">
                                Laporkan pengguna
                            </Heading>
                            <Text mt="20px" fontSize="p3">
                                Kamu akan melaporkan pengguna ini kepada admin, silakan isi alasan
                                kenapa kamu melaporkannya di bawah
                            </Text>
                            <Textarea
                                mt="20px"
                                fontSize="p3"
                                placeholder="Tulis alasanmu di sini"
                            />
                        </Flex>
                    </ModalBody>
                    <ModalFooter
                        alignItems="center"
                        flexDir="column"
                        justifyContent="center"
                        gap="8px"
                    >
                        <Button variant="primary" size="full">
                            Laporkan
                        </Button>
                        <Button variant="secondary" size="full" onClick={onClose}>
                            Batalkan
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
