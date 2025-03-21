/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";

const LocationContext = createContext();

export function useLocation() {
  return useContext(LocationContext);
}

function LocationProvider({ children }) {
  const defaultPosition = {
    latitude: 55.7522,
    longitude: 37.6156,
  };

  let [userPosition, setUserPosition] = useState({
    geoAllowed: false,
    coords: defaultPosition,
  });

  useEffect(() => {
    const success = (position) => {
      setUserPosition({
        geoAllowed: true,
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      });
    };

    const watcher = navigator.geolocation.watchPosition(success);

    return () => {
      navigator.geolocation.clearWatch(watcher);
    };
  }, []);

  return (
    <LocationContext.Provider value={userPosition}>
      {children}
    </LocationContext.Provider>
  );
}

export default LocationProvider;
