"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Gem as GemData, getYoutubeThumbnail, getYoutubeId } from "../lib/data";
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

const createCustomIcon = (color: string) => {
  const iconMarkup = renderToStaticMarkup(
    <div style={{
      backgroundColor: color,
      color: 'white',
      borderRadius: '50%',
      padding: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: `0 4px 16px ${color}66`,
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
    popupAnchor: [0, -24],
  });
};

/** Global styles injected once for all Leaflet popups */
const POPUP_STYLES = `
  .nomad-popup .leaflet-popup-content-wrapper {
    background: #FAF9F6;
    border: 1px solid rgba(244,107,107,0.18);
    border-radius: 16px;
    padding: 0;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(63,29,20,0.14), 0 2px 8px rgba(63,29,20,0.08);
  }
  .nomad-popup .leaflet-popup-content {
    margin: 0;
    line-height: 1;
    width: auto !important;
  }
  .nomad-popup .leaflet-popup-tip {
    background: #FAF9F6;
    box-shadow: none;
    border: none;
  }
  .nomad-popup .leaflet-popup-tip-container {
    margin-top: -1px;
  }
  .nomad-popup .leaflet-popup-close-button {
    color: #3f1d14 !important;
    font-size: 18px !important;
    top: 8px !important;
    right: 8px !important;
    width: 24px !important;
    height: 24px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(63,29,20,0.06) !important;
    transition: background 0.2s;
  }
  .nomad-popup .leaflet-popup-close-button:hover {
    background: rgba(244,107,107,0.12) !important;
    color: #f46b6b !important;
  }
`;

function MapUpdater({ selectedGemId, gems, mapCenter }: { selectedGemId: string | null, gems: GemData[], mapCenter: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    if (selectedGemId) {
      const selected = gems.find(g => g.id === selectedGemId);
      if (selected?.coordinates && selected.coordinates.every(n => !isNaN(n))) {
        map.flyTo(selected.coordinates, 10, {
          duration: 1.5
        });

        // Open popup for the selected gem
        map.eachLayer((layer: any) => {
          if (layer instanceof L.Marker && layer.options.alt === selectedGemId) {
            layer.openPopup();
          }
        });
      }
    } else if (mapCenter.every(n => !isNaN(n))) {
      map.flyTo(mapCenter, 6, {
        duration: 1.5
      });
      map.closePopup();
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
  const [stayIcon, setStayIcon]  = useState<L.DivIcon | null>(null);
  const [envIcon,  setEnvIcon]   = useState<L.DivIcon | null>(null);

  useEffect(() => {
    setStayIcon(createCustomIcon('#f46b6b'));   // coral red — stays
    setEnvIcon(createCustomIcon('#6bbfb8'));    // soft teal — environments
  }, []);

  if (!stayIcon || !envIcon) return null;

  const defaultCenter: [number, number] = [-33.9, 19.5];

  return (
    <div className="h-full w-full rounded-[24px] overflow-hidden relative shadow-sm border border-black/5 z-0">
      {/* Inject popup styles once */}
      <style>{POPUP_STYLES}</style>

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
              icon={gem.id.startsWith('e') ? envIcon : stayIcon}
              alt={gem.id}
              eventHandlers={{
                click: () => onMarkerClick(gem.id),
                mouseover: (e) => {
                  e.target.openPopup();
                }
              }}
            >
              <Popup className="nomad-popup" minWidth={220}>
                {/* Thumbnail */}
                <div style={{ width: 220, height: 130, position: 'relative', overflow: 'hidden', flexShrink: 0, backgroundColor: '#e5e7eb' }}>
                  {gem.src && !getYoutubeId(gem.src) ? (
                    <video
                      src={gem.src}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                      muted
                      playsInline
                      onLoadedMetadata={(e) => {
                        (e.target as HTMLVideoElement).currentTime = gem.thumbnailTime ?? 0.01;
                      }}
                    />
                  ) : (
                    <img
                      src={getYoutubeId(gem.src || "") ? getYoutubeThumbnail(gem.src!) : (gem.image || "")}
                      alt={gem.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                      loading="lazy"
                    />
                  )}
                  {/* Region / category badge */}
                  <div style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    background: 'rgba(250,249,246,0.92)',
                    backdropFilter: 'blur(6px)',
                    borderRadius: 999,
                    padding: '3px 10px',
                    border: '1px solid rgba(244,107,107,0.2)',
                  }}>
                    <span style={{
                      fontFamily: 'sans-serif',
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#f46b6b',
                    }}>
                      {gem.region ?? (gem.id.startsWith('e') ? 'Environment' : gem.category)}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: '12px 14px 14px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 17,
                    fontWeight: 500,
                    lineHeight: 1.2,
                    color: '#3f1d14',
                    letterSpacing: '-0.02em',
                  }}>
                    {gem.title}
                  </span>
                  <span style={{
                    fontFamily: 'sans-serif',
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(63,29,20,0.5)',
                  }}>
                    {gem.location}
                  </span>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
