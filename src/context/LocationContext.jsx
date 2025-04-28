/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const LocationContext = createContext();
const LocationRequestContext = createContext();
const LocationRequestUpdater = createContext();

export function useLocation() {
  return useContext(LocationContext);
}

export function useLocationRequest() {
  return useContext(LocationRequestContext);
}

export function useLocationRequestUpdater() {
  return useContext(LocationRequestUpdater);
}

function LocationProvider({ children }) {
  let [userPosition, setUserPosition] = useState({
    locationAllowed: false,
    coords: null,
    locationDeclined: false,
  });

  let [isLocationRequested, setIsLocationRequested] = useState(false);

  useEffect(() => {
    if (isLocationRequested) {
      const success = (position) => {
        setUserPosition({
          locationAllowed: true,
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          locationDeclined: false,
        });
      };

      const error = () => {
        setUserPosition({
          locationAllowed: false,
          coords: null,
          locationDeclined: true,
        });
      };

      const watcher = navigator.geolocation.watchPosition(success, error);

      return () => {
        navigator.geolocation.clearWatch(watcher);
      };
    }

    return;
  }, [isLocationRequested]);

  return (
    <LocationRequestContext.Provider value={isLocationRequested}>
      <LocationRequestUpdater.Provider value={setIsLocationRequested}>
        <LocationContext.Provider value={userPosition}>
          {children}
        </LocationContext.Provider>
      </LocationRequestUpdater.Provider>
    </LocationRequestContext.Provider>
  );
}

export default LocationProvider;
