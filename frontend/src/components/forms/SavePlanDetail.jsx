import { Box } from "@chakra-ui/react";
import React from "react";
import { useLocation, Navigate } from "react-router-dom";

const SavePlanDetail = () => {
  const location = useLocation();

  if (location.state === null) {
    return <Navigate to="/planner" />;
  }

  console.log(location.state.data, "ASJDHASKD");

  return <Box>SavePlanDetail</Box>;
};

export default SavePlanDetail;
