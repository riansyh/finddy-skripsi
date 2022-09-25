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
} from "@chakra-ui/react";
import { AiFillCamera } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { change } from "./../../feature/register/registerSlice";

export const Data = ({ nextFunction }) => {
    const form = useSelector((state) => state.register);
    const dispatch = useDispatch();

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
                        value={form.username}
                        onChange={(e) =>
                            dispatch(change({ name: "username", value: e.target.value }))
                        }
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
                        value={form.perguruanTinggi}
                        onChange={(e) =>
                            dispatch(change({ name: "perguruanTinggi", value: e.target.value }))
                        }
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
                        value={form.lokasi}
                        onChange={(e) =>
                            dispatch(change({ name: "lokasi", value: e.target.value }))
                        }
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
                        value={form.kontak}
                        onChange={(e) =>
                            dispatch(change({ name: "kontak", value: e.target.value }))
                        }
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
