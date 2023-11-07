import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ELocationType } from "../utils/helpers/location.helper";
import { BASE_ENDPOINT } from "../api";
import { debounce } from "lodash";

const Explore = () => {
  const maxPages = 20;
  const [filterConfig, setFilterConfig] = useState({
    page: 1,
    pageSize: 5,
    type: undefined,
    search: undefined,
  });

  const fetchLocations = async ({ pageParam = 1 }) => {
    const { data } = await axios.get(`${BASE_ENDPOINT}/locations`, {
      params: { ...filterConfig, page: pageParam },
    });
    return data;
  };

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["locations", filterConfig],
    queryFn: ({ pageParam }) => fetchLocations({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < maxPages) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  const handleSearch = debounce((searchValue) => {
    setFilterConfig({ ...filterConfig, search: searchValue });
  }, 300);

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
                onChange={(e) => handleSearch(e.target.value)}
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
              {[
                { label: "Semua", value: undefined },
                { label: "Wisata", value: ELocationType.WISATA },
                { label: "Restoran", value: ELocationType.RESTORAN },
                { label: "Penginapan", value: ELocationType.HOTEL },
              ].map((type, idx) => (
                <Box
                  minW={{ md: "150px", xl: "200px" }}
                  w={{ base: "45%", md: "fit-content" }}
                  py="10px"
                  bgColor={
                    filterConfig.type === type.value
                      ? "tripl-new.orange"
                      : "tripl-new.gray-100"
                  }
                  borderRadius="full"
                  color={
                    filterConfig.type === type.value
                      ? "tripl-new.light"
                      : "tripl-new.black"
                  }
                  key={idx}
                  cursor="pointer"
                  onClick={() => {
                    setFilterConfig({ ...filterConfig, type: type.value });
                  }}
                >
                  <Text textAlign="center">{type.label}</Text>
                </Box>
              ))}
            </Flex>
          </form>
        </Box>
        {isLoading && <Box>Loading...</Box>}
        {isError && <Box>Error: {error}</Box>}
        {data && (
          <>
            <Flex flexDir="column" justifyContent="center" gap="50px">
              {data.pages.map((page, pageIndex) => (
                <React.Fragment key={pageIndex}>
                  {page.map((location, index) => (
                    <Flex
                      id="below"
                      key={index}
                      flexDir={{ base: "column", md: "row" }}
                      borderRadius="50px"
                      overflow="hidden"
                      height={{ base: "600px", md: "300px" }}
                      w="full"
                      maxW="1000px"
                    >
                      <Box
                        minW="30%"
                        maxW={{ base: "full", md: "30%" }}
                        minH={{ base: "40%", md: "full" }}
                      >
                        <Image
                          src={location.photo}
                          height="full"
                          w="full"
                          fallbackSrc="img_fallback.jpg"
                          fallbackStrategy="onError"
                          referrerPolicy="no-referrer"
                          objectFit="cover"
                        />
                      </Box>
                      <Flex
                        flexGrow="1"
                        color="tripl-new.black"
                        bgColor="tripl-new.cream"
                        px="30px"
                        flexDir="column"
                        gap="10px"
                        py={{ base: "15px", md: "30px" }}
                      >
                        <Text
                          fontWeight="bold"
                          fontSize={{ base: "24px", md: "30px" }}
                          textOverflow="ellipsis"
                        >
                          {location.name}
                        </Text>
                        <Flex gap="10px" alignItems="center">
                          <Flex
                            color="tripl-new.orange"
                            alignItems="center"
                            gap="4px"
                          >
                            <AiFillStar />
                            <Text fontSize="sm" fontWeight="bold">
                              {location.rating}
                            </Text>
                          </Flex>
                          <Text
                            fontSize="xs"
                            fontWeight="medium"
                            color="gray.500"
                          >
                            ({location.reviewCount}) reviews
                          </Text>
                        </Flex>
                        <Text
                          overflow="hidden"
                          noOfLines={{ base: "6", md: "4" }}
                        >
                          {location.description ||
                            "No description about this place"}
                        </Text>
                        <Text fontSize="sm" noOfLines={{ base: "2", md: "3" }}>
                          <Box as="span" fontWeight="bold">
                            Address:{" "}
                          </Box>
                          {location.address || "No address about this place"}
                        </Text>
                      </Flex>
                    </Flex>
                  ))}
                </React.Fragment>
              ))}
            </Flex>
            {data.pages[0].length > 0 && hasNextPage ? (
              <Button
                bgColor="tripl-new.orange"
                color="tripl-new.light"
                transitionDuration="0.2s"
                boxShadow="lg"
                transitionTimingFunction="ease-in-out"
                _hover={{
                  transform: "translateY(10%)",
                  transitionDuration: "0.2s",
                  transitionTimingFunction: "ease-in-out",
                }}
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                isLoading={isFetchingNextPage}
                loadingText="Loading more..."
              >
                Load More
              </Button>
            ) : (
              <Text>Nothing to see here... 😎</Text>
            )}
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Explore;
