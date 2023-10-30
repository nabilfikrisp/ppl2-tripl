import { SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, Image, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";

const Explore = () => {
  const [data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/locations", {
        params: {
          page: 1,
          pageSize: 10,
        },
      })
      .then((res) => {
        setData(res.data);
        setIsloading(false);
      });
  }, []);

  if (isLoading) return <Box>Loading...</Box>;

  console.log(data, "DATA");
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
          {data.map((location) => (
            <Flex
              key={location.googleid}
              flexDir={{ base: "column", md: "row" }}
              borderRadius="50px"
              overflow="hidden"
              height={{ base: "fit-content", md: "250px" }}
              w="full"
            >
              <Box minW="30%" maxW="30%" height="full" just>
                <Image
                  src={location.photo}
                  height="full"
                  w="full"
                  fallbackSrc="auth-bg.svg"
                  fallbackStrategy="onError"
                  referrerPolicy="no-referrer"
                  objectFit="cover"
                  loading="lazy"
                />
              </Box>
              <Flex
                flexGrow="1"
                color="tripl-new.black"
                bgColor="tripl-new.cream"
                px="30px"
                flexDir="column"
                gap="20px"
                py="30px"
              >
                <Text fontWeight="bold" fontSize="30px">
                  {location.name}
                </Text>
                <Flex alignItems="center" gap="4px">
                  <AiFillStar />
                  <Text fontSize="sm">{location.rating}</Text>
                </Flex>
                <Text fontSize="xs" fontWeight="medium" color="gray.500">
                  ({location.reviewCount}) reviews
                </Text>
                <Text>
                  {location.description || "No description about this place"}
                </Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Explore;
