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
    Checkbox,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { addBidang, change, changePref, removeBidang } from "../../feature/register/registerSlice";

import Head from "next/head";
import { FiChevronLeft, FiSearch } from "react-icons/fi";
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
        dispatch(changePref({ index: 0, value: authUser.data?.pref[0] }));
        dispatch(changePref({ index: 1, value: authUser.data?.pref[1] }));
        dispatch(changePref({ index: 2, value: authUser.data?.pref[2] }));
        dispatch(changePref({ index: 3, value: authUser.data?.pref[3] }));
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
                            <Box>
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
                            </Box>
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
