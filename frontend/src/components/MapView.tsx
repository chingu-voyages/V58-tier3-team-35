import {
  GoogleMap,
  useJsApiLoader,
  useLoadScript,
} from "@react-google-maps/api";
import { useEffect, useMemo, useRef } from "react";
import darkStyle from "@/data/map-dark.json";
import lightStyle from "@/data/map-light.json";
import { useColorMode } from "./ui/color-mode";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function MapView() {
  const { colorMode } = useColorMode();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY!,
  });

  const center = { lat: 9.082, lng: 8.6753 };

  const options = {
    styles: colorMode === "light" ? lightStyle : darkStyle,
    disableDefaultUI: true,
    zoomControl: true,
    gestureHandling: "greedy",
    minZoom: 3,
    maxZoom: 20,
  };

  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setOptions({
        styles: colorMode === "dark" ? darkStyle : lightStyle,
      });
    }
  }, [colorMode]);

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
      options={options}
    ></GoogleMap>
  );
}
