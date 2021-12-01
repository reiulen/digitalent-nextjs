import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import style from "../../../styles/peserta/dashboard.module.css";
import Image from "next/image";

const CardPelatihanClose = ({ row }) => {
  return (
    <>
      <Button
        variant="transparent"
        disabled
        className={`p-0 mb-0 btn-disabled-pelatihan-new`}
      >
        <div className={`parent-image-pelatihan-new`}>
          <Image
            className={`image-list-pelatihan-new`}
            src={
              (row.gambar &&
                row.gambar !== "Belum ada file" &&
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
              <Badge
                bg={`py-3 px-4 badge-card-pelatihan-new`}
                classNam="d-flex "
              >
                Pelatihan {row.metode_pelatihan}
              </Badge>
            </div>
          </div>
        </Card.ImgOverlay>
        <Card.Body className="position-relative">
          <div className="mitra-pelatihan-new">
            <Image
              src={
                (row.gambar_mitra &&
                  row.gambar_mitra !== "Belum ada file" &&
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
            className="d-flex justify-content-between position-relative pb-0 mb-0 flex-wrap"
            style={{ top: "-15px" }}
          >
            <p className={`pl-18 my-0 text-mitra-new`}>{row.mitra}</p>
            <div className="status align-self-center">
              <p
                className={`${
                  row.status === "Open"
                    ? "status-mitra-open-new"
                    : "status-mitra-close-new"
                } text-uppercase mt-2 mt-lg-2 mt-xl-0 ml-md-17 ml-17`}
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
            className=" text-left"
          >
            {row.akademi}
          </p>
          <hr />

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
        </Card.Body>
      </Button>
    </>
  );
};

export default CardPelatihanClose;
