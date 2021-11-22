import Link from "next/link";
import ReactPlayer from "react-player";
import { Row, Col } from "react-bootstrap";

export default function InfoVideo({ video }) {
  return (
    <div className="py-20 info-video">
      <Row>
        <Col md={6}>
          <div className="player-wrapper mb-5">
            <ReactPlayer
              url={
                (video && video.url_video) ||
                `https://www.youtube.com/watch?v=BXWNfxOIaJE&ab_channel=DigitalentMedia`
              }
              className="react-player"
              width="100%"
              height="100%"
              style={{ borderRadius: "15px", overflow: "hidden" }}
            />
          </div>
        </Col>
        <Col md={6} className="my-auto">
          <div className="px-md-20">
            <h1 className="fw-600" style={{ color: "#1F1F1F" }}>
              Informasi Dalam Video Terkini
            </h1>
            <p className="fz-16 my-10" style={{ color: "#6C6C6C" }}>
              {(video && video.isi_video.substring(0, 200) + " ...") ||
                "Temukan konten terupdate dan terkini mengenai Digital Talent Scholarship"}
            </p>
            <Link href="/video">
              <a>
                <button className="btn btn-outline-primary-new font-weight-bolder rounded-pill py-3 px-12 mb-5">
                  Lihat Selengkapnya &rarr;
                </button>
              </a>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}
