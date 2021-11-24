import React, { useState, useEffect, Fragment } from "react";
import { Card, Col, Row, Badge, Button, Modal } from "react-bootstrap";
import style from "../style.module.css";
import { useSelector } from "react-redux";
import PesertaWrapper from "../../../../components/wrapper/Peserta.wrapper";
import axios from "axios";
import Swal from "sweetalert2";

export default function RiwayatPelatihanDetail(props) {
  const { state: data } = useSelector(
    (state) => state.getDetailRiwayatPelatihanPeserta
  );
  console.log(data);
  const [description, setDescription] = useState(data?.deskripsi || "-");
  const dateFrom = moment(data?.pendaftaran_mulai).format("LL");
  const dateTo = moment(data?.pendaftaran_selesai).format("LL");
  const [showModalSertifikasi, setShowModalSertifikasi] = useState(false);
  const [fileName, setFileName] = useState();

  const [truncate, setTruncate] = useState(true);
  const [label, setLabel] = useState();

  useEffect(() => {
    if (data?.status.includes("menunggu")) {
      setLabel("warning");
    } else if (data?.status == "pelatihan") {
      setLabel("primary");
    } else {
      setLabel("success");
    }
  }, []);
  const [imageSertifikasi, setImageSertifikasi] = useState();
  const [statusSertifikasi, setStatusSertifikasi] = useState(1);
  const config = {
    headers: {
      authorization: "Bearer " + props.session.token,
    },
  };
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
      console.log(error);
      Swal.fire("Gagal", `${error.response.data.message}`, "error");
    }
  };

  return (
    <PesertaWrapper>
      <Col lg={12} className="px-0">
        <Card className="card-custom card-stretch gutter-b p-0">
          <Row className="p-10 m-0">
            <Col lg={8} className="d-flex align-items-start">
              <h1
                className="font-weight-bolder my-0"
                style={{ fontSize: "32px" }}
              >
                {data?.name}
              </h1>
              <div className="text-muted "></div>
            </Col>
            <Col lg={4} className=" d-flex justify-content-end">
              <span
                className={`label label-inline label-light-${label} font-weight-bold text-capitalize`}
                style={{ borderRadius: "25px" }}
              >
                {data?.status == "diterima" ? "lulus pelatihan" : data?.status}
              </span>
            </Col>
            <Col lg={12} className=" my-5">
              <span
                className="p-0 font-weight-bolder"
                style={{ fontSize: "18px", color: "#6C6C6C" }}
              >
                {data?.akademi}
              </span>
            </Col>
            <Col lg={12} className="mt-12">
              <p style={{ fontSize: "14px" }}>Lokasi Pelatihan</p>
              <p style={{ fontSize: "16px" }}>{data?.alamat}</p>
            </Col>
            <Col lg={6}>
              <p style={{ fontSize: "14px" }}>Jadwal Pelatihan</p>
              <p style={{ fontSize: "16px" }}>
                {dateFrom} - {dateTo}
              </p>
            </Col>
            <Col lg={6}>
              <p style={{ fontSize: "14px" }}>Kuota</p>
              <p style={{ fontSize: "16px" }}>{data?.kuota_peserta} Peserta</p>
            </Col>
            <Col md={12} className="py-10 ">
              <Row>
                {data?.status.includes("tidak") ? (
                  ""
                ) : data?.status.includes("lulus") ? (
                  <Fragment>
                    <Col className="d-flex justify-content-center ">
                      <Button
                        className={`btn-rounded-full font-weight-bold btn-block justify-content-center mt-5 ${style.background_outline_primary}`}
                        style={{ height: "40px", fontSize: "14px" }}
                      >
                        <i className="ri-download-2-fill mr-2"></i>
                        Download Sertifikat
                      </Button>
                    </Col>
                    <Col className="d-flex justify-content-center ">
                      <Button
                        className={`btn-rounded-full font-weight-bold btn-block justify-content-center mt-5 `}
                        style={{ height: "40px", fontSize: "14px" }}
                        onClick={() => {
                          setShowModalSertifikasi(true);
                        }}
                      >
                        <i className="ri-upload-2-fill mr-2"></i>
                        Unggah Sertifikasi
                      </Button>
                    </Col>
                  </Fragment>
                ) : (
                  ""
                )}
              </Row>

              <hr className="my-12" />
              <img
                height={360}
                width={"100%"}
                // layout="fill"
                src={
                  data?.gambar
                    ? `${process.env.END_POINT_API_IMAGE_BEASISWA}${data?.gambar}`
                    : "/assets/media/default-card.png"
                }
                // objectFit="cover"
                className={`rounded-xl`}
                style={{ objectFit: "cover" }}
                alt="pictures1"
              />

              <Card className="my-12">
                <Card.Body style={{ fontSize: "14px" }} className="p-7">
                  <div
                    className="text-truncate"
                    style={
                      truncate ? { height: "260px" } : { height: "max-content" }
                    }
                    dangerouslySetInnerHTML={{ __html: description }}
                  ></div>
                  {truncate && (
                    <a className="btn p-0 text-left text-primary">
                      <div
                        className="my-5"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setTruncate(!truncate);
                        }}
                      >
                        Baca Selengkapnya
                      </div>
                    </a>
                  )}
                </Card.Body>
              </Card>
              <Row>
                <Col>
                  <p
                    className="font-weight-bolder"
                    style={{ fontSize: "16px" }}
                  >
                    Silabus Pelatihan
                  </p>
                  <Button
                    className={`rounded-full font-weight-bold btn-block justify-content-center mt-5 ${style.background_outline_primary}`}
                    style={{
                      height: "40px",
                      fontSize: "14px",
                      fontFamily: "poppins",
                    }}
                  >
                    <i
                      className={`ri-download-cloud-fill mr-2 `}
                      style={{ color: "#007cff" }}
                    ></i>
                    Unduh Silabus
                  </Button>
                </Col>
                <Col className="px-10">
                  <p
                    style={{ fontSize: "16px" }}
                    className="font-weight-bolder"
                  >
                    Mitra Pelatihan
                  </p>
                  <div className="d-flex">
                    <img
                      src={
                        data?.gambar_mitra
                          ? `${process.env.END_POINT_API_IMAGE_LOGO_MITRA}${data?.gambar_mitra}`
                          : "/assets/media/default-card.png"
                      }
                      width={58}
                      height={58}
                      alt="test2"
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                    <div className="flex-column justify-content-around d-flex mx-5">
                      <div
                        className="font-weight-bolder"
                        style={{ fontSize: "14px" }}
                      >
                        {data?.mitra || "-"}
                      </div>
                      <div style={{ fontSize: "12px" }}>Indonesia</div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
      {/* <Administrasi /> */}
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
              uploadSertifikasi(imageSertifikasi, data?.id_pendaftaran);
            }}
          >
            Upload
          </button>
        </Modal.Footer>
      </Modal>
    </PesertaWrapper>
  );
}
