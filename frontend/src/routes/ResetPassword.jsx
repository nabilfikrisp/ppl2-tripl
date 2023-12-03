import { Flex } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import ResetPasswordForm from "../components/forms/ResetPasswordForm";

const ResetPassword = () => {
  const { token } = useParams();
  return (
    <Flex
      py="50px"
      w="full"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
    >
      <ResetPasswordForm token={token} />
    </Flex>
  );
};

export default ResetPassword;
