import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useEffect } from "react";
import { useState } from "react";
import * as L from "leaflet";

const MapDigitalent = ({ data = [] }) => {
  const dataMap = [
    { key: 1, position: [-6.9133056, 107.6174937], provinsi: "Bandung" },
    { key: 2, position: [-6.1726092, 106.8294391], provinsi: "Jakarta" },
    { key: 3, position: [0.893191, 114.5267946], provinsi: "Kalimantan" },
  ];
  const [dataWilayah, setDataWilayah] = useState([]);

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

  useEffect(() => {
    if (data.length > 0) {
      setDataWilayah(() => {
        const arr = [];
        data.map((row, i) => {
          let val = {
            provinsi: row.label,
            position: [row.latitude, row.longitude],
            pendaftar: row.pendaftar,
            peserta: row.peserta,
            sertifikasi: row.sertifikasi,
            lulus: row.lulus,
          };
          arr.push(val);
        });
        return arr;
      });
    }
  }, [data]);

  return (
    <>
      <MapContainer
        center={[-1.062401, 120.5465227]}
        zoom={5}
        scrollWheelZoom={false}
        style={{ height: "500px", width: "100%" }}
        minZoom={4}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/dendylords/cku54tvb11wve17mqhnl3yiuz/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.TOKEN_MAP}`}
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        />

        {/* <Marker position={[-55.023709, -65.933949]} animate={true}> */}

        {dataWilayah.length > 0 &&
          dataWilayah.map((row, i) => {
            return (
              <Marker
                key={i}
                position={row?.position}
                animate={true}
                icon={
                  row?.pendaftar >= 125000
                    ? icon1
                    : row?.pendaftar >= 100000
                    ? icon2
                    : row?.pendaftar >= 75000
                    ? icon3
                    : row?.pendaftar >= 50000
                    ? icon4
                    : row?.pendaftar >= 25000
                    ? icon5
                    : icon6
                }
              >
                <Popup>
                  <div className="row">
                    <div className="col-md-12 text-left">
                      <p className="fw-600 fz-12 m-0 p-0">{row?.provinsi}</p>
                    </div>
                    <div className="col-md-6 text-left">
                      <p className="text-dashboard-neutral">Pendaftar</p>
                      <p className="text-dashboard-neutral">Peserta</p>
                      <p className="text-dashboard-neutral">Lulus</p>
                      <p className="text-dashboard-neutral">Sertifikasi</p>
                    </div>
                    <div className="col-md-6 text-right">
                      <p className="text-dashboard-primary">{row?.pendaftar}</p>
                      <p className="text-dashboard-primary">{row?.peserta}</p>
                      <p className="text-dashboard-primary">{row?.lulus}</p>
                      <p className="text-dashboard-primary">
                        {row?.sertifikasi}
                      </p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </>
  );
};

export default MapDigitalent;
