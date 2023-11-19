import React, { useEffect, useRef, useState } from "react";
import { BASE_ENDPOINT } from "../../api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Box,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { debounce } from "lodash";
import { SearchIcon } from "@chakra-ui/icons";
import { ELocationType } from "../../utils/helpers/location.helper";
import { AiFillStar } from "react-icons/ai";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import MyButton from "../MyButton";
import { usePlanLocations } from "../../hooks/usePlanLocations";
import { useModal } from "../../context/ModalContext";
import { useTimeRange } from "../../hooks/useTimeRange";
import { Icon } from "leaflet";

const SetViewOnClick = ({ coords }) => {
  const map = useMap();
  map.closePopup();
  map.flyTo(coords);

  return null;
};

const MyMarker = ({ selected, location }) => {
  const ref = useRef(null);
  const { addNewLocation } = usePlanLocations();
  const { timeRange, renderTimeRange } = useTimeRange();
  const { isOpen, onOpen: openTimeRangeModal, onClose } = useDisclosure();
  const { hideModal } = useModal();

  const icons = {
    wisata: new Icon({
      iconUrl: "/wisata-icon.svg",
      iconSize: [35, 35],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
    }),
    hotel: new Icon({
      iconUrl: "/hotel-icon.svg",
      iconSize: [35, 35],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
    }),
    restoran: new Icon({
      iconUrl: "/restoran-icon.svg",
      iconSize: [35, 35],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
    }),
  };

  useEffect(() => {
    if (selected) {
      ref.current.openPopup();
    }
  });

  return (
    <Marker
      position={{ lat: location.latitude, lng: location.longitude }}
      ref={ref}
      icon={icons[location.type]}
    >
      <Popup>
        <Text fontWeight="bold" fontSize="lg">
          {location.name}
        </Text>
        <Text>{location.address || "No address about this place"}</Text>
        <MyButton
          onClick={() => {
            // addNewLocation(location);
            openTimeRangeModal();
            // hideModal();
          }}
        >
          Add to Plan
        </MyButton>

        <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Tentukan Jam Rencanamu</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{renderTimeRange()}</ModalBody>

            <ModalFooter>
              <MyButton
                onClick={() => {
                  hideModal();
                  addNewLocation({ location, timeRange });
                }}
                isDisabled={!timeRange}
              >
                Add
              </MyButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Popup>
    </Marker>
  );
};

const AddLocation = () => {
  const BANDUNG_CENTER_COORDS = {
    lat: -6.905977,
    lng: 107.613144,
  };

  const [filterConfig, setFilterConfig] = useState({
    page: 1,
    pageSize: 50,
    type: undefined,
    search: undefined,
    mostViewed: true,
  });

  const [mapCenter, setMapCenter] = useState(BANDUNG_CENTER_COORDS);
  const [selectedLocationId, setSelectedLocationId] = useState();

  const fetchAllLocations = async () => {
    try {
      const response = await axios.get(`${BASE_ENDPOINT}/locations/`, {
        params: filterConfig,
      });
      if (response.status !== 200) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      console.log(response.data, "RESPONSE");
      return response.data;
    } catch (error) {
      return null;
    }
  };

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["planLocations", filterConfig],
    queryFn: () => fetchAllLocations(),
    keepPreviousData: true,
  });
  console.log(data, "DATA");
  const handleSearch = debounce((searchValue) => {
    setFilterConfig({ ...filterConfig, search: searchValue });
  }, 400);

  return (
    <Flex gap="10px" h="83vh">
      <Flex w="50%">
        <Flex
          width="full"
          flexDir="column"
          maxH="83vh"
          overflowY="scroll"
          py="10px"
        >
          <Flex
            justifyContent="center"
            flexDir="column"
            alignItems="center"
            px={{ base: "20px", md: "50px" }}
            gap="50px"
          >
            <Box w="full" maxW="1000px">
              <Flex w="full" gap="20px">
                <Input
                  placeholder="search for a place.."
                  bgColor="tripl-new.gray-100"
                  focusBorderColor="tripl-new.orange"
                  _placeholder={{
                    color: "tripl-new.gray-200",
                    opacity: "0.7",
                  }}
                  color="tripl-new.black"
                  height="60px"
                  borderRadius="100px"
                  px="30px"
                  onChange={(e) => handleSearch(e.target.value)}
                  onKeyDown={() => {
                    return;
                  }}
                />
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  bg="tripl-new.orange"
                  p="20px"
                  minW="60px"
                  borderRadius="full"
                  color="tripl-new.light"
                >
                  <SearchIcon />
                </Flex>
              </Flex>
              <Flex
                gap={{ base: "10px", xl: "20px" }}
                justifyContent={{ base: "start", md: "space-between" }}
                mt="30px"
                flexWrap={{ base: "wrap", md: "nowrap" }}
              >
                {[
                  { label: "Semua", value: undefined },
                  { label: "Wisata", value: ELocationType.WISATA },
                  { label: "Restoran", value: ELocationType.RESTORAN },
                  { label: "Penginapan", value: ELocationType.HOTEL },
                ].map((type, idx) => (
                  <Box
                    // minW={{ md: "150px", xl: "200px" }}
                    w={{ base: "45%", md: "full" }}
                    flexGrow="1"
                    py="10px"
                    bgColor={
                      filterConfig.type === type.value
                        ? "tripl-new.orange"
                        : "tripl-new.gray-100"
                    }
                    borderRadius="full"
                    color={
                      filterConfig.type === type.value
                        ? "tripl-new.light"
                        : "tripl-new.black"
                    }
                    key={idx}
                    cursor="pointer"
                    onClick={() => {
                      setFilterConfig({ ...filterConfig, type: type.value });
                    }}
                  >
                    <Text textAlign="center">{type.label}</Text>
                  </Box>
                ))}
              </Flex>
            </Box>
            {isLoading && <Box>Loading...</Box>}
            {isError && <Box>Error: {error}</Box>}
            {data && (
              <Flex flexDir="column" justifyContent="center" gap="50px">
                {data.map((location) => (
                  <Flex
                    // as={Link}
                    id="below"
                    key={location.placeId}
                    flexDir={{ base: "column", md: "row" }}
                    borderRadius="20px"
                    overflow="hidden"
                    height={{ base: "fit-content" }}
                    w="full"
                    // to={`${location.id}`}
                  >
                    <Box
                      minW="30%"
                      maxW={{ base: "full", md: "30%" }}
                      minH={{ base: "40%", md: "full" }}
                      h="200px"
                    >
                      <Image
                        src={location.photo}
                        height="full"
                        w="full"
                        fallbackSrc="/img_fallback.jpg"
                        fallbackStrategy="onError"
                        referrerPolicy="no-referrer"
                        objectFit="cover"
                      />
                    </Box>
                    <Flex
                      flexGrow="1"
                      color="tripl-new.black"
                      bgColor="tripl-new.cream"
                      px="30px"
                      flexDir="column"
                      gap="10px"
                      py="30px"
                    >
                      <Text
                        fontWeight="bold"
                        fontSize={{ base: "24px", md: "30px" }}
                        textOverflow="ellipsis"
                      >
                        {location.name}
                      </Text>
                      <Flex gap="10px" alignItems="center">
                        <Flex
                          color="tripl-new.orange"
                          alignItems="center"
                          gap="4px"
                        >
                          <AiFillStar />
                          <Text fontSize="sm" fontWeight="bold">
                            {location.rating}
                          </Text>
                        </Flex>
                        <Text
                          fontSize="sm"
                          fontWeight="medium"
                          color="gray.500"
                        >
                          {location.reviewCount} reviews
                        </Text>
                      </Flex>
                      <MyButton
                        onClick={() => {
                          setMapCenter({
                            lat: location.latitude,
                            lng: location.longitude,
                          });
                          setSelectedLocationId(location.id);
                        }}
                        mt={{ md: "20px" }}
                      >
                        Lihat di Map
                      </MyButton>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            )}
            {!data && !isLoading && <Text>Location Not Found</Text>}
          </Flex>
        </Flex>
      </Flex>
      <Flex w="50%">
        <Box overflow="hidden" w="full">
          <MapContainer
            center={mapCenter}
            zoom={15}
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
            {data &&
              data.map((location, index) => (
                <MyMarker
                  location={location}
                  key={index}
                  selected={location.id === selectedLocationId}
                />
              ))}
            <SetViewOnClick coords={mapCenter} />
          </MapContainer>
        </Box>
      </Flex>
    </Flex>
  );
};

export default AddLocation;
