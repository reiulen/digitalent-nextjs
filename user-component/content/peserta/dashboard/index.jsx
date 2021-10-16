import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Row, Col, Card, Figure, Button, Badge } from "react-bootstrap";
import style from "../../../../styles/peserta/dashboard.module.css";

import CardPage from "../../../../components/CardPage";
import { useRouter } from "next/router";

const Dashboard = ({ session }) => {
  const router = useRouter();
  console.log(session);
  const handlePublish = (val) => {};

  const handlePage = () => {
    router.push(`peserta/subvit/subtansi/1`);
  };

  return (
    <>
      <div className="container-fluid p-6">
        <Row>
          <Col lg={12} xs={12} className="order-1 order-xxl-2 pb-0">
            <Card className="card-custom bg-primary gutter-b mt-5">
              <Card.Body
                className="pt-2"
                style={{
                  backgroundPosition: "left bottom",
                  backgroundImage: "url('/assets/media/jukut.svg')",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="d-flex align-items-center mb-10">
                  <div className="d-flex flex-column flex-grow-1 font-weight-bold">
                    <Row>
                      <Col md={6}>
                        <Col md={12} className="mt-5">
                          <h3 className="font-weight-bolder text-white">
                            Selamat Datang {session.name}
                          </h3>
                        </Col>
                        <Col md={12}>
                          <p className="font-weight-bold text-white">
                            Sudah Makan Hari ini? <br /> Kalau sudah yuk dicheck
                            verifikasi Test untuk hari ini :)
                          </p>
                        </Col>
                      </Col>

                      <Col md={6}>
                        <div
                          className="ml-auto float-right ilustrator-dashboard"
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "-50px",
                          }}
                        >
                          <Image
                            src="/assets/media/ilustrator-1.svg"
                            width={300}
                            height={200}
                            alt="ilustrator-1"
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Col lg={12} md={12} sm={12}>
          <Row>
            <CardPage
              background="bg-extras"
              icon="new/block-white.svg"
              color="#FFFFFF"
              value={0}
              titleValue=""
              title="Lulus Pelatihan"
              publishedVal=""
              routePublish={() => handlePublish("")}
            />

            <CardPage
              background="bg-success"
              icon="new/open-book.svg"
              color="#FFFFFF"
              value={0}
              titleValue=""
              title="Sedang Berjalan"
              publishedVal=""
              routePublish={() => handlePublish("")}
            />
            <CardPage
              background="bg-warning"
              icon="new/mail-white.svg"
              color="#FFFFFF"
              value={0}
              titleValue=""
              title="Menunggu Selesai"
              publishedVal=""
              routePublish={() => handlePublish("")}
            />
            <CardPage
              background="bg-danger"
              icon="new/done-circle.svg"
              color="#FFFFFF"
              value={0}
              titleValue=""
              title="Tidak Lulus Pelatihan"
              publishedVal=""
              routePublish={() => handlePublish("")}
            />
          </Row>
        </Col>

        <Col lg={12} className="order-1 px-0">
          <Card className="card-custom card-stretch gutter-b">
            <Card.Header className="border-0 mt-3">
              <div className="card-title">
                <Image
                  src="/assets/media/image-30.svg"
                  width={83}
                  height={60}
                />
                <h1
                  className="text-dark mt-2 ml-5"
                  style={{ fontSize: "24px" }}
                >
                  Pelatihan yang Sedang Berjalan
                </h1>
              </div>
              <div className="card-toolbar">
                <Link href="/pelatihan/pelatihan/tambah-pelatihan">
                  {"Lihat Selengkapnya >"}
                </Link>
              </div>
            </Card.Header>

            <Card.Body>
              <Card className="shadow mb-5">
                <Card.Body className="pb-0 pt-0 pl-0 ">
                  <Row>
                    <Col md={3}>
                      <Image
                        layout="fill"
                        src="/assets/media/bg-admin-1.png"
                        objectFit="cover"
                        className={`${style.figure_img} img-fluid`}
                      />
                      <Card.ImgOverlay>
                        <Badge bg="secondary text-white text-uppercase">
                          Pelatihan Online
                        </Badge>
                      </Card.ImgOverlay>
                    </Col>
                    <Col md={9} className="px-10 pt-5">
                      <div className="d-flex flex-row justify-content-start align-items-center">
                        <Image
                          width={64}
                          height={64}
                          className={style.figure_img_mitra}
                          objectFit="cover"
                          src="/assets/media/mitra-icon/bukalapak-1.svg"
                        />
                        <div className="penyelenggara flex-column align-items-start ml-8 pt-2">
                          <h4 className="font-weight-bolder my-0">
                            Intermediate Multimedia Designer Intermediate
                            Multimedia Designer
                          </h4>
                          <h4 className="font-weight-bolder">
                            Intermediate Multimedia Designer - Gojek Akademi
                          </h4>
                        </div>
                      </div>

                      <Row className="mt-10">
                        <Col md={6}>
                          <div className="d-flex flex-row">
                            <div className="date d-flex align-items-center align-middle mr-7">
                              <i className="ri-time-line"></i>
                              <span
                                className={`${style.text_date_register} pl-2`}
                              >
                                05 Jul 21 - 31 Jul 21
                              </span>
                            </div>
                            <div className="date d-flex align-items-center align-middle">
                              <i className="ri-group-line"></i>
                              <span
                                className={`${style.text_date_register} pl-2`}
                              >
                                Test Substansi
                              </span>
                            </div>
                          </div>
                        </Col>
                        <Col md={6}></Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col md={6}>
                          <Button
                            variant="primary"
                            className="btn-rounded-full ml-auto bg-blue-primary btn-block d-flex justify-content-center mb-5"
                            size="sm"
                          >
                            <i className="ri-download-cloud-2-fill mr-2"></i>
                            Download Bukti Pendaftaran
                          </Button>
                        </Col>
                        <Col md={6}>
                          <Button
                            variant="primary"
                            className="btn-rounded-full btn-block d-flex justify-content-center mb-5"
                            size="sm"
                            onClick={handlePage}
                          >
                            Kerjakan Test Substansi
                            <i className="ri-arrow-right-s-line ml-2"></i>
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <Card className="shadow mb-5">
                <Card.Body className="pb-0 pt-0 pl-0 ">
                  <Row>
                    <Col md={3}>
                      <Image
                        layout="fill"
                        src="/assets/media/bg-admin-1.png"
                        objectFit="cover"
                        className={`${style.figure_img} img-fluid`}
                      />
                      <Card.ImgOverlay>
                        <Badge bg="secondary text-white text-uppercase">
                          Pelatihan Online
                        </Badge>
                      </Card.ImgOverlay>
                    </Col>
                    <Col md={9} className="px-10 pt-5">
                      <div className="d-flex flex-row justify-content-start align-items-center">
                        <Image
                          width={64}
                          height={64}
                          className={style.figure_img_mitra}
                          objectFit="cover"
                          src="/assets/media/mitra-icon/bukalapak-1.svg"
                        />
                        <div className="penyelenggara flex-column align-items-start ml-8 pt-2">
                          <h4 className="font-weight-bolder my-0">
                            Intermediate Multimedia Designer Intermediate
                            Multimedia Designer
                          </h4>
                          <h4 className="font-weight-bolder">
                            Intermediate Multimedia Designer - Gojek Akademi
                          </h4>
                        </div>
                      </div>

                      <Row className="mt-10">
                        <Col md={6}>
                          <div className="d-flex flex-row">
                            <div className="date d-flex align-items-center align-middle mr-7">
                              <i className="ri-time-line"></i>
                              <span
                                className={`${style.text_date_register} pl-2`}
                              >
                                05 Jul 21 - 31 Jul 21
                              </span>
                            </div>
                            <div className="date d-flex align-items-center align-middle">
                              <i className="ri-group-line"></i>
                              <span
                                className={`${style.text_date_register} pl-2`}
                              >
                                Test Substansi
                              </span>
                            </div>
                          </div>
                        </Col>
                        <Col md={6}></Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col md={6}>
                          <Button
                            variant="primary"
                            className="btn-rounded-full ml-auto bg-blue-primary btn-block d-flex justify-content-center mb-5"
                            size="sm"
                          >
                            <i className="ri-download-cloud-2-fill mr-2"></i>
                            Download Bukti Pendaftaran
                          </Button>
                        </Col>
                        <Col md={6}>
                          <Button
                            variant="primary"
                            className="btn-rounded-full btn-block d-flex justify-content-center mb-5"
                            size="sm"
                          >
                            Kerjakan Test Substansi
                            <i className="ri-arrow-right-s-line ml-2"></i>
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={12} className="order-1 px-0">
          <Card
            bg="transparent"
            border="transparent"
            className="card-custom card-stretch gutter-b"
          >
            <Card.Header
              bg="transparent"
              border="transparent"
              className="bg-transparent border-0 mt-3"
            >
              <div className="card-title">
                <Image
                  src="/assets/media/mitra-icon/bg-beasiswa-1.svg"
                  width={83}
                  height={60}
                />
                <h1
                  className="text-dark mt-2 ml-5"
                  style={{ fontSize: "24px" }}
                >
                  Beasiswa yang tersedia
                </h1>
              </div>
              <div className="card-toolbar">
                <Link href="/pelatihan/pelatihan/tambah-pelatihan">
                  {"Lihat Selengkapnya >"}
                </Link>
              </div>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Card className="shadow mb-3">
                    <Card.Body className="text-center">
                      <Image
                        src="/assets/media/mitra-icon/logo-ui-1.svg"
                        width={200}
                        height={110}
                      />
                      <p className="" className={style.text_link}>
                        <Link href="/pelatihan/pelatihan/tambah-pelatihan">
                          Universitas Indonesia
                        </Link>
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card className="shadow mb-3">
                    <Card.Body className="text-center">
                      <Image
                        src="/assets/media/mitra-icon/logo-itb-1.svg"
                        width={200}
                        height={110}
                      />
                      <p className="" className={style.text_link}>
                        <Link href="/pelatihan/pelatihan/tambah-pelatihan">
                          Institut Teknologi Bandung
                        </Link>
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card className="shadow mb-3">
                    <Card.Body className="text-center">
                      <Image
                        src="/assets/media/mitra-icon/logo-ui-1.svg"
                        width={200}
                        height={110}
                      />
                      <p className="" className={style.text_link}>
                        <Link href="/pelatihan/pelatihan/tambah-pelatihan">
                          Universitas Indonesia
                        </Link>
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Card className="shadow mb-3">
                    <Card.Body className="text-center">
                      <Image
                        src="/assets/media/mitra-icon/logo-itb-1.svg"
                        width={200}
                        height={110}
                      />
                      <p className="" className={style.text_link}>
                        <Link href="/pelatihan/pelatihan/tambah-pelatihan">
                          Institut Teknologi Bandung
                        </Link>
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={12} className="order-1 px-0">
          <Card className="card-custom card-stretch gutter-b">
            <Card.Header className="border-0 mt-3">
              <div className="card-title">
                <Image
                  src="/assets/media/mitra-icon/simonas-1.svg"
                  width={83}
                  height={60}
                />
                <h1
                  className="text-dark mt-2 ml-5"
                  style={{ fontSize: "24px" }}
                >
                  Rekomendasi Pekerjaan
                </h1>
              </div>
              <div className="card-toolbar">
                <Link href="/pelatihan/pelatihan/tambah-pelatihan">
                  {"Lihat Selengkapnya >"}
                </Link>
              </div>
            </Card.Header>

            <Card.Body className="pt-3">
              <div className="position-relative overflow-hidden mb-5">
                <i className="ri-search-line left-center-absolute ml-2"></i>
                <input
                  type="text"
                  className="form-control pl-10"
                  placeholder="Ketik disini untuk Pencarian..."
                  //   onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn bg-blue-primary text-white right-center-absolute"
                  style={{
                    borderTopLeftRadius: "0",
                    borderBottomLeftRadius: "0",
                  }}
                  //   onClick={handleSearch}
                >
                  Cari
                </button>
              </div>
              <Card className="shadow mb-4">
                <Card.Body className="pb-0 pt-6">
                  <Row>
                    <Col md={2} className="py-6 text-center">
                      <Figure>
                        <Image
                          width={131}
                          height={99}
                          src="/assets/media/mitra-icon/telkom-1.svg"
                          objectFit="cover"
                          className={style.figure_img}
                        />
                      </Figure>
                    </Col>
                    <Col md={10} className="py-6">
                      <div className="d-flex flex-row justify-content-start align-items-center mb-3">
                        <div className="penyelenggara flex-column align-items-start">
                          <p className="my-0">
                            PT. Telkom Indonesia (Persero) Tbk
                          </p>
                          <h5 className="font-weight-bold mt-2">
                            Data Science
                          </h5>
                        </div>
                      </div>

                      <Row>
                        <Col md={6} className="my-auto">
                          <span className="label label-inline label-light-danger font-weight-bold">
                            Salary Undisclosed
                          </span>
                          <span className="label label-inline label-light-danger font-weight-bold ml-2">
                            Deadline 30 September 2021
                          </span>
                          <div className="worker d-flex mt-5">
                            <div className="label-badge mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="19"
                                height="19"
                              >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path
                                  d="M21 19h2v2H1v-2h2V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v15h4v-8h-2V9h3a1 1 0 0 1 1 1v9zM5 5v14h8V5H5zm2 6h4v2H7v-2zm0-4h4v2H7V7z"
                                  fill="rgba(108,108,108,1)"
                                />
                              </svg>
                              <span
                                className={`${style.text_date_register} pl-2`}
                              >
                                IT & Telco
                              </span>
                            </div>
                            <div className="label-badge mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="19"
                                height="19"
                              >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path
                                  d="M12 20.9l4.95-4.95a7 7 0 1 0-9.9 0L12 20.9zm0 2.828l-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
                                  fill="rgba(108,108,108,1)"
                                />
                              </svg>
                              <span
                                className={`${style.text_date_register} pl-2`}
                              >
                                Jakarta Selatan
                              </span>
                            </div>
                            <div className="label-badge mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="19"
                                height="19"
                              >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path
                                  d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4zM4 16v3h16v-3H4zm0-2h16V7H4v7zM9 3v2h6V3H9zm2 8h2v2h-2v-2z"
                                  fill="rgba(108,108,108,1)"
                                />
                              </svg>
                              <span
                                className={`${style.text_date_register} pl-2`}
                              >
                                Permanent Employees
                              </span>
                            </div>
                          </div>
                        </Col>
                        <Col md={6}>
                          <Button
                            variant="primary"
                            className="btn-rounded-full ml-auto bg-blue-primary"
                            size="sm"
                          >
                            Apply Now
                            <i className="ri-arrow-right-s-line ml-2"></i>
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <Card className="shadow mb-4">
                <Card.Body className="pb-0 pt-6">
                  <Row>
                    <Col md={2} className="py-6 text-center">
                      <Figure>
                        <Image
                          width={131}
                          height={99}
                          src="/assets/media/mitra-icon/telkom-1.svg"
                          objectFit="cover"
                          className={style.figure_img}
                        />
                      </Figure>
                    </Col>
                    <Col md={10} className="py-6">
                      <div className="d-flex flex-row justify-content-start align-items-center mb-3">
                        <div className="penyelenggara flex-column align-items-start">
                          <p className="my-0">
                            PT. Telkom Indonesia (Persero) Tbk
                          </p>
                          <h5 className="font-weight-bold mt-2">
                            Data Science
                          </h5>
                        </div>
                      </div>

                      <Row>
                        <Col md={6} className="my-auto">
                          <span className="label label-inline label-light-danger font-weight-bold">
                            Salary Undisclosed
                          </span>
                          <span className="label label-inline label-light-danger font-weight-bold ml-2">
                            Deadline 30 September 2021
                          </span>
                          <div className="worker d-flex mt-5">
                            <div className="label-badge mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="19"
                                height="19"
                              >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path
                                  d="M21 19h2v2H1v-2h2V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v15h4v-8h-2V9h3a1 1 0 0 1 1 1v9zM5 5v14h8V5H5zm2 6h4v2H7v-2zm0-4h4v2H7V7z"
                                  fill="rgba(108,108,108,1)"
                                />
                              </svg>
                              <span
                                className={`${style.text_date_register} pl-2`}
                              >
                                IT & Telco
                              </span>
                            </div>
                            <div className="label-badge mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="19"
                                height="19"
                              >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path
                                  d="M12 20.9l4.95-4.95a7 7 0 1 0-9.9 0L12 20.9zm0 2.828l-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
                                  fill="rgba(108,108,108,1)"
                                />
                              </svg>
                              <span
                                className={`${style.text_date_register} pl-2`}
                              >
                                Jakarta Selatan
                              </span>
                            </div>
                            <div className="label-badge mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="19"
                                height="19"
                              >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path
                                  d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4zM4 16v3h16v-3H4zm0-2h16V7H4v7zM9 3v2h6V3H9zm2 8h2v2h-2v-2z"
                                  fill="rgba(108,108,108,1)"
                                />
                              </svg>
                              <span
                                className={`${style.text_date_register} pl-2`}
                              >
                                Permanent Employees
                              </span>
                            </div>
                          </div>
                        </Col>
                        <Col md={6}>
                          <Button
                            variant="primary"
                            className="btn-rounded-full ml-auto bg-blue-primary"
                            size="sm"
                          >
                            Apply Now
                            <i className="ri-arrow-right-s-line ml-2"></i>
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Col>
      </div>
    </>
  );
};

export default Dashboard;
