import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../context/ModalContext";
import { usePlanLocations } from "../hooks/usePlanLocations";
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
import React, { useEffect, useState } from "react";
import AddLocation from "../components/forms/AddLocation";
import { IoIosArrowBack } from "react-icons/io";
import dayjs from "dayjs";
import { FaPlus } from "react-icons/fa6";
import PlanStepper from "../components/PlanStepper";
import { DeleteIcon } from "@chakra-ui/icons";
import { AiFillStar } from "react-icons/ai";
import { useGetPlanDetail } from "../hooks/useGetPlanDetail";
import useAlert from "../hooks/useAlert";
import { usePutPlan } from "../hooks/usePutPlan";
import EditPlanForm from "../components/forms/EditPlanForm";

const PlanDetail = () => {
  const { id: planId } = useParams();
  const navigate = useNavigate();
  const {
    data: planDetail,
    isError: isPlanDetailError,
    isLoading: isPlanDetailLoading,
    isSuccess: isPlanDetailSuccess,
  } = useGetPlanDetail(planId);
  const { showModal, hideModal } = useModal();
  const { handleError } = useAlert();
  const {
    locations,
    deleteLocationById,
    setLocations,
    reset: resetPlan,
  } = usePlanLocations();
  const {
    isOpen: alertIsOpen,
    onOpen: alertOnOpen,
    onClose: alertOnClose,
  } = useDisclosure();
  const {
    isOpen: formIsOpen,
    onOpen: formOnOpen,
    onClose: formOnClose,
  } = useDisclosure();
  const alertCancelRef = React.useRef();
  const [deletedId, setDeletedId] = useState("");
  const [planDesc, setPlanDesc] = useState({
    title: "",
    date: "",
    description: "",
  });
  const { mutate: putPlan, isLoading: isPutPlanLoading } = usePutPlan(planId);

  useEffect(() => {
    if (isPlanDetailSuccess) {
      setLocations(planDetail.locations);
      setPlanDesc({
        title: planDetail.title,
        date: planDetail.date,
        description: planDetail.description,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlanDetailSuccess]);

  if (isPlanDetailError) {
    handleError("Error fetching data, please refresh!");
  }

  const onSubmit = () => {
    const locationsRequestBody = locations.map((planLocation) => {
      return {
        location: planLocation.location.id,
        timeRange: planLocation.timeRange,
      };
    });
    const requestBody = { ...planDesc, locations: locationsRequestBody };
    putPlan(requestBody);
  };

  if (isPlanDetailLoading) {
    return <Text>Loading...</Text>;
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
            resetPlan();
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
            Trip {planDesc.title || planDetail.title}
          </Text>
          <Text>
            {dayjs(planDesc.date || planDetail.date).format("DD MMMM YYYY")}
          </Text>
          <Text>{planDesc.description || planDetail.description || ""}</Text>
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
          isLoading={isPutPlanLoading}
        >
          Save
        </Button>
      </Flex>
      <Box maxW="1000px" mx="auto" mt="20px" px={{ base: "20px", lg: 0 }}>
        <Flex gap="20px">
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
          <Button
            bgColor="yellow.400"
            color="black.400"
            transitionDuration="0.2s"
            boxShadow="lg"
            transitionTimingFunction="ease-in-out"
            _hover={{
              transform: "translateY(10%)",
              transitionDuration: "0.2s",
              transitionTimingFunction: "ease-in-out",
            }}
            size="md"
            onClick={() => {
              formOnOpen();
            }}
            w="fit-content"
          >
            Edit Detail
          </Button>
        </Flex>
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
                      fallbackSrc="/img_fallback.webp"
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
      <EditPlanForm
        isOpen={formIsOpen}
        onClose={formOnClose}
        setDetail={setPlanDesc}
      />
    </Box>
  );
};

export default PlanDetail;
