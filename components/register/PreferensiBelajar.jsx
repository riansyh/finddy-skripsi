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

export const PreferensiBelajar = ({ saveFunction, prevFunction }) => {
    return (
        <Flex flexDir="column" alignItems="center" justifyContent="space-between" minH="100vh">
            <Box mt="40px">
                <Heading fontWeight="bold" fontSize="h3">
                    Tentukan preferensi teman belajar
                </Heading>
                <Text fontSize="p3" color="neutral.60" mt="12px">
                    Pilih beberapa kriteria berikut yang akan membantu proses pencarian teman
                    belajarmu
                </Text>
            </Box>

            <Flex alignItems="stretch" gap="20px" mt="40px" flexDir="column"></Flex>

            <Flex gap="16px" flexDir="column" mt="40px" w="100%">
                <Button variant="primary" size="full" onClick={saveFunction}>
                    Simpan Data
                </Button>
                <Button variant="secondary" size="full" onClick={prevFunction}>
                    Kembali
                </Button>
            </Flex>
        </Flex>
    );
};
