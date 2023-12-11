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

  const reset = () => {
    setLocations([]);
  };

  const getLastTime = () => {
    const lastTime = locations[locations.length - 1]?.timeRange || "00:00"; // Default to "00:00" if locations is empty
    const [, endTime] = lastTime.split(" - ");
    const numericHour = parseInt(endTime.split(":")[0], 10);
    return numericHour;
  };

  return {
    locations,
    setLocations,
    addNewLocation,
    deleteLocationById,
    reset,
    getLastTime,
  };
};
