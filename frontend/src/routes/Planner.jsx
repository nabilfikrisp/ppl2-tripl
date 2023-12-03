import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect } from "react";
import CreatePlanForm from "../components/forms/CreatePlanForm";
import { SmallAddIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";
import { useGetMyPlans } from "../hooks/useGetMyPlans";
import MyPlanList from "../components/MyPlanList";

const Planner = () => {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    data: myPlans,
    isLoading: isMyPlansLoading,
    isError: isMyPlansError,
  } = useGetMyPlans({ includeLocations: true });
  useEffect(() => {
    if (location.state && location.state.openModal) {
      onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box w="full" py="50px" px={{ base: "10px", md: "50px", xl: "200px" }}>
        <Text
          color="tripl-new.orange"
          fontWeight="bold"
          fontSize={{ base: "30px", md: "48px" }}
          mb={{ base: "20px", md: "50px" }}
          textAlign="center"
        >
          CATATAN PERJALANANMU
        </Text>
        <Flex
          justifyContent="center"
          align="center"
          w="full"
          mb={{ base: "30px", md: "50px" }}
        >
          <Button
            bgColor="tripl-new.orange"
            color="tripl-new.light"
            px="100px"
            py="10px"
            borderRadius="10px"
            transitionDuration="0.2s"
            transitionTimingFunction="ease-in-out"
            _hover={{
              transform: "translateY(10%)",
              transitionDuration: "0.2s",
              transitionTimingFunction: "ease-in-out",
            }}
            onClick={onOpen}
          >
            <SmallAddIcon me="5px" />
            Catatan baru
          </Button>
        </Flex>
        {isMyPlansError && (
          <Flex justifyContent="center">
            Error fetching data, please try again!
          </Flex>
        )}
        {isMyPlansLoading && <Flex justifyContent="center">Loading...</Flex>}
        {myPlans && <MyPlanList data={myPlans} />}
      </Box>
      <CreatePlanForm isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Planner;
