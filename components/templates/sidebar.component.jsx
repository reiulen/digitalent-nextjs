import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import IconArrow2 from "../../components/assets/icon/Arrow2";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/client";
import { getSidebar } from "../../redux/actions/site-management/role.actions";
import axios from "axios";
import LoadingTable from "../LoadingTable";

import {
  IS_ASSIDE_MOBILE_SIDEBAR,
  IS_OVERLAY_SIDEBAR_MOBILE,
  IS_MINIMIZE_SIDEBAR,
} from "../../redux/types/utils/functionals.type";

const Sidebar = ({ session }) => {
  const dispatch = useDispatch();
  const allFunctionls = useSelector((state) => state.allFunctionls);
  const allSidebar = useSelector((state) => state.allSidebar);
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

  const [menu, setMenu] = useState(
    JSON.parse(localStorage.getItem("sidebar"))
      ? JSON.parse(localStorage.getItem("sidebar"))
      : []
  );
  const pathRoute = router.route;
  const splitRouteToMakingActive = pathRoute.split("/");

  useEffect(() => {
    if (menu) {
      menu.map((row, index) => {
        if (splitRouteToMakingActive[1] == row.name.toLowerCase()) {
          menu[index].selected = true;

          if (
            session &&
            session?.user?.user?.data?.user?.roles[0] !== "mitra"
          ) {
            if (splitRouteToMakingActive[1] !== "dashboard") {
              const idSubmenuActive = localStorage.getItem("submenuActive");
              menu[index].child[idSubmenuActive].selected = true;
            }
          }
        }
      });
    }
    if (menu) {
      let _temp = [...menu];
      setMenu(_temp);

      return () => {
        localStorage.removeItem("submenuActive");
      };
    }
  }, []);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("sidebar")) && session) {
      const config = {
        headers: {
          Authorization: "Bearer " + session.user.user.data.token,
        },
      };

      axios
        .get(
          process.env.END_POINT_API_SITE_MANAGEMENT + "api/user/permissions",
          config
        )
        .then((data) => {
          setMenu(data.data.data.menu);
        });
    }

    if (!menu) {
      setMenu(JSON.parse(localStorage.getItem("sidebar")));
    }
  }, [session]);

  const handleOpenMenu = (e, i, condition) => {
    const pathRoute = router.route;
    const splitRouteToMakingActive = pathRoute.split("/");

    if (condition != null) {
      if (splitRouteToMakingActive[1]) {
        menu.map((data, index) => {
          if (index === i) {
            data.selected = !data.selected;
          } else {
            data.selected = false;
          }
        });
      }
    }

    let _temp = [...menu];
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
      } else {
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
              {menu ? (
                menu?.map((items, index) => {
                  return (
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
                })
              ) : (
                <LoadingTable />
              )}
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
