import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Breadcrumb } from "react-bootstrap";
// import { Offcanvas } from "react-bootstrap";

const Header = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState(null);

  const convertBreadcrumb = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split("/");
      linkPath.slice(0, 1);
      // linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: "/" + linkPath.slice(0, i + 1).join("/"),
        };
      });

      console.log(pathArray);
      setBreadcrumbs(pathArray);
    }
  }, [router]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      {console.log(breadcrumbs)}
      {/* <!--begin::Header--> */}
      <div id="kt_header" className="header header-fixed">
        {/* <!--begin::Container--> */}
        <div className="container-fluid d-flex align-items-stretch justify-content-between">
          {/* <!--begin::Header Menu Wrapper--> */}
          <div
            className="header-menu-wrapper header-menu-wrapper-left"
            id="kt_header_menu_wrapper"
          >
            {/* <!--begin::Header Menu--> */}
            <div
              id="kt_header_menu"
              className="header-menu header-menu-mobile header-menu-layout-default"
            >
              {/* <!--begin::Header Nav--> */}
              <ul className="menu-nav">
                <li
                  className="menu-item menu-item-submenu menu-item-rel menu-item-active"
                  data-menu-toggle="click"
                  aria-haspopup="true"
                >
                  <a href="javascript:;" className="menu-link menu-toggle">
                    {/* <span className="menu-text">Dashboard</span> */}
                    {breadcrumbs ? (
                      <span className="menu-text">
                        {convertBreadcrumb(breadcrumbs[1].breadcrumb)}
                      </span>
                    ) : (
                      <span className="menu-text">Dashboard</span>
                    )}
                    <i className="menu-arrow"></i>
                  </a>
                </li>
              </ul>
              {/* <!--end::Header Nav--> */}
            </div>
            {/* <!--end::Header Menu--> */}
          </div>
          {/* <!--end::Header Menu Wrapper--> */}
          {/* <!--begin::Topbar--> */}
          <div className="topbar">
            {/* <!--begin::User--> */}
            <div className="topbar-item">
              <div
                className="btn btn-icon btn-icon-mobile w-auto btn-clean d-flex align-items-center btn-lg px-2"
                // id="kt_quick_user_toggle"
                onClick={handleShow}
              >
                <span className="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1">
                  Hi,
                </span>
                <span className="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3">
                  Dendy
                </span>
                <span className="symbol symbol-lg-35 symbol-25 symbol-light-success">
                  <span className="symbol-label font-size-h5 font-weight-bold">
                    D
                  </span>
                </span>
              </div>
            </div>
            {/* <!--end::User--> */}
          </div>
          {/* <!--end::Topbar--> */}
        </div>
        {/* <!--end::Container--> */}
      </div>
      {/* <!--end::Header--> */}
    </>
  );
};

export default Header;
