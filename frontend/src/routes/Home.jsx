import React from "react";
import BrandingSection from "../components/landing-page/BrandingSection";
import { Box } from "@chakra-ui/react";
import ExploreSection from "../components/landing-page/ExploreSection";
import PlannerSection from "../components/landing-page/PlannerSection";
import FeatureSection from "../components/landing-page/FeatureSection";

const Home = () => {
  return (
    <Box width="full">
      <BrandingSection />
      <ExploreSection />
      <PlannerSection />
      <FeatureSection />
    </Box>
  );
};

export default Home;
