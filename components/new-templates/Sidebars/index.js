import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  const [menuItem1, setMenuItem1] = useState("");
  console.log("menuItem1", menuItem1);
  const [menuItem2, setMenuItem2] = useState("");
  console.log("menuItem2", menuItem2);

  const [listMenuPartnership, setListMenuPartnership] = useState([
    { id: 1, name: "Kerjasama", href: "/user-templete/partnership/kerjasama" },
    {
      id: 2,
      name: "Profile Lembaga",
      href: "/user-templete/partnership/profile-lembaga",
    },
    {
      id: 3,
      name: "Tanda Tangan Digital",
      href: "/user-templete/partnership/tanda-tangan-digital",
    },
  ]);
  const [listMenuPublikasi, setListMenuPublikasi] = useState([
    { id: 1, name: "Kerjasama", href: "/user-templete/partnership/kerjasama" },
    {
      id: 2,
      name: "Profile Lembaga",
      href: "/user-templete/partnership/profile-lembaga",
    },
    {
      id: 3,
      name: "Tanda Tangan Digital",
      href: "/user-templete/partnership/tanda-tangan-digital",
    },
  ]);
  //
  const activeSubItemPartnership = () => {
    if (localStorage.getItem("menu")) {
      localStorage.removeItem("menu");
    } else {
      localStorage.setItem("menu", "menu-item-open");
    }
  };
  const activeSubItemPublikasi = () => {
    if (localStorage.getItem("menu2")) {
      localStorage.removeItem("menu2");
    } else {
      localStorage.setItem("menu2", "menu-item-open");
    }
  };
  //
  const activeMenuPartnership = () => {
    if (localStorage.getItem("menu")) {
      localStorage.removeItem("menu");
    } else {
      localStorage.setItem("menu", "menu-item-open");
    }
    setMenuItem1(!localStorage.getItem("menu") ? "" : "menu-item-open");
  };
  //
  const activeMenuPublikasi = () => {
    if (localStorage.getItem("menu2")) {
      localStorage.removeItem("menu2");
    } else {
      localStorage.setItem("menu2", "menu-item-open");
    }
    setMenuItem2(!localStorage.getItem("menu2") ? "" : "menu-item-open");
  };

  useEffect(() => {
    //
    const dataFromLocal = !localStorage.getItem("menu")
      ? ""
      : localStorage.getItem("menu");
    setMenuItem1(dataFromLocal);
    //
    const dataFromLocal2 = !localStorage.getItem("menu2")
      ? ""
      : localStorage.getItem("menu2");
    setMenuItem2(dataFromLocal2);
  }, []);

  return (
    <>
      {/* <!--begin::Aside--> */}

      <div
        className="aside aside-left aside-fixed d-flex flex-column flex-row-auto"
        id="kt_aside"
      >
        {/* <!--begin::Brand--> */}
        <div className="brand flex-column-auto" id="kt_brand">
          {/* <!--begin::Logo--> */}
          <a className="brand-logo">
            <Image
              alt="icon-sidebar-logo"
              src="/assets/logo/logo.png"
              width={100}
              height={42}
            />
          </a>
          {/* <!--end::Logo--> */}
          {/* <!--begin::Toggle--> */}
          <button className="brand-toggle btn btn-sm px-0" id="kt_aside_toggle">
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
                onClick={() => activeMenuPartnership()}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <a className="menu-link menu-toggle">
                  <span className="svg-icon menu-icon">
                    <Image
                      alt="icon-sidebar-layers"
                      src="/assets/icon/new/aside/layers-white.svg"
                      width={24}
                      height={24}
                    />
                  </span>
                  <span className="menu-text">Partnership</span>
                  <i className="menu-arrow"></i>
                </a>

                <div className="menu-submenu">
                  <i className="menu-arrow"></i>
                  <ul className="menu-subnav">
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
                          onClick={() => activeSubItemPartnership(items.id)}
                        >
                          <Link href={`${items.href}`}>
                            <a className="menu-link">
                              <span className="menu-text">{items.name}</span>
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
              <li
                className={`menu-item menu-item-submenu ${menuItem2}`}
                onClick={() => activeMenuPublikasi()}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <a className="menu-link menu-toggle">
                  <span className="svg-icon menu-icon">
                    <Image
                      alt="icon-sidebar-layers"
                      src="/assets/icon/new/aside/layers-white.svg"
                      width={24}
                      height={24}
                    />
                  </span>
                  <span className="menu-text">Publikasi</span>
                  <i className="menu-arrow"></i>
                </a>

                <div className="menu-submenu">
                  <i className="menu-arrow"></i>
                  <ul className="menu-subnav">
                    {listMenuPublikasi.map((items, index) => {
                      return (
                        <li
                          key={index}
                          className={`menu-item ${
                            items.href === router.pathname
                              ? "menu-item-active"
                              : ""
                          }`}
                          aria-haspopup="true"
                          onClick={() => activeSubItemPublikasi(items.id)}
                        >
                          <Link href={`${items.href}`}>
                            <a className="menu-link">
                              <span className="menu-text">{items.name}</span>
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            </ul>
            {/* <!--end::Menu Nav--> */}
          </div>
          {/* <!--end::Menu Container--> */}
        </div>
        {/* <!--end::Aside Menu--> */}
      </div>
      {/* <!--end::Aside--> */}
    </>
  );
};

export default Sidebar;
