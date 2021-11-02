import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { signOut } from "next-auth/client";
import IconArrow from "../../../components/assets/icon/Arrow2";
import style from "./Navbar.module.css";
import Image from "next/image";
import dynamic from "next/dynamic";
import LoadingSidebar from "../../content/peserta/components/loader/LoadingSidebar";

import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Dropdown,
  Col,
  Row,
  DropdownButton,
} from "react-bootstrap";
import IconSearch from "../../../components/assets/icon/Search";
import IconLogin from "../../../components/assets/icon-dashboard-peserta/Login";
import IconRegister from "../../../components/assets/icon-dashboard-peserta/Register";
import Cookies from "js-cookie";
import Logo from "/public/assets/logo/mainlogo.png";
import Simonas from "/public/assets/logo/image 10.png";
import Beasiswa from "/public/assets/logo/Logo besiswa fix  3.png";
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
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const { error: errorDataPribadi, dataPribadi } = useSelector(
    (state) => state.getDataPribadi
  );

  const handlerLogout = () => {
    Cookies.remove("id_tema");
    Cookies.remove("id_pelatihan");
    signOut();
  };
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <Navbar
        bg="white"
        expand="lg"
        className="shadow header-dashboard d-flex"
        sticky="top"
      >
        <Col
          sm={12}
          lg={1}
          className="d-flex justify-content-between justify-content-lg-center align-items-center"
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
            {session && session.roles[0] === "user" && (
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
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </div>
        </Col>
        {showSearch && (
          <Form className="w-100 my-2 mx-1 row ">
            <div className="position-relative w-100">
              <FormControl
                type="search"
                placeholder="Search"
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
            {/* Menu */}
            <div className="row mx-1 my-0">
              <NavDropdown
                title="Menu"
                id="basic-nav-dropdown"
                className="navdropdown-child position-relative w-100 text-menu"
              >
                <NavDropdown.Item href="/" className="navdropdown-child">
                  Beranda
                </NavDropdown.Item>
                <div className="btn-group dropright">
                  <button
                    type="button"
                    className="btn btn-white-navbar"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <div className="row">
                      <div className={`col-9 text-left `}>Pelatihan</div>
                      <div className="col-1 text-right">
                        <i className="ri-arrow-right-s-line text-dark ml-1">
                          {" "}
                        </i>
                      </div>
                    </div>
                  </button>
                  <div className="dropdown-menu ml-3">
                    <Link href={`/detail/akademi/14`}>
                      <a className="dropdown-item navdropdown-child">VSGA</a>
                    </Link>

                    <Link href={`/detail/akademi/13`}>
                      <a className="dropdown-item navdropdown-child">FGA</a>
                    </Link>

                    <Link href={`/detail/akademi/16`}>
                      <a className="dropdown-item navdropdown-child">PRO</a>
                    </Link>

                    <Link href={`/detail/akademi/6`}>
                      <a className="dropdown-item navdropdown-child">TA</a>
                    </Link>

                    <Link href={`/detail/akademi/18`}>
                      <a className="dropdown-item navdropdown-child">TSA</a>
                    </Link>
                  </div>
                </div>
                <div className="btn-group dropright">
                  <button
                    type="button"
                    className="btn btn-white-navbar dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Pusat Informasi
                  </button>
                  <div className="dropdown-menu ml-3">
                    <a className="dropdown-item navdropdown-child" href="#">
                      Panduan Test Substansi
                    </a>
                    <a className="dropdown-item navdropdown-child" href="#">
                      Hak dan Kewajiban
                    </a>
                  </div>
                </div>
                <NavDropdown.Item
                  href="#action/3.4"
                  className="navdropdown-child"
                >
                  Tentang Kami
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="#action/3.4"
                  className="navdropdown-child"
                >
                  Penyelenggara
                </NavDropdown.Item>
                <div className="btn-group dropright">
                  <button
                    type="button"
                    className="btn btn-white-navbar"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <div className="row">
                      <div className="col-9 text-left">Rilis Media</div>
                      <div className="col-1 text-right">
                        <i className="ri-arrow-right-s-line text-dark"> </i>
                      </div>
                    </div>
                  </button>
                  <div className="dropdown-menu ml-3">
                    <a className="dropdown-item navdropdown-child" href="#">
                      Berita
                    </a>
                    <a className="dropdown-item navdropdown-child" href="#">
                      Artikel
                    </a>
                    <a className="dropdown-item navdropdown-child" href="#">
                      Galeri
                    </a>
                    <a className="dropdown-item navdropdown-child" href="#">
                      Video
                    </a>
                  </div>
                </div>
                <NavDropdown.Item
                  href="#action/3.4"
                  className="navdropdown-child"
                >
                  FAQ
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="#action/3.4"
                  className="navdropdown-child"
                >
                  Kontak
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          </Nav>
          {/* Search Bar */}
          <Form className="w-100 my-2 mx-1 row ">
            <div className="position-relative w-100 d-none d-lg-block">
              <FormControl
                type="search"
                placeholder="Search"
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
            <div className="row m-3 d-lg-block d-none">
              <a
                href="#"
                className="col-4 col-sm-4 col-md-4 col-xl-4 text-center"
              >
                <i className="ri-customer-service-2-line ri-2x mx-3 text-gray"></i>
              </a>
              <a
                href="#"
                className="col-4 col-sm-4 col-md-4 col-xl-4 text-center"
              >
                <i className="ri-heart-line ri-2x mx-3 text-gray"></i>
              </a>
              <a
                href="#"
                className="col-4 col-sm-4 col-md-4 col-xl-4 text-center"
              >
                <i className="ri-notification-4-line ri-2x mx-3 text-gray"></i>
              </a>
            </div>
          )}
          <hr />
          <Nav>
            {session && session.roles[0] === "user" ? (
              <div className="position-relative w-100 h-100 p-5">
                <div
                  className="wrap-accouts w-100 h-lg-40px"
                  style={{ borderRadius: "20px" }}
                  onClick={() =>
                    setIsShowDropdown(isShowDropdown ? false : true)
                  }
                >
                  {/* <div className="dot-accouts"></div> */}
                  <Image
                    className="rounded-circle "
                    src={`${
                      dataPribadi && dataPribadi.foto
                        ? dataPribadi.file_path + dataPribadi.foto
                        : "/assets/media/logos/default.png"
                    }`}
                    width={32}
                    height={32}
                    alt="brand-navbar"
                  />
                  <div className="titles-accounts w-100 d-flex justify-content-between align-items-center">
                    {dataPribadi?.name || "-"}
                    <div className="position-absolute right-0 ">
                      {/* <IconArrow
                          fill="#6c6c6c"
                          width="14"
                          height="11"
                          style={{ transform: "rotate(90deg)" }}
                        /> */}
                      <i className="ri-arrow-down-s-line mr-lg-2 mr-5"></i>
                    </div>
                  </div>
                </div>
                {isShowDropdown ? (
                  <ul className="list-wrap-accounts d-none d-lg-block">
                    <Link href="/peserta" passHref>
                      <li className="items-lists">
                        <i className="ri-time-line mr-2"></i>DASHBOARD
                      </li>
                    </Link>
                    <Link href="/peserta/profile" passHref>
                      <li className="items-lists">
                        <i className="ri-user-line mr-2"></i>PROFILE
                      </li>
                    </Link>
                    <Link href="/peserta/riwayat-pelatihan" passHref>
                      <li className="items-lists">
                        <i className="ri-book-read-line mr-2"></i>PELATIHAN
                      </li>
                    </Link>{" "}
                    <li className="items-lists">
                      <i className="ri-bar-chart-horizontal-line mr-2"></i>
                      ARTIKEL
                    </li>{" "}
                    <li className="items-lists">
                      <i className="ri-settings-4-line mr-2"></i>
                      PENGATURAN
                    </li>
                    <li className="items-lists">
                      <button
                        className="btn btn-sm btn-login-peserta w-100 d-flex align-items-center justify-content-center"
                        onClick={() => handlerLogout()}
                      >
                        <IconLogin className="mr-2" />
                        KELUAR
                      </button>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <>
                {/* Button Masuk dan Daftar */}
                <Link href="/login">
                  <a className="mx-2">
                    <button className="btn btn-sm btn-block btn-login-peserta btn-outline-primary-new m-2 justify-content-center py-3">
                      <IconLogin className="mr-2 icon-login" />
                      Masuk
                    </button>
                  </a>
                </Link>
                <Link href="/register">
                  <a className="mx-2">
                    <button className="btn btn-sm btn-block btn-register-peserta btn-primary m-2 justify-content-center py-3">
                      <IconRegister className="mr-2 icon-register" />
                      Daftar
                    </button>
                  </a>
                </Link>
              </>
            )}
          </Nav>
          <hr />
          <div style={{ fontSize: "14px", color: "#6C6C6C" }}>
            <Row className="d-lg-none">
              <Col sm={12} className="font-weight-bold mb-8">
                Menu
              </Col>
              <Col sm={12} className="mb-8">
                Beranda
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
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Something else
                    </Dropdown.Item>
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
                Penyelenggara
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
                    <Dropdown.Item href="#/action-1">Berita</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Artikel</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Galeri</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Video</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col className="mb-8" sm={12}>
                FAQ
              </Col>
              <Col className="mb-8" sm={12}>
                Kontak
              </Col>
            </Row>
            <hr />
            {/* Start side bar */}
            <Sidebar
              screenClass={"d-block d-lg-none"}
              accountFalse={`d-none d-lg-block`}
              titleAkun={"Lainnya"}
            />
            {/* End side bar */}
          </div>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigationbar;
