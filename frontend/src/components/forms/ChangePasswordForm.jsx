import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import React from "react";

const ChangePasswordForm = () => {
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
      <FormControl>
        <FormLabel color="tripl-new.black">Old Password</FormLabel>
        <InputGroup>
          <Input
            type="password"
            placeholder="Old Password"
            bgColor="tripl-new.light"
            borderWidth="2px"
            focusBorderColor="tripl-new.orange"
            fontWeight="600"
            borderRadius="10px"
            _placeholder={{
              color: "tripl-new.gray-200",
              opacity: "0.7",
            }}
            // {...register("email")}
          />
        </InputGroup>
        <FormErrorMessage></FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel color="tripl-new.black">New Password</FormLabel>
        <InputGroup>
          <Input
            type="password"
            placeholder="New Password"
            bgColor="tripl-new.light"
            borderWidth="2px"
            focusBorderColor="tripl-new.orange"
            fontWeight="600"
            borderRadius="10px"
            _placeholder={{
              color: "tripl-new.gray-200",
              opacity: "0.7",
            }}
            // {...register("email")}
          />
        </InputGroup>
        <FormErrorMessage></FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel color="tripl-new.black">New Password Confirmation</FormLabel>
        <InputGroup>
          <Input
            placeholder="New Password Confirmation"
            type="password"
            bgColor="tripl-new.light"
            borderWidth="2px"
            focusBorderColor="tripl-new.orange"
            fontWeight="600"
            borderRadius="10px"
            _placeholder={{
              color: "tripl-new.gray-200",
              opacity: "0.7",
            }}
            // {...register("email")}
          />
        </InputGroup>
        <FormErrorMessage></FormErrorMessage>
      </FormControl>
    </Flex>
  );
};

export default ChangePasswordForm;
