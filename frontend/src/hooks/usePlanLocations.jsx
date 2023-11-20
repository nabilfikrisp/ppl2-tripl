import { useContext } from "react";
import { LocationsContext } from "../context/LocationsContext";

export const usePlanLocations = () => {
  const { locations, setLocations } = useContext(LocationsContext);

  const addNewLocation = (newLocation) => {
    setLocations([...locations, newLocation]);
  };

  const deleteLocationById = (locationId) => {
    const temp = locations.filter(
      (planLocation) => planLocation.location.id !== locationId
    );
    setLocations(temp);
  };

  return { locations, setLocations, addNewLocation, deleteLocationById };
};
