import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Button, Badge, Modal } from "react-bootstrap";
import Pagination from "react-js-pagination";

import style from "../../../../styles/peserta/dashboard.module.css";
import CardPill from "../../../components/peserta/CardPill";
import CardPage from "../../../components/peserta/CardPage";
import { useRouter } from "next/router";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";
import Cookies from "js-cookie";
import axios from "axios";
import { InvalidPDFException } from "pdfjs-dist";
import moment from "moment";
import PulseLoaderRender from "../../../components/loader/PulseLoader";

import { getAllArtikelsPeserta } from "../../../../redux/actions/publikasi/artikel.actions";

const Dashboard = ({ session, success }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const allArtikelsPeserta = useSelector((state) => state.allArtikelsPeserta);

  const [keyword, setKeyword] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [createdAt, setCreatedAt] = useState(null);

  let loading = false;

  if (allArtikelsPeserta.loading) {
    loading = allArtikelsPeserta.loading;
  }

  console.log(allArtikelsPeserta);

  const listArtikel =
    allArtikelsPeserta.artikel?.artikel.length > 0 ? (
      allArtikelsPeserta.artikel.artikel.map((item, index) => {
        return (
          <tr key={index}>
            <td className="text-center align-middle">{index + 1}</td>
            <td className="align-middle">
              <Image
                unoptimized={process.env.ENVIRONMENT !== "PRODUCTION"}
                loader={
                  process.env.END_POINT_API_IMAGE_PUBLIKASI +
                  "publikasi/images/" +
                  item.gambar
                }
                src={
                  process.env.END_POINT_API_IMAGE_PUBLIKASI +
                  "publikasi/images/" +
                  item.gambar
                }
                width="111"
                height="52"
                objectFit="cover"
                alt={"Ini Gambar"}
              />
            </td>
            <td className="align-middle">{item.kategori_akademi}</td>
            <td
              className="align-middle"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "11rem",
              }}
            >
              {item.judul_artikel}
            </td>
            <td className="align-middle">
              {moment(item.created_at).format("DD MMMM YYYY")}
            </td>
            <td className="align-middle">
              {" "}
              <span
                className={`label label-inline label-light-${
                  item.publish === 1 ? "success" : "danger"
                } font-weight-bold`}
              >
                {item.publish === 1 ? "Publish" : "Unpublish"}
              </span>
            </td>
            <td className="align-middle">
              <div className="d-flex">
                <Link href={`/peserta/artikel/preview/1`}>
                  <a
                    className="btn btn-link-action btn-primary text-white mr-2"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Detail"
                  >
                    <i className="ri-search-eye-fill text-white p-0"></i>
                  </a>
                </Link>
                <Link href={`/peserta/artikel/edit`}>
                  <a
                    className="btn btn-link-action btn-warning text-white mr-2"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Edit"
                  >
                    <i className="ri-pencil-fill text-white p-0"></i>
                  </a>
                </Link>
                <Link href={`/peserta/artikel`}>
                  <a
                    className="btn btn-link-action btn-danger text-white"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Delete"
                  >
                    <i className="ri-delete-bin-6-fill text-white p-0"></i>
                  </a>
                </Link>
              </div>
            </td>
          </tr>
        );
      })
    ) : (
      <td className="align-middle text-center" colSpan={8}>
        Data Kosong
      </td>
    );

  const loader = (
    <td className="align-middle text-center" colSpan={8}>
      <PulseLoaderRender />
    </td>
  );

  const handleSearch = () => {
    dispatch(
      getAllArtikelsPeserta(session.token, 1, 5, keyword, null, null, null)
    );
  };

  return (
    <>
      <PesertaWrapper>
        <Row className="mx-1">
          <CardPill
            background="bg-extras"
            backgroundImg="Selected-file.svg"
            icon="new/open-book.svg"
            color="#FFFFFF"
            value={allArtikelsPeserta.artikel?.total}
            title="Artikel Saya"
          />
          <CardPill
            background="bg-success"
            backgroundImg="File done.svg"
            icon="new/done-circle.svg"
            color="#FFFFFF"
            value={allArtikelsPeserta.artikel?.publish}
            title="Sudah Publish"
          />
          <CardPill
            background="bg-danger"
            backgroundImg="Deleted-file.svg"
            icon="new/done-circle.svg"
            color="#FFFFFF"
            value={allArtikelsPeserta.artikel?.unpublish}
            title="Belum Publish"
          />
        </Row>
        <div
          className="mx-3 bg-white mt-4"
          style={{
            borderRadius: "12px",
          }}
        >
          <Row className="">
            <Col md={12} className="mb-4 px-10">
              <div className="mt-10 d-flex">
                <h3>Artikel Saya</h3>
                <Link href="/peserta/artikel/tambah/" passHref>
                  <button className="btn btn-primary ml-auto rounded-full px-10 py-3 text-center font-weight-bolder">
                    <i className="ri-pencil-fill mr-2"></i>Buat Artikel
                  </button>
                </Link>
              </div>
            </Col>
          </Row>
          <div className="table-filter">
            <div className="row align-items-center d-flex">
              <div className="col-lg-4 col-xl-4 mb-4 px-10 ">
                <div className="position-relative overflow-hidden mb-2 mt-3">
                  <i className="ri-search-line left-center-absolute ml-2"></i>
                  <input
                    type="text"
                    className="form-control pl-10"
                    placeholder="Ketik disini untuk Pencarian..."
                    value={keyword}
                    onChange={(e) => {
                      setKeyword(e.target.value);
                    }}
                  />
                  <button
                    className="btn btn-primary text-white right-center-absolute"
                    style={{
                      borderTopLeftRadius: "0",
                      borderBottomLeftRadius: "0",
                    }}
                    onClick={handleSearch}
                  >
                    Cari
                  </button>
                </div>
              </div>

              <div className="col-lg-4 col-xl-4 ml-auto d-flex mt-3 mb-4 px-10">
                <button
                  className="btn border d-flex align-items-center justify-content-between mb-2 w-100"
                  style={{
                    color: "#bdbdbd",
                    float: "right",
                  }}
                >
                  <div className="d-flex align-items-center">
                    <i className="ri-filter-fill mr-3"></i>
                    Pilih Filter
                  </div>
                  <i className="ri-arrow-down-s-line"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="table-page mt-5 mx-6">
            <div className="table-responsive">
              <table className="table table-separate table-head-custom table-checkable">
                <thead className="w-100" style={{ background: "#F3F6F9" }}>
                  <tr>
                    <th
                      className="text-center font-weight-bolder"
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      No
                    </th>
                    <th
                      className="font-weight-bolder"
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      Thumbnail
                    </th>
                    <th
                      className="font-weight-bolder"
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      Kategori
                    </th>
                    <th
                      className="font-weight-bolder"
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      Judul
                    </th>
                    <th
                      className="font-weight-bolder"
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      Tanggal Dibuat
                    </th>
                    <th
                      className="font-weight-bolder"
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      Status
                    </th>
                    <th
                      className="row-aksi-pelatihan font-weight-bolder"
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="w-100">
                  {loading ? loader : listArtikel}
                </tbody>
              </table>
            </div>
            <div className="row">
                  <div className="table-pagination table-pagination pagination-custom col-12 col-md-6">
                    <Pagination
                      activePage={1}
                      itemsCountPerPage={1}
                      totalItemsCount={10}
                      pageRangeDisplayed={3}
                      // onChange={handlePagination}
                      nextPageText={">"}
                      prevPageText={"<"}
                      firstPageText={"<<"}
                      lastPageText={">>"}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </div>
                  <div className="table-total ml-auto">
                    <div className="row">
                      <div className="col-4 mr-0 p-0 mt-3">
                        <select
                          className="form-control"
                          id="exampleFormControlSelect2"
                          style={{
                            width: "65px",
                            background: "#F3F6F9",
                            borderColor: "#F3F6F9",
                            color: "#9E9E9E",
                          }}
                          // onChange={(e) => handleLimit(e.target.value)}
                          // onBlur={(e) => handleLimit(e.target.value)}
                          value={limit}
                        >
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="30">30</option>
                          <option value="40">40</option>
                          <option value="50">50</option>
                        </select>
                      </div>
                      <div className="col-8 my-auto pt-3">
                        <p
                          className="align-middle mt-3"
                          style={{ color: "#B5B5C3" }}
                        >
                          Total Data 10
                        </p>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
        </div>
      </PesertaWrapper>
    </>
  );
};

export default Dashboard;
