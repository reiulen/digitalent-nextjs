import React from "react";

import Head from "next/head";
import dynamic from "next/dynamic";

import { signOut } from "next-auth/client";

// import Sidebar from "./sidebar.component";
// import Header from "./header.component";
// import HeaderMobile from "./header-mobile.component";

const Sidebar = dynamic(() => import("./sidebar.component"), {
  suspense: true,
});
const Header = dynamic(() => import("./header.component"), {
  suspense: true,
});
const HeaderMobile = dynamic(() => import("./header-mobile.component"), {
  suspense: true,
});
// Content
// import SubHeader from "./subheader.component";
const SubHeader = dynamic(() => import("./subheader.component"), {
  suspense: true,
});
// Wrapper
// import ContentWrapper from "../wrapper/content.wrapper";
const ContentWrapper = dynamic(() => import("../wrapper/content.wrapper"), {
  suspense: true,
});

import Footer from "./footer.component";

const Layout = ({ children, title = "Dashboard" }) => {
  const handlerLogout = () => {
    signOut();
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <HeaderMobile />
      <div div className="d-flex flex-row flex-column-fluid page">
        <Sidebar />
        <div
          className="d-flex flex-column flex-row-fluid wrapper"
          id="kt_wrapper"
        >
          <Header />
          <ContentWrapper>
            <SubHeader />
            {children}
          </ContentWrapper>
          {/* <Footer /> */}
        </div>
      </div>

      <div id="kt_quick_user" className="offcanvas offcanvas-right p-10">
        <div className="offcanvas-header d-flex align-items-center justify-content-between pb-5">
          <h3 className="font-weight-bold m-0">User Profile</h3>
          <a
            href="#"
            className="btn btn-xs btn-icon btn-light btn-hover-primary"
            id="kt_quick_user_close"
          >
            <i className="ki ki-close icon-xs text-muted"></i>
          </a>
        </div>

        <div className="offcanvas-content pr-5 mr-n5">
          <div className="d-flex align-items-center mt-5">
            <div className="symbol symbol-100 mr-5">
              <div
                className="symbol-label"
                style={{ backgroundImage: 'url("/assets/media/default.jpg")' }}
              ></div>
              <i className="symbol-badge bg-success"></i>
            </div>
            <div className="d-flex flex-column">
              <a
                href="#"
                className="font-weight-bold font-size-h5 text-dark-75 text-hover-primary"
              >
                Dendy Juliano
              </a>
              <div className="text-muted mt-1">Admin Kominpo</div>
              <div className="navi mt-2">
                <a href="#" className="navi-item">
                  <span className="navi-link p-0 pb-2">
                    <span className="navi-icon mr-1">
                      <span className="svg-icon svg-icon-lg svg-icon-primary"></span>
                    </span>
                    <span className="navi-text text-muted text-hover-primary">
                      dendy@gmail.com
                    </span>
                  </span>
                </a>
                <button
                  type="button"
                  className="btn btn-sm btn-light-primary font-weight-bolder py-2 px-5"
                  onClick={handlerLogout}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          <div className="separator separator-dashed mt-8 mb-5"></div>
        </div>
      </div>

      <div id="kt_scrolltop" className="scrolltop">
        <span className="svg-icon">
          <i className="flaticon2-up"></i>
        </span>
      </div>
    </>
  );
};

export default Layout;
