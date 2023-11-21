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
import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import dayjs from "dayjs";
import AddLocation from "./AddLocation";
import { usePlanLocations } from "../../hooks/usePlanLocations";
import { useModal } from "../../context/ModalContext";
import PlanStepper from "../PlanStepper";
import { AiFillStar } from "react-icons/ai";
import { DeleteIcon } from "@chakra-ui/icons";
import { useCreatePlan } from "../../hooks/useCreatePlan";

const SavePlanDetail = () => {
  const params = useLocation();
  const navigate = useNavigate();
  const previousData = params.state?.data || null;
  const { showModal, hideModal } = useModal();
  const { locations, deleteLocationById } = usePlanLocations();
  const {
    isOpen: alertIsOpen,
    onOpen: alertOnOpen,
    onClose: alertOnClose,
  } = useDisclosure();
  const alertCancelRef = React.useRef();
  const [deletedId, setDeletedId] = useState("");
  const {
    mutate: savePlan,
    isLoading: isCreatePlanLoading,
    isSuccess: isCreatePlanSuccess,
  } = useCreatePlan();

  if (previousData === null) {
    return <Navigate state={{ openModal: true }} to="/planner" />;
  }

  const onSubmit = () => {
    const locationsRequestBody = locations.map((planLocation) => {
      return {
        location: planLocation.location.id,
        timeRange: planLocation.timeRange,
      };
    });
    const requestBody = { ...previousData, locations: locationsRequestBody };
    savePlan(requestBody);
  };

  if (isCreatePlanSuccess) {
    navigate("/planner");
  }

  const openAddLocationModal = () => {
    showModal({
      header: "Pilih Destinasi Tambahan",
      size: "full",
      closeButton: true,
      body: <AddLocation />,
      footer: <Button onClick={hideModal}>Close</Button>,
    });
  };

  return (
    <Box>
      <Flex
        bgColor="tripl-new.cream"
        maxW="1000px"
        mx="auto"
        px={{ base: "10px", md: "50px" }}
        py="20px"
        borderBottomRadius="10px"
        gap="20px"
        w="full"
        flexWrap={{ base: "wrap", md: "nowrap" }}
      >
        <Box
          onClick={() => {
            navigate(-1);
          }}
          cursor="pointer"
          color="tripl-new.orange"
          transitionDuration="0.2s"
          transitionTimingFunction="ease-in-out"
          _hover={{
            transform: "translateX(-20%)",
            transitionDuration: "0.2s",
            transitionTimingFunction: "ease-in-out",
          }}
          w="fit-content"
        >
          <IoIosArrowBack size="50px" />
        </Box>
        <Flex
          flexGrow="1"
          flexDir="column"
          gap="10px"
          maxW={{ base: "70%", sm: "80%" }}
        >
          <Text
            color="tripl-new.orange"
            fontSize={{ base: "30px", md: "40px" }}
            fontWeight="bold"
          >
            Trip {previousData.title}
          </Text>
          <Text>{dayjs(previousData.date).format("DD MMMM YYYY")}</Text>
          <Text>{previousData.description}</Text>
        </Flex>
        <Button
          placeSelf="end"
          ms={{ base: "70px", md: 0 }}
          bgColor="tripl-new.orange"
          color="tripl-new.light"
          transitionDuration="0.2s"
          boxShadow="lg"
          transitionTimingFunction="ease-in-out"
          _hover={{
            transform: "translateY(10%)",
            transitionDuration: "0.2s",
            transitionTimingFunction: "ease-in-out",
          }}
          size="lg"
          onClick={() => onSubmit()}
          w="fit-content"
          isDisabled={locations.length === 0}
          isLoading={isCreatePlanLoading}
        >
          Save
        </Button>
      </Flex>
      <Box maxW="1000px" mx="auto" mt="20px" px={{ base: "20px", md: 0 }}>
        <Button
          bgColor="tripl-new.orange"
          color="tripl-new.light"
          transitionDuration="0.2s"
          boxShadow="lg"
          transitionTimingFunction="ease-in-out"
          _hover={{
            transform: "translateY(10%)",
            transitionDuration: "0.2s",
            transitionTimingFunction: "ease-in-out",
          }}
          onClick={() => openAddLocationModal()}
        >
          <FaPlus /> Tambah Destinasi
        </Button>
        <Flex flexDir="column" mt="20px">
          <Text fontSize="3xl" fontWeight="bold" color="tripl-new.orange">
            List Perjalanmu
          </Text>
          {locations.map((locationPlan, index) => (
            <Flex gap="20px" key={index} px={{ md: "20px" }}>
              <PlanStepper index={index} arrLen={locations.length} />
              <Box w="full" py="25px">
                <Flex gap="20px" justifyContent="space-between" mb="10px">
                  <Text fontSize="xl" fontWeight="semibold">
                    {locationPlan.timeRange}
                  </Text>
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
                    onClick={() => {
                      alertOnOpen();
                      setDeletedId(locationPlan.location.id);
                      // deleteLocationById(locationPlan.location.id);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </Flex>
                <Flex
                  id="below"
                  flexDir={{ base: "column", md: "row" }}
                  borderRadius="10px"
                  overflow="hidden"
                  height={{ base: "fit-content", md: "300px" }}
                  w="full"
                  maxW="1000px"
                >
                  <Box
                    minW="30%"
                    maxW={{ base: "full", md: "30%" }}
                    minH={{ base: "40%", md: "full" }}
                  >
                    <Image
                      src={locationPlan.location.photo}
                      height="full"
                      w="full"
                      fallbackSrc="/img_fallback.jpg"
                      fallbackStrategy="onError"
                      referrerPolicy="no-referrer"
                      objectFit="cover"
                    />
                  </Box>
                  <Flex
                    flexGrow="1"
                    color="tripl-new.black"
                    bgColor="tripl-new.cream"
                    px={{ base: "15px", md: "30px" }}
                    flexDir="column"
                    gap="10px"
                    py={{ base: "15px", md: "30px" }}
                  >
                    <Text
                      fontWeight="bold"
                      fontSize={{ base: "20px", md: "30px" }}
                      textOverflow="ellipsis"
                    >
                      {locationPlan.location.name}
                    </Text>
                    <Flex
                      gap="10px"
                      alignItems="center"
                      fontSize={{ base: "xs", md: "sm" }}
                    >
                      <Image
                        src={`/${locationPlan.location.type}-icon.svg`}
                        w="25px"
                        h="25px"
                      />
                      <Flex
                        color="tripl-new.orange"
                        alignItems="center"
                        gap="4px"
                      >
                        <AiFillStar />
                        <Text fontWeight="bold">
                          {locationPlan.location.rating}
                        </Text>
                      </Flex>
                      <Text fontWeight="medium" color="gray.500">
                        {locationPlan.location.reviewCount} reviews
                      </Text>
                    </Flex>
                    <Text
                      overflow="hidden"
                      noOfLines={{ base: "3", md: "4" }}
                      fontSize={{ base: "sm", md: "lg" }}
                    >
                      {locationPlan.location.description ||
                        "No description about this place"}
                    </Text>
                    <Text fontSize="sm" noOfLines={{ base: "2", md: "3" }}>
                      <Box as="span" fontWeight="bold">
                        Address:{" "}
                      </Box>
                      {locationPlan.location.address ||
                        "No address about this place"}
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          ))}
        </Flex>
      </Box>
      <AlertDialog
        isOpen={alertIsOpen}
        leastDestructiveRef={alertCancelRef}
        onClose={alertOnClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Destination
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure to delete this destination?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={alertCancelRef} onClick={alertOnClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deleteLocationById(deletedId);
                  alertOnClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default SavePlanDetail;
