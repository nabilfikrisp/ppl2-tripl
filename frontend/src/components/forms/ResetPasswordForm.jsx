import { LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import MyButton from "../MyButton";
import { useResetPassword } from "../../hooks/useResetPassword";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
  });

const ResetPasswordForm = ({ token }) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });
  const { mutate: resetPassword, isLoading: isResetPasswordLoading } =
    useResetPassword({ redirectOnSuccess: "/sign-in" });

  const onSubmit = (data) => {
    resetPassword({ password: data.password, token });
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
      textColor="tripl-new.orange"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Text
        fontSize="2xl"
        fontWeight="semibold"
        textAlign="center"
        color="tripl-new.orange"
        w="full"
      >
        Reset Password
      </Text>
      <FormControl isInvalid={errors.password}>
        <FormLabel color="tripl-new.black" ms="5px">
          New Password
        </FormLabel>
        <InputGroup size="md">
          <InputLeftElement>
            <LockIcon />
          </InputLeftElement>
          <Input
            bgColor="tripl-new.cream"
            borderWidth="2px"
            focusBorderColor="tripl-new.orange"
            fontWeight="600"
            borderRadius="10px"
            _placeholder={{
              color: "tripl-new.gray-200",
              opacity: "0.7",
            }}
            type={show ? "text" : "password"}
            placeholder="Enter new password"
            {...register("password")}
          />
          <InputRightElement ml={10}>
            {show ? (
              <ViewOffIcon onClick={handleClick} />
            ) : (
              <ViewIcon onClick={handleClick} />
            )}
          </InputRightElement>
        </InputGroup>

        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.confirmPassword}>
        <FormLabel color="tripl-new.black" ms="5px">
          Confirm New Password
        </FormLabel>
        <InputGroup size="md">
          <InputLeftElement>
            <LockIcon />
          </InputLeftElement>
          <Input
            bgColor="tripl-new.cream"
            borderWidth="2px"
            focusBorderColor="tripl-new.orange"
            fontWeight="600"
            borderRadius="10px"
            _placeholder={{
              color: "tripl-new.gray-200",
              opacity: "0.7",
            }}
            type={show ? "text" : "password"}
            placeholder="Enter new password confirmation"
            {...register("confirmPassword")}
          />
          <InputRightElement ml={10}>
            {show ? (
              <ViewOffIcon onClick={handleClick} />
            ) : (
              <ViewIcon onClick={handleClick} />
            )}
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>
          {errors.confirmPassword && errors.confirmPassword.message}
        </FormErrorMessage>
      </FormControl>
      <MyButton size="sm" isLoading={isResetPasswordLoading} type="submit">
        Save New Password
      </MyButton>
    </Flex>
  );
};

export default ResetPasswordForm;
