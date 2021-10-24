import React, { useState, useEffect, Fragment } from "react";
import { Col, Row, Card, Button, Container } from "react-bootstrap";
import Link from "next/link";
import style from "../style.module.css";
import moment from "moment";

export default function CardTemplateOriginal({ props }) {
  const data = props.data;
  console.log(data);
  const dateFrom = moment(data.pendaftaran_mulai).format("LL");
  const dateTo = moment(data.pendaftaran_selesai).format("LL");
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

  const variant = ["download", "upload", "rightarrow", "pencil", "paper"];
  return (
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
              style={{ height: "200px", objectFit: "fill" }}
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
                  {data.status == "pelatihan" ? "ikuti pelatihan" : data.status}
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
              <Col md={12} className="my-auto order-5 pb-40 pb-md-30 pb-lg-20">
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
                  console.log("ini click button 2 ");
                }}
              >
                <i className="ri-upload-2-fill mr-2"></i>
                Bukti Pendaftaran
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
      </div>
    </Card>
  );
}
