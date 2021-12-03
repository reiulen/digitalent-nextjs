import React, { useState, useEffect, Fragment } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Row, Col, Form, Card, Badge, Button } from "react-bootstrap";
import Select from "react-select";
import Image from "next/image";
import BreadcrumbComponent from "../../../components/global/Breadcrumb.component";
import { SweatAlert } from "../../../../utils/middleware/helper/index";
import HomeWrapper from "../../../components/wrapper/Home.wrapper";
import moment from "moment";

import {
  getPencarian,
  setValuePage,
  searchKeyword,
  setValueKategoriPeserta,
  setValueLimit,
  setValuePelatihanAkhir,
  setValuePelatihanMulai,
  setValuePenyelenggara,
  resetFilter,
} from "../../../../redux/actions/pelatihan/pencarian.action";
import axios from "axios";

const Pencarian = ({ session }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { query } = router;
  const allPencarian = useSelector((state) => state.allPencarian);

  const { loading: loadingPenyeleggara, penyelenggara: allPenyelenggara } =
    useSelector((state) => state.allPenyelenggaraPeserta);

  const [filterPenyelenggara, setFilterPenyelenggara] = useState("");
  const [filterKategori, setFilterKategori] = useState("");
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
    router.push(
      `/pencarian?cari=${
        router.query.cari || ""
      }&page=${1}&limit=${6}&penyelenggara=${
        data.penyelenggara || ""
      }&pelatihan_mulai=${data.tanggal_mulai || ""}&pelatihan_akhir=${
        data.tanggal_akhir || ""
      }&kategori_peserta=${data.kategori_peserta || ""}`
    );
  };

  const handleReset = () => {
    setFilterPenyelenggara(null);
    selectRefPenyelenggara.select.clearValue();
    setFilterKategori(null);
    selectRefKategoriPeserta.select.clearValue();
    setStartDate("");
    setEndDate("");
    dispatch(resetFilter());
  };

  const handlePagination = (page) => {
    router.push(
      `/pencarian?cari=${
        router.query.cari || ""
      }&page=${page}&limit=${6}&penyelenggara=${
        penyelenggara || ""
      }&pelatihan_mulai=${tanggal_mulai || ""}&pelatihan_akhir=${
        tanggal_akhir || ""
      }&kategori_peserta=${kategori_peserta || ""}`
    );
    // dispatch(setValuePage(page));
  };

  const handleBookmark = async (pelatihan) => {
    const link = process.env.END_POINT_API_PELATIHAN;
    const config = {
      headers: {
        Authorization: "Bearer " + session?.token,
      },
    };

    const body = {
      pelatihan_id: pelatihan.id,
    };
    if (!pelatihan.bookmart) {
      try {
        const data = await axios.post(
          `${link}api/v1/bookmart-peserta/create`,
          body,
          config
        );
        if (data) {
          SweatAlert(
            "Berhasil",
            "Anda berhasil menambahkan pelatihan ke bookmark",
            "success"
          );
          dispatch(
            getPencarian(
              query.cari || "",
              query.page || 1,
              query.limit || 6,
              query.penyelenggara || "",
              query.pelatihan_mulai || "",
              query.pelatihan_akhir || "",
              query.kategori_peserta || "",
              session?.token || ""
            )
          );
        }
      } catch (e) {
        SweatAlert("Gagal", e.message, "error");
      }
    } else {
      try {
        const data = await axios.delete(
          `${link}api/v1/bookmart-peserta/delete?pelatihan_id=${pelatihan.id}`,
          config
        );
        if (data) {
          SweatAlert(
            "Berhasil",
            "Anda berhasil menghapus pelatihan dari bookmark",
            "success"
          );
          dispatch(
            getPencarian(
              query.cari || "",
              query.page || 1,
              query.limit || 6,
              query.penyelenggara || "",
              query.pelatihan_mulai || "",
              query.pelatihan_akhir || "",
              query.kategori_peserta || "",
              session?.token || ""
            )
          );
        }
      } catch (e) {
        SweatAlert("Gagal", e.message, "error");
      }
    }
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
              <h1 className="fw-700 fz-36">Pencarian {router.query.cari}</h1>

              <div className="mt-5 mt-md-1">
                <p className="mr-6 fz-18 text-muted fw-400">
                  Pencarian Pelatihan Terkait dengan {router.query.cari}
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
                      alt="filter"
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
                {!allPencarian.pelatihan.list ? (
                  <Fragment>
                    <Card
                      className="card-custom card-stretch gutter-b p-0"
                      style={{ height: "602px" }}
                    >
                      <Row className="d-flex justify-content-center w-100 p-0 m-0">
                        <div className="d-flex justify-content-center pt-10">
                          <Image
                            src={"/assets/media/gambar-belum-tersedia-page.svg"}
                            width={525}
                            height={350}
                            alt="Gambar Tidak ditemukan"
                            objectFit="contain"
                          />
                        </div>
                        <p
                          className="d-flex justify-content-center font-weight-bolder"
                          style={{ fontSize: "16px" }}
                        >
                          Pencarian "{router.query.cari}" belum tersedia
                        </p>
                      </Row>
                    </Card>
                  </Fragment>
                ) : (
                  allPencarian?.pelatihan?.list?.map((row, i) => (
                    <Col md={6} className={`col-sm-12 col-md-4 mb-5`} key={i}>
                      <Card className="h-100 shadow-sm" key={i}>
                        <div>
                          <div className={`parent-image-pelatihan-new`}>
                            <Image
                              className={`image-list-pelatihan-new`}
                              // src={"/assets/media/default-card.png"}
                              src={
                                !row.gambar
                                  ? "/assets/media/default-card.png"
                                  : `${process.env.END_POINT_API_IMAGE_PARTNERSHIP}${row?.gambar}`
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
                                  {row.metode_pelatihan}
                                </Badge>
                              </div>

                              <div className="whishlist align-self-end float-right">
                                <Button
                                  variant="light"
                                  className={`float-right d-flex justify-content-center align-items-center wishlist-card-new`}
                                >
                                  <i
                                    className={
                                      !row.bookmart
                                        ? `ri-heart-line p-0`
                                        : `ri-heart-fill p-0 text-danger`
                                    }
                                    style={{
                                      color: "#6C6C6C",
                                    }}
                                    onClick={() => {
                                      handleBookmark(row);
                                      // console.log(row);
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
                                // src={"/assets/media/mitra-default.png"}
                                src={`${process.env.END_POINT_API_IMAGE_PARTNERSHIP}${row?.gambar_mitra}`}
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
                                {row?.mitra}
                              </p>
                              <div className="status align-self-center">
                                <p
                                  className={`${"status-mitra-open-new"} text-uppercase my-0`}
                                >
                                  {row?.status}
                                </p>
                              </div>
                            </div>
                            <p className={`my-0 title-card-new`}>{row?.name}</p>
                            <p
                              style={{
                                fontSize: "14px",
                                color: "#6C6C6C",
                              }}
                            >
                              {row?.akademi}
                            </p>
                            <hr />
                            <div className="d-flex flex-column">
                              <div className="date d-flex align-items-center align-middle">
                                <i className="ri-time-line"></i>
                                <span className={`text-date-register-new pl-2`}>
                                  Registrasi:{" "}
                                  {moment(row?.pendaftaran_mulai).format(
                                    "DD MMMM YYYY"
                                  )}{" "}
                                  -{" "}
                                  {moment(row?.pendaftaran_selesai).format(
                                    "DD MMMM YYYY"
                                  )}
                                </span>
                              </div>
                              <div className="date d-flex align-items-center align-middle">
                                <i className="ri-group-line"></i>
                                <span className={`text-date-register-new pl-2`}>
                                  Kuota: {row?.kuota_peserta} Peserta
                                </span>
                              </div>
                            </div>
                          </Card.Body>
                        </div>
                      </Card>
                    </Col>
                  ))
                )}
              </Row>
              <Row className="my-5 d-flex justify-content-center">
                <div className="table-pagination">
                  <Pagination
                    activePage={allPencarian?.page}
                    itemsCountPerPage={allPencarian?.pelatihan?.perPage}
                    totalItemsCount={allPencarian?.pelatihan?.total}
                    pageRangeDisplayed={3}
                    onChange={(page) => handlePagination(page)}
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
