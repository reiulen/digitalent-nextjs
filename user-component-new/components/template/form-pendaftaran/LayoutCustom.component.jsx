import React, { useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { Row, Col, Offcanvas, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import LoadingSidebar from "../../../../user-component/content/peserta/components/loader/LoadingSidebar";
import LoadingHeader from "../../../../user-component/content/peserta/components/loader/LoadingHeader";
import LoadingNavbar from "../../../../user-component/content/peserta/components/loader/LoadingNavbar";
import LoadingFooter from "../../../../user-component/content/peserta/components/loader/LoadingFooter";

const Navbar = dynamic(
  () =>
    import("../../../../user-component/components/template/Navbar2.component"),
  {
    loading: function loadingNow() {
      return <LoadingNavbar />;
    },
    ssr: false,
  }
);
const Header = dynamic(() => import("./HeaderCustom.component"), {
  loading: function loadingNow() {
    return <LoadingHeader />;
  },
  ssr: false,
});
const Sidebar = dynamic(
  () =>
    import("../../../../user-component/components/template/Sidebar.component"),
  {
    loading: function loadingNow() {
      return <LoadingSidebar />;
    },
    ssr: false,
  }
);
const Footer = dynamic(
  () => import("../../../../user-component/components/beranda/footer"),
  {
    loading: function loadingNow() {
      return <LoadingFooter />;
    },
    ssr: false,
  }
);

const Layout = ({
  title = "Peserta - Pelatihan",
  session,
  breadcrumb,
  children,
}) => {
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
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0,width=device-width" />
      </Head>
      <Navbar session={session} />
      <Header session={session} breadcrumb={breadcrumb} />
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
