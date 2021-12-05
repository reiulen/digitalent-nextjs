import React, { useState, useEffect } from "react";
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

const Dashboard = ({ session, success }) => {
  const router = useRouter();

  const { error: errorDashboard, dataDashboard } = useSelector(
    state => state.dashboardPeserta
  );
  const { count, pelatihan, subvit } = dataDashboard;
  // useEffect(() => {
  //   if (!success) {
  //     router.push("/peserta/wizzard");
  //   }
  // }, [success]);

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
    if (dataDashboard.subvit.subvit.status) {
      setCol(col + 1);
    }
    if (dataDashboard.subvit.survei.status) {
      setCol(col + 1);
    }
    if (dataDashboard.subvit.trivia.status) {
      setCol(col + 1);
    }
    if (dataDashboard.subvit.sertifikat.status) {
      setCol(col + 1);
    }

    if (errorDashboard) {
      toast.error(errorDashboard);
    }
  }, [errorDashboard, totalSubvit]);

  const [simonasData, setSimonasData] = useState([]);
  const [beasiswa, setBeasiswa] = useState([]);

  const getSimonasData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      };
      const { data } = await axios.get(
        "http://api-dts-dev.majapahit.id/simonas/api/job",
        config
      );
      if (data) {
        return setSimonasData(data.data);
      } else {
        return;
      }
    } catch (error) {
      throw error;
    }
  };

  const getBeasiswa = async () => {
    // const link = "https://beasiswa-dev.majapahit.id/api/get-scholarship-data";
    const config = {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    };
    const link =
      "http://api-dts-dev.majapahit.id/beasiswa/api/get-scholarship-data";
    try {
      const { data } = await axios.get(link, config);
      if (data) {
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

  useEffect(() => {
    if (
      !dataDashboard.pelatihan.pelatihan_berjalan.tema_id &&
      !dataDashboard.pelatihan.pelatihan_berjalan.id
    ) {
      return false;
    } else {
      Cookies.set(
        "id_tema",
        dataDashboard.pelatihan.pelatihan_berjalan.tema_id
      );
      Cookies.set(
        "id_pelatihan",
        dataDashboard.pelatihan.pelatihan_berjalan.id
      );
    }
  }, []);

  return (
    <>
      <PesertaWrapper padding={"10"}>
        <Row className="mx-1">
          <CardPill
            background="bg-extras"
            backgroundImg="new-duplicate.svg"
            icon="new/open-book.svg"
            color="#FFFFFF"
            value={count[0].count}
            title="Total Pelatihan"
          />
          <CardPill
            background="bg-success"
            backgroundImg="new-award.svg"
            icon="new/done-circle.svg"
            color="#FFFFFF"
            value={count[1].count}
            title="Lulus Pelatihan"
          />
          <CardPill
            background="bg-danger"
            backgroundImg="new-shield.svg"
            icon="new/error-circle.svg"
            color="#FFFFFF"
            value={count[2].count}
            title="Tidak Lulus Pelatihan"
          />
        </Row>
        <Row className="mx-1">
          {col === 0 && (
            <CardPage
              backgroundImage="new-game-4.svg"
              background="primary"
              color="#6C6C6C"
              link="/"
              text="Pilih Pelatihan"
              desc="Anda Belum Memilih pelatihan, silahkan pilih pelatihan yang Anda inginkan"
              total={true}
              isSubvit={false}
              col={12}
            />
          )}

          {dataDashboard.subvit.subvit.status && (
            <CardPage
              backgroundImage="new-game-4.svg"
              background="primary"
              color="#6C6C6C"
              link={`/peserta/subvit/substansi/1?theme_id=${dataDashboard.subvit.subvit.tema_id}&training_id=${dataDashboard.subvit.subvit.pelatihan_id}&category=Test Substansi`}
              text="Lakukan Test Substansi"
              desc="Anda Belum Melakukan Test Substansi"
              total={dataDashboard.subvit.subvit.status}
              isSubvit={true}
              col={col === 1 ? 12 : 6}
            />
          )}

          {dataDashboard.subvit.survei.status && (
            <CardPage
              backgroundImage="new-game-3.svg"
              background="success"
              color="#00B27A"
              link="/peserta"
              text="Lakukan Survey"
              desc="Anda Belum Melakukan Test Survey"
              total={dataDashboard.subvit.survei.status}
              isSubvit={true}
              col={col === 1 ? 12 : 6}
            />
          )}
          {dataDashboard.subvit.trivia.status && (
            <CardPage
              backgroundImage="new-game-1.svg"
              background="danger"
              color="#EE2D41"
              link="/peserta"
              text="Lakukan TRIVIA"
              desc="Anda Belum Melakukan TRIVIA"
              total={dataDashboard.subvit.trivia.status}
              isSubvit={true}
              col={col === 1 ? 12 : 6}
            />
          )}
          {dataDashboard.subvit.sertifikat.status && (
            <CardPage
              backgroundImage="new-game-2.svg"
              background="warning"
              color="#FFA800"
              link="/peserta"
              text="Unduh Sertifikat"
              desc="Anda Sudah bisa mengunduh Sertifikat"
              total={dataDashboard.subvit.sertifikat.status}
              isSubvit={true}
              col={col === 1 ? 12 : 6}
            />
          )}
        </Row>
        <Row className="mx-1">
          {dataDashboard.pelatihan.pelatihan_berjalan.length === 0 && (
            <Col md={6} className="mb-4 px-2">
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

          {Object.keys(dataDashboard.pelatihan.pelatihan_berjalan).length >
            0 && (
            <Col md={6} className="mb-4 px-2">
              <Card className="rounded-xl h-100">
                <Card.Body>
                  <Card.Title>
                    <p className={style.card_title}>Pelatihan Terkini</p>
                  </Card.Title>

                  <Card
                    className="shadow rounded-md mt-20"
                    onClick={() => {
                      router.push(
                        `/detail/pelatihan/${dataDashboard.pelatihan.pelatihan_berjalan.id}?akademiId=${dataDashboard.pelatihan.pelatihan_berjalan.akademi_id}`
                      );
                    }}
                  >
                    <Image
                      className={`${style.image_dashboard}`}
                      src={
                        `/assets/media/default-card.png` ||
                        (pelatihan.pelatihan_berjalan.gambar &&
                          process.env.END_POINT_API_IMAGE_BEASISWA +
                            pelatihan.pelatihan_berjalan.gambar)
                      }
                      width={400}
                      height={180}
                      objectFit="cover"
                    />
                    <Card.ImgOverlay>
                      <Badge
                        bg={`rounded-xl py-3 px-4 ${style.badge_card}`}
                        className="d-none d-lg-inline-block"
                      >
                        Pelatihan{" "}
                        {pelatihan.pelatihan_berjalan.metode_pelatihan}
                      </Badge>
                    </Card.ImgOverlay>
                    <Card.Body className="position-relative">
                      <div className={style.bungkus_mitra_pelatihan}>
                        <Image
                          src={
                            (pelatihan.pelatihan_berjalan.gambar_mitra &&
                              process.env.END_POINT_API_IMAGE_PARTNERSHIP +
                                pelatihan.pelatihan_berjalan.gambar_mitra) ||
                            (pelatihan.pelatihan_berjalan.logo &&
                              process.env.END_POINT_API_IMAGE_BEASISWA +
                                pelatihan.pelatihan_berjalan.logo) ||
                            `/assets/media/default-card.png`
                          }
                          width={62}
                          height={62}
                          objectFit="cover"
                          thumbnail
                          roundedCircle
                          className={`${style.image_card_pelatihan} img-fluild`}
                          alt="Image"
                        />
                      </div>
                      <div
                        className="d-flex justify-content-between position-relative pb-0 mb-0"
                        style={{ top: "-15px" }}
                      >
                        <p className={`pl-20 my-0 ${style.text_mitra}`}>
                          {pelatihan.pelatihan_berjalan.mitra ||
                            pelatihan.pelatihan_berjalan.penyelenggara ||
                            "-"}
                        </p>
                      </div>

                      <p className={`my-0 ${style.title_card}`}>
                        {pelatihan.pelatihan_berjalan.name}
                      </p>
                      <p style={{ fontSize: "14px", color: "#6C6C6C" }}>
                        {pelatihan.pelatihan_berjalan.akademi}
                      </p>
                      <hr />
                      <div className="d-flex flex-column">
                        <div className="date d-flex align-items-center align-middle mr-7">
                          <i className="ri-time-line"></i>
                          <span className={`${style.text_date_register} pl-2`}>
                            Registrasi :{" "}
                            {moment(
                              pelatihan.pelatihan_berjalan.pendaftaran_mulai
                            ).format("DD MMM YYYY")}{" "}
                            -{" "}
                            {moment(
                              pelatihan.pelatihan_berjalan.pendaftaran_selesai
                            ).format("DD MMM YYYY")}{" "}
                          </span>
                        </div>

                        <div className="date d-flex align-items-center align-middle">
                          <i className="ri-history-fill"></i>
                          <span className={`${style.text_date_register} pl-2`}>
                            Status : {pelatihan.pelatihan_berjalan.status}
                          </span>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Card.Body>
              </Card>
            </Col>
          )}

          {dataDashboard.pelatihan.pelatihan_selesi.length === 0 && (
            <Col md={6} className="mb-4 px-2">
              <Card
                className="rounded-xl h-100"
                onClick={() => {
                  router.push(
                    `/detail/pelatihan/${dataDashboard.pelatihan.pelatihan_selesi.id}?akademiId=${dataDashboard.pelatihan.pelatihan_selesi.akademi_id}`
                  );
                }}
              >
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
                    <Link href="/" passHref>
                      <Button
                        variant="bg-primary"
                        className="font-weight-bolder text-white rounded-full mt-6"
                      >
                        Pilih Pelatihan
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )}

          {Object.keys(dataDashboard.pelatihan.pelatihan_selesi).length > 0 && (
            <Col md={6} className="mb-4 px-2">
              <Card className="rounded-xl h-100">
                <Card.Body>
                  <Card.Title>
                    <p className={style.card_title}>Pelatihan Sebelumnya</p>
                  </Card.Title>

                  <Card className="shadow rounded-md mt-20">
                    <Image
                      className={`${style.image_dashboard}`}
                      src="/assets/media/default-card.png"
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
                        Pelatihan {pelatihan.pelatihan_selesi.metode_pelatihan}
                      </Badge>
                    </Card.ImgOverlay>
                    <Card.Body className="position-relative">
                      <div className={style.bungkus_mitra_pelatihan}>
                        <Image
                          src="/assets/media/logo-filter.svg"
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
                          {pelatihan.pelatihan_selesi.mitra || "-"}
                        </p>
                      </div>

                      <p className={`my-0 ${style.title_card}`}>
                        {pelatihan.pelatihan_selesi.name}
                      </p>
                      <p style={{ fontSize: "14px", color: "#6C6C6C" }}>
                        {pelatihan.pelatihan_selesi.akademi}
                      </p>
                      <hr />
                      <div className="d-flex flex-column">
                        <div className="date d-flex align-items-center align-middle mr-7">
                          <i className="ri-time-line"></i>
                          <span className={`${style.text_date_register} pl-2`}>
                            Registrasi :{" "}
                            {moment(
                              pelatihan.pelatihan_selesi.pendaftaran_mulai
                            ).format("DD MMM YYYY")}{" "}
                            -{" "}
                            {moment(
                              pelatihan.pelatihan_selesi.pendaftaran_selesai
                            ).format("DD MMM YYYY")}{" "}
                          </span>
                        </div>

                        <div className="date d-flex align-items-center align-middle">
                          <i className="ri-history-fill"></i>
                          <span className={`${style.text_date_register} pl-2`}>
                            Status : {pelatihan.pelatihan_selesi.status}
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
                    <Link href="http://simonas-dev.majapahit.id/jobs" passHref>
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
                {simonasData?.map((row, i, arr) => (
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
                            ? "/assets/media/mitra-icon/telkom-1.svg"
                            : row?.logo
                        }
                        objectFit="contain"
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
                        <Link href="/peserta" passHref>
                          <i
                            className="ri-arrow-right-s-line"
                            style={{ fontSize: "24px", color: "#09121F" }}
                          ></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4 px-2">
            <Card className="rounded-xl h-100">
              <Card.Body>
                <Card.Title className="d-flex">
                  <p className={style.card_title}>Beasiswa Kominfo</p>
                  <div className="ml-auto">
                    <Link href="https://beasiswa-dev.majapahit.id/" passHref>
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
                {beasiswa?.map((row, i, arr) => (
                  <div
                    key={i}
                    className={`pekerjaan ${
                      arr.length - 1 !== i ? "mb-8" : ""
                    } `}
                    onClick={() => {
                      if (row.type == "luar-negeri") {
                        router.push(
                          "https://beasiswa-dev.majapahit.id/beasiswa/luar-negeri"
                        );
                      } else {
                        router.push(
                          "https://beasiswa-dev.majapahit.id/beasiswa/dalam-negeri"
                        );
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex flex-row align-items-center">
                      <Image
                        // src="/assets/media/mitra-icon/logo-itb-1.svg"
                        src={
                          !row.logo
                            ? "/assets/media/mitra-icon/logo-itb-1.svg"
                            : `${process.env.END_POINT_API_IMAGE_BEASISWA}/${row.logo}`
                        }
                        width={55}
                        height={52}
                        objectFit="contain"
                        alt={row?.name}
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
                          {row.name}
                        </p>
                        <p style={{ fontSize: "14px", color: "#6C6C6C" }}>
                          S1 psikologi
                        </p>
                      </div>

                      <div className="pekerjaan-next align-items-center ml-auto">
                        <Link href="/peserta" passHref>
                          <i
                            className="ri-arrow-right-s-line"
                            style={{ fontSize: "24px", color: "#09121F" }}
                          ></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </PesertaWrapper>
    </>
  );
};

export default Dashboard;
