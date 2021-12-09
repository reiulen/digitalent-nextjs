import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useSelector } from "react-redux";

const MapSimonas = () => {
  const {
    loading: loadingRegionApplier,
    error: errorRegionApplier,
    regionapplier,
  } = useSelector((state) => state.simonasRegionApplier);

  const dataSimonasMapPendaftar = [];
  if (regionapplier) {
    regionapplier.map((row, i) => {
      let val = {
        position: [row.lat, row.long],
        provinsi: row.province,
        job: row.job,
        project: row.project,
      };
      dataSimonasMapPendaftar.push(val);
    });
  }

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
        {dataSimonasMapPendaftar.map((row, i) => (
          <Marker key={i} position={row.position} animate={true}>
            <Popup>
              <div className="row">
                <div className="col-md-12 text-left">
                  <p className="fw-600 fz-12 m-0 p-0">{row.provinsi}</p>
                </div>

                <>
                  <div className="col-md-9 text-left">
                    <p className="text-dashboard-neutral">Pelamar Proyek</p>
                    <p className="text-dashboard-neutral">Pelamar Kerja</p>
                  </div>
                  <div className="col-md-3 text-right">
                    <p className="text-dashboard-primary">{row.project}</p>
                    <p className="text-dashboard-primary">{row.job}</p>
                  </div>
                </>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default MapSimonas;
