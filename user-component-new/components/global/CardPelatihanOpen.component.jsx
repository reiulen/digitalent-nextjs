import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import Image from "next/image";

const CardPelatihanOpen = ({
  funcMouseEnter,
  funcMouseLeave,
  funcQuickView,
  show,
  row,
  i,
}) => {
  return (
    <>
      <div
        onMouseEnter={() => funcMouseEnter(i)}
        onMouseLeave={() => funcMouseLeave(i)}
      >
        <div
          className={
            show[i] !== true && row.status === "Open"
              ? `parent-image-pelatihan-new`
              : `parent-image-pelatihan-new-hover`
          }
        >
          <Image
            className={`image-list-pelatihan-new`}
            src={
              (row.gambar &&
                process.env.END_POINT_API_IMAGE_BEASISWA + row.gambar) ||
              "/assets/media/default-card.png"
            }
            layout="fill"
            objectFit="cover"
            alt="Image Thumbnail"
          />
        </div>
        <Card.ImgOverlay>
          <div className="d-flex justify-content-between">
            <div className="align-self-start">
              {row.metode_pelatihan !== "Offline" && (
                <Badge
                  bg={`py-3 px-4 badge-card-pelatihan-new`}
                  classNam="d-flex "
                >
                  Pelatihan {row.metode_pelatihan}
                </Badge>
              )}
            </div>
            {show[i] && (
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
            )}
          </div>
        </Card.ImgOverlay>
        <Card.Body className="position-relative">
          <div className="mitra-pelatihan-new">
            <Image
              src={
                (row.gambar_mitra &&
                  process.env.END_POINT_API_IMAGE_PARTNERSHIP +
                    row.gambar_mitra) ||
                "/assets/media/mitra-default.png"
              }
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
            <p className={`pl-18 my-0 text-mitra-new`}>{row.mitra}</p>
            <div className="status align-self-center">
              <p
                className={`${
                  row.status === "Open"
                    ? "status-mitra-open-new"
                    : "status-mitra-close-new"
                } text-uppercase my-0`}
              >
                {row.status}
              </p>
            </div>
          </div>
          <p className={`my-0 title-card-new`}>{row.name}</p>
          <p
            style={{
              fontSize: "14px",
              color: "#6C6C6C",
            }}
          >
            {row.akademi}
          </p>
          <hr />
          {show[i] !== true ? (
            <div className="d-flex flex-column">
              <div className="date d-flex align-items-center align-middle">
                <i className="ri-time-line"></i>
                <span className={`text-date-register-new pl-2`}>
                  Registrasi:{" "}
                  {moment(row.pendaftaran_mulai).format("DD MMMM YYYY")} -{" "}
                  {moment(row.pendaftaran_selesai).format("DD MMMM YYYY")}
                </span>
              </div>
              <div className="date d-flex align-items-center align-middle">
                <i className="ri-group-line"></i>
                <span className={`text-date-register-new pl-2`}>
                  Kuota: {row.kuota_peserta} Peserta
                </span>
              </div>
            </div>
          ) : (
            <div style={{ marginTop: "21px" }}>
              <Button
                className={`btn-block rounded-xl my-auto btn-quick-view-new`}
                onClick={() => funcQuickView(i)}
              >
                LIHAT SINGKAT
              </Button>
            </div>
          )}
        </Card.Body>
      </div>
    </>
  );
};

export default CardPelatihanOpen;
