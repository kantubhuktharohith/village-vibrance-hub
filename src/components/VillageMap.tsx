import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { villages } from "@/data/mockData";
import { supabase } from "@/integrations/supabase/client";

interface TouristPlace {
  id: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  starting_price: number;
  verified: boolean;
}

const VillageMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const navigate = useNavigate();
  const [dbPlaces, setDbPlaces] = useState<TouristPlace[]>([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const { data } = await supabase
        .from("tourist_places")
        .select("id, name, region, lat, lng, starting_price, verified")
        .eq("verified", true);
      if (data) setDbPlaces(data as TouristPlace[]);
    };
    fetchPlaces();
  }, []);

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

    // Current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const currentIcon = L.divIcon({
            className: "custom-marker",
            html: `<div style="
              width: 16px; height: 16px;
              background: hsl(210, 100%, 50%);
              border: 3px solid white;
              border-radius: 50%;
              box-shadow: 0 0 10px rgba(59,130,246,0.5);
            "></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8],
          });
          L.marker([latitude, longitude], { icon: currentIcon })
            .addTo(map)
            .bindPopup("You are here");
        },
        () => {},
        { enableHighAccuracy: false, timeout: 5000 }
      );
    }

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

    const dbIcon = L.divIcon({
      className: "custom-marker",
      html: `<div style="
        width: 32px; height: 32px;
        background: hsl(25, 90%, 50%);
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex; align-items: center; justify-content: center;
        color: white; font-size: 14px; font-weight: bold;
      ">★</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    // Mock villages
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
      marker.on("click", () => marker.openPopup());
      marker.on("popupopen", () => {
        const popupEl = marker.getPopup()?.getElement();
        if (popupEl) {
          popupEl.style.cursor = "pointer";
          popupEl.addEventListener("click", () => navigate(`/village/${v.id}`));
        }
      });
    });

    // DB tourist places
    dbPlaces.forEach((p) => {
      if (p.lat === 0 && p.lng === 0) return;
      const marker = L.marker([p.lat, p.lng], { icon: dbIcon }).addTo(map);
      marker.bindPopup(`
        <div style="min-width: 160px; font-family: 'DM Sans', sans-serif;">
          <h3 style="font-size: 14px; font-weight: 700; margin: 0 0 4px;">${p.name}</h3>
          <p style="font-size: 11px; color: #666; margin: 0 0 6px;">${p.region}</p>
          <p style="font-size: 12px; font-weight: 600; color: hsl(25, 90%, 50%); margin: 0 0 8px;">From ₹${p.starting_price.toLocaleString("en-IN")}</p>
          <div style="display: flex; align-items: center; gap: 4px; font-size: 10px; color: hsl(145, 45%, 28%);">
            <span>🛡️ Verified Destination</span>
          </div>
        </div>
      `);
      marker.on("click", () => marker.openPopup());
      marker.on("popupopen", () => {
        const popupEl = marker.getPopup()?.getElement();
        if (popupEl) {
          popupEl.style.cursor = "pointer";
          popupEl.addEventListener("click", () => navigate(`/place/${p.id}`));
        }
      });
    });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [navigate, dbPlaces]);

  return (
    <div className="relative rounded-2xl overflow-hidden mb-5 h-56 border border-border">
      <div ref={mapRef} className="w-full h-full z-0" />
      <div className="absolute top-3 left-3 z-[1000] trust-badge-solid pointer-events-none">
        <span>All places verified ✓</span>
      </div>
    </div>
  );
};

export default VillageMap;
