import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Unknown404 = () => {
  const navigate = useNavigate();

  return (
    <Flex
      fontSize="8xl"
      h="60vh"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
    >
      <Text fontWeight="bold">404</Text>
      <Button
        onClick={() => navigate(-1)}
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
      >
        Go Back
      </Button>
    </Flex>
  );
};

export default Unknown404;
