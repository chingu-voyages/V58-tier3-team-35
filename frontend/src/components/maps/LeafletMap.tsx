import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useColorMode } from "@/components/ui/color-mode";
import Chingu from "@/assets/chingu.png";
import type Voyager from "@/types/voyager";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import VoyagerProfile from "../VoyagerProfile";
import useVoyagerDetails from "@/api/hooks/useVoyagerDetails";
import { toast } from "sonner";
import { Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const SingleMarkerIcon = L.icon({
  iconUrl: Chingu,
  iconSize: [30, 30],
  iconAnchor: [20, 40],
});

function MapController({ onMapReady }: { onMapReady: (map: L.Map) => void }) {
  const map = useMap();
  useEffect(() => {
    onMapReady(map);
  }, [map, onMapReady]);
  return null;
}

export default function LeafletMap({
  data,
  loading = false,
}: {
  data: Voyager[];
  loading: boolean;
}) {
  const { t } = useTranslation();
  const { colorMode } = useColorMode();
  const mapRef = useRef<L.Map | null>(null);
  const clusterRef = useRef<L.MarkerClusterGroup | null>(null);

  const [mapReady, setMapReady] = useState(false);
  const [voyagerId, setVoyagerId] = useState<string | null>(null);
  const [showVoyagerModal, setShowVoyagerModal] = useState<boolean>(false);

  const {
    data: voyagerData,
    isLoading: voyagerLoading,
    isError,
    error,
  } = useVoyagerDetails(voyagerId);

  const tileUrl =
    colorMode === "dark"
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  //Handle eRror
  useEffect(() => {
    if (isError && error) {
      toast.error(error.message);
    }
  }, [isError, error]);

  // Initialize Cluster Group Once
  useEffect(() => {
    if (!mapReady || !mapRef.current || clusterRef.current) return;

    const map = mapRef.current;

    const clusterGroup = L.markerClusterGroup({
      iconCreateFunction: (cluster: any) =>
        L.divIcon({
          html: `<div class="cluster-bubble">${cluster.getChildCount()}</div>`,
          className: "my-cluster",
          iconSize: L.point(45, 45),
        }),
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
    });

    clusterRef.current = clusterGroup;
    map.addLayer(clusterGroup);

    return () => {
      if (map && clusterGroup) {
        map.removeLayer(clusterGroup);
      }
    };
  }, [mapReady]);

  // Update Markers when Data Changes
  useEffect(() => {
    if (!clusterRef.current || !mapRef.current) return;

    const clusterGroup = clusterRef.current;
    const map = mapRef.current;

    clusterGroup.clearLayers();

    const markers = data
      .filter((v) => v.lat && v.lng)
      .map((v) => {
        const marker = L.marker([Number(v.lat), Number(v.lng)], {
          icon: SingleMarkerIcon,
        });
        marker.on("click", () => {
          setVoyagerId(v._id);
          setShowVoyagerModal(true);
        });
        return marker;
      });

    clusterGroup.addLayers(markers);
  }, [data, mapReady]);

  return (
    <>
      {loading && <Loading fullscreen text={t("mapLoading")} />}
      <MapContainer
        center={[9.082, 8.6753]}
        zoom={5}
        minZoom={1}
        maxZoom={20}
        scrollWheelZoom={true}
        doubleClickZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url={tileUrl} />
        <MapController
          onMapReady={(map) => {
            mapRef.current = map;
            setMapReady(true);
          }}
        />
      </MapContainer>
      <Modal
        isOpen={showVoyagerModal}
        onClose={() => setShowVoyagerModal(false)}
      >
        {!voyagerData && voyagerLoading && (
          <Box p={4}>
            <Loading fullscreen text="Loading Voyager Data" />
          </Box>
        )}
        {voyagerData && !voyagerLoading && (
          <VoyagerProfile data={voyagerData.data} />
        )}
      </Modal>
    </>
  );
}
