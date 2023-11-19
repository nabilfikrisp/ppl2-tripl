import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import dayjs from "dayjs";
import AddLocation from "./AddLocation";
import { usePlanLocations } from "../../hooks/usePlanLocations";
import { useModal } from "../../context/ModalContext";

const SavePlanDetail = () => {
  const params = useLocation();
  const navigate = useNavigate();
  const previousData = params.state?.data || null;
  const { showModal, hideModal } = useModal();
  const { addNewLocation, locations } = usePlanLocations();

  console.log(locations, "LOCATIONS");

  if (previousData === null) {
    return <Navigate state={{ openModal: true }} to="/planner" />;
  }

  const onSubmit = () => {
    console.log({ ...previousData, locations: "ASJDASDJLAS" });
    addNewLocation({ location: "ajsdlasdj" });
  };

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
        px="50px"
        py="20px"
        borderBottomRadius="10px"
        gap="20px"
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
        >
          <IoIosArrowBack size="50px" />
        </Box>
        <Flex grow="1" flexDir="column" gap="10px">
          <Text color="tripl-new.orange" fontSize="40px" fontWeight="bold">
            Trip {previousData.title}
          </Text>
          <Text>{dayjs(previousData.date).format("DD MMMM YYYY")}</Text>
          <Text>{previousData.description}</Text>
        </Flex>
        <Button
          placeSelf="end"
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
        >
          Save
        </Button>
      </Flex>
      <Box maxW="1000px" mx="auto" mt="10px">
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
      </Box>
    </Box>
  );
};

export default SavePlanDetail;
