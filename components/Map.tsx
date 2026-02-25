"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Gem as GemData } from "../lib/data";
import { renderToStaticMarkup } from "react-dom/server";
import { Gem as GemIcon } from "lucide-react";

if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

const createCustomIcon = () => {
  const iconMarkup = renderToStaticMarkup(
    <div style={{
      backgroundColor: '#f46b6b',
      color: 'white',
      borderRadius: '50%',
      padding: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      width: '36px',
      height: '36px'
    }}>
      <GemIcon size={20} />
    </div>
  );

  return L.divIcon({
    html: iconMarkup,
    className: 'custom-leaflet-icon bg-transparent border-none',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
  });
};

function MapUpdater({ selectedGemId, gems, mapCenter }: { selectedGemId: string | null, gems: GemData[], mapCenter: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    if (selectedGemId) {
      const selected = gems.find(g => g.id === selectedGemId);
      if (selected && selected.coordinates) {
        map.flyTo(selected.coordinates, 10, {
          duration: 1.5
        });
      }
    } else {
      map.flyTo(mapCenter, 6, {
        duration: 1.5
      });
    }
  }, [selectedGemId, gems, map, mapCenter]);

  return null;
}

interface MapProps {
  gems: GemData[];
  selectedGemId: string | null;
  onMarkerClick: (id: string) => void;
}

export default function Map({ gems, selectedGemId, onMarkerClick }: MapProps) {
  const [icon, setIcon] = useState<L.DivIcon | null>(null);

  useEffect(() => {
    setIcon(createCustomIcon());
  }, []);

  if (!icon) return null;

  const defaultCenter: [number, number] = [-33.9, 19.5];

  return (
    <div className="h-full w-full rounded-[24px] overflow-hidden relative shadow-sm border border-black/5 z-0">
      <MapContainer 
        center={defaultCenter} 
        zoom={6} 
        scrollWheelZoom={true} 
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <MapUpdater selectedGemId={selectedGemId} gems={gems} mapCenter={defaultCenter} />
        {gems.map((gem) => {
          if (!gem.coordinates) return null;
          return (
            <Marker 
              key={gem.id} 
              position={gem.coordinates} 
              icon={icon}
              eventHandlers={{
                click: () => onMarkerClick(gem.id)
              }}
            >
              <Popup className="rounded-xl overflow-hidden custom-popup">
                <style>{`
                  .leaflet-popup-content-wrapper {
                    border-radius: 12px;
                    padding: 0px;
                  }
                  .leaflet-popup-content {
                    margin: 12px 16px;
                    line-height: 1.4;
                  }
                `}</style>
                <div className="flex flex-col gap-1">
                  <span className="font-serif text-lg font-bold leading-none text-[#3f1d14]">{gem.title}</span>
                  <span className="font-sans text-[10px] tracking-widest uppercase text-[#3f1d14]/60">{gem.category}</span>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
