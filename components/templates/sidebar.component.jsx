import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import IconArrow2 from "../../components/assets/icon/Arrow2";
import { useDispatch, useSelector } from "react-redux";

import {
  IS_ASSIDE_MOBILE_SIDEBAR,
  IS_OVERLAY_SIDEBAR_MOBILE,
  IS_MINIMIZE_SIDEBAR,
} from "../../redux/types/utils/functionals.type";

const Sidebar = () => {
  const dispatch = useDispatch();
  const getStorageMenu2 = sessionStorage.getItem("menu2");
  const getStorageMenu4 = sessionStorage.getItem("menu4");
  const getStorageMenu3 = sessionStorage.getItem("menu3");
  const getStorageMenu = sessionStorage.getItem("menu");

  const allFunctionls = useSelector((state) => state.allFunctionls);

  const router = useRouter();
  const [menuItem1, setMenuItem1] = useState("");
  const [menuItem2, setMenuItem2] = useState("");
  // publikasi
  const [menuItem3, setMenuItem3] = useState("");
  // partnership
  const [menuItem4, setMenuItem4] = useState("");
  const [menuItem5, setMenuItem5] = useState("");
  // subvit
  const [menuItem6, setMenuItem6] = useState("");
  const [menuItem7, setMenuItem7] = useState("");
  const [menuItem8, setMenuItem8] = useState("");
  const [menuItemS, setMenuItemS] = useState("");
  // user-mitra
  const [menuItem9, setMenuItem9] = useState("");

  const onSetMenuItem1 = () => {
    if (menuItem1 !== "") {
      setMenuItem1("");
    } else {
      setMenuItem1("menu-item-open");
    }
  };

  const onSetMenuItem2 = () => {
    if (menuItem2 !== "") {
      setMenuItem2("");
    } else {
      setMenuItem2("menu-item-open");
    }
  };

  const onSetMenuItem3 = () => {
    if (menuItem3 !== "") {
      setMenuItem3("");
    } else {
      setMenuItem3("menu-item-open");
    }
  };

  // ----------------------------------- start publikasi

  // list publikasi submenu
  const [listMenuPublikasi, setListMenuPublikasi] = useState([
    { id: 1, name: "Dashboard", href: "/publikasi/dashboard-publikasi" },
    {
      id: 2,
      name: "Artikel",
      href: "/publikasi/artikel",
    },
    {
      id: 3,
      name: "Artikel Peserta",
      href: "/publikasi/artikel-peserta",
    },
    {
      id: 4,
      name: "Berita",
      href: "/publikasi/berita",
    },
    {
      id: 5,
      name: "Video",
      href: "/publikasi/video",
    },
    {
      id: 6,
      name: "Galeri",
      href: "/publikasi/galeri",
    },
    {
      id: 7,
      name: "Kategori",
      href: "/publikasi/kategori",
    },
    {
      id: 8,
      name: "FAQ",
      href: "/publikasi/faq",
    },
    {
      id: 9,
      name: "Imagetron",
      href: "/publikasi/imagetron",
    },
    {
      id: 10,
      name: "Pengaturan",
      href: "/publikasi/pengaturan",
    },
  ]);
  // function active submenu publikasi
  const activeSubItemPublikasi = () => {
    if (sessionStorage.getItem("menu2")) {
      sessionStorage.removeItem("menu2");
    } else {
      sessionStorage.setItem("menu2", "menu-item-open");
    }
  };
  // function show sub menu publikasi
  const activeMenuPublikasi = () => {
    if (sessionStorage.getItem("menu2")) {
      sessionStorage.removeItem("menu2");
    } else {
      sessionStorage.setItem("menu2", "menu-item-open");
    }
    setMenuItem3(!sessionStorage.getItem("menu2") ? "" : "menu-item-open");
  };

  // ----------------------------------- end publikasi

  // ----------------------------------- start partnership

  // list partnership submenu
  const [listMenuPartnership, setListMenuPartnership] = useState([
    { id: 1, name: "Dashboard", href: "/partnership/dashboard" },
    {
      id: 2,
      name: "Kerjasama",
      href: "/partnership/kerjasama",
    },
    {
      id: 3,
      name: "Master Mitra",
      href: "/partnership/mitra",
    },
    {
      id: 4,
      name: "Master Kategori Kerjasama",
      href: "/partnership/master-kategori-kerjasama",
    },
    {
      id: 5,
      name: "Tanda Tangan Digital",
      href: "/partnership/tanda-tangan",
    },
  ]);
  // function active submenu partnership
  const activeSubItemPartnership = () => {
    if (sessionStorage.getItem("menu")) {
      sessionStorage.removeItem("menu");
    } else {
      sessionStorage.setItem("menu", "menu-item-open");
    }
  };
  // function show sub menu partnership
  const activeMenuPartnership = () => {
    if (sessionStorage.getItem("menu")) {
      sessionStorage.removeItem("menu");
    } else {
      sessionStorage.setItem("menu", "menu-item-open");
    }
    setMenuItem4(!sessionStorage.getItem("menu") ? "" : "menu-item-open");
  };

  // ----------------------------------- end partnership
  // ----------------------------------- start user-mitra

  // list partnership user-mitra submenu
  const [listMenuPartnershipMitra, setListMenuPartnershipMitra] = useState([
    { id: 1, name: "Kerjasama", href: "/partnership/user/kerjasama" },
    {
      id: 2,
      name: "Profil Lembaga",
      href: "/partnership/user/profile-lembaga/input-profile",
    },
    {
      id: 3,
      name: "Tanda Tangan Digital",
      href: "/partnership/user/tanda-tangan-digital",
    },
  ]);
  // function active submenu partnership user-mitra
  const activeSubItemPartnershipMitra = () => {
    if (sessionStorage.getItem("menu4")) {
      sessionStorage.removeItem("menu4");
    } else {
      sessionStorage.setItem("menu4", "menu-item-open");
    }
  };
  // function show sub menu partnership user-mitra
  const activeMenuPartnershipMitra = () => {
    if (sessionStorage.getItem("menu4")) {
      sessionStorage.removeItem("menu4");
    } else {
      sessionStorage.setItem("menu4", "menu-item-open");
    }
    setMenuItem9(!sessionStorage.getItem("menu4") ? "" : "menu-item-open");
  };

  // ----------------------------------- end user-mitra

  const onSetMenuItem5 = () => {
    if (menuItem5 !== "") {
      setMenuItem5("");
    } else {
      setMenuItem5("menu-item-open");
    }
  };

  // ----------------------------------- start subvit

  // list subvit submenu
  const [listMenuSubvit, setListMenuSubvit] = useState([
    { id: 1, name: "Tes Substansi", href: "/subvit/substansi" },
    {
      id: 2,
      name: "Survey",
      href: "/subvit/survey",
    },
    {
      id: 3,
      name: "TRIVIA",
      href: "/subvit/trivia",
    },
  ]);
  // function active submenu subvit
  const activeSubItemSubvit = () => {
    if (sessionStorage.getItem("menu3")) {
      sessionStorage.removeItem("menu3");
    } else {
      sessionStorage.setItem("menu3", "menu-item-open");
    }
  };
  // function show sub menu subvit
  const activeMenuSubvit = () => {
    if (sessionStorage.getItem("menu3")) {
      sessionStorage.removeItem("menu3");
    } else {
      sessionStorage.setItem("menu3", "menu-item-open");
    }
    setMenuItem6(!sessionStorage.getItem("menu3") ? "" : "menu-item-open");
  };

  // ----------------------------------- end subvit

  const onSetMenuItem7 = () => {
    if (menuItem7 !== "") {
      setMenuItem7("");
    } else {
      setMenuItem7("menu-item-open");
    }
  };

  const onSetMenuItem8 = () => {
    if (menuItem8 !== "") {
      setMenuItem8("");
    } else {
      setMenuItem8("menu-item-open");
    }
  };

  const onSetMenuItemS = () => {
    if (menuItemS !== "") {
      setMenuItemS("");
    } else {
      setMenuItemS("menu-item-open");
    }
  };
  const activeProfileAndOverlay = () => {
    dispatch({
      type: IS_ASSIDE_MOBILE_SIDEBAR,
    });
    dispatch({
      type: IS_OVERLAY_SIDEBAR_MOBILE,
    });
  };

  // useEffect(() => {
  //   // partnership
  //   const dataFromLocal = !sessionStorage.getItem("menu")
  //     ? ""
  //     : sessionStorage.getItem("menu");
  //   setMenuItem4(dataFromLocal);
  //   // publikasi
  //   const dataFromLocal2 = !sessionStorage.getItem("menu2")
  //     ? ""
  //     : sessionStorage.getItem("menu2");
  //   setMenuItem3(dataFromLocal2);
  //   // subvit
  //   const dataFromLocal3 = !sessionStorage.getItem("menu3")
  //     ? ""
  //     : sessionStorage.getItem("menu3");
  //   setMenuItem6(dataFromLocal3);
  // }, []);

  // START LIST MENU SERTIFIKAT
  const [listMenuSertifikat, setListMenuSertifikat] = useState([
    {
      id: 1,
      name: "Kelola Sertifikat",
      href: "/sertifikat/kelola-sertifikat",
    },
    {
      id: 2,
      name: "Master Sertifikat",
      href: "/sertifikat/master-sertifikat",
    },
    {
      id: 3,
      name: "Perubahan Sertifikat",
      href: "/sertifikat/perubahan-sertifikat",
    },
  ]);

  const activeSubItemSertifikat = () => {
    if (sessionStorage.getItem("menu5")) {
      sessionStorage.removeItem("menu5");
    } else {
      sessionStorage.setItem("menu5", "menu-item-open");
    }
  };

  // END LIST MENU SERTIFIKAT

  return (
    <>
      {/* <!--begin::Aside--> */}
      <div
        className={`aside aside-left aside-fixed d-flex flex-column flex-row-auto scroll-hidden ${
          allFunctionls.isAsideMobileSidebar &&
          allFunctionls.isAsideMobileSidebar
            ? "aside-on"
            : ""
        }`}
        // aside-on
        id="kt_aside"
        style={{ overflow: "scroll" }}
      >
        {/* <!--begin::Brand--> */}
        <div className="brand flex-column-auto" id="kt_brand">
          {/* <!--begin::Logo--> */}
          <a className="brand-logo">
            <Image
              alt="icon-sidebar-logo"
              src="/assets/logo/logo-6.svg"
              width={58}
              height={53}
            />
          </a>
          {/* <!--end::Logo--> */}
          {/* <!--begin::Toggle--> */}
          <button
            className={`brand-toggle btn btn-sm px-0 ${
              allFunctionls.isMinimizeSidebar && allFunctionls.isMinimizeSidebar
                ? "active"
                : ""
            }`}
            id="kt_aside_toggle"
            onClick={() => dispatch({ type: IS_MINIMIZE_SIDEBAR })}
          >
            <span className="svg-icon svg-icon svg-icon-xl">
              {/* <!--begin::Svg Icon | path:assets/media/svg/icons/Navigation/Angle-double-left.svg--> */}
              <Image
                alt="icon-sidebar-panah"
                src="/assets/icon/panah.svg"
                width={24}
                height={24}
              />
              {/* <!--end::Svg Icon--> */}
            </span>
          </button>
          {/* <!--end::Toolbar--> */}
        </div>
        {/* <!--end::Brand--> */}

        {/* <!--begin::Aside Menu--> */}
        <div
          className="aside-menu-wrapper flex-column-fluid"
          id="kt_aside_menu_wrapper"
          style={{ zIndex: "999999999" }}
        >
          {/* <!--begin::Menu Container--> */}
          <div
            id="kt_aside_menu"
            className="aside-menu my-4"
            data-menu-vertical="1"
            data-menu-scroll="1"
            data-menu-dropdown-timeout="500"
          >
            {/* <!--begin::Menu Nav--> */}
            <ul className="menu-nav">
              <li
                className={`menu-item menu-item-submenu ${menuItem1}`}
                onClick={onSetMenuItem1}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <a
                  href="javascript:;"
                  className="menu-link menu-toggle d-flex align-items-center"
                >
                  <span className="svg-icon menu-icon">
                    {/* <Image
                      alt="icon-sidebar-layers"
                      src="/assets/icon/new/aside/layers-white.svg"
                      width={24}
                      height={24}
                    /> */}
                    {/* <i class="ri-arrow-down-s-line"></i> */}
                    <svg
                      width="25"
                      height="26"
                      viewBox="0 0 25 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.4688 17.2648C12.0172 17.704 12.797 17.7037 13.3451 17.2641L20.0169 11.913L20.246 11.7303C20.9977 11.1306 20.9989 9.98842 20.2485 9.38713L13.3451 3.85573C12.797 3.4165 12.0174 3.4165 11.4692 3.85573L4.56144 9.39071C3.81245 9.99086 3.81196 11.1303 4.56044 11.7311L4.78712 11.913L11.4688 17.2648Z"
                        fill="white"
                      />
                      <path
                        opacity="0.5"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.3347 19.9705C12.7866 20.4096 12.0072 20.4097 11.459 19.9706L5.52621 15.2187C5.11478 14.8892 4.51294 14.9618 4.19168 15.3797C3.87519 15.7915 3.95204 16.3818 4.36341 16.6988L11.4902 22.1905C12.0297 22.6062 12.7815 22.6063 13.3211 22.1906L20.4445 16.7036C20.8594 16.3841 20.9367 15.7887 20.6172 15.3738C20.2932 14.9532 19.6872 14.8804 19.2729 15.2124L13.3347 19.9705Z"
                        fill="#4299E1"
                      />
                    </svg>
                  </span>
                  <span className="menu-text">Dashboard</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="menu-submenu">
                  <i className="menu-arrow"></i>
                  <ul className="menu-subnav">
                    <li
                      className="menu-item menu-item-parent"
                      aria-haspopup="true"
                    >
                      <span className="menu-link">
                        <span className="menu-text">Dashboard</span>
                      </span>
                    </li>
                    <li className="menu-item" aria-haspopup="true">
                      <a className="menu-link">
                        <span className="menu-text">Pelatihan</span>
                      </a>
                    </li>
                    <li className="menu-item" aria-haspopup="true">
                      <Link href="/publikasi">
                        <a className="menu-link">
                          <span className="menu-text">Publikasi</span>
                        </a>
                      </Link>
                    </li>
                    <li className="menu-item" aria-haspopup="true">
                      <a className="menu-link">
                        <span className="menu-text">Partnership</span>
                      </a>
                    </li>
                    <li className="menu-item" aria-haspopup="true">
                      <a className="menu-link">
                        <span className="menu-text">Sertifikat</span>
                      </a>
                    </li>
                    <li className="menu-item" aria-haspopup="true">
                      <Link href="/subvit">
                        <a className="menu-link">
                          <span className="menu-text">Subvit</span>
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li
                className={`menu-item menu-item-submenu ${menuItem2}`}
                onClick={onSetMenuItem2}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <a href="javascript:;" className="menu-link menu-toggle">
                  <span className="svg-icon menu-icon">
                    {/* <Image
                      alt="icon-sidebar-blok4"
                      src="/assets/icon/new/aside/blocks-white.svg"
                      width={24}
                      height={24}
                    /> */}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="4"
                        y="4"
                        width="7"
                        height="7"
                        rx="1.5"
                        fill="white"
                      />
                      <path
                        opacity="0.3"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13 5.5C13 4.67157 13.6716 4 14.5 4H18.5C19.3284 4 20 4.67157 20 5.5V9.5C20 10.3284 19.3284 11 18.5 11H14.5C13.6716 11 13 10.3284 13 9.5V5.5ZM4 14.5C4 13.6716 4.67157 13 5.5 13H9.5C10.3284 13 11 13.6716 11 14.5V18.5C11 19.3284 10.3284 20 9.5 20H5.5C4.67157 20 4 19.3284 4 18.5V14.5ZM14.5 13C13.6716 13 13 13.6716 13 14.5V18.5C13 19.3284 13.6716 20 14.5 20H18.5C19.3284 20 20 19.3284 20 18.5V14.5C20 13.6716 19.3284 13 18.5 13H14.5Z"
                        fill="#187DE4"
                      />
                    </svg>
                  </span>
                  <span className="menu-text">Pelatihan</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="menu-submenu">
                  <i className="menu-arrow"></i>
                  <ul className="menu-subnav">
                    <li
                      className="menu-item menu-item-parent"
                      aria-haspopup="true"
                    >
                      <span className="menu-link">
                        <span className="menu-text">Pelatihan</span>
                      </span>
                    </li>
                    <li className="menu-item" aria-haspopup="true">
                      <Link href="/pelatihan/akademi">
                        <a className="menu-link">
                          <span className="menu-text">Akademi</span>
                        </a>
                      </Link>
                    </li>
                    <li className="menu-item" aria-haspopup="true">
                      <Link href="/pelatihan/tema">
                        <a className="menu-link">
                          <span className="menu-text">Tema</span>
                        </a>
                      </Link>
                    </li>
                    <li className="menu-item" aria-haspopup="true">
                      <Link href="/pelatihan/pelatihan">
                        <a className="menu-link">
                          <span className="menu-text">Pelatihan</span>
                        </a>
                      </Link>
                    </li>
                    <li className="menu-item" aria-haspopup="true">
                      <Link href="/pelatihan/review">
                        <a className="menu-link">
                          <span className="menu-text">Review Pelatihan</span>
                        </a>
                      </Link>
                    </li>
                    <li className="menu-item" aria-haspopup="true">
                      <Link href="/pelatihan/rekap-pendaftaran">
                        <a className="menu-link">
                          <span className="menu-text">Rekap Pendaftaran</span>
                        </a>
                      </Link>
                    </li>
                    <li className="menu-item" aria-haspopup="true">
                      <Link href="/pelatihan/report-pelatihan">
                        <a className="menu-link">
                          <span className="menu-text">Report Pelatihan</span>
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li
                className={`menu-item menu-item-submenu ${
                  !getStorageMenu2 ? "" : getStorageMenu2
                }`}
                aria-haspopup="true"
                data-menu-toggle="hover"
                onClick={() => activeMenuPublikasi()}
              >
                <a
                  href="javascript:;"
                  // onClick={onSetMenuItem3}
                  className="menu-link menu-toggle d-flex align-items-center"
                >
                  <span className="svg-icon menu-icon">
                    {/* <Image
                      alt="icon-sidebar-picture"
                      src="/assets/icon/new/aside/pictures-white.svg"
                      width={24}
                      height={24}
                    /> */}
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.3"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.10205 19.5C2.10205 20.3284 2.77362 21 3.60205 21H20.6021C21.4305 21 22.1021 20.3284 22.1021 19.5V8.5C22.1021 7.67157 21.4305 7 20.6021 7H10.1021L7.54139 4.43934C7.26009 4.15804 6.87856 4 6.48073 4H3.60205C2.77362 4 2.10205 4.67157 2.10205 5.5V19.5Z"
                        fill="#4299E1"
                      />
                      <path
                        opacity="0.5"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.10205 19L10.1021 11L16.1021 19H4.10205Z"
                        fill="#4299E1"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.1021 19L15.1021 14L19.1021 19H11.1021Z"
                        fill="white"
                      />
                      <path
                        opacity="0.5"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.1021 12C18.9305 12 19.6021 11.3284 19.6021 10.5C19.6021 9.67157 18.9305 9 18.1021 9C17.2736 9 16.6021 9.67157 16.6021 10.5C16.6021 11.3284 17.2736 12 18.1021 12Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  <span className="menu-text">Publikasi</span>
                  {/* <i className="menu-arrow"></i> */}
                  <IconArrow2
                    className="transition-animate"
                    fill="#ffffff"
                    style={{
                      transform: getStorageMenu2
                        ? "rotate(90deg)"
                        : "rotate(0)",
                    }}
                  />
                </a>
                <div className={`menu-submenu`}>
                  <i className="menu-arrow"></i>
                  <ul className={`menu-subnav`}>
                    <li
                      className={
                        router.pathname == "/publikasi"
                          ? "menu-item menu-item-parent menu-item-active"
                          : "menu-item menu-item-parent"
                      }
                      aria-haspopup="true"
                    >
                      <span className="menu-link">
                        <span className="menu-text">Publikasi</span>
                      </span>
                    </li>
                    {/* start loop publikasi */}
                    {listMenuPublikasi.map((items, index) => {
                      return (
                        // <li
                        //   className={
                        //     router.pathname == "/publikasi/dashboard-publikasi"
                        //       ? "menu-item menu-item-active"
                        //       : "menu-item"
                        //   }
                        //   aria-haspopup="true"
                        // >
                        //   <Link href="/publikasi/dashboard-publikasi">
                        //     <a className="menu-link">
                        //       <span className="menu-text">Dashboard</span>
                        //     </a>
                        //   </Link>
                        // </li>
                        <li
                          className={`menu-item ${
                            items.href === router.pathname
                              ? "menu-item-active"
                              : ""
                          }`}
                          key={index}
                          aria-haspopup="true"
                          onClick={() => activeSubItemPublikasi()}
                        >
                          <Link href={items.href}>
                            <a className="menu-link">
                              <span className="menu-text">{items.name}</span>
                            </a>
                          </Link>
                        </li>
                      );
                    })}

                    {/* end loop publikasi */}

                    <li
                      className={`menu-item menu-item-submenu ${menuItemS}`}
                      aria-haspopup="true"
                      data-menu-toggle="hover"
                    >
                      {/* <a
                        href="javascript:;"
                        className="menu-link menu-toggle"
                        onClick={onSetMenuItemS}
                      >
                        <span className="menu-text">Managemen Admin</span>
                        <i className="menu-arrow"></i>
                      </a> */}
                      <div className="menu-submenu">
                        <i className="menu-arrow"></i>
                        <ul className="menu-subnav">
                          <li className="menu-item" aria-haspopup="true">
                            <Link href="/publikasi/managemen-admin/role">
                              <a className="menu-link">
                                {/* <i className="menu-bullet menu-bullet-dot">
                                                                <span></span>
                                                            </i> */}
                                <span className="menu-text">List Role</span>
                              </a>
                            </Link>
                          </li>
                          <li className="menu-item" aria-haspopup="true">
                            <Link href="/publikasi/managemen-admin/admin">
                              <a className="menu-link">
                                {/* <i className="menu-bullet menu-bullet-dot">
                                                                <span></span>
                                                            </i> */}
                                <span className="menu-text">List Admin</span>
                              </a>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>

              <li
                className={`menu-item menu-item-submenu ${
                  !getStorageMenu ? "" : getStorageMenu
                }`}
                onClick={() => activeMenuPartnership()}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <a
                  href="javascript:;"
                  className="menu-link menu-toggle d-flex align-items-center"
                >
                  <span className="svg-icon menu-icon">
                    {/* <Image
                      alt="icon-sidebar-orang"
                      src="/assets/icon/new/aside/people-white.svg"
                      width={24}
                      height={24}
                    /> */}
                    <svg
                      width="23"
                      height="23"
                      viewBox="0 0 23 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.79163 6.70833C4.79163 8.82543 6.50787 10.5417 8.62496 10.5417C10.7421 10.5417 12.4583 8.82543 12.4583 6.70833C12.4583 4.59124 10.7421 2.875 8.62496 2.875C6.50787 2.875 4.79163 4.59124 4.79163 6.70833ZM14.375 10.5417C14.375 12.1295 15.6621 13.4167 17.25 13.4167C18.8378 13.4167 20.125 12.1295 20.125 10.5417C20.125 8.95385 18.8378 7.66667 17.25 7.66667C15.6621 7.66667 14.375 8.95385 14.375 10.5417Z"
                        fill="white"
                      />
                      <path
                        opacity="0.3"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.60904 12.4584C4.08433 12.4584 0.372081 14.7838 0.000624531 19.3576C-0.0196092 19.6068 0.456849 20.125 0.69719 20.125H16.5281C17.248 20.125 17.2592 19.5457 17.248 19.3584C16.9672 14.656 13.1974 12.4584 8.60904 12.4584ZM22.4786 20.125L18.7833 20.125C18.7833 17.9679 18.0706 15.9772 16.8678 14.3756C20.1324 14.4113 22.7979 16.0618 22.9985 19.55C23.0066 19.6905 22.9985 20.125 22.4786 20.125Z"
                        fill="#4299E1"
                      />
                    </svg>
                  </span>
                  <span className="menu-text">Partnership</span>
                  {/* <i className="menu-arrow"></i> */}
                  <IconArrow2
                    className="transition-animate"
                    fill="#ffffff"
                    style={{
                      transform: getStorageMenu ? "rotate(90deg)" : "rotate(0)",
                    }}
                  />
                </a>
                <div className="menu-submenu">
                  <i className="menu-arrow"></i>
                  <ul className="menu-subnav">
                    <li
                      className="menu-item menu-item-parent"
                      aria-haspopup="true"
                    >
                      <span className="menu-link">
                        <span className="menu-text">Partnership</span>
                      </span>
                    </li>

                    {/* start partnership loop */}

                    {listMenuPartnership.map((items, index) => {
                      return (
                        <li
                          key={index}
                          className={`menu-item ${
                            items.href === router.pathname
                              ? "menu-item-active"
                              : ""
                          }`}
                          aria-haspopup="true"
                          onClick={() => activeSubItemPartnership()}
                        >
                          <Link href={items.href}>
                            <a className="menu-link">
                              <span className="menu-text">{items.name}</span>
                            </a>
                          </Link>
                        </li>
                      );
                    })}

                    {/* <li className="menu-item" aria-haspopup="true">
                      <Link href="/partnership/kerjasama">
                        <a className="menu-link">
                          <span className="menu-text">Kerjasama</span>
                        </a>
                      </Link>
                    </li>
                    <li className="menu-item" aria-haspopup="true">
                      <Link href="/partnership/mitra">
                        <a className="menu-link">
                          <span className="menu-text">Master Mitra</span>
                        </a>
                      </Link>
                    </li>
                    <li className="menu-item" aria-haspopup="true">
                      <Link href="/partnership/master-kategori-kerjasama">
                        <a className="menu-link">
                          <span className="menu-text">
                            Master Kategori Kerjasama
                          </span>
                        </a>
                      </Link>
                    </li>
                    <li className="menu-item" aria-haspopup="true">
                      <Link href="/partnership/tanda-tangan">
                        <a className="menu-link">
                          <span className="menu-text">
                            Tanda Tangan Digital
                          </span>
                        </a>
                      </Link>
                    </li> */}
                    {/* end partnership loop */}
                  </ul>
                </div>
              </li>

              <li
                className={`menu-item menu-item-submenu ${menuItem5}`}
                onClick={onSetMenuItem5}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <a
                  href="javascript:;"
                  className="menu-link menu-toggle d-flex align-items-center"
                >
                  <span className="svg-icon menu-icon">
                    {/* <Image
                      alt="icon-sidebar-document"
                      src="/assets/icon/new/aside/file-white.svg"
                      width={24}
                      height={24}
                    /> */}
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.3"
                        d="M4.63699 1.58337H10.7603C11.115 1.58337 11.4582 1.70906 11.729 1.93811L15.3021 4.96037C15.6391 5.24538 15.8334 5.66431 15.8334 6.10563V15.8993C15.8334 17.3169 15.8172 17.4167 14.3632 17.4167H4.63699C3.18294 17.4167 3.16675 17.3169 3.16675 15.8993V3.10074C3.16675 1.68322 3.18294 1.58337 4.63699 1.58337Z"
                        fill="#4299E1"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.70841 11.0833L7.12508 11.0833C6.68785 11.0833 6.33341 10.7289 6.33341 10.2916C6.33341 9.8544 6.68785 9.49996 7.12508 9.49996L8.70841 9.49996L8.70841 7.91663C8.70841 7.4794 9.06285 7.12496 9.50008 7.12496C9.9373 7.12496 10.2917 7.4794 10.2917 7.91663L10.2917 9.49996H11.8751C12.3123 9.49996 12.6667 9.8544 12.6667 10.2916C12.6667 10.7289 12.3123 11.0833 11.8751 11.0833H10.2917L10.2917 12.6666C10.2917 13.1039 9.9373 13.4583 9.50008 13.4583C9.06285 13.4583 8.70841 13.1039 8.70841 12.6666L8.70841 11.0833Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  <span className="menu-text">Sertifikat</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="menu-submenu">
                  <i className="menu-arrow"></i>
                  <ul className="menu-subnav">
                    <li
                      className="menu-item menu-item-parent"
                      aria-haspopup="true"
                    >
                      <span className="menu-link">
                        <span className="menu-text">Sertifikat</span>
                      </span>
                    </li>
                    {listMenuSertifikat.map((items, index) => {
                      return (
                        // <li className="menu-item" aria-haspopup="true">
                        //   <Link href="/subvit/substansi">
                        //     <a className="menu-link">
                        //       <span className="menu-text">Tes Substansi</span>
                        //     </a>
                        //   </Link>
                        // </li>
                        <li
                          key={index}
                          className={`menu-item ${
                            items.href === router.pathname
                              ? "menu-item-active"
                              : ""
                          }`}
                          aria-haspopup="true"
                          onClick={() => activeSubItemSertifikat()}
                        >
                          <Link href={items.href}>
                            <a className="menu-link">
                              <span className="menu-text">{items.name}</span>
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                    <li className="menu-item" aria-haspopup="true">
                      <a className="menu-link">
                        <span className="menu-text">Sample Link</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li
                className={`menu-item menu-item-submenu 
                ${!getStorageMenu3 ? "" : getStorageMenu3}`}
                // onClick={onSetMenuItem6}
                onClick={() => activeMenuSubvit()}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <a
                  href="javascript:;"
                  className="menu-link menu-toggle d-flex align-items-center"
                >
                  <span className="svg-icon menu-icon">
                    {/* <Image
                      alt="icon-sidebar-kotak-kotak"
                      src="/assets/icon/new/aside/compiling-white.svg"
                      width={24}
                      height={24}
                    /> */}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.3"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.5607 10.682C13.9749 11.2678 13.9749 12.2175 14.5607 12.8033L16.682 14.9246C17.2678 15.5104 18.2175 15.5104 18.8033 14.9246L20.9246 12.8033C21.5104 12.2175 21.5104 11.2678 20.9246 10.682L18.8033 8.56068C18.2175 7.97489 17.2678 7.97489 16.682 8.56068L14.5607 10.682ZM2.56068 10.682C1.97489 11.2678 1.97489 12.2175 2.56068 12.8033L4.682 14.9246C5.26778 15.5104 6.21753 15.5104 6.80332 14.9246L8.92464 12.8033C9.51042 12.2175 9.51042 11.2678 8.92464 10.682L6.80332 8.56068C6.21753 7.97489 5.26778 7.97489 4.682 8.56068L2.56068 10.682Z"
                        fill="#4299E1"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.56068 4.682C7.97489 5.26778 7.97489 6.21753 8.56068 6.80332L10.682 8.92464C11.2678 9.51042 12.2175 9.51042 12.8033 8.92464L14.9246 6.80332C15.5104 6.21753 15.5104 5.26778 14.9246 4.682L12.8033 2.56068C12.2175 1.97489 11.2678 1.97489 10.682 2.56068L8.56068 4.682ZM8.56068 16.682C7.97489 17.2678 7.97489 18.2175 8.56068 18.8033L10.682 20.9246C11.2678 21.5104 12.2175 21.5104 12.8033 20.9246L14.9246 18.8033C15.5104 18.2175 15.5104 17.2678 14.9246 16.682L12.8033 14.5607C12.2175 13.9749 11.2678 13.9749 10.682 14.5607L8.56068 16.682Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  <span className="menu-text">Subvit</span>
                  {/* <i className="menu-arrow"></i> */}
                  <IconArrow2
                    className="transition-animate"
                    fill="#ffffff"
                    style={{
                      transform: getStorageMenu3
                        ? "rotate(90deg)"
                        : "rotate(0)",
                    }}
                  />
                </a>
                {/* <Link href='/subvit/'>
                </Link> */}
                <div className="menu-submenu">
                  <i className="menu-arrow"></i>
                  <ul className="menu-subnav">
                    <li
                      className="menu-item menu-item-parent"
                      aria-haspopup="true"
                    >
                      <span className="menu-link">
                        <span className="menu-text">Subvit</span>
                      </span>
                    </li>

                    {/* start loop subvit */}

                    {listMenuSubvit.map((items, index) => {
                      return (
                        // <li className="menu-item" aria-haspopup="true">
                        //   <Link href="/subvit/substansi">
                        //     <a className="menu-link">
                        //       <span className="menu-text">Tes Substansi</span>
                        //     </a>
                        //   </Link>
                        // </li>
                        <li
                          key={index}
                          className={`menu-item ${
                            items.href === router.pathname
                              ? "menu-item-active"
                              : ""
                          }`}
                          aria-haspopup="true"
                          onClick={() => activeSubItemSubvit()}
                        >
                          <Link href={items.href}>
                            <a className="menu-link">
                              <span className="menu-text">{items.name}</span>
                            </a>
                          </Link>
                        </li>
                      );
                    })}

                    {/* <li className="menu-item" aria-haspopup="true">
                      <Link href="/subvit/substansi">
                        <a className="menu-link">
                          <span className="menu-text">Tes Substansi</span>
                        </a>
                      </Link>
                    </li> */}

                    {/* end loop subvit */}
                  </ul>
                </div>
              </li>

              <li
                className={`menu-item menu-item-submenu ${menuItem7}`}
                onClick={onSetMenuItem7}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <a href="javascript:;" className="menu-link menu-toggle">
                  <span className="svg-icon menu-icon">
                    {/* <Image
                      alt="icon-sidebar-perisai"
                      src="/assets/icon/new/aside/shield-white.svg"
                      width={24}
                      height={24}
                    /> */}
                    <svg
                      width="23"
                      height="23"
                      viewBox="0 0 23 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.3"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.83337 3.8333L11.1315 2.46491C11.3751 2.41923 11.625 2.41923 11.8686 2.46491L19.1667 3.8333V11.1532C19.1667 14.9459 17.2129 18.4711 13.9967 20.4812L12.03 21.7104C11.7058 21.9131 11.2943 21.9131 10.97 21.7104L9.00339 20.4812C5.78719 18.4711 3.83337 14.9459 3.83337 11.1532L3.83337 3.8333Z"
                        fill="#4299E1"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.7094 14.1354C10.4798 14.1354 10.2502 14.0436 10.0665 13.8599L8.22974 12.0231C7.86238 11.6557 7.86238 11.1047 8.22974 10.7373C8.59711 10.37 9.19407 10.37 9.51551 10.7373L10.7094 11.9312L13.7402 8.90052C14.1075 8.53316 14.6586 8.53316 15.0259 8.90052C15.3933 9.26788 15.3933 9.81892 15.0259 10.1863L11.3523 13.8599C11.1686 14.0436 10.939 14.1354 10.7094 14.1354Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  <Link href="/site-management/" passHref>
                    <span className="menu-text">Site Management</span>
                  </Link>
                  <i className="menu-arrow"></i>
                </a>
                <div className="menu-submenu">
                  <i className="menu-arrow"></i>
                  <ul className="menu-subnav">
                    <li
                      className="menu-item menu-item-parent"
                      aria-haspopup="true"
                    >
                      <span className="menu-link">
                        <Link href="/site-management/" passHref>
                          <span className="menu-text">Site Management</span>
                        </Link>
                      </span>
                    </li>
                    <li
                      className={`menu-item menu-item-submenu ${menuItem8}`}
                      onClick={onSetMenuItem8}
                      aria-haspopup="true"
                      data-menu-toggle="hover"
                    >
                      <a href="javascript:;" className="menu-link menu-toggle">
                        <Link href="/site-management/user/" passHref>
                          <span className="menu-text">User</span>
                        </Link>
                        <i className="menu-arrow"></i>
                      </a>
                      <div className="menu-submenu">
                        <i className="menu-arrow"></i>
                        <ul className="menu-subnav">
                          <li
                            className="menu-item menu-item-parent"
                            aria-haspopup="true"
                          >
                            <span className="menu-link">
                              <Link href="/site-management/user/" passHref>
                                <span className="menu-text">User</span>
                              </Link>
                            </span>
                          </li>
                          <li className="menu-item" aria-haspopup="true">
                            <a className="menu-link">
                              <Link href="/site-management/peserta/" passHref>
                                <span className="menu-text">Peserta DTS</span>
                              </Link>
                            </a>
                          </li>
                          <li className="menu-item" aria-haspopup="true">
                            <a className="menu-link">
                              <Link href="/site-management/administrator/" passHref>
                                <span className="menu-text">Administrator</span>
                              </Link>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="menu-item" aria-haspopup="true">
                      <a className="menu-link">
                        <Link href="/site-management/role/">
                          <span className="menu-text">Role</span>
                        </Link>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              {/* <li
                className={`menu-item menu-item-submenu ${menuItem8}`}
                onClick={onSetMenuItem8}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <a href="javascript:;" className="menu-link menu-toggle">
                  <span className="svg-icon menu-icon">
                    <Image
                      alt="icon-sidebar-perisai"
                      src="/assets/icon/perisai.svg"
                      width={24}
                      height={24}
                    />
                  </span>
                  <span className="menu-text">User</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="menu-submenu">
                  <i className="menu-arrow"></i>
                  <ul className="menu-subnav">
                    <li
                      className="menu-item menu-item-parent"
                      aria-haspopup="true"
                    >
                      <span className="menu-link">
                        <span className="menu-text">User</span>
                      </span>
                    </li>
                    <li className="menu-item" aria-haspopup="true">
                      <Link href="/partnership/user/">
                        <a className="menu-link">
                          <span className="menu-text">Manajemen Kerjasama</span>
                        </a>
                      </Link>
                    </li>
                    <li className="menu-item" aria-haspopup="true">
                      <a className="menu-link">
                        <span className="menu-text">Profil Lembaga</span>
                      </a>
                    </li>
                    <li className="menu-item" aria-haspopup="true">
                      <Link href="/partnership/user/tanda-tangan">
                        <a className="menu-link">
                          <span className="menu-text">
                            Tanda Tangan Digital
                          </span>
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li> */}
              <li
                className={`menu-item menu-item-submenu ${
                  !getStorageMenu4 ? "" : getStorageMenu4
                }`}
                onClick={() => activeMenuPartnershipMitra()}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <a
                  href="javascript:;"
                  className="menu-link menu-toggle d-flex align-items-center"
                >
                  <span className="svg-icon menu-icon">
                    {/* <Image
                      alt="icon-sidebar-orang"
                      src="/assets/icon/new/aside/people-white.svg"
                      width={24}
                      height={24}
                    /> */}
                    <svg
                      width="23"
                      height="23"
                      viewBox="0 0 23 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.79163 6.70833C4.79163 8.82543 6.50787 10.5417 8.62496 10.5417C10.7421 10.5417 12.4583 8.82543 12.4583 6.70833C12.4583 4.59124 10.7421 2.875 8.62496 2.875C6.50787 2.875 4.79163 4.59124 4.79163 6.70833ZM14.375 10.5417C14.375 12.1295 15.6621 13.4167 17.25 13.4167C18.8378 13.4167 20.125 12.1295 20.125 10.5417C20.125 8.95385 18.8378 7.66667 17.25 7.66667C15.6621 7.66667 14.375 8.95385 14.375 10.5417Z"
                        fill="white"
                      />
                      <path
                        opacity="0.3"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.60904 12.4584C4.08433 12.4584 0.372081 14.7838 0.000624531 19.3576C-0.0196092 19.6068 0.456849 20.125 0.69719 20.125H16.5281C17.248 20.125 17.2592 19.5457 17.248 19.3584C16.9672 14.656 13.1974 12.4584 8.60904 12.4584ZM22.4786 20.125L18.7833 20.125C18.7833 17.9679 18.0706 15.9772 16.8678 14.3756C20.1324 14.4113 22.7979 16.0618 22.9985 19.55C23.0066 19.6905 22.9985 20.125 22.4786 20.125Z"
                        fill="#4299E1"
                      />
                    </svg>
                  </span>
                  <span className="menu-text">User Partnership</span>
                  {/* <i className="menu-arrow"></i> */}
                  <IconArrow2
                    className="transition-animate"
                    fill="#ffffff"
                    style={{
                      transform: getStorageMenu4
                        ? "rotate(90deg)"
                        : "rotate(0)",
                    }}
                  />
                </a>
                <div className="menu-submenu">
                  <i className="menu-arrow"></i>
                  <ul className="menu-subnav">
                    <li
                      className="menu-item menu-item-parent"
                      aria-haspopup="true"
                    >
                      <span className="menu-link">
                        <span className="menu-text">Partnership</span>
                      </span>
                    </li>

                    {/* start partnership loop */}

                    {listMenuPartnershipMitra.map((items, index) => {
                      return (
                        <li
                          key={index}
                          className={`menu-item ${
                            items.href === router.pathname
                              ? "menu-item-active"
                              : ""
                          }`}
                          aria-haspopup="true"
                          onClick={() => activeSubItemPartnershipMitra()}
                        >
                          <Link href={items.href}>
                            <a className="menu-link">
                              <span className="menu-text">{items.name}</span>
                            </a>
                          </Link>
                        </li>
                      );
                    })}

                    {/* <li className="menu-item" aria-haspopup="true">
                      <Link href="/partnership/kerjasama">
                        <a className="menu-link">
                          <span className="menu-text">Kerjasama</span>
                        </a>
                      </Link>
                    </li>
                    <li className="menu-item" aria-haspopup="true">
                      <Link href="/partnership/mitra">
                        <a className="menu-link">
                          <span className="menu-text">Master Mitra</span>
                        </a>
                      </Link>
                    </li>
                    <li className="menu-item" aria-haspopup="true">
                      <Link href="/partnership/master-kategori-kerjasama">
                        <a className="menu-link">
                          <span className="menu-text">
                            Master Kategori Kerjasama
                          </span>
                        </a>
                      </Link>
                    </li>
                    <li className="menu-item" aria-haspopup="true">
                      <Link href="/partnership/tanda-tangan">
                        <a className="menu-link">
                          <span className="menu-text">
                            Tanda Tangan Digital
                          </span>
                        </a>
                      </Link>
                    </li> */}
                    {/* end partnership loop */}
                  </ul>
                </div>
              </li>
            </ul>
            {/* <!--end::Menu Nav--> */}
          </div>
          {/* <!--end::Menu Container--> */}
        </div>
        {/* <!--end::Aside Menu--> */}
        {allFunctionls.isOverlayMobileSidebar &&
        allFunctionls.isOverlayMobileSidebar ? (
          <div
            className="aside-overlay"
            style={{ zIndex: "1" }}
            onClick={() => activeProfileAndOverlay()}
          ></div>
        ) : (
          ""
        )}
      </div>
      {/* <!--end::Aside--> */}
    </>
  );
};

export default Sidebar;
