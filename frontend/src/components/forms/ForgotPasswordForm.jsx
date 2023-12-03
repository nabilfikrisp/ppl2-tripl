import { EmailIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import MyButton from "../MyButton";
import { useSendPasswordResetLink } from "../../hooks/useSendPasswordResetLink";

const forgotPasswordSchema = z.object({
  email: z.string().email().min(1),
});

const ForgotPasswordForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const { mutate: sendEmail, isLoading: isSendLinkLoading } =
    useSendPasswordResetLink();

  const onSubmit = (data) => {
    sendEmail(data);
    reset();
  };

  return (
    <Flex
      bgColor="tripl-new.light"
      borderRadius="20px"
      padding="40px"
      paddingTop="20px"
      border="1px solid"
      borderColor="tripl-new.gray-100"
      boxShadow="xl"
      w="full"
      maxW="600px"
      flexDir="column"
      gap="20px"
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Text
        fontSize="2xl"
        fontWeight="semibold"
        textAlign="center"
        color="tripl-new.orange"
        w="full"
      >
        Forgot Password
      </Text>
      <FormControl isInvalid={errors.email}>
        <FormLabel
          color="tripl-new.black"
          ms="5px"
          textColor="tripl-new.orange"
        >
          Email
        </FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <EmailIcon color="tripl-new.orange" />
          </InputLeftElement>
          <Input
            placeholder="Email"
            bgColor="tripl-new.cream"
            borderWidth="2px"
            focusBorderColor="tripl-new.orange"
            fontWeight="600"
            borderRadius="10px"
            _placeholder={{
              color: "tripl-new.gray-200",
              opacity: "0.7",
            }}
            {...register("email")}
          />
        </InputGroup>
        <FormHelperText ms="5px" textColor="tripl-new.gray-200">
          This action will send password reset link to your email.
        </FormHelperText>
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <MyButton size="sm" isLoading={isSendLinkLoading} type="submit">
        Send Password Reset Link
      </MyButton>
    </Flex>
  );
};

export default ForgotPasswordForm;
