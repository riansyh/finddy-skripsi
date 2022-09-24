import React from "react";
import {
    Box,
    Button,
    Input,
    Flex,
    Text,
    Heading,
    FormLabel,
    FormControl,
    Avatar,
    AvatarBadge,
    Image,
} from "@chakra-ui/react";
import { AiFillCamera } from "react-icons/ai";

export const Data = ({ nextFunction, changeFunction, formValues }) => {
    return (
        <>
            <Box mt="40px">
                <Heading fontWeight="bold" fontSize="h3">
                    Lengkapi data kamu
                </Heading>
                <Text fontSize="p3" color="neutral.60" mt="12px">
                    Isi identitas lengkapmu dulu ya!
                </Text>
            </Box>

            <Flex alignItems="center" gap="20px" mt="40px" flexDir="column">
                <FormControl display="flex" justifyContent="center">
                    <FormLabel
                        fontWeight="bold"
                        color="neutral.60"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width="fit-content"
                        cursor="pointer"
                    >
                        <Avatar size="xl">
                            <AvatarBadge boxSize="1em" borderColor="transparent">
                                <AiFillCamera />
                            </AvatarBadge>
                        </Avatar>
                    </FormLabel>
                    <Input type="file" opacity="0" display="none"></Input>
                </FormControl>
                <FormControl>
                    <FormLabel fontWeight="bold" color="neutral.60">
                        Username
                    </FormLabel>
                    <Input
                        placeholder="Rian Febriansyah"
                        type="text"
                        id="username"
                        value={formValues.username}
                        onChange={changeFunction}
                    ></Input>
                </FormControl>
                <FormControl>
                    <FormLabel fontWeight="bold" color="neutral.60">
                        Asal Perguruan Tinggi
                    </FormLabel>
                    <Input
                        placeholder="Universitas Padjadjaran"
                        type="text"
                        id="perguruanTinggi"
                        value={formValues.perguruanTinggi}
                        onChange={changeFunction}
                    ></Input>
                </FormControl>
                <FormControl>
                    <FormLabel fontWeight="bold" color="neutral.60">
                        Lokasi
                    </FormLabel>
                    <Input
                        placeholder="Sumedang, Jawa Barat"
                        type="text"
                        id="lokasi"
                        value={formValues.lokasi}
                        onChange={changeFunction}
                    ></Input>
                </FormControl>
                <FormControl>
                    <FormLabel fontWeight="bold" color="neutral.60">
                        Kontak (No. WhatsApp)
                    </FormLabel>
                    <Input
                        placeholder="0851xxxxxxxx"
                        type="tel"
                        id="kontak"
                        value={formValues.kontak}
                        onChange={changeFunction}
                    ></Input>
                </FormControl>
            </Flex>

            <Flex gap="16px" flexDir="column" mt="40px" w="100%">
                <Button variant="primary" size="full" onClick={nextFunction}>
                    Lanjutkan
                </Button>
            </Flex>
        </>
    );
};
