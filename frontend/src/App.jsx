import React from "react";
import { Box } from "@chakra-ui/react";
import BrandingSection from "./components/landing-page/BrandingSection";
import ExploreSection from "./components/landing-page/ExploreSection";
import PlannerSection from "./components/landing-page/PlannerSection";

function App() {
  return (
    <Box width="full">
      <BrandingSection />
      <ExploreSection />
      <PlannerSection />
    </Box>
  );
}

export default App;
