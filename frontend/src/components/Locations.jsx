import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import LocationCard from "./LocationCard";

const Locations = ({
  isLoading,
  isError,
  error,
  data,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}) => {
  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (isError) {
    return <Box>Error: {error}</Box>;
  }

  if (data && data.pages[0].length <= 0) {
    return <Text>Location not found</Text>;
  }

  return (
    <Flex
      justifyContent="center"
      flexDir="column"
      alignItems="center"
      gap="50px"
    >
      {data && (
        <Flex flexDir="column" justifyContent="center" gap="50px">
          {data.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.map((location, idx) => (
                <LocationCard location={location} key={idx} />
              ))}
            </React.Fragment>
          ))}
        </Flex>
      )}
      {hasNextPage && (
        <LoadMoreButton
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </Flex>
  );
};

const LoadMoreButton = ({ fetchNextPage, isFetchingNextPage }) => {
  return (
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
  );
};

export default Locations;
