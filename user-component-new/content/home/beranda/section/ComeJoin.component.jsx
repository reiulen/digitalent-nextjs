import Link from "next/link";
import { Row, Col } from "react-bootstrap";

export default function ComeJoin() {
  return (
    <div className="py-20 come-join">
      <Row>
        <Col md={4}>
          <div>
            <h1 className="fw-600" style={{ color: "#6C6C6C" }}>
              Ayo Bergabung, Jadi Jagoan Digital!
            </h1>
            <Link href="/register">
              <a>
                <button className="btn btn-primary btn-register-peserta btn-sm mt-10 mt-sm-20 mb-10 sm-mb-0">
                  {/* <IconRegister className="mr-2" /> */}
                  Daftar Sekarang!
                </button>
              </a>
            </Link>
          </div>
        </Col>
        <Col md={8}>
          <Row>
            <Col lg={3} md={6}>
              <div
                className="p-5 mt-5 bg-white"
                style={{ border: "1px solid #D7E1EA", borderRadius: "12px" }}
              >
                <p className="fz-32 fw-700 mb-1" style={{ color: "#0063CC" }}>
                  260K+
                </p>
                <p className="fz-14" style={{ color: "#6C6C6C" }}>
                  Pendaftar
                </p>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div
                className="p-5 mt-5 bg-white"
                style={{ border: "1px solid #D7E1EA", borderRadius: "12px" }}
              >
                <p className="fz-32 fw-700 mb-1" style={{ color: "#0063CC" }}>
                  260K+
                </p>
                <p className="fz-14" style={{ color: "#6C6C6C" }}>
                  Pendaftar
                </p>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div
                className="p-5 mt-5 bg-white"
                style={{ border: "1px solid #D7E1EA", borderRadius: "12px" }}
              >
                <p className="fz-32 fw-700 mb-1" style={{ color: "#0063CC" }}>
                  260K+
                </p>
                <p className="fz-14" style={{ color: "#6C6C6C" }}>
                  Pendaftar
                </p>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div
                className="p-5 mt-5 bg-white"
                style={{ border: "1px solid #D7E1EA", borderRadius: "12px" }}
              >
                <p className="fz-32 fw-700 mb-1" style={{ color: "#0063CC" }}>
                  260K+
                </p>
                <p className="fz-14" style={{ color: "#6C6C6C" }}>
                  Pendaftar
                </p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
