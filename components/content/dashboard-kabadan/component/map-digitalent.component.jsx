import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
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
  var LeafIcon = L.Icon.extend({
    options: {
      iconSize: [38, 95],
      shadowSize: [50, 64],
      iconAnchor: [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor: [-3, -76],
    },
  });

  var greenIcon = new LeafIcon({
    iconUrl: "http://leafletjs.com/examples/custom-icons/leaf-green.png",
    shadowUrl: "http://leafletjs.com/examples/custom-icons/leaf-shadow.png",
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

  useEffect(() => {
    console.log(dataWilayah, "ini data wilayah");
  }, [dataWilayah]);

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
        <Marker
          position={[-1.062401, 120.5465227]}
          animate={true}
          icon={greenIcon}
        >
          <Popup>
            <div className="row">
              <div className="col-md-12 text-left">
                <p className="fw-600 fz-12 m-0 p-0">TEST 123</p>
              </div>

              <>
                <div className="col-md-9 text-left">
                  <p className="text-dashboard-neutral">Pendaftar</p>
                  <p className="text-dashboard-neutral">Peserta</p>
                  <p className="text-dashboard-neutral">Lulus</p>
                  <p className="text-dashboard-neutral">Sertifikasi</p>
                </div>
                <div className="col-md-3 text-right">
                  <p className="text-dashboard-primary">TEST 123</p>
                  <p className="text-dashboard-primary">TEST 123</p>
                  <p className="text-dashboard-primary">TEST 123</p>
                  <p className="text-dashboard-primary">DATA SERTIFIKATI</p>
                </div>
              </>
            </div>
          </Popup>
        </Marker>

        {dataWilayah.length > 0 &&
          dataWilayah.map((row, i) => {
            return (
              <Marker
                key={i}
                position={row?.position}
                animate={true}
                icon={greenIcon}
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
