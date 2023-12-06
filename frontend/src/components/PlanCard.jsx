import { DeleteIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import React from "react";
import { useDeletePlan } from "../hooks/useDeletePlan";

const PlanCard = ({ data }) => {
  const navigate = useNavigate();
  const alertCancelRef = React.useRef();
  const {
    isOpen: alertIsOpen,
    onOpen: alertOnOpen,
    onClose: alertOnClose,
  } = useDisclosure();
  const { mutate: deletePlan, isLoading: isDeletePlanLoading } = useDeletePlan(
    data.id
  );
  return (
    <Flex
      id="below"
      flexDir={{ base: "column", md: "row" }}
      borderRadius="10px"
      overflow="hidden"
      height="fit-content"
      minHeight={{ md: "200px" }}
      maxHeight="500px"
      w="full"
      maxW="1000px"
    >
      <Box
        minW="30%"
        maxW={{ base: "full", md: "30%" }}
        minH={{ base: "40%", md: "full" }}
      >
        <Image
          src={data.locations[0].location.photo}
          height="full"
          w="full"
          fallbackSrc="img_fallback.webp"
          fallbackStrategy="onError"
          referrerPolicy="no-referrer"
          objectFit="cover"
        />
      </Box>
      <Flex
        flexGrow="1"
        color="tripl-new.black"
        bgColor="tripl-new.cream"
        px="30px"
        flexDir="column"
        gap="10px"
        py={{ base: "15px", md: "30px" }}
      >
        <Text
          fontWeight="bold"
          fontSize={{ base: "24px", md: "30px" }}
          textOverflow="ellipsis"
        >
          {data.title}
        </Text>
        <Text overflow="hidden" noOfLines={{ base: "6", md: "4" }}>
          {dayjs(data.date).format("DD MMMM YYYY")}
        </Text>
        <Text fontSize="sm" noOfLines={{ base: "2", md: "3" }}>
          {data.description || "No description about this plan"}
        </Text>
        <Flex gap="20px" justifyContent="flex-end">
          <MyButton
            width="fit-content"
            onClick={() => {
              navigate(data.id);
            }}
          >
            Detail
          </MyButton>
          <Button
            colorScheme="red"
            transitionTimingFunction="ease-in-out"
            transitionDuration="0.2s"
            boxShadow="lg"
            _hover={{
              transform: "translateY(10%)",
              transitionDuration: "0.2s",
              transitionTimingFunction: "ease-in-out",
            }}
            onClick={() => alertOnOpen()}
          >
            <DeleteIcon />
          </Button>
        </Flex>
      </Flex>
      <AlertDialog
        isOpen={alertIsOpen}
        leastDestructiveRef={alertCancelRef}
        onClose={alertOnClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Plan
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure to delete this plan?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={alertCancelRef} onClick={alertOnClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deletePlan();
                  alertOnClose();
                }}
                ml={3}
                isLoading={isDeletePlanLoading}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

export default PlanCard;
