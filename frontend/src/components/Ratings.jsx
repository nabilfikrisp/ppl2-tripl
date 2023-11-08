import { Flex } from "@chakra-ui/react";
import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";

function Ratings({ rating }) {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating - filledStars >= 0.1;

  return (
    <Flex color="tripl-new.orange">
      {[...Array(filledStars).keys()].map((index) => (
        <BsStarFill key={index} size="24px" />
      ))}
      {hasHalfStar && <BsStarHalf size="24px" />}
      {[...Array(5 - filledStars - (hasHalfStar ? 1 : 0)).keys()].map(
        (index) => (
          <BsStar key={index} size="24px" />
        )
      )}
    </Flex>
  );
}

export default Ratings;
