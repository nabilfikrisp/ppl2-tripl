import { Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React from "react";

const HeroSection = () => {
  return (
    <Grid
      as="section"
      id="hero-section"
      width="full"
      color="tripl-new.black"
      marginX="auto"
      templateColumns={{ base: "1fr", xl: "1fr 1fr" }}
      gap="20px"
      minH="90vh"
    >
      <GridItem
        as={Flex}
        flexDir="column"
        gap="40px"
        textAlign={{ base: "center", xl: "start" }}
        paddingX="40px"
        justifyContent="center"
        alignItems="center"
        colSpan={{ base: "2", xl: "1" }}
      >
        <Text
          as="h1"
          fontSize={{
            base: "75px",
          }}
          fontWeight="1000"
          lineHeight="110%"
          color="tripl-new.orange"
          maxWidth="1000px"
          mt = "30"
        >
          Plan It, Live It, Love It: Your Journey, Our Planner
        </Text>
        <Text
          fontSize={{ base: "20px", xl: "35px" }}
          as="h2"
          fontWeight="400"
          lineHeight="110%"
          maxWidth="1000px"
        >
          Rencanakan perjalanan impianmu dengan mudah dan lengkap dalam satu
          aplikasi!
        </Text>
      </GridItem>
      <GridItem
        as={Flex}
        justifyContent="center"
        display={{ base: "none", xl: "flex" }}
        overflow="hidden"
        alignItems="center"
      >
        <Image
          src="/bandoeng.jpg"
          w="full"
          aspectRatio="4/3"
          height="fit-content"
        />
      </GridItem>
    </Grid>
  );
};

export default HeroSection;
