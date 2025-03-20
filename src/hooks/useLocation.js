import { useEffect, useCallback, useState } from "react";

export default function useLocation() {
  const defaultPosition = {
    latitude: 55.7522,
    longitude: 37.6156,
  };

  let [userPosition, setUserPosition] = useState({
    geoAllowed: false,
    coords: defaultPosition,
  });

  const success = useCallback((position) => {
    setUserPosition({
      geoAllowed: true,
      coords: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
    });
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, [success]);

  return userPosition;
}
