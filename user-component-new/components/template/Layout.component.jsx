import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

import LoadingNavbar from "../loader/LoadingNavbar";
import LoadingFooter from "../loader/LoadingFooter";

const NavigationBar = dynamic(() => import("./Navbar.component"), {
  loading: function loadingNow() {
    return <LoadingNavbar />;
  },
  ssr: false,
});

const Footer = dynamic(() => import("./Footer.component"), {
  loading: function loadingNow() {
    return <LoadingFooter />;
  },
  ssr: false,
});

const Layout = ({ session, children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <NavigationBar session={session} />
        <ToastContainer position="top-right" />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
