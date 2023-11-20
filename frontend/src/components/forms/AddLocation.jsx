import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Flex,
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
import { SearchIcon } from "@chakra-ui/icons";
import { ELocationType } from "../../utils/helpers/location.helper";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import MyButton from "../MyButton";
import { usePlanLocations } from "../../hooks/usePlanLocations";
import { useModal } from "../../context/ModalContext";
import { useTimeRange } from "../../hooks/useTimeRange";
import { Icon } from "leaflet";
import LocationsOnPlanner from "../LocationsOnPlanner";
import useLocationAPI from "../../hooks/useLocationAPI";
import { AiFillStar } from "react-icons/ai";

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
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            {location.name}
          </Text>
          <Text>{location.address || "No address about this place"}</Text>
          <Flex gap="10px" alignItems="center">
            <Flex color="tripl-new.orange" alignItems="center" gap="4px">
              <AiFillStar />
              <Text fontSize="sm" fontWeight="bold">
                {location.rating}
              </Text>
            </Flex>
            <Text fontSize="sm" fontWeight="medium" color="gray.500">
              {location.reviewCount} reviews
            </Text>
          </Flex>
          <MyButton
            onClick={() => {
              openTimeRangeModal();
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
        </Box>
      </Popup>
    </Marker>
  );
};

const AddLocation = () => {
  const BANDUNG_CENTER_COORDS = {
    lat: -6.905977,
    lng: 107.613144,
  };

  const [mapCenter, setMapCenter] = useState(BANDUNG_CENTER_COORDS);
  const [selectedLocationId, setSelectedLocationId] = useState();

  const {
    filterConfig,
    setFilterConfig,
    data,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    error,
    handleSearch,
  } = useLocationAPI({ mostViewed: true, pageSize: 50, debounceTime: 400 });

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
            <LocationsOnPlanner
              isError={isError}
              error={error}
              isLoading={isLoading}
              data={data}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              setMapCenter={setMapCenter}
              setSelectedLocationId={setSelectedLocationId}
            />
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
              data.pages.map((page, pageIndex) => (
                <React.Fragment key={pageIndex}>
                  {page.map((location, index) => (
                    <MyMarker
                      location={location}
                      key={index}
                      selected={location.id === selectedLocationId}
                    />
                  ))}
                </React.Fragment>
              ))}
            <SetViewOnClick coords={mapCenter} />
          </MapContainer>
        </Box>
      </Flex>
    </Flex>
  );
};

export default AddLocation;
