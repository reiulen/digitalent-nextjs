import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useSelector } from "react-redux";
import * as L from "leaflet";

const MapSimonas = () => {
  const {
    loading: loadingRegionApplier,
    error: errorRegionApplier,
    regionApplier,
  } = useSelector((state) => state.simonasRegionApplier);

  const dataSimonasMapPendaftar = [];
  if (regionApplier?.data?.list) {
    regionApplier.data.list.map((row, i) => {
      let val = {
        position: [row.lat, row.long],
        provinsi: row.name,
        job: row.job,
        project: row.project,
      };
      dataSimonasMapPendaftar.push(val);
    });
  }

  const LeafIcon = L.Icon.extend({
    options: {
      iconSize: [22, 30],
      shadowSize: [50, 64],
      iconAnchor: [10, 30],
      shadowAnchor: [10, 62],
      popupAnchor: [0, -10],
    },
  });

  const icon1 = new LeafIcon({
    iconUrl: "/assets/icon/icon_map_dashboard_kabadan/1.png",
  });
  const icon2 = new LeafIcon({
    iconUrl: "/assets/icon/icon_map_dashboard_kabadan/2.png",
  });
  const icon3 = new LeafIcon({
    iconUrl: "/assets/icon/icon_map_dashboard_kabadan/3.png",
  });
  const icon4 = new LeafIcon({
    iconUrl: "/assets/icon/icon_map_dashboard_kabadan/4.png",
  });
  const icon5 = new LeafIcon({
    iconUrl: "/assets/icon/icon_map_dashboard_kabadan/5.png",
  });
  const icon6 = new LeafIcon({
    iconUrl: "/assets/icon/icon_map_dashboard_kabadan/6.png",
  });

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
          <Marker
            key={i}
            position={row.position}
            animate={true}
            icon={
              row?.job >= 125000
                ? icon1
                : row?.job >= 100000
                ? icon2
                : row?.job >= 75000
                ? icon3
                : row?.job >= 50000
                ? icon4
                : row?.job >= 25000
                ? icon5
                : icon6
            }
          >
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
