import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Button, Badge, Modal } from "react-bootstrap";

import style from "../../../../styles/peserta/dashboard.module.css";
import CardPill from "../../../components/peserta/CardPill";
import CardPage from "../../../components/peserta/CardPage";
import { useRouter } from "next/router";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";
import Cookies from "js-cookie";
import axios from "axios";

const Dashboard = ({ session, success }) => {
  const router = useRouter();

  return (
    <>
      <PesertaWrapper>
        <Row className="mx-1">
          <CardPill
            background="bg-extras"
            backgroundImg="Selected-file.svg"
            icon="new/open-book.svg"
            color="#FFFFFF"
            value={20}
            title="Artikel Saya"
          />
          <CardPill
            background="bg-success"
            backgroundImg="File done.svg"
            icon="new/done-circle.svg"
            color="#FFFFFF"
            value={15}
            title="Sudah Publish"
          />
          <CardPill
            background="bg-danger"
            backgroundImg="Deleted-file.svg"
            icon="new/done-circle.svg"
            color="#FFFFFF"
            value={5}
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
                  />
                  <button
                    className="btn btn-primary text-white right-center-absolute"
                    style={{
                      borderTopLeftRadius: "0",
                      borderBottomLeftRadius: "0",
                    }}
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
                  <tr>
                    <td className="text-center align-middle">1</td>
                    <td className="align-middle">
                      <Image
                        src={
                          "data:image/jpeg;base64,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"
                        }
                        width="111"
                        height="52"
                        objectFit="cover"
                        alt={"Ini Gambar"}
                      />
                    </td>
                    <td className="align-middle">VSGA</td>
                    <td className="align-middle">
                      Ketika Cinta Bertasbih nadiku berdenyut denyut
                    </td>
                    <td className="align-middle">12 Juli 2040</td>
                    <td className="align-middle">
                      {" "}
                      <span className="label label-inline label-light-success font-weight-bold">
                        Publish
                      </span>
                    </td>
                    <td className="align-middle">
                      <div className="d-flex">
                        <Link href={`/peserta/artikel`}>
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
                  <tr>
                    <td className="text-center align-middle">2</td>
                    <td className="align-middle"><Image
                      src={
                        "data:image/jpeg;base64,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"
                      }
                      width="111"
                      height="52"
                      objectFit="cover"
                      alt={"Ini Gambar"}
                    /></td>
                    <td className="align-middle">VSGA</td>
                    <td className="align-middle">
                      Ketika Cinta Bertasbih nadiku berdenyut denyut
                    </td>
                    <td className="align-middle">12 Juli 2040</td>
                    <td className="align-middle">
                      {" "}
                      <span className="label label-inline label-light-success font-weight-bold">
                        Publish
                      </span>
                    </td>
                    <td className="align-middle">
                      <div className="d-flex">
                        <Link href={`/peserta/artikel`}>
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </PesertaWrapper>
    </>
  );
};

export default Dashboard;
