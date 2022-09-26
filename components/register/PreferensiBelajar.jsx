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
    Checkbox,
} from "@chakra-ui/react";
import { changePref } from "./../../feature/register/registerSlice";
import { useDispatch, useSelector } from "react-redux";

export const PreferensiBelajar = ({ saveFunction, prevFunction }) => {
    const form = useSelector((state) => state.register);
    const dispatch = useDispatch();

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
                <Flex alignItems="stretch" mt="40px" flexDir="column" gap="12px" w="100%">
                    <Box px="12px" py="8px" borderRadius="8px" boxShadow="card">
                        <Checkbox spacing="12px" fontSize="p2" isChecked={form.pref[0]} onChange={(e) => dispatch(changePref({index: 0, value: e.target.checked})) }>
                            Mencari teman belajar untuk belajar bersama
                        </Checkbox>
                    </Box>
                    <Box px="12px" py="8px" borderRadius="8px" boxShadow="card">
                        <Checkbox spacing="12px" fontSize="p2" isChecked={form.pref[1]} onChange={(e) => dispatch(changePref({index: 1, value: e.target.checked})) }>
                            Mencari teman belajar sebagai mentor
                        </Checkbox>
                    </Box>
                    <Box px="12px" py="8px" borderRadius="8px" boxShadow="card">
                        <Checkbox spacing="12px" fontSize="p2" isChecked={form.pref[2]} onChange={(e) => dispatch(changePref({index: 2, value: e.target.checked})) }>
                            Mencari teman belajar untuk bertanya dan sharing
                        </Checkbox>
                    </Box>
                    <Box px="12px" py="8px" borderRadius="8px" boxShadow="card">
                        <Checkbox spacing="12px" fontSize="p2" isChecked={form.pref[3]} onChange={(e) => dispatch(changePref({index: 3, value: e.target.checked})) }>
                            Mencari teman belajar sebagai teman seperjuangan
                        </Checkbox>
                    </Box>
                </Flex>
            </Box>

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
