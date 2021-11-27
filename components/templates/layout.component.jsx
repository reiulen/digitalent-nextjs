import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import dynamic from "next/dynamic";
import { wrapper } from "../../redux/store";
import Image from "next/image";

import { signOut, getSession } from "next-auth/client";
import { fetchReducerFunc } from "../../redux/actions/utils/functionals.actions";
import { ToastContainer } from "react-toastify";
import {
  IS_SHOW_PROFILE,
  IS_OVERLAY_PROFILE,
} from "../../redux/types/utils/functionals.type";

// import Sidebar from "./sidebar.component";
// import Header from "./header.component";
// import HeaderMobile from "./header-mobile.component";

const Sidebar = dynamic(() => import("./sidebar.component"), {
  ssr: false,
});
const Header = dynamic(() => import("./header.component"), {
  ssr: false,
});
const HeaderMobile = dynamic(() => import("./header-mobile.component"), {
  ssr: false,
});
// Content
// import SubHeader from "./subheader.component";
const SubHeader = dynamic(() => import("./subheader.component"), {
  ssr: false,
});
// Wrapper
// import ContentWrapper from "../wrapper/content.wrapper";
const ContentWrapper = dynamic(() => import("../wrapper/content.wrapper"), {
  ssr: false,
});

import Footer from "./footer.component";

const Layout = ({ children, title = "Dashboard" }) => {
  const dispatch = useDispatch();
  const allFunctionls = useSelector((state) => state.allFunctionls);
  const [user, setUser] = useState();
  const [session, setSession] = useState();
  const [sideBar, setSidebar] = useState([])
  const handlerLogout = () => {
    signOut();
    // {
    //   callbackUrl: `${window.location.origin}/login/admin`,
    // } LAGI DEVELOP JANGAN DIHAPUS
  };

  const activeProfileAndOverlay = () => {
    dispatch({
      type: IS_SHOW_PROFILE,
    });
    dispatch({
      type: IS_OVERLAY_PROFILE,
    });
  };
  useEffect(() => {
    getSession().then((session) => {
      setUser(session.user.user.data.user);
      setSession(session);
      
    });
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <HeaderMobile />
      <div className="d-flex flex-row flex-column-fluid page">
        <Sidebar session={session} />
        <div
          className="d-flex flex-column flex-row-fluid wrapper"
          id="kt_wrapper"
        >
          <Header />
          <ContentWrapper>
            <ToastContainer position="top-right" />
            <SubHeader />
            {children}
          </ContentWrapper>
          {/* <Footer /> */}
        </div>
      </div>{" "}
      <div
        id="kt_quick_user"
        className={`offcanvas offcanvas-right p-10 ${
          allFunctionls.isOverlayProfile && allFunctionls.isOverlayProfile
            ? "offcanvas-on"
            : ""
        }`}
      >
        <div className="offcanvas-header d-flex align-items-center justify-content-between pb-5">
          <h3 className="font-weight-bold m-0">User Profile</h3>
          <a
            href="#"
            className="btn btn-xs btn-icon btn-light btn-hover-primary"
            id="kt_quick_user_close"
            onClick={() => activeProfileAndOverlay()}
          >
            <i className="ki ki-close icon-xs text-muted"></i>
          </a>
        </div>

        <div className="offcanvas-content pr-5 mr-n5">
          <div className="d-flex align-items-center mt-5">
            <div className="symbol symbol-100 mr-5">
              <div
                className="symbol-label"
              >
                <Image
                  src={
                    user && user.mitra_profile?
                      process.env.END_POINT_API_IMAGE_PARTNERSHIP + user.mitra_profile.agency_logo
                    :
                      "/assets/media/default.jpg"
                  }
                  width={70}
                  height={70}
                  objectFit="cover"
                />
                
              </div>
              <i className="symbol-badge bg-success"></i>
            </div>
            <div className="d-flex flex-column">
              <a
                href="#"
                className="font-weight-bold font-size-h5 text-dark-75 text-hover-primary"
              >
                {(user && user.name) || ""}
              </a>
              <div className="text-muted mt-1">
                {
                  user && user.mitra_profile ?
                    "Mitra"
                  :
                    "Admin"
                }
              </div>
              <div className="navi mt-2">
                <a href="#" className="navi-item">
                  <span className="navi-link p-0 pb-2">
                    {/* <span className="navi-icon mr-1">
                      <span className="svg-icon svg-icon-lg svg-icon-primary"></span>
                    </span> */}
                    <span className="navi-text text-muted text-hover-primary">
                      {(user && user.email) || ""}
                    </span>
                  </span>
                </a>
                <button
                  type="button"
                  className="btn btn-sm btn-light-primary font-weight-bolder py-2 px-5"
                  onClick={handlerLogout}
                >
                  Keluar
                </button>
              </div>
            </div>
          </div>

          <div className="separator separator-dashed mt-8 mb-5"></div>
        </div>
      </div>
      {allFunctionls.isOverlayProfile && allFunctionls.isOverlayProfile ? (
        <div
          className="offcanvas-overlay"
          onClick={() => activeProfileAndOverlay()}
        ></div>
      ) : (
        ""
      )}
      <div id="kt_scrolltop" className="scrolltop">
        <span className="svg-icon">
          <i className="flaticon2-up"></i>
        </span>
      </div>
    </>
  );
};

export default Layout;
