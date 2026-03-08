import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface LocationPickerProps {
  lat: number;
  lng: number;
  onLocationChange: (lat: number, lng: number) => void;
}

const LocationPicker = ({ lat, lng, onLocationChange }: LocationPickerProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (mapInstance.current) {
      mapInstance.current.remove();
      mapInstance.current = null;
    }

    const center: [number, number] = lat && lng ? [lat, lng] : [20.5937, 78.9629];
    const zoom = lat && lng ? 10 : 5;

    const map = L.map(mapRef.current, {
      center,
      zoom,
      zoomControl: true,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
    }).addTo(map);

    const pinIcon = L.divIcon({
      className: "custom-marker",
      html: `<div style="
        width: 28px; height: 28px;
        background: hsl(0, 85%, 55%);
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex; align-items: center; justify-content: center;
        color: white; font-size: 12px; font-weight: bold;
      ">📍</div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    if (lat && lng) {
      markerRef.current = L.marker([lat, lng], { icon: pinIcon }).addTo(map);
    }

    map.on("click", (e: L.LeafletMouseEvent) => {
      const { lat: newLat, lng: newLng } = e.latlng;
      if (markerRef.current) {
        markerRef.current.setLatLng([newLat, newLng]);
      } else {
        markerRef.current = L.marker([newLat, newLng], { icon: pinIcon }).addTo(map);
      }
      onLocationChange(
        parseFloat(newLat.toFixed(5)),
        parseFloat(newLng.toFixed(5))
      );
    });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
    // Only re-init on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">Click on the map to set location</p>
      <div ref={mapRef} className="w-full h-48 rounded-xl border border-border z-0" />
    </div>
  );
};

export default LocationPicker;
