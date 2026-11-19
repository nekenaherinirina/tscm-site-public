import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

// Correction des icônes Leaflet par défaut
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Position de TSCM Antsirabe
const TSCM_POSITION = [-19.8659, 47.0333];

// Fonction pour recentrer la carte
function RecenterMap({ position }) {
  const map = useMap();
  if (position) {
    map.setView(position, 10);
  }
  return null;
}

function Map() {
  const [userPosition, setUserPosition] = useState(null);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Calcul distance (formule Haversine)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Demander la position
  const handleGetPosition = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('La géolocalisation n\'est pas supportée par votre navigateur');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = [position.coords.latitude, position.coords.longitude];
        setUserPosition(pos);

        const dist = calculateDistance(
          pos[0], pos[1],
          TSCM_POSITION[0], TSCM_POSITION[1]
        );
        setDistance(dist.toFixed(1));
        setLoading(false);
      },
      (err) => {
        setError('Impossible d\'obtenir votre position');
        setLoading(false);
      }
    );
  };

  return (
    <div className="map-container">
      <MapContainer
        center={TSCM_POSITION}
        zoom={7}
        className="leaflet-map"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marqueur TSCM */}
        <Marker position={TSCM_POSITION}>
          <Popup>
            <strong>TSCM Antsirabe</strong>
            <br />
            Siège de The Sunrise Centers Madagascar
          </Popup>
        </Marker>

        {/* Marqueur utilisateur */}
        {userPosition && (
          <>
            <Marker position={userPosition}>
              <Popup>
                <strong>Votre position</strong>
              </Popup>
            </Marker>

            {/* Ligne entre les deux */}
            <Polyline
              positions={[userPosition, TSCM_POSITION]}
              color="#f0b323"
              weight={3}
              dashArray="10, 10"
            />

            <RecenterMap position={userPosition} />
          </>
        )}
      </MapContainer>

      {/* Panneau d'infos */}
      <div className="map-controls">
        {distance && (
          <div className="map-distance">
            <span>📏 Distance : <strong>{distance} km</strong></span>
          </div>
        )}
        <button
          className="map-btn"
          onClick={handleGetPosition}
          disabled={loading}
        >
          {loading ? 'Recherche...' : '📍 Ma position'}
        </button>
        {error && <div className="map-error">{error}</div>}
      </div>
    </div>
  );
}

export default Map;
