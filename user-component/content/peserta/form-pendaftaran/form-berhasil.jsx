import React, { useState } from "react";

import { Button, Card, Col, Row, Badge } from "react-bootstrap";
import style from "./style.module.css";
import { useRouter } from "next/router";

import doneImage from "../../../../public/assets/media/logos/Group 240.png";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const FormBerhasil = () => {
  const router = useRouter();
  const { error: errorPelatihan, pelatihan: dataTraining } = useSelector(
    (state) => state.getPelatihan
  );

  const [dataPelatihan] = useState(dataTraining || null);

  const handleDownloadBukti = () => {
    console.log("Berhasil Download");
  };
  return (
    <>
      <div className="p-6">
        <Card.Title className="mb-6">
          <h2 className="text-success">Pendaftaran Pelatihan Berhasil!</h2>
        </Card.Title>
        <Card className="mb-5">
          <Card.Body>
            <Row>
              <Col md={3} sm={12}>
                <img
                  className="img-fluid rounded-xl w-100 h-80 mb-3"
                  src={`${
                    dataPelatihan
                      ? process.env.END_POINT_API_IMAGE_BEASISWA +
                        dataPelatihan.thumbnail
                      : "/assets/media/default-card.png"
                  }`}
                />
              </Col>
              <Col md={9}>
                <div className="d-flex flex-row">
                  <img
                    src={`${
                      dataPelatihan
                        ? process.env.END_POINT_API_IMAGE_BEASISWA +
                          dataPelatihan.logo
                        : "/assets/media/default-card.png"
                    }`}
                    width={58}
                    height={58}
                    className={`${style.image_mitra}`}
                  />
                  <div className="tema-mitra d-flex flex-column ml-5">
                    <p className={`my-0 ${style.text_title_card}`}>
                      {dataPelatihan ? dataPelatihan.name || "-" : "-"}
                    </p>
                    <div className="d-flex flex-row">
                      <p className={`${style.text_mitra_card}`}>
                        {dataPelatihan ? dataPelatihan.mitra_nama || "-" : "-"}
                      </p>
                      <p className={`mx-3 ${style.text_grey}`}>•</p>
                      <p className={`${style.text_tema_card}`}>
                        {dataPelatihan ? dataPelatihan.akademi || "-" : "-"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-row flex-wrap align-content-end mt-3">
                  <div className="date d-flex align-items-center align-middle mr-7">
                    <i className="ri-time-line"></i>
                    <span className={`${style.text_date_register} pl-2`}>
                      Pelatihan :{" "}
                      {dataPelatihan
                        ? moment(dataPelatihan.pelatihan_mulai).format(
                            "DD MMM YYYY"
                          )
                        : "-"}{" "}
                      -{" "}
                      {dataPelatihan
                        ? moment(dataPelatihan.pelatihan_selesai).format(
                            "DD MMM YYYY"
                          )
                        : "-"}{" "}
                    </span>
                  </div>
                  <div className="date d-flex align-items-center align-middle mr-7">
                    <i className="ri-map-pin-line"></i>
                    <span className={`${style.text_date_register} pl-2`}>
                      Lokasi : {dataPelatihan ? dataPelatihan.alamat : "-"}
                    </span>
                  </div>
                </div>

                <div className="d-flex align-items-end">
                  <Button
                    variant="primary"
                    className="btn-rounded-full ml-auto btn-block d-flex justify-content-center mt-3"
                    size="sm"
                    style={{ backgroundColor: "#007CFF" }}
                    onClick={() => handleDownloadBukti()}
                  >
                    <i className="ri-download-2-fill mr-2"></i>
                    Bukti Pendaftaran
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <div className="text-center">
          <Link href="/">
            <a className="text-primary font-weight-bolder">Ke Halaman Utama</a>
          </Link>
        </div>
      </div>
    </>
  );
};
export default FormBerhasil;
