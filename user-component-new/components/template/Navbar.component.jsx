import React, { useEffect, useState, Fragment } from "react";
import router, { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { signOut } from "next-auth/client";
import IconArrow from "../../../components/assets/icon/Arrow2";
import style from "./Navbar.module.css";
import Image from "next/image";
import dynamic from "next/dynamic";
import LoadingSidebar from "../loader/LoadingSidebar";

import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Dropdown,
  Col,
  Row,
  Container,
  Button,
} from "react-bootstrap";
import IconSearch from "../../../components/assets/icon/Search";
import IconLogin from "../../../components/assets/icon-dashboard-peserta/Login";
import IconRegister from "../../../components/assets/icon-dashboard-peserta/Register";
import Cookies from "js-cookie";

import axios from "axios";

const Sidebar = dynamic(
  () => import("../../../user-component/components/template/Sidebar.component"),
  {
    loading: function loadingNow() {
      return <LoadingSidebar />;
    },
    ssr: false,
  }
);

const Navigationbar = ({ session }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const { error: errorDataPribadi, dataPribadi } = useSelector(
    (state) => state.getDataPribadi
  );

  useEffect(() => {
    if (session) {
      if (
        dataPribadi &&
        Object.keys(dataPribadi).length !== 0 &&
        !dataPribadi.status
      ) {
        router.push("/peserta/wizzard");
      }
    }
  }, []);

  const [akademi, setAkademi] = useState([]);
  const getAkademi = async () => {
    let link =
      process.env.END_POINT_API_PELATIHAN + `api/v1/akademi/dasboard-akademi`;
    const { data } = await axios.get(link);
    setAkademi(data.data);
    return data.data;
  };

  useEffect(() => {
    getAkademi();
  }, []);

  const getSimonas = async () => {
    const link = "http://simonas-dev.majapahit.id/api/job";
    try {
      const data = await axios.get("http://simonas-dev.majapahit.id/api/job");
      if (data) {
        setSimonas(data);
      }
    } catch (error) {
      notify(error);
    }
  };
  const [beasiswa, setBeasiswa] = useState([]);
  const [simonas, setSimonas] = useState([]);

  const handlerLogout = () => {
    Cookies.remove("id_tema");
    Cookies.remove("id_pelatihan");
    signOut();
  };

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  let routerPath;
  if (router.pathname.includes("form-pendaftaran"))
    routerPath = "form-pendaftaran";
  if (router.pathname === "/peserta/subvit/substansi/[id]")
    routerPath = "/peserta/subvit/substansi/[id]";
  if (router.pathname === "/peserta/subvit/survey/[id]")
    routerPath = "/peserta/subvit/survey/[id]";
  if (router.pathname === "/peserta/subvit/trivia/[id]")
    routerPath = "/peserta/subvit/trivia/[id]";
  if (router.pathname === "/peserta/subvit/mid-test/[id]")
    routerPath = "/peserta/subvit/mid-test/[id]";
  if (router.pathname === "/peserta/subvit/survey/[id]")
    routerPath = "/peserta/subvit/survey/[id]";
  if (router.pathname === "/peserta/form-lpj") routerPath = "/peserta/form-lpj";
  if (router.pathname == "/peserta/wizzard") routerPath = "/peserta/wizzard";
  if (router.pathname == "/") routerPath = "/";

  return (
    <>
      <Navbar
        bg="white"
        expand="lg"
        className="shadow header-dashboard d-flex pr-0 px-md-25 px-10"
        sticky="top"
      >
        <Col
          sm={12}
          lg={1}
          className=" d-flex justify-content-between justify-content-lg-center align-items-center"
        >
          <Navbar.Brand href="/">
            <Image
              src={`/assets/icon/mainlogo.svg`}
              width={50}
              height={50}
              alt="brand-navbar"
            />
          </Navbar.Brand>
          <div className="d-flex d-lg-none justify-content-end align-items-center">
            {!isNavOpen && session && session.roles[0] === "user" && (
              <div className="row m-3">
                <a
                  className="col-3 col-xl-4 text-center"
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <i className="ri-search-2-line ri-2x mx-3 text-gray"></i>
                </a>
                <a href="#" className="col-3 col-xl-4 text-center">
                  <i className="ri-customer-service-2-line ri-2x mx-3 text-gray"></i>
                </a>
                <a href="#" className="col-3 col-xl-4 text-center">
                  <i className="ri-heart-line ri-2x mx-3 text-gray"></i>
                </a>
                <a href="#" className="col-3 col-xl-4 text-center">
                  <i className="ri-notification-4-line ri-2x mx-3 text-gray"></i>
                </a>
              </div>
            )}
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              onClick={(e) => {
                setIsNavOpen(!isNavOpen);
              }}
              className="p-3"
            >
              {isNavOpen ? (
                <i className="ri-close-line"></i>
              ) : (
                <i className="ri-menu-line"></i>
              )}
            </Navbar.Toggle>
          </div>
        </Col>
        {showSearch && (
          <Form className="w-100 my-2 mx-1 row ">
            <div className="position-relative w-100">
              <FormControl
                type="search"
                placeholder="Cari"
                className="pl-10 rounded-full border-search py-6"
                aria-label="Search"
                style={{
                  backgroundColor: "#F2F7FC",
                  border: "0px !important",
                }}
              />
              <IconSearch
                className="left-center-absolute"
                style={{ left: "10px" }}
              />
            </div>
          </Form>
        )}
        <Navbar.Collapse id="basic-navbar-nav" className={`${style.collapsed}`}>
          <Nav className="me-auto dropdown-explore btn-masuk-peserta mr-1 d-lg-block d-none">
            {/* MENU */}
            <div className="row mx-1 my-0">
              <NavDropdown
                title="Menu"
                id="basic-nav-dropdown"
                className="navdropdown-child position-relative w-100 text-menu"
              >
                <Link href="/" passHref>
                  <NavDropdown.Item className="navdropdown-child">
                    Beranda
                  </NavDropdown.Item>
                </Link>
                <div className="btn-group dropright w-100">
                  <a
                    type="button"
                    className="btn rounded-0 btn-white-navbar btn-block dropdown-toggle d-flex justify-content-between align-items-center w-100"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Pelatihan
                  </a>
                  <div className="dropdown-menu ml-3">
                    {akademi.map((item, i) => {
                      return (
                        <Link key={item.id} href={`/detail/akademi/${item.id}`}>
                          <a className="dropdown-item navdropdown-child">
                            {item.slug}
                          </a>
                        </Link>
                      );
                    })}
                  </div>
                </div>
                <div className="btn-group dropright w-100">
                  <a
                    type="button"
                    className="btn rounded-0 btn-white-navbar btn-block dropdown-toggle d-flex justify-content-between align-items-center w-100"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Pusat Informasi
                  </a>
                  <div className="dropdown-menu ml-3">
                    <Link href="/pusat-informasi" passHref>
                      <a className="dropdown-item navdropdown-child">
                        Panduan Test Substansi
                      </a>
                    </Link>
                    <Link href="/pusat-informasi" passHref>
                      <a className="dropdown-item navdropdown-child">
                        Hak dan Kewajiban
                      </a>
                    </Link>
                  </div>
                </div>
                <Link href="/tentang-kami" passHref>
                  <NavDropdown.Item className="navdropdown-child">
                    Tentang Kami
                  </NavDropdown.Item>
                </Link>
                <Link href="/penyelenggara" passHref>
                  <NavDropdown.Item className="navdropdown-child">
                    Penyelenggara
                  </NavDropdown.Item>
                </Link>
                <div className="btn-group dropright w-100">
                  <a
                    type="button"
                    className="btn rounded-0 btn-white-navbar btn-block dropdown-toggle d-flex justify-content-between align-items-center w-100"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Rilis Media
                  </a>
                  <div className="dropdown-menu ml-3">
                    <Link href="/berita">
                      <a className="dropdown-item navdropdown-child" href="#">
                        Berita
                      </a>
                    </Link>
                    <Link href="/artikel">
                      <a className="dropdown-item navdropdown-child" href="#">
                        Artikel
                      </a>
                    </Link>
                    <Link href="/galeri">
                      <a className="dropdown-item navdropdown-child" href="#">
                        Galeri
                      </a>
                    </Link>
                    <Link href="/video">
                      <a className="dropdown-item navdropdown-child" href="#">
                        Video
                      </a>
                    </Link>
                  </div>
                </div>
                <Link href="/faq" passHref>
                  <NavDropdown.Item className="navdropdown-child">
                    FAQ
                  </NavDropdown.Item>
                </Link>
                <Link href="/kontak" passHref>
                  <NavDropdown.Item className="navdropdown-child">
                    Kontak
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            </div>
            {/* END MENU */}
          </Nav>
          {/* Search Bar */}
          <Form className="w-100 my-2 mx-5 row ">
            <div className="position-relative w-100 d-none d-lg-block">
              <FormControl
                type="search"
                placeholder="Cari"
                className="pl-10 rounded-full border-search py-6"
                aria-label="Search"
                style={{
                  backgroundColor: "#F2F7FC",
                  border: "0px !important",
                }}
              />
              <IconSearch
                className="left-center-absolute"
                style={{ left: "10px" }}
              />
            </div>
          </Form>

          {/* Icon */}
          {session && session.roles[0] === "user" && (
            <div className="row mr-3 d-lg-block d-none">
              <a
                href="/helpdesk/live-chat"
                className="col-4 col-sm-4 col-md-4 col-xl-4 text-center"
              >
                <i className="ri-customer-service-2-line ri-2x  text-gray"></i>
              </a>
              <a
                href="#"
                className="col-4 col-sm-4 col-md-4 col-xl-4 text-center"
              >
                <i className="ri-heart-line ri-2x  text-gray"></i>
              </a>
              <a
                href="#"
                className="col-4 col-sm-4 col-md-4 col-xl-4 text-center"
              >
                <i className="ri-notification-4-line ri-2x  text-gray"></i>
              </a>
            </div>
          )}
          <hr />
          <Nav>
            {session && session.roles[0] === "user" ? (
              <div>
                <div className="d-lg-none d-block">
                  <div
                    className={`wrap-accouts ${style.wrapAccounts}`}
                    style={{ borderRadius: "20px" }}
                    onClick={() => router.push("/peserta/profile")}
                  >
                    {/* <div className="dot-accouts"></div> */}
                    <Image
                      className="rounded-circle"
                      src={`${
                        dataPribadi && dataPribadi.foto
                          ? dataPribadi.file_path + dataPribadi.foto
                          : "/assets/media/logos/default.png"
                      }`}
                      width={32}
                      height={32}
                      alt="brand-navbar"
                    />
                    <span className="titles-accounts">
                      {dataPribadi?.name || "-"}
                    </span>
                    <IconArrow
                      fill="#6c6c6c"
                      width="14"
                      height="11"
                      className="d-lg-block d-none"
                      style={{ transform: "rotate(90deg)" }}
                    />
                  </div>
                </div>
                <div className="position-relative d-none d-lg-block">
                  <div
                    className={`wrap-accouts ${style.wrapAccounts}`}
                    style={!isShowDropdown ? { borderRadius: "20px" } : {}}
                    onClick={() =>
                      setIsShowDropdown(isShowDropdown ? false : true)
                    }
                  >
                    {/* <div className="dot-accouts"></div> */}
                    <Image
                      className="rounded-circle"
                      src={`${
                        dataPribadi && dataPribadi.foto
                          ? dataPribadi.file_path + dataPribadi.foto
                          : "/assets/media/logos/default.png"
                      }`}
                      width={32}
                      height={32}
                      alt="brand-navbar"
                    />
                    <span className="titles-accounts">
                      {dataPribadi?.name || "-"}
                    </span>
                    <IconArrow
                      fill="#6c6c6c"
                      width="14"
                      height="11"
                      className="d-lg-block d-none"
                      style={{ transform: "rotate(90deg)" }}
                    />
                  </div>

                  {isShowDropdown && (
                    <ul className="list-wrap-accounts p-0 d-none d-lg-block py-3">
                      <Link href="/peserta" passHref>
                        <li className="items-lists rounded-0">
                          <i className="ri-time-line mr-2"></i>DASHBOARD
                        </li>
                      </Link>
                      <Link href="/peserta/profile" passHref>
                        <li className="items-lists rounded-0">
                          <i className="ri-user-line mr-2"></i>PROFILE
                        </li>
                      </Link>
                      <Link href="/peserta/riwayat-pelatihan" passHref>
                        <li className="items-lists rounded-0">
                          <i className="ri-book-read-line mr-2"></i>PELATIHAN
                        </li>
                      </Link>{" "}
                      <li className="items-lists rounded-0">
                        <i className="ri-bar-chart-horizontal-line mr-2"></i>
                        ARTIKEL
                      </li>{" "}
                      <li className="items-lists rounded-0">
                        <i className="ri-settings-4-line mr-2"></i>
                        PENGATURAN
                      </li>
                      <li className={`items-lists p-0 p-3`}>
                        <button
                          className={`btn rounded-full ${style.navbar_btnPrimary} d-flex align-items-center justify-content-center`}
                          onClick={() => handlerLogout()}
                        >
                          <i className="ri-logout-box-r-line"> </i>
                          KELUAR
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            ) : (
              <>
                {/* Button Masuk dan Daftar */}
                <Link href="/login">
                  <a className="mx-2">
                    <button className="btn btn-sm btn-block btn-login-peserta btn-outline-primary-new m-2 justify-content-center py-3">
                      {/* <IconLogin className="mr-2 icon-login" /> */}
                      <i className="ri-login-box-line mr-2"></i>
                      Masuk
                    </button>
                  </a>
                </Link>
                <Link href="/register">
                  <a className="mx-2">
                    <button className="btn btn-sm btn-block btn-register-peserta color-primary m-2 justify-content-center py-3">
                      {/* <IconRegister className="mr-2 icon-register" /> */}
                      <i className="ri-user-line mr-2"></i>
                      Daftar
                    </button>
                  </a>
                </Link>
              </>
            )}
          </Nav>
          <hr />

          <Nav style={{ fontSize: "14px", color: "#6C6C6C" }}>
            <Row className="d-lg-none">
              <Col sm={12} className="font-weight-bold mb-8">
                Menu
              </Col>
              <Col sm={12} className="mb-8">
                <Link href="/">Beranda</Link>
              </Col>

              <Col sm={12}>
                <Dropdown color="white">
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    style={{
                      backgroundColor: "transparent",
                      border: "transparent",
                      color: "#6C6C6C",
                      fontSize: "14px",
                    }}
                    className="p-0 w-100"
                  >
                    <div className="d-flex align-items-center justify-content-between p-0 m-0">
                      Pelatihan
                      <i className="ri-arrow-right-s-line text-dark ml-1 position-absolute right-0"></i>
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {/* gw nge map disini */}
                    {akademi &&
                      akademi.map((item, i) => {
                        return (
                          <Dropdown.Item
                            href={`/detail/akademi/${item.id}`}
                            key={item.id}
                          >
                            {item.slug}
                          </Dropdown.Item>
                        );
                      })}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col sm={12}>
                <Dropdown color="white">
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    style={{
                      backgroundColor: "transparent",
                      border: "transparent",
                      color: "#6C6C6C",
                      fontSize: "14px",
                    }}
                    className="p-0"
                  >
                    <div className="d-flex align-items-center justify-content-between p-0 m-0">
                      Pusat Informasi
                      <i className="ri-arrow-right-s-line text-dark ml-1 position-absolute right-0"></i>
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">
                      Panduan Test Substansi
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Hak dan Kewajiban
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col className="mb-8" sm={12}>
                Tentang Kami
              </Col>
              <Col className="mb-8" sm={12}>
                <Link href="/penyelenggara">Penyelenggara</Link>
              </Col>
              <Col sm={12}>
                <Dropdown color="white">
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    style={{
                      backgroundColor: "transparent",
                      border: "transparent",
                      color: "#6C6C6C",
                      fontSize: "14px",
                    }}
                    className="p-0"
                  >
                    <div className="d-flex align-items-center justify-content-between p-0 m-0">
                      Rilis Media
                      <i className="ri-arrow-right-s-line text-dark ml-1 position-absolute right-0"></i>
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/berita">Berita</Dropdown.Item>
                    <Dropdown.Item href="/artikel">Artikel</Dropdown.Item>
                    <Dropdown.Item href="/galeri">Galeri</Dropdown.Item>
                    <Dropdown.Item href="/video">Video</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col className="mb-8" sm={12}>
                <Link href="/faq">FAQ</Link>
              </Col>
              <Col className="mb-8" sm={12}>
                <Link href="/kontak">Kontak</Link>
              </Col>
            </Row>
            <hr />
            {/* Start side bar */}
            {session && !router.pathname.includes(routerPath) && (
              <Sidebar
                screenClass={"d-block d-lg-none"}
                accountFalse={`d-none d-lg-block`}
                titleAkun={"Lainnya"}
              />
            )}
            {/* End side bar */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigationbar;
