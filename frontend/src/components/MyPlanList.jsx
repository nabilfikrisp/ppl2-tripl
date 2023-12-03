import { Flex } from "@chakra-ui/react";
import PlanCard from "./PlanCard";

const MyPlanList = ({ data }) => {
  if (data.length === 0)
    return <Flex justifyContent="center">You have no plan yet!</Flex>;
  return (
    <Flex
      justifyContent="center"
      flexDir="column"
      alignItems="center"
      gap={{ base: "20px", md: "50px" }}
    >
      {data.map((plan, idx) => (
        <PlanCard key={idx} data={plan} />
      ))}
    </Flex>
  );
};

export default MyPlanList;
