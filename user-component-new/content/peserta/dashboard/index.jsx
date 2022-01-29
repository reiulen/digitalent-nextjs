import React, { useState, useEffect, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Button, Badge, Modal } from "react-bootstrap";

import style from "../../../../styles/peserta/dashboard.module.css";

import CardPill from "../../../components/global/CardPill";
import CardPage from "../../../components/global/CardPage";
import { useRouter } from "next/router";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";
import Cookies from "js-cookie";
import axios from "axios";
import LoadingTable from "../../../../components/LoadingTable";
import moment from "moment";
import { helperUserStatusColor } from "../../../../utils/middleware/helper";

const Dashboard = ({ session, success }) => {
  const router = useRouter();
  const { error: errorDashboard, dataDashboard } = useSelector(
    (state) => state.dashboardPeserta
  );

  const [labelBerjalan, setLabelBerjalan] = useState("primary");
  const [labelAkhir, setLabelAkhir] = useState("primary");

  useEffect(() => {
    let status = dataDashboard?.pelatihan?.pelatihan_berjalan?.status;
    let statusAkhir = dataDashboard?.pelatihan?.pelatihan_selesi?.status;
    if (status) {
      helperUserStatusColor(status, setLabelBerjalan);
    }
    if (statusAkhir) {
      helperUserStatusColor(statusAkhir, setLabelAkhir);
    }
  }, []);

  const [loadingBeasiswa, setLoadingBeasiswa] = useState(true);

  const [cardPelatihan, setCardPelatihan] = useState([
    {
      key: 1,
      title: "Pelatihan Terkini",
      hover: false,
      mitra: "Gojek",
      status: "open",
    },
    {
      key: 2,
      title: "Pelatihan Sebelumnya",
      hover: false,
      mitra: "Bukalapak",
      status: "close",
    },
  ]);

  const [totalSubvit, setTotalSubvit] = useState(4);
  const [col, setCol] = useState(0);

  useEffect(() => {
    if (dataDashboard?.subvit?.subvit?.status) {
      setCol(col + 1);
    }
    if (dataDashboard?.subvit?.survei?.status) {
      setCol(col + 1);
    }
    if (dataDashboard?.subvit?.trivia?.status) {
      setCol(col + 1);
    }
    if (dataDashboard?.subvit?.sertifikat?.status) {
      setCol(col + 1);
    }

    if (errorDashboard) {
      // toast.error(errorDashboard);
    }
  }, [errorDashboard, totalSubvit]);

  const [simonasData, setSimonasData] = useState([]);
  const [beasiswa, setBeasiswa] = useState([]);
  const [loadingSimonas, setLoadingSimonas] = useState(true);
  const getSimonasData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      };
      const { data } = await axios.get(
        process.env.END_POINT_API_SIMONAS_JOB,
        config
      );
      if (data) {
        setLoadingSimonas(false);
        return setSimonasData(data.data);
      } else {
        return;
      }
    } catch (error) {
      throw error;
    }
  };

  const getBeasiswa = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    };
    const link = process.env.END_POINT_API_BEASISWA_SCHOLARSHIP;
    try {
      const { data } = await axios.get(link, config);
      if (data) {
        setLoadingBeasiswa(false);
        setBeasiswa(data.data);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getSimonasData();
    getBeasiswa();
  }, []);

  const handleHoverCard = (index, status) => {
    let list = [...cardPelatihan];
    list[index].hover = status;

    setCardPelatihan(list);
  };

  return (
    <Fragment>
      <PesertaWrapper padding={"10"}>
        <Row className="mx-1 mt-n14 mt-md-0">
          <CardPill
            background="bg-extras"
            backgroundImg="new-duplicate.svg"
            icon="new/open-book.svg"
            color="#FFFFFF"
            value={dataDashboard?.count[0].count}
            title="Total Pelatihan"
          />
          <CardPill
            background="bg-success"
            backgroundImg="new-award.svg"
            icon="new/done-circle.svg"
            color="#FFFFFF"
            value={dataDashboard?.count[1].count}
            title="Lulus Pelatihan"
          />
          <CardPill
            background="bg-danger"
            backgroundImg="new-shield.svg"
            icon="new/error-circle.svg"
            color="#FFFFFF"
            value={dataDashboard?.count[2].count}
            title="Tidak Lulus Pelatihan"
          />
        </Row>
        <Row className="mx-1">
          {dataDashboard?.subvit?.subvit?.status && (
            <CardPage
              backgroundImage="new-game-4.svg"
              background="primary"
              color="#6C6C6C"
              link={`/peserta/test-substansi/panduan-substansi?no=${dataDashboard?.subvit?.subvit?.pelatihan_id}&id_pelatihan=${dataDashboard?.subvit?.subvit?.pelatihan_id}&id_tema=${dataDashboard?.subvit?.subvit?.tema_id}`}
              text="Lakukan Test Substansi"
              desc="Anda Belum Melakukan Test Substansi"
              total={dataDashboard?.subvit?.subvit?.status}
              isSubvit={true}
              col={col === 1 ? 12 : 6}
            />
          )}

          {dataDashboard?.subvit?.survei.status && (
            <CardPage
              backgroundImage="new-game-3.svg"
              background="success"
              color="#00B27A"
              link={`/peserta/survey/panduan-survey?no=${dataDashboard?.subvit?.survei?.pelatihan_id}&id_pelatihan=${dataDashboard?.subvit?.survei?.pelatihan_id}&id_tema=${dataDashboard?.subvit?.survei?.tema_id}`}
              text="Lakukan Survey"
              desc="Anda Belum Melakukan Test Survey"
              total={dataDashboard?.subvit?.survei.status}
              isSubvit={true}
              col={col === 1 ? 12 : 6}
            />
          )}
          {dataDashboard?.subvit?.trivia.status && (
            <CardPage
              backgroundImage="new-game-1.svg"
              background="danger"
              color="#EE2D41"
              link={`/peserta/trivia/panduan-trivia?no=${dataDashboard?.subvit?.trivia?.pelatihan_id}&id_pelatihan=${dataDashboard?.subvit?.trivia?.pelatihan_id}&id_tema=${dataDashboard?.subvit?.trivia?.tema_id}`}
              text="Lakukan TRIVIA"
              desc="Anda Belum Melakukan TRIVIA"
              total={dataDashboard.subvit?.trivia.status}
              isSubvit={true}
              col={col === 1 ? 12 : 6}
            />
          )}
          {dataDashboard?.subvit?.sertifikat.status && (
            <CardPage
              backgroundImage="new-game-2.svg"
              background="warning"
              color="#FFA800"
              link={`/peserta/riwayat-pelatihan/${dataDashboard?.pelatihan?.pelatihan_selesi?.name
                .split(" ")
                .join("-")
                .toLowerCase()}/sertifikat/${
                dataDashboard?.pelatihan?.pelatihan_selesi?.id
              }`}
              text="Unduh Sertifikat"
              desc="Anda Sudah bisa mengunduh Sertifikat"
              total={dataDashboard?.subvit?.sertifikat.status}
              isSubvit={true}
              col={col === 1 ? 12 : 6}
            />
          )}
        </Row>
        <Row className="mx-1">
          {dataDashboard &&
            dataDashboard?.pelatihan.pelatihan_berjalan.length === 0 && (
              <Col md={6} className="mb-4 px-2 ">
                <Card className="rounded-xl h-100">
                  <Card.Body>
                    <Card.Title>
                      <p className={style.card_title}>Pelatihan Terkini</p>
                    </Card.Title>
                    <div
                      className="text-center"
                      style={{
                        height: "200",
                        paddingTop: "75px",
                        paddingBottom: "75px",
                      }}
                    >
                      <Image
                        src={"/assets/icon/logo-dts-if-empty.png"}
                        alt="Logo DTS"
                        width={214}
                        height={213}
                      />
                      <p>
                        Belum ada pelatihan yang Anda pilih. Silahkan pilih
                        pelatihan terlebih dahulu.
                      </p>
                      <br />
                      <Link href="/" passHref>
                        <Button
                          variant="bg-primary"
                          className="font-weight-bolder text-white rounded-full"
                        >
                          Pilih Pelatihan
                        </Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            )}

          {dataDashboard &&
            Object.keys(dataDashboard?.pelatihan.pelatihan_berjalan).length >
              0 && (
              <Col md={6} className="mb-4 px-2">
                <Card className="rounded-xl h-100 ">
                  <Card.Body className="p-md-9 p-6">
                    <Card.Title>
                      <p className={style.card_title}>Pelatihan Terkini</p>
                    </Card.Title>

                    <Card
                      className="shadow rounded-md mt-4"
                      onClick={() => {
                        router.push(`/peserta/riwayat-pelatihan`);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <Image
                        className={`${style.image_dashboard}`}
                        src={
                          !dataDashboard?.pelatihan?.pelatihan_berjalan
                            ?.gambar ||
                          dataDashboard?.pelatihan?.pelatihan_berjalan
                            ?.gambar === "Beluma ada file"
                            ? `/assets/media/default-card.png`
                            : dataDashboard?.pelatihan.pelatihan_berjalan
                                .gambar &&
                              dataDashboard?.pelatihan?.pelatihan_berjalan
                                ?.file_path +
                                dataDashboard?.pelatihan.pelatihan_berjalan
                                  .gambar
                        }
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = "/assets/media/default-card.png";
                          // e.target = "/assets/media/default-card.png";
                          // e.currentTarget = "/assets/media/default-card.png";
                        }}
                        width={400}
                        height={180}
                        objectFit="cover"
                        alt="image"
                      />
                      <Card.ImgOverlay>
                        <Badge
                          bg={`rounded-xl py-3 px-4 ${style.badge_card}`}
                          className="d-none d-lg-inline-block"
                        >
                          Pelatihan{" "}
                          {
                            dataDashboard?.pelatihan.pelatihan_berjalan
                              .metode_pelatihan
                          }
                        </Badge>
                      </Card.ImgOverlay>
                      <Card.Body className="position-relative p-4 p-md-8">
                        <div className={style.bungkus_mitra_pelatihan}>
                          <Image
                            src={
                              dataDashboard?.pelatihan?.pelatihan_berjalan.logo
                                ? process.env.END_POINT_API_IMAGE_PELATIHAN +
                                  dataDashboard?.pelatihan.pelatihan_berjalan
                                    .logo
                                : dataDashboard?.pelatihan.pelatihan_berjalan
                                    .gambar_mitra
                                ? process.env.END_POINT_API_IMAGE_PARTNERSHIP +
                                  dataDashboard?.pelatihan.pelatihan_berjalan
                                    .gambar_mitra
                                : `/assets/media/default-card.png`
                            }
                            width={62}
                            height={62}
                            objectFit="cover"
                            thumbnail
                            roundedCircle
                            className={`${style.image_card_pelatihan} img-fluild`}
                            alt="Image"
                            onError={(e) => {
                              // console.log(e);
                            }}
                          />
                        </div>
                        <div
                          className="d-flex justify-content-between position-relative pb-0 mb-0"
                          style={{ top: "-15px" }}
                        >
                          <p
                            className={`pl-20 my-0 text-truncate ${style.text_mitra}`}
                          >
                            {dataDashboard?.pelatihan?.pelatihan_berjalan
                              .mitra ||
                              dataDashboard?.pelatihan?.pelatihan_berjalan
                                .penyelenggara ||
                              "-"}
                          </p>
                        </div>

                        <p className={`my-0 ${style.title_card}`}>
                          {dataDashboard?.pelatihan.pelatihan_berjalan.name}
                        </p>
                        <p style={{ fontSize: "14px", color: "#6C6C6C" }}>
                          {dataDashboard?.pelatihan.pelatihan_berjalan.akademi}
                        </p>
                        <hr />
                        <div className="d-flex flex-column">
                          <div className="date d-flex align-items-center align-middle mr-7">
                            <i className="ri-time-line"></i>
                            <span
                              className={`${style.text_date_register} pl-2`}
                            >
                              Pelatihan :{" "}
                              {moment(
                                dataDashboard?.pelatihan.pelatihan_berjalan
                                  .pelatihan_mulai
                              )
                                .utc()
                                .format("DD MMM YYYY")}{" "}
                              -{" "}
                              {moment(
                                dataDashboard?.pelatihan.pelatihan_berjalan
                                  .pelatihan_selesai
                              )
                                .utc()
                                .format("DD MMM YYYY")}{" "}
                            </span>
                          </div>

                          <div className="date d-flex align-items-center align-middle">
                            <i className="ri-history-fill"></i>
                            <span
                              className={`${style.text_date_register} pl-2 text-capitalize`}
                            >
                              Status :{" "}
                              <span
                                style={{ borderRadius: "50px" }}
                                className={`label label-inline label-light-${labelBerjalan} font-weight-bolder p-7 p-md-4 text-center text-capitalize mr-5`}
                              >
                                {dataDashboard?.pelatihan?.pelatihan_berjalan
                                  ?.lpj
                                  ? "Isi LPJ"
                                  : dataDashboard?.pelatihan?.pelatihan_berjalan
                                      ?.survei
                                  ? "Isi Survey"
                                  : dataDashboard?.pelatihan?.pelatihan_berjalan
                                      ?.status == "pelatihan" &&
                                    dataDashboard?.pelatihan?.pelatihan_berjalan
                                      .midtest &&
                                    !dataDashboard?.pelatihan
                                      ?.pelatihan_berjalan.trivia
                                  ? "Kerjakan Mid Test"
                                  : dataDashboard?.pelatihan?.pelatihan_berjalan
                                      ?.status == "pelatihan" &&
                                    dataDashboard?.pelatihan?.pelatihan_berjalan
                                      .trivia
                                  ? "kerjakan trivia"
                                  : dataDashboard?.pelatihan?.pelatihan_berjalan
                                      ?.status == "survey belum tersedia" ||
                                    dataDashboard?.pelatihan?.pelatihan_berjalan.status.includes(
                                      "survey"
                                    )
                                  ? "Isi Survey"
                                  : dataDashboard?.pelatihan?.pelatihan_berjalan?.status.includes(
                                      "LPJ"
                                    ) ||
                                    dataDashboard?.pelatihan?.pelatihan_berjalan.status.includes(
                                      "lpj"
                                    )
                                  ? "Isi LPJ"
                                  : dataDashboard?.pelatihan?.pelatihan_berjalan
                                      ?.status}
                              </span>
                            </span>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Card.Body>
                </Card>
              </Col>
            )}

          {dataDashboard &&
            dataDashboard?.pelatihan.pelatihan_selesi.length === 0 && (
              <Col md={6} className="mb-4 px-2">
                <Card className="rounded-xl h-100">
                  <Card.Body>
                    <Card.Title>
                      <p className={style.card_title}>Pelatihan Sebelumnya</p>
                    </Card.Title>
                    <div
                      className="text-center"
                      style={{
                        height: "200",
                        paddingTop: "75px",
                        paddingBottom: "75px",
                      }}
                    >
                      <Image
                        src={"/assets/icon/logo-dts-if-empty.png"}
                        alt="Logo DTS"
                        width={214}
                        height={213}
                      />
                      <p>Anda tidak memiliki histori pelatihan sebelumnya.</p>
                      <br />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            )}

          {dataDashboard &&
            Object.keys(dataDashboard.pelatihan.pelatihan_selesi).length >
              0 && (
              <Col md={6} className="mb-4 px-2">
                <Card
                  className="rounded-xl h-100"
                  onClick={() => {
                    router.push(`/peserta/riwayat-pelatihan`);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body className="p-md-9 p-6">
                    <Card.Title>
                      <p className={style.card_title}>Pelatihan Sebelumnya</p>
                    </Card.Title>
                    <Card className="shadow rounded-md mt-4">
                      <Image
                        className={`${style.image_dashboard}`}
                        src={`${
                          !dataDashboard?.pelatihan?.pelatihan_selesi?.gambar
                            ? "/assets/media/default-card.png"
                            : dataDashboard?.pelatihan?.pelatihan_selesi
                                ?.file_path +
                              dataDashboard?.pelatihan?.pelatihan_selesi?.gambar
                        }`}
                        width={400}
                        height={180}
                        objectFit="cover"
                        alt="image"
                      />
                      <Card.ImgOverlay>
                        <Badge
                          bg={` rounded-xl py-3 px-4 ${style.badge_card}`}
                          className="d-none d-lg-inline-block"
                        >
                          Pelatihan{" "}
                          {
                            dataDashboard?.pelatihan.pelatihan_selesi
                              .metode_pelatihan
                          }
                        </Badge>
                      </Card.ImgOverlay>
                      <Card.Body className="position-relative">
                        <div className={style.bungkus_mitra_pelatihan}>
                          <Image
                            src={
                              dataDashboard.pelatihan.pelatihan_selesi.logo ===
                                "Belum ada file" ||
                              dataDashboard.pelatihan.pelatihan_selesi
                                .gambar_mitra === "Belum ada file" ||
                              !dataDashboard.pelatihan.pelatihan_selesi.logo ||
                              !dataDashboard.pelatihan.pelatihan_selesi
                                .gambar_mitra
                                ? "/assets/media/default-card.png"
                                : dataDashboard.pelatihan.pelatihan_selesi.logo
                                ? dataDashboard.pelatihan.pelatihan_selesi
                                    .file_path +
                                  dataDashboard.pelatihan.pelatihan_selesi.logo
                                : process.env.END_POINT_API_IMAGE_PARTNERSHIP +
                                  dataDashboard.pelatihan.pelatihan_selesi
                                    .gambar_mitra
                            }
                            width={62}
                            height={62}
                            objectFit="cover"
                            thumbnail
                            roundedCircle
                            className={`${style.image_card_pelatihan} img-fluild`}
                            alt="image"
                          />
                        </div>
                        <div
                          className="d-flex justify-content-between position-relative pb-0 mb-0"
                          style={{ top: "-15px" }}
                        >
                          <p className={`pl-20 my-0 ${style.text_mitra}`}>
                            {dataDashboard?.pelatihan?.pelatihan_selesi.mitra ||
                              dataDashboard?.pelatihan?.pelatihan_selesi
                                .penyelenggara ||
                              "-"}
                          </p>
                        </div>

                        <p className={`my-0 ${style.title_card}`}>
                          {dataDashboard?.pelatihan.pelatihan_selesi.name}
                        </p>
                        <p style={{ fontSize: "14px", color: "#6C6C6C" }}>
                          {dataDashboard?.pelatihan.pelatihan_selesi.akademi}
                        </p>
                        <hr />
                        <div className="d-flex flex-column">
                          <div className="date d-flex align-items-center align-middle mr-7">
                            <i className="ri-time-line"></i>
                            <span
                              className={`${style.text_date_register} pl-2`}
                            >
                              Pelatihan :{" "}
                              {moment(
                                dataDashboard?.pelatihan.pelatihan_selesi
                                  .pelatihan_mulai
                              )
                                .utc()
                                .format("DD MMM YYYY")}{" "}
                              -{" "}
                              {moment(
                                dataDashboard?.pelatihan.pelatihan_selesi
                                  .pelatihan_selesai
                              )
                                .utc()
                                .format("DD MMM YYYY")}{" "}
                            </span>
                          </div>

                          <div className="date d-flex align-items-center align-middle">
                            <i className="ri-history-fill"></i>
                            <span
                              className={`${style.text_date_register} pl-2 text-capitalize`}
                            >
                              Status :{" "}
                              <span
                                style={{ borderRadius: "50px" }}
                                className={`label label-inline label-light-${labelAkhir} font-weight-bolder p-7 p-md-4 text-center text-capitalize mr-5`}
                              >
                                {dataDashboard?.pelatihan?.pelatihan_selesi?.lpj
                                  ? "Isi LPJ"
                                  : dataDashboard?.pelatihan?.pelatihan_selesi
                                      ?.survei
                                  ? "Isi Survey"
                                  : dataDashboard?.pelatihan?.pelatihan_selesi
                                      ?.status == "pelatihan" &&
                                    dataDashboard?.pelatihan?.pelatihan_selesi
                                      .midtest &&
                                    !dataDashboard?.pelatihan?.pelatihan_selesi
                                      .trivia
                                  ? "Kerjakan Mid Test"
                                  : dataDashboard?.pelatihan?.pelatihan_selesi
                                      ?.status == "pelatihan" &&
                                    dataDashboard?.pelatihan?.pelatihan_selesi
                                      .trivia
                                  ? "kerjakan trivia"
                                  : dataDashboard?.pelatihan?.pelatihan_selesi
                                      ?.status == "survey belum tersedia" ||
                                    dataDashboard?.pelatihan?.pelatihan_selesi.status.includes(
                                      "survey"
                                    )
                                  ? "Isi Survey"
                                  : dataDashboard?.pelatihan?.pelatihan_selesi?.status.includes(
                                      "LPJ"
                                    ) ||
                                    dataDashboard?.pelatihan?.pelatihan_selesi.status.includes(
                                      "lpj"
                                    )
                                  ? "Isi LPJ"
                                  : dataDashboard?.pelatihan?.pelatihan_selesi
                                      ?.status}
                              </span>
                            </span>
                          </div>
                        </div>
                        {/* {row.hover != true ? (
                      ) : (
                        <Button
                          className={`btn-block rounded-xl ${style.btn_quick_view}`}
                        >
                          Quick View
                        </Button>
                      )} */}
                      </Card.Body>
                    </Card>
                  </Card.Body>
                </Card>
              </Col>
            )}
        </Row>
        {/* .map simonas & beasiswa */}
        <Row className="mx-1">
          <Col md={6} className="mb-4 px-2">
            <Card className="rounded-xl h-100">
              <Card.Body>
                <Card.Title className="d-flex">
                  <p className={style.card_title}>SIMONAS</p>
                  <div className="ml-auto">
                    <Link href={process.env.PATH_SIMONAS + `/jobs`} passHref>
                      <p
                        className={`d-flex align-items-center ${style.kunjungi_link}`}
                      >
                        Kunjungi{" "}
                        <i
                          className="ri-arrow-right-s-line ml-1"
                          style={{ fontSize: "20px", color: "#203E80" }}
                        ></i>
                      </p>
                    </Link>
                  </div>
                </Card.Title>
                {simonasData && simonasData.length > 0 ? (
                  simonasData?.map((row, i, arr) => (
                    <div
                      key={i}
                      className={`pekerjaan ${
                        arr.length - 1 !== i ? "mb-8" : ""
                      } `}
                      onClick={() => {
                        router.push(row?.url);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="d-flex flex-row">
                        <Image
                          src={
                            !row?.logo
                              ? "/assets/icon/logo-dts-if-empty.png"
                              : row?.logo
                          }
                          objectFit="cover"
                          width={55}
                          height={52}
                          alt={row?.logo}
                        />
                        <div className="pekerjaan-pt ml-7">
                          <p
                            className={`my-0 text-truncate ${style.dashboar_nameBox}`}
                            style={{
                              fontWeight: "600",
                              fontSize: "16px",
                              color: "#6C6C6C",
                            }}
                          >
                            {/* Data Sciense */}
                            {row?.name}
                          </p>
                          <p
                            style={{ fontSize: "14px", color: "#6C6C6C" }}
                            className={`${style.dashboar_nameBox}`}
                          >
                            {row.corporate_name}
                          </p>
                        </div>

                        <div className="pekerjaan-next align-items-center ml-auto">
                          <Link href={row?.url} passHref>
                            <i
                              className="ri-arrow-right-s-line"
                              style={{ fontSize: "24px", color: "#09121F" }}
                            ></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <LoadingTable loading={loadingSimonas} />
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4 px-2">
            <Card className="rounded-xl h-100">
              <Card.Body>
                <Card.Title className="d-flex">
                  <p className={style.card_title}>Beasiswa Kominfo</p>
                  <div className="ml-auto">
                    <Link href={`${process.env.PATH_BEASISWA}`} passHref>
                      <p
                        className={`d-flex align-items-center ${style.kunjungi_link}`}
                      >
                        Kunjungi
                        <i
                          className="ri-arrow-right-s-line ml-1"
                          style={{ fontSize: "20px", color: "#203E80" }}
                        ></i>
                      </p>
                    </Link>
                  </div>
                </Card.Title>
                {beasiswa && beasiswa?.length > 0 ? (
                  beasiswa?.map((row, i, arr) => (
                    <div
                      key={i}
                      className={`pekerjaan ${
                        arr.length - 1 !== i ? "mb-8" : ""
                      } `}
                      onClick={() => {
                        if (row.type == "luar-negeri") {
                          router.push(
                            `${process.env.PATH_BEASISWA}beasiswa/luar-negeri`
                          );
                        } else {
                          router.push(
                            `${process.env.PATH_BEASISWA}beasiswa/dalam-negeri`
                          );
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="d-flex align-items-center justify-content-center">
                        <Image
                          // src="/assets/media/mitra-icon/logo-itb-1.svg"
                          src={
                            !row.logo
                              ? "/assets/icon/logo-dts-if-empty.png"
                              : `${process.env.END_POINT_API_IMAGE_PELATIHAN}/${row.logo}`
                          }
                          width={55}
                          height={55}
                          objectFit="cover"
                          alt={row?.name}
                          className="rounded-full"
                        />
                        <div className="pekerjaan-pt ml-7">
                          <p
                            className={`my-0 text-truncate ${style.dashboar_nameBox}`}
                            style={{
                              fontWeight: "600",
                              fontSize: "16px",
                              color: "#6C6C6C",
                              maxWidth: "14rem",
                            }}
                          >
                            {row.name}
                          </p>
                          <p
                            style={{
                              fontSize: "14px",
                              color: "#6C6C6C",
                              maxWidth: "14rem",
                            }}
                            className="text-truncate"
                          >
                            {row?.study[0]?.name}{" "}
                          </p>
                        </div>

                        <div className="pekerjaan-next align-items-center ml-auto">
                          <Link href="" passHref>
                            <i
                              className="ri-arrow-right-s-line"
                              style={{ fontSize: "24px", color: "#09121F" }}
                            ></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <LoadingTable loading={loadingBeasiswa} />
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </PesertaWrapper>
    </Fragment>
  );
};

export default Dashboard;
