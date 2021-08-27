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
          <a href="index.html" className="brand-logo">
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
                      src="/assets/icon/Layers.svg"
                      width={24}
                      height={24}
                    />
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
                    <Image
                      alt="icon-sidebar-blok4"
                      src="/assets/icon/blok4.svg"
                      width={24}
                      height={24}
                    />
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
                      <a className="menu-link">
                        <span className="menu-text">Sample Link</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li
                className={`menu-item menu-item-submenu ${menuItem3}`}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <a
                  href="javascript:;"
                  onClick={onSetMenuItem3}
                  className="menu-link menu-toggle"
                >
                  <span className="svg-icon menu-icon">
                    <Image
                      alt="icon-sidebar-picture"
                      src="/assets/icon/picture.svg"
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
                    <li
                      className={
                        router.pathname == "/publikasi/artikel"
                          ? "menu-item menu-item-active"
                          : "menu-item"
                      }
                      aria-haspopup="true"
                    >
                      <Link href="/publikasi/artikel">
                        <a className="menu-link">
                          <span className="menu-text">Artikel</span>
                        </a>
                      </Link>
                    </li>
                    <li
                      className={
                        router.pathname == "/publikasi/artikel-peserta"
                          ? "menu-item menu-item-active"
                          : "menu-item"
                      }
                      aria-haspopup="true"
                    >
                      <Link href="/publikasi/artikel-peserta">
                        <a className="menu-link">
                          <span className="menu-text">Artikel Peserta</span>
                        </a>
                      </Link>
                    </li>
                    <li
                      className={
                        router.pathname == "/publikasi/berita"
                          ? "menu-item menu-item-active"
                          : "menu-item"
                      }
                      aria-haspopup="true"
                    >
                      <Link href="/publikasi/berita">
                        <a className="menu-link">
                          <span className="menu-text">Berita</span>
                        </a>
                      </Link>
                    </li>
                    <li
                      className={
                        router.pathname == "/publikasi/video"
                          ? "menu-item menu-item-active"
                          : "menu-item"
                      }
                      aria-haspopup="true"
                    >
                      <Link href="/publikasi/video">
                        <a className="menu-link">
                          <span className="menu-text">Video</span>
                        </a>
                      </Link>
                    </li>
                    <li
                      className={
                        router.pathname == "/publikasi/galeri"
                          ? "menu-item menu-item-active"
                          : "menu-item"
                      }
                      aria-haspopup="true"
                    >
                      <Link href="/publikasi/galeri">
                        <a className="menu-link">
                          <span className="menu-text">Galeri</span>
                        </a>
                      </Link>
                    </li>
                    <li
                      className={
                        router.pathname == "/publikasi/kategori"
                          ? "menu-item menu-item-active"
                          : "menu-item"
                      }
                      aria-haspopup="true"
                    >
                      <Link href="/publikasi/kategori">
                        <a className="menu-link">
                          <span className="menu-text">Kategori</span>
                        </a>
                      </Link>
                    </li>
                    <li
                      className={
                        router.pathname == "/publikasi/faq"
                          ? "menu-item menu-item-active"
                          : "menu-item"
                      }
                      aria-haspopup="true"
                    >
                      <Link href="/publikasi/faq">
                        <a className="menu-link">
                          <span className="menu-text">FAQ</span>
                        </a>
                      </Link>
                    </li>
                    <li
                      className={
                        router.pathname == "/publikasi/imagetron"
                          ? "menu-item menu-item-active"
                          : "menu-item"
                      }
                      aria-haspopup="true"
                    >
                      <Link href="/publikasi/imagetron">
                        <a className="menu-link">
                          <span className="menu-text">Imagetron</span>
                        </a>
                      </Link>
                    </li>
                    <li
                      className={
                        router.pathname == "/publikasi/pengaturan"
                          ? "menu-item menu-item-active"
                          : "menu-item"
                      }
                      aria-haspopup="true"
                    >
                      <Link href="/publikasi/pengaturan">
                        <a className="menu-link">
                          <span className="menu-text">Pengaturan</span>
                        </a>
                      </Link>
                    </li>

                    <li
                      className={`menu-item menu-item-submenu ${menuItemS}`}
                      aria-haspopup="true"
                      data-menu-toggle="hover"
                    >
                      <a
                        href="javascript:;"
                        className="menu-link menu-toggle"
                        onClick={onSetMenuItemS}
                      >
                        <span className="menu-text">Managemen Admin</span>
                        <i className="menu-arrow"></i>
                      </a>
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
                className={`menu-item menu-item-submenu ${menuItem4}`}
                onClick={onSetMenuItem4}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <a href="javascript:;" className="menu-link menu-toggle">
                  <span className="svg-icon menu-icon">
                    <Image
                      alt="icon-sidebar-orang"
                      src="/assets/icon/orang.svg"
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
                        <span className="menu-text">Partnership</span>
                      </span>
                    </li>
                    <li className="menu-item" aria-haspopup="true">
                      <Link href="/partnership/manajemen-kerjasama">
                        <a className="menu-link">
                          <span className="menu-text">Kerjasama</span>
                        </a>
                      </Link>
                    </li>
                    <li className="menu-item" aria-haspopup="true">
                      <Link href="/partnership/manajemen-mitra">
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
                          <span className="menu-text">Tanda Tangan Digital</span>
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li
                className={`menu-item menu-item-submenu ${menuItem5}`}
                onClick={onSetMenuItem5}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <a href="javascript:;" className="menu-link menu-toggle">
                  <span className="svg-icon menu-icon">
                    <Image
                      alt="icon-sidebar-document"
                      src="/assets/icon/document.svg"
                      width={24}
                      height={24}
                    />
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
                    <li className="menu-item" aria-haspopup="true">
                      <a className="menu-link">
                        <span className="menu-text">Sample Link</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li
                className={`menu-item menu-item-submenu ${menuItem6}`}
                onClick={onSetMenuItem6}
                aria-haspopup="true"
                data-menu-toggle="hover"
              >
                <a href="javascript:;" className="menu-link menu-toggle">
                  <span className="svg-icon menu-icon">
                    <Image
                      alt="icon-sidebar-kotak-kotak"
                      src="/assets/icon/kotak-kotak.svg"
                      width={24}
                      height={24}
                    />
                  </span>
                  <span className="menu-text">Subvit</span>
                  <i className="menu-arrow"></i>
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
                    <li className="menu-item" aria-haspopup="true">
                      <Link href="/subvit/substansi">
                        <a className="menu-link">
                          <span className="menu-text">Tes Substansi</span>
                        </a>
                      </Link>
                    </li>

                    <li className="menu-item" aria-haspopup="true">
                      <Link href="/subvit/survey">
                        <a className="menu-link">
                          <span className="menu-text">Survey</span>
                        </a>
                      </Link>
                    </li>

                    <li className="menu-item" aria-haspopup="true">
                      <Link href="/subvit/trivia">
                        <a className="menu-link">
                          <span className="menu-text">TRIVIA</span>
                        </a>
                      </Link>
                    </li>
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
                    <Image
                      alt="icon-sidebar-perisai"
                      src="/assets/icon/perisai.svg"
                      width={24}
                      height={24}
                    />
                  </span>
                  <span className="menu-text">Site Management</span>
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
                        <span className="menu-text">Site Management</span>
                      </span>
                    </li>
                    <li className="menu-item" aria-haspopup="true">
                      <a className="menu-link">
                        <span className="menu-text">Sample Link</span>
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
