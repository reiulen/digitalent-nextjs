import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const MapDigitalent = () => {
  const dataMap = [
    { key: 1, position: [-6.9133056, 107.6174937], kota: "Bandung" },
    { key: 2, position: [-6.1726092, 106.8294391], kota: "Jakarta" },
    { key: 3, position: [0.893191, 114.5267946], kota: "Kalimantan" },
  ];
  return (
    <>
      <MapContainer
        center={[-1.062401, 120.5465227]}
        zoom={5}
        scrollWheelZoom={false}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/dendylords/cku54tvb11wve17mqhnl3yiuz/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.TOKEN_MAP}`}
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        />
        {dataMap.map((row, i) => (
          <Marker key={i} position={row.position} animate={true}>
            <Popup>
              <div className="row">
                <div className="col-md-12 text-left">
                  <p className="fw-600 fz-12 m-0 p-0">{row.kota}</p>
                </div>
                <div className="col-md-6 text-left">
                  <p className="text-dashboard-neutral">Pendaftar</p>
                  <p className="text-dashboard-neutral">Peserta</p>
                  <p className="text-dashboard-neutral">Lulus</p>
                  <p className="text-dashboard-neutral">Sertifikasi</p>
                </div>
                <div className="col-md-6 text-right">
                  <p className="text-dashboard-primary">2004</p>
                  <p className="text-dashboard-primary">123.456</p>
                  <p className="text-dashboard-primary">178.666</p>
                  <p className="text-dashboard-primary">12.988</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default MapDigitalent;
