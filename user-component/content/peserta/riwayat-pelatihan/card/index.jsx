// import React, { Fragment, useState, useEffect } from "react";
// import { Card, Col, Row, Badge, Button } from "react-bootstrap";
// import Link from "next/link";
import Image from "next/image";
import AdministrasiMenungguJadwal from "./substansi-menunggu-jadwal";
import TestSubstansi from "./substansi-test-substansi";
import LolosSubstansi from "./substansi-lolos-substansi";
import TidakLulus from "./tidak-lulus";
import SeleksiAdministrasi from "./administrasi-seleksi-administrasi";
import LolosAdministrasi from "./administrasi-lolos-administrasi";
import IkutiPelatihan from "./pelatihan-ikuti-pelatihan";
import MidTest from "./pelatihan-kerjakan-mid-test";
import Trivia from "./pelatihan-kerjakan-trivia";
import LulusPelatihan from "./pelatihan-lulus-pelatihan";
import IsiSurvey from "./survey-isi-survey";
import IsiLpj from "./survey-isi-lpj";
import style from "../style.module.css";
import TestCardTemplate from "./testCardTemplate";

import React, { useState, useEffect, Fragment } from "react";
import { Col, Row, Card, Button, Container, Modal } from "react-bootstrap";
import Link from "next/link";
// import style from "../style.module.css";
import moment from "moment";
import axios from "axios";

export default function CardTemplateOriginal({ data }) {
  const dateFrom = moment(data.pendaftaran_mulai).format("LL");
  const dateTo = moment(data.pendaftaran_selesai).format("LL");
  const [showModalSertifikasi, setShowModalSertifikasi] = useState(false);
  // const gambarMitra = data.gambarMitra
  const [label, setLabel] = useState();

  useEffect(() => {
    switch (data.status) {
      case "menunggu":
        return setLabel("warning");
      case "lulus pelatihan":
        return setLabel("success");
      case "menunggu administrasi":
        return setLabel("warning");
      case "menunggu tes substansi":
        return setLabel("warning");
      case "pelatihan":
        return setLabel("primary");
      default:
        return setLabel("danger");
    }
  }, []);

  const [imageSertifikasi, setImageSertifikasi] = useState();
  const [statusSertifikasi, setStatusSertifikasi] = useState(1);

  const uploadSertifikasi = async (data, id) => {
    const link = `${process.env.END_POINT_API_PELATIHAN}api/v1/formPendaftaran/update-sertifikat`;

    const config = {
      headers: {
        Authorization: "Bearer " + props.session.token,
      },
    };

    const body = {
      id: +id,
      sertifikasi: statusSertifikasi.toString(),
      file_sertifikat: data,
    };
    try {
      const data = await axios.post(link, body, config);
      if (data) {
        console.log(data, "ini datanya");
      }
    } catch (error) {
      console.log(error, "masuk sini errornya");
    }
  };

  const [fileName, setFileName] = useState();
  const onChangeFile = (e) => {
    setFileName(e.target.files[0].name);
    if (e.target.files[0].size > 5000000) {
      e.target.value = null;
      Swal.fire("Oops !", "Gambar maksimal 5 MB.", "error");
    } else {
      const type = ["image/jpg", "image/png", "image/jpeg"];

      if (type.includes(e.target.files[0].type)) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            // uploadSertifikasi(reader.result);
            setImageSertifikasi(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      } else {
        e.target.value = null;
        Swal.fire(
          "Oops !",
          "Data yang bisa dimasukkan hanya berupa data background.",
          "error"
        );
      }
    }
  };
  const variant = ["download", "upload", "rightarrow", "pencil", "paper"];
  return (
    <Fragment>
      <Card className="position-relative">
        <Card.Body
          onClick={() => {
            console.log("card body");
          }}
        >
          <Row>
            <Col md={3}>
              <img
                className="rounded-xl img-fluid d-block w-100 "
                // src="/assets/media/bg-admin-1.png"
                src={`${process.env.END_POINT_API_IMAGE_BEASISWA}${data.gambar}`}
                alt="test1"
                style={{ height: "200px", objectFit: "cover" }}
              />
            </Col>
            <Col md={9}>
              <Row className="h-100">
                <Col
                  lg={2}
                  className="d-flex justify-content-center align-items-center my-10 my-lg-0 order-2 order-md-1"
                >
                  <img
                    // src="/assets/media/mitra-icon/bukalapak-1.svg"
                    // src="/assets/media/default-card.png"
                    src={
                      data.gambar_mitra
                        ? `${process.env.END_POINT_API_IMAGE_LOGO_MITRA}${data.gambar_mitra}`
                        : "/assets/media/default-card.png"
                    }
                    width={58}
                    height={58}
                    alt="test2"
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                </Col>
                <Col
                  md={7}
                  className="my-auto order-3 order-md-2 row"
                  // style={{ marginLeft: "-10px" }}
                >
                  <h4 className="font-weight-bolder my-0 p-0 col-12 order-2 order-lg-1">
                    {data.name}
                  </h4>
                  <div
                    className="d-flex align-items-center justify-content-lg-start justify-content-center order-1 order-lg-2"
                    style={{ color: "#203E80" }}
                  >
                    <div className="font-weight-bolder">Bukalapak</div>
                    <div className="text-muted pl-2 justify-content-center">
                      &bull; {data.akademi}
                    </div>
                  </div>
                </Col>
                <Col
                  md={3}
                  // className="d-flex justify-content-end order-1 order-md-3"
                  className="order-1 order-md-3 d-flex justify-content-end"
                >
                  <p
                    style={{ borderRadius: "50px" }}
                    className={`label label-inline label-light-${label} font-weight-bolder p-0 px-4 text-capitalize`}
                  >
                    {data.status == "pelatihan"
                      ? "ikuti pelatihan"
                      : data.status}
                  </p>
                </Col>
                <Col md={12} className="my-auto order-4">
                  <div className="d-flex align-items-center align-middle ">
                    <i className="ri-time-line"></i>
                    <span className={` pl-2`}>
                      Pelatihan : {dateFrom} - {dateTo}
                    </span>
                  </div>{" "}
                </Col>
                <Col
                  md={12}
                  className="my-auto order-5 pb-40 pb-md-30 pb-lg-20"
                >
                  <div className="d-flex align-items-center align-middle ">
                    <i className="ri-map-pin-line"></i>
                    <span className={` pl-2`}>Lokasi : {data.alamat}</span>
                  </div>{" "}
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
        <div
          className="position-absolute w-100 d-lg-flex pb-10 pb-md-0 pb-lg-10"
          style={{ bottom: 0 }}
        >
          <Col lg={3} />
          {data.status == "menunggu" ? (
            <Col className="d-flex justify-content-center ">
              <Button
                className={`btn-rounded-full font-weight-bold btn-block justify-content-center mt-5 `}
                style={{ height: "40px", fontSize: "14px" }}
                onClick={() => {
                  console.log("ini click button 2 ");
                }}
              >
                <i className="ri-download-2-fill mr-2"></i>
                Bukti Pendaftaran
              </Button>
            </Col>
          ) : data.status == "lulus pelatihan" ? (
            <Fragment>
              <Col className="d-flex justify-content-center ">
                <Button
                  className={`btn-rounded-full font-weight-bold btn-block justify-content-center mt-5 ${style.background_outline_primary}`}
                  style={{ height: "40px", fontSize: "14px" }}
                  onClick={() => {
                    setShowModalSertifikasi(true);
                  }}
                  type=""
                >
                  <i className="ri-upload-2-fill mr-2"></i>
                  Upload Sertifikasi
                </Button>
              </Col>
              <Col className="d-flex justify-content-center ">
                <Button
                  className={`btn-rounded-full font-weight-bold btn-block justify-content-center mt-5 `}
                  style={{ height: "40px", fontSize: "14px" }}
                  onClick={() => {
                    console.log("ini click button 2 ");
                  }}
                >
                  <i className="ri-download-2-fill mr-2"></i>
                  Bukti Pendaftaran
                </Button>
              </Col>
            </Fragment>
          ) : data.status == "menunggu administrasi" ? (
            <Col className="d-flex justify-content-center ">
              <Button
                className={`btn-rounded-full font-weight-bold btn-block justify-content-center mt-5 `}
                style={{ height: "40px", fontSize: "14px" }}
                onClick={() => {
                  console.log("ini click button 2 ");
                }}
              >
                <i className="ri-download-2-fill mr-2"></i>
                Bukti Pendaftaran
              </Button>
            </Col>
          ) : data.status == "menunggu tes substansi" ? (
            <Col className="d-flex justify-content-center ">
              <Button
                className={`btn-rounded-full font-weight-bold btn-block justify-content-center mt-5 `}
                style={{ height: "40px", fontSize: "14px" }}
                onClick={() => {
                  console.log("ini click button 2 ");
                }}
              >
                <i className="ri-download-2-fill mr-2"></i>
                Bukti Pendaftaran
              </Button>
            </Col>
          ) : (
            ""
          )}
          {data.midtest ? (
            <Col className="d-flex justify-content-center">
              <Button
                className="btn-rounded-full font-weight-bold btn-block justify-content-center mt-5"
                style={{ height: "40px", fontSize: "14px" }}
                onClick={() => {
                  console.log("ini click button 1");
                }}
              >
                Kerjakan Mid Test <i className="ri-arrow-right-s-line mr-2"></i>
              </Button>
            </Col>
          ) : (
            ""
          )}
          {data.trivia ? (
            <Col className="d-flex justify-content-center">
              <Button
                className="btn-rounded-full font-weight-bold btn-block justify-content-center mt-5"
                style={{ height: "40px", fontSize: "14px" }}
                onClick={() => {
                  console.log("ini click button 1");
                }}
              >
                Kerjakan Trivia <i className="ri-arrow-right-s-line mr-2"></i>
              </Button>
            </Col>
          ) : (
            ""
          )}
          {data.survei ? (
            <Col className="d-flex justify-content-center">
              <Button
                className="btn-rounded-full font-weight-bold btn-block justify-content-center mt-5"
                style={{ height: "40px", fontSize: "14px" }}
                onClick={() => {
                  console.log("ini click button 1");
                }}
              >
                Kerjakan Survey <i className="ri-arrow-right-s-line mr-2"></i>
              </Button>
            </Col>
          ) : (
            ""
          )}
          {data.lpj ? (
            <Col className="d-flex justify-content-center">
              <Button
                className="btn-rounded-full font-weight-bold btn-block justify-content-center mt-5"
                style={{ height: "40px", fontSize: "14px" }}
                onClick={() => {
                  console.log("ini click button 1");
                }}
              >
                <i className="ri-file-text-line mr-2"></i>
                Kerjakan LPJ
              </Button>
            </Col>
          ) : (
            ""
          )}
        </div>
      </Card>

      <Modal
        show={showModalSertifikasi}
        onHide={() => setShowModalSertifikasi(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <Modal.Header>
          <Modal.Title>Tambah Sertifikasi</Modal.Title>
          <button
            type="button"
            className="close"
            onClick={() => setShowModalSertifikasi(false)}
          >
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group row mb-4">
            <label className="col-form-label font-weight-bold col-sm-3 pr-0 text-center">
              Status Sertifikasi
            </label>
            <div className="col-sm-9 mt-3">
              <div className="form-check ">
                <input
                  type="radio"
                  name="status"
                  className="form-check-input"
                  value={statusSertifikasi}
                  onChange={() => {
                    setStatusSertifikasi(1);
                  }}
                  defaultChecked
                />
                <label className="form-check-label">
                  Lulus / Certifed / Kompeten
                </label>
              </div>
              <div className="form-check ">
                <input
                  type="radio"
                  name="status"
                  value={statusSertifikasi}
                  onChange={() => {
                    setStatusSertifikasi(0);
                  }}
                  className="form-check-input"
                />
                <label className="form-check-label">
                  Tidak Lulus / Not Certifed / Belum Kompeten
                </label>
              </div>
            </div>
          </div>

          <div className="form-group mb-3 px-11">
            <label className="col-form-label font-weight-bold">
              Upload Sertifikasi (Optional)
            </label>
            <div className="d-flex">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  accept="image/png, image/jpeg , image/jpg"
                  onChange={(e) => {
                    onChangeFile(e);
                  }}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  {fileName ? fileName : "Pilih File"}
                </label>
              </div>
            </div>
            <small className="text-muted">
              Format File (.pdf/.jpg) & Max size 5 mb
            </small>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-primary-rounded-full"
            type="button"
            onClick={() => {
              uploadSertifikasi(imageSertifikasi, data.id);
            }}
          >
            Upload
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

// const status = [
//   "menunggu jadwal",
//   "tes substansi",
//   "lolos substansi",
//   "seleksi administrasi",
//   "lolos administrasi",
//   "ikuti pelatihan",
//   "kerjakan mid test",
//   "kerjakan trivia",
//   "lulus pelatihan",
//   "isi survey",
//   "isi lpj",
//   "lulus pelatihan",
//   "tidak lulus",
// ];
// const CardTemplate = (props) => {
// switch (props.status) {
//   case "menunggu jadwal":
//     return (
//       <Fragment>
//         <AdministrasiMenungguJadwal />
//       </Fragment>
//     );
//   case "tes substansi":
//     return (
//       <Fragment>
//         <TestSubstansi props={props} />
//       </Fragment>
//     );
//   case "lolos substansi":
//     return (
//       <Fragment>
//         <LolosSubstansi />
//       </Fragment>
//     );
//   case "seleksi administrasi":
//     return (
//       <Fragment>
//         <SeleksiAdministrasi props={props} />
//       </Fragment>
//     );
//   case "lolos administrasi":
//     return (
//       <Fragment>
//         <LolosAdministrasi props={props} />
//       </Fragment>
//     );
//   case "ikuti pelatihan":
//     return (
//       <Fragment>
//         <IkutiPelatihan />
//       </Fragment>
//     );
//   case "kerjakan mid test":
//     return (
//       <Fragment>
//         <MidTest props={props} />
//       </Fragment>
//     );
//   case "kerjakan trivia":
//     return (
//       <Fragment>
//         <Trivia />
//       </Fragment>
//     );
//   case "lulus pelatihan":
//     return (
//       <Fragment>
//         <LulusPelatihan />
//       </Fragment>
//     );
//   case "isi survey":
//     return (
//       <Fragment>
//         <IsiSurvey props={props} />
//       </Fragment>
//     );
//   case "isi lpj":
//     return (
//       <Fragment>
//         <IsiLpj props={props} />
//       </Fragment>
//     );
//   case "test":
//     return (
//       <Fragment>
//         <TestCardTemplate props={props} />
//       </Fragment>
//     );
//   default:
//     return (
//       <Fragment>
//         <TidakLulus />
//       </Fragment>
//     );
// }
// };

// export default CardTemplateOriginal;

// {data.survei && data.lpj ? (
//   <IsiLpj data={data} />
// ) : data.survei && data.lpj == false ? (
//   <IsiSurvey data={data} />
// ) : (
//   <IsiLpj data={data} />
// )}

// {data.midtest && <MidTest data={data} />}
// {data.tes_substansi && <TestSubstansi data={data} />}
// {data.trivia && <Trivia data={data} />}
