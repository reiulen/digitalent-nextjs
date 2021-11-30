import Link from "next/link";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { helperDigitsCount } from "../../../../../utils/middleware/helper";

export default function ComeJoin() {
  const { peserta, loading, error } = useSelector(
    (state) => state.berandaFooterPeserta
  );

  const fotmatThousand = (number) => {
    let value = null;
    if (helperDigitsCount(number) === 4) {
      value = (number + "").slice(0, 1);
    } else if (helperDigitsCount(number) === 5) {
      value = (number + "").slice(0, 2);
    } else if (helperDigitsCount(number) > 6) {
      value = (number + "").slice(0, 3);
    } else {
      value = number;
    }

    return value;
  };

  return (
    <div className="py-lg-20 come-join">
      <Row>
        <Col md={12} lg={4}>
          <div>
            <h1 className="fw-600" style={{ color: "#6C6C6C" }}>
              Ayo Bergabung, Jadi Jagoan Digital!
            </h1>
            <Link href="/register">
              <a>
                <button className="btn btn-beranda-primary mt-5 mb-10 sm-mb-0 fw-500 rounded-pill">
                  {/* <IconRegister className="mr-2" /> */}
                  Daftar Sekarang!
                </button>
              </a>
            </Link>
          </div>
        </Col>
        <Col md={12} lg={8}>
          <Row>
            {peserta && (
              <>
                <Col lg={3} md={6}>
                  <div
                    className="p-5 mt-5 bg-white"
                    style={{
                      border: "1px solid #D7E1EA",
                      borderRadius: "12px",
                    }}
                  >
                    <p
                      className="fz-32 fw-700 mb-1"
                      style={{ color: "#0063CC" }}
                    >
                      {helperDigitsCount(peserta.pelatihan) > 4
                        ? fotmatThousand(peserta.pelatihan) + "K"
                        : peserta.pelatihan}
                    </p>
                    <p className="fz-14" style={{ color: "#6C6C6C" }}>
                      Pelatihan
                    </p>
                  </div>
                </Col>
                <Col lg={3} md={6}>
                  <div
                    className="p-5 mt-5 bg-white"
                    style={{
                      border: "1px solid #D7E1EA",
                      borderRadius: "12px",
                    }}
                  >
                    <p
                      className="fz-32 fw-700 mb-1"
                      style={{ color: "#0063CC" }}
                    >
                      {helperDigitsCount(peserta.pendaftar) > 4
                        ? fotmatThousand(peserta.pendaftar) + "K"
                        : peserta.pendaftar}
                    </p>
                    <p className="fz-14" style={{ color: "#6C6C6C" }}>
                      Pendaftar
                    </p>
                  </div>
                </Col>
                <Col lg={3} md={6}>
                  <div
                    className="p-5 mt-5 bg-white"
                    style={{
                      border: "1px solid #D7E1EA",
                      borderRadius: "12px",
                    }}
                  >
                    <p
                      className="fz-32 fw-700 mb-1"
                      style={{ color: "#0063CC" }}
                    >
                      {helperDigitsCount(peserta.peserta) > 4
                        ? fotmatThousand(peserta.peserta) + "K"
                        : peserta.peserta}
                    </p>
                    <p className="fz-14" style={{ color: "#6C6C6C" }}>
                      Peserta
                    </p>
                  </div>
                </Col>
                <Col lg={3} md={6}>
                  <div
                    className="p-5 mt-5 bg-white"
                    style={{
                      border: "1px solid #D7E1EA",
                      borderRadius: "12px",
                    }}
                  >
                    <p
                      className="fz-32 fw-700 mb-1"
                      style={{ color: "#0063CC" }}
                    >
                      {helperDigitsCount(peserta.lulus) > 4
                        ? fotmatThousand(peserta.lulus) + "K"
                        : peserta.lulus}
                    </p>
                    <p className="fz-14" style={{ color: "#6C6C6C" }}>
                      Peserta Lulus
                    </p>
                  </div>
                </Col>
              </>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
}
