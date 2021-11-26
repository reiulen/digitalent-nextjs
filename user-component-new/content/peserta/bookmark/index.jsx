import React, { useState } from "react";
import PesertaWrapper from "../../../../user-component/components/wrapper/Peserta.wrapper";
import { Row, Col, Container, Card, Button, Badge } from "react-bootstrap";
import Image from "next/image";
import { useSelector } from "react-redux";
import style from "../../../../styles/peserta/dashboard.module.css";
import ShareOverlay from "../../../components/global/ShareOverlay.component";

export default function Bookmark({ session }) {
  const { pelatihan, loading: loadingPelatihan } = useSelector(
    (state) => state.allPelatihan
  );

  const allBookmark = useSelector((state) => state.allBookmark);

  const { loading: loadingPenyeleggara, penyelenggara: allPenyelenggara } =
    useSelector((state) => state.allPenyelenggaraPeserta);

  const i = 1;

  const [show, setShow] = useState([]);

  const el = pelatihan?.list[0] || [];

  const handleBookmark = async (pelatihan) => {
    console.log(pelatihan);
    const link = process.env.END_POINT_API_PELATIHAN;
    const config = {
      headers: {
        Authorization: "Bearer " + session.token,
      },
    };

    const body = {
      pelatihan_id: pelatihan.id,
    };

    if (!pelatihan.bookmark) {
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
          // dispatch(getTemaByAkademi(session?.token, akademi[0].id));
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
          // dispatch(getTemaByAkademi(session?.token, akademi[0].id));
        }
      } catch (e) {
        SweatAlert("Gagal", e.message, "error");
      }
    }
  };
  console.log(allBookmark.bookmark.list);

  return (
    <PesertaWrapper>
      <Row className="my-n10 my-md-0">
        {allBookmark?.bookmark?.list?.map((el, i) => {
          return (
            <Col
              md={6}
              className={`col-sm-12 col-md-4 mb-5 order-${i + 1}`}
              key={i}
            >
              <Card className="h-100 shadow-sm">
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
                    url={`http://dts-dev.majapahit.id/detail/pelatihan/id`}
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
                  disabled={el.status == "Dibuka" ? false : true}
                  className={`p-0 mb-0 ${
                    el.status == "Dibuka" ? "" : style.btn_disabled_tema
                  }`}
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
                        "/assets/media/default-card.png" ||
                        (el.gambar &&
                          process.env.END_POINT_API_IMAGE_BEASISWA + el.gambar)
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
                          className="d-flex d-none d-md-block"
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
                    <div className={style.bungkus_mitra_pelatihan}>
                      <Image
                        src={
                          (el.gambar_mitra &&
                            process.env.END_POINT_API_IMAGE_PARTNERSHIP +
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
                    <div className="d-flex flex-wrap flex-column">
                      <p className={`my-0 ${style.title_card}`}>{el.name}</p>
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
                        <span className={`${style.text_date_register} pl-2`}>
                          Registrasi:{" "}
                          {moment(el.pendaftaran_mulai).format("DD MMMM YYYY")}{" "}
                          -{" "}
                          {moment(el.pendaftaran_selesai).format(
                            "DD MMMM YYYY"
                          )}
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
        })}
      </Row>
    </PesertaWrapper>
  );
}
