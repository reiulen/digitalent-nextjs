import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  IS_ASSIDE_MOBILE_SIDEBAR,
  IS_OVERLAY_SIDEBAR_MOBILE,
  IS_ASSIDE_HEADER,
  IS_OVERLAY_ASSIDE_HEADER,
  IS_SHOW_PROFILE,
  IS_OVERLAY_PROFILE,
} from "../../redux/types/utils/functionals.type";
import { useDispatch, useSelector } from "react-redux";

import { getSession } from "next-auth/client";

const HeaderMobile = () => {
  const dispatch = useDispatch();
  const allFunctionls = useSelector((state) => state.allFunctionls);

  const [user, setUser] = useState();
  const activeProfileAndOverlay = () => {
    dispatch({
      type: IS_ASSIDE_MOBILE_SIDEBAR,
    });
    dispatch({
      type: IS_OVERLAY_SIDEBAR_MOBILE,
    });
  };
  const activeHeaderToSide = () => {
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
    });
  }, [getSession]);

  return (
    <>
      {/* <!--begin::Header Mobile--> */}
      <div
        id="kt_header_mobile"
        className="header-mobile align-items-center header-mobile-fixed"
      >
        {/* <!--begin::Logo--> */}
        <a href="#">
          <Image
            alt="Logo"
            width={40}
            height={40}
            src="/assets/logo/logo-6.svg"
          />
        </a>
        {/* <!--end::Logo--> */}
        {/* <!--begin::Toolbar--> */}
        <div className="d-flex align-items-center">
          {/* <!--begin::Aside Mobile Toggle--> */}
          <button
            type="button"
            className="btn p-0 burger-icon burger-icon-left"
            id="kt_aside_mobile_toggle"
            onClick={() => activeProfileAndOverlay()}
          >
            <span></span>
          </button>
          {/* <!--end::Aside Mobile Toggle--> */}
          {/* <!--begin::Header Menu Mobile Toggle--> */}
          <button
            className="btn p-0 ml-4"
            id="kt_header_mobile_toggle"
            onClick={() => activeHeaderToSide()}
          >
            <span className="symbol symbol-lg-35 symbol-25 symbol-light-success">
              <span className="symbol-label font-size-h5 font-weight-bold">
                {(user && user.name.charAt(0).toUpperCase()) || ""}
              </span>
            </span>
          </button>
          {/* <!--end::Header Menu Mobile Toggle--> */}
          {/* <!--begin::Topbar Mobile Toggle--> */}
          {/* <button
            className="btn btn-hover-text-primary p-0"
            id="kt_header_mobile_topbar_toggle"
          >
          </button> */}
          {/* <!--begin::Svg Icon | path:assets/media/svg/icons/General/User.svg--> */}
          {/* <!--end::Svg Icon--> */}
          {/* </span> */}
          {/* <!--end::Topbar Mobile Toggle--> */}
        </div>
        {/* <!--end::Toolbar--> */}
      </div>
      {/* <!--end::Header Mobile--> */}
    </>
  );
};

export default HeaderMobile;
