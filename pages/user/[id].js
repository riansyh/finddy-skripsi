import {
    Avatar,
    Box,
    Button,
    Flex,
    Heading,
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
import React, { useEffect, useState } from "react";
import { Menubar } from "../../components/Menubar";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { FiMessageCircle, FiChevronLeft, FiMapPin, FiPlus, FiCheck } from "react-icons/fi";
import { IoMdSchool } from "react-icons/io";
import { AiOutlineWarning } from "react-icons/ai";
import { addDoc, arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../app/firebase";
import { BidangCard } from "../../components/profile/BidangCard";
import useFirebaseAuth from "../../feature/hook/useFirebaseAuth";
import { v4 as uuid } from "uuid";

export default function User({ userData }) {
    const [isSaved, setIsSaved] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [reason, setReason] = useState("");

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenUnsave, onOpen: onOpenUnsave, onClose: onCloseUnsave } = useDisclosure();
    const authUser = useSelector((state) => state.authUser);
    const router = useRouter();
    const toast = useToast();
    useFirebaseAuth();

    useEffect(() => {
        setIsSaved(authUser?.data?.friends.includes(userData.uid));
    }, [authUser, userData.uid]);

    const saveFriend = async () => {
        setIsLoading(true);
        try {
            await updateDoc(doc(db, "users", authUser?.uid), {
                friends: arrayUnion(userData.uid),
            });

            setIsSaved(true);
            setIsLoading(false);

            toast({
                position: "top",
                title: "Berhasil menyimpan teman!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.log(error);
            toast({
                position: "top",
                title: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            setIsLoading(false);
        }
    };

    const unsaveFriend = async () => {
        onCloseUnsave();
        setIsLoading(true);
        try {
            const removedFriendList = authUser.data?.friends.filter((item) => item != userData.uid);
            await updateDoc(doc(db, "users", authUser?.uid), {
                friends: removedFriendList,
            });

            setIsSaved(false);
            setIsLoading(false);

            toast({
                position: "top",
                title: "Berhasil menghapus teman!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.log(error);
            toast({
                position: "top",
                title: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            setIsLoading(false);
        }
    };

    const reportuser = async (user, reason) => {
        try {
            await addDoc(collection(db, "reports"), {
                user: authUser,
                reportedUser: user,
                reason: reason,
                status: "Aktif",
            });

            toast({
                position: "top",
                title: "Berhasil",
                description: "Pengguna berhasil kamu laporkan",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            onClose();
        } catch (error) {
            console.log(error);
            toast({
                position: "top",
                title: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            onClose();
        }
        setReason("");
    };

    const handleSendMessage = async (user) => {
        console.log(user);
        const combineId =
            authUser.uid > user.uid ? authUser.uid + user.uid : user.uid + authUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combineId));

            if (!res.exists()) {
                await setDoc(doc(db, "chats", combineId), { messages: [] });

                await updateDoc(doc(db, "userChats", authUser.uid), {
                    [combineId + ".userInfo"]: {
                        uid: user.uid,
                        name: user.name,
                        imgUrl: user.imgUrl,
                        bidang: user.bidangMinat,
                    },
                    [combineId + ".date"]: serverTimestamp(),
                });

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combineId + ".userInfo"]: {
                        uid: authUser.uid,
                        name: authUser.name,
                        imgUrl: authUser.data.imgUrl,
                        bidang: authUser.data.bidangMinat,
                    },
                    [combineId + ".date"]: serverTimestamp(),
                });

                router.push(`/chat/${combineId}/${user.uid}`);
            } else {
                router.push(`/chat/${combineId}/${user.uid}`);
            }
        } catch (error) {
            toast({
                variant: "subtle",
                position: "top",
                title: "Terjadi kesalahan",
                description: "Silahkan coba lagi",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

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
                            @{userData.username}
                        </Text>
                        <Flex gap="4px" alignItems="center">
                            <IoMdSchool color="#666" />
                            <Text mt="4px" fontSize="p4" color="neutral.60">
                                {userData.perguruanTinggi}
                            </Text>
                        </Flex>
                        <Flex gap="8px" alignItems="center" mt="32px" w="100%">
                            <Button
                                variant={isSaved ? "secondary" : "primary"}
                                px="24px"
                                size="full"
                                isLoading={isLoading}
                                onClick={isSaved ? onOpenUnsave : saveFriend}
                            >
                                <Box display={{ base: "none", sm: "block" }}>
                                    {isSaved ? <FiCheck /> : <FiPlus />}
                                </Box>

                                <Text ml="6px">{isSaved ? "Teman disimpan" : "Simpan Teman"}</Text>
                            </Button>
                            {isSaved && (
                                <Button
                                    variant="primary"
                                    flexShrink="0"
                                    onClick={() => handleSendMessage(userData)}
                                >
                                    <FiMessageCircle />
                                    <Text display={{ base: "none", md: "block" }} ml="6px">
                                        Kirim pesan
                                    </Text>
                                </Button>
                            )}
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
                                    <BidangCard key={`bidangMinat-${index}`} skill={bidang.skill}>
                                        {bidang.name}
                                    </BidangCard>
                                ))}
                            </Flex>
                        </Flex>
                        <Flex gap="8px" alignItems="start" w="100%" mt="24px" flexDir="column">
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
                        <Flex gap="8px" alignItems="start" w="100%" mt="24px" flexDir="column">
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

            <Menubar isUserDetail />

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
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </Flex>
                    </ModalBody>
                    <ModalFooter
                        alignItems="center"
                        flexDir="column"
                        justifyContent="center"
                        gap="8px"
                    >
                        <Button
                            variant="primary"
                            size="full"
                            isDisabled={reason.length < 5}
                            onClick={() => reportuser(userData, reason)}
                        >
                            Laporkan
                        </Button>
                        <Button variant="secondary" size="full" onClick={onClose}>
                            Batalkan
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal onClose={onCloseUnsave} isOpen={isOpenUnsave} isCentered>
                <ModalOverlay />
                <ModalContent mx="24px" py="24px">
                    <ModalBody>
                        <Flex alignItems="center" flexDir="column">
                            <AiOutlineWarning size="60px" color="#FE922F" />
                            <Heading as="h2" fontSize="p1">
                                Hapus teman belajar
                            </Heading>
                            <Text mt="20px" fontSize="p3" textAlign="center">
                                Apakah kamu yakin akan menghapus {userData.name} dari teman belajar
                                tersimpanmu?
                            </Text>
                        </Flex>
                    </ModalBody>
                    <ModalFooter alignItems="center" justifyContent="center" gap="8px">
                        <Button variant="secondary" size="full" onClick={onCloseUnsave}>
                            Batalkan
                        </Button>
                        <Button
                            variant="primary"
                            bg="state.error"
                            size="full"
                            onClick={unsaveFriend}
                        >
                            Ya
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

    return {
        props: {
            userData: docSnap.data(),
        },
    };
}
