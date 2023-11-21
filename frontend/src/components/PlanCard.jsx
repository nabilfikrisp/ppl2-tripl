import { Box, Flex, Image, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const PlanCard = ({ data }) => {
  return (
    <Flex
      as={Link}
      id="below"
      flexDir={{ base: "column", md: "row" }}
      borderRadius="10px"
      overflow="hidden"
      height="fit-content"
      minHeight={{ md: "200px" }}
      maxHeight="500px"
      w="full"
      maxW="1000px"
      to={`${data.id}`}
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
          {data.title}
        </Text>
        <Text overflow="hidden" noOfLines={{ base: "6", md: "4" }}>
          {dayjs(data.date).format("DD MMMM YYYY")}
        </Text>
        <Text fontSize="sm" noOfLines={{ base: "2", md: "3" }}>
          {data.description || "No description about this plan"}
        </Text>
      </Flex>
    </Flex>
  );
};

export default PlanCard;
