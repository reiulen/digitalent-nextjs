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
  const [menu, setMenu] = useState(
    localStorage.getItem("menu")
      ? JSON.parse(localStorage.getItem("menu"))
      : null
  );

  const { footer, loading } = useSelector((state) => state.berandaFooter);

  useEffect(() => {
    if (!session) {
      return;
    }
    if (session && session.roles[0] == "user") {
      if (
        !dataPribadi || // 👈 null and undefined check
        (dataPribadi && Object.keys(dataPribadi).length === 0)
      ) {
        signOut();
      }
    }

    if (session) {
      if (
        dataPribadi &&
        Object.keys(dataPribadi).length !== 0 &&
        !dataPribadi.status
      ) {
        if (dataPribadi.wizard == 1) {
          return router.push("/peserta/wizzard");
        }
        if (dataPribadi.wizard == 2) {
          return router.push("/peserta/wizzard/alamat");
        }
        if (dataPribadi.wizard == 3) {
          return router.push("/peserta/wizzard/pendidikan");
        }
        if (dataPribadi.wizard == 4) {
          return router.push("/peserta/wizzard/pekerjaan");
        }
      }
    }
  }, []);

  const getDataGeneral = async (token) => {
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
        localStorage.setItem("navbar", data.data.color[0].color);
      }
    } catch (error) {}
  };

  const getMenu = async (token) => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-menu/all`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("menu", JSON.stringify(data.data));
    } catch (error) {}
  };

  useEffect(() => {
    getMenu();
    if (!localStorage.getItem("navbar")) {
      getDataGeneral();
    }
    if (!localStorage.getItem("menu")) {
      getMenu();
    }
    if (localStorage.getItem("navbar") === "1") {
      setWarna("primary");
    } else if (localStorage.getItem("navbar") === "2") {
      setWarna("secondary");
    } else if (localStorage.getItem("navbar") === "3") {
      setWarna("extras");
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
  if (
    router.pathname == "/peserta/wizzard" ||
    router.pathname.includes("wizzard")
  )
    routerPath = "/peserta/wizzard";
  if (router.pathname == "/") routerPath = "/";

  const [search, setSearch] = useState("");

  const handleEnter = (e) => {
    e.preventDefault();
    if (e.code == "Enter") {
      dispatch(searchKeyword(search));
      router.push(`/pencarian?cari=${search}&page=1`);
    }
  };

  const [notification, setNotification] = useState(false);
  const data = [
    { icon: "Fail", text: "test" },
    { icon: "Success", text: "test" },
    { icon: "Warning", text: "test" },
    { icon: "File", text: "test" },
    { icon: "Fail", text: "test" },
    { icon: "Success", text: "test" },
    { icon: "Warning", text: "test" },
    { icon: "File", text: "test" },
  ];

  const [navbarItems, setNavbarItems] = useState("");
  const [rilisMedia, setRilisMedia] = useState([
    "berita",
    "artikel",
    "galeri",
    "video",
  ]);
  const [index, setIndex] = useState(0);
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
          className="d-flex justify-content-between justify-content-lg-center align-items-center"
        >
          <Navbar.Brand href="/">
            <Image
              // src={}
              src={
                footer && footer?.header_logo
                  ? process.env.END_POINT_API_IMAGE_PUBLIKASI +
                    "site-management/images/" +
                    footer.header_logo
                  : `/assets/icon/mainlogo.svg`
              }
              width={50}
              height={50}
              objectFit="cover"
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
                className="navdropdown-child text-capitalize position-relative w-100 text-menu"
              >
                <Row
                  className={
                    navbarItems ? `w-350px p-0 m-0` : "w-175px p-0 m-0"
                  }
                >
                  <Col md={navbarItems ? 6 : 12} className="p-0 m-0">
                    <NavDropdown.Item href="/" className="navdropdown-child">
                      Beranda
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="navdropdown-child"
                      onClick={(e) => {
                        setNavbarItems(akademi);

                        if (index != 1) {
                          setIndex(1);
                        } else {
                          setNavbarItems(null);
                          setIndex(0);
                        }
                        e.stopPropagation();
                      }}
                      active={index == 1 ? true : false}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        Pelatihan
                        <span className="ri-arrow-right-s-line" />
                      </div>
                    </NavDropdown.Item>
                    <Link href="/pusat-informasi" passHref>
                      <NavDropdown.Item className="navdropdown-child">
                        pusat informasi
                      </NavDropdown.Item>
                    </Link>
                    <Link href="/tentang-kami" passHref>
                      <NavDropdown.Item className="navdropdown-child">
                        tentang kami
                      </NavDropdown.Item>
                    </Link>
                    <Link href="/penyelenggara" passHref>
                      <NavDropdown.Item className="navdropdown-child">
                        penyelenggara
                      </NavDropdown.Item>
                    </Link>
                    <NavDropdown.Item
                      className="navdropdown-child"
                      onClick={(e) => {
                        setNavbarItems(rilisMedia);
                        if (index != 2) {
                          setIndex(2);
                        } else {
                          setNavbarItems(null);
                          setIndex(0);
                        }
                        e.stopPropagation();
                      }}
                      active={index == 2 ? true : false}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        rilis media
                        <span className="ri-arrow-right-s-line" />
                      </div>
                    </NavDropdown.Item>
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
                    <NavDropdown.Item
                      onClick={(e) => {
                        setNavbarItems(menu);
                        if (index != 3) {
                          setIndex(3);
                        } else {
                          setNavbarItems(null);
                          setIndex(0);
                        }
                        e.stopPropagation();
                      }}
                      active={index == 3 ? true : false}
                      className="navdropdown-child"
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        lainnya
                        <span className="ri-arrow-right-s-line" />
                      </div>
                    </NavDropdown.Item>
                  </Col>
                  <Col
                    className="p-0 m-0 h-350px overflow-auto"
                    style={
                      navbarItems ? { borderLeft: "1px solid #6c6c6c" } : {}
                    }
                  >
                    {navbarItems &&
                      navbarItems.map((el, i) => {
                        return (
                          <Link
                            key={i}
                            href={
                              el.slug
                                ? `/detail/akademi/${el.id}`
                                : el.name
                                ? `/lainnya/${el.url}`
                                : `/${el}`
                            }
                            passHref
                          >
                            <NavDropdown.Item className="navdropdown-child">
                              {el.slug ? el.slug : el.name ? el.name : el}
                            </NavDropdown.Item>
                          </Link>
                        );
                      })}
                  </Col>
                </Row>
                {/* <Fragment>
                  <NavDropdown.Item href="/" className="navdropdown-child">
                    Beranda
                  </NavDropdown.Item>
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
                          <Link
                            key={item.id}
                            href={`/detail/akademi/${item.id}`}
                          >
                            <a className="dropdown-item navdropdown-child ">
                              {item.slug}
                            </a>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  <Link href="/pusat-informasi" passHref>
                    <NavDropdown.Item className="navdropdown-child">
                      Pusat Informasi
                    </NavDropdown.Item>
                  </Link>
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
                        <a className="dropdown-item navdropdown-child">
                          Berita
                        </a>
                      </Link>
                      <Link href="/artikel">
                        <a className="dropdown-item navdropdown-child">
                          Artikel
                        </a>
                      </Link>
                      <Link href="/galeri">
                        <a className="dropdown-item navdropdown-child">
                          Galeri
                        </a>
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
                  <div className="btn-group dropright w-100">
                    <a
                      type="button"
                      className="btn rounded-0 btn-white-navbar btn-block dropdown-toggle d-flex justify-content-between align-items-center w-100"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Lainnya
                    </a>
                    <div className="dropdown-menu ml-3">
                      {menu
                        ? menu.map((item, index) => {
                            return (
                              <Link href={"/lainnya/" + item.url} key={index}>
                                <a className="dropdown-item navdropdown-child">
                                  {item.name}
                                </a>
                              </Link>
                            );
                          })
                        : null}
                    </div>
                  </div>
                </Fragment> */}
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
                  if (e.code == "Enter") {
                    handleEnter(e);
                  }
                }}
                onChange={(e) => {
                  setSearch(e.target.value);
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
            <div className="row mr-3 d-lg-block d-none position-relative">
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
                <i
                  onClick={() => setNotification(!notification)}
                  className="ri-notification-4-line ri-2x  text-gray"
                ></i>
              </a>
              {notification && (
                <div
                  className="position-absolute px-5 bg-white w-400px right-0 p-12"
                  style={{ color: "#6C6C6C" }}
                >
                  <div className="d-flex align-items-center fz-20 justify-content-between mb-9">
                    <div>Notification</div>
                    <img
                      src="/assets/media/notification/Close_Button.png"
                      alt="close_button"
                      onClick={() => setNotification(!notification)}
                      className="cursor-pointer"
                    />
                  </div>
                  {data.map((el, i) => {
                    return (
                      <Fragment key={i}>
                        <div className="d-flex align-items-center position-relative">
                          <img
                            src={`/assets/media/notification/${el.icon}.png`}
                            alt="success"
                            style={{ objectFit: "cover" }}
                          />
                          <span className="ml-5 fz-14 text-capitalize">
                            dokumen anda sedang di tahap pengumuman akhir
                          </span>
                        </div>
                        <hr className="my-3" />
                      </Fragment>
                    );
                  })}
                </div>
              )}
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
                      {dataPribadi?.lulus && (
                        <Link href="/peserta/artikel" passHref>
                          <li className="items-lists rounded-0">
                            <div
                              style={{ fontSize: "16px" }}
                              className="ri-bar-chart-horizontal-line mr-2"
                            ></div>
                            ARTIKEL
                          </li>
                        </Link>
                      )}
                      <Link href="/peserta/pengaturan" passHref>
                        <li className="items-lists rounded-0">
                          <div
                            style={{ fontSize: "16px" }}
                            className="ri-settings-4-line mr-2"
                          ></div>
                          PENGATURAN
                        </li>
                      </Link>
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
                  <a className="mx-4 mx-md-2">
                    <button className="btn btn-sm btn-block btn-login-peserta btn-outline-primary-new my-2 justify-content-center py-3">
                      {/* <IconLogin className="mr-2 icon-login" /> */}
                      <i className="ri-login-box-line mr-2"></i>
                      Masuk
                    </button>
                  </a>
                </Link>
                <Link href="/register">
                  <a className="mx-4 mx-md-2">
                    <button
                      className={`btn btn-sm btn-block btn-register-peserta color-primary-${warna} my-2 justify-content-center py-3`}
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
                            <Link href={`/detail/akademi/${item.id}`} passHref>
                              <div className="p-4 fz-12">{item.slug}</div>
                            </Link>

                            {i !== akademi.length - 1 && (
                              <hr className="w-100 p-0 m-0" />
                            )}
                          </Fragment>
                        );
                      })}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col className="mb-8" sm={12}>
                <Link href="/pusat-informasi">Pusat Informasi</Link>
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
                    <Fragment>
                      <div
                        onClick={() => {
                          router.push("/berita");
                        }}
                        className="p-4 fz-12"
                      >
                        Berita
                      </div>
                      <hr className="w-100 p-0 m-0" />
                    </Fragment>
                    <Fragment>
                      <div
                        onClick={() => {
                          router.push("/artikel");
                        }}
                        className="p-4 fz-12"
                      >
                        Artikel
                      </div>
                      <hr className="w-100 p-0 m-0" />
                    </Fragment>
                    <Fragment>
                      <div
                        onClick={() => {
                          router.push("/galeri");
                        }}
                        className="p-4 fz-12"
                      >
                        Galeri
                      </div>
                      <hr className="w-100 p-0 m-0" />
                    </Fragment>
                    <div
                      className="p-4 fz-12"
                      onClick={() => {
                        router.push("/video");
                      }}
                    >
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
                      Lainnya
                      <i className="ri-arrow-right-s-line text-dark ml-1 position-absolute right-0"></i>
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-100 mb-6 shadow-none border p-0">
                    {menu
                      ? menu.map((item, index) => {
                          return (
                            <Fragment key={index}>
                              <div
                                onClick={() => {
                                  router.push("/lainnya/" + item.url);
                                }}
                                className="p-4 fz-12"
                              >
                                {item.name}
                              </div>
                              <hr className="w-100 p-0 m-0" />
                            </Fragment>
                          );
                        })
                      : null}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <hr />
            {/* Start side bar */}
            {session &&
              session.roles[0] === "user" &&
              !router.pathname.includes(routerPath) && (
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
