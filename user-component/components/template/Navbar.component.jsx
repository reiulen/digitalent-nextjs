import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { signOut } from "next-auth/client";
import IconArrow from "../../../components/assets/icon/Arrow2";

import Image from "next/image";

import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Button,
  Form,
  FormControl,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import IconSearch from "../../../components/assets/icon/Search";
import IconLogin from "../../../components/assets/icon-dashboard-peserta/Login";
import IconRegister from "../../../components/assets/icon-dashboard-peserta/Register";

const Navigationbar = ({ session }) => {
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  // console.log("isShowDropdown", isShowDropdown);
  const { error: errorDataPribadi, dataPribadi } = useSelector(
    (state) => state.getDataPribadi
  );
  console.log(dataPribadi, " ini data pribadi");
  const handlerLogout = () => {
    signOut();
  };

  return (
    <>
      <Navbar
        bg="white"
        expand="lg"
        className="shadow header-dashboard"
        sticky="top"
      >
        <Navbar.Brand href="/">
          <Image
            src={`/assets/icon/mainlogo.svg`}
            width={50}
            height={50}
            alt="brand-navbar"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto dropdown-explore">
            <NavDropdown
              title="Menu"
              id="basic-nav-dropdown"
              className="navdropdown-child"
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
                    <div className="col-9 text-left">Pelatihan</div>
                    <div className="col-1 text-right">
                      <i className="ri-arrow-right-s-line text-dark ml-1"> </i>
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

                  {/* <a className="dropdown-item navdropdown-child" href="#">
                    GTA
                  </a>
                  <a className="dropdown-item navdropdown-child" href="#">
                    DEA
                  </a> */}

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
          </Nav>
          <Form className="w-100 mx-5">
            <div className="position-relative w-100">
              <FormControl
                type="search"
                placeholder="Search"
                className="pl-10 rounded-full"
                aria-label="Search"
              />
              <IconSearch
                className="left-center-absolute"
                style={{ left: "10px" }}
              />
            </div>
          </Form>
          <a href="#">
            <i className="ri-headphone-line ri-2x mx-3 text-gray"></i>
          </a>
          <a href="#">
            <i className="ri-heart-line ri-2x mx-3 text-gray"></i>
          </a>
          <a href="#">
            <i className="ri-notification-4-line ri-2x mx-3 text-gray"></i>
          </a>
          <Nav>
            {session ? (
              <div className="position-relative">
                <div
                  className="wrap-accouts"
                  style={!isShowDropdown ? { borderRadius: "20px" } : {}}
                  onClick={() =>
                    setIsShowDropdown(isShowDropdown ? false : true)
                  }
                >
                  {/* <div className="dot-accouts"></div> */}
                  <Image
                    className="rounded-circle"
                    src={`${dataPribadi.file_path + dataPribadi.foto}`}
                    width={32}
                    height={32}
                    alt="brand-navbar"
                  />
                  {console.log(dataPribadi)}
                  <span className="titles-accounts">
                    {dataPribadi.name || "-"}
                  </span>
                  <IconArrow
                    fill="#6c6c6c"
                    width="14"
                    height="11"
                    style={{ transform: "rotate(90deg)" }}
                  />
                </div>

                {isShowDropdown ? (
                  <ul className="list-wrap-accounts">
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
                <Link href="/login">
                  <a>
                    <button className="btn btn-sm btn-login-peserta">
                      <IconLogin className="mr-2" />
                      Masuk
                    </button>
                  </a>
                </Link>
                <Link href="/register">
                  <a>
                    <button className="btn btn-register-peserta btn-sm">
                      <IconRegister className="mr-2" />
                      Daftar
                    </button>
                  </a>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigationbar;
