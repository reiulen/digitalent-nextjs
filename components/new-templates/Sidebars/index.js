import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();
  const [menuItem1, setMenuItem1] = useState("");
  const [menuItem2, setMenuItem2] = useState("");
  const [menuItem3, setMenuItem3] = useState("");
  const [menuItem4, setMenuItem4] = useState("");
  const [menuItem5, setMenuItem5] = useState("");
  const [menuItem6, setMenuItem6] = useState("");
  const [menuItem7, setMenuItem7] = useState("");
  const [menuItem8, setMenuItem8] = useState("");
  const [menuItemS, setMenuItemS] = useState("");

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

  const onSetMenuItem4 = () => {
    if (menuItem4 !== "") {
      setMenuItem4("");
    } else {
      setMenuItem4("menu-item-open");
    }
  };

  const onSetMenuItem5 = () => {
    if (menuItem5 !== "") {
      setMenuItem5("");
    } else {
      setMenuItem5("menu-item-open");
    }
  };

  const onSetMenuItem6 = () => {
    if (menuItem6 !== "") {
      setMenuItem6("");
    } else {
      setMenuItem6("menu-item-open");
    }
  };

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
                onClick={onSetMenuItem1}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <a href="javascript:;" className="menu-link menu-toggle">
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
                    <li
                      className="menu-item menu-item-parent"
                      aria-haspopup="true"
                    >
                      <span className="menu-link">
                        <span className="menu-text">Dashboard</span>
                      </span>
                    </li>
                    <li className="menu-item" aria-haspopup="true">
                      <Link href="/user-templete/partnership/kerjasama">
                        <a className="menu-link">
                          <span className="menu-text">Kerjasama</span>
                        </a>
                      </Link>
                    </li>
                    <li className="menu-item" aria-haspopup="true">
                      <Link href="/user-templete/partnership/profile-lembaga">
                        <a className="menu-link">
                          <span className="menu-text">Profil Lembaga</span>
                        </a>
                      </Link>
                    </li>
                    <li className="menu-item" aria-haspopup="true">
                      <Link href="/user-templete/partnership/tanda-tangan-digital">
                        <a className="menu-link">
                          <span className="menu-text">
                            Tanda Tangan Digital
                          </span>
                        </a>
                      </Link>
                    </li>
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
