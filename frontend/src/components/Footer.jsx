import { Flex, Text, chakra } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <chakra.footer>
      <Flex
        justifyContent="center"
        alignItems="center"
        minHeight="100px"
        backgroundColor="tripl.dark "
        textColor="tripl.green-100"
      >
        <Text fontWeight={600}>Ini Footer 3</Text>
      </Flex>
    </chakra.footer>
  );
};

export default Footer;
