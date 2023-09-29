import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import { associationById } from "../reducer/associationSlice"; // Assumendo che ci sia una funzione getAssociationById nel tuo associationSlice
import "../Style/maps.css";

const Maps = () => {
  const [marker, setMarker] = useState(null);

  const { singleAssociation } = useSelector((state) => state.associations); // Assumendo che tu abbia uno stato chiamato singleAssociation
  console.log("SINGLE ASSOCIATION", singleAssociation);

  useEffect(() => {
    if (singleAssociation) {
      getArrayCoordinatesFromAssociation(singleAssociation);
    }
  }, [singleAssociation]);

  const getArrayCoordinatesFromAssociation = async (association) => {
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${association.address}&lang=it&limit=1&type=street&format=json&apiKey=${process.env.REACT_APP_GEOCODING}`
      );
      const place = await response.json();

      const markerData = {
        lat: place.results[0].lat,
        lon: place.results[0].lon,
      };
      console.log(markerData);
      setMarker(markerData);
    } catch (error) {
      console.log(error);
    }
  };

  const markerIcon = new L.Icon({
    iconUrl: "path/to/icon.png",
    iconSize: [25, 41],
  });

  return (
    <div
      style={{
        height: "30rem",
        width: "30rem",
        position: "-webkit-sticky",
        top: "50px",
      }}
    >
      {marker && (
        <div>
          <p>Latitude: {marker.lat}</p>
          <p>Longitude: {marker.lon}</p>
        </div>
      )}
    </div>
  );
};

export default Maps;

/* import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import { getAssociations } from "../reducer/associationSlice";
import "../Style/maps.css";

const Maps = () => {
  const [markers, setMarkers] = useState([]);

  const { associationsArray } = useSelector((state) => state.associations);
  console.log("ASSOCIATION GET MAPS", associationsArray);

  useEffect(() => {
    getAssociations();

    getArrayCoordinatesFromAssociations();

    console.log(markers);
  }, [associationsArray]);

  const getArrayCoordinatesFromAssociations = async () => {
    try {
      const data = [];
      await Promise.all(
        associationsArray.map(async (association) => {
          const response = await fetch(
            `https://api.geoapify.com/v1/geocode/search?text=${association.address}&lang=it&limit=1&type=street&format=json&apiKey=${process.env.REACT_APP_GEOCODING}`
          );
          const places = await response.json();

          data.push(places);
        })
      );

      const mergeData = data.map((singleData) => {
        return {
          lat: singleData.results[0].lat,
          lon: singleData.results[0].lon,
        };
      });
      console.log(mergeData);
      setMarkers(mergeData);
      return mergeData;
    } catch (error) {
      console.log(error);
    }
  };

  const markerIcon = new L.Icon({
    iconUrl: "path/to/icon.png",
    iconSize: [25, 41],
  });

  return (
    <div
      style={{
        height: "30rem",
        width: "30rem",
        position: "-webkit-sticky",
        top: "50px",
      }}
    >
      <MapContainer center={[41.8719, 12.5674]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((position, idx) => (
          <Marker key={`marker-${idx}`} position={position} icon={markerIcon}>
            <Popup>
              <span>Informazioni sul marker</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Maps;
 */
