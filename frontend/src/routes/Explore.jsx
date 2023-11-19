import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ELocationType } from "../utils/helpers/location.helper";
import { BASE_ENDPOINT } from "../api";
import { debounce } from "lodash";
import FilterLabel from "../components/FilterLabel";
import SearchInput from "../components/SearchInput";
import Locations from "../components/Locations";
import useLocationAPI from "../hooks/useLocationAPI";

const Explore = () => {
  const {
    filterConfig,
    setFilterConfig,
    data,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
    handleSearch,
  } = useLocationAPI();

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
          <SearchInput onChange={(e) => handleSearch(e.target.value)} />
          <Flex
            gap={{ base: "10px", xl: "20px" }}
            justifyContent={{ base: "start", md: "space-between" }}
            mt="30px"
            flexWrap={{ base: "wrap", md: "nowrap" }}
          >
            {[
              { label: "Semua", value: undefined },
              { label: "Wisata", value: ELocationType.WISATA },
              { label: "Restoran", value: ELocationType.RESTORAN },
              { label: "Penginapan", value: ELocationType.HOTEL },
            ].map((type, idx) => (
              <FilterLabel
                key={idx}
                onClick={() => {
                  setFilterConfig({ ...filterConfig, type: type.value });
                }}
                isActive={filterConfig.type === type.value}
              >
                {type.label}
              </FilterLabel>
            ))}
          </Flex>
        </Box>
        <Locations
          isError={isError}
          error={error}
          isLoading={isLoading}
          data={data}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </Flex>
    </Flex>
  );
};

export default Explore;
