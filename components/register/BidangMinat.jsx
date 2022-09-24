import React from "react";
import {
    Box,
    Button,
    Input,
    InputGroup,
    InputRightElement,
    Flex,
    Text,
    Heading,
    FormLabel,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { BidangCard } from "./BidangCard";

export const BidangMinat = ({ nextFunction, prevFunction }) => {
    return (
        <Flex flexDir="column" alignItems="center" justifyContent="space-between" minH="100vh">
            <Box mt="40px">
                <Heading fontWeight="bold" fontSize="h3">
                    Pilih bidang minatmu
                </Heading>
                <Text fontSize="p3" color="neutral.60" mt="12px">
                    Pilih yang sesuai agar teman belajarmu mudah ketika menemukanmu
                </Text>

                <Flex alignItems="stretch" gap="20px" mt="40px" flexDir="column">
                    <InputGroup>
                        <Input placeholder="Cari bidang/minat" type="text"></Input>
                        <InputRightElement>
                            <FiSearch color="#333333" />
                        </InputRightElement>
                    </InputGroup>
                </Flex>
            </Box>

            <Flex flexDir="column" w="100%" gap="20px" mt="40px">
                <BidangCard name="Digital Marketing" />
                <BidangCard name="Digital Marketing" />
                <BidangCard name="Digital Marketing" />
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
