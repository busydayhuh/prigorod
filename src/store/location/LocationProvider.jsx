import { useEffect, useState } from "react";
import { LocationContext } from "./Context";

function LocationProvider({ children }) {
  const [userPosition, setUserPosition] = useState({
    locationAllowed: false,
    coords: null,
    locationDeclined: false,
  });

  const [isLocationRequested, setIsLocationRequested] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (isLocationRequested) {
      setFetching(true);

      const success = (position) => {
        setUserPosition({
          locationAllowed: true,
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          locationDeclined: false,
        });
        setFetching(false);
      };

      const error = () => {
        setUserPosition({
          locationAllowed: false,
          coords: null,
          locationDeclined: true,
        });
        setFetching(false);
      };

      const watcher = navigator.geolocation.watchPosition(success, error);

      return () => {
        navigator.geolocation.clearWatch(watcher);
      };
    }

    return;
  }, [isLocationRequested]);

  return (
    <LocationContext.Provider
      value={{
        userPosition,
        isLocationRequested,
        setIsLocationRequested,
        fetching,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export default LocationProvider;
