import { Box, Divider, Flex } from "@chakra-ui/react";
import React from "react";

const PlanStepper = ({ index, arrLen }) => {
  return (
    <Flex flexDir="column" justifyContent="center" alignItems="center">
      <Box flexGrow="1">
        {index !== 0 && (
          <Divider
            orientation="vertical"
            border="4px solid"
            borderColor="tripl-new.orange"
            opacity="100%"
            h="full"
          />
        )}
      </Box>
      <Box
        bgColor="tripl-new.orange"
        w="35px"
        h="35px"
        borderRadius="full"
        transform="scale(1.1)"
      />
      <Box flexGrow="1">
        {index !== arrLen - 1 && (
          <Divider
            orientation="vertical"
            border="4px solid"
            borderColor="tripl-new.orange"
            opacity="100%"
          />
        )}
      </Box>
    </Flex>
  );
};

export default PlanStepper;
