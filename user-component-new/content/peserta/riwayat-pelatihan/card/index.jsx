import style from "../style.module.css";

import CustomButton from "./Buttons/CustomButton.jsx";

import React, { useState, useEffect, Fragment } from "react";
import { Col, Row, Card, Button, Modal } from "react-bootstrap";

import moment from "moment";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

export default function CardTemplateOriginal({ data, session }) {
  const router = useRouter();
  const dateFrom = moment(data.pendaftaran_mulai).format("LL");
  const dateTo = moment(data.pendaftaran_selesai).format("LL");
  const [showModalSertifikasi, setShowModalSertifikasi] = useState(false);
  const [label, setLabel] = useState();

  const { error: errorDataPribadi, dataPribadi } = useSelector(
    (state) => state.getDataPribadi
  );

  useEffect(() => {
    if (data.status.includes("tidak") || data.status.includes("ditolak"))
      return setLabel("danger");
    if (data.status.includes("menunggu") || data.status.includes("seleksi")) 
      return setLabel("warning");
    if (
      data.status.includes("seleksi administrasi") ||
      data.status.includes("menunggu") ||
      data.status.includes("belum tersedia")
    )
      return setLabel("warning");
    if (data.status.includes("lulus") || data.status.includes("Lulus"))
      return setLabel("success");
    if (
      data.status == "survey belum tersedia" ||
      data.status == "LPJ belum tersedia" ||
      data.status.includes("tes substansi") ||
      data.status.includes("pelatihan") ||
      data.status.includes("LPJ") ||
      data.status.includes("survey")
    )
      return setLabel("primary");
    else return setLabel("primary");
  }, []);
  const [imageSertifikasi, setImageSertifikasi] = useState();
  const [statusSertifikasi, setStatusSertifikasi] = useState(1);
  const config = {
    headers: {
      authorization: "Bearer " + session.token,
    },
  };
  const uploadSertifikasi = async (sertifikasi, id) => {
    try {
      const link = `${process.env.END_POINT_API_PELATIHAN}api/v1/formPendaftaran/update-sertifikat`;
      const body = {
        id: +id,
        sertifikasi: statusSertifikasi.toString(),
        file_sertifikat: sertifikasi,
      };

      const { data } = await axios.post(link, body, config);
      if (data) {
        Swal.fire(data.message, "Berhasil upload sertifikasi", "success");
      }
    } catch (error) {
      Swal.fire("Gagal", `${error.response.data.message}`, "error");
    }
  };

  const handleClick = async (name, id) => {
    if (name == "download") {
      try {
        const { data } = await axios.get(
          `${process.env.END_POINT_API_PELATIHAN}api/v1/formPendaftaran/export-pdf?id=${id}`,
          config
        );
        if (data) {
          // const a = document.createElement("a");
          // a.href = data.data;
          // a.download = "Bukti Pendaftaran.pdf";
          // document.body.appendChild(a);
          // a.click();
          // document.body.removeChild(a);

          const link = document.createElement("a");
          link.download = `Form Pendaftaran.pdf`;
          // link.target = "_blank";
          link.href = data.data;
          link.click();
        }
      } catch (error) {
        Swal.fire("Gagal", `${error.response.data.message}`, "error");
      }

      // anchor.href = data.
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
              if(data.status.includes("tidak"))
              return false
              if (data.status.includes("menunggu jadwal tes substansi")) {
                Cookies.set("id_pelatihan", data.id);
                Cookies.set("id_tema", data.tema_id);
                return router.push(`/peserta/test-substansi`);
              }

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
                return router.push("/peserta/test-substansi");
              } else {
                Cookies.set("id_pelatihan", data.id);
                Cookies.set("id_tema", data.tema_id);
                return router.push(
                  `/peserta/riwayat-pelatihan/${data.name
                    .split(" ")
                    .join("-")
                    .toLowerCase()}`
                );
              }
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
                  <Col lg={7} className="my-auto order-3 order-lg-2 row p-0 ">
                    <h4 className="font-weight-bolder d-flex justify-content-start justify-content-lg-start my-0 p-0 col-12 order-1 order-lg-1">
                      {data.name}
                    </h4>
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
                        ? "Kerjakan LPJ"
                        : data.survei
                        ? "Kerjakan Survei"
                        : data.status == "pelatihan" &&
                          data.midtest &&
                          !data.trivia
                        ? "Kerjakan Mid Test"
                        : data.status == "pelatihan" && data.trivia
                        ? "kerjakan trivia"
                        : data.status == "survey belum tersedia"
                        ? "Isi survei"
                        : data.status.includes("LPJ")
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
                      <span className={` pl-2`}>Lokasi : {data.alamat}</span>
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
          {data.lpj ? (
            <Fragment>
               <CustomButton
                outline
                click={() => handleClick("download", data.id_pendaftaran)}
              >
                <i className="ri-download-2-fill mr-2"></i>
                Bukti Pendaftaran
              </CustomButton>
              <CustomButton
                click={() => {
                  Cookies.set("id_pelatihan", data.id);
                  Cookies.set("id_tema", data.tema_id);
                  router.push(`/peserta/form-lpj`);
                }}
              >
                <i className="ri-file-text-line mr-2"></i>
                Isi Laporan Pertangungjawaban
              </CustomButton>
            </Fragment>
          ) : data.survei || data.status == "survey belum tersedia" ? (
            <Fragment>
              <CustomButton
                outline
                click={() => handleClick("download", data.id_pendaftaran)}
              >
                <i className="ri-download-2-fill mr-2"></i>
                Bukti Pendaftaran
              </CustomButton>

              <CustomButton
                disabled={!data.survei}
                click={() => {
                  router.push("/peserta/survey");
                  Cookies.set("id_pelatihan", data.id);
                  Cookies.set("id_tema", data.tema_id);
                }}
              >
                Isi Survei
                <i className="ri-arrow-right-s-line mr-2"></i>
              </CustomButton>
            </Fragment>
          ) : data.lpj || data.status == "LPJ belum tersedia" ? (
            <Fragment>
              <CustomButton
                outline
                click={() => handleClick("download", data.id_pendaftaran)}
              >
                <i className="ri-download-2-fill mr-2"></i>
                Bukti Pendaftaran
              </CustomButton>
              <CustomButton
                disabled={!data.lpj}
                click={() => handleClick("download", data.id_pendaftaran)}
              >
                Isi Laporan Pertangung Jawaban
                <i className="ri-arrow-right-s-line mr-2"></i>
              </CustomButton>
            </Fragment>
          ) : data.status == "pelatihan" && data.trivia && data.midtest ? (
            <Fragment>
              <CustomButton
                click={() => {
                  router.push(`/peserta/mid-test/panduan-mid-test`);
                  Cookies.set("id_pelatihan", data.id);
                  Cookies.set("id_tema", data.tema_id);
                }}
              >
                Kerjakan Mid Test
                <i className="ri-arrow-right-s-line mr-2"></i>
              </CustomButton>
              <CustomButton
                click={() => {
                  router.push(`/peserta/trivia`);
                  Cookies.set("id_pelatihan", data.id);
                  Cookies.set("id_tema", data.tema_id);
                }}
              >
                Kerjakan Trivia <i className="ri-arrow-right-s-line mr-2"></i>
              </CustomButton>
            </Fragment>
          ) :
           data.status == "pelatihan" && data.midtest ? (
            <Fragment>
              <CustomButton
                click={() => {
                  router.push(`/peserta/mid-test/panduan-mid-test`);
                  Cookies.set("id_pelatihan", data.id);
                  Cookies.set("id_tema", data.tema_id);
                }}
              >
                Kerjakan Mid Test
                <i className="ri-arrow-right-s-line mr-2"></i>
              </CustomButton>
            </Fragment>
          ) :
          data.status == "pelatihan" && data.trivia ? (
            <Fragment>
              <CustomButton
                click={() => {
                  router.push(`/peserta/trivia`);
                  Cookies.set("id_pelatihan", data.id);
                  Cookies.set("id_tema", data.tema_id);
                }}
              >
                Kerjakan Trivia <i className="ri-arrow-right-s-line mr-2"></i>
              </CustomButton>
            </Fragment>
          ) : data.status == "pelatihan" ? (
            <Fragment>
              <CustomButton
                outline
                click={() => handleClick("download", data.id_pendaftaran)}
              >
                <i className="ri-download-2-fill mr-2"></i>
                Bukti Pendaftaran
              </CustomButton>
            </Fragment>
          ) : data.status == "menunggu" ? (
            <Fragment>
              <CustomButton
                click={() => handleClick("download", data.id_pendaftaran)}
              >
                <i className="ri-download-2-fill mr-2"></i>
                Bukti Pendaftaran
              </CustomButton>
            </Fragment>
          ) : data.status == "lulus pelatihan" ||
            data.status == "Lulus Pelatihan" ? (
            <Fragment>
              {data.sertifikasi == "1" && (
                <CustomButton
                  outline
                  click={() => setShowModalSertifikasi(true)}
                >
                  <i className="ri-upload-2-fill mr-2"></i>
                  Upload Sertifikasi
                </CustomButton>
              )}
              <CustomButton
                click={() => {
                  router.push(
                    `/peserta/riwayat-pelatihan/${data.name
                      .split(" ")
                      .join("-")
                      .toLowerCase()}/sertifikat/${data.id}`
                  );
                }}
              >
                <i className="ri-download-2-fill mr-2"></i>
                Lihat Sertifikat
              </CustomButton>
            </Fragment>
          ) : data.status == "tes substansi" ? (
            <Fragment>
              <CustomButton
                outline
                click={() => handleClick("download", data.id_pendaftaran)}
              >
                <i className="ri-download-2-fill mr-2"></i>
                Bukti Pendaftaran
              </CustomButton>
              <CustomButton
                click={() => {
                  Cookies.set("id_pelatihan", data.id);
                  Cookies.set("id_tema", data.tema_id);
                  router.push(`/peserta/test-substansi/panduan-substansi`);
                }}
                disabled={!data.tes_subtansi}
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
              <CustomButton
                click={() => handleClick("download", data.id_pendaftaran)}
              >
                <i className="ri-download-2-fill mr-2"></i>
                Bukti Pendaftaran
              </CustomButton>
            </Fragment>
          ) : data.status.includes("seleksi administrasi") ||
            data.status.includes("seleksi") ? (
            <Fragment>
              <CustomButton
                outline
                click={() => handleClick("download", data.id_pendaftaran)}
              >
                <i className="ri-download-2-fill mr-2"></i>
                Bukti Pendaftaran
              </CustomButton>
            </Fragment>
          ) : data.status.includes("menunggu") ? (
            <Fragment>
              <CustomButton
                outline
                click={() => handleClick("download", data.id_pendaftaran)}
              >
                <i className="ri-download-2-fill mr-2"></i>
                Bukti Pendaftaran
              </CustomButton>
            </Fragment>
          ) : data.status.includes("belum tersedia") ? (
            <Fragment>
              <CustomButton
                outline
                click={() => handleClick("download", data.id_pendaftaran)}
              >
                <i className="ri-download-2-fill mr-2"></i>
                Bukti Pendaftaran
              </CustomButton>
            </Fragment>
          ) : data.status === "LPJ belum mengerjakan" ? (
            <Fragment>
              <CustomButton
                disabled
                outline
                click={() => handleClick("download", data.id_pendaftaran)}
              >
                <i className="ri-file-text-line mr-2"></i>
                Isi Laporan Pertangungjawaban
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
