import { Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React from "react";

const BrandingSection = () => {
  return (
    <Grid
      as="section"
      id="branding-section"
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
          Unlock Your Next Adventure with TRIPL
        </Text>
        <Text
          fontSize={{ base: "35px", xl: "50px" }}
          as="h2"
          fontWeight="600"
          lineHeight="110%"
        >
          Discover, Explore, and Plan Your Perfect Journey
        </Text>
      </GridItem>
      <GridItem
        as={Flex}
        justifyContent="center"
        display={{ base: "none", lg: "flex" }}
      >
        <Image src="/Trip.svg" />
      </GridItem>
    </Grid>
  );
};

export default BrandingSection;
