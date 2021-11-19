import React, { useState } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Row, Col, Form, Card, Badge, Button } from "react-bootstrap";
import Select from "react-select";
import Image from "next/image";

import BreadcrumbComponent from "../../../components/global/Breadcrumb.component";
import { SweatAlert } from "../../../../utils/middleware/helper/index";
import PulseLoaderRender from "../../../components/loader/PulseLoader";
import HomeWrapper from "../../../components/wrapper/Home.wrapper";
import CardPelatihanClose from "../../../components/global/CardPelatihanClose.component";
import CardPelatihanOpen from "../../../components/global/CardPelatihanOpen.component";
import CardPelatihanQuickView from "../../../components/global/CardPelatihanQuickView.component";

const Pencarian = () => {
  const router = useRouter();

  const { loading: loadingPenyeleggara, penyelenggara: allPenyelenggara } =
    useSelector((state) => state.allPenyelenggaraPeserta);

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

  const handleFilter = () => {
    let data = {
      penyelenggara:
        filterPenyelenggara !== null ? filterPenyelenggara.label : null,
      kategori_peserta: filterKategori !== null ? filterKategori.value : null,
      tanggal_mulai: startDate,
      tanggal_akhir: endDate,
    };
  };

  const handleReset = () => {
    setFilterPenyelenggara(null);
    selectRefPenyelenggara.select.clearValue();
    setFilterKategori(null);
    selectRefKategoriPeserta.select.clearValue();
    setStartDate("");
    setEndDate("");
  };

  return (
    <>
      <HomeWrapper>
        <BreadcrumbComponent
          data={[{ link: router.asPath, name: "Pencarian" }]}
        />
        <Row>
          <Col md={12}>
            <div className="ml-2 mb-3 title-pelatihan">
              <h1 className="fw-700 fz-36">Pencarian {`Jalan Raya`}</h1>

              <div className="mt-5 mt-md-1">
                <p className="mr-6 fz-18 text-muted fw-400">
                  Pencarian Pelatihan Terkait dengan Design
                </p>
              </div>
            </div>
          </Col>
        </Row>

        <section className="content-search my-5">
          <Row>
            <Col md={4} className="mb-5">
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
                {[1, 2, 3, 4].map((row, i) => (
                  <Col md={6} className={`col-sm-12 col-md-4 mb-5`}>
                    <Card className="h-100 shadow-sm" key={i}>
                      <div>
                        <div className={`parent-image-pelatihan-new`}>
                          <Image
                            className={`image-list-pelatihan-new`}
                            src={"/assets/media/default-card.png"}
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
                                Pelatihan Online
                              </Badge>
                            </div>

                            <div className="whishlist align-self-end float-right">
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
                                className={`float-right d-flex justify-content-center align-items-center mr-2 wishlist-card-new`}
                              >
                                <i
                                  className="ri-share-line p-0"
                                  style={{
                                    color: "#6C6C6C",
                                  }}
                                ></i>
                              </Button>
                            </div>
                          </div>
                        </Card.ImgOverlay>
                        <Card.Body className="position-relative">
                          <div className="mitra-pelatihan-new">
                            <Image
                              src={"/assets/media/mitra-default.png"}
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
                            <p className={`pl-18 my-0 text-mitra-new`}>
                              Warung
                            </p>
                            <div className="status align-self-center">
                              <p
                                className={`${"status-mitra-open-new"} text-uppercase my-0`}
                              >
                                Open
                              </p>
                            </div>
                          </div>
                          <p className={`my-0 title-card-new`}>
                            Pelatihan Mahir
                          </p>
                          <p
                            style={{
                              fontSize: "14px",
                              color: "#6C6C6C",
                            }}
                          >
                            Akademi Militer
                          </p>
                          <hr />
                          <div className="d-flex flex-column">
                            <div className="date d-flex align-items-center align-middle">
                              <i className="ri-time-line"></i>
                              <span className={`text-date-register-new pl-2`}>
                                Registrasi: 12-10-2021 - 12-10-2021
                              </span>
                            </div>
                            <div className="date d-flex align-items-center align-middle">
                              <i className="ri-group-line"></i>
                              <span className={`text-date-register-new pl-2`}>
                                Kuota: 100 Peserta
                              </span>
                            </div>
                          </div>
                        </Card.Body>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
              <Row className="my-5 d-flex justify-content-center">
                <div className="table-pagination">
                  <Pagination
                    activePage={1}
                    itemsCountPerPage={3}
                    totalItemsCount={5}
                    pageRangeDisplayed={3}
                    //   onChange={handlePagination}
                    nextPageText={">"}
                    prevPageText={"<"}
                    firstPageText={"<<"}
                    lastPageText={">>"}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                </div>
                {/* {pelatihan && pelatihan.perPage < pelatihan.total && (
                )} */}
              </Row>
            </Col>
          </Row>
        </section>
      </HomeWrapper>
    </>
  );
};

export default Pencarian;
