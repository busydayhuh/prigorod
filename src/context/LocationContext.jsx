/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";

const LocationContext = createContext();

export function useLocation() {
  return useContext(LocationContext);
}

function LocationProvider({ children }) {
  let [userPosition, setUserPosition] = useState({
    geoAllowed: false,
    coords: null,
  });

  useEffect(() => {
    const defaultPosition = {
      latitude: 55.7522,
      longitude: 37.6156,
    };

    const success = (position) => {
      setUserPosition({
        geoAllowed: true,
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      });
    };

    const error = () => {
      setUserPosition({
        geoAllowed: false,
        coords: defaultPosition,
      });
    };

    const watcher = navigator.geolocation.watchPosition(success, error);

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
