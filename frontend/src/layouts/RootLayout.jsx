import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <Box
      minHeight={"100vh"}
      as={Flex}
      flexDir="column"
      justifyContent="space-between"
      backgroundColor="tripl-new.light"
      overflowY="auto"
    >
      <Header />
      <Box flexGrow={1}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default RootLayout;
