import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
  Link as ChakraLink,
  HStack,
  Divider,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAlert from "../hooks/useAlert";
import { BASE_ENDPOINT } from "../api";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useGoogleLogin } from "@react-oauth/google";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignUp = () => {
  const location = useLocation();
  const { handleSuccess, handleError } = useAlert();
  const { login } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const navigate = useNavigate();

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const redirectPath = location.state?.path || "/";

  const loginUser = async (params) => {
    try {
      const response = await axios.post(`${BASE_ENDPOINT}/auth/login`, params);
      handleSuccess("Login success");
      login(response.data);
      reset();
      navigate(redirectPath, { replace: true });
      return response.data;
    } catch (error) {
      handleError(JSON.stringify(error.response.data.error));
      return null;
    }
  };

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (tokenResponse) => {
      try {
        const response = await axios.post(`${BASE_ENDPOINT}/auth/google`, {
          code: tokenResponse.code,
        });
        handleSuccess("Login success");
        login(response.data);
        reset();
        navigate(redirectPath, { replace: true });
      } catch (error) {
        handleError(JSON.stringify(error.response.data.error));
        return null;
      }
    },
  });

  const onSubmit = async (values) => {
    loginUser(values);
  };

  return (
    <Grid
      width="full"
      paddingY="40px"
      paddingX="40px"
      gridTemplateColumns={{ base: "1fr", xl: "repeat(2,1fr)" }}
      bgImage="/auth-bg.svg"
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPos="center"
    >
      <GridItem paddingX={{ lg: 20 }}>
        <Box
          bgColor="tripl-new.light"
          borderRadius="50px"
          padding="40px"
          paddingY="80px"
          textColor="tripl-new.orange"
          border="1px solid"
          borderColor="tripl-new.gray-100"
          boxShadow="xl"
        >
          <Text as="h1" fontSize="3xl" textAlign="center">
            Sign In
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap="25px">
              <FormControl isInvalid={errors.email}>
                <FormLabel color="tripl-new.black" ms="20px">
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
                    borderRadius="50px"
                    _placeholder={{
                      color: "tripl-new.gray-200",
                      opacity: "0.7",
                    }}
                    {...register("email")}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.password}>
                <FormLabel color="tripl-new.black" ms="20px">
                  Password
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
                    borderRadius="50px"
                    _placeholder={{
                      color: "tripl-new.gray-200",
                      opacity: "0.7",
                    }}
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
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
                <Flex justifyContent="end" pt="10px">
                  <ChakraLink
                    as={Link}
                    to="/forgot-password"
                    color="tripl-new.orange"
                    fontSize="sm"
                  >
                    Forgot Password
                  </ChakraLink>
                </Flex>
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                bgColor="tripl-new.orange"
                color="tripl-new.light"
                boxShadow="lg"
                transitionDuration="0.2s"
                transitionTimingFunction="ease-in-out"
                _hover={{
                  transform: "translateY(10%)",
                  transitionDuration: "0.2s",
                  transitionTimingFunction: "ease-in-out",
                }}
                borderRadius="50px"
                w="full"
                isLoading={isSubmitting}
                type="submit"
              >
                Sign In
              </Button>

              <HStack width="full">
                <Divider border="1px" borderRadius={"2xl"} />
                <Text color="tripl-new.black">or</Text>
                <Divider border="1px" borderRadius={"2xl"} />
              </HStack>
              <Button
                color="tripl-new.orange"
                bgColor="tripl-new.light"
                border="1px solid"
                boxShadow="lg"
                transitionDuration="0.2s"
                transitionTimingFunction="ease-in-out"
                _hover={{
                  transform: "translateY(10%)",
                  transitionDuration: "0.2s",
                  transitionTimingFunction: "ease-in-out",
                }}
                borderRadius="50px"
                w="full"
                isLoading={isSubmitting}
                onClick={() => {
                  googleLogin();
                }}
              >
                <Box as="span" me="10px">
                  <FcGoogle />
                </Box>
                Sign In with Google
              </Button>
              <Text color="tripl-new.black">
                Don't have account?{" "}
                <ChakraLink as={Link} to="/sign-up" color="tripl-new.orange">
                  Sign Up
                </ChakraLink>
              </Text>
            </VStack>
          </form>
        </Box>
      </GridItem>
      {/* <GridItem></GridItem> */}
    </Grid>
  );
};

export default SignUp;
