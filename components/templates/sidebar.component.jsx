import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/router";

const Sidebar = () => {
    const router = useRouter();
    return (
        <>
            {/* <!--begin::Aside--> */}
            <div className="aside aside-left aside-fixed d-flex flex-column flex-row-auto" id="kt_aside">

                {/* <!--begin::Brand--> */}
                <div className="brand flex-column-auto" id="kt_brand">
                    {/* <!--begin::Logo--> */}
                    <a href="index.html" className="brand-logo">
                        <Image alt='icon-sidebar-logo' src="/assets/logo/logo.png" width={100} height={42} />
                    </a>
                    {/* <!--end::Logo--> */}
                    {/* <!--begin::Toggle--> */}
                    <button className="brand-toggle btn btn-sm px-0" id="kt_aside_toggle">
                        <span className="svg-icon svg-icon svg-icon-xl">
                            {/* <!--begin::Svg Icon | path:assets/media/svg/icons/Navigation/Angle-double-left.svg--> */}
                            <Image alt='icon-sidebar-panah' src='/assets/icon/panah.svg' width={24} height={24} />
                            {/* <!--end::Svg Icon--> */}
                        </span>
                    </button>
                    {/* <!--end::Toolbar--> */}
                </div>
                {/* <!--end::Brand--> */}

                {/* <!--begin::Aside Menu--> */}
                <div className="aside-menu-wrapper flex-column-fluid" id="kt_aside_menu_wrapper">
                    {/* <!--begin::Menu Container--> */}
                    <div id="kt_aside_menu" className="aside-menu my-4" data-menu-vertical="1" data-menu-scroll="1"
                        data-menu-dropdown-timeout="500">
                        {/* <!--begin::Menu Nav--> */}
                        <ul className="menu-nav">
                            <li className="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
                                <a href="javascript:;" className="menu-link menu-toggle">
                                    <span className="svg-icon menu-icon">
                                        <Image alt='icon-sidebar-layers' src='/assets/icon/Layers.svg' width={24} height={24} />
                                    </span>
                                    <span className="menu-text">Dashboard</span>
                                    <i className="menu-arrow"></i>
                                </a>
                                <div className="menu-submenu">
                                    <i className="menu-arrow"></i>
                                    <ul className="menu-subnav">
                                        <li className="menu-item menu-item-parent" aria-haspopup="true">
                                            <span className="menu-link">
                                                <span className="menu-text">Dashboard</span>
                                            </span>
                                        </li>
                                        <li className="menu-item menu-item-active" aria-haspopup="true">
                                            <a className="menu-link">
                                                <span className="menu-text">Pelatihan</span>
                                            </a>
                                        </li>
                                        <li className="menu-item" aria-haspopup="true">
                                            <Link href='/'>
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
                                            <a className="menu-link">
                                                <span className="menu-text">Subvit</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li className="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
                                <a href="javascript:;" className="menu-link menu-toggle">
                                    <span className="svg-icon menu-icon">
                                        <Image alt='icon-sidebar-blok4' src='/assets/icon/blok4.svg' width={24} height={24} />
                                    </span>
                                    <span className="menu-text">Pelatihan</span>
                                    <i className="menu-arrow"></i>
                                </a>
                                <div className="menu-submenu">
                                    <i className="menu-arrow"></i>
                                    <ul className="menu-subnav">
                                        <li className="menu-item menu-item-parent" aria-haspopup="true">
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

                            <li className="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
                                <a href="javascript:;" className="menu-link menu-toggle">
                                    <span className="svg-icon menu-icon">
                                        <Image alt='icon-sidebar-picture' src='/assets/icon/picture.svg' width={24} height={24} />
                                    </span>
                                    <span className="menu-text">Publikasi</span>
                                    <i className="menu-arrow"></i>
                                </a>
                                <div className="menu-submenu">
                                    <i className="menu-arrow"></i>
                                    <ul className="menu-subnav">
                                        <li className={router.pathname == "/publikasi" ? "menu-item menu-item-parent menu-item-active" : "menu-item menu-item-parent"} aria-haspopup="true">
                                            <span className="menu-link">
                                                <span className="menu-text">Publikasi</span>
                                            </span>
                                        </li>
                                        <li className={router.pathname == "/publikasi/artikel" ? "menu-item menu-item-active" : "menu-item"} aria-haspopup="true">
                                            <Link href='/publikasi/artikel'>
                                                <a className="menu-link">
                                                    <span className="menu-text">Artikel</span>
                                                </a>
                                            </Link>
                                        </li>
                                        <li className={router.pathname == "/publikasi/artikel-peserta" ? "menu-item menu-item-active" : "menu-item"} aria-haspopup="true">
                                            <Link href='/publikasi/artikel-peserta'>
                                                <a className="menu-link">
                                                    <span className="menu-text">Artikel Peserta</span>
                                                </a>
                                            </Link>
                                        </li>
                                        <li className={router.pathname == "/publikasi/artikel-berita" ? "menu-item menu-item-active" : "menu-item"} aria-haspopup="true">
                                            <Link href='/publikasi/berita'>
                                                <a className="menu-link">
                                                    <span className="menu-text">Berita</span>
                                                </a>
                                            </Link>
                                        </li>
                                        <li className={router.pathname == "/publikasi/vidio" ? "menu-item menu-item-active" : "menu-item"} aria-haspopup="true">
                                            <Link href='/publikasi/vidio'>
                                                <a className="menu-link">
                                                    <span className="menu-text">Vidio</span>
                                                </a>
                                            </Link>
                                        </li>
                                        <li className={router.pathname == "/publikasi/galeri" ? "menu-item menu-item-active" : "menu-item"} aria-haspopup="true">
                                            <Link href='/publikasi/galeri'>
                                                <a className="menu-link">
                                                    <span className="menu-text">Galeri</span>
                                                </a>
                                            </Link>
                                        </li>

                                        <li className={router.pathname == "/publikasi/kategori" ? "menu-item menu-item-active" : "menu-item"} aria-haspopup="true">
                                            <Link href='/publikasi/kategori'>
                                                <a className="menu-link">
                                                    <span className="menu-text">Kategori</span>
                                                </a>
                                            </Link>
                                        </li>

                                        <li className={router.pathname == "/publikasi/faq" ? "menu-item menu-item-active" : "menu-item"} aria-haspopup="true">
                                            <Link href='/publikasi/faq'>
                                                <a className="menu-link">
                                                    <span className="menu-text">FAQ</span>
                                                </a>
                                            </Link>
                                        </li>

                                        <li className={router.pathname == "/publikasi/imagetron" ? "menu-item menu-item-active" : "menu-item"} aria-haspopup="true">
                                            <Link href='/publikasi/imagetron'>
                                                <a className="menu-link">
                                                    <span className="menu-text">Imagetron</span>
                                                </a>
                                            </Link>
                                        </li>

                                        <li class="menu-item menu-item-submenu" aria-haspopup="true"
                                            data-menu-toggle="hover">
                                            <a href="javascript:;" class="menu-link menu-toggle">
                                                <span class="menu-text">Managemen Admin</span>
                                                <i class="menu-arrow"></i>
                                            </a>
                                            <div class="menu-submenu">
                                                <i class="menu-arrow"></i>
                                                <ul class="menu-subnav">
                                                    <li class="menu-item" aria-haspopup="true">
                                                        <Link href='/publikasi/managemen-admin/role'>
                                                            <a class="menu-link">
                                                                {/* <i class="menu-bullet menu-bullet-dot">
                                                                <span></span>
                                                            </i> */}
                                                                <span class="menu-text">List Role</span>
                                                            </a>
                                                        </Link>
                                                    </li>
                                                    <li class="menu-item" aria-haspopup="true">
                                                        <Link href='/publikasi/managemen-admin/admin'>
                                                            <a class="menu-link">
                                                                {/* <i class="menu-bullet menu-bullet-dot">
                                                                <span></span>
                                                            </i> */}
                                                                <span class="menu-text">List Admin</span>
                                                            </a>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                            </li>

                            <li className="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
                                <a href="javascript:;" className="menu-link menu-toggle">
                                    <span className="svg-icon menu-icon">
                                        <Image alt='icon-sidebar-orang' src='/assets/icon/orang.svg' width={24} height={24} />
                                    </span>
                                    <span className="menu-text">Partnership</span>
                                    <i className="menu-arrow"></i>
                                </a>
                                <div className="menu-submenu">
                                    <i className="menu-arrow"></i>
                                    <ul className="menu-subnav">
                                        <li className="menu-item menu-item-parent" aria-haspopup="true">
                                            <span className="menu-link">
                                                <span className="menu-text">Partnership</span>
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

                            <li className="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
                                <a href="javascript:;" className="menu-link menu-toggle">
                                    <span className="svg-icon menu-icon">
                                        <Image alt='icon-sidebar-document' src='/assets/icon/document.svg' width={24} height={24} />
                                    </span>
                                    <span className="menu-text">Sertifikat</span>
                                    <i className="menu-arrow"></i>
                                </a>
                                <div className="menu-submenu">
                                    <i className="menu-arrow"></i>
                                    <ul className="menu-subnav">
                                        <li className="menu-item menu-item-parent" aria-haspopup="true">
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

                            <li className="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
                                <a href="javascript:;" className="menu-link menu-toggle">
                                    <span className="svg-icon menu-icon">
                                        <Image alt='icon-sidebar-kotak-kotak' src='/assets/icon/kotak-kotak.svg' width={24} height={24} />
                                    </span>
                                    <span className="menu-text">Subvit</span>
                                    <i className="menu-arrow"></i>
                                </a>
                                <div className="menu-submenu">
                                    <i className="menu-arrow"></i>
                                    <ul className="menu-subnav">
                                        <li className="menu-item menu-item-parent" aria-haspopup="true">
                                            <span className="menu-link">
                                                <span className="menu-text">Subvit</span>
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

                            <li className="menu-item menu-item-submenu" aria-haspopup="true" data-menu-toggle="hover">
                                <a href="javascript:;" className="menu-link menu-toggle">
                                    <span className="svg-icon menu-icon">
                                        <Image alt='icon-sidebar-perisai' src='/assets/icon/perisai.svg' width={24} height={24} />
                                    </span>
                                    <span className="menu-text">Site Management</span>
                                    <i className="menu-arrow"></i>
                                </a>
                                <div className="menu-submenu">
                                    <i className="menu-arrow"></i>
                                    <ul className="menu-subnav">
                                        <li className="menu-item menu-item-parent" aria-haspopup="true">
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

                        </ul>
                        {/* <!--end::Menu Nav--> */}
                    </div>
                    {/* <!--end::Menu Container--> */}
                </div>
                {/* <!--end::Aside Menu--> */}
            </div>
            {/* <!--end::Aside--> */}
        </>
    )
}

export default Sidebar