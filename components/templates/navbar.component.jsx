import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

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

import IconSearch from "../../components/assets/icon/Search";
import IconLogin from "../../components/assets/icon-dashboard-peserta/Login";
import IconRegister from "../../components/assets/icon-dashboard-peserta/Register";

const Navigationbar = () => {
  return (
    <>
      <Navbar bg="white" expand="lg" className="shadow header-dashboards container-fluid">
        <Container>
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
                <NavDropdown.Item
                  href="#action/3.1"
                  className="navdropdown-child"
                >
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
                        <i className="ri-arrow-right-s-line text-dark ml-1">
                          {" "}
                        </i>
                      </div>
                    </div>
                  </button>
                  <div className="dropdown-menu ml-3">
                    <a className="dropdown-item navdropdown-child" href="#">
                      VSGA
                    </a>
                    <a className="dropdown-item navdropdown-child" href="#">
                      FGA
                    </a>
                    <a className="dropdown-item navdropdown-child" href="#">
                      PRO
                    </a>
                    <a className="dropdown-item navdropdown-child" href="#">
                      TA
                    </a>
                    <a className="dropdown-item navdropdown-child" href="#">
                      GTA
                    </a>
                    <a className="dropdown-item navdropdown-child" href="#">
                      DEA
                    </a>
                    <a className="dropdown-item navdropdown-child" href="#">
                      TSA
                    </a>
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
            <Nav>
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigationbar;
