import { SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, Image, Input, Text } from "@chakra-ui/react";
import React from "react";

const Explore = () => {
  return (
    <Flex width="full" flexDir="column" minHeight="65vh" height="full">
      <Flex
        justifyContent="center"
        flexDir="column"
        alignItems="center"
        py="50px"
        px={{ base: "20px", md: "50px", xl: "200px" }}
        gap="50px"
      >
        <Text fontSize="50px" fontWeight="bold" color="tripl-new.orange">
          Explore
        </Text>
        <Box w="full" maxW="1000px">
          <form>
            <Flex w="full" gap="20px">
              <Input
                placeholder="search for a place.."
                bgColor="tripl-new.gray-100"
                focusBorderColor="tripl-new.orange"
                _placeholder={{
                  color: "tripl-new.gray-200",
                  opacity: "0.7",
                }}
                color="tripl-new.black"
                height="60px"
                borderRadius="100px"
                px="30px"
              />
              <Flex
                justifyContent="center"
                alignItems="center"
                bg="tripl-new.orange"
                p="20px"
                minW="60px"
                borderRadius="full"
                color="tripl-new.light"
              >
                <SearchIcon />
              </Flex>
            </Flex>
            <Flex
              gap={{ base: "10px", xl: "50px" }}
              justifyContent={{ base: "start", md: "space-between" }}
              mt="30px"
              flexWrap="wrap"
            >
              <Box
                minW={{ md: "150px", xl: "200px" }}
                w={{ base: "45%", md: "fit-content" }}
                py="10px"
                bgColor="tripl-new.orange"
                borderRadius="full"
                color="tripl-new.light"
              >
                <Text textAlign="center">Semua</Text>
              </Box>
              <Box
                minW={{ md: "150px", xl: "200px" }}
                w={{ base: "45%", md: "fit-content" }}
                py="10px"
                bgColor="tripl-new.gray-100"
                borderRadius="full"
                color="tripl-new.black"
              >
                <Text textAlign="center">Wisata</Text>
              </Box>
              <Box
                minW={{ md: "150px", xl: "200px" }}
                w={{ base: "45%", md: "fit-content" }}
                py="10px"
                bgColor="tripl-new.gray-100"
                borderRadius="full"
                color="tripl-new.black"
              >
                <Text textAlign="center">Restoran</Text>
              </Box>
              <Box
                minW={{ md: "150px", xl: "200px" }}
                w={{ base: "45%", md: "fit-content" }}
                py="10px"
                bgColor="tripl-new.gray-100"
                borderRadius="full"
                color="tripl-new.black"
              >
                <Text textAlign="center">Penginapan</Text>
              </Box>
            </Flex>
          </form>
        </Box>
        <Flex flexDir="column" justifyContent="center" gap="50px">
          <Flex
            flexDir={{ base: "column", md: "row" }}
            borderRadius="50px"
            overflow="hidden"
            height={{ base: "fit-content", md: "250px" }}
            w="full"
          >
            <Box minW="30%" height="full">
              <Image src="/location-image-example.png" height="full" w="full" />
            </Box>
            <Flex
              flexGrow="1"
              color="tripl-new.black"
              bgColor="tripl-new.cream"
              px="30px"
              flexDir="column"
              gap="20px"
              justifyContent="center"
              py="30px"
            >
              <Text fontWeight="bold" fontSize="30px">
                Pulau Padar - Padar Island, Nusa Tenggara Timur
              </Text>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                vestibulum lectus eu eleifend tristique. Nulla facilisi.
              </Text>
            </Flex>
          </Flex>
          <Flex
            flexDir={{ base: "column", md: "row" }}
            borderRadius="50px"
            overflow="hidden"
            height={{ base: "fit-content", md: "250px" }}
            w="full"
          >
            <Box minW="30%" height="full">
              <Image src="/location-image-example.png" height="full" w="full" />
            </Box>
            <Flex
              flexGrow="1"
              color="tripl-new.black"
              bgColor="tripl-new.cream"
              px="30px"
              flexDir="column"
              gap="20px"
              justifyContent="center"
              py="30px"
            >
              <Text fontWeight="bold" fontSize="30px">
                Pulau Padar - Padar Island, Nusa Tenggara Timur
              </Text>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                vestibulum lectus eu eleifend tristique. Nulla facilisi.
              </Text>
            </Flex>
          </Flex>
          <Flex
            flexDir={{ base: "column", md: "row" }}
            borderRadius="50px"
            overflow="hidden"
            height={{ base: "fit-content", md: "250px" }}
            w="full"
          >
            <Box minW="30%" height="full">
              <Image src="/location-image-example.png" height="full" w="full" />
            </Box>
            <Flex
              flexGrow="1"
              color="tripl-new.black"
              bgColor="tripl-new.cream"
              px="30px"
              flexDir="column"
              gap="20px"
              justifyContent="center"
              py="30px"
            >
              <Text fontWeight="bold" fontSize="30px">
                Pulau Padar - Padar Island, Nusa Tenggara Timur
              </Text>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                vestibulum lectus eu eleifend tristique. Nulla facilisi.
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Explore;