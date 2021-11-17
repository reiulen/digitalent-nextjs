import React, { useState, useEffect } from "react";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import SubHeaderComponent from "../../components/template/Subheader.component";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import Pagination from "react-js-pagination";
import { getAllPenyeleggaraPage } from "../../../redux/actions/beranda/beranda.actions";
import { SweatAlert } from "../../../utils/middleware/helper/index";
import PulseLoaderRender from "../../components/loader/PulseLoader";

const Penyelenggara = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { penyelenggara, loading, error } = useSelector(
    (state) => state.allPenyelenggaraPage
  );

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    if (error) {
      SweatAlert("Error", error, "error");
    }
  }, [error]);

  const handlePagination = (pageNumber) => {
    setPage(pageNumber);
    dispatch(getAllPenyeleggaraPage(pageNumber, 24, search, order));
  };

  const handleSearch = () => {
    setPage(1);
    dispatch(getAllPenyeleggaraPage(1, 24, search, order));
  };

  const handleOrder = (value) => {
    setPage(1);
    setOrder(value);
    dispatch(getAllPenyeleggaraPage(1, 24, search, order));
  };

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
                      onChange={(e) => setSearch(e.target.value)}
                      value={search}
                    />
                    <div>
                      <button
                        className="btn btn-primary-dashboard"
                        style={{
                          borderTopRightRadius: "150px",
                          borderBottomRightRadius: "150px",
                          height: "46px",
                        }}
                        type="button"
                        onClick={() => handleSearch()}
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
                    className={
                      order === "asc"
                        ? `bg-penyelenggara-primary btn-penyelenggara-rounded btn-block  mr-3`
                        : `bg-penyelenggara-light btn-penyelenggara-rounded btn-block  mr-3`
                    }
                    onClick={() => handleOrder("asc")}
                  >
                    A - Z
                  </Button>
                  <Button
                    variant="transparent"
                    className={
                      order === "desc"
                        ? `bg-penyelenggara-primary btn-penyelenggara-rounded btn-block`
                        : `bg-penyelenggara-light btn-penyelenggara-rounded btn-block`
                    }
                    onClick={() => handleOrder("desc")}
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
            {loading && <PulseLoaderRender />}
            {!penyelenggara ||
              (penyelenggara && penyelenggara.data.list_mitras.length === 0 ? (
                <Col md={12} className="text-center mb-10 mt-11">
                  <h1>Data Kosong</h1>
                </Col>
              ) : (
                penyelenggara.data.list_mitras.map((row, i) => (
                  <Col
                    md={4}
                    lg={3}
                    xl={2}
                    sm={6}
                    xs={6}
                    className="text-center mb-10"
                    key={i}
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
                      <p className="my-5 ">{row.name}</p>
                    </div>
                  </Col>
                ))
              ))}
          </Row>
          <Row className="my-5 d-flex justify-content-center">
            {penyelenggara &&
              penyelenggara.data.perPage < penyelenggara.data.total && (
                <div className="table-pagination">
                  <Pagination
                    activePage={page}
                    itemsCountPerPage={penyelenggara.data.perPage}
                    totalItemsCount={penyelenggara.data.total}
                    pageRangeDisplayed={3}
                    onChange={handlePagination}
                    nextPageText={">"}
                    prevPageText={"<"}
                    firstPageText={"<<"}
                    lastPageText={">>"}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                </div>
              )}
          </Row>
        </section>
      </Container>
    </>
  );
};

export default Penyelenggara;
