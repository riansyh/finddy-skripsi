import React, { useState, useRef, useEffect } from "react";
import {
    Box,
    Button,
    Input,
    InputGroup,
    InputRightElement,
    Flex,
    Text,
    Heading,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { BidangCard } from "./BidangCard";
import { useDispatch, useSelector } from "react-redux";
import { addBidang } from "./../../feature/register/registerSlice";
import useOutsideAlerter from "../../feature/hook/useOutsideAlerter";
import { SelectBidang } from "./SelectBidang";

export const BidangMinat = ({ nextFunction, prevFunction }) => {
    const [searchKey, setSearchKey] = useState("");
    const [bidangMinat, setBidangMinat] = useState([]);

    const dispatch = useDispatch();
    const form = useSelector((state) => state.register);
    const wrapperRef = useRef(null);

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
        <Flex
            flexDir="column"
            alignItems="center"
            justifyContent={form.bidangMinat > 0 ? "space-between" : "start"}
            minH="100vh"
        >
            <Box mt="40px" w="100%">
                <Heading fontWeight="bold" fontSize="h3">
                    Pilih bidang minatmu
                </Heading>
                <Text fontSize="p3" color="neutral.60" mt="12px">
                    Pilih yang sesuai agar teman belajarmu mudah ketika menemukanmu
                </Text>

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
                                        clickHandler={() => handleAddBidang(bidang.name, bidang.id)}
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

            <Flex flexDir="column" w="100%" gap="20px" mt="40px" alignItems="stretch" minH="240px">
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
                        <Text textAlign="center" fontSize="p2" color="neutral.20" maxW="200px">
                            Belum ada bidang/minat yang dipilih
                        </Text>
                    </Flex>
                )}
            </Flex>

            <Flex gap="16px" flexDir="column" mt="40px" w="100%">
                <Button
                    variant="primary"
                    size="full"
                    onClick={nextFunction}
                    disabled={form.bidangMinat.length === 0}
                >
                    Lanjutkan
                </Button>
                <Button variant="secondary" size="full" onClick={prevFunction}>
                    Kembali
                </Button>
            </Flex>
        </Flex>
    );
};
