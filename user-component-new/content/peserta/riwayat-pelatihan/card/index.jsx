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
  const dateFrom = moment(data.pelatihan_mulai).utc().format("LL");
  const dateTo = moment(data.pelatihan_selesai).utc().format("LL");
  const [label, setLabel] = useState();
  const [name, setName] = useState(data?.name);
  const { error: errorDataPribadi, dataPribadi } = useSelector(
    (state) => state.getDataPribadi
  );

<<<<<<< HEAD
=======
  const [countButton, setCountButton] = useState(1);

>>>>>>> 3c80f1339543dfb371138ebe28b6f69fd4638a13
  useEffect(() => {
    helperUserStatusColor(data.status, setLabel);
  }, [data.status]);

  useEffect(() => {
    if (name.includes("/") || name.includes(" ")) {
      name.replaceAll("/", "-");
      setName((prev) => {
        let str = "";
        str = prev.replaceAll("/", "-");
        str = str.replaceAll(" ", "-");
        return str;
      });
    }
  }, [name]);

  return (
    <Fragment>
      <Card className="position-relative mb-8 rounded-lg">
        <Button
          variant="white"
          disabled={
            data.status == "ditolak"
              ? true
              : data.status.includes("tidak")
              ? true
              : false
          }
          className="p-0  rounded-lg"
        >
          <Card.Body
            onClick={() => {
              if (
                data.status.includes("tidak") ||
                data.status.includes("tolak")
              )
                return false;
              if (data.status.includes("menunggu jadwal tes substansi")) {
                return router.push(`/peserta/test-substansi?id=${data.id}`);
              }
              if (data?.trivia && !data?.midtest) {
                return router.push(
                  `/peserta/trivia?no=${data?.id}&id_pelatihan=${data?.id}&id_tema=${data?.tema_id}`
                );
              }
              if (data?.survei) {
                return router.push(
                  `/peserta/survey?no=${data?.id}&id_pelatihan=${data?.id}&id_tema=${data?.tema_id}`
                );
              }
              if (
                data.status.includes("administrasi") &&
                !data.status.includes("administrasi akhir")
              )
                return router.push(`/peserta/administrasi?id=${data.id}`);
              if (data.status.includes("seleksi akhir")) {
                return router.push(
                  `/peserta/riwayat-pelatihan/${name}?no=${data.id}`
                );
              }
              if (data.status.includes("tes substansi")) {
                return router.push(`/peserta/test-substansi?id=${data.id}`);
              } else {
                return router.push(
                  `/peserta/riwayat-pelatihan/${name}?no=${data.id}`
                );
              }
            }}
          >
            <Row>
              <Col lg={3}>
                <img
                  className="rounded-xl img-fluid d-block w-100"
                  src={
                    !data.gambar
                      ? "/assets/media/default-card.png"
                      : `${process.env.END_POINT_API_IMAGE_BEASISWA}${data.gambar}`
                  }
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
<<<<<<< HEAD
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
=======
                    <div
                      className="d-flex justify-content-start justify-content-lg-start my-0 p-lg-0 col-12 order-1 order-lg-1 font-weight-bolder text-truncate fz-18"
                      style={{ maxWidth: "486px" }}
                    >
                      {data.name}
                    </div>
                    <div
                      className="d-flex align-items-center p-lg-0 justify-content-lg-start justify-content-start order-1 order-lg-2 col-12"
>>>>>>> 3c80f1339543dfb371138ebe28b6f69fd4638a13
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
                        } font-weight-bolder p-4 text-capitalize mr-5`}
                      >
                        Kerjakan Mid Test
                      </p>
                    ) : (
                      ""
                    )}
                    <p
                      style={{
                        borderRadius: "50px",
                        paddingRight: "12px",
                        paddingLeft: "12px",
                      }}
<<<<<<< HEAD
                      className={`label p-4 label-inline label-light-${
=======
                      className={`label p-6 label-inline label-light-${
>>>>>>> 3c80f1339543dfb371138ebe28b6f69fd4638a13
                        data.survei ? "primary" : label
                      } font-weight-bolder text-capitalize`}
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
                  <Col
                    lg={12}
<<<<<<< HEAD
                    className="order-5"
=======
                    className="order-5 px-lg-4 px-0"
>>>>>>> 3c80f1339543dfb371138ebe28b6f69fd4638a13
                    style={{ paddingTop: "24px", paddingBottom: "8px" }}
                  >
                    <div className="d-flex align-items-center align-middle text-left">
                      <i className="ri-time-line"></i>
                      <span className={` pl-2`}>
                        Pelatihan : {dateFrom} - {dateTo}
                      </span>
                    </div>
                  </Col>
<<<<<<< HEAD
                  <Col lg={12} className="my-auto order-5 pb-40 pb-md-20 ">
=======
                  <Col
                    lg={12}
                    className={`my-auto px-lg-4 px-0 order-5 ${
                      countButton == 1 ? "pb-20" : "pb-40"
                    } pb-lg-20`}
                  >
>>>>>>> 3c80f1339543dfb371138ebe28b6f69fd4638a13
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
<<<<<<< HEAD
          className="position-absolute w-100 d-lg-flex pb-10 pb-lg-0 pb-lg-10"
          style={{ bottom: 0 }}
        >
          <Col lg={3} />
          <ButtonStatusPeserta data={data} token={session.token} />
=======
          className="position-absolute w-100 d-lg-flex pb-10 pb-lg-10 "
          style={{ bottom: 0 }}
        >
          <Col lg={3} />
          <ButtonStatusPeserta
            data={data}
            token={session.token}
            setCountButton={setCountButton}
            countButton={countButton}
          />
>>>>>>> 3c80f1339543dfb371138ebe28b6f69fd4638a13
        </div>
      </Card>
    </Fragment>
  );
}
