import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";
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
import Cookies from "js-cookie";

import axios from "axios";
import {
  getPencarian,
  searchKeyword,
} from "../../../redux/actions/pelatihan/pencarian.action";

const Sidebar = dynamic(() => import("./Sidebar.component"), {
  loading: function loadingNow() {
    return <LoadingSidebar />;
  },
  ssr: false,
});

const Navigationbar = ({ session }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const { error: errorDataPribadi, dataPribadi } = useSelector(
    (state) => state.getDataPribadi
  );
  const [secondary, setSecondary] = useState(null);
  const [warna, setWarna] = useState("secondary");

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

  useEffect(() => {
    async function getDataGeneral(token) {
      try {
        let { data } = await axios.get(
          `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting/general/get`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (data) {
          setSecondary(data.data.color[0].color);
        }
      } catch (error) {
        Swal.fire("Oops !", `${error.response.data.message}`, "error");
      }
    }
    getDataGeneral();
    if (secondary === "1") {
      setWarna("primary");
    } else if (secondary === "2") {
      setWarna("secondary");
    } else if (secondary === "3") {
      setWarna("extras");
    }
  }, [secondary, router, session]);

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

  const [search, setSearch] = useState("");

  const handleEnter = (e) => {
    e.preventDefault();
    if (e.code == "Enter") {
      dispatch(searchKeyword(search));
      router.push(`/pencarian?cari=${search}`);
    }
  };

  return (
    <>
      <Navbar
        bg="white"
        expand="lg"
        className="shadow header-dashboard d-flex pr-0 px-md-6 px-0"
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
                <a className="col-3 p-md-0 col-xl-4 text-center">
                  <i
                    className="ri-search-2-line ri-2x mx-0 mx-md-3 text-gray"
                    onClick={() => setShowSearch(!showSearch)}
                  ></i>
                </a>
                <Link href="/helpdesk/live-chat" passHref>
                  <a className="col-3 p-md-0 col-xl-4 text-center">
                    <i className="ri-customer-service-2-line ri-2x mx-0 mx-md-3 text-gray"></i>
                  </a>
                </Link>
                <Link href="/peserta/bookmark" passHref>
                  <a className="col-3 p-md-0 col-xl-4 text-center">
                    <i className="ri-heart-line ri-2x mx-0 mx-md-3 text-gray"></i>
                  </a>
                </Link>
                <a href="#" className="col-3 p-md-0 col-xl-4 text-center">
                  <i className="ri-notification-4-line ri-2x mx-0 mx-md-3 text-gray"></i>
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
                onKeyDown={(e) => {
                  setSearch(e.target.value);
                  if (e.code == "Enter") {
                    handleEnter(e);
                  }
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
                          <a className="dropdown-item navdropdown-child ">
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
                      <a className="dropdown-item navdropdown-child">Berita</a>
                    </Link>
                    <Link href="/artikel">
                      <a className="dropdown-item navdropdown-child">Artikel</a>
                    </Link>
                    <Link href="/galeri">
                      <a className="dropdown-item navdropdown-child">Galeri</a>
                    </Link>
                    <Link href="/video">
                      <a className="dropdown-item navdropdown-child">Video</a>
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
                onKeyDown={(e) => {
                  setSearch(e.target.value);
                  if (e.code == "Enter") {
                    handleEnter(e);
                  }
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
              <Link href="/helpdesk/live-chat" passHref>
                <a className="col-4 col-sm-4 col-md-4 col-xl-4 text-center">
                  <i className="ri-customer-service-2-line ri-2x  text-gray"></i>
                </a>
              </Link>
              <Link href="/peserta/bookmark" passHref>
                <a className="col-4 col-sm-4 col-md-4 col-xl-4 text-center">
                  <i className="ri-heart-line ri-2x  text-gray"></i>
                </a>
              </Link>
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
                {/* on media queries */}
                <div className="d-lg-none d-block">
                  <div
                    className={`wrap-accouts ${style.wrapAccounts} `}
                    style={{ borderRadius: "44px" }}
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
                {/* normal */}
                <div className="position-relative d-none d-lg-block">
                  <div
                    className={`wrap-accouts ${style.wrapAccounts} d-flex justify-content-between`}
                    style={
                      !isShowDropdown
                        ? { borderRadius: "44px", maxWidth: "max-content" }
                        : {}
                    }
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
                          <div
                            style={{ fontSize: "16px" }}
                            className="ri-time-line mr-2"
                          ></div>
                          DASHBOARD
                        </li>
                      </Link>
                      <Link href="/peserta/profile" passHref>
                        <li className="items-lists rounded-0">
                          <div
                            style={{ fontSize: "16px" }}
                            className="ri-user-line mr-2"
                          ></div>
                          PROFILE
                        </li>
                      </Link>
                      <Link href="/peserta/riwayat-pelatihan" passHref>
                        <li className="items-lists rounded-0">
                          <div
                            style={{ fontSize: "16px" }}
                            className="ri-book-read-line mr-2"
                          ></div>
                          PELATIHAN
                        </li>
                      </Link>{" "}
                      <li className="items-lists rounded-0">
                        <div
                          style={{ fontSize: "16px" }}
                          className="ri-bar-chart-horizontal-line mr-2"
                        ></div>
                        ARTIKEL
                      </li>{" "}
                      <li className="items-lists rounded-0">
                        <div
                          style={{ fontSize: "16px" }}
                          className="ri-settings-4-line mr-2"
                        ></div>
                        PENGATURAN
                      </li>
                      <li className={`items-lists p-0 p-3`}>
                        <button
                          className={`btn rounded-full ${style.navbar_btnPrimary} d-flex align-items-center justify-content-center`}
                          onClick={() => handlerLogout()}
                        >
                          <div
                            style={{ fontSize: "16px" }}
                            className="ri-logout-box-r-line mr-2"
                          >
                            {" "}
                          </div>
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
                    <button
                      className={`btn btn-sm btn-block btn-register-peserta color-primary-${warna} m-2 justify-content-center py-3`}
                    >
                      {/* <IconRegister className="mr-2 icon-register" /> */}
                      <div
                        className="ri-user-line mr-2"
                        style={{ fontSize: "15px" }}
                      ></div>
                      Daftar
                    </button>
                  </a>
                </Link>
              </>
            )}
          </Nav>
          <hr />

          <Nav style={{ fontSize: "14px", color: "#6C6C6C" }}>
            <Row className="d-lg-none px-6">
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
                  <Dropdown.Menu className="w-100 mb-6 shadow-none border p-0">
                    {/* gw map disini */}
                    {akademi &&
                      akademi.map((item, i) => {
                        return (
                          <Fragment key={item.id}>
                            <div
                              className="p-4 fz-12"
                              href={`/detail/akademi/${item.id}`}
                            >
                              {item.slug}
                            </div>
                            {i !== akademi.length - 1 && (
                              <hr className="w-100 p-0 m-0" />
                            )}
                          </Fragment>
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
                    <Link href="/pusat-informasi">
                      <div className="d-flex align-items-center justify-content-between p-0 m-0">
                        Pusat Informasi
                      </div>
                    </Link>
                  </Dropdown.Toggle>
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
                  <Dropdown.Menu className="w-100 mb-6 shadow-none border p-0">
                    <div className="p-4 fz-12" href="/berita">
                      Berita
                    </div>
                    <hr className="w-100 p-0 m-0" />

                    <div className="p-4 fz-12" href="/artikel">
                      Artikel
                    </div>
                    <hr className="w-100 p-0 m-0" />

                    <div className="p-4 fz-12" href="/galeri">
                      Galeri
                    </div>
                    <hr className="w-100 p-0 m-0" />

                    <div className="p-4 fz-12" href="/video">
                      Video
                    </div>
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
