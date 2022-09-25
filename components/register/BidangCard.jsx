import { Box, CloseButton, Flex, Heading, Select, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBidang, removeBidang, changeBidangSkill } from "./../../feature/register/registerSlice";

export const BidangCard = ({ name, skill }) => {
    const form = useSelector((state) => state.register);
    const dispatch = useDispatch();

    return (
        <Flex
            flexDir="column"
            gap="16px"
            p="12px"
            border="1px"
            borderColor="primary.lightblue"
            borderRadius="8px"
            boxShadow="card"
        >
            <Flex width="100%" justifyContent="space-between">
                <Heading color="primary.calmblue" fontSize="h5">
                    {name}
                </Heading>

                <CloseButton size="sm"></CloseButton>
            </Flex>

            <Box width="100%">
                <Text color="neutral.60" fontSize="p4">
                    Tingkat kemampuan
                </Text>
                <Select mt="8px">
                    <option value="pemula">Pemula</option>
                    <option value="menengah">Menengah</option>
                    <option value="ahli">Ahli</option>
                </Select>
            </Box>
        </Flex>
    );
};
