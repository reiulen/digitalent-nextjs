import React, { useState, useEffect } from "react";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";
import { Row, Col, Container, Card, Button, Badge } from "react-bootstrap";
import Image from "next/image";
import { useSelector } from "react-redux";
import style from "../../../../styles/peserta/dashboard.module.css";
import ShareOverlay from "../../../components/global/ShareOverlay.component";
import {
  getAllBookmark,
  setValuePage,
} from "../../../../redux/actions/pelatihan/bookmark.action";
import axios from "axios";
import { SweatAlert } from "../../../../utils/middleware/helper/index";
import Pagination from "react-js-pagination";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import moment from "moment";

export default function Bookmark({ session }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const allBookmark = useSelector((state) => state.allBookmark);

  const handleBookmark = async (pelatihan) => {
    const link = process.env.END_POINT_API_PELATIHAN;
    const config = {
      headers: {
        Authorization: "Bearer " + session.token,
      },
    };

    try {
      const data = await axios.delete(
        `${link}api/v1/bookmart-peserta/delete?pelatihan_id=${pelatihan.id}`,
        config
      );

      if (data) {
        SweatAlert(
          "Berhasil",
          "Anda berhasil menghapus pelatihan dari favorit",
          "success"
        );
        dispatch(getAllBookmark(session?.token));
      }
    } catch (e) {
      SweatAlert("Gagal", e.message, "error");
    }
  };

  useEffect(() => {
    dispatch(getAllBookmark(session?.token));
  }, [dispatch, allBookmark.page]);

  return (
    <PesertaWrapper>
      <Row className="my-n10 my-md-0 mb-md-20">
        {allBookmark && allBookmark?.bookmark?.list.length > 0 ? (
          allBookmark?.bookmark?.list?.map((el, i) => {
            return (
              <Col
                md={6}
                className={`col-12 col-md-4 mb-15 px-8 order-${i + 1}`}
                key={i}
              >
                <Card
                  className="h-100 shadow-sm"
                  style={{ borderRadius: "12px" }}
                >
                  <div className="whishlist align-self-end position-absolute m-4 zindex-5">
                    <Button
                      variant="light"
                      className={`float-right d-flex justify-content-center align-items-center wishlist-card-new`}
                    >
                      <i
                        className={`ri-heart-fill text-danger p-0`}
                        style={{
                          color: "#6C6C6C",
                        }}
                        onClick={() => {
                          handleBookmark(el);
                        }}
                      ></i>
                    </Button>
                    <ShareOverlay
                      url={
                        process.env.PATH_URL +
                        `/detail/pelatihan/${el.id}?akademiId=${el.akademi_id}`
                      }
                      quote={el.name}
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
                  <Button
                    variant="transparent"
                    // disabled={el.status == "Dibuka" ? false : true}
                    className={
                      el.status == "Dibuka"
                        ? "p-0 mb-0"
                        : `${style.btn_disabled_tema} p-0 mb-0 `
                    }
                    onClick={() => {
                      router.push(
                        `/detail/pelatihan/${el.id}?akademiId=${el.akademi_id}`
                      );
                    }}
                    style={{ borderRadius: "12px" }}
                  >
                    <div
                      style={
                        el.status == "Dibuka"
                          ? {
                              width: "100%",
                              height: "180px",
                              position: "relative",
                              borderRadius: "12px",
                            }
                          : {
                              width: "100%",
                              height: "180px",
                              position: "relative",
                              borderRadius: "12px",
                              filter: "saturate(0)",
                            }
                      }
                    >
                      <Image
                        className={`${style.image_dashboard}`}
                        src={
                          (el.gambar &&
                            process.env.END_POINT_API_IMAGE_PELATIHAN +
                              el.gambar) ||
                          "/assets/media/default-card.png" //NEED TO BE FIXED
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
                            bg={` py-3 px-4 ${style.badge_card}`}
                            className=" d-none d-md-flex"
                            style={
                              el.status == "Dibuka"
                                ? {}
                                : {
                                    filter: "saturate(0)",
                                  }
                            }
                          >
                            Pelatihan {el.metode_pelatihan}
                          </Badge>
                        )}

                        {el.status === "dibuka" && (
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
                        className={style.bungkus_mitra_pelatihan}
                        style={
                          el.status == "Dibuka"
                            ? {}
                            : {
                                filter: "saturate(0)",
                              }
                        }
                      >
                        <Image
                          src={
                            !el.gambar_mitra
                              ? "/assets/media/mitra-default.png"
                              : el.file_path + el.gambar_mitra
                          }
                          width={60}
                          height={60}
                          objectFit="cover"
                          thumbnail
                          className={`${style.image_card_pelatihan} img-fluild`}
                          alt="Image Mitra"
                        />
                      </div>
                      <div
                        className="d-flex justify-content-between position-relative pb-0 mb-0"
                        style={{ top: "-15px" }}
                      >
                        <p className={`pl-18 my-0 ${style.text_mitra}`}>
                          {el.mitra}
                        </p>
                        <div className="status align-self-center">
                          {el.status === "Dibuka" ? (
                            <p
                              className={`${style.status_mitra_open} text-uppercase my-0`}
                            >
                              Dibuka
                            </p>
                          ) : (
                            <p
                              className={`${style.status_mitra_close} text-uppercase my-0`}
                            >
                              Ditutup
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <div>
                          <p
                            className={`my-0 ${style.title_card} text-truncate`}
                          >
                            {el.name}
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              fontSize: "14px",
                              color: "#6C6C6C",
                            }}
                            className=" text-left text-truncate"
                          >
                            {el.akademi}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="d-flex flex-column">
                        <div className="date d-flex align-items-center align-middle mb-3">
                          <i className="ri-time-line"></i>
                          <span className={`${style.text_date_register} pl-2`}>
                            Registrasi:{" "}
                            {moment(el.pendaftaran_mulai)
                              .utc()
                              .format("DD MMMM YYYY")}{" "}
                            -{" "}
                            {moment(el.pendaftaran_selesai)
                              .utc()
                              .format("DD MMMM YYYY")}
                          </span>
                        </div>
                        <div className="date d-flex align-items-center align-middle">
                          <i className="ri-group-line"></i>
                          <span className={`${style.text_date_register} pl-2`}>
                            Kuota: {el.kuota_peserta} Peserta
                          </span>
                        </div>
                      </div>
                    </Card.Body>
                  </Button>
                </Card>
              </Col>
            );
          })
        ) : (
          <Col lg={12} className="px-0">
            <Card className="card-custom card-stretch gutter-b p-0">
              <div className="d-flex justify-content-center pt-10 ">
                <Image
                  src={"/assets/media/gambar-belum-tersedia-page.svg"}
                  width={525}
                  height={350}
                  alt="Gambar Tidak ditemukan"
                  objectFit="contain"
                />
              </div>
              <p
                className="d-flex justify-content-center font-weight-bolder mt-15 text-center"
                style={{ fontSize: "24px" }}
              >
                Belum Ada Pelatihan yang Difavoritkan
              </p>
              <div className="text-center fz-16 text-center">
                <p>Anda dapat melihat pelatihan favorit Anda di sini.</p>
              </div>
              <div className="d-flex justify-content-center mb-10">
                <Button
                  className="btn-rounded-full font-weight-bold d-flex justify-content-center my-10 "
                  style={{
                    height: "40px",
                    fontFamily: "poppins",
                    fontSize: "14px",
                  }}
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  Halaman Utama
                </Button>
              </div>
            </Card>
          </Col>
        )}
      </Row>
      <div className="position-absolute bottom-0 w-100 ">
        <div className=" d-flex justify-content-center align-align-items-center">
          {allBookmark && allBookmark?.bookmark?.total > 6 && (
            <div className="table-pagination my-auto">
              <Pagination
                activePage={allBookmark?.page}
                itemsCountPerPage={allBookmark?.bookmark?.perPage}
                totalItemsCount={allBookmark?.bookmark?.total}
                pageRangeDisplayed={3}
                onChange={(page) => {
                  dispatch(setValuePage(page));
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                nextPageText={">"}
                prevPageText={"<"}
                firstPageText={"<<"}
                lastPageText={">>"}
                itemClass="page-item-dashboard"
                linkClass="page-link-dashboard"
              />
            </div>
          )}
        </div>
      </div>
    </PesertaWrapper>
  );
}
