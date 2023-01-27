import {
    Box,
    Button,
    Input,
    InputGroup,
    InputRightElement,
    Flex,
    Text,
    Heading,
    FormControl,
    Image,
    FormLabel,
    useToast,
} from "@chakra-ui/react";

import { FiEye, FiEyeOff } from "react-icons/fi";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
} from "firebase/auth";
import { auth, db } from "../../app/firebase";
import { setDoc, doc } from "firebase/firestore";
import useFirebaseAuth from "../../feature/hook/useFirebaseAuth";
import { useSelector } from "react-redux";
import { LogoLink } from "../../components/LogoLink";

export default function Home() {
    const [isPasswordShowed, setIsPasswordShowed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        nama: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    });

    useFirebaseAuth();
    const toast = useToast();
    const router = useRouter();

    const authUser = useSelector((state) => state.authUser);

    useEffect(() => {
        if (authUser.uid && formValues.nama === "") router.push("/home");
    }, [authUser]);

    const showPassword = () => {
        setIsPasswordShowed(!isPasswordShowed);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            formValues.nama !== "" &&
            formValues.email !== "" &&
            formValues.password !== "" &&
            (formValues.passwordConfirmation !== "" && formValues.password) ==
                formValues.passwordConfirmation
        ) {
            setLoading(true);

            try {
                const res = await createUserWithEmailAndPassword(
                    auth,
                    formValues.email,
                    formValues.password
                );

                await sendEmailVerification(res.user);

                await updateProfile(res.user, {
                    displayName: formValues.nama,
                });
                await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    name: formValues.nama,
                    email: formValues.email,
                    isComplete: false,
                    friends: [],
                });

                await setDoc(doc(db, "userChats", res.user.uid), {});

                toast({
                    variant: "subtle",
                    position: "top",
                    title: "Akun berhasil dibuat!",
                    description: "Silahkan cek email untuk diverifikasi terlebih dahulu",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });

                setLoading(false);
                router.push("/register/lengkapi-data");
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast({
                    variant: "subtle",
                    position: "top",
                    title: "Terjadi kesalahan",
                    description: errorMessage,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                setLoading(false);
            }
        }
    };

    return (
        <div>
            <Head>
                <title>Finddy | Registrasi</title>
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
                    maxW={{ md: "600px" }}
                    bg="white"
                    px="24px"
                    flexDir="column"
                    py="32px"
                    overflowY="auto"
                    position="relative"
                >
                    <LogoLink />

                    <Box mt="40px">
                        <Heading fontWeight="bold" fontSize="h3">
                            Bergabung dengan kami!
                        </Heading>
                        <Text fontSize="p3" color="neutral.60" mt="12px">
                            Bergabung dan temukan teman belajar yang sesuai dengan preferensimu
                        </Text>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Flex alignItems="stretch" gap="20px" mt="40px" flexDir="column">
                            <FormControl>
                                <FormLabel fontWeight="bold" color="neutral.60">
                                    Nama Lengkap
                                </FormLabel>
                                <Input
                                    placeholder="Rian Febriansyah"
                                    type="text"
                                    id="nama"
                                    value={formValues.nama}
                                    onChange={(e) =>
                                        setFormValues((prev) => ({
                                            ...prev,
                                            [e.target.id]: e.target.value,
                                        }))
                                    }
                                ></Input>
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight="bold" color="neutral.60">
                                    Email
                                </FormLabel>
                                <Input
                                    placeholder="finddy@gmail.com"
                                    type="email"
                                    id="email"
                                    value={formValues.email}
                                    onChange={(e) =>
                                        setFormValues((prev) => ({
                                            ...prev,
                                            [e.target.id]: e.target.value,
                                        }))
                                    }
                                ></Input>
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight="bold" color="neutral.60">
                                    Password
                                </FormLabel>
                                <InputGroup>
                                    <Input
                                        placeholder="******"
                                        type={isPasswordShowed ? "text" : "password"}
                                        id="password"
                                        value={formValues.password}
                                        onChange={(e) =>
                                            setFormValues((prev) => ({
                                                ...prev,
                                                [e.target.id]: e.target.value,
                                            }))
                                        }
                                    ></Input>
                                    <InputRightElement>
                                        <Box cursor="pointer">
                                            {isPasswordShowed ? (
                                                <FiEye color="#333333" onClick={showPassword} />
                                            ) : (
                                                <FiEyeOff color="#333333" onClick={showPassword} />
                                            )}
                                        </Box>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight="bold" color="neutral.60">
                                    Konfirmasi Password
                                </FormLabel>
                                <InputGroup>
                                    <Input
                                        placeholder="******"
                                        type={isPasswordShowed ? "text" : "password"}
                                        id="passwordConfirmation"
                                        value={formValues.passwordConfirmation}
                                        onChange={(e) =>
                                            setFormValues((prev) => ({
                                                ...prev,
                                                [e.target.id]: e.target.value,
                                            }))
                                        }
                                    ></Input>
                                    <InputRightElement>
                                        <Box cursor="pointer">
                                            {isPasswordShowed ? (
                                                <FiEye color="#333333" onClick={showPassword} />
                                            ) : (
                                                <FiEyeOff color="#333333" onClick={showPassword} />
                                            )}
                                        </Box>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                        </Flex>

                        <Flex gap="16px" flexDir="column" mt="40px" w="100%">
                            <Button
                                variant="primary"
                                size="full"
                                type="submit"
                                isLoading={loading}
                                isDisabled={
                                    formValues.nama == "" ||
                                    formValues.email == "" ||
                                    formValues.password == "" ||
                                    (formValues.passwordConfirmation == "" ||
                                        formValues.password) != formValues.passwordConfirmation
                                }
                            >
                                Registrasi
                            </Button>
                        </Flex>
                    </form>
                    <Flex gap="8px" flexDir="column" mt="60px" w="100%">
                        <Text fontSize="p3" color="neutral.60" textAlign="center">
                            Sudah memiliki akun?
                        </Text>
                        <Button
                            variant="secondary"
                            size="full"
                            onClick={() => router.push("/login")}
                        >
                            Login Sekarang
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </div>
    );
}
