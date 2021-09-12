import React from "react";
import Head from "next/head";
import Sidebar from "../Sidebars";
import Header from "../Headers";
import HeaderMobile from "../Headers/mobile";
import SubHeader from "../Headers/sub-header";
export default function Layout({ children, pageTitle }) {
  return (
    <div className="d-flex flex-column flex-root">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Main content" />
      </Head>
      <HeaderMobile />
      <div className="d-flex flex-row flex-column-fluid page">
        <Sidebar />

        <div
          className="d-flex flex-column flex-row-fluid wrapper"
          id="kt_wrapper"
        >
          <Header />
          {/* start page-wrapper component */}
          <div
            className="content d-flex flex-column flex-column-fluid"
            id="kt_content"
          >
            <SubHeader />
            <div className="container">
              <div className="row">{children}</div>
            </div>
          </div>
          {/* end page-wrapper component */}
        </div>
      </div>
    </div>
  );
}
