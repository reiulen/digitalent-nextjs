import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import Pagination from "react-js-pagination";
import Select from "react-select";

import { Card, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import FilterBar from "./section/FilterBar.component";
import BreadcrumbComponent from "../../../components/global/Breadcrumb.component";
import TrainingReminder from "../../../components/global/TrainingReminder.component";
import CardPelatihanClose from "../../../components/global/CardPelatihanClose.component";
import CardPelatihanOpen from "../../../components/global/CardPelatihanOpen.component";
import CardPelatihanQuickView from "../../../components/global/CardPelatihanQuickView.component";
import HomeWrapper from "../../../components/wrapper/Home.wrapper";

import { SweatAlert } from "../../../../utils/middleware/helper";

import PulseLoaderRender from "../../../components/loader/PulseLoader";
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
  const [akademiDesc, setAkademiDesc] = useState(null);
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
    if (akademi) {
      handleTextTrim();
    }
  }, [akademi]);

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
      arr.splice(i, i, false);
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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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

  const handleCheckPelatihanReg = async (index) => {
    if (session && session.token) {
      const data = await dispatch(checkRegisterPelatihan(index, session.token));
      if (data.status === true) {
        router.push(`/peserta/form-pendaftaran?id=${index}`);
      } else if (data.status === false) {
        let errMessage = data.message;
        SweatAlert("Gagal", errMessage, "error");
      }
    } else {
      router.push(`/login`);
    }
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
          data={[
            { link: router.asPath, name: (akademi && akademi.name) || "-" },
          ]}
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
                      {(akademi && akademi.name) || "-"} (
                      {(akademi && akademi.slug) || "-"})
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
                                {el.status !== "Dibuka" ? (
                                  <CardPelatihanClose row={el} />
                                ) : (
                                  <CardPelatihanOpen
                                    funcMouseEnter={(index) =>
                                      handleMouseEnter(index)
                                    }
                                    funcMouseLeave={(index) =>
                                      handleMouseLeave(index)
                                    }
                                    funcQuickView={(index) =>
                                      handleQuickView(index)
                                    }
                                    show={show}
                                    row={el}
                                    i={i}
                                  />
                                )}
                              </Card>
                            </Col>
                          </>
                        ) : (
                          <CardPelatihanQuickView
                            row={el}
                            i={i}
                            akademi={akademi}
                            funcCheckPelatihan={(index) =>
                              handleCheckPelatihanReg(index)
                            }
                            funcClosePelatihan={(index) =>
                              handleCloseQuickView(index)
                            }
                          />
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
                {pelatihan && pelatihan.perPage < pelatihan.total && (
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
                )}
              </Row>
            </Col>
          </Row>
        </section>
      </HomeWrapper>
    </>
  );
};

export default DetailAkademi;
