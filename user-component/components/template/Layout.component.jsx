import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

const Navbar = dynamic(() =>
  import("../../../user-component/components/template/Navbar.component")
);

const Layout = ({ title = "Peserta - Pelatihan", session, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0,width=device-width" />
      </Head>
      <Navbar session={session} />
      {children}
    </>
  );
};

export default Layout;
