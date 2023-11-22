import React, { createContext, useState } from "react";

export const LocationsContext = createContext(null);

export const LocationsContextProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);

  return (
    <LocationsContext.Provider value={{ locations, setLocations }}>
      {children}
    </LocationsContext.Provider>
  );
};
