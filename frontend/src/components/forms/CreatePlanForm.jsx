import { SmallAddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const createPlanSchema = z.object({
  title: z.string().nonempty(),
  date: z.string().nonempty(),
  description: z.string(),
});

const CreatePlanForm = ({ isOpen, onClose }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createPlanSchema),
  });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data, "SUBMIT");
    navigate("create", {
      state: {
        data,
      },
    });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay backdropFilter="blur(5px)" />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p={{ md: "20px" }}>
            <Text
              fontWeight="bold"
              fontSize="36px"
              textAlign="center"
              color="tripl-new.orange"
              mb="20px"
            >
              PLANNER BARU
            </Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack gap="20px">
                <FormControl isInvalid={errors.title}>
                  <FormLabel color="tripl-new.black" ms="20px">
                    Judul Perjalananmu
                  </FormLabel>
                  <InputGroup>
                    <Input
                      placeholder="Contoh: Healing dulu ke bandung..."
                      bgColor="tripl-new.cream"
                      borderWidth="2px"
                      focusBorderColor="tripl-new.orange"
                      fontWeight="600"
                      borderRadius="50px"
                      type="text"
                      _placeholder={{
                        color: "tripl-new.gray-200",
                        opacity: "0.7",
                      }}
                      {...register("title")}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.title && errors.title.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.date}>
                  <FormLabel color="tripl-new.black" ms="20px">
                    Tanggal
                  </FormLabel>
                  <InputGroup>
                    <Input
                      bgColor="tripl-new.cream"
                      borderWidth="2px"
                      focusBorderColor="tripl-new.orange"
                      fontWeight="600"
                      borderRadius="50px"
                      type="date"
                      // pattern="\d{2}-\d{2}-\d{2}"
                      _placeholder={{
                        color: "tripl-new.gray-200",
                        opacity: "0.7",
                      }}
                      {...register("date")}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.date && errors.date.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.description}>
                  <FormLabel color="tripl-new.black" ms="20px">
                    Deskripsi
                  </FormLabel>
                  <InputGroup>
                    <Textarea
                      placeholder="Weekend nanti nih..."
                      bgColor="tripl-new.cream"
                      borderWidth="2px"
                      focusBorderColor="tripl-new.orange"
                      fontWeight="600"
                      borderRadius="20px"
                      type="text"
                      _placeholder={{
                        color: "tripl-new.gray-200",
                        opacity: "0.7",
                      }}
                      {...register("description")}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                </FormControl>
                <Button
                  bgColor="tripl-new.orange"
                  color="tripl-new.light"
                  py="10px"
                  w="full"
                  borderRadius="50px"
                  transitionDuration="0.2s"
                  transitionTimingFunction="ease-in-out"
                  type="submit"
                  mt="20px"
                  _hover={{
                    transform: "translateY(10%)",
                    transitionDuration: "0.2s",
                    transitionTimingFunction: "ease-in-out",
                  }}
                >
                  <SmallAddIcon me="5px" />
                  Tambah
                </Button>
              </VStack>
            </form>
          </Box>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreatePlanForm;
