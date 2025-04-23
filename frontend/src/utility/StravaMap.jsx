import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import polyline from "@mapbox/polyline";

export default function StravaMap({ mapPolyline }) {
  const path = polyline.decode(mapPolyline); // [[lat, lng], [lat, lng], ...]
  const center = path[Math.floor(path.length / 2)] || [0, 0]; // fallback if empty

  return (
    <MapContainer
      center={center}
      zoom={16}
      scrollWheelZoom={false}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={path} color="red" />
    </MapContainer>
  );
}
