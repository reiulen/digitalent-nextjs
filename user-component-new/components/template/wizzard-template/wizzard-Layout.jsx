import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import LoadingSidebar from "../../content/peserta/components/loader/LoadingSidebar";
import LoadingHeader from "../../content/peserta/components/loader/LoadingHeader";
import LoadingNavbar from "../../content/peserta/components/loader/LoadingNavbar";
import LoadingFooter from "../../content/peserta/components/loader/LoadingFooter";

const Navbar = dynamic(() => import("../template/Navbar.component"), {
  loading: function loadingNow() {
    return <LoadingNavbar />;
  },
  ssr: false,
});
const Header = dynamic(() => import("./Header-Wizzard.component"), {
  loading: function loadingNow() {
    return <LoadingHeader />;
  },
  ssr: false,
});
const Sidebar = dynamic(() => import("../template/Sidebar.component"), {
  loading: function loadingNow() {
    return <LoadingSidebar />;
  },
  ssr: false,
});
const Footer = dynamic(() => import("../beranda/footer"), {
  loading: function loadingNow() {
    return <LoadingFooter />;
  },
  ssr: false,
});

const Layout = ({ title = "Peserta - Pelatihan", session, children }) => {
  const router = useRouter();
  let routerPath;
  if (router.pathname.includes("form-pendaftaran"))
    routerPath = "form-pendaftaran";
  if (router.pathname === "/peserta/subvit/substansi/[id]")
    routerPath = "/peserta/subvit/substansi/[id]";
  if (router.pathname === "/peserta/survey/substansi/[id]")
    routerPath = "/peserta/survey/substansi/[id]";
  if (router.pathname === "/peserta/trivia/substansi/[id]")
    routerPath = "/peserta/trivia/substansi/[id]";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0,width=device-width" />
      </Head>
      <Navbar session={session} />
      <Header session={session} />
      <ToastContainer position="top-right" />
      {children}
      {!router.pathname.includes(routerPath) && <Footer />}
    </>
  );
};

export default Layout;
