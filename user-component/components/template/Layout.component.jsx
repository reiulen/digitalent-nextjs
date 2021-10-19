import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";

const Navbar = dynamic(() =>
  import("../../../user-component/components/template/Navbar.component")
);
const Header = dynamic(() =>
  import("../../../user-component/components/template/Header.component")
);
const Sidebar = dynamic(() =>
  import("../../../user-component/components/template/Sidebar.component")
);

const Layout = ({ title = "Peserta - Pelatihan", session, children }) => {
  const router = useRouter();
  let routerPath;
  if (router.pathname.includes("form-pendaftaran"))
    routerPath = "form-pendaftaran";
  if (router.pathname.includes("substansi")) routerPath = "substansi";
  if (router.pathname.includes("trivia")) routerPath = "trivia";
  if (router.pathname.includes("survey")) routerPath = "survey";

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
      <div className="container-fluid py-5">
        <Row>
          <Col md={3}>
            {!router.pathname.includes(routerPath) && <Sidebar />}
          </Col>
          {children}
        </Row>
      </div>
    </>
  );
};

export default Layout;
