import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

interface MapPoint {
  id: string;
  nome: string;
  endereco: {
    logradouro: string;
    bairro: string;
  };
  coordenadas?: {
    latitude: number;
    longitude: number;
  };
  tiposMaterial: string[];
}

interface MapProps {
  collectionPoints?: MapPoint[];
  center?: [number, number];
  zoom?: number;
}

const Map: React.FC<MapProps> = ({ 
  collectionPoints = [], 
  center = [-23.5505, -46.6333],
  zoom = 10 
}) => {
  // Criar o ícone customizado fora do render
  const customIcon = L.divIcon({
    html: '<div style="background-color: #22c55e; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
    className: 'custom-marker',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

export default Map;