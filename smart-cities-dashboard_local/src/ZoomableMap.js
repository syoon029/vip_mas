import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const ZoomableMap = () => {
  const position = [41.3949, -73.4540]; 

  return (
    <MapContainer center={position} zoom={15} style={{ height: '650px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Georgia Tech - Atlanta, GA</Popup>
      </Marker>
    </MapContainer>
  );
};

export default ZoomableMap;
