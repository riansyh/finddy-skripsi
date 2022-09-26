import React, { useState, useRef } from "react";
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

const SelectBidang = ({ children, clickHandler }) => {
    return (
        <Box
            borderRadius="4px"
            px="8px"
            py="4px"
            transition="ease"
            transitionDuration="300ms"
            onClick={clickHandler}
            _hover={{ bg: "#f9f9f9" }}
        >
            {children}
        </Box>
    );
};

export const BidangMinat = ({ nextFunction, prevFunction, changeFunction, formValues }) => {
    const [searchKey, setSearchKey] = useState("");
    const form = useSelector((state) => state.register);
    const dispatch = useDispatch();
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, () => setSearchKey(""));

    const handleAddBidang = (bidang, id) => {
        if (form.bidangMinat.length < 3) {
            dispatch(
                addBidang({
                    id,
                    name: bidang,
                    skill: "pemula",
                })
            );
            setSearchKey("");
        } else {
            // munculin alert
        }
    };

    return (
        <Flex flexDir="column" alignItems="center" justifyContent="space-between" minH="100vh">
            <Box mt="40px">
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
                            <SelectBidang
                                clickHandler={() => handleAddBidang("Digital Marketing", 1)}
                            >
                                Digital Marketing
                            </SelectBidang>
                            <SelectBidang clickHandler={() => handleAddBidang("UI/UX Design", 2)}>
                                UI/UX Design
                            </SelectBidang>
                            <SelectBidang clickHandler={() => handleAddBidang("Graphic Design", 3)}>
                                Graphic Design
                            </SelectBidang>
                            <SelectBidang clickHandler={() => handleAddBidang("Programming", 4)}>
                                Programming
                            </SelectBidang>
                        </Flex>
                    )}
                </Flex>
            </Box>

            <Flex flexDir="column" w="100%" gap="20px" mt="40px">
                {form.bidangMinat.map((value, i) => (
                    <BidangCard
                        key={`bidang-minat-${i}`}
                        name={value.name}
                        skill={value.skill}
                        id={value.id}
                        index={i}
                    />
                ))}
            </Flex>

            {/* <Box maxW="200px">
                <Text textAlign="center" fontSize="p2" color="neutral.20">
                    Belum ada bidang/minat yang dipilih
                </Text>
            </Box> */}

            <Flex gap="16px" flexDir="column" mt="40px" w="100%">
                <Button variant="primary" size="full" onClick={nextFunction}>
                    Lanjutkan
                </Button>
                <Button variant="secondary" size="full" onClick={prevFunction}>
                    Kembali
                </Button>
            </Flex>
        </Flex>
    );
};
