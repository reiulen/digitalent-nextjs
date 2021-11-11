import React from "react";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import SubHeaderComponent from "../../components/template/Subheader.component";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const Penyelenggara = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <>
      <Container fluid className="px-md-30 px-10 py-10">
        <SubHeaderComponent
          data={[{ link: router.asPath, name: "Penyelenggara Pelatihan" }]}
        />

        <section className="penyelenggara-title-filter">
          <h1 className="mb-4">Penyelenggara Pelatihan</h1>
          <p>
            Memiliki Lembaga Pelatihan dan ingin menjadi bagian dari Program
            Digitalent? tanya saja{" "}
            <span className="text-primary fw-500" style={{ cursor: "pointer" }}>
              di sini
            </span>
          </p>

          <div className="filter my-15">
            <Row>
              <Col md={7}>
                <form className="mb-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div
                        className="input-group-text bg-light border-right-0 pr-5"
                        style={{
                          borderTopLeftRadius: "150px",
                          borderBottomLeftRadius: "150px",
                        }}
                      >
                        <i className="ri-search-line"></i>
                      </div>
                    </div>
                    <input
                      type="text"
                      className="form-control border-left-0 border p-0 bg-light"
                      placeholder="Cari Penyelenggara.."
                      style={{ height: "46px" }}
                    />
                    <div>
                      <button
                        className="btn btn-primary-dashboard"
                        style={{
                          borderTopRightRadius: "150px",
                          borderBottomRightRadius: "150px",
                          height: "46px",
                        }}
                        type="submit"
                      >
                        Cari
                      </button>
                    </div>
                  </div>
                </form>
              </Col>
              <Col md={5}>
                <div className="d-flex flex-row align-items-center justify-content-end filter-action">
                  <p className="mb-0">Urutkan berdasarkan :</p>
                  <Button
                    variant="transparent"
                    className="btn-penyelenggara-rounded bg-penyelenggara-primary mx-10 text-white"
                  >
                    A - Z
                  </Button>
                  <Button
                    variant="transparent"
                    className="btn-penyelenggara-rounded bg-penyelenggara-light"
                  >
                    Z - A
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </section>

        <section className="penyelenggara-content">
          <Row>
            {[1, 2, 3, 4, 5, 6].map((row, i) => (
              <Col md={2} className="text-center">
                <div className="penyelenggara-head">
                  <div className="penyelenggara-wrapper">
                    <h1>Hello</h1>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </>
  );
};

export default Penyelenggara;
