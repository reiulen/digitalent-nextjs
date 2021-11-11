import React from "react";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import SubHeaderComponent from "../../components/template/Subheader.component";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import Pagination from "react-js-pagination";

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
              <Col md={7} className="my-auto">
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
              <Col md={2} className="my-auto ">
                <p className="mb-3 mb-md-0 float-right">
                  Urutkan berdasarkan :
                </p>
              </Col>
              <Col md={3} className="my-auto">
                <div className="d-flex filter-action">
                  <Button
                    variant="transparent"
                    className="btn-penyelenggara-rounded btn-block bg-penyelenggara-primary text-white mr-3"
                  >
                    A - Z
                  </Button>
                  <Button
                    variant="transparent"
                    className="btn-penyelenggara-rounded mt-0 btn-block bg-penyelenggara-light text-dark"
                  >
                    Z - A
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </section>

        <section className="penyelenggara-content">
          <Row className="d-flex justify-content-between">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((row, i) => (
              <Col
                md={4}
                lg={3}
                xl={2}
                sm={6}
                xs={6}
                className="text-center mb-10"
              >
                <div className="penyelenggara-mitra">
                  <div className="penyelenggara-wrapper mx-auto d-flex align-items-center justify-content-center">
                    <Image
                      src="/assets/media/image-404.png"
                      width={90}
                      height={90}
                      objectFit="contain"
                    />
                  </div>
                  <p className="my-5 ">Google</p>
                </div>
              </Col>
            ))}
          </Row>
          <Row className="my-5 d-flex justify-content-center">
            <div className="table-pagination">
              <Pagination
                activePage={1}
                itemsCountPerPage={3}
                totalItemsCount={7}
                pageRangeDisplayed={3}
                nextPageText={">"}
                prevPageText={"<"}
                firstPageText={"<<"}
                lastPageText={">>"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          </Row>
        </section>
      </Container>
    </>
  );
};

export default Penyelenggara;
