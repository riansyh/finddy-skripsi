import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Spinner,
    Text,
    useToast,
} from "@chakra-ui/react";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { FiMapPin, FiPaperclip, FiSend, FiX } from "react-icons/fi";
import { v4 as uuid } from "uuid";
import { db, storage } from "../../app/firebase";

export const Chatbar = ({ authUser, chatId, userId }) => {
    const [text, setText] = useState("");
    const [fileState, setFileState] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();

    const handleSend = async (e) => {
        e.preventDefault();
        if (text == "" || text == " ") return;

        if (fileState) {
            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: authUser.uid,
                    date: Timestamp.now(),
                    file: fileState,
                }),
            });
        } else {
            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: authUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }

        await updateDoc(doc(db, "userChats", authUser.uid), {
            [chatId + ".lastMessage"]: {
                text,
            },
            [chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", userId), {
            [chatId + ".lastMessage"]: {
                text,
            },
            [chatId + ".date"]: serverTimestamp(),
        });

        setText("");
        setFileState(null);
    };

    const handleUploadFile = async (e) => {
        try {
            if (!e.target.files || e.target.files.length === 0) {
                return;
            }

            const extension = e.target.files[0].type.replace(/(.*)\//g, "");
            const name = e.target.files[0].name;

            const storageRef = await ref(storage, "files/" + uuid() + "." + extension);
            setIsLoading(true);
            uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
                console.log("Uploaded a blob or file!");

                getDownloadURL(ref(storage, storageRef)).then((url) => {
                    const fileInfo = {
                        name: name,
                        type: extension,
                        url: url,
                    };

                    setIsLoading(false);
                    setFileState(fileInfo);
                });
            });
        } catch (error) {}
    };

    return (
        <>
            <form onSubmit={handleSend}>
                <Flex
                    position="fixed"
                    bg="white"
                    zIndex="100"
                    w="100%"
                    boxShadow="nav"
                    bottom="0"
                    flexDir="column"
                >
                    {(isLoading || fileState) && (
                        <Flex
                            alignItems="center"
                            w="100%"
                            py="20px"
                            px={{ base: "16px", md: "100px", lg: "160px" }}
                            gap="12px"
                            justifyContent="space-between"
                            bg="#fafafa"
                        >
                            <Flex gap="12px" justifyContent="center" alignItems="center">
                                <FiPaperclip color="#666" />
                                {isLoading && <Spinner />}
                                <Text fontSize="p3">{fileState?.name}</Text>
                            </Flex>
                            <FiX
                                color="#666"
                                cursor="pointer"
                                onClick={() => setFileState(null)}
                            ></FiX>
                        </Flex>
                    )}

                    <Flex
                        alignItems="center"
                        w="100%"
                        py="12px"
                        px={{ base: "8px", md: "80px", lg: "120px" }}
                        gap="12px"
                        justifyContent="space-between"
                    >
                        <InputGroup>
                            <Input
                                borderRadius="40px"
                                fontSize="14px"
                                py="12px"
                                mb={{ base: "12px", md: "0" }}
                                h="max-content"
                                placeholder="Masukkan pesan"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            ></Input>
                            <InputRightElement>
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
                                        <FiPaperclip />
                                    </FormLabel>
                                    <Input
                                        type="file"
                                        opacity="0"
                                        display="none"
                                        onChange={handleUploadFile}
                                    ></Input>
                                </FormControl>
                            </InputRightElement>
                        </InputGroup>

                        <Button
                            type="submit"
                            variant="primary"
                            borderRadius="80px"
                            height="auto"
                            isDisabled={isLoading}
                            mb={{ base: "12px", md: "0" }}
                        >
                            <FiSend />
                        </Button>
                    </Flex>
                </Flex>
            </form>
        </>
    );
};
