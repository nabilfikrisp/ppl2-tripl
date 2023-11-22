import { Box, Text } from "@chakra-ui/react";
import React from "react";

const FilterLabel = ({ isActive, onClick, children }) => {
  return (
    <Box
      w={{ base: "45%", md: "full" }}
      flexGrow="1"
      py="10px"
      bgColor={isActive ? "tripl-new.orange" : "tripl-new.gray-100"}
      borderRadius="full"
      color={isActive ? "tripl-new.light" : "tripl-new.black"}
      cursor="pointer"
      onClick={onClick}
    >
      <Text textAlign="center">{children}</Text>
    </Box>
  );
};

export default FilterLabel;
