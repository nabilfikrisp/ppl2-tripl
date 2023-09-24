import { Button, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const ExploreSection = () => {
  return (
    <Grid
      as="section"
      id="explore-section"
      width="full"
      paddingY="80px"
      paddingX="40px"
      color="tripl.dark"
      bgColor="tripl.light-200"
      marginX="auto"
      templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
      gap="40px"
    >
      <GridItem as={Flex} justifyContent="center">
        <Image src="/Explore_light.svg" />
      </GridItem>
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
          Explore the World
        </Text>
        <Text
          fontSize={{ base: "30px", xl: "40px" }}
          as="h2"
          fontWeight="600"
          lineHeight="110%"
        >
          Explore new horizons, uncover hidden gems, and embark on unforgettable
          journeys. TRIPL's Explore feature opens doors to exciting destinations
          and unique experiences around the globe.
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
          <Link to="/explore">Explore Now!</Link>
        </Button>
      </GridItem>
    </Grid>
  );
};

export default ExploreSection;
