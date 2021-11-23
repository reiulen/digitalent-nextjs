import style from "../style.module.css";

import CustomButton from "./Buttons/CustomButton.jsx";

import React, { useState, useEffect, Fragment } from "react";
import { Col, Row, Card, Button, Modal } from "react-bootstrap";

import moment from "moment";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function CardTemplateOriginal({ data }) {
  const router = useRouter();
  const dateFrom = moment(data.pendaftaran_mulai).format("LL");
  const dateTo = moment(data.pendaftaran_selesai).format("LL");
  const [showModalSertifikasi, setShowModalSertifikasi] = useState(false);
  const [label, setLabel] = useState();

  useEffect(() => {
    if (data.status.includes("tidak")) return setLabel("danger");
    if (data.status.includes("lulus")) return setLabel("success");
    if (data.status.includes("menunggu") || data.status.includes("seleksi"))
      return setLabel("warning");
    if (data.status == "survey belum tersedia") return setLabel("primary");
    if (data.status == "LPJ belum tersedia") return setLabel("primary");
    if (data.status.includes("tes substansi")) return setLabel("primary");
    if (data.status.includes("seleksi administrasi"))
      return setLabel("warning");
    if (data.status.includes("belum tersedia")) return setLabel("warning");
    if (data.status.includes("pelatihan")) return setLabel("primary");

    // if (data.status.includes("menunggu")) {
    //   return setLabel("warning");
    // }
    // if (data.status.includes("tidak" || "ditolak")) {
    //   return setLabel("danger");
    // }
    // if (data.status.includes("lulus") || data.status.includes("diterima")) {
    //   return setLabel("success");
    // }
    // if (data.status.includes("tes")) return setLabel("primary");
    // if (data.status.includes("pelatihan")) return setLabel("primary");
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
    } catch (error) {
      Swal.fire("Gagal", `${error.response.data.message}`, "error");
    }
  };

  const handleClick = () => {
    console.log("test");
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

  console.log(data.status, " <============ini status"); // ID 305 fajar

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
        >
          <Card.Body
            onClick={() => {
              if (data.status.includes("menunggu jadwal tes substansi"))
                return router.push(`/peserta/test-substansi`);

              if (data.status.includes("seleksi akhir"))
                return router.push(
                  `/peserta/riwayat-pelatihan/${data.name
                    .split(" ")
                    .join("-")
                    .toLowerCase()}`
                );

              if (data.status.includes("tes substansi"))
                return console.log("masuk sini");
              // switch (data.status) {
              //   case "menunggu":
              //     Cookies.set("id_pelatihan", data.id);
              //     Cookies.set("id_tema", data.tema_id);
              //     return router.push(`/peserta/administrasi`);
              //   case "lulus pelatihan":
              //     Cookies.set("id_pelatihan", data.id);
              //     Cookies.set("id_tema", data.tema_id);
              //     return router.push(
              //       `/peserta/riwayat-pelatihan/${data.name
              //         .split(" ")
              //         .join("-")
              //         .toLowerCase()}`
              //     );
              //   case "menunggu administrasi":
              //     Cookies.set("id_pelatihan", data.id);
              //     Cookies.set("id_tema", data.tema_id);
              //     return router.push(`/peserta/administrasi`);
              //   case "menunggu tes substansi":
              //     Cookies.set("id_pelatihan", data.id);
              //     Cookies.set("id_tema", data.tema_id);
              //     return router.push(`/peserta/test-substansi`);
              //   case "pelatihan":
              //     Cookies.set("id_pelatihan", data.id);
              //     Cookies.set("id_tema", data.tema_id);
              //     return router.push(
              //       `/peserta/riwayat-pelatihan/${data.name
              //         .split(" ")
              //         .join("-")}`
              //     );
              //   case "tes substansi":
              //     Cookies.set("id_pelatihan", data.id);
              //     Cookies.set("id_tema", data.tema_id);
              //     return router.push(`/peserta/test-substansi`);
              //   case "lulus tes substansi":
              //     Cookies.set("id_pelatihan", data.id);
              //     Cookies.set("id_tema", data.tema_id);
              //     return router.push(`/peserta/test-substansi`);
              //   case "diterima":
              //     Cookies.set("id_pelatihan", data.id);
              //     Cookies.set("id_tema", data.tema_id);
              //     return router.push(
              //       `/peserta/riwayat-pelatihan/${data.name
              //         .split(" ")
              //         .join("-")
              //         .toLowerCase()}`
              //     );
              //   default:
              //     Cookies.set("id_pelatihan", data.id);
              //     Cookies.set("id_tema", data.tema_id);
              //     return router.push(`/peserta/belum-tersedia`);
              // }
            }}
          >
            <Row>
              <Col md={3}>
                <img
                  className="rounded-xl img-fluid d-block w-100"
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
                  <Col md={7} className="my-auto order-3 order-md-2 row">
                    <h4 className="font-weight-bolder d-flex justify-content-center justify-content-md-start my-0 p-0 col-12 order-1 order-md-1">
                      {data.name}
                    </h4>
                    <div
                      className="d-flex align-items-center justify-content-md-start justify-content-center order-1 order-md-2"
                      style={{ color: "#203E80" }}
                    >
                      <div className="font-weight-bolder">Bukalapak</div>
                      <div className="text-muted pl-2 justify-content-center">
                        &bull; {data.akademi}
                      </div>
                    </div>
                  </Col>
                  <Col className="order-1 order-md-3 d-flex  justify-content-center justify-content-md-end">
                    {data.midtest ? (
                      <p
                        style={{ borderRadius: "50px" }}
                        className={`label label-inline label-light-${
                          data.midtest ? "primary" : label
                        } font-weight-bolder p-0 px-4 text-capitalize mr-5`}
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
                      } font-weight-bolder p-0 px-4 text-capitalize`}
                    >
                      {data.lpj
                        ? "Kerjakan LPJ"
                        : data.survei
                        ? "Kerjakan Survei"
                        : data.status == "pelatihan" && data.trivia
                        ? "kerjakan trivia"
                        : data.status == "survey belum tersedia"
                        ? "Isi survey"
                        : data.status == "LPJ belum tersedia"
                        ? "Isi LPJ"
                        : data.status}
                      {/* {data.lpj
                        ? "Kerjakan LPJ"
                        : data.survei
                        ? "Kerjakan Survei"
                        : data.status == "pelatihan" && data.trivia
                        ? "kerjakan trivia"
                        : data.status == "pelatihan"
                        ? "ikuti pelatihan"
                        : data.status == "diterima"
                        ? "lulus pelatihan"
                        : data.status == "lulus tes substansi"
                        ? "lolos substansi"
                        : data.status == "ditolak"
                        ? "tidak lulus"
                        : data.status} */}
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
        </Button>

        <div
          className="position-absolute w-100 d-lg-flex pb-10 pb-md-0 pb-lg-10"
          style={{ bottom: 0 }}
        >
          <Col lg={3} />
          {data.lpj ? (
            <Fragment>
              <CustomButton
                click={() =>
                  router.push(
                    `/peserta/subvit/substansi/panduan-test-substansi`
                  )
                }
              >
                <i className="ri-file-text-line mr-2"></i>
                Isi Laporan Pertangungjawaban
              </CustomButton>
            </Fragment>
          ) : data.survei || data.status == "survey belum tersedia" ? (
            <Fragment>
              <CustomButton outline click={() => handleClick("download")}>
                <i className="ri-download-2-fill mr-2"></i>
                Bukti Pendaftaran
              </CustomButton>
              <CustomButton
                disabled={!data.survei}
                click={() => handleClick("download")}
              >
                Isi Survei
                <i className="ri-arrow-right-s-line mr-2"></i>
              </CustomButton>
            </Fragment>
          ) : data.lpj || data.status == "LPJ belum tersedia" ? (
            <Fragment>
              <CustomButton outline click={() => handleClick("download")}>
                <i className="ri-download-2-fill mr-2"></i>
                Bukti Pendaftaran
              </CustomButton>
              <CustomButton
                disabled={!data.lpj}
                click={() => handleClick("download")}
              >
                Isi Laporan Pertangung Jawaban
                <i className="ri-arrow-right-s-line mr-2"></i>
              </CustomButton>
            </Fragment>
          ) : data.status == "pelatihan" && data.trivia && data.midtest ? (
            <Fragment>
              <CustomButton
                click={() =>
                  router.push(
                    `/peserta/subvit/substansi/panduan-test-substansi`
                  )
                }
              >
                Kerjakan Mid Test
                <i className="ri-arrow-right-s-line mr-2"></i>
              </CustomButton>
              <CustomButton
                click={() =>
                  router.push(
                    `/peserta/subvit/substansi/panduan-test-substansi`
                  )
                }
              >
                Kerjakan Trivia <i className="ri-arrow-right-s-line mr-2"></i>
              </CustomButton>
            </Fragment>
          ) : data.status == "pelatihan" && data.trivia ? (
            <Fragment>
              <CustomButton
                click={() =>
                  router.push(
                    `/peserta/subvit/substansi/panduan-test-substansi`
                  )
                }
              >
                Kerjakan Trivia <i className="ri-arrow-right-s-line mr-2"></i>
              </CustomButton>
            </Fragment>
          ) : data.status == "pelatihan" ? (
            <Fragment>
              <CustomButton outline click={() => handleClick("download")}>
                <i className="ri-download-2-fill mr-2"></i>
                Bukti Pendaftaran
              </CustomButton>
            </Fragment>
          ) : data.status == "menunggu" ? (
            <Fragment>
              <CustomButton click={() => handleClick("download")}>
                <i className="ri-download-2-fill mr-2"></i>
                Bukti Pendaftaran
              </CustomButton>
            </Fragment>
          ) : data.status == "lulus pelatihan" ? (
            <Fragment>
              <CustomButton outline click={() => setShowModalSertifikasi(true)}>
                <i className="ri-download-2-fill mr-2"></i>
                Bukti Pendaftaran
              </CustomButton>
              <CustomButton click={() => handleClick("download")}>
                <i className="ri-download-2-fill mr-2"></i>
                Bukti Pendaftaran
              </CustomButton>
            </Fragment>
          ) : data.status == "tes substansi" ? (
            <Fragment>
              <CustomButton outline click={() => handleClick("download")}>
                <i className="ri-download-2-fill mr-2"></i>
                Bukti Pendaftaran
              </CustomButton>
              <CustomButton
                click={() => {
                  router.push(`/peserta/test-substansi/panduan-substansi`);
                }}
                disabled={!data.tes_substansi}
              >
                Test Substansi <i className="ri-arrow-right-s-line mr-2"></i>
              </CustomButton>
            </Fragment>
          ) : data.status == "diterima" ? (
            <Fragment>
              <CustomButton outline click={() => setShowModalSertifikasi(true)}>
                <i className="ri-upload-2-fill mr-2"></i>
                Upload Sertifikasi
              </CustomButton>
              <CustomButton click={() => handleClick("download")}>
                <i className="ri-download-2-fill mr-2"></i>
                Bukti Pendaftaran
              </CustomButton>
            </Fragment>
          ) : data.status.includes("seleksi administrasi") ||
            data.status.includes("seleksi") ? (
            <Fragment>
              <CustomButton outline click={() => handleClick("download")}>
                <i className="ri-download-2-fill mr-2"></i>
                Bukti Pendaftaran
              </CustomButton>
            </Fragment>
          ) : data.status.includes("menunggu") ? (
            <Fragment>
              <CustomButton outline click={() => handleClick("download")}>
                <i className="ri-download-2-fill mr-2"></i>
                Bukti Pendaftaran
              </CustomButton>
            </Fragment>
          ) : data.status.includes("belum tersedia") ? (
            <Fragment>
              <CustomButton outline click={() => handleClick("download")}>
                <i className="ri-download-2-fill mr-2"></i>
                Bukti Pendaftaran
              </CustomButton>
            </Fragment>
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
              uploadSertifikasi(imageSertifikasi, data.id_pendaftaran);
            }}
          >
            Upload
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}
