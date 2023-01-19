import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Flex,
    Grid,
    Heading,
    Link,
    Text,
    Textarea,
    useDisclosure,
    Tooltip,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { LogoLink } from "../../components/LogoLink";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    useToast,
} from "@chakra-ui/react";
import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../app/firebase";
import { FiCheck, FiMapPin, FiTrash, FiUserX } from "react-icons/fi";
import { IoMdSchool } from "react-icons/io";
import { BidangCard } from "../../components/profile/BidangCard";

const StatusPill = ({ status }) => {
    return (
        <Box
            px="12px"
            py="2px"
            borderRadius="50px"
            color="white"
            fontSize="p2"
            w="fit-content"
            bg={status == "Aktif" ? "state.success" : "neutral.60"}
        >
            {status == "Aktif" ? "Aktif" : "Selesai"}
        </Box>
    );
};

export default function Pengguna() {
    const router = useRouter();
    const [reports, setReports] = useState(null);
    const [reportsId, setReportsId] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [user, setUser] = useState(null);
    const toast = useToast();

    const showUser = async () => {
        const querySnapshot = await getDocs(collection(db, "reports"));

        const reports = [];
        const reportsId = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            reports.push(data);
            reportsId.push(doc.id);
        });

        setReports(reports);
        setReportsId(reportsId);
    };

    useEffect(() => {
        showUser();
    }, []);

    const setuserData = (data) => {
        setuserData(data);
    };

    const deactive = () => {
        onClose();
        toast({
            position: "top",
            title: "Berhasil",
            description: "Pengguna berhasil nonaktifkan",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    const setFinish = async (id) => {
        try {
            await updateDoc(doc(db, "reports", id), {
                status: "Selesai",
            });

            toast({
                position: "top",
                title: "Berhasil",
                description: "Laporan telah ditandai selesai",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            await showUser();
        } catch (error) {
            console.log(error);
            toast({
                position: "top",
                title: "Ups!",
                description: "Sepertinya ada kesalahan, silakan coba lagi",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const deleteReports = async (id) => {
        try {
            await deleteDoc(doc(db, "reports", id));

            toast({
                position: "top",
                title: "Berhasil",
                description: "Laporan telah berhasil dihapus",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            await showUser();
        } catch (error) {
            console.log(error);
            toast({
                position: "top",
                title: "Ups!",
                description: "Sepertinya ada kesalahan, silakan coba lagi",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Head>
                <title>Finddy | Find Your Buddy to Boost Your Study</title>
                <meta name="description" content="" />
                <link rel="icon" href="/logo.svg" />
            </Head>

            <Box position="relative" pb="100px">
                <Flex
                    w="100%"
                    alignItems="center"
                    justifyContent="center"
                    as="header"
                    position="sticky"
                    top="0"
                    zIndex="100"
                    boxShadow="card"
                    bg="white"
                >
                    <Box maxW="1320px" px={{ base: "24px", md: "80px", lg: "120px" }} w="100%">
                        <Flex
                            as="nav"
                            w="100%"
                            maxH="80px"
                            py="16px"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Flex gap="32px" alignItems="center" color="white">
                                <LogoLink />

                                <Flex
                                    gap="24px"
                                    display={{ base: "none", md: "flex" }}
                                    color="neutral.80"
                                >
                                    <NextLink href="/admin/laporan" passHref>
                                        <Link
                                            w="fit-content"
                                            h="fit-content"
                                            opacity={
                                                router.pathname == "/admin/laporan" ? "1" : "0.7"
                                            }
                                        >
                                            Laporan
                                        </Link>
                                    </NextLink>
                                    <NextLink href="/admin/daftar-pengguna" passHref>
                                        <Link
                                            w="fit-content"
                                            h="fit-content"
                                            opacity={
                                                router.pathname == "/admin/daftar-pengguna"
                                                    ? "1"
                                                    : "0.7"
                                            }
                                        >
                                            Daftar pengguna
                                        </Link>
                                    </NextLink>
                                </Flex>
                            </Flex>

                            <Flex gap="8px" display={{ base: "none", md: "flex" }}>
                                <NextLink href="/admin" passHref>
                                    <Link _hover={{ textDecoration: "none" }}>
                                        <Button variant="primary">Logout</Button>
                                    </Link>
                                </NextLink>
                            </Flex>
                        </Flex>
                    </Box>
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
                        <Flex w="100%" justifyContent="space-between" flexDir="column" gap="48px">
                            <Heading fontSize="h4" textAlign="center">
                                Daftar Laporan Pengguna
                            </Heading>
                            <TableContainer w="100%">
                                <Table variant="simple">
                                    <Thead>
                                        <Tr>
                                            <Th>No.</Th>
                                            <Th>Status</Th>
                                            <Th>Akun pelapor</Th>
                                            <Th>Akun terlapor</Th>
                                            <Th>Alasan</Th>
                                            <Th>Aksi</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {reports?.map((report, index) => (
                                            <Tr key={index}>
                                                <Td>{index + 1}</Td>
                                                <Td>
                                                    <StatusPill status={report.status} />
                                                </Td>
                                                <Td>
                                                    <Link
                                                        onClick={() => {
                                                            setUser(report.user);
                                                            onOpen();
                                                        }}
                                                        color="primary.calmblue"
                                                    >
                                                        {report.user?.data.username}
                                                    </Link>
                                                </Td>
                                                <Td>
                                                    <Link
                                                        onClick={() => {
                                                            setUser(report.reportedUser);
                                                            onOpen();
                                                        }}
                                                        color="primary.orange"
                                                    >
                                                        {report.reportedUser.username}
                                                    </Link>
                                                </Td>
                                                <Td>{report.reason}</Td>
                                                <Td>
                                                    <Flex gap="8px">
                                                        <Tooltip
                                                            label="Nonaktifkan akun terlapor"
                                                            fontSize="sm"
                                                        >
                                                            <Button
                                                                p="1px"
                                                                mr="12px"
                                                                color="white"
                                                                bg="state.warning"
                                                                onClick={() => {
                                                                    setUser(report.reportedUser);
                                                                    onOpen();
                                                                }}
                                                            >
                                                                <FiUserX />
                                                            </Button>
                                                        </Tooltip>
                                                        <Tooltip
                                                            label="Ubah laporan menjadi selesai"
                                                            fontSize="sm"
                                                        >
                                                            <Button
                                                                p="1px"
                                                                color="white"
                                                                bg="state.success"
                                                                onClick={() =>
                                                                    setFinish(reportsId[index])
                                                                }
                                                                isDisabled={
                                                                    report.status == "Selesai"
                                                                }
                                                            >
                                                                <FiCheck />
                                                            </Button>
                                                        </Tooltip>
                                                        <Tooltip
                                                            label="Hapus laporan"
                                                            fontSize="sm"
                                                        >
                                                            <Button
                                                                p="1px"
                                                                color="white"
                                                                bg="state.error"
                                                                onClick={() =>
                                                                    deleteReports(reportsId[index])
                                                                }
                                                            >
                                                                <FiTrash />
                                                            </Button>
                                                        </Tooltip>
                                                    </Flex>
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>

            <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="inside" isCentered>
                <ModalOverlay />
                <ModalContent mx="24px" py="24px">
                    <ModalBody>
                        <Flex w="100%" alignItems="center" justifyContent="center" mt="32px">
                            <Flex
                                color="neutral.90"
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
                                    src={user?.imgUrl}
                                />
                                <Heading as="h1" mt="4px" fontSize="h5">
                                    {user?.name}
                                </Heading>
                                <Text mt="4px" fontSize="p4" color="neutral.60">
                                    {user?.data?.username}
                                    {user?.username}
                                </Text>
                                <Flex gap="4px" alignItems="center">
                                    <IoMdSchool color="#666" />
                                    <Text mt="4px" fontSize="p4" color="neutral.60">
                                        {user?.data?.perguruanTinggi}
                                        {user?.perguruanTinggi}
                                    </Text>
                                </Flex>

                                <Flex
                                    gap="8px"
                                    alignItems="start"
                                    w="100%"
                                    mt="40px"
                                    flexDir="column"
                                >
                                    <Heading as="h2" fontSize="h6" color="neutral.80">
                                        Bidang/minat
                                    </Heading>
                                    <Flex flexDir="column" gap="12px" w="100%">
                                        {user?.data?.bidangMinat?.map((bidang, index) => (
                                            <BidangCard
                                                key={`bidangMinat-${index}`}
                                                skill={bidang.skill}
                                            >
                                                {bidang.name}
                                            </BidangCard>
                                        ))}
                                        {user?.bidangMinat?.map((bidang, index) => (
                                            <BidangCard
                                                key={`bidangMinat-${index}`}
                                                skill={bidang.skill}
                                            >
                                                {bidang.name}
                                            </BidangCard>
                                        ))}
                                    </Flex>
                                </Flex>
                                <Flex
                                    gap="8px"
                                    alignItems="start"
                                    w="100%"
                                    mt="24px"
                                    flexDir="column"
                                >
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
                                                {user?.data?.kabupaten}
                                                {user?.kabupaten}
                                            </Text>
                                        </Flex>
                                        <Text
                                            fontSize="p4"
                                            color="neutral.80"
                                            textAlign="left"
                                            mt="6px"
                                        >
                                            {user?.data?.provinsi}
                                            {user?.provinsi}
                                        </Text>
                                    </Box>
                                </Flex>
                            </Flex>
                        </Flex>
                    </ModalBody>
                    <ModalFooter
                        alignItems="center"
                        flexDir="column"
                        justifyContent="center"
                        gap="8px"
                    >
                        <Button variant="primary" size="full" onClick={() => deactive(user?.uid)}>
                            Nonaktifkan akun
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
