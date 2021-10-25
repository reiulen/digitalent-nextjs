import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import IconArrow2 from "../../components/assets/icon/Arrow2";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/client";

import {
  IS_ASSIDE_MOBILE_SIDEBAR,
  IS_OVERLAY_SIDEBAR_MOBILE,
  IS_MINIMIZE_SIDEBAR,
} from "../../redux/types/utils/functionals.type";

const Sidebar = ({ session }) => {
  const dispatch = useDispatch();
  const allFunctionls = useSelector((state) => state.allFunctionls);
  const router = useRouter();

  // mitra partnership sementara
  const [menuItem9, setMenuItem9] = useState("");
  const getStorageMenu4 = sessionStorage.getItem("menu4");

  // function show sub menu partnership user-mitra
  const activeMenuPartnershipMitra = () => {
    if (sessionStorage.getItem("menu4")) {
      sessionStorage.removeItem("menu4");
    } else {
      sessionStorage.setItem("menu4", "menu-item-open");
    }
    setMenuItem9(!sessionStorage.getItem("menu4") ? "" : "menu-item-open");
  };

  // function active submenu partnership user-mitra
  const activeSubItemPartnershipMitra = () => {
    if (sessionStorage.getItem("menu4")) {
      sessionStorage.removeItem("menu4");
    } else {
      sessionStorage.setItem("menu4", "menu-item-open");
    }
  };
  const [listMenuPartnershipMitra, setListMenuPartnershipMitra] = useState([
    {
      id: 1,
      name: "Kerjasama",
      href: "/partnership/user/kerjasama",
      icon: "assets/icon/sidebar_temp/mitra-kerja.svg",
    },
    {
      id: 2,
      name: "Profil Lembaga",
      href: "/partnership/user/profile-lembaga",
      icon: "assets/icon/sidebar_temp/mitra-prof.svg",
    },
    {
      id: 3,
      name: "Tanda Tangan Digital",
      href: "/partnership/user/tanda-tangan-digital",
      icon: "assets/icon/sidebar_temp/mitra-ttd.svg",
    },
  ]);
  // end mitra partnership sementara
  const activeProfileAndOverlay = () => {
    dispatch({
      type: IS_ASSIDE_MOBILE_SIDEBAR,
    });
    dispatch({
      type: IS_OVERLAY_SIDEBAR_MOBILE,
    });
  };

  const initializeMenu = [
    {
      id: 1,
      name: "Dashboard",
      href: "/dashboard",
      selected: false,
      icon: "assets/icon/sidebar_temp/Dashboard.svg",
      child: [],
    },
    {
      id: 2,
      name: "Pelatihan",
      href: "",
      icon: "assets/icon/sidebar_temp/Pelatihan.svg",
      selected: false,
      child: [
        {
          id: 1,
          name: "Akademi",
          href: "/pelatihan/akademi",
          selected: false,
          child: [],
        },
        {
          id: 2,
          name: "Tema",
          href: "/pelatihan/tema",
          selected: false,
          child: [],
        },
        {
          id: 2,
          name: "Pelatihan",
          href: "/pelatihan/pelatihan",
          selected: false,
          child: [],
        },
        {
          id: 2,
          name: "Review Pelatihan",
          href: "/pelatihan/review",
          selected: false,
          child: [],
        },
        {
          id: 2,
          name: "Rekap Pendaftaran",
          href: "/pelatihan/rekap-pendaftaran",
          selected: false,
          child: [],
        },
        {
          id: 2,
          name: "Report Pelatihan",
          href: "/pelatihan/report-pelatihan",
          selected: false,
          child: [],
        },
      ],
    },
    {
      id: 2,
      name: "Publikasi",
      href: "",
      icon: "assets/icon/sidebar_temp/Publikasi.svg",
      selected: false,
      child: [
        {
          id: 1,
          name: "Dashboard",
          href: "/publikasi/dashboard-publikasi",
          selected: false,
          child: [],
        },
        {
          id: 1,
          name: "Artikel",
          href: "/publikasi/artikel",
          selected: false,
          child: [],
        },
        {
          id: 2,
          name: "Artikel Peserta",
          href: "/publikasi/artikel-peserta",
          selected: false,
          child: [],
        },
        {
          id: 2,
          name: "Berita",
          href: "/publikasi/berita",
          selected: false,
          child: [],
        },
        {
          id: 2,
          name: "Video",
          href: "/publikasi/video",
          selected: false,
          child: [],
        },
        {
          id: 2,
          name: "Galeri",
          href: "/publikasi/galeri",
          selected: false,
          child: [],
        },
        {
          id: 2,
          name: "Kategori",
          href: "/publikasi/kategori",
          selected: false,
          child: [],
        },
        {
          id: 2,
          name: "FAQ",
          href: "/publikasi/faq",
          selected: false,
          child: [],
        },
        {
          id: 2,
          name: "Imagetron",
          href: "/publikasi/imagetron",
          selected: false,
          child: [],
        },
        {
          id: 2,
          name: "Pengaturan",
          href: "/publikasi/pengaturan",
          selected: false,
          child: [],
        },
      ],
    },
    {
      id: 2,
      name: "Partnership",
      href: "",
      icon: "assets/icon/sidebar_temp/Partnership.svg",
      selected: false,
      child: [
        {
          id: 1,
          name: "Dashboard",
          href: "/partnership/dashboard",
          selected: false,
          child: [],
        },
        {
          id: 1,
          name: "Kerjasama",
          href: "/partnership/kerjasama",
          selected: false,
          child: [],
        },
        {
          id: 2,
          name: "Mitra",
          href: "/partnership/mitra",
          selected: false,
          child: [],
        },
        {
          id: 2,
          name: "Master Kategori Kerjasama",
          href: "/partnership/master-kategori-kerjasama",
          selected: false,
          child: [],
        },
        {
          id: 2,
          name: "Tanda Tangan Digital",
          href: "/partnership/tanda-tangan",
          selected: false,
          child: [],
        },
      ],
    },
    {
      id: 2,
      name: "Sertifikat",
      href: "",
      icon: "assets/icon/sidebar_temp/Sertifikat.svg",
      selected: false,
      child: [
        {
          id: 1,
          name: "Kelola Sertifikat",
          href: "/sertifikat/kelola-sertifikat",
          selected: false,
          child: [],
        },
      ],
    },
    {
      id: 2,
      name: "Subvit",
      href: "",
      icon: "assets/icon/sidebar_temp/Subvit.svg",
      selected: false,
      child: [
        {
          id: 1,
          name: "Dashboard",
          href: "/subvit?page_substansi=1&page_trivia=1&page_survey=1",
          selected: false,
          child: [],
        },
        {
          id: 2,
          name: "Test Substansi",
          href: "/subvit/substansi",
          selected: false,
          child: [],
        },
        {
          id: 2,
          name: "Survey",
          href: "/subvit/survey",
          selected: false,
          child: [],
        },
        {
          id: 2,
          name: "TRIVIA",
          href: "/subvit/trivia",
          selected: false,
          child: [],
        },
      ],
    },
    {
      id: 2,
      name: "Site Management",
      href: "",
      icon: "assets/icon/sidebar_temp/SiteManagement.svg",
      selected: false,
      child: [
        {
          id: 1,
          name: "Dashboard",
          href: "/site-management/dashboard",
          selected: false,
          child: [],
        },
        {
          id: 2,
          name: "User",
          href: "/site-management/user",
          selected: false,
          child: [
            {
              id: 2,
              name: "Peserta DTS",
              href: "/site-management/user/peserta-dts",
              selected: false,
              child: [],
            },
            {
              id: 2,
              name: "Administrator",
              href: "/site-management/user/administrator",
              selected: false,
              child: [],
            },
            {
              id: 2,
              name: "Mitra",
              href: "/site-management/user/mitra",
              selected: false,
              child: [],
            },
          ],
        },
        {
          id: 2,
          name: "Role",
          href: "/site-management/role",
          selected: false,
          child: [],
        },
        {
          id: 2,
          name: "Export Data",
          href: "/site-management/export-data",
          selected: false,
          child: [],
        },
        {
          id: 2,
          name: "Master Data",
          href: "/site-management/master-data",
          selected: false,
          child: [
            {
              id: 2,
              name: "Master Zonasi",
              href: "/site-management/master-data/master-zonasi",
              selected: false,
              child: [],
            },
            {
              id: 2,
              name: "Master Satuan Kerja",
              href: "/site-management/master-data/master-satuan-kerja-penyelenggara",
              selected: false,
              child: [],
            },
          ],
        },
        {
          id: 2,
          name: "Data Reference",
          href: "/site-management/reference",
          selected: false,
          child: [],
        },
        {
          id: 2,
          name: "Setting",
          href: "/site-management/setting",
          selected: false,
          child: [
            {
              id: 2,
              name: "General",
              href: "/site-management/setting/general",
              selected: false,
              child: [],
            },
            {
              id: 2,
              name: "Page",
              href: "/site-management/setting/page",
              selected: false,
              child: [],
            },
            {
              id: 2,
              name: "Menu",
              href: "/site-management/setting/menu",
              selected: false,
              child: [],
            },
            {
              id: 2,
              name: "API",
              href: "/site-management/setting/api",
              selected: false,
              child: [],
            },
            {
              id: 2,
              name: "CSS",
              href: "/site-management/setting/css-editor",
              selected: false,
              child: [],
            },
            {
              id: 2,
              name: "Pelatihan",
              href: "/site-management/setting/pelatihan",
              selected: false,
              child: [],
            },
          ],
        },
      ],
    },
  ];

  const [menu, setMenu] = useState(initializeMenu);

  useEffect(() => {
    const pathRoute = router.route;
    const splitRouteToMakingActive = pathRoute.split("/");

    initializeMenu.map((row, index) => {
      if (splitRouteToMakingActive[1] == row.name.toLowerCase()) {
        initializeMenu[index].selected = true;
      }
    });
    let _temp = [...initializeMenu];
    setMenu(_temp);

    return () => {
      localStorage.removeItem("submenuActive");
    };
  }, []);

  const handleOpenMenu = (e, i, condition) => {
    const pathRoute = router.route;
    const splitRouteToMakingActive = pathRoute.split("/");

    if(condition != null){

      if (splitRouteToMakingActive[1]) {
        initializeMenu[i].selected = !condition;
      }
  
      if (i) {
        if (splitRouteToMakingActive[1]) {
          initializeMenu[i].selected = !condition;
          if (
            initializeMenu[i].name.toLowerCase() === splitRouteToMakingActive[1]
          ) {
            const idSubmenuActive = localStorage.getItem("submenuActive");
            initializeMenu[i].child[idSubmenuActive].selected = true;
          }
        }
      }

    }

    let _temp = [...initializeMenu];
    setMenu(_temp);
  };
  const handleOpenMenuSubMenu = (e, iMenu, iSubMenu) => {
    let _temp = [...menu];
    _temp.map((items, index) => {
      if (index === iMenu) {
        _temp[iMenu] = { ...items, selected: true };
        _temp[iMenu].child[iSubMenu] = {
          ..._temp[iMenu].child[iSubMenu],
          selected: _temp[iMenu].child[iSubMenu].selected ? false : true,
        };
      }
    });

    setMenu(_temp);
    e.stopPropagation();
  };

  const handleActiveSubmenu = (e, iMenu, iSubMenu) => {
    let _temp = [...menu];
    _temp.map((items, index) => {
      if (index === iMenu) {
        _temp[iMenu] = { ...items, selected: true };
        items.child.map((itemsp, indxx) => {
          if (indxx === iSubMenu) {
            localStorage.setItem("submenuActive", indxx);
            _temp[iMenu].child[indxx] = {
              ...itemsp,
              selected: itemsp.selected ? false : true,
            };
          } else {
            _temp[iMenu].child[indxx] = { ...itemsp, selected: false };
          }
        });
      }
    });
    setMenu(_temp);
    e.stopPropagation();
  };

  const handleActiveSubSubmenu = (e, iMenu, iSubMenu, iSubSubMenu) => {
    let _temp = [...menu];
    _temp.map((items, index) => {
      if (index === iMenu) {
        _temp[iMenu] = { ...items, selected: true };
        items.child.map((itemsp, indxx) => {
          if (indxx === iSubMenu) {
            _temp[iMenu].child[indxx] = {
              ...itemsp,
              selected: true,
            };

            itemsp.child.map((itemsz, indxz) => {
              if (indxz === iSubSubMenu) {
                _temp[iMenu].child[indxx].child[indxz] = {
                  ...itemsz,
                  selected: itemsz.selected ? false : true,
                };
              } else {
                _temp[iMenu].child[indxx].child[indxz] = {
                  ...itemsz,
                  selected: false,
                };
              }
            });
          }
        });
      }
    });
    setMenu(_temp);
    e.stopPropagation();
  };

  return (
    <div
      className={`aside aside-left aside-fixed d-flex flex-column flex-row-auto scroll-hidden ${
        allFunctionls.isAsideMobileSidebar && allFunctionls.isAsideMobileSidebar
          ? "aside-on"
          : ""
      } `}
      id="kt_aside"
      style={{ overflow: "scroll" }}
    >
      <div className="brand flex-column-auto" id="kt_brand">
        <a className="brand-logo">
          <Image
            alt="icon-sidebar-logo"
            src="/assets/logo/logo-6.svg"
            width={58}
            height={53}
          />
        </a>
      </div>
      <div
        className="aside-menu-wrapper flex-column-fluid"
        id="kt_aside_menu_wrapper"
        style={{ zIndex: "999999999" }}
      >
        <div
          id="kt_aside_menu"
          className="aside-menu my-4"
          data-menu-vertical="1"
          data-menu-scroll="1"
        >
          {!session ? (
            ""
          ) : session?.user?.user?.data?.user?.roles[0] === "mitra" ? (
            <ul className="menu-nav">
              <p className="fz-12 fw-400 text-white ml-4">Partnership</p>
              <li
                className={`menu-item menu-item-submenu menu-item-open ${
                  !getStorageMenu4 ? "" : getStorageMenu4
                }`}
                onClick={() => activeMenuPartnershipMitra()}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
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
                          <Link href={items.href} passHref>
                            <a
                              className="menu-link"
                              style={{ paddingLeft: "1.5rem" }}
                            >
                              <Image
                                alt="icon-sidebar-logo"
                                src={`/${items.icon}`}
                                width={24}
                                height={24}
                              />
                              <span className="menu-text ml-6">
                                {items.name}
                              </span>
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            </ul>
          ) : (
            <ul className="menu-nav">
              {menu.map((items, index) => {
                return index === 0 ? (
                  <li
                    className={`menu-item menu-item-submenu ${
                      items.selected ? "menu-item-open" : ""
                    }`}
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                    key={index}
                    id="main-menu"
                  >
                    <button
                      className="btn menu-link"
                      onClick={() => router.push("/dashboard")}
                    >
                      <span className="svg-icon menu-icon d-flex align-items-center">
                        <Image
                          alt="icon-sidebar-logo"
                          src={`/${items.icon}`}
                          width={24}
                          height={24}
                        />
                      </span>
                      <span
                        className="menu-text ml-2"
                        onClick={(e) => {
                          handleOpenMenu(null, null, null);
                        }}
                      >
                        {items.name}
                      </span>
                    </button>
                  </li>
                ) : (
                  <li
                    className={`menu-item menu-item-submenu ${
                      items.selected && "menu-item-open"
                    }`}
                    aria-haspopup="true"
                    data-menu-toggle="hover"
                    key={index}
                    id="main-menu"
                    onClick={(e) => {
                      handleOpenMenu(e, index, items.selected);
                    }}
                  >
                    <a className="menu-link menu-toggle">
                      <span className="svg-icon menu-icon d-flex align-items-center">
                        <Image
                          alt="icon-sidebar-logo"
                          src={`/${items.icon}`}
                          width={24}
                          height={24}
                        />
                      </span>
                      <span className="menu-text ml-4">{items.name}</span>

                      <i className="menu-arrow"></i>
                    </a>

                    {items.child.map((child, i) => {
                      return (
                        <div className="menu-submenu" key={i}>
                          <i className="menu-arrow"></i>
                          <ul className="menu-subnav">
                            {child.child.length === 0 ? (
                              <li
                                className={`menu-item ${
                                  child.selected ? "menu-item-active" : ""
                                }`}
                                aria-haspopup="true"
                                onClick={(e) =>
                                  handleActiveSubmenu(e, index, i)
                                }
                              >
                                <Link href={child.href} passHref>
                                  <a
                                    className="menu-link"
                                    style={{ paddingLeft: "5.5rem" }}
                                  >
                                    <span className="menu-text">
                                      {child.name}
                                    </span>
                                  </a>
                                </Link>
                              </li>
                            ) : (
                              <li
                                className={`menu-item menu-item-submenu ${
                                  child.selected ? "menu-item-open" : ""
                                }`}
                                aria-haspopup="true"
                                data-menu-toggle="hover"
                                id="sub-menu"
                                onClick={(e) =>
                                  handleOpenMenuSubMenu(e, index, i)
                                }
                              >
                                <a
                                  className="menu-link menu-toggle"
                                  style={{ paddingLeft: "5.5rem" }}
                                >
                                  <span className="menu-text">
                                    {child.name}
                                  </span>
                                  <i className="menu-arrow"></i>
                                </a>
                                <div className="menu-submenu">
                                  <i className="menu-arrow"></i>
                                  <ul className="menu-subnav">
                                    {child.child.map((child2, idx) => {
                                      return (
                                        <li
                                          className={`menu-item ${
                                            child2.selected &&
                                            "menu-item-active"
                                          }`}
                                          aria-haspopup="true"
                                          onClick={(e) =>
                                            handleActiveSubSubmenu(
                                              e,
                                              index,
                                              i,
                                              idx
                                            )
                                          }
                                          key={idx}
                                        >
                                          <Link href={child2.href} passHref>
                                            <a
                                              className="menu-link"
                                              style={{
                                                paddingLeft: "6.5rem",
                                              }}
                                            >
                                              <span className="menu-text">
                                                {child2.name}
                                              </span>
                                            </a>
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              </li>
                            )}
                          </ul>
                        </div>
                      );
                    })}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      {allFunctionls.isOverlayMobileSidebar &&
        allFunctionls.isOverlayMobileSidebar && (
          <div
            className="aside-overlay"
            style={{ zIndex: "1" }}
            onClick={() => activeProfileAndOverlay()}
          />
        )}
    </div>
  );
};

export default Sidebar;
