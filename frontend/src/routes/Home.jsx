import React from "react";
import { Flex } from "@chakra-ui/react";
import HeroSection from "../components/landing-page/HeroSection";
import ProductSection from "../components/landing-page/ProductSection";

const Home = () => {
  return (
    <Flex width="full" flexDir="column" minHeight="65vh" height="full" gap={{ xl:"100px" }}>
      <HeroSection />
      <ProductSection />
    </Flex>
  );
};

export default Home;
