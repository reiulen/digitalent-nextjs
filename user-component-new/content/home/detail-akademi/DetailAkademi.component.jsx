import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";
import moment from "moment";
import DatePicker from "react-datepicker";
import Select from "react-select";

import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Form,
  Badge,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import FilterBar from "../../../../components/FilterBar";
import BreadcrumbComponent from "../../../components/global/Breadcrumb.component";
import TrainingReminder from "../../../components/global/TrainingReminder.component";
import HomeWrapper from "../../../components/wrapper/Home.wrapper";

import style from "../../../../../styles/peserta/dashboard.module.css";

import IconClose from "../../../../components/assets/icon/Close";
import IconLove from "../../../../components/assets/icon/Love";
import IconShare from "../../../../components/assets/icon/Share";
import IconTime from "../../../../components/assets/icon-dashboard-peserta/Time";
import IconPeserta from "../../../../components/assets/icon-dashboard-peserta/Peserta";
import { SweatAlert } from "../../../../utils/middleware/helper";

import PulseLoaderRender from "../../../../components/loader/PulseLoader";
import { checkRegisterPelatihan } from "../../../../redux/actions/beranda/detail-pelatihan.actions";
import { getAllPelatihanByAkademi } from "../../../../redux/actions/beranda/detail-akademi.actions";

const DetailAkademi = ({ session }) => {
  const { akademi } = useSelector((state) => state.detailAkademi);

  const { pelatihan, loading: loadingPelatihan } = useSelector(
    (state) => state.allPelatihan
  );
  const { loading: loadingPenyeleggara, penyelenggara: allPenyelenggara } =
    useSelector((state) => state.allPenyelenggaraPeserta);

  const textToTrim = 200;
  const dispatch = useDispatch();
  const router = useRouter();

  const { id, tema_id } = router.query;

  const [show, setShow] = useState([]);
  const [showDetail, setShowDetail] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [oldAkademiDesc, setOldAkademiDesc] = useState(null);
  const [akademiId, setAkademiId] = useState(null);
  const [akademiName, setAkademiName] = useState(null);
  const [akademiDesc, setAkademiDesc] = useState(null);
  const [temaId, setTemaId] = useState(null);
  const [seeMoreStatus, setSeeMoreStatus] = useState(false);

  const [filterPenyelenggara, setFilterPenyelenggara] = useState(null);
  const [filterKategori, setFilterKategori] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  let selectRefKategoriPeserta = null;
  const optionsKategoriPeserta = [
    { value: "umum", label: "Umum" },
    { value: "disabilitas", label: "Disabilitas" },
  ];

  let selectRefPenyelenggara = null;
  const optionsPenyelenggara = [];
  if (allPenyelenggara && allPenyelenggara.data) {
    for (let index = 0; index < allPenyelenggara.data.length; index++) {
      let val = {
        value: allPenyelenggara.data[index].id,
        label: allPenyelenggara.data[index].label,
      };
      optionsPenyelenggara.push(val);
    }
  }

  const customStylesSide = {
    control: (styles) => ({
      ...styles,
      borderRadius: "30px",
      paddingLeft: "10px",
    }),
  };

  useEffect(() => {
    handleHoverCard();
    handleTextTrim();
  }, []);

  const handleTextTrim = () => {
    if (akademi) {
      let str = null;

      if (akademi.deskripsi.length > textToTrim) {
        str = akademi.deskripsi.slice(0, textToTrim) + "...";
      }

      setAkademiDesc(str);
      setAkademiId(akademi.id);
      setOldAkademiDesc(akademi.deskripsi);
    }
  };

  const handleShowMoreText = (status) => {
    setSeeMoreStatus(status);
  };

  const handleHoverCard = () => {
    let arr = [...show];

    if (
      pelatihan !== undefined &&
      pelatihan.list &&
      pelatihan.list.length !== 0
    ) {
      for (let i = 0; i < pelatihan.list.length; i++) {
        arr.push(false);
      }

      setShow(arr);
      setShowDetail(arr);
    }
  };

  const handleMouseEnter = (index) => {
    let arr = [...show];

    for (let i = 0; i < arr.length; i++) {
      if (i === index) {
        arr.splice(i, 1, true);
      }
    }

    setShow(arr);
  };

  const handleMouseLeave = (index) => {
    let arr = [...show];

    for (let i = 0; i < arr.length; i++) {
      if (i === index) {
        arr.splice(i, 1, false);
      }
    }
    setShow(arr);
  };

  const handleQuickView = (index) => {
    let arr = [...showDetail];

    for (let i = 0; i < arr.length; i++) {
      if (i === index) {
        arr.splice(i, 1, true);
      }
    }
    setShowDetail(arr);

    let arrShow = [...show];
    for (let i = 0; i < arrShow.length; i++) {
      if (i === index) {
        arrShow.splice(i, 1, false);
      }
    }
    setShow(arrShow);
  };

  const handleCloseQuickView = (index) => {
    let arr = [...showDetail];

    for (let i = 0; i < arr.length; i++) {
      if (i === index) {
        arr.splice(i, 1, false);
      }
    }

    setShowDetail(arr);
  };

  const handleCheckPelatihanReg = async (id, session) => {
    if (session.Token) {
      const data = await dispatch(checkRegisterPelatihan(id, session.Token));

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

  const printTextTrim = (str) => {
    let result = null;

    if (str.length > textToTrim) {
      result = str.slice(0, textToTrim) + "...";
    } else {
      result = str;
    }

    return result;
  };

  const handlePagination = (pageNumber) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setActivePage(pageNumber);
    let provinsi = null;
    let tipe_pelatihan = null;
    let penyelenggara = null;
    let kategori_peserta = null;
    let kata_kunci = null;
    let tanggal_mulai = null;
    let tanggal_akhir = null;
    let page = pageNumber;

    dispatch(
      getAllPelatihanByAkademi(
        id,
        tema_id,
        provinsi,
        tipe_pelatihan,
        penyelenggara,
        kategori_peserta,
        kata_kunci,
        tanggal_mulai,
        tanggal_akhir,
        page
      )
    );
  };

  const handleFilter = () => {
    let data = {
      akademi_id: id,
      tema_id: tema_id || null,
      kota: null,
      penyelenggara:
        filterPenyelenggara !== null ? filterPenyelenggara.label : null,
      kategori_peserta: filterKategori !== null ? filterKategori.value : null,
      tanggal_mulai: startDate,
      tanggal_akhir: endDate,
    };

    dispatch(
      getAllPelatihanByAkademi(
        data.akademi_id,
        data.tema_id,
        data.kota,
        null,
        data.penyelenggara,
        data.kategori_peserta,
        data.tanggal_mulai,
        data.tanggal_akhir,
        1
      )
    );
  };

  const handleReset = () => {
    setFilterPenyelenggara(null);
    selectRefPenyelenggara.select.clearValue();
    setFilterKategori(null);
    selectRefKategoriPeserta.select.clearValue();
    setStartDate("");
    setEndDate("");
    dispatch(
      getAllPelatihanByAkademi(id, null, null, null, null, null, null, null, 1)
    );
  };
  return (
    <>
      <HomeWrapper>
        <BreadcrumbComponent
          data={[{ link: router.asPath, name: akademi.name }]}
        />
        <section className={`card-akademi`}>
          <Card className="rounded-xl">
            <Card.Body>
              <Row>
                <Col md={2} className="text-md-center mb-lg-0 mb-5">
                  <Image
                    src={
                      (akademi &&
                        akademi.logo &&
                        process.env.END_POINT_API_IMAGE_BEASISWA +
                          akademi.logo) ||
                      `/assets/media/logo-vsga-1.svg`
                    }
                    width={150}
                    height={150}
                    objectFit="contain"
                    alt=" Image Logo"
                  />
                </Col>
                <Col md={10}>
                  <Card.Title className="mb-5">
                    <h2>
                      {akademi.name} ({akademi.slug})
                    </h2>
                  </Card.Title>
                  <Card.Text>
                    {seeMoreStatus === false ? (
                      <>
                        <div
                          dangerouslySetInnerHTML={{ __html: akademiDesc }}
                        ></div>
                        <div
                          className="my-2 text-primary"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleShowMoreText(true)}
                        >
                          Lihat Selengkapnya ...
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          dangerouslySetInnerHTML={{ __html: oldAkademiDesc }}
                        ></div>
                        <div
                          className="my-2 text-primary"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleShowMoreText(false)}
                        >
                          Lihat Lebih Sedikit
                        </div>
                      </>
                    )}
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </section>

        <section className={`card-filter-bar`}>
          <FilterBar />
        </section>

        <section className={`content-detail mt-4`}>
          <Row>
            <Col md={4} className="mb-5">
              <TrainingReminder session={session} />
              <div className="filter-content border p-10">
                <div className="d-flex align-items-center mb-3 filter-title">
                  <div>
                    <Image
                      src={`/assets/media/logo-filter.svg`}
                      width={32}
                      height={32}
                    />
                  </div>

                  <h4 className="fw-600 fz-20 ml-4">Filter</h4>
                </div>
                <div className="filter-body mt-7">
                  <Form.Group className="mb-5 w-100 rounded-xl mr-4">
                    <Form.Label className="fz-14">Penyelenggara</Form.Label>
                    <Select
                      ref={(ref) => (selectRefPenyelenggara = ref)}
                      options={optionsPenyelenggara}
                      styles={customStylesSide}
                      placeholder="Pilih Penyelenggara"
                      isClearable
                      onChange={(e) => setFilterPenyelenggara(e)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-5 w-100 rounded-xl mr-4">
                    <Form.Label className="fz-14">Kategori Peserta</Form.Label>
                    <Select
                      ref={(ref) => (selectRefKategoriPeserta = ref)}
                      options={optionsKategoriPeserta}
                      styles={customStylesSide}
                      placeholder="Pilih Kategori Peserta"
                      isClearable
                      onChange={(e) => setFilterKategori(e)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-5 w-100 rounded-xl mr-4">
                    <Form.Label className="fz-14">
                      Tanggal Mulai Pelaksanaan
                    </Form.Label>
                    <Form.Control
                      className="form-control pr-5"
                      style={{ borderRadius: "30px" }}
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-5 w-100 rounded-xl mr-4">
                    <Form.Label className="fz-14">
                      Tanggal Akhir Pelaksanaan
                    </Form.Label>
                    <Form.Control
                      className="form-control pr-5"
                      style={{ borderRadius: "30px" }}
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className="mt-7">
                  <div className="row d-flex justify-content-around">
                    <button
                      className="btn btn-white-ghost-rounded-full text-primary"
                      onClick={() => handleReset()}
                    >
                      Reset
                    </button>

                    <button
                      className="btn btn-primary rounded-pill px-5 fw-600"
                      onClick={() => handleFilter()}
                    >
                      Tampilkan
                    </button>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={8} className="mb-5">
              <Row>
                {loadingPelatihan ? (
                  <>
                    <div className="container-fluid">
                      <div className="row">
                        <PulseLoaderRender />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {pelatihan &&
                    pelatihan.list &&
                    pelatihan.list !== 0 &&
                    show.length !== 0 ? (
                      pelatihan.list.map((el, i) => {
                        return showDetail[i] !== true ? (
                          <>
                            <Col
                              md={6}
                              className={`col-sm-12 col-md-4 mb-5 order-${
                                i + 1
                              }`}
                              key={i}
                            >
                              <Card className="h-100 shadow-sm">
                                {el.status !== "Open" ? (
                                  <Button
                                    variant="transparent"
                                    disabled
                                    className={`p-0 mb-0 ${style.btn_disabled_tema}`}
                                  >
                                    <div
                                      style={{
                                        width: "100%",
                                        height: "180px",
                                        position: "relative",
                                      }}
                                    >
                                      <Image
                                        className={`${style.image_dashboard}`}
                                        src={
                                          (el.gambar &&
                                            process.env
                                              .END_POINT_API_IMAGE_BEASISWA +
                                              el.gambar) ||
                                          "/assets/media/default-card.png"
                                        }
                                        layout="fill"
                                        objectFit="cover"
                                        alt="Image Thumbnail"
                                      />
                                    </div>
                                    <Card.ImgOverlay>
                                      <div className="d-flex justify-content-between">
                                        {el.metode_pelatihan !== "Offline" && (
                                          <Badge
                                            bg={`py-3 px-4 ${style.badge_card}`}
                                            classNam="d-flex "
                                          >
                                            Pelatihan {el.metode_pelatihan}
                                          </Badge>
                                        )}
                                        {show[i] && el.status === "Open" && (
                                          <div className="whishlist">
                                            <Button
                                              variant="light"
                                              className={`float-right d-flex justify-content-center align-items-center ${style.wishlist_card}`}
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
                                              className={`float-right d-flex justify-content-center align-items-center mr-2 ${style.wishlist_card}`}
                                            >
                                              <i
                                                className="ri-share-line p-0"
                                                style={{
                                                  color: "#6C6C6C",
                                                }}
                                              ></i>
                                            </Button>
                                          </div>
                                        )}
                                      </div>
                                    </Card.ImgOverlay>
                                    <Card.Body className="position-relative">
                                      <div
                                        className={
                                          style.bungkus_mitra_pelatihan
                                        }
                                      >
                                        <Image
                                          src={
                                            (el.gambar_mitra &&
                                              process.env
                                                .END_POINT_API_IMAGE_PARTNERSHIP +
                                                el.gambar_mitra) ||
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
                                      <div
                                        className="d-flex justify-content-between position-relative pb-0 mb-0"
                                        style={{ top: "-15px" }}
                                      >
                                        <p
                                          className={`pl-18 my-0 ${style.text_mitra}`}
                                        >
                                          {el.mitra}
                                        </p>
                                        <div className="status align-self-center">
                                          {el.status === "Open" ? (
                                            <p
                                              className={`${style.status_mitra_open} text-uppercase my-0`}
                                            >
                                              Open
                                            </p>
                                          ) : (
                                            <p
                                              className={`${style.status_mitra_close} text-uppercase my-0`}
                                            >
                                              Close
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                      <div className="d-flex flex-wrap flex-column">
                                        <p
                                          className={`my-0 ${style.title_card}`}
                                        >
                                          {el.name}
                                        </p>
                                        <p
                                          style={{
                                            fontSize: "14px",
                                            color: "#6C6C6C",
                                          }}
                                          className=" text-left"
                                        >
                                          {el.akademi}
                                        </p>
                                      </div>
                                      <hr />
                                      <div className="d-flex flex-column">
                                        <div className="date d-flex align-items-center align-middle">
                                          <i className="ri-time-line"></i>
                                          <span
                                            className={`${style.text_date_register} pl-2`}
                                          >
                                            Registrasi:{" "}
                                            {moment(
                                              el.pendaftaran_mulai
                                            ).format("DD MMMM YYYY")}{" "}
                                            -{" "}
                                            {moment(
                                              el.pendaftaran_selesai
                                            ).format("DD MMMM YYYY")}
                                          </span>
                                        </div>
                                        <div className="date d-flex align-items-center align-middle">
                                          <i className="ri-group-line"></i>
                                          <span
                                            className={`${style.text_date_register} pl-2`}
                                          >
                                            Kuota: {el.kuota_peserta} Peserta
                                          </span>
                                        </div>
                                      </div>
                                    </Card.Body>
                                  </Button>
                                ) : (
                                  <div
                                    onMouseEnter={() => handleMouseEnter(i)}
                                    onMouseLeave={() => handleMouseLeave(i)}
                                  >
                                    <div
                                      className="w-100"
                                      style={
                                        show[i] !== true && el.status === "Open"
                                          ? {
                                              filter: "brightness(1)",
                                              width: "100%",
                                              height: "180px",
                                              position: "relative",
                                            }
                                          : {
                                              filter: "brightness(0.8)",
                                              width: "100%",
                                              height: "180px",
                                              position: "relative",
                                            }
                                      }
                                    >
                                      <Image
                                        className={`${style.image_dashboard}`}
                                        src={
                                          (el.gambar &&
                                            process.env
                                              .END_POINT_API_IMAGE_BEASISWA +
                                              el.gambar) ||
                                          "/assets/media/default-card.png"
                                        }
                                        layout="fill"
                                        objectFit="cover"
                                        alt="Image Thumbnail"
                                      />
                                    </div>
                                    <Card.ImgOverlay>
                                      <div className="d-flex justify-content-between">
                                        {el.metode_pelatihan !== "Offline" && (
                                          <div className="align-self-start">
                                            <Badge
                                              bg={`py-3 px-4 ${style.badge_card}`}
                                              classNam="d-flex "
                                            >
                                              Pelatihan {el.metode_pelatihan}
                                            </Badge>
                                          </div>
                                        )}
                                        {show[i] && (
                                          <div className="whishlist">
                                            <Button
                                              variant="light"
                                              className={`float-right d-flex justify-content-center align-items-center ${style.wishlist_card}`}
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
                                              className={`float-right d-flex justify-content-center align-items-center mr-2 ${style.wishlist_card}`}
                                            >
                                              <i
                                                className="ri-share-line p-0"
                                                style={{
                                                  color: "#6C6C6C",
                                                }}
                                              ></i>
                                            </Button>
                                          </div>
                                        )}
                                      </div>
                                    </Card.ImgOverlay>
                                    <Card.Body className="position-relative">
                                      <div
                                        className={
                                          style.bungkus_mitra_pelatihan
                                        }
                                      >
                                        <Image
                                          src={
                                            (el.gambar_mitra &&
                                              process.env
                                                .END_POINT_API_IMAGE_PARTNERSHIP +
                                                el.gambar_mitra) ||
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
                                      <div
                                        className="d-flex justify-content-between position-relative pb-0 mb-0"
                                        style={{ top: "-15px" }}
                                      >
                                        <p
                                          className={`pl-18 my-0 ${style.text_mitra}`}
                                        >
                                          {el.mitra}
                                        </p>
                                        <div className="status align-self-center">
                                          {el.status === "Open" ? (
                                            <p
                                              className={`${style.status_mitra_open} text-uppercase my-0`}
                                            >
                                              Open
                                            </p>
                                          ) : (
                                            <p
                                              className={`${style.status_mitra_close} text-uppercase my-0`}
                                            >
                                              Close
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                      <p className={`my-0 ${style.title_card}`}>
                                        {el.name}
                                      </p>
                                      <p
                                        style={{
                                          fontSize: "14px",
                                          color: "#6C6C6C",
                                        }}
                                      >
                                        {el.akademi}
                                      </p>
                                      <hr />
                                      {show[i] !== true ? (
                                        <div className="d-flex flex-column">
                                          <div className="date d-flex align-items-center align-middle">
                                            <i className="ri-time-line"></i>
                                            <span
                                              className={`${style.text_date_register} pl-2`}
                                            >
                                              Registrasi:{" "}
                                              {moment(
                                                el.pendaftaran_mulai
                                              ).format("DD MMMM YYYY")}{" "}
                                              -{" "}
                                              {moment(
                                                el.pendaftaran_selesai
                                              ).format("DD MMMM YYYY")}
                                            </span>
                                          </div>
                                          <div className="date d-flex align-items-center align-middle">
                                            <i className="ri-group-line"></i>
                                            <span
                                              className={`${style.text_date_register} pl-2`}
                                            >
                                              Kuota: {el.kuota_peserta} Peserta
                                            </span>
                                          </div>
                                        </div>
                                      ) : (
                                        <div style={{ marginTop: "21px" }}>
                                          <Button
                                            className={`btn-block rounded-xl my-auto ${style.btn_quick_view}`}
                                            onClick={() => handleQuickView(i)}
                                          >
                                            Quick View
                                          </Button>
                                        </div>
                                      )}
                                    </Card.Body>
                                  </div>
                                )}
                              </Card>
                            </Col>
                          </>
                        ) : (
                          <>
                            <Col md={12} key={i} className="order-0 mb-5">
                              <div className="container-fluid">
                                <Row>
                                  <Col md={4}>
                                    <div
                                      className="position-absolute mt-5"
                                      style={{ zIndex: "100" }}
                                    >
                                      <span className="badgess-lg">
                                        Pelatihan {el.metode_pelatihan}
                                      </span>
                                    </div>
                                    <Image
                                      src={
                                        (el.gambar &&
                                          process.env
                                            .END_POINT_API_IMAGE_BEASISWA +
                                            el.gambar) ||
                                        "/assets/media/default-card.png"
                                      }
                                      alt="image card detail"
                                      layout="fill"
                                      objectFit="cover"
                                      className="rounded"
                                    />
                                  </Col>

                                  <Col md={8}>
                                    <div className="py-8 ml-3">
                                      <div className="position-relative d-flex align-items-start justify-content-between">
                                        <div className="d-flex d-flex align-items-start">
                                          <div className="">
                                            <Image
                                              src={
                                                process.env
                                                  .END_POINT_API_IMAGE_PARTNERSHIP +
                                                el.gambar_mitra
                                              }
                                              width={80}
                                              height={80}
                                              objectFit="cover"
                                              className={`${style.image_card_pelatihan}`}
                                            />
                                          </div>
                                          <div className="ml-6">
                                            <p
                                              className="fz-14"
                                              style={{ color: "#6C6C6C" }}
                                            >
                                              {akademi.name}
                                            </p>
                                            <p className="fz-30 fw-600">
                                              {el.name}
                                            </p>
                                            <p className="fw-600 fz-14">
                                              {el.mitra}
                                            </p>
                                          </div>
                                        </div>

                                        <div className="d-flex align-items-start">
                                          <button className="roundedss-border btn btn-white">
                                            <IconLove className="cursor-pointer" />
                                          </button>
                                          <button className="roundedss-border btn btn-white mx-6">
                                            <IconShare className="cursor-pointer" />
                                          </button>

                                          <div
                                            onClick={() =>
                                              handleCloseQuickView(i)
                                            }
                                          >
                                            <IconClose className="cursor-pointer" />
                                          </div>
                                        </div>
                                      </div>

                                      <p className="fz-16 fw-400 my-6">
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: printTextTrim(el.deskripsi),
                                          }}
                                        ></div>
                                      </p>

                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <span style={{ color: "#6C6C6C" }}>
                                            <IconTime className="mr-2" />
                                            Registrasi:{" "}
                                            {moment(
                                              el.pendaftaran_mulai
                                            ).format("DD MMMM YYYY")}{" "}
                                            -{" "}
                                            {moment(
                                              el.pendaftaran_selesai
                                            ).format("DD MMMM YYYY")}
                                          </span>
                                          <span
                                            className="mx-6"
                                            style={{ color: "#6C6C6C" }}
                                          >
                                            <IconPeserta className="mr-2" />
                                            Kuota: {el.kuota_peserta} Peserta
                                          </span>
                                          <span
                                            style={{ color: "#6C6C6C" }}
                                            className="d-flex align-items-center"
                                          >
                                            <i
                                              className="ri-map-pin-line mr-2"
                                              style={{ color: "#6C6C6C" }}
                                            ></i>
                                            Lokasi: {el.alamat}
                                          </span>
                                        </div>
                                      </div>

                                      <hr />

                                      <div className="row pt-6">
                                        <div className="col-6">
                                          <Link
                                            href={`/detail/pelatihan/${el.id}`}
                                            passHref
                                          >
                                            <a>
                                              <button className="btn btn-outline-primary-new rounded-pill py-3 px-12 mr-4 w-100">
                                                Lihat Selengkapnya
                                              </button>
                                            </a>
                                          </Link>
                                        </div>

                                        {el.status !== "Closed" ? (
                                          <div className="col-6">
                                            <button
                                              onClick={() =>
                                                handleCheckPelatihanReg(
                                                  el.id,
                                                  session
                                                )
                                              }
                                              className="d-flex justify-content-center btn-primary btn-register-peserta btn-sm py-3 px-12 rounded-pill btn-primary w-100"
                                            >
                                              Daftar Pelatihan
                                            </button>
                                          </div>
                                        ) : null}
                                      </div>
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                            </Col>
                          </>
                        );
                      })
                    ) : (
                      <div className="container-fluid">
                        <div className="d-flex justify-content-center">
                          <h1>Pelatihan Tidak Tersedia</h1>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </Row>
              <Row className="my-5 d-flex justify-content-center">
                {pelatihan && pelatihan.perPage < pelatihan.total ? (
                  <div className="table-pagination">
                    <Pagination
                      activePage={activePage}
                      itemsCountPerPage={pelatihan.perPage}
                      totalItemsCount={pelatihan.total}
                      pageRangeDisplayed={3}
                      onChange={handlePagination}
                      nextPageText={">"}
                      prevPageText={"<"}
                      firstPageText={"<<"}
                      lastPageText={">>"}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </div>
                ) : null}
              </Row>
            </Col>
          </Row>
        </section>
      </HomeWrapper>
    </>
  );
};

export default DetailAkademi;
