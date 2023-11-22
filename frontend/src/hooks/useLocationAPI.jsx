import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { debounce } from "lodash";
import { BASE_ENDPOINT } from "../api";

const useLocationAPI = ({
  mostViewed = true,
  pageSize,
  debounceTime = 300,
} = {}) => {
  const [filterConfig, setFilterConfig] = useState({
    page: 1,
    pageSize: pageSize,
    type: undefined,
    search: undefined,
    mostViewed,
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
      if (pages[pages.length - 1].length === undefined) {
        return undefined;
      }
      return pages.length + 1;
    },
  });

  const handleSearch = debounce((searchValue) => {
    setFilterConfig({ ...filterConfig, search: searchValue });
  }, debounceTime);

  return {
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
  };
};

export default useLocationAPI;
