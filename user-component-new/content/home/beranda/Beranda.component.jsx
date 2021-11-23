import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { Card, Badge, Button, Container, Row, Col } from "react-bootstrap";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { SweatAlert } from "../../../../utils/middleware/helper";
import { useRouter } from "next/router";

import IconClose from "../../../../components/assets/icon/Close";
import { getTemaByAkademi } from "../../../../redux/actions/beranda/beranda.actions";

import PulseLoaderRender from "../../../components/loader/PulseLoader";

import Carousel from "./section/Carousel.component";
import RilisMedia from "./section/RilisMedia.component";
import GaleriUpdate from "./section/GaleriUpdate.component";
import InfoVideo from "./section/InfoVideo.component";
import ComeJoin from "./section/ComeJoin.component";
import CardPelatihanClose from "../../../components/global/CardPelatihanClose.component";

import ShareOverlay from "../../../components/global/ShareOverlay.component";

const Beranda = ({ session }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { publikasi } = useSelector((state) => state.allPublikasiBeranda);
  const { tema, loading: loadingTema } = useSelector(
    (state) => state.temaByAkademi
  );
  const { akademi } = useSelector((state) => state.allAkademi);

  const [activeTab, setActiveTab] = useState(0);
  const [akademiId, setAkademiId] = useState(null);

  const [pelatihan, setPelatihan] = useState(null);

  const [cardId, setCardId] = useState(null);
  const [cardImage, setCardImage] = useState(null);
  const [cardStatus, setCardStatus] = useState(null);
  const [cardImageMitra, setCardImageMitra] = useState(null);
  const [cardAkademi, setCardAkademi] = useState(null);
  const [cardDeskripsi, setCardDeskripsi] = useState(null);
  const [cardName, setCardName] = useState(null);
  const [cardKuota, setCardKuota] = useState(null);
  const [cardMitra, setCardMitra] = useState(null);
  const [cardAlamat, setCardAlamat] = useState(null);
  const [cardPendaftaranMulai, setCardPendaftaranMulai] = useState(null);
  const [cardPendaftaranSelesai, setCardPendaftaranSelesai] = useState(null);
  const [cardMetode, setCardMetode] = useState(null);
  const textToTrim = 325;

  const optionsSplide = {
    gap: "1rem",
    drag: "free",
    perPage: 4,
    height: "150px",
    type: "loop",
    breakpoints: {
      1262: {
        height: "150px",
      },
      1062: {
        height: "150px",
        perPage: 3,
      },
      833: {
        height: "150px",
        perPage: 2,
      },
      726: {
        height: "150px",
        perPage: 2,
      },
      629: {
        height: "160px",
        perPage: 1,
      },
      590: {
        width: "100",
        height: "120",
        perPage: 1,
      },
      514: {
        width: "100",
        height: "160px",
        perPage: 1,
      },
      450: {
        width: "100",
        height: "150px",
        perPage: 1,
      },
      425: {
        width: "100",
        height: "150px",
        perPage: 1,
      },
      320: {
        width: "100",
        height: "100px",
        perPage: 1,
      },
    },
  };

  useEffect(() => {
    handleAkademiStart();
    handlePelatihanCard();
  }, []);

  useEffect(() => {
    if (tema) {
      handlePelatihanCard();
    }
  }, [tema]);

  const handleAkademiStart = () => {
    if (akademi && akademi.length !== 0) {
      dispatch(getTemaByAkademi(akademi[0].id));
      setAkademiId(akademi[0].id);
    }
  };

  const handleActive = (index, id) => {
    setActiveTab(index);
    setAkademiId(id);
    dispatch(getTemaByAkademi(id));
  };

  const handleMouseEnter = (indexTema, indexPelatihan) => {
    let obj = [...pelatihan];
    for (let i = 0; i < obj.length; i++) {
      for (let j = 0; j < obj[i].pelatihan.length; j++) {
        obj[i].pelatihan[j].hover = false;
        if (i === indexTema && j === indexPelatihan) {
          obj[i].pelatihan[j].hover = true;
        }
      }
    }
    setPelatihan(obj);
  };

  const handleMouseLeave = (indexTema, indexPelatihan) => {
    let obj = [...pelatihan];

    for (let i = 0; i < obj.length; i++) {
      for (let j = 0; j < obj[i].pelatihan.length; j++) {
        if (i === indexTema && j === indexPelatihan) {
          obj[i].pelatihan[j].hover = false;
        }
      }
    }
    setPelatihan(obj);
  };

  const handlePelatihanCard = () => {
    let arr = [];

    if (tema && tema.length !== 0) {
      for (let i = 0; i < tema.length; i++) {
        let obj = {
          id: tema[i].id,
          name: tema[i].Name,
          showDetail: false,
          pelatihan: [],
        };

        if (tema[i].pelatihan !== 0 && tema[i].pelatihan !== null) {
          for (let j = 0; j < tema[i].pelatihan.length; j++) {
            let objPelatihan = {
              id: tema[i].pelatihan[j].id,
              name: tema[i].pelatihan[j].name,
              gambar: tema[i].pelatihan[j].gambar,
              akademi: tema[i].pelatihan[j].akademi,
              tema: tema[i].pelatihan[j].tema,
              alamat: tema[i].pelatihan[j].alamat,
              kuota_peserta: tema[i].pelatihan[j].kuota_peserta,
              metode_pelatihan: tema[i].pelatihan[j].metode_pelatihan,
              gambar_mitra: tema[i].pelatihan[j].gambar_mitra,
              mitra: tema[i].pelatihan[j].mitra,
              pendaftaran_mulai: tema[i].pelatihan[j].pendaftaran_mulai,
              pendaftaran_selesai: tema[i].pelatihan[j].pendaftaran_selesai,
              deskripsi: tema[i].pelatihan[j].deskripsi,
              status: tema[i].pelatihan[j].status,
              kuota_pendaftar: tema[i].pelatihan[j].kuota_pendaftar,
              hover: false,
            };
            obj.pelatihan.push(objPelatihan);
          }
          arr.push(obj);
        } else {
          let objPelatihan = false;
          obj.pelatihan = objPelatihan;
          arr.push(obj);
        }
      }
      setPelatihan(arr);
    }
  };

  const handleQuickView = (
    indexTema,
    image,
    status,
    image_mitra,
    akademi,
    deskripsi,
    name,
    kuota_pendaftar,
    mitra,
    alamat,
    pendaftaran_mulai,
    pendaftaran_selesai,
    id,
    metode_pelatihan
  ) => {
    let obj = [...pelatihan];

    for (let i = 0; i < obj.length; i++) {
      if (i === indexTema) {
        obj[i].showDetail = true;
      }
    }
    setPelatihan(obj);
    setCardId(id);
    setCardImage(image);
    setCardStatus(status);
    setCardImageMitra(image_mitra);
    setCardAkademi(akademi);
    setCardDeskripsi(deskripsi);
    setCardName(name);
    setCardKuota(kuota_pendaftar);
    setCardMitra(mitra);
    setCardAlamat(alamat);
    setCardPendaftaranMulai(pendaftaran_mulai);
    setCardPendaftaranSelesai(pendaftaran_selesai);
    setCardMetode(metode_pelatihan);
  };

  const handleCloseQuickView = (indexTema) => {
    let obj = [...pelatihan];

    for (let i = 0; i < obj.length; i++) {
      if (i === indexTema) {
        obj[i].showDetail = false;
      }
    }
    setPelatihan(obj);
  };

  const handleCheckPelatihanReg = async (id, session) => {
    if (session && session.token) {
      const data = await dispatch(checkRegisterPelatihan(id, session.token));

      if (data.status === true) {
        router.push(`${router.pathname}/peserta/form-pendaftaran?id=${id}`);
      } else if (data.status === false) {
        let errMessage = data.message;
        SweatAlert("Gagal", errMessage, "error");
      }
    } else {
      router.push(`${router.pathname}/login`);
    }
  };

  const PrintTextTrim = (word) => {
    let str = null;
    if (word.length > textToTrim) {
      str = word.slice(0, textToTrim) + "...";
    } else {
      str = word;
    }

    return str;
  };

  return (
    <>
      <section className="image-carousel-new mt-10">
        <Carousel data={publikasi} />
      </section>

      <Container fluid className="px-xl-30 px-lg-10 px-0 py-md-10 pt-3">
        <section className="tema-carousel-new carousel-secondarys">
          {akademi && (
            <Splide options={optionsSplide} hasSliderWrapper>
              {akademi &&
                akademi.map((row, i) => (
                  <SplideSlide key={i}>
                    <div
                      className="d-flex align-items-center h-100"
                      onClick={() => handleActive(i, row.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <div
                        className={`card-1 splide-beranda-new ${
                          activeTab !== i ? "bg-white" : "bg-beranda-primary"
                        }`}
                      >
                        <h1
                          className={`mb-0 mr-2 fw-700 ${
                            activeTab === i && "text-white"
                          }`}
                        >
                          {row.slug}
                        </h1>
                        <div>
                          <p
                            className={`mb-0 ${
                              activeTab === i && "text-white"
                            }`}
                          >
                            {row.name.split(" ").splice(0, 3).join(" ")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SplideSlide>
                ))}
            </Splide>
          )}
        </section>
      </Container>

      <section className="pelatihan-new">
        <Container fluid className="px-xl-40 px-lg-10 px-10 mt-5">
          {loadingTema ? (
            <>
              <div className="container-fluid">
                <div className="row">
                  <PulseLoaderRender />
                </div>
              </div>
            </>
          ) : (
            <div className="pb-10">
              {tema ? (
                tema.map((row, i) => (
                  <>
                    {row.pelatihan !== null && (
                      <div
                        className="d-flex justify-content-between header-pelatihan-new"
                        key={i}
                      >
                        <div className="title-pelatihan">
                          <h1>{row.Name}</h1>
                        </div>
                        <div className="link-pelatihan-new">
                          <Link
                            href={`/detail/akademi/${akademiId}?tema_id=${row.id}`}
                          >
                            <span>Lihat Semua {">"}</span>
                          </Link>
                        </div>
                      </div>
                    )}

                    <div className="card-pelatihan-new mb-10 mt-5">
                      <Row>
                        {pelatihan !== null && pelatihan[i] !== undefined ? (
                          pelatihan[i].showDetail !== true ? (
                            pelatihan[i].pelatihan.length > 0 &&
                            pelatihan[i].pelatihan.map((row, j) => (
                              <Col md={4} className="mb-5" key={j}>
                                <Card
                                  className="h-100 shadow-sm border-0"
                                  onMouseEnter={() => handleMouseEnter(i, j)}
                                  onMouseLeave={() => handleMouseLeave(i, j)}
                                >
                                  {row.status !== "Dibuka" ? (
                                    <CardPelatihanClose row={row} />
                                  ) : (
                                    <>
                                      <div
                                        className={
                                          pelatihan[i].pelatihan[j].hover !==
                                          true
                                            ? `parent-image-pelatihan-new`
                                            : `parent-image-pelatihan-new-hover`
                                        }
                                      >
                                        <Image
                                          className={`image-list-pelatihan-new`}
                                          src={
                                            (row.gambar &&
                                              process.env
                                                .END_POINT_API_IMAGE_BEASISWA +
                                                row.gambar) ||
                                            "/assets/media/default-card.png"
                                          }
                                          layout="fill"
                                          objectFit="cover"
                                          alt="Image Thumbnail"
                                        />
                                      </div>
                                      <Card.ImgOverlay>
                                        <div className="d-flex justify-content-between">
                                          <div className="align-self-start">
                                            <Badge
                                              bg={`py-3 px-4 badge-card-pelatihan-new`}
                                              classNam="d-flex "
                                            >
                                              Pelatihan {row.metode_pelatihan}
                                            </Badge>
                                          </div>

                                          {pelatihan[i].pelatihan[j].hover &&
                                            row.status === "Dibuka" && (
                                              <div className="whishlist align-self-end">
                                                <Button
                                                  variant="light"
                                                  className={`float-right d-flex justify-content-center align-items-center wishlist-card-new`}
                                                >
                                                  <i
                                                    className="ri-heart-line p-0"
                                                    style={{
                                                      color: "#6C6C6C",
                                                    }}
                                                  ></i>
                                                </Button>
                                                <ShareOverlay
                                                  url={`${process.env.PATH_URL}/detail/pelatihan/${row.id}`}
                                                  quote={row.name}
                                                >
                                                  <Button
                                                    variant="light"
                                                    className={`float-right d-flex justify-content-center align-items-center mr-2 wishlist-card-new`}
                                                  >
                                                    <i
                                                      className="ri-share-line p-0"
                                                      style={{
                                                        color: "#6C6C6C",
                                                      }}
                                                    ></i>
                                                  </Button>
                                                </ShareOverlay>
                                              </div>
                                            )}
                                        </div>
                                      </Card.ImgOverlay>
                                      <Card.Body className="position-relative">
                                        <div className="mitra-pelatihan-new">
                                          <Image
                                            src={
                                              (row.gambar_mitra &&
                                                process.env
                                                  .END_POINT_API_IMAGE_PARTNERSHIP +
                                                  row.gambar_mitra) ||
                                              "/assets/media/mitra-default.png"
                                            }
                                            width={60}
                                            height={60}
                                            objectFit="cover"
                                            thumbnail
                                            roundedCircle
                                            className={`mitra-pelatihan-image-new`}
                                            alt="Image Mitra"
                                          />
                                        </div>
                                        <div
                                          className="d-flex justify-content-between position-relative pb-0 mb-0"
                                          style={{ top: "-15px" }}
                                        >
                                          <p
                                            className={`pl-18 my-0 text-mitra-new`}
                                          >
                                            {row.mitra}
                                          </p>
                                          <div className="status align-self-center">
                                            <p
                                              className={`${
                                                row.status === "Open"
                                                  ? "status-mitra-open-new"
                                                  : "status-mitra-close-new"
                                              } text-uppercase my-0`}
                                            >
                                              {row.status}
                                            </p>
                                          </div>
                                        </div>
                                        <p className={`my-0 title-card-new`}>
                                          {row.name}
                                        </p>
                                        <p
                                          style={{
                                            fontSize: "14px",
                                            color: "#6C6C6C",
                                          }}
                                        >
                                          {row.akademi}
                                        </p>
                                        <hr />
                                        {pelatihan[i].pelatihan[j].hover !==
                                        true ? (
                                          <div className="d-flex flex-column">
                                            <div className="date d-flex align-items-center align-middle">
                                              <i className="ri-time-line"></i>
                                              <span
                                                className={`text-date-register-new pl-2`}
                                              >
                                                Registrasi:{" "}
                                                {moment(
                                                  row.pendaftaran_mulai
                                                ).format("DD MMMM YYYY")}{" "}
                                                -{" "}
                                                {moment(
                                                  row.pendaftaran_selesai
                                                ).format("DD MMMM YYYY")}
                                              </span>
                                            </div>
                                            <div className="date d-flex align-items-center align-middle">
                                              <i className="ri-group-line"></i>
                                              <span
                                                className={`text-date-register-new pl-2`}
                                              >
                                                Kuota: {row.kuota_peserta}{" "}
                                                Peserta
                                              </span>
                                            </div>
                                          </div>
                                        ) : (
                                          <div style={{ marginTop: "21px" }}>
                                            <Button
                                              className={`btn-block rounded-xl my-auto btn-quick-view-new`}
                                              onClick={() =>
                                                handleQuickView(
                                                  i,
                                                  row.gambar,
                                                  row.status,
                                                  row.gambar_mitra,
                                                  row.akademi,
                                                  row.deskripsi,
                                                  row.name,
                                                  row.kuota_peserta,
                                                  row.mitra,
                                                  row.alamat,
                                                  row.pendaftaran_mulai,
                                                  row.pendaftaran_selesai,
                                                  row.id,
                                                  row.metode_pelatihan
                                                )
                                              }
                                            >
                                              LIHAT
                                            </Button>
                                          </div>
                                        )}
                                      </Card.Body>
                                    </>
                                  )}
                                </Card>
                              </Col>
                            ))
                          ) : (
                            <>
                              <div className="container-fluid">
                                <div className="row border">
                                  <div className="col-12 col-md-4">
                                    <div
                                      className="position-absolute mt-5"
                                      style={{ zIndex: "100" }}
                                    >
                                      <span className="badgess-lg">
                                        Pelatihan {cardMetode}
                                      </span>
                                    </div>
                                    <div style={{ minHeight: "425px" }}>
                                      <Image
                                        src={
                                          (cardImage &&
                                            process.env
                                              .END_POINT_API_IMAGE_BEASISWA +
                                              cardImage) ||
                                          "/assets/media/default-card.png"
                                        }
                                        alt="image card detail"
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded"
                                      />
                                    </div>
                                  </div>

                                  <div className="col-12 col-md-8">
                                    <div className="py-8 ml-3">
                                      <div className="position-relative d-flex align-items-start justify-content-between">
                                        <div className="d-flex d-flex align-items-start">
                                          <div className="dot-bullet">
                                            <Image
                                              src={
                                                process.env
                                                  .END_POINT_API_IMAGE_PARTNERSHIP +
                                                cardImageMitra
                                              }
                                              layout="fill"
                                              objectFit="cover"
                                            />
                                          </div>
                                          <div className="ml-6">
                                            <p
                                              className="fz-14"
                                              style={{ color: "#6C6C6C" }}
                                            >
                                              {cardAkademi}
                                            </p>
                                            <p className="fz-30 fw-600">
                                              {cardName}
                                            </p>
                                            <p className="fw-600 fz-14">
                                              {cardMitra}
                                            </p>
                                          </div>
                                        </div>

                                        <div className="d-flex align-items-start">
                                          <div className="whislist mr-5">
                                            <Button
                                              variant="light"
                                              className={`float-right d-flex justify-content-center align-items-center wishlist-card-new`}
                                            >
                                              <i
                                                className="ri-heart-line p-0"
                                                style={{
                                                  color: "#6C6C6C",
                                                }}
                                              ></i>
                                            </Button>
                                            <Button
                                              variant="light"
                                              className={`float-right d-flex justify-content-center align-items-center mr-2 wishlist-card-new mr-5`}
                                            >
                                              <i
                                                className="ri-share-line p-0"
                                                style={{
                                                  color: "#6C6C6C",
                                                }}
                                              ></i>
                                            </Button>
                                          </div>

                                          <div
                                            onClick={() =>
                                              handleCloseQuickView(i)
                                            }
                                            className="mr-5"
                                          >
                                            <IconClose className="cursor-pointer" />
                                          </div>
                                        </div>
                                      </div>

                                      <p className="fz-16 fw-400 my-6">
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              PrintTextTrim(cardDeskripsi),
                                          }}
                                        ></div>
                                      </p>

                                      <div className="d-flex align-items-center">
                                        <div className="date d-flex align-items-center align-middle mr-5">
                                          <i className="ri-time-line"></i>
                                          <span
                                            className="ml-6"
                                            style={{ color: "#6C6C6C" }}
                                          >
                                            Registrasi:{" "}
                                            {moment(
                                              cardPendaftaranMulai
                                            ).format("DD MMMM YYYY")}{" "}
                                            -{" "}
                                            {moment(
                                              cardPendaftaranSelesai
                                            ).format("DD MMMM YYYY")}
                                          </span>
                                        </div>
                                        <div className="date d-flex align-items-center align-middle mr-5">
                                          <i className="ri-group-line"></i>
                                          <span style={{ color: "#6C6C6C" }}>
                                            Kuota: {cardKuota}
                                          </span>
                                        </div>
                                        <div className="date d-flex align-items-center align-middle">
                                          <i
                                            className="ri-map-pin-line mr-2"
                                            style={{ color: "#6C6C6C" }}
                                          ></i>
                                          <span
                                            style={{ color: "#6C6C6C" }}
                                            className="d-flex align-items-center"
                                          >
                                            Lokasi: {cardAlamat}
                                          </span>
                                        </div>
                                      </div>

                                      <hr />

                                      <div className="row pt-6">
                                        <div className="col-6">
                                          <Link
                                            href={`/detail/pelatihan/${cardId}`}
                                            passHref
                                          >
                                            <a>
                                              <button className="btn btn-outline-primary-new rounded-pill py-3 px-12 mr-4 w-100 font-weight-bolder">
                                                Lihat Selengkapnya
                                              </button>
                                            </a>
                                          </Link>
                                        </div>

                                        {cardStatus !== "Ditutup" && (
                                          <div className="col-6">
                                            <button
                                              onClick={() =>
                                                handleCheckPelatihanReg(
                                                  cardId,
                                                  session
                                                )
                                              }
                                              className="d-flex justify-content-center  btn-register-peserta btn-sm py-3 px-12 rounded-pill btn-primary w-100"
                                            >
                                              Daftar Pelatihan
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )
                        ) : (
                          <div className="container-fluid">
                            <h1 className="text-center text-muted col-12 font-weight-bolder">
                              Pelatihan Belum Tersedia
                            </h1>
                          </div>
                        )}
                      </Row>
                    </div>
                  </>
                ))
              ) : (
                <div className="mt-20">
                  <div className="row">
                    <h1 className="text-center text-muted col-12 font-weight-bolder">
                      Tema Pelatihan Belum Tersedia
                    </h1>
                  </div>
                </div>
              )}

              {tema && tema.length > 1 && (
                <div className="d-flex justify-content-center mt-20">
                  <Link href={`/detail/akademi/${akademiId}`}>
                    <button className="btn btn-outline-primary-new rounded-pill font-weight-bolder py-3 px-12">
                      Lebih Banyak Tema {">"}
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </Container>
      </section>

      <section className="step-register-new mt-10 mb-20 ">
        <Container fluid className="px-xl-40 px-lg-10 px-10 mt-5">
          <div className="title-step-register text-center">
            <h1>
              Tahapan Pendaftaran <br /> Digital Talent Scholarship
            </h1>
            <Col md={12}>
              <div className="mt-md-20 mt-10 ">
                <img
                  src="/assets/media/image-step-register.png"
                  style={{ width: "100%" }}
                />
              </div>
            </Col>
          </div>
        </Container>
      </section>

      <section className="rilis-media-new">
        <Container fluid className="px-xl-40 px-lg-10 px-10 mt-5">
          <RilisMedia
            berita={
              publikasi && publikasi.berita && publikasi.berita.length !== 0
                ? publikasi.berita
                : null
            }
          />
        </Container>
      </section>

      <section className="galeri-update-new">
        <Container fluid className="px-xl-40 px-lg-10 px-10 mt-5">
          <GaleriUpdate
            gambar={
              publikasi && publikasi.gallery && publikasi.gallery.length !== 0
                ? publikasi.gallery
                : null
            }
          />
        </Container>
      </section>

      <section className="info-vidio-new">
        <Container fluid className="px-xl-40 px-lg-10 px-10 mt-5">
          <InfoVideo
            video={publikasi && publikasi.video ? publikasi.video : null}
          />
        </Container>
      </section>

      <section className="come-join-new">
        <Container fluid className="px-xl-40 px-lg-10 px-10 mt-5">
          <ComeJoin />
        </Container>
      </section>
    </>
  );
};

export default Beranda;
