import React, { useEffect, useState } from "react";
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
    useToast,
    Select,
} from "@chakra-ui/react";

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
} from "@chakra-ui/react";
import axios from "axios";
import { AiFillCamera, AiFillInfoCircle, AiFillQuestionCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { change } from "./../../feature/register/registerSlice";
import { storage } from "../../app/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const Data = ({ nextFunction }) => {
    const [isGuideShow, setIsGuideShow] = useState(false);
    const form = useSelector((state) => state.register);
    const authUser = useSelector((state) => state.authUser);
    const dispatch = useDispatch();
    const toast = useToast();

    const [dataProvinsi, setDataProvinsi] = useState(null);
    const [dataKabupaten, setDataKabupaten] = useState(null);
    const [selectedProvinsi, setSelectedProvinsi] = useState(0);

    useEffect(() => {
        axios.get("https://dev.farizdotid.com/api/daerahindonesia/provinsi").then((response) => {
            setDataProvinsi(response.data.provinsi);
        });
    }, []);

    useEffect(() => {
        axios
            .get(
                `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${selectedProvinsi}`
            )
            .then((response) => {
                setDataKabupaten(response.data.kota_kabupaten);
            });
    }, [selectedProvinsi]);

    const handleUploadImage = async (e) => {
        try {
            if (!e.target.files || e.target.files.length === 0) {
                return;
            }

            const storageRef = await ref(storage, `profile/${authUser.email}.png`);
            const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

            uploadTask.on(
                (error) => {
                    toast({
                        variant: "subtle",
                        position: "top",
                        title: "Terjadi kesalahan",
                        description: "Silahkan coba lagi",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        dispatch(change({ name: "imgUrl", value: downloadURL }));
                    });
                }
            );
        } catch (error) {}
    };

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
                        <Avatar size="xl" src={form.imgUrl != "" ? form.imgUrl : ""}>
                            <AvatarBadge boxSize="1em" borderColor="transparent">
                                <AiFillCamera />
                            </AvatarBadge>
                        </Avatar>
                    </FormLabel>
                    <Input
                        type="file"
                        opacity="0"
                        display="none"
                        onChange={handleUploadImage}
                    ></Input>
                </FormControl>
                <FormControl>
                    <FormLabel fontWeight="bold" color="neutral.60">
                        Username
                    </FormLabel>
                    <Input
                        placeholder="Masukkan username yang kamu inginkan"
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
                <Flex gap="8px" w="100%" alignItems="end">
                    <FormControl>
                        <FormLabel fontWeight="bold" color="neutral.60">
                            Domisili tempat tinggal
                        </FormLabel>
                        <Select
                            placeholder="Pilih Provinsi"
                            onChange={(e) => {
                                dispatch(change({ name: "provinsi", value: e.target.value }));
                                setSelectedProvinsi(
                                    e.target[e.target.selectedIndex].getAttribute("data-id")
                                );
                                console.log(
                                    e.target[e.target.selectedIndex].getAttribute("data-id")
                                );
                            }}
                        >
                            {dataProvinsi?.map((data, idx) => (
                                <option value={data.nama} data-id={data.id} key={`prov-${idx}`}>
                                    {data.nama}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <Select
                            placeholder="Pilih Kabupaten/Kota"
                            onChange={(e) =>
                                dispatch(change({ name: "kabupaten", value: e.target.value }))
                            }
                        >
                            {dataKabupaten?.map((data, idx) => (
                                <option value={data.nama} data-id={data.id} key={`prov-${idx}`}>
                                    {data.nama}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                </Flex>

                <FormControl>
                    <FormLabel fontWeight="bold" color="neutral.60">
                        <Flex alignItems="center" gap="4px">
                            <Text> Kontak (No. WhatsApp)</Text>
                            <Popover>
                                <PopoverTrigger>
                                    <button>
                                        <AiFillQuestionCircle size="20px" color="#107cc7" />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverBody fontWeight="normal" fontSize="14px">
                                        Kontak hanya ditampilkan kepada teman belajar yang kamu
                                        izinkan saja
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                        </Flex>
                    </FormLabel>
                    <Input
                        placeholder="0851xxxxxxxx"
                        type="number"
                        id="kontak"
                        value={form.kontak}
                        onChange={(e) =>
                            dispatch(change({ name: "kontak", value: e.target.value }))
                        }
                        onFocus={() => setIsGuideShow(true)}
                        onBlur={() => setIsGuideShow(false)}
                    ></Input>
                    {isGuideShow && (
                        <Text fontSize="p3" color="neutral.40" mt="4px">
                            Kontak kamu hanya ditampilkan kepada teman belajar yang kamu izinkan
                            saja
                        </Text>
                    )}
                </FormControl>
            </Flex>

            <Flex gap="16px" flexDir="column" mt="40px" w="100%">
                <Button
                    variant="primary"
                    size="full"
                    onClick={nextFunction}
                    disabled={
                        form.username === "" ||
                        form.perguruanTinggi === "" ||
                        form.kabupaten === "" ||
                        form.provinsi === "" ||
                        form.kontak === "" ||
                        !/\+?([ -]?\d+)+|\(\d+\)([ -]\d+)/g.test(form.kontak) ||
                        form.kontak.length < 6
                    }
                >
                    Lanjutkan
                </Button>
            </Flex>
        </>
    );
};
