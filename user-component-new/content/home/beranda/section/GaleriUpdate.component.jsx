import { Col, Row } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";

export default function GaleriUpdate({ gambar }) {
  return (
    <div className="galery-update pt-lg-20 pb-lg-10">
      <Row className="my-auto">
        <Col xl={4} md={12} className="mb-10 mb-0">
          <h1 className="fw-600" style={{ color: "#1F1F1F" }}>
            Galeri Terupdate dan Terkini
          </h1>
          <p className="fz-16 mt-5" style={{ color: "#6C6C6C" }}>
            Temukan konten terupdate dan terkini mengenai Digital Talent
            Scholarship
          </p>
          <Link href="/galeri">
            <a>
              <button className="btn btn-outline-primary-new rounded-pill font-weight-bolder py-3 px-12 mt-lg-20 mt-md-10">
                Lihat Selengkapnya >
              </button>
            </a>
          </Link>
        </Col>
        <Col xl={8} md={12}>
          <Row className="justify-content-xl-end">
            {gambar &&
              gambar.map((row, i) => (
                <Col
                  md={6}
                  lg={4}
                  className="text-xl-right text-md-left text-left mb-md-0 mb-10"
                >
                  <img
                    src={
                      (row.gambar &&
                        process.env.END_POINT_API_IMAGE_PUBLIKASI +
                          "publikasi/images/" +
                          row.gambar) ||
                      "/assets/media/image-20.png"
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    alt="Picture of the author"
                    className="rounded-xl float-right"
                  />
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}
