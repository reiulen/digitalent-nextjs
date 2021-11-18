import { Container } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";

export default function GaleriUpdate({ gambar }) {
  return (
    <div className="position-relative galery-update">
      <div style={{ backgroundColor: "#FAFAFB" }} className="py-0 py-xl-10">
        <Container fluid className="px-md-20 ">
          <div className="container-fluid">
            <div className="row mb-10">
              <div className="col-12 col-md-4">
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
                  <Link href="/galeri">
                    <a>
                      <button className="btn btn-outline-primary-new rounded-pill font-weight-bolder py-3 px-12 mt-20">
                        Lihat Selengkapnya &rarr;
                      </button>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="col-12 col-md-8 mt-20 mb-10">
                <div className="row justify-content-end">
                  {gambar &&
                    gambar.map((row, i) => (
                      <div className="col-md-4 mb-5 mr-md-5">
                        <div className="w-100 position-relative sm-mt-0 text-center">
                          <Image
                            src={
                              (row.gambar &&
                                process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                  "publikasi/images/" +
                                  row.gambar) ||
                              "/assets/media/image-20.png"
                            }
                            alt="Picture of the author"
                            objectFit="cover"
                            width={330}
                            height={330}
                            className="rounded-xl"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
