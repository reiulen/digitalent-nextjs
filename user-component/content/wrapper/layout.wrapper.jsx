import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import LoadingNavbar from "../../../user-component/content/peserta/components/loader/LoadingNavbar";
import LoadingFooter from "../../../user-component/content/peserta/components/loader/LoadingFooter";
// import Navigationbar from '../../../components/templates/navbar.component';
// import Footer from "../../../components/templates/footer.component"
import "../../../styles/beranda.module.css";

const NavigationBar = dynamic(
  () => import("../../../user-component/components/template/Navbar.component"),
  {
    loading: function loadingNow() {
      return <LoadingNavbar />;
    },
    ssr: false,
  }
);

const Footer = dynamic(
  () => import("../../../user-component/components/beranda/footer"),
  {
    loading: function loadingNow() {
      return <LoadingFooter />;
    },
    ssr: false,
  }
);
const Layout = ({ children, title, session }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <NavigationBar session={session} />
      <ToastContainer position="top-right" />
      <div className="d-flex flex-column-fluid bg-white">
        <div 
          // className="container"
          style={{overflowX:"hidden"}}
        >
          {children}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Layout;
