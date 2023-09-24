import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

const signUpSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
  });

const SignUp = () => {
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

  const onSubmit = async (data) => {
    console.log(data, "SUBMIT");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    reset();
    navigate("/sign-in");
  };

  return (
    <Grid
      width="full"
      paddingY="80px"
      paddingX="40px"
      gridTemplateColumns={{ base: "1fr", xl: "repeat(2,1fr)" }}
    >
      <GridItem paddingX={{ lg: 20 }}>
        <Box
          bgColor="tripl.dark"
          borderRadius={10}
          padding={10}
          textColor="tripl.green-100"
        >
          <Text as="h1" fontSize="3xl" textAlign="center">
            Sign Up
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={7}>
              <FormControl isInvalid={errors.name}>
                <FormLabel>Name</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FaUserAlt color="tripl.green-100 " />
                  </InputLeftElement>
                  <Input
                    placeholder="Name"
                    borderColor="tripl.green-100"
                    borderWidth="2px"
                    focusBorderColor="tripl.green-300"
                    color="tripl.green-100"
                    fontWeight="600"
                    _placeholder={{ color: "tripl.green-200", opacity: "0.7" }}
                    _focus={{ bgColor: "tripl.green-300" }}
                    {...register("name")}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.email}>
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <EmailIcon color="tripl.green-100 " />
                  </InputLeftElement>
                  <Input
                    placeholder="Email"
                    borderColor="tripl.green-100"
                    borderWidth="2px"
                    focusBorderColor="tripl.green-300"
                    color="tripl.green-100"
                    fontWeight="600"
                    _placeholder={{ color: "tripl.green-200", opacity: "0.7" }}
                    _focus={{ bgColor: "tripl.green-300" }}
                    {...register("email")}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <InputLeftElement>
                    <LockIcon />
                  </InputLeftElement>
                  <Input
                    borderColor="tripl.green-100"
                    borderWidth="2px"
                    focusBorderColor="tripl.green-300"
                    color="tripl.green-100"
                    fontWeight="600"
                    _placeholder={{ color: "tripl.green-200", opacity: "0.7" }}
                    _focus={{ bgColor: "tripl.green-300" }}
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
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.confirmPassword}>
                <FormLabel>Password Confirmation</FormLabel>
                <InputGroup size="md">
                  <InputLeftElement>
                    <LockIcon />
                  </InputLeftElement>
                  <Input
                    borderColor="tripl.green-100"
                    borderWidth="2px"
                    focusBorderColor="tripl.green-300"
                    color="tripl.green-100"
                    fontWeight="600"
                    _placeholder={{ color: "tripl.green-200", opacity: "0.7" }}
                    _focus={{ bgColor: "tripl.green-300" }}
                    type={show ? "text" : "password"}
                    placeholder="Confrim password"
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
              <Button
                bgColor="tripl.green-100"
                color="tripl.dark"
                boxShadow="lg"
                transitionDuration="0.2s"
                transitionTimingFunction="ease-in-out"
                _hover={{
                  transform: "translateY(10%)",
                  transitionDuration: "0.2s",
                  transitionTimingFunction: "ease-in-out",
                }}
                isLoading={isSubmitting}
                type="submit"
              >
                Sign Up
              </Button>
              {/* <HStack width="full">
                <Divider border="1px" borderRadius={"2xl"} />
                <Text>or</Text>
                <Divider border="1px" borderRadius={"2xl"} />
              </HStack> */}
              <Text>
                Already have an account?{" "}
                <ChakraLink as={Link} to="/sign-in" color="tripl.green-400">
                  Sign In
                </ChakraLink>
              </Text>
            </VStack>
          </form>
        </Box>
      </GridItem>
      <GridItem display={{ base: "none", xl: "block" }}>
        <Image src="/register_illustration.svg" />
      </GridItem>
    </Grid>
  );
};

export default SignUp;
