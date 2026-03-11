import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom modern SVG marker icon
const customMarkerHtml = `
  <div class="relative flex items-center justify-center">
    <div class="absolute w-8 h-8 bg-blue-500/20 rounded-full animate-ping"></div>
    <div class="relative w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-md flex items-center justify-center">
      <div class="w-2 h-2 bg-white rounded-full"></div>
    </div>
    <div class="absolute -bottom-1 w-1 h-1 bg-blue-600 rounded-full blur-[1px]"></div>
  </div>
`;

const customIcon = L.divIcon({
  html: customMarkerHtml,
  className: 'custom-div-icon',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const MapPage: React.FC = () => {
  const position: [number, number] = [31.2304, 121.4737]; // Shanghai coordinates

  return (
    <div className="flex-1 relative w-full h-full overflow-hidden">
      <MapContainer 
        center={position} 
        zoom={13} 
        scrollWheelZoom={true}
        zoomControl={false} // Disable default zoom control to place it customly
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <ZoomControl position="bottomleft" />
        
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="标准地图">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="卫星地图">
            <TileLayer
              attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        <Marker position={position} icon={customIcon}>
          <Popup>
            当前位置：上海市中心
          </Popup>
        </Marker>
      </MapContainer>

      {/* Floating UI elements on top of the map */}
      <div className="absolute top-4 left-4 right-4 z-[1000] flex flex-col gap-3 pointer-events-none">
      </div>

      <div className="absolute bottom-[10px] right-[10px] z-[1000] pointer-events-auto">
        <button className="w-[34px] h-[34px] bg-blue-600 rounded-[8px] flex items-center justify-center text-white hover:bg-blue-700 transition-colors border border-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        </button>
      </div>
    </div>
  );
};

export default MapPage;
