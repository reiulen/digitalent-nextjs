import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Toast } from "react-bootstrap";
import Link from "next/link";
import { signOut } from "next-auth/client";
import IconArrow from "../../../components/assets/icon/Arrow2";
import style from "./Navbar.module.css";
import Image from "next/image";
import dynamic from "next/dynamic";
import LoadingSidebar from "../loader/LoadingSidebar";
import { toast } from "react-toastify";

import { getFirebaseToken } from "../../../messaging_get_token";

import { getMessaging, onMessage } from "firebase/messaging";

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
  const [warna, setWarna] = useState("secondary");
  const [menu, setMenu] = useState([]);

  const [dataNotification, setDataNotification] = useState([]);

  const { footer, loading } = useSelector((state) => state.berandaFooter);

  // const [isTokenFound, setTokenFound] = useState(false);
  const [alertNotif, setAlertNotif] = useState(false);

  useEffect(() => {
    // getFirebaseToken(setTokenFound);
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      // toast.info(payload.notification.title);
      GetNotifikasi();
      setAlertNotif(true);
    });

    if (!session) {
      return;
    }
    if (session && session.roles[0] == "user") {
      GetNotifikasi();
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
        if (dataPribadi.wizard == 1 || dataPribadi.wizard == 0) {
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

      if (dataPribadi && dataPribadi?.pindahan_pelatihan_id?.length > 0) {
        return router.push(
          `/peserta/form-pendaftaran?id=${dataPribadi?.pindahan_pelatihan_id[0]}`
        );
      }
    }
  }, []);

  const getDataGeneral = async (token) => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting/general/get`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data) {
        localStorage.setItem("navbar", data.data.color[0].color);
      }
    } catch (error) {}
  };

  const GetNotifikasi = async () => {
    axios
      .get(
        process.env.END_POINT_API_PELATIHAN + "api/v1/auth/get-notikasi-user",
        {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        }
      )
      .then((res) => {
        setDataNotification(res.data.data);
      })
      .catch((err) => {});
  };

  const ClearNotifikasi = async () => {
    axios
      .get(
        process.env.END_POINT_API_PELATIHAN + "api/v1/auth/hapus-notifikasi",
        {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        }
      )
      .then((res) => {
        GetNotifikasi();
      });
  };

  const getMenu = async (token) => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-menu/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Host-Backend": `free`,
          },
        }
      );
      const result = data.data.filter((item) => {
        return item.status == 1 && item.page_status == 1;
      });
      setMenu(result);
    } catch (error) {}
  };

  useEffect(() => {
    if (!localStorage.getItem("navbar")) {
      getDataGeneral(session?.token);
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
    getMenu(session?.token);
  }, []);

  const handlerLogout = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + session.token,
      },
    };
    await axios
      .get(process.env.END_POINT_API_PELATIHAN + "api/v1/auth/logout", config)
      .then((res) => {
        if (res.data.status) {
          Cookies.remove("id_tema");
          Cookies.remove("id_pelatihan");
          Cookies.remove("fcm_token");
          localStorage.clear();
          signOut();
        }
      })
      .catch((err) => {});
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

  const [navbarItems, setNavbarItems] = useState("");
  const [rilisMedia, setRilisMedia] = useState([
    "berita",
    "artikel",
    "galeri",
    "video",
    "testimoni",
  ]);
  const [index, setIndex] = useState(0);

  const [state, setState] = useState();

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
                  ? process.env.END_POINT_API_IMAGE_SITE_MANAGEMENT +
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
            {!isNavOpen && session && session.roles[0] === "user" ? (
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
                  <i
                    className="ri-notification-4-line ri-2x mx-0 mx-md-3 text-gray"
                    onClick={() => {
                      setNotification(!notification);
                      setAlertNotif(false);
                    }}
                  ></i>
                  {dataNotification?.length > 0 && (
                    <div
                      onClick={() => setNotification(!notification)}
                      className="position-absolute bg-danger rounded-full cursor-pointer d-flex justify-content-center align-items-center"
                      style={{
                        height: "18px",
                        width: "18px",
                        right: "8px",
                        top: "5px",
                        border: "2px solid white",
                      }}
                    >
                      <div
                        style={{ fontSize: "9px" }}
                        className="text-white m-0 p-0"
                      >
                        {/* ANGKA NOTIFIKASI */}
                        {dataNotification?.length}
                      </div>
                    </div>
                  )}
                  {notification && (
                    <div
                      className="position-absolute px-5 bg-white w-200px right-0 p-6 max-h-275px overflow-auto"
                      style={{ color: "#6C6C6C" }}
                    >
                      <div className="d-flex align-items-center fz-12 justify-content-between mb-9">
                        <div>Notifikasi</div>
                        <img
                          src="/assets/media/notification/Close_Button.png"
                          alt="close_button"
                          onClick={() => {
                            setNotification(!notification);
                            setAlertNotif(false);
                            ClearNotifikasi();
                          }}
                          className="cursor-pointer"
                          style={{ width: "20px", height: "20px" }}
                        />
                      </div>
                      {dataNotification?.length > 0 &&
                        dataNotification?.map((el, i) => {
                          return (
                            <Fragment key={i}>
                              {console.log(dataNotification)}
                              <div className="d-flex align-items-center position-relative ">
                                <img
                                  src={`/assets/media/notification/${el.icon}.png`}
                                  alt="success"
                                  style={{ objectFit: "cover" }}
                                />
                                <span className="ml-5 fz-10 text-capitalize">
                                  {el.Pesan}
                                </span>
                              </div>
                              <hr className="my-3" />
                            </Fragment>
                          );
                        })}
                    </div>
                  )}
                </a>
              </div>
            ) : (
              <div>
                <a className="col-3 p-md-0 col-xl-4 text-left">
                  <i
                    className="ri-search-2-line ri-2x mx-0 mx-md-3 text-gray"
                    onClick={() => setShowSearch(!showSearch)}
                  ></i>
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
          <Form
            className="w-100 my-2 mx-1 row  d-block d-lg-none "
            onSubmit={(e) => {
              e.preventDefault();
              if (search != "") {
                router.push(`/pencarian?cari=${search}&page=1`);
                dispatch(searchKeyword(search));
              }
            }}
          >
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
                // onKeyDown={(e) => {
                // 	setSearch(e.target.value);
                // 	// if (e.code == "Enter") {
                // 	// 	handleEnter(e);
                // 	// }
                // 	setState(e.code);
                // }}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <IconSearch
                className="left-center-absolute"
                style={{ left: "10px" }}
              />
              {state}
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
                  <Col
                    md={navbarItems ? 6 : 12}
                    className="p-0 m-0"
                    style={
                      navbarItems ? { borderRight: "1px solid #6c6c6c" } : {}
                    }
                  >
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
                        Akademi
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
                    <Link href="/mitra" passHref>
                      <NavDropdown.Item className="navdropdown-child">
                        mitra pelatihan
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
                    <Link href="/cek-sertifikat" passHref>
                      <NavDropdown.Item className="navdropdown-child">
                        Cek Sertifikat
                      </NavDropdown.Item>
                    </Link>
                    {menu?.length > 0 && (
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
                    )}
                  </Col>
                  <Col
                    className={`p-0 m-0 ${
                      menu?.length > 0 ? `h-400px` : "h-350px"
                    } overflow-auto ${style.scrollbar_navbar}`}
                  >
                    {navbarItems &&
                      navbarItems?.map((el, i) => {
                        return (
                          <a
                            key={i}
                            onClick={() => {
                              if (el.slug) {
                                window.location.href = `/detail/akademi/${el.id}`;
                              } else if (el.name) {
                                window.location.href = `/lainnya/${el.url}`;
                              } else {
                                window.location.href = `/${el}`;
                              }
                            }}
                          >
                            <NavDropdown.Item className={`navdropdown-child `}>
                              {el.slug ? el.slug : el.name ? el.name : el}
                            </NavDropdown.Item>
                          </a>
                        );
                      })}
                  </Col>
                </Row>
              </NavDropdown>
            </div>
            {/* END MENU */}
          </Nav>
          {/* Search Bar */}
          <Form
            className="w-100 my-2 mx-5 row"
            onSubmit={(e) => {
              e.preventDefault();
              if (search != "") {
                router.push(`/pencarian?cari=${search}&page=1`);
                dispatch(searchKeyword(search));
              }
            }}
          >
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
                // onKeyDown={(e) => {
                // 	if (e.code == "Enter") {
                // 		handleEnter(e);
                // 	}
                // }}
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
                  onClick={() => {
                    setNotification(!notification);
                    setAlertNotif(false);
                  }}
                  className="ri-notification-4-line ri-2x  text-gray"
                ></i>
              </a>
              {dataNotification?.length > 0 && (
                <div
                  onClick={() => {
                    setNotification(!notification);
                  }}
                  className="position-absolute bg-danger rounded-full cursor-pointer d-flex align-items-center justify-content-center"
                  style={{
                    height: "18px",
                    width: "18px",
                    right: "10px",
                    top: "5px",
                    border: "1px solid white",
                  }}
                >
                  <div
                    style={{ fontSize: "9px" }}
                    className="text-white m-0 p-0"
                  >
                    {/* ANGKA NOTIFIKASI */}
                    {dataNotification?.length}
                  </div>
                </div>
              )}
              {notification && (
                <div
                  className="position-absolute px-5 bg-white w-400px right-0 p-12 max-h-275px overflow-auto d-md-block d-none"
                  style={{ color: "#6C6C6C" }}
                >
                  <div className="d-flex align-items-center fz-20 justify-content-between mb-9">
                    <div>Notifikasi</div>
                    <img
                      src="/assets/media/notification/Close_Button.png"
                      alt="close_button"
                      onClick={() => {
                        setNotification(!notification);
                        setAlertNotif(false);
                        ClearNotifikasi();
                      }}
                      className="cursor-pointer"
                    />
                  </div>
                  {dataNotification?.length > 0 &&
                    dataNotification?.map((el, i) => {
                      return (
                        <Fragment key={i}>
                          <div className="d-flex align-items-center position-relative ">
                            <img
                              src={`/assets/media/notification/${el.icon}.png`}
                              alt="success"
                              style={{ objectFit: "cover" }}
                            />
                            <span className="ml-5 fz-14 text-capitalize">
                              {el.Pesan}
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
                <div className="d-lg-none d-block px-8">
                  <div
                    className={`wrap-accouts ${style.wrapAccounts}`}
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
                          PROFIL
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
                    <button
                      className={`btn btn-sm btn-block btn-login-peserta btn-outline-primary-new my-2 justify-content-center py-3 color-hover-${warna}`}
                    >
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
            <Row className="d-lg-none px-8">
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
                      Akademi
                      <i className="ri-arrow-right-s-line text-dark ml-1 position-absolute right-0"></i>
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-100 mb-6 shadow-none border p-0">
                    {/* gw map disini */}
                    {akademi &&
                      akademi?.map((item, i) => {
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
                <Link href="/tentang-kami">Tentang Kami</Link>
              </Col>
              <Col className="mb-8" sm={12}>
                <Link href="/mitra">Mitra Pelatihan</Link>
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
                    </div>{" "}
                    <hr className="w-100 p-0 m-0" />
                    <div
                      className="p-4 fz-12"
                      onClick={() => {
                        router.push("/testimoni");
                      }}
                    >
                      Testimoni
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

              <Col className="mb-8" sm={12}>
                <Link href="/cek-sertifikat">Cek Sertifikat</Link>
              </Col>
              {menu?.length > 0 && (
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
                        ? menu?.map((item, index) => {
                            return (
                              <Fragment key={index}>
                                <div
                                  onClick={() => {
                                    router.push("/lainnya/" + item.url);
                                  }}
                                  className={`p-4 fz-12 ${
                                    item.status === 1 && item.page_status === 1
                                      ? ""
                                      : "d-none"
                                  }`}
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
              )}
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
                  session={session}
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
