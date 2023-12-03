import { EmailIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaUserAlt } from "react-icons/fa";

const ProfileDetail = ({ data, isLoading, isError }) => {
  return (
    <Flex
      borderRadius="10px"
      bgColor="tripl-new.cream"
      p="30px"
      maxW="600px"
      mx="auto"
      w="full"
      flexDir="column"
      gap="20px"
    >
      {isLoading && <Text>Loading..</Text>}
      {isError && <Text>Error please refresh</Text>}
      {data && (
        <>
          <FormControl>
            <FormLabel color="tripl-new.black">Email</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <EmailIcon color="tripl-new.orange" />
              </InputLeftElement>
              <Input
                placeholder="Email"
                bgColor="tripl-new.light"
                borderWidth="2px"
                focusBorderColor="tripl-new.orange"
                fontWeight="600"
                borderRadius="10px"
                _placeholder={{
                  color: "tripl-new.gray-200",
                  opacity: "0.7",
                }}
                readOnly
                value={data.email}
                // {...register("email")}
              />
            </InputGroup>
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel color="tripl-new.black">Name</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="tripl-new.orange">
                <FaUserAlt color="tripl-new.orange" />
              </InputLeftElement>
              <Input
                placeholder="Name"
                bgColor="tripl-new.light"
                borderWidth="2px"
                focusBorderColor="tripl-new.orange"
                fontWeight="600"
                borderRadius="10px"
                _placeholder={{
                  color: "tripl-new.gray-200",
                  opacity: "0.7",
                }}
                readOnly
                value={data.name}
                // {...register("email")}
              />
            </InputGroup>
            <FormErrorMessage></FormErrorMessage>
          </FormControl>
        </>
      )}
    </Flex>
  );
};

export default ProfileDetail;
