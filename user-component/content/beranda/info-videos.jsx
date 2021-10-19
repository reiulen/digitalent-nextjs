import Link from "next/link";
import IconArrow from "../../../components/assets/icon/Arrow2";
export default function infoVideos() {
  return (
    <div style={{backgroundColor:"white"}} className="py-0 py-xl-30 info-video max-container">
      <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-sm-6">
                <div></div>
              </div>
              <div className="col-12 col-sm-6">
                <div>
                  <h1
                    className="fw-600 mt-26 position-relative"
                    style={{ color: "#1F1F1F" }}
                  >
                    Informasi Dalam Video Terkini
                  </h1>
                  <p className="fz-16 mt-20" style={{ color: "#6C6C6C" }}>
                    Temukan konten terupdate dan terkini mengenai Digital Talent
                    Scholarship
                  </p>
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
          </div>
          </div>
  )
}
