import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    Button,
    Input,
    Flex,
    Text,
    Heading,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { addBidang, change, removeBidang } from "../../feature/register/registerSlice";

import Head from "next/head";
import { FiChevronLeft, FiSearch } from "react-icons/fi";
import NextLink from "next/link";
import { useRouter } from "next/router";
import useFirebaseAuth from "../../feature/hook/useFirebaseAuth";
import useOutsideAlerter from "../../feature/hook/useOutsideAlerter";
import { BidangCard } from "../../components/register/BidangCard";
import { SelectBidang } from "../../components/register/SelectBidang";

export default function User() {
    const [searchKey, setSearchKey] = useState("");
    const [bidangMinat, setBidangMinat] = useState([]);

    const form = useSelector((state) => state.register);
    const authUser = useSelector((state) => state.authUser);
    const dispatch = useDispatch();
    const router = useRouter();

    const wrapperRef = useRef(null);

    useFirebaseAuth();

    useEffect(() => {
        authUser.data?.bidangMinat.forEach((bidang) => {
            dispatch(
                addBidang({
                    id: bidang.id,
                    name: bidang.name,
                    skill: bidang.skill,
                })
            );
        });
    }, [authUser]);

    const handleAddBidang = (bidang, id) => {
        if (form.bidangMinat.length < 3) {
            dispatch(
                addBidang({
                    id,
                    name: bidang,
                    skill: "Pemula",
                })
            );
            setSearchKey("");
        } else {
            // munculin alert
        }
    };

    const removeSelectedBidang = (item) => {
        let unselected = true;
        form.bidangMinat.forEach((selectedBidang) => {
            if (item.id == selectedBidang.id) {
                unselected = false;
                console.log(item);
                console.log(selectedBidang);
            }
        });
        return unselected;
    };

    useEffect(() => {
        fetch(`/api/bidangminat`)
            .then((response) => response.json())
            .then((result) => {
                const filteredResult = result.filter((item) =>
                    item.name.toLowerCase().includes(searchKey.toLowerCase())
                );

                const removeSelectedResult = filteredResult.filter((item) =>
                    removeSelectedBidang(item)
                );

                return setBidangMinat(removeSelectedResult);
            });
    }, [searchKey]);

    useOutsideAlerter(wrapperRef, () => setSearchKey(""));

    return (
        <>
            <Head>
                <title>Finddy | Edit Bidang Minat</title>
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
                                    Edit Bidang Minat
                                </Heading>
                            </Flex>
                        </Box>

                        <Flex
                            flexDir="column"
                            alignItems="center"
                            justifyContent={form.bidangMinat > 0 ? "space-between" : "start"}
                            minH="100vh"
                        >
                            <Box w="100%">
                                <Flex
                                    alignItems="stretch"
                                    gap="20px"
                                    mt="40px"
                                    flexDir="column"
                                    position="relative"
                                    ref={wrapperRef}
                                >
                                    <InputGroup>
                                        <Input
                                            placeholder="Cari bidang/minat"
                                            type="text"
                                            value={searchKey}
                                            onChange={(e) => {
                                                setSearchKey(e.target.value);
                                            }}
                                            isDisabled={form.bidangMinat.length > 2}
                                        ></Input>
                                        <InputRightElement>
                                            <FiSearch color="#333333" />
                                        </InputRightElement>
                                    </InputGroup>
                                    {searchKey !== "" && (
                                        <Flex
                                            py="12px"
                                            px="8px"
                                            w="100%"
                                            maxH="160px"
                                            overflowY="auto"
                                            flexDir="column"
                                            gap="6px"
                                            position="absolute"
                                            bg="white"
                                            top="56px"
                                            borderRadius="8px"
                                            boxShadow="card"
                                            border="1px"
                                            borderColor="neutral.10"
                                            zIndex="10"
                                        >
                                            {bidangMinat.length > 0 ? (
                                                bidangMinat.map((bidang, i) => (
                                                    <SelectBidang
                                                        key={i}
                                                        clickHandler={() =>
                                                            handleAddBidang(bidang.name, bidang.id)
                                                        }
                                                    >
                                                        {bidang.name}
                                                    </SelectBidang>
                                                ))
                                            ) : (
                                                <Text>Masukkan kata kunci lain</Text>
                                            )}
                                        </Flex>
                                    )}
                                </Flex>
                            </Box>

                            <Flex
                                flexDir="column"
                                w="100%"
                                gap="20px"
                                mt="40px"
                                alignItems="stretch"
                                minH="240px"
                            >
                                {form.bidangMinat.map((value, i) => (
                                    <BidangCard
                                        key={`bidang-minat-${i}`}
                                        name={value.name}
                                        skill={value.skill}
                                        id={value.id}
                                        index={i}
                                    />
                                ))}

                                {form.bidangMinat.length == 0 && (
                                    <Flex justifyContent="center">
                                        <Text
                                            textAlign="center"
                                            fontSize="p2"
                                            color="neutral.20"
                                            maxW="200px"
                                        >
                                            Belum ada bidang/minat yang dipilih
                                        </Text>
                                    </Flex>
                                )}
                            </Flex>

                            <Flex gap="16px" flexDir="column" mt="40px" w="100%">
                                <Button variant="primary" size="full">
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
