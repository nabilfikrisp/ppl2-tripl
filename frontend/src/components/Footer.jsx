import { Box, Flex, Text, chakra } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <chakra.footer>
      <Flex
        minHeight="100px"
        backgroundColor="tripl-new.light"
        textColor="tripl-new.black"
        px={{ base: "30px", md: "100px" }}
        borderTop="1px solid"
        borderColor="tripl-new.gray-100"
        py="50px"
        flexDir="column"
        gap="20px"
      >
        <Flex
          w={{ base: "100%", md: "50%" }}
          gap="20px"
          h="100%"
          flexDir={{ base: "column", md: "row" }}
        >
          <Flex w={{ base: "100%", md: "50%" }} flexDir="column" h="100%">
            <Text mb="10px">TENTANG TRIPL</Text>
            <Box w="fit-content">
              <Link to="/about-us">
                <Text
                  _hover={{ textColor: "tripl-new.orange" }}
                  w="fit-content"
                >
                  Tentang Kami
                </Text>
              </Link>
            </Box>

            <Box w="fit-content">
              <Link to="/faq">
                <Text
                  _hover={{ textColor: "tripl-new.orange" }}
                  w="fit-content"
                >
                  FAQ
                </Text>
              </Link>
            </Box>
          </Flex>
          <Flex w={{ base: "100%", md: "50%" }} flexDir="column">
            <Text mb="10px">PRODUCT</Text>
            <Box w="fit-content">
              <Link to="/explore">
                <Text
                  _hover={{ textColor: "tripl-new.orange" }}
                  w="fit-content"
                >
                  Explore
                </Text>
              </Link>
            </Box>
            <Box w="fit-content">
              <Link to="/planner">
                <Text
                  _hover={{ textColor: "tripl-new.orange" }}
                  w="fit-content"
                >
                  Planner
                </Text>
              </Link>
            </Box>
          </Flex>
        </Flex>
        <Flex w="100%" justifyContent="center" h="100%" alignItems="end">
          <Text textAlign="center">
            TRIPL developer @ 2023 All Right Reserved
          </Text>
        </Flex>
      </Flex>
    </chakra.footer>
  );
};

export default Footer;
