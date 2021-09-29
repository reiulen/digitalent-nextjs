import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  IS_SHOW_PROFILE,
  IS_OVERLAY_PROFILE,
  IS_ASSIDE_HEADER,
  IS_OVERLAY_ASSIDE_HEADER,
} from "../../redux/types/utils/functionals.type";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const allFunctionls = useSelector((state) => state.allFunctionls);
  // console.log("header page",allFunctionls)

  const [breadcrumbs, setBreadcrumbs] = useState(null);

  const snakeToPascal = (string) => {
    return string
      .split("/")
      .map((snake) =>
        snake
          .split("-")
          .map((substr) => substr.charAt(0).toUpperCase() + substr.slice(1))
          .join(" ")
      )
      .join("/");
  };

  const convertBreadcrumb = (string) => {
    // return string.charAt(0).toUpperCase() + string.slice(1);
    return snakeToPascal(string);
  };

  const activeProfileAndOverlay = () => {
    dispatch({
      type: IS_SHOW_PROFILE,
    });
    dispatch({
      type: IS_OVERLAY_PROFILE,
    });
  };

  const activeHeaderToSide = () => {
    dispatch({
      type: IS_ASSIDE_HEADER,
    });
    dispatch({
      type: IS_OVERLAY_ASSIDE_HEADER,
    });
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

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  return (
    <>
      {/* <!--begin::Header--> */}
      <div id="kt_header" className="header header-fixed">
        {/* <!--begin::Container--> */}
        <div className="container-fluid d-flex align-items-stretch justify-content-between">
          {/* <!--begin::Header Menu Wrapper--> */}
          <div
            className={`header-menu-wrapper header-menu-wrapper-left ${
              allFunctionls.isAsideHeader && allFunctionls.isAsideHeader
                ? "header-menu-wrapper-on"
                : ""
            }`}
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
          {allFunctionls.isAsideHeader && allFunctionls.isAsideHeader ? (
            <div
              className="header-menu-wrapper-overlay"
              onClick={() => activeHeaderToSide()}
            ></div>
          ) : (
            ""
          )}
          {/* <!--end::Header Menu Wrapper--> */}
          {/* <!--begin::Topbar--> */}
          <div className="topbar">
            {/* <div className="dropdown" id="kt_quick_search_toggle">
                            <div className="topbar-item" data-toggle="dropdown" data-offset="10px,0px">
                                <div className="btn btn-icon btn-clean btn-lg btn-dropdown mr-1">
                                    <span className="svg-icon svg-icon-xl svg-icon-primary">
                                        <Image alt='search-icon' src='/assets/icon/Search.svg' width={24} height={24} />
                                    </span>
                                </div>
                            </div>
                            <div
                                className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
                                <div className="quick-search quick-search-dropdown" id="kt_quick_search_dropdown">
                                    <form method="get" className="quick-search-form">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <span className="svg-icon svg-icon-lg">
                                                        <Image alt='search-icon' src='/assets/icon/Search.svg' width={24} height={24} />
                                                    </span>
                                                </span>
                                            </div>
                                            <input type="text" className="form-control" placeholder="Search..." />
                                            <div className="input-group-append">
                                                <span className="input-group-text">
                                                    <i className="quick-search-close ki ki-close icon-sm text-muted"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="quick-search-wrapper scroll" data-scroll="true" data-height="325"
                                        data-mobile-height="200"></div>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown">
                            <div className="topbar-item" data-toggle="dropdown" data-offset="10px,0px">
                                <div className="btn btn-icon btn-clean btn-dropdown btn-lg mr-1 pulse pulse-primary">
                                    <span className="svg-icon svg-icon-xl svg-icon-primary">
                                        <Image alt='notif-icon' src='/assets/icon/kotak-kotak.svg' width={24} height={24} />
                                    </span>
                                    <span className="pulse-ring"></span>
                                </div>
                            </div>
                            <div
                                className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg">
                                <form>
                                    <div className="d-flex flex-column pt-12 bgi-size-cover bgi-no-repeat rounded-top"
                                        style={{ backgroundImage: 'url(assets/media/misc/bg-1.jpg)' }}>
                                        <h4 className="d-flex flex-center rounded-top">
                                            <span className="text-white">User Notifications</span>
                                            <span
                                                className="btn btn-text btn-success btn-sm font-weight-bold btn-font-md ml-2">23
                                                new</span>
                                        </h4>
                                        <ul className="nav nav-bold nav-tabs nav-tabs-line nav-tabs-line-3x nav-tabs-line-transparent-white nav-tabs-line-active-border-success mt-3 px-8"
                                            role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active show" data-toggle="tab"
                                                    href="#topbar_notifications_notifications">Alerts</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="tab"
                                                    href="#topbar_notifications_events">Events</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="tab"
                                                    href="#topbar_notifications_logs">Logs</a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="tab-content">
                                        <div className="tab-pane active show p-8"
                                            id="topbar_notifications_notifications" role="tabpanel">
                                            <div className="scroll pr-7 mr-n7" data-scroll="true" data-height="300"
                                                data-mobile-height="200">
                                                <div className="d-flex align-items-center mb-6">
                                                    <div className="symbol symbol-40 symbol-light-primary mr-5">
                                                        <span className="symbol-label">
                                                            <span className="svg-icon svg-icon-lg svg-icon-primary">
                                                                <rect x="0" y="0" width="24" height="24" />
                                                                <rect fill="#000000" opacity="0.3"
                                                                    transform="translate(17.825568, 11.945519) rotate(-19.000000) translate(-17.825568, -11.945519)"
                                                                    x="16.3255682" y="2.94551858" width="3"
                                                                    height="18" rx="1" />
                                                            </span>
                                                        </span>
                                                    </div>
                                                    <div className="d-flex flex-column font-weight-bold">
                                                        <a href="#"
                                                            className="text-dark text-hover-primary mb-1 font-size-lg">Cool
                                                            App</a>
                                                        <span className="text-muted">Marketing campaign planning</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-center pt-7">
                                                <a href="#"
                                                    className="btn btn-light-primary font-weight-bold text-center">See
                                                    All</a>
                                            </div>
                                        </div>

                                        <div className="tab-pane" id="topbar_notifications_events" role="tabpanel">
                                            <div className="navi navi-hover scroll my-4" data-scroll="true"
                                                data-height="300" data-mobile-height="200">
                                                <a href="#" className="navi-item">
                                                    <div className="navi-link">
                                                        <div className="navi-icon mr-2">
                                                            <i className="flaticon2-line-chart text-success"></i>
                                                        </div>
                                                        <div className="navi-text">
                                                            <div className="font-weight-bold">New report has been
                                                                received</div>
                                                            <div className="text-muted">23 hrs ago</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="tab-pane" id="topbar_notifications_logs" role="tabpanel">
                                            <div className="d-flex flex-center text-center text-muted min-h-200px">All
                                                caught up!
                                                <br />No new notifications.
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="dropdown">
                            <div className="topbar-item" data-toggle="dropdown" data-offset="10px,0px">
                                <div className="btn btn-icon btn-clean btn-dropdown btn-lg mr-1">
                                    <Image width={20} height={20} className="h-20px w-20px rounded-sm"
                                        src="/assets/media/svg/flags/226-united-states.svg" alt="us" />
                                </div>
                            </div>
                            <div
                                className="dropdown-menu p-0 m-0 dropdown-menu-anim-up dropdown-menu-sm dropdown-menu-right">
                                <ul className="navi navi-hover py-4">
                                    <li className="navi-item">
                                        <a href="#" className="navi-link">
                                            <span className="symbol symbol-20 mr-3">
                                                <Image width={20} height={20} src="/assets/media/svg/flags/226-united-states.svg" alt="english" />
                                            </span>
                                            <span className="navi-text">English</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div> */}

            {/* <!--begin::User--> */}
            <div
              className="topbar-item"
              onClick={() => activeProfileAndOverlay()}
            >
              <div
                className="btn btn-icon btn-icon-mobile w-auto btn-clean d-flex align-items-center btn-lg px-2"
                id="kt_quick_user_toggle"
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
