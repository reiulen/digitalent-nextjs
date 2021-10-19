import Cardss from "./card";
import Link from "next/link";
import IconArrow from "../../../components/assets/icon/Arrow2";
export default function rilisMedia() {
  return (
    <div className="py-0 py-xl-20 rillirs-media max-container">
      <h1
        className="fw-600 text-center mt-26 position-relative"
        style={{ color: "#1F1F1F" }}
      >
        Rilis Media & Informasi Terbaru
      </h1>
      <div className="container-fluid mt-20">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-6 col-xl-4">
            <Cardss>
               {/* <div className="rounded"></div> */}
                    <div className="d-flex align-items-center justify-content-between" >
                      <p className="fw-600" style={{ color: "#6C6C6C" }}>
                        Gojek
                      </p>
                      <button className="btn btn-green-rounded">OPEN</button>
                    </div>
                    <h1
                      className="fz-18 fw-600 mt-4"
                      style={{ color: "#1F1F1F" }}
                    >
                      Pengumuman Kelulusan Peserta Pelatihan Daring Gelombang 1 Program VSGA DTS 2021
                    </h1>

                    <div className="d-flex align-items-center justify-content-end" style={{
                      position: "absolute",
    bottom: "28px",
    right: "24px"
                    }}>
                <p className="mb-0 fz-14 fw-600" style={{ color: "#6C6C6C" }}>
                  Lihat Detail
                </p>
                <IconArrow
                  width="8"
                  height="10"
                  fill="#6C6C6C"
                  className="ml-2"
                  style={{ transform: "rotate(0)" }}
                />
              </div>
                  
            </Cardss>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-xl-4">
            <Cardss />
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-xl-4">
            <Cardss />
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row justify-content-center mt-20">
          <Link href="/login">
            <a>
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
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
