import React from "react";
import Image from "next/image";

const HeaderMobile = () => {
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
            width={10}
            height={10}
            src="/assets/media/logos/logo-dark.png"
          />
        </a>
        {/* <!--end::Logo--> */}
        {/* <!--begin::Toolbar--> */}
        <div className="d-flex align-items-center">
          {/* <!--begin::Aside Mobile Toggle--> */}
          <button
            className="btn p-0 burger-icon burger-icon-left"
            id="kt_aside_mobile_toggle"
          >
            <span></span>
          </button>
          {/* <!--end::Aside Mobile Toggle--> */}
          {/* <!--begin::Header Menu Mobile Toggle--> */}
          <button
            className="btn p-0 burger-icon ml-4"
            id="kt_header_mobile_toggle"
          >
            <span></span>
          </button>
          {/* <!--end::Header Menu Mobile Toggle--> */}
          {/* <!--begin::Topbar Mobile Toggle--> */}
          <button
            className="btn btn-hover-text-primary p-0 ml-2"
            id="kt_header_mobile_topbar_toggle"
          >
            <span className="svg-icon svg-icon-xl">
              {/* <!--begin::Svg Icon | path:assets/media/svg/icons/General/User.svg--> */}
              {/* <!--end::Svg Icon--> */}
            </span>
          </button>
          {/* <!--end::Topbar Mobile Toggle--> */}
        </div>
        {/* <!--end::Toolbar--> */}
      </div>
      {/* <!--end::Header Mobile--> */}
    </>
  );
};

export default HeaderMobile;
