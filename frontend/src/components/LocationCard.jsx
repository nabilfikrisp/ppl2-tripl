import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

const LocationCard = ({ location }) => {
  return (
    <Flex
      as={Link}
      id="below"
      key={location.placeId}
      flexDir={{ base: "column", md: "row" }}
      borderRadius="50px"
      overflow="hidden"
      height={{ base: "600px", md: "300px" }}
      w="full"
      maxW="1000px"
      to={`${location.id}`}
    >
      <Box
        minW="30%"
        maxW={{ base: "full", md: "30%" }}
        minH={{ base: "40%", md: "full" }}
      >
        <Image
          src={location.photo}
          height="full"
          w="full"
          fallbackSrc="img_fallback.jpg"
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
          {location.name}
        </Text>
        <Flex gap="10px" alignItems="center">
          <Flex color="tripl-new.orange" alignItems="center" gap="4px">
            <AiFillStar />
            <Text fontSize="sm" fontWeight="bold">
              {location.rating}
            </Text>
          </Flex>
          <Text fontSize="sm" fontWeight="medium" color="gray.500">
            {location.reviewCount} reviews
          </Text>
        </Flex>
        <Text overflow="hidden" noOfLines={{ base: "6", md: "4" }}>
          {location.description || "No description about this place"}
        </Text>
        <Text fontSize="sm" noOfLines={{ base: "2", md: "3" }}>
          <Box as="span" fontWeight="bold">
            Address:{" "}
          </Box>
          {location.address || "No address about this place"}
        </Text>
      </Flex>
    </Flex>
  );
};

export default LocationCard;
