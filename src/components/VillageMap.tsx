import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { villages } from "@/data/mockData";

const VillageMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [22.5, 80],
      zoom: 5,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
    }).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    const verifiedIcon = L.divIcon({
      className: "custom-marker",
      html: `<div style="
        width: 32px; height: 32px; 
        background: hsl(145, 45%, 28%); 
        border: 3px solid white; 
        border-radius: 50%; 
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex; align-items: center; justify-content: center;
        color: white; font-size: 14px; font-weight: bold;
      ">✓</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    villages.forEach((v) => {
      const marker = L.marker([v.lat, v.lng], { icon: verifiedIcon }).addTo(map);
      marker.bindPopup(`
        <div style="min-width: 160px; font-family: 'DM Sans', sans-serif;">
          <h3 style="font-size: 14px; font-weight: 700; margin: 0 0 4px;">${v.name}</h3>
          <p style="font-size: 11px; color: #666; margin: 0 0 6px;">${v.region}</p>
          <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 6px;">
            <span style="font-size: 12px;">⭐ ${v.rating}</span>
            <span style="font-size: 11px; color: #888;">(${v.reviews} reviews)</span>
          </div>
          <p style="font-size: 12px; font-weight: 600; color: hsl(145, 45%, 28%); margin: 0 0 8px;">From ₹${v.startingPrice.toLocaleString("en-IN")}</p>
          <div style="display: flex; align-items: center; gap: 4px; font-size: 10px; color: hsl(145, 45%, 28%);">
            <span>🛡️ Verified Village</span>
          </div>
        </div>
      `);
      marker.on("click", () => {
        marker.openPopup();
      });
      marker.on("popupopen", () => {
        const popupEl = marker.getPopup()?.getElement();
        if (popupEl) {
          popupEl.style.cursor = "pointer";
          popupEl.addEventListener("click", () => navigate(`/village/${v.id}`));
        }
      });
    });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [navigate]);

  return (
    <div className="relative rounded-2xl overflow-hidden mb-5 h-56 border border-border">
      <div ref={mapRef} className="w-full h-full z-0" />
      <div className="absolute top-3 left-3 z-[1000] trust-badge-solid pointer-events-none">
        <span>All villages verified ✓</span>
      </div>
    </div>
  );
};

export default VillageMap;
