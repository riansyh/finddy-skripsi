import { Box, CloseButton, Flex, Heading, Select, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { changeBidangSkill, removeBidang } from "./../../feature/register/registerSlice";

export const BidangCard = ({ name, skill, id, index }) => {
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

                <CloseButton size="sm" onClick={() => dispatch(removeBidang(id))}></CloseButton>
            </Flex>

            <Box width="100%">
                <Text color="neutral.60" fontSize="p4">
                    Tingkat kemampuan
                </Text>
                <Select
                    mt="8px"
                    value={skill}
                    onChange={(e) =>
                        dispatch(changeBidangSkill({ index: index, value: e.target.value }))
                    }
                >
                    <option value="Pemula">Pemula</option>
                    <option value="Menengah">Menengah</option>
                    <option value="Ahli">Ahli</option>
                </Select>
            </Box>
        </Flex>
    );
};
