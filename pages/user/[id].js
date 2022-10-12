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
} from "@chakra-ui/react";

import Head from "next/head";
import NextLink from "next/link";
import React, { useRef, useState } from "react";
import { Menubar } from "../../components/Menubar";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { FiMessageCircle, FiChevronLeft, FiMapPin, FiPlus } from "react-icons/fi";
import { IoMdSchool } from "react-icons/io";
import { AiOutlineWarning } from "react-icons/ai";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../app/firebase";

const BidangMinat = ({ children, skill }) => {
    const skillColor =
        skill == "Pemula"
            ? "accent.grass"
            : skill == "Menengah"
            ? "accent.lavendar"
            : "accent.skin";

    return (
        <Box
            p="12px"
            boxShadow="card"
            borderRadius="8px"
            border="1px"
            borderColor="primary.lightblue"
            w="100%"
        >
            <Text fontSize="h6" color="primary.calmblue" fontWeight="bold" textAlign="left">
                {children}
            </Text>
            <Box
                mt="6px"
                px="10px"
                py="2px"
                borderRadius="40px"
                color="neutral.80"
                bg={skillColor}
                w="fit-content"
                fontSize="p4"
            >
                {skill}
            </Box>
        </Box>
    );
};

export default function User({ userData }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Finddy | Teman Belajar</title>
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
                            src={userData.imgUrl}
                        />
                        <Heading as="h1" mt="4px" fontSize="h5">
                            {userData.name}
                        </Heading>
                        <Text mt="4px" fontSize="p4" color="neutral.60">
                            {userData.username}
                        </Text>
                        <Flex gap="4px" alignItems="center">
                            <IoMdSchool color="#666" />
                            <Text mt="4px" fontSize="p4" color="neutral.60">
                                {userData.perguruanTinggi}
                            </Text>
                        </Flex>
                        <Flex gap="8px" alignItems="center" mt="32px" w="100%">
                            <Button variant="primary" px="24px" size="full">
                                <Box display={{ base: "none", sm: "block" }}>
                                    <FiPlus />
                                </Box>

                                <Text ml="6px">Simpan Teman</Text>
                            </Button>
                            <Button variant="primary" flexShrink="0">
                                <FiMessageCircle />
                                <Text display={{ base: "none", md: "block" }} ml="6px">
                                    Kirim pesan
                                </Text>
                            </Button>
                            <Button
                                variant="primary"
                                bg="primary.orange"
                                _hover={{ bg: "#F37F15" }}
                                flexShrink="0"
                                onClick={onOpen}
                            >
                                <AiOutlineWarning />
                                <Text display={{ base: "none", md: "block" }} ml="6px">
                                    Laporkan
                                </Text>
                            </Button>
                        </Flex>

                        <Flex gap="8px" alignItems="start" w="100%" mt="40px" flexDir="column">
                            <Heading as="h2" fontSize="h6" color="neutral.80">
                                Bidang/minat
                            </Heading>
                            <Flex flexDir="column" gap="12px" w="100%">
                                {userData.bidangMinat?.map((bidang, index) => (
                                    <BidangMinat key={`bidangMinat-${index}`} skill={bidang.skill}>
                                        {bidang.name}
                                    </BidangMinat>
                                ))}
                            </Flex>
                        </Flex>
                        <Flex gap="8px" alignItems="start" w="100%" mt="16px" flexDir="column">
                            <Heading as="h2" fontSize="h6" color="neutral.80">
                                Lokasi
                            </Heading>
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
                                        {userData.kabupaten}
                                    </Text>
                                </Flex>
                                <Text fontSize="p4" color="neutral.80" textAlign="left" mt="6px">
                                    {userData.provinsi}
                                </Text>
                            </Box>
                        </Flex>
                        <Flex gap="8px" alignItems="start" w="100%" mt="16px" flexDir="column">
                            <Heading as="h2" fontSize="h6" color="neutral.80">
                                Saya sedang mencari
                            </Heading>
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
                                    {userData.pref[0] && (
                                        <ListItem>Teman belajar untuk sharing</ListItem>
                                    )}
                                    {userData.pref[1] && (
                                        <ListItem>Teman belajar untuk menjadi mentor</ListItem>
                                    )}
                                    {userData.pref[2] && (
                                        <ListItem>Teman belajar untuk belajar bersama</ListItem>
                                    )}
                                    {userData.pref[3] && (
                                        <ListItem>
                                            Teman belajar untuk menjadi teman seperjuangan
                                        </ListItem>
                                    )}
                                </OrderedList>
                            </Box>
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

export async function getServerSideProps(context) {
    const { id } = context.query;

    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }

    return {
        props: {
            userData: docSnap.data(),
        },
    };
}
