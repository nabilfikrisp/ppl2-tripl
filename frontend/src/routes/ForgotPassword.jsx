import { Flex } from "@chakra-ui/react";
import React from "react";
import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <Flex
      py="50px"
      w="full"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
    >
      <ForgotPasswordForm />
    </Flex>
  );
};

export default ForgotPassword;
