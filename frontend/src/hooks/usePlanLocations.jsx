import { useContext } from "react";
import { LocationsContext } from "../context/LocationsContext";

export const usePlanLocations = () => {
  const { locations, setLocations } = useContext(LocationsContext);

  const addNewLocation = (newLocation) => {
    setLocations([...locations, newLocation]);
  };

  return { locations, setLocations, addNewLocation };
};
