import {
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  AspectRatio,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const PlannerSection = () => {
  return (
    <Grid
      as="section"
      id="planner-section"
      width="full"
      paddingY="80px"
      paddingX="40px"
      color="tripl.dark"
      marginX="auto"
      templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
      gap="40px"
    >
      <GridItem
        as={Flex}
        maxWidth="1000px"
        flexDir="column"
        gap="40px"
        textAlign={{ base: "center", lg: "start" }}
      >
        <Text
          as="h1"
          fontSize={{
            base: "75px",
            xl: "100px",
          }}
          fontWeight="1000"
          lineHeight="110%"
        >
          Plan Your Dream Getaway
        </Text>
        <Text
          fontSize={{ base: "30px", xl: "40px" }}
          as="h2"
          fontWeight="600"
          lineHeight="110%"
        >
          Turn your dreams into reality with TRIPL's Planner feature.
          Effortlessly create custom itineraries, add your favorite spots, and
          craft the perfect travel plan.
        </Text>
        <Button
          width="fit-content"
          size="lg"
          bgColor="tripl.dark"
          color="tripl.light"
          marginX={{ base: "auto", lg: "0" }}
          transitionDuration="0.2s"
          transitionTimingFunction="ease-in-out"
          _hover={{
            transform: { base: "translateY(10%)", lg: "translateX(10%)" },
            transitionDuration: "0.2s",
            transitionTimingFunction: "ease-in-out",
          }}
        >
          <Link to="/explore">Plan Your Trip!</Link>
        </Button>
      </GridItem>
      <GridItem
        as={Flex}
        justifyContent="center"
        rowStart={{ base: 1 }}
        colStart={{ base: 1, lg: 2 }}
      >
        <AspectRatio ratio={1} width="full" maxWidth="600px">
          <Image src="/Planner_dark.svg" />
        </AspectRatio>
      </GridItem>
    </Grid>
  );
};

export default PlannerSection;
