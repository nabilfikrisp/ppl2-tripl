import React from "react";
import { useGetMyProfile } from "../hooks/useGetMyProfile";
import { Flex, Text } from "@chakra-ui/react";
import ProfileDetail from "../components/ProfileDetail";
import ChangePasswordForm from "../components/forms/ChangePasswordForm";

const MyProfile = () => {
  const { data, isError, isLoading } = useGetMyProfile();
  return (
    <Flex flexDir="column" py={{ base: "30px", md: "50px" }}>
      <Text
        color="tripl-new.orange"
        fontWeight="bold"
        fontSize={{ base: "30px", md: "48px" }}
        mb="20px"
        textAlign="center"
      >
        My Profile
      </Text>
      <ProfileDetail data={data} isError={isError} isLoading={isLoading} />
      <Text
        color="tripl-new.orange"
        fontWeight="bold"
        fontSize={{ base: "30px", md: "48px" }}
        mt="50px"
        mb="20px"
        textAlign="center"
      >
        Change Password
      </Text>
      <ChangePasswordForm />
    </Flex>
  );
};

export default MyProfile;
