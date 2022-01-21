import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// import IconArrow2 from "../../components/assets/icon/Arrow2";
import { useDispatch, useSelector } from "react-redux";
// import { useSession } from "next-auth/client";
// import { getSidebar } from "../../redux/actions/site-management/role.actions";
import axios from "axios";
import LoadingTable from "../LoadingTable";
import Cookies from "js-cookie";

import {
  IS_ASSIDE_MOBILE_SIDEBAR,
  IS_OVERLAY_SIDEBAR_MOBILE,
  IS_MINIMIZE_SIDEBAR,
} from "../../redux/types/utils/functionals.type";
import { signOut } from "next-auth/client";

const Sidebar = ({ session }) => {
  const dispatch = useDispatch();
  const allFunctionls = useSelector((state) => state.allFunctionls);
  const allSidebar = useSelector((state) => state.allSidebar);
  const router = useRouter();
  const token_permission = Cookies.get("token_permission");

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

  useEffect(() => {
    if (!token_permission) {
      signOut();
    }
  }, [token_permission]);

  useEffect(() => {
    let pathRoute = router.route;
    const replacedPath =
      pathRoute.substring(0, 0) + "" + pathRoute.substring(0 + 1);
    const arrPath = replacedPath.split("/");

    if (menu) {
      menu.map((row, index) => {
        const named = row.href;
        const replacedIndexOne =
          named.substring(0, 0) + "" + named.substring(0 + 1);
        const arrNamed = replacedIndexOne.split("/");

        if (arrNamed[0] === arrPath[0]) {
          row.selected = true;

          if (session?.user?.user?.data?.user?.roles[0] !== "mitra") {
            if (arrPath.length > 1) {
              row.child.map((rows, indexx) => {
                const named = rows.href;
                const replacedIndexOne =
                  named.substring(0, 0) + "" + named.substring(0 + 1);
                const arrNamed = replacedIndexOne.split("/");

                if (arrNamed[1] === arrPath[1]) {
                  rows.selected = true;

                  if (rows.child.length > 0 && arrPath.length > 2) {
                    rows.child.map((rowss, indexx) => {
                      const named = rowss.href;
                      const replacedIndexOne =
                        named.substring(0, 0) + "" + named.substring(0 + 1);
                      const arrNamed = replacedIndexOne.split("/");

                      if (arrNamed[2] === arrPath[2]) {
                        rowss.selected = true;
                      }
                    });
                  }
                }
              });
            }
          }
        }
      });
    }
    if (menu) {
      let _temp = [...menu];
      setMenu(_temp);
    }
  }, []);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("sidebar")) && session) {
      const config = {
        headers: {
          Authorization: "Bearer " + session.user.user.data.token,
        },
      };

      if (!session?.user?.user?.data?.user?.mitra_profile) {
        axios
          .get(
            process.env.END_POINT_API_SITE_MANAGEMENT + "api/user/permissions",
            config
          )
          .then((data) => {
            setMenu(data.data.data.menu);
            localStorage.setItem(
              "sidebar",
              JSON.stringify(data.data.data.menu)
            );
            localStorage.setItem(
              "token-permission",
              data.data.data.tokenPermission
            );
            localStorage.setItem("permissions", data.data.data.permissions);
            localStorage.setItem(
              "trainings",
              JSON.stringify(data.data.data.user.trainings)
            );
            // Cookies.set("token_permission", data.data.data.tokenPermission);
          })
          .catch((e) => {
            return;
          });
      }
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

  const handleActiveSubmenu = (
    e,
    iMenu,
    iSubMenu,
    status,
    condition,
    iSubSubMenu
  ) => {
    let _temp = [...JSON.parse(localStorage.getItem("sidebar"))];

    if (status === "parent") {
      _temp[iMenu].selected = true;
      if (iSubSubMenu === null) {
        _temp[iMenu].child[iSubMenu].selected = !condition;
      } else {
        _temp[iMenu].child[iSubMenu].selected = true;
        _temp[iMenu].child[iSubMenu].child[iSubSubMenu].selected = !condition;
      }
    } else {
      _temp[iMenu].selected = true;
      _temp[iMenu].child[iSubMenu].selected =
        !_temp[iMenu].child[iSubMenu].selected;
    }

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
                          {/* <Link href={items.href} passHref> */}
                          <a
                            className="menu-link"
                            style={{
                              paddingLeft: "1.5rem",
                            }}
                            onClick={() => {
                              window.location.href = items.href;
                            }}
                          >
                            <Image
                              alt="icon-sidebar-logo"
                              src={`/${items.icon}`}
                              width={24}
                              height={24}
                            />
                            <span className="menu-text ml-6">{items.name}</span>
                          </a>
                          {/* </Link> */}
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

                      {items?.child.map((item, i) => {
                        return (
                          <div className="menu-submenu" key={i}>
                            <i className="menu-arrow"></i>
                            <ul className="menu-subnav">
                              {item.child?.length < 1 ? (
                                <li
                                  className={`menu-item ${
                                    item.selected ? "menu-item-active" : ""
                                  }`}
                                  aria-haspopup="true"
                                  onClick={(e) =>
                                    handleActiveSubmenu(
                                      e,
                                      index,
                                      i,
                                      "single",
                                      null,
                                      null
                                    )
                                  }
                                >
                                  {/* <Link
                                                                        href={
                                                                            item.href
                                                                        }
                                                                        passHref
                                                                    > */}
                                  <a
                                    className="menu-link"
                                    style={{
                                      paddingLeft: "5.5rem",
                                    }}
                                    onClick={() => {
                                      window.location.href = item.href;
                                    }}
                                  >
                                    <span className="menu-text">
                                      {item.name}
                                    </span>
                                  </a>
                                  {/* </Link> */}
                                </li>
                              ) : (
                                <li
                                  className={`menu-item menu-item-submenu ${
                                    item.selected ? "menu-item-open" : ""
                                  }`}
                                  aria-haspopup="true"
                                  data-menu-toggle="hover"
                                  id="sub-menu"
                                  onClick={(e) =>
                                    handleActiveSubmenu(
                                      e,
                                      index,
                                      i,
                                      "parent",
                                      item.selected,
                                      null
                                    )
                                  }
                                >
                                  <a
                                    className="menu-link menu-toggle"
                                    style={{
                                      paddingLeft: "5.5rem",
                                    }}
                                  >
                                    <span className="menu-text">
                                      {item.name}
                                    </span>
                                    <i className="menu-arrow"></i>
                                  </a>
                                  <div className="menu-submenu">
                                    <i className="menu-arrow"></i>
                                    <ul className="menu-subnav">
                                      {item?.child?.map((child2, idx) => {
                                        return (
                                          <li
                                            className={`menu-item menu-item-submenu ${
                                              child2.selected
                                                ? "menu-item-open"
                                                : ""
                                            }`}
                                            aria-haspopup="true"
                                            onClick={(e) => {
                                              // e.preventDefault()
                                              // location.reload();
                                              // window.location = child2.href
                                              // window.location = child2.href
                                              handleActiveSubmenu(
                                                e,
                                                index,
                                                i,
                                                "parent",
                                                child2.selected,
                                                idx
                                              );
                                            }}
                                            key={idx}
                                          >
                                            {/* <Link> */}
                                            <a
                                              className="menu-link"
                                              r
                                              style={{
                                                paddingLeft: "6.5rem",
                                              }}
                                              onClick={() => {
                                                window.location.href =
                                                  child2.href;
                                              }}
                                            >
                                              <span className="menu-text">
                                                {child2.name}
                                              </span>
                                            </a>
                                            {/* </Link> */}
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
      <ul className="menu-nav" style={{ listStyleType: "none" }}>
        <li className="menu-text text-white">
          DTS Version: {process.env.VERSION_APP}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
