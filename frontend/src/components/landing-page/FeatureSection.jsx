import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const FeatureSection = () => {
  return (
    <Box py="80px" px="40px" bgColor="tripl.light-200">
      <Grid
        maxWidth="1000px"
        gridTemplateColumns={"repeat(2,1fr)"}
        mx="auto"
        gap="100px"
      >
        <GridItem as={Link} height="full" to="/explore">
          <Flex
            border="2px"
            borderColor="tripl.green-400"
            height="full"
            justifyContent="center"
            alignItems="center"
            flexDir="column"
            bgColor="tripl.green-100"
            color="tripl.dark"
            padding="20px"
            borderRadius="10px"
            gap="10px"
            transitionDuration="0.2s"
            transitionTimingFunction="ease-in-out"
            _hover={{
              transform: "translateY(5%)",
              transitionDuration: "0.2s",
              transitionTimingFunction: "ease-in-out",
            }}
          >
            <Image src="Explore_light.svg" height="75%" />
            <Text fontSize="40px" fontWeight="600" color="tripl.green-400">
              Explore
            </Text>
          </Flex>
        </GridItem>

        <GridItem as={Link} height="full" to="/plan">
          <Flex
            border="2px"
            borderColor="tripl.green-400"
            height="full"
            justifyContent="center"
            alignItems="center"
            flexDir="column"
            bgColor="tripl.green-100"
            color="tripl.dark"
            padding="20px"
            borderRadius="10px"
            gap="10px"
            transitionDuration="0.2s"
            transitionTimingFunction="ease-in-out"
            _hover={{
              transform: "translateY(5%)",
              transitionDuration: "0.2s",
              transitionTimingFunction: "ease-in-out",
            }}
          >
            <Image src="Planner_light.svg" height="75%" />
            <Text fontSize="40px" fontWeight="600" color="tripl.green-400">
              Plan
            </Text>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default FeatureSection;
