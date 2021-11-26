import { Col, Row } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";

export default function GaleriUpdate({ gambar }) {
  return (
    <div className="galery-update pt-20 pb-10">
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
              <button className="btn btn-outline-primary-new rounded-pill font-weight-bolder py-3 px-12 mt-20">
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
                  md={4}
                  className="text-xl-right text-md-center text-center mb-md-0 mb-10"
                >
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
