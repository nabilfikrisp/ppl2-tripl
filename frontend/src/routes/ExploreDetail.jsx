import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

const ExploreDetail = () => {
  const params = useParams();
  const locationId = params.id;
  console.log(locationId, "ID");
  return (
    <Box w="full" pb="50px">
      <Image src="/location-detail-img-example.png" mb="50px" />
      <Flex flexDir="column" gap="50px" px="150px">
        <Text
          fontSize="48px"
          textAlign="center"
          fontWeight="bold"
          maxW="700px"
          mx="auto"
        >
          Pulau Padar - Padar Island, Nusa Tenggara Timur
        </Text>
        <Box>
          <Text fontSize="24px" fontWeight="bold" mb="20px">
            Tentang
          </Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in
            massa neque. Fusce vel arcu a justo dignissim fringilla in sit amet
            justo. Vestibulum ante ipsum primis in faucibus orci luctus et
            ultrices posuere cubilia Curae; Suspendisse potenti. Curabitur
            gravida, sapien ac eleifend tincidunt, nunc felis sodales purus, vel
            scelerisque justo lectus a odio. Nulla facilisi. Pellentesque nec
            urna nisl. Sed quis eleifend velit. Donec ut justo eget libero
            malesuada bibendum. Integer euismod ut metus in eleifend. Nunc
            euismod dui ac suscipit elementum. Vestibulum euismod, odio a
            dignissim semper, massa ligula facilisis sapien, non bibendum ligula
            libero et nunc. Integer vulputate, orci eget vehicula facilisis,
            lorem leo viverra justo, vel placerat odio est at tortor. Phasellus
            euismod dolor ut tellus fringilla, ut euismod felis laoreet.
            Curabitur ullamcorper metus ac neque tincidunt, vel sodales lectus
            facilisis.
          </Text>
        </Box>
        <Box>
          <Text fontSize="24px" fontWeight="bold" mb="20px">
            Alamat
          </Text>
          <Text>
            Komodo, Kec. Komodo, Kabupaten Manggarai Barat, Nusa Tenggara Tim.
          </Text>
        </Box>
        <Flex gap="20px" alignItems="center" mb="20px">
          <Text fontSize="24px" fontWeight="bold">
            Rating
          </Text>
          <Flex gap="10px">
            {[0, 1, 2, 3, 4].map((data) => (
              <AiFillStar size="24px" key={data} />
            ))}
          </Flex>
        </Flex>
        <Box w="full">
          <Text fontSize="24px" fontWeight="bold" mb="20px">
            Telusuri Maps
          </Text>
          <Image src="/location-detail-map-example.jpg" w="full" />
        </Box>
      </Flex>
    </Box>
  );
};

export default ExploreDetail;
