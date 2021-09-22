import React, { useState, useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'
import Head from "next/head";
import dynamic from "next/dynamic";

import { signOut } from "next-auth/client";
import { fetchReducerFunc } from '../../redux/actions/utils/functionals.actions'
import {IS_SHOW_PROFILE,IS_OVERLAY_PROFILE} from '../../redux/types/utils/functionals.type'

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
  const allFunctionls = useSelector(state => state.allFunctionls)
  // console.log("layout page",allFunctionls)
  const handlerLogout = () => {
    signOut();
  };

  // const sessionStorages = sessionStorage.getItem('isOverlayProfile')

  // const [isProfile, setIsProfile] = useState("");
  // const [isOverlayProfile, setIsOverlayProfile] = useState("");

  const activeProfileAndOverlay = () =>{
    dispatch({
        type: IS_SHOW_PROFILE,
      });
      dispatch({
        type: IS_OVERLAY_PROFILE,
      });
  }

  // useEffect(() => {

  //     // dispatch(fetchReducerFunc())
   
  // }, [allFunctionls.isOverlayProfile,allFunctionls.isProfile])


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
      {/* offcanvas-on */}
      {/* <div class="offcanvas-overlay"></div> */}
      {/* <div id="kt_quick_user" className="offcanvas offcanvas-right p-10"> */}
        <div id="kt_quick_user" className={`offcanvas offcanvas-right p-10 ${allFunctionls.isOverlayProfile && allFunctionls.isOverlayProfile ?"offcanvas-on":""}`}>
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

    {allFunctionls.isOverlayProfile && allFunctionls.isOverlayProfile ?
       <div className="offcanvas-overlay" onClick={() => activeProfileAndOverlay()}></div> :""
    }




      

      <div id="kt_scrolltop" className="scrolltop">
        <span className="svg-icon">
          <i className="flaticon2-up"></i>
        </span>
      </div>
    </>
  );
};

export default Layout;
