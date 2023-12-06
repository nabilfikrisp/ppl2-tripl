import {
  Box,
  Flex,
  Image,
  Link as ChakraLink,
  Text,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BASE_ENDPOINT } from "../api";
import axios from "axios";
import Unknown404 from "../components/404";
import Ratings from "../components/Ratings";
import { capitalize } from "lodash";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const ExploreDetail = () => {
  const params = useParams();
  const locationId = params.id;

  const fetchDetail = async (id) => {
    try {
      const response = await axios.get(`${BASE_ENDPOINT}/locations/${id}`);
      if (response.status !== 200) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.data;
    } catch (error) {
      return null;
    }
  };
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["locationsDetail", locationId],
    queryFn: () => fetchDetail(locationId),
  });

  return (
    <>
      {isLoading && (
        <Flex
          fontSize="5xl"
          h="60vh"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
        >
          Loading...
        </Flex>
      )}
      {isError && <Box>Error: {error}</Box>}
      {data && (
        <Box w="full" pb="50px">
          <Flex
            mb="20px"
            w="full"
            h={{ base: "fit-content", md: "77vh" }}
            justifyContent="center"
            bg="tripl-new.orange"
          >
            <Image
              src={data.photo}
              h={{ base: "fit-content", md: "full" }}
              fallbackSrc="/img_fallback.webp"
              fallbackStrategy="onError"
            />
          </Flex>
          <Flex
            flexDir="column"
            gap="50px"
            px={{ base: "10px", md: "50px", lg: "150px" }}
          >
            <Flex flexDir="column">
              <Text
                fontSize="48px"
                textAlign="start"
                fontWeight="bold"
                maxW="700px"
              >
                {data.name}
              </Text>
              <Box
                borderRadius="50px"
                bgColor="tripl-new.orange"
                color="tripl-new.light"
                h="fit-content"
                px="10px"
                w="fit-content"
              >
                {capitalize(data.type)}
              </Box>
            </Flex>
            <Flex gap="20px" justifyContent="center" mb="20px" flexDir="column">
              <Text fontSize="24px" fontWeight="bold">
                Rating
              </Text>
              <Flex gap="20px" alignItems="center">
                <Text fontWeight="semibold" fontSize="xl">
                  {data.rating}
                </Text>
                <Ratings rating={data.rating} />
              </Flex>
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
                as={ChakraLink}
                isExternal
                href={data.reviewsLink}
                w="fit-content"
              >
                Lihat di Google
              </Button>
            </Flex>
            <Box>
              <Flex gap="10px" alignItems="center" mb="20px">
                <Text fontSize="24px" fontWeight="bold">
                  Tentang
                </Text>
              </Flex>
              <Text>
                {data.description || "No Description about this place"}
              </Text>
            </Box>
            <Box>
              <Text fontSize="24px" fontWeight="bold" mb="20px">
                Alamat
              </Text>
              <Text>{data.address}</Text>
            </Box>
            <Box w="full">
              <Text fontSize="24px" fontWeight="bold" mb="20px">
                Telusuri Maps
              </Text>
              <Box
                height={{ base: "300px", sm: "450px", md: "600px" }}
                overflow="hidden"
                borderRadius="20px"
              >
                <MapContainer
                  center={{ lat: data.latitude, lng: data.longitude }}
                  zoom={20}
                  scrollWheelZoom={false}
                  style={{
                    height: "100%",
                    backgroundColor: "tripl-new.orange",
                  }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={{ lat: data.latitude, lng: data.longitude }}
                  >
                    <Popup>
                      <Text fontWeight="bold" fontSize="lg">
                        {data.name}
                      </Text>
                      <Button
                        bgColor="tripl-new.orange"
                        color="tripl-new.light"
                        transitionDuration="0.2s"
                        boxShadow="lg"
                        transitionTimingFunction="ease-in-out"
                        _hover={{
                          transitionDuration: "0.2s",
                          transitionTimingFunction: "ease-in-out",
                        }}
                        as={ChakraLink}
                        style={{ color: "#EAEAEA" }}
                        isExternal
                        href={data.placeLink}
                        w="fit-content"
                      >
                        Lihat di Google
                      </Button>
                    </Popup>
                  </Marker>
                </MapContainer>
              </Box>
            </Box>
            <Box>
              <Text fontSize="24px" fontWeight="bold" mb="20px">
                Kontak
              </Text>
              <Text>{data.phoneNumber}</Text>
            </Box>
          </Flex>
        </Box>
      )}
      {data === null && <Unknown404 />}
    </>
  );
};

export default ExploreDetail;
