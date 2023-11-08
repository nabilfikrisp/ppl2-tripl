import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import CreatePlanForm from "../components/forms/CreatePlanForm";
import { SmallAddIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";

const Planner = () => {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (location.state && location.state.openModal) {
      onOpen();
    }
  }, []);
  return (
    <>
      <Box w="full" py="50px" px={{ base: "10px", md: "50px", xl: "200px" }}>
        <Text
          color="tripl-new.orange"
          fontWeight="bold"
          fontSize={{ base: "36px", md: "48px" }}
          mb="50px"
          textAlign="center"
        >
          CATATAN PERJALANANMU
        </Text>
        <Flex flexDir="column" gap="50px" alignItems="center">
          <Flex
            flexDir={{ base: "column", md: "row" }}
            borderRadius="50px"
            overflow="hidden"
            height={{ base: "fit-content", md: "250px" }}
            w="full"
            maxW="1000px"
          >
            <Box minW="30%" height="full">
              <Image src="/location-image-example.png" height="full" w="full" />
            </Box>
            <Flex
              flexGrow="1"
              color="tripl-new.black"
              bgColor="tripl-new.cream"
              px="30px"
              flexDir="column"
              gap="20px"
              justifyContent="center"
              py="30px"
            >
              <Text fontWeight="bold" fontSize="30px">
                1 Hari di Bandung
              </Text>
              <Text>4 Destinasi yang Dikunjungi</Text>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                vestibulum lectus eu eleifend tristique. Nulla facilisi.
              </Text>
            </Flex>
          </Flex>
          <Flex
            flexDir={{ base: "column", md: "row" }}
            borderRadius="50px"
            overflow="hidden"
            height={{ base: "fit-content", md: "250px" }}
            w="full"
            maxW="1000px"
          >
            <Box minW="30%" height="full">
              <Image
                src="/location-detail-img-example.png"
                height="full"
                w="full"
              />
            </Box>
            <Flex
              flexGrow="1"
              color="tripl-new.black"
              bgColor="tripl-new.cream"
              px="30px"
              flexDir="column"
              gap="20px"
              justifyContent="center"
              py="30px"
            >
              <Text fontWeight="bold" fontSize="30px">
                Healing di Bandung
              </Text>
              <Text>6 Destinasi yang Dikunjungi</Text>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                vestibulum lectus eu eleifend tristique. Nulla facilisi.
              </Text>
            </Flex>
          </Flex>
          <Flex justifyContent="center" align="center" w="full">
            <Button
              bgColor="tripl-new.orange"
              color="tripl-new.light"
              px="100px"
              py="10px"
              borderRadius="50px"
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
        </Flex>
      </Box>
      <CreatePlanForm isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Planner;
