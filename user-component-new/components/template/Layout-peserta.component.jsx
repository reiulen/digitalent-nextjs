import React, { useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { Row, Col, Offcanvas, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import LoadingSidebar from "../loader/LoadingSidebar";
import LoadingHeader from "../loader/LoadingHeader";
import LoadingNavbar from "../loader/LoadingNavbar";
import LoadingFooter from "../loader/LoadingFooter";

const Navbar = dynamic(() => import("./Navbar.component"), {
  loading: function loadingNow() {
    return <LoadingNavbar />;
  },
  ssr: false,
});
const Header = dynamic(() => import("./Header.component"), {
  loading: function loadingNow() {
    return <LoadingHeader />;
  },
  ssr: false,
});

const Sidebar = dynamic(
  () => import("../../../user-component/components/template/Sidebar.component"),
  {
    loading: function loadingNow() {
      return <LoadingSidebar />;
    },
    ssr: false,
  }
);
const Footer = dynamic(() => import("./Footer.component"), {
  loading: function loadingNow() {
    return <LoadingFooter />;
  },
  ssr: false,
});

const HeaderWizzard = dynamic(
  () => import("./wizzard-template/Header-Wizzard.component"),
  {
    loading: function loadingNow() {
      return <LoadingHeader />;
    },
    ssr: false,
  }
);
const Layout = ({ title = "Peserta - Pelatihan", session, children }) => {
  const router = useRouter();
  let routerPath;
  if (router.pathname.includes("form-pendaftaran"))
    routerPath = "form-pendaftaran";
  if (router.pathname === "/peserta/subvit/substansi/[id]")
    routerPath = "/peserta/subvit/substansi/[id]";
  if (router.pathname === "/peserta/subvit/survey/[id]")
    routerPath = "/peserta/subvit/survey/[id]";
  if (router.pathname === "/peserta/subvit/trivia/[id]")
    routerPath = "/peserta/subvit/trivia/[id]";
  if (router.pathname === "/peserta/subvit/mid-test/[id]")
    routerPath = "/peserta/subvit/mid-test/[id]";
  if (router.pathname === "/peserta/subvit/survey/[id]")
    routerPath = "/peserta/subvit/survey/[id]";
  if (router.pathname === "/peserta/form-lpj") routerPath = "/peserta/form-lpj";
  if (router.pathname == "/peserta/wizzard") routerPath = "/peserta/wizzard";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0,width=device-width" />
      </Head>
      <Navbar session={session} />
      {routerPath == "/peserta/wizzard" ? (
        <HeaderWizzard session={session} />
      ) : (
        <Header session={session} />
      )}
      <ToastContainer position="top-right" />
      <div className="container-fluid py-5">
        <Row>
          <Col md={3}>
            {!router.pathname.includes(routerPath) && (
              <Sidebar screenClass={"d-none d-lg-block"} titleAkun={"AKUN"} />
            )}
          </Col>
          {children}
        </Row>
      </div>
      {!router.pathname.includes(routerPath) && <Footer />}
    </>
  );
};

export default Layout;
