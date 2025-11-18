import voyagers from "@/data/test-locations.json";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useColorMode } from "@/components/ui/color-mode";
import Chingu from "@/assets/chingu.png";

export default function LeafletMap() {
  const { colorMode } = useColorMode();
  const mapRef = useRef<L.Map | null>(null);
  const clusterRef = useRef<any>(null);

  const tileUrl =
    colorMode === "dark"
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  const SingleMarkerIcon = L.icon({
    iconUrl: Chingu,
    iconSize: [30, 30],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    const clusterGroup = L.markerClusterGroup({
      iconCreateFunction: (cluster: any) => {
        const count = cluster.getChildCount();

        return L.divIcon({
          html: `<div class="cluster-bubble">${count}</div>`,
          className: "my-cluster",
          iconSize: L.point(45, 45),
        });
      },
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
    });

    voyagers.forEach((v) => {
      const marker = L.marker([Number(v.latitude), Number(v.longitude)], {
        icon: SingleMarkerIcon,
      });

      (marker as any).voyagerId = v.id;

      marker.on("click", () => {
        alert("Voyager ID: " + marker.voyagerId);
      });

      clusterGroup.addLayer(marker);
    });

    clusterRef.current = clusterGroup;
    map.addLayer(clusterGroup);

    return () => {
      map.removeLayer(clusterGroup);
    };
  }, [mapRef.current]); // ONLY RUNS WHEN MAP EXISTS

  return (
    <MapContainer
      center={[9.082, 8.6753]}
      zoom={5}
      minZoom={1}
      maxZoom={20}
      scrollWheelZoom={true}
      doubleClickZoom={false}
      style={{ height: "100%", width: "100%" }}
      whenReady={(event: any) => {
        mapRef.current = event.target;
      }}
    >
      <TileLayer url={tileUrl} />
    </MapContainer>
  );
}
