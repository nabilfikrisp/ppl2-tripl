import { Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const ProductSection = () => {
  return (
    <Flex
      w="full"
      flexDir="column"
      gap="50px"
      alignItems="center"
      px={{ base: "20px", md: "50px", xl: "150px" }}
    >
      <Text
        color="tripl-new.gray-300"
        fontWeight="bold"
        fontSize="40px"
        textAlign="center"
      >
        Apa yang Akan Anda Lakukan Hari Ini?
      </Text>
      <Link to="/explore">
        <Grid
          gridTemplateColumns="1fr 1fr"
          borderTopRadius="50px"
          overflow="hidden"
          _hover={{
            transform: "translateY(5%)",
            transitionDuration: "0.2s",
            transitionTimingFunction: "ease-in-out",
          }}
          transitionDuration="0.2s"
          transitionTimingFunction="ease-in-out"
        >
          <GridItem height="full" colSpan={{ base: "2", lg: "1" }}>
            <Image src="/home-explore.png" height="full" />
          </GridItem>
          <GridItem
            height="full"
            p="50px"
            as={Flex}
            flexDir="column"
            gap="20px"
            bgColor="tripl-new.cream"
            colSpan={{ base: "2", lg: "1" }}
          >
            <Text fontSize="35px" color="tripl-new.orange" fontWeight="bold">
              Explore
            </Text>
            <Text fontSize="24px">
              Telusuri berbagai destinasi wisata menarik. Temukan tujuan
              perjalanan masa depan Anda sesuai minat dan preferensi.
            </Text>
          </GridItem>
        </Grid>
      </Link>
      <Link to="/planner">
        <Grid
          gridTemplateColumns="1fr 1fr"
          borderBottomRadius="50px"
          overflow="hidden"
          _hover={{
            transform: "translateY(5%)",
            transitionDuration: "0.2s",
            transitionTimingFunction: "ease-in-out",
          }}
          transitionDuration="0.2s"
          transitionTimingFunction="ease-in-out"
        >
          <GridItem
            height="full"
            p="50px"
            as={Flex}
            flexDir="column"
            gap="20px"
            bgColor="tripl-new.cream"
            colSpan={{ base: "2", lg: "1" }}
          >
            <Text
              fontSize="35px"
              color="tripl-new.orange"
              fontWeight="bold"
              textAlign="end"
            >
              Planner
            </Text>
            <Text fontSize="24px" textAlign="end">
              Atur rencana harian Anda dengan detail. Ketahui waktu yang tepat
              untuk mengunjungi atraksi, restoran, dan aktivitas lainnya.
            </Text>
          </GridItem>
          <GridItem height="full" colSpan={{ base: "2", lg: "1" }}>
            <Image src="/home-planner.png" height="full" />
          </GridItem>
        </Grid>
      </Link>
    </Flex>
  );
};

export default ProductSection;
