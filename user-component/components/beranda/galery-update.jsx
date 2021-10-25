
import Link from "next/link";
import Image from "next/image";
import IconArrow from "../../../components/assets/icon/Arrow2";
import ImageShapes2 from "../../../components/assets/icon-dashboard-peserta/bg-stepes2.png";
import ImageGalery1 from "../../../components/assets/icon-dashboard-peserta/galery1.png";
import ImageGalery2 from "../../../components/assets/icon-dashboard-peserta/galery2.png";
export default function galeryUpdate({gambar}) {
  return (
    <div className="position-relative galery-update max-container">
      <div className="images-shapes">
        <Image src={ImageShapes2}  layout="fill" objectFit="fill"/>
      </div>
    <div style={{ backgroundColor: "#FAFAFB" }} className="py-0 py-xl-15">
      <div className="container-fluid">
            <div className="row mb-10">
              <div className="col-12 col-xl-4">
                <div>
                  <h1
                    className="fw-600 mt-20 position-relative"
                    style={{ color: "#1F1F1F" }}
                  >
                    Galeri Terupdate dan Terkini
                  </h1>
                  <p className="fz-16 mt-5" style={{ color: "#6C6C6C" }}>
                    Temukan konten terupdate dan terkini mengenai Digital Talent
                    Scholarship
                  </p>
                  <Link href="/login">
                    {/* <a>
                      <button className="btn btn-sm btn-login-peserta px-12 py-3 mt-20">
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
              <button className="btn btn-outline-primary-new rounded-pill py-3 px-12 mt-20">
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
              <div className="col-12 col-xl-8 mt-20 mb-10">
                <div className="row justify-content-center">
                  <div className="col-12 col-sm-6 col-md-6 col-xl-4">
                    {/* image 1 */}
                    <div className="w-100 position-relative sm-mt-0 text-center">
                      <Image
                        src={ImageGalery1}
                        alt="Picture of the author"
                        width={330}
                        height={330}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-6 col-xl-4">
                    {/* image 2 */}
                    <div className="w-100 position-relative sm-mt-0 text-center">
                      <Image
                        src={ImageGalery2}
                        alt="Picture of the author"
                        width={330}
                        height={330}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
  )
}
