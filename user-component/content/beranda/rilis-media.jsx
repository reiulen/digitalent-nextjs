import Cardss from "./card";
import Link from "next/link";
import IconArrow from "../../../components/assets/icon/Arrow2";
export default function rilisMedia() {
  return (
    <div className="py-0 py-xl-20 rillirs-media">
      <h1
        className="fw-600 text-center mt-26 position-relative"
        style={{ color: "#1F1F1F" }}
      >
        Rilis Media & Informasi Terbaru
      </h1>
      <div className="container-fluid mt-20">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-6 col-xl-4">
            <Cardss />
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
