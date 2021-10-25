import Cardss from "./card";
import Link from "next/link";
import IconArrow from "../../../components/assets/icon/Arrow2";
import { Badge } from "react-bootstrap";
export default function rilisMedia({ berita }) {
  return (
    <div className="py-0 py-xl-20 rillirs-media max-container">
      <h1
        className="fw-600 text-center mt-26 position-relative"
        style={{ color: "#1F1F1F" }}
      >
        Rilis Media & Informasi Terbaru
      </h1>
      {
        // console.log (berita)
      }
      <div className="container-fluid mt-20">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-6 col-xl-4">
            <Cardss>
              <div className="d-flex align-items-center justify-content-between">
                <p className="fw-600" style={{ color: "#6C6C6C" }}>
                  12 Mei 2021
                </p>
                <div></div>
                <Badge bg="light">
                  <div className="text-info font-weight-bolder">Kategori</div>
                </Badge>
              </div>
              <h1 className="fz-18 fw-600 mt-4" style={{ color: "#1F1F1F" }}>
                Pengumuman Kelulusan Peserta Pelatihan Daring Gelombang 1
                Program VSGA DTS 2021
              </h1>

              <div
                className="d-flex align-items-center justify-content-end"
                style={{
                  position: "absolute",
                  bottom: "28px",
                  right: "24px",
                }}
              >
                <div
                  className="font-weight-bolder"
                  style={{ color: "#6C6C6C" }}
                >
                  Lihat Detail
                </div>
                <i
                  className="ri-arrow-right-line"
                  style={{ color: "#6C6C6C" }}
                ></i>
              </div>
            </Cardss>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-xl-4">
            <Cardss>
              <div className="d-flex align-items-center justify-content-between">
                <p className="fw-600" style={{ color: "#6C6C6C" }}>
                  12 Mei 2021
                </p>
                <div></div>
                <Badge bg="light">
                  <div className="text-info font-weight-bolder">Kategori</div>
                </Badge>
              </div>
              <h1 className="fz-18 fw-600 mt-4" style={{ color: "#1F1F1F" }}>
                Pengumuman Kelulusan Peserta Pelatihan Daring Gelombang 1
                Program VSGA DTS 2021
              </h1>

              <div
                className="d-flex align-items-center justify-content-end"
                style={{
                  position: "absolute",
                  bottom: "28px",
                  right: "24px",
                  cursor: "pointer",
                }}
              >
                <div
                  className="font-weight-bolder"
                  style={{ color: "#6C6C6C" }}
                >
                  Lihat Detail
                </div>
                <i
                  className="ri-arrow-right-line"
                  style={{ color: "#6C6C6C" }}
                ></i>
              </div>
            </Cardss>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-xl-4">
            <Cardss>
              <div className="d-flex align-items-center justify-content-between">
                <p className="fw-600" style={{ color: "#6C6C6C" }}>
                  12 Mei 2021
                </p>
                <div></div>
                <Badge bg="light">
                  <div className="text-info font-weight-bolder">Kategori</div>
                </Badge>
              </div>
              <h1 className="fz-18 fw-600 mt-4" style={{ color: "#1F1F1F" }}>
                Pengumuman Kelulusan Peserta Pelatihan Daring Gelombang 1
                Program VSGA DTS 2021
              </h1>

              <div
                className="d-flex align-items-center justify-content-end"
                style={{
                  position: "absolute",
                  bottom: "28px",
                  right: "24px",
                }}
              >
                <div
                  className="font-weight-bolder"
                  style={{ color: "#6C6C6C" }}
                >
                  Lihat Detail
                </div>
                <i
                  className="ri-arrow-right-line"
                  style={{ color: "#6C6C6C" }}
                ></i>
              </div>
            </Cardss>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row justify-content-center mt-20">
          <Link href="/login">
            {/* <a>
              <button className="btn btn-sm btn-login-peserta px-12 py-3">
                Lihat Selengkapnya
                <IconArrow
                  width="8"
                  height="10"
                  fill="#0063CC"
                  className="ml-2"
                  style={{ transform: "rotate(0)" }}
                />
              </button>
            </a> */}
            <a>
              <button className="btn btn-outline-primary-new rounded-pill py-3 px-12">
                Lihat Selengkapnya
                <IconArrow
                  width="8"
                  height="10"
                  fill="#0063CC"
                  className="ml-2"
                  style={{ transform: "rotate(0)" }}
                />
              </button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
