import style from "../style.module.css";

import React, { useState, useEffect, Fragment } from "react";
import { Col, Row, Card, Button, Modal } from "react-bootstrap";

import moment from "moment";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { helperUserStatusColor } from "../../../../../utils/middleware/helper";
import ButtonStatusPeserta from "../../../../components/global/StatusPesertaButton";
import Image from "next/image";
export default function CardTemplateOriginal({ data, session }) {
  const router = useRouter();
  const dateFrom = moment(data.pelatihan_mulai).format("LL");
  const dateTo = moment(data.pelatihan_selesai).format("LL");
  const [label, setLabel] = useState();

  const { error: errorDataPribadi, dataPribadi } = useSelector(
    (state) => state.getDataPribadi
  );

  useEffect(() => {
    helperUserStatusColor(data.status, setLabel);
  }, [data.status]);
  console.log(data, "ini data");
  return (
    <Fragment>
      <Card className="position-relative">
        <Button
          variant="white"
          disabled={
            data.status == "ditolak"
              ? true
              : data.status.includes("tidak")
              ? true
              : false
          }
          className="p-0"
        >
          <Card.Body
            onClick={() => {
              if (data.status.includes("tidak")) return false;
              if (data.status.includes("menunggu jadwal tes substansi")) {
                Cookies.set("id_pelatihan", data.id);
                Cookies.set("id_tema", data.tema_id);
                return router.push(`/peserta/test-substansi?id=${data.id}`);
              }
              if (
                data.status.includes("administrasi") &&
                !data.status.includes("administrasi akhir")
              )
                return router.push(`/peserta/administrasi?id=${data.id}`);
              if (data.status.includes("seleksi akhir")) {
                Cookies.set("id_pelatihan", data.id);
                Cookies.set("id_tema", data.tema_id);
                return router.push(
                  `/peserta/riwayat-pelatihan/${data.name
                    .split(" ")
                    .join("-")
                    .toLowerCase()}`
                );
              }
              if (data.status.includes("tes substansi")) {
                Cookies.set("id_pelatihan", data.id);
                Cookies.set("id_tema", data.tema_id);
                return router.push(`/peserta/test-substansi?id=${data.id}`);
              } else {
                Cookies.set("id_pelatihan", data.id);
                Cookies.set("id_tema", data.tema_id);
                return router.push(
                  `/peserta/riwayat-pelatihan/${data.name
                    .split(" ")
                    .join("-")
                    .toLowerCase()}?no=${data.id}`
                );
              }
            }}
          >
            <Row>
              <Col lg={3}>
                <img
                  className="rounded-xl img-fluid d-block w-100"
                  src={`${process.env.END_POINT_API_IMAGE_BEASISWA}${data.gambar}`}
                  alt="test1"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              </Col>
              <Col lg={9}>
                <Row className="h-100">
                  <Col
                    lg={2}
                    className="d-flex justify-content-start align-items-center my-10 my-lg-0 order-2 order-lg-1"
                  >
                    <Image
                      src={
                        !data?.logo && !data?.gambar_mitra
                          ? "/assets/media/default-card.png"
                          : data?.logo
                          ? data?.file_path + data?.logo
                          : process.env.END_POINT_API_IMAGE_PARTNERSHIP +
                            data.gambar_mitra
                      }
                      width={58}
                      height={58}
                      alt="Image Mitras"
                      className="rounded-full"
                      objectFit="cover"
                      // style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                  </Col>
                  <Col lg={6} className="my-auto order-3 order-lg-2 row p-0 ">
                    <div className="d-flex justify-content-start justify-content-lg-start my-0 p-0 col-12 order-1 order-lg-1">
                      <span
                        className="font-weight-bolder text-truncate fz-18"
                        style={{ maxWidth: "486px" }}
                      >
                        {data.name}
                      </span>
                    </div>
                    <div
                      className="d-flex align-items-center p-0 justify-content-lg-start justify-content-start order-1 order-lg-2 col-12"
                      style={{ color: "#203E80" }}
                    >
                      <div
                        className="font-weight-bolder text-truncate text-left"
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxWidth: "6rem",
                        }}
                      >
                        {data.mitra}
                      </div>
                      <div className="text-muted pl-2 justify-content-center text-left text-truncate">
                        &bull; {data.akademi}
                      </div>
                    </div>
                  </Col>
                  <Col className="p-0 order-4 order-lg-3 my-5 my-lg-0 d-flex justify-content-start justify-content-lg-end ">
                    {data.midtest && data.trivia ? (
                      <p
                        style={{ borderRadius: "50px" }}
                        className={`label label-inline label-light-${
                          data.midtest ? "primary" : label
                        } font-weight-bolder p-0 px-4 py-4 text-capitalize mr-5`}
                      >
                        Kerjakan Mid Test
                      </p>
                    ) : (
                      ""
                    )}
                    <p
                      style={{ borderRadius: "50px" }}
                      className={`label label-inline label-light-${
                        data.survei ? "primary" : label
                      } font-weight-bolder p-0 px-4 py-4 text-capitalize`}
                    >
                      {data.lpj
                        ? "Isi LPJ"
                        : data.survei
                        ? "Isi Survey"
                        : data.status == "pelatihan" &&
                          data.midtest &&
                          !data.trivia
                        ? "Kerjakan Mid Test"
                        : data.status == "pelatihan" && data.trivia
                        ? "kerjakan trivia"
                        : data.status == "survey belum tersedia"
                        ? "Isi survei"
                        : data.status.includes("LPJ") ||
                          data.status.includes("lpj")
                        ? "Isi LPJ"
                        : data.status}
                    </p>
                  </Col>
                  <Col lg={12} className="order-5">
                    <div className="d-flex align-items-center align-middle text-left">
                      <i className="ri-time-line"></i>
                      <span className={` pl-2`}>
                        Pelatihan : {dateFrom} - {dateTo}
                      </span>
                    </div>
                  </Col>
                  <Col
                    lg={12}
                    className="my-auto order-5 pb-40 pb-lg-30 pb-lg-20"
                  >
                    <div className="d-flex align-items-center align-middle ">
                      <i className="ri-map-pin-line"></i>
                      <span
                        style={{ maxWidth: "30rem" }}
                        className={` pl-2 text-truncate`}
                      >
                        Lokasi : {data.alamat}
                      </span>
                    </div>{" "}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Button>

        <div
          className="position-absolute w-100 d-lg-flex pb-10 pb-lg-0 pb-lg-10"
          style={{ bottom: 0 }}
        >
          <Col lg={3} />
          <ButtonStatusPeserta data={data} token={session.token} />
        </div>
      </Card>
    </Fragment>
  );
}
