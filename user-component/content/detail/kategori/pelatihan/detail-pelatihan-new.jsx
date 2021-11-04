import React from "react";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import moment from "moment";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import style from "../../../../../styles/peserta/dashboard.module.css";

import TrainingReminder from "../../../../components/TrainingReminder";
import SubHeaderComponent from "../../../../components/template/Subheader.component";
import IconLove from "../../../../../components/assets/icon/Love";
import IconShare from "../../../../../components/assets/icon/Share";
import { checkRegisterPelatihan } from "../../../../../redux/actions/beranda/detail-pelatihan.actions";

const DetailPelatihan = ({ session }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { pelatihan } = useSelector((state) => state.detailPelatihan);

  const handleCheckPelatihanReg = async (id, session) => {
    if (session) {
      const data = await dispatch(checkRegisterPelatihan(id, session.token));

      if (data.status === true) {
        router.push(`/peserta/form-pendaftaran?id=${id}`);
      } else if (data.status === false) {
        let errMessage = data.message;
        toast.error(errMessage);
      }
    } else {
      router.push(`/login`);
    }
  };

  return (
    <>
      <Container fluid className="px-10 py-5">
        <SubHeaderComponent
          data={[{ link: router.asPath, name: pelatihan.name }]}
        />
        <Row>
          <Col md={8}>
            <div className="rounded my-5">
              <div className="ml-2 mb-3 title-pelatihan">
                <h1 className="fw-700 fz-36">{pelatihan.name}</h1>

                <div className="d-flex align-items-center mt-5 mt-md-1">
                  <p className="mr-6 fz-18 fw-500">{pelatihan.akademi}</p>
                  <p className="badgess-green">{pelatihan.Status}</p>
                </div>

                <Row className="mt-8">
                  <Col md={4} sm={6}>
                    <div>
                      <p className="mb-2" style={{ color: "#6C6C6C" }}>
                        Registrasi
                      </p>
                      <p className="fz-16">
                        {moment(pelatihan.pendaftaran_mulai).format(
                          "DD MMM YYYY"
                        )}{" "}
                        -{" "}
                        {moment(pelatihan.pendaftaran_selesai).format(
                          "DD MMM YYYY"
                        )}
                      </p>
                    </div>
                  </Col>

                  <Col md={3} sm={6}>
                    <div>
                      <p className="mb-2" style={{ color: "#6C6C6C" }}>
                        Pelaksanaan
                      </p>
                      <p className="fz-16">{pelatihan.metode_pelatihan}</p>
                    </div>
                  </Col>

                  <Col md={3} sm={6}>
                    <div>
                      <p className="mb-2" style={{ color: "#6C6C6C" }}>
                        Pendaftar
                      </p>
                      <p className="fz-16">{pelatihan.kuota_peserta} Peserta</p>
                    </div>
                  </Col>

                  <Col md={2} sm={6}>
                    <div className="d-flex align-items-center justify-content-md-end">
                      <button className="btn btn-white roundedss-border mr-4">
                        {/* <i className="ri-share-line"></i> */}
                        <IconShare />
                      </button>
                      <button className="btn btn-white roundedss-border">
                        {/* <i className="ri-heart-line"></i> */}
                        <IconLove />
                      </button>
                    </div>
                  </Col>
                </Row>
              </div>
              <div
                style={{ position: "relative", width: "100%", height: "380px" }}
              >
                <Image
                  src={
                    (pelatihan.logo &&
                      process.env.END_POINT_API_IMAGE_BEASISWA +
                        pelatihan.logo) ||
                    "/assets/media/default-card.png"
                  }
                  objectFit="cover"
                  layout="fill"
                  className="rounded-lg"
                />
              </div>
              <div className="p-4 border rounded mt-10">
                <div
                  dangerouslySetInnerHTML={{ __html: pelatihan.deskripsi }}
                ></div>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="border rounded p-6 mb-5 ikuti-pelatihan">
              <h4 className="fz-20 fw-600">Ikuti Pelatihan</h4>
              <span className="fz-16">
                {moment(pelatihan.pelatihan_mulai).format("DD MMM YYYY")} -{" "}
                {moment(pelatihan.pelatihan_selesai).format("DD MMM YYYY")}
              </span>
              <div className="mt-7">
                {pelatihan.status !== "Closed" && (
                  <button
                    className="btn btn-primary-dashboard rounded-pill btn-block fw-500"
                    onClick={() =>
                      handleCheckPelatihanReg(pelatihan.id, session)
                    }
                  >
                    Daftar Pelatihan
                  </button>
                )}
                <button className="btn btn-outline-primary-new rounded-pill btn-block fw-500">
                  <i className="ri-download-cloud-fill"></i>
                  <span>Unduh Silabus</span>
                </button>
              </div>
              <hr className="my-7" />
              <div className="d-flex flex-wrap align-items-start">
                <Image
                  src={`/assets/icon/alamat-1.svg`}
                  width={30}
                  height={30}
                />
                <div className="ml-4">
                  <p className="fw-600 fz-18 mb-2">Alamat</p>
                  <p className="fz-16">{pelatihan.alamat}</p>
                </div>
              </div>
              <div className="d-flex flex-wrap align-items-start mt-4">
                <div className="mt-2">
                  <Image
                    src={`/assets/icon/jam-1.svg`}
                    width={30}
                    height={30}
                  />
                </div>
                <div className="ml-1 col-8">
                  <p className="fw-600 fz-18 mb-2">Jadwal Pelatihan</p>
                  <p className="fz-16">
                    {moment(pelatihan.pelatihan_mulai).format("DD MMM YYYY")} -{" "}
                    {moment(pelatihan.pelatihan_selesai).format("DD MMM YYYY")}
                  </p>
                </div>
              </div>
              <div className="d-flex flex-wrap align-items-start mt-4">
                <Image
                  src={`/assets/icon/kuota-1.svg`}
                  width={30}
                  height={30}
                />

                <div className="ml-4">
                  <p className="fw-600 fz-18 mb-2">Kuota</p>
                  <p className="fz-16">{pelatihan.kuota_pendaftar} peserta</p>
                </div>
              </div>
            </div>
            {/* PEMBATAS */}
            <div className="bg-white border rounded mb-5 p-6">
              <h4 className="fz-20 fw-600 mb-4">Mitra Pelatihan</h4>
              <div className="row">
                <div className="col-12 col-md-2">
                  <div className="dot-bullet-detail">
                    <Image
                      src={
                        (pelatihan.gambar_mitra &&
                          process.env.END_POINT_API_IMAGE_PARTNERSHIP +
                            pelatihan.gambar_mitra) ||
                        "/assets/media/mitra-default.png"
                      }
                      width={60}
                      height={60}
                      objectFit="cover"
                      thumbnail
                      roundedCircle
                      className={`${style.image_card_pelatihan} img-fluild`}
                      alt="Image Mitra"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-10">
                  <div>
                    <p className="fw-600 fz-16 mb-2">{pelatihan.mitra_nama}</p>
                    <p style={{ color: "#6C6C6C" }}>{pelatihan.provinsi}</p>
                  </div>
                </div>
              </div>
            </div>
            <TrainingReminder />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DetailPelatihan;
