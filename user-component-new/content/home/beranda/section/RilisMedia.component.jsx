import Link from "next/link";
import style from "../../../../../styles/peserta/dashboard.module.css";
import { Card } from "react-bootstrap";
import Image from "next/image";
import moment from "moment";

export default function RilisMedia({ berita }) {
  return (
    <div className="rillirs-media py-15">
      <h1 className="fw-600 text-center" style={{ color: "#1F1F1F" }}>
        Rilis Media & Informasi Terbaru
      </h1>

      <div className="row mt-20">
        {berita &&
          berita.map((row, i) => (
            <div className="col-sm-12 col-md-4 mb-5">
              <Card className="h-100 shadow rounded-xl">
                <Image
                  src={
                    (row.gambar &&
                      process.env.END_POINT_API_IMAGE_PUBLIKASI +
                        "publikasi/images/" +
                        row.gambar) ||
                    "/assets/media/default-card.png"
                  }
                  width={360}
                  height={250}
                  objectFit="cover"
                  alt="Image Thumbnail"
                  className={`${style.thumbnail_rilis}`}
                />
                <Card.Body>
                  <div className="d-flex justify-content-between mb-3">
                    <p className={`my-0 ${style.date_rilis}`}>
                      {moment(row.tanggal_publish).format("DD MMMM YYYY")}
                    </p>
                    <div className="status align-self-center">
                      <p
                        className={`${style.kategori_rilis} text-uppercase my-0`}
                      >
                        {row.category_name}
                      </p>
                    </div>
                  </div>
                  <div className="mb-2">
                    <p className={`${style.media_card}`}>{row.judul_berita}</p>
                  </div>

                  <div
                    className="d-flex align-content-end justify-content-end align-self-end mb-3 mr-3"
                    style={{
                      position: "absolute",
                      bottom: "8px",
                      right: "16px",
                    }}
                  >
                    <Link href={`/berita/detail/${row.slug}`} passHref>
                      <a className={`${style.link_rilis}`}>
                        Lihat Detail &rarr;
                      </a>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>

      <div className="container-fluid">
        <div className="row justify-content-center mt-10">
          <Link href="/login">
            <a>
              <button className="btn btn-outline-primary-new font-weight-bolder rounded-pill py-3 px-12">
                Lihat Selengkapnya &rarr;
              </button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
