import Document, { Html, Head, Main, NextScript } from "next/document";
import { useDispatch, useSelector } from "react-redux";
import Script from "next/script";
import { IS_MINIMIZE_SIDEBAR } from "../redux/actions/utils/functionals.actions";
import { connect } from "react-redux";
import React from "react";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html>
        <Head>
          {/* <meta  httpEquiv="X-Frame-Options" content="sameorigin"></meta> */}
          {/* please uncommented if you read this */}
          {/* <meta name="description" content="Aside light theme example" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" /> */}
          {/* please uncommented if you read this */}
          {/* <link rel="canonical" href="https://keenthemes.com/metronic" /> */}
          <link rel="canonical" href={`${process.env.PATH_URL}`} />
          {/* <!--begin::Fonts--> */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700&display=swap"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Rubik&display=swap"
            rel="stylesheet"
          />
          {/* <!--end::Fonts--> */}

          {/* <!--begin::Global Theme Styles(used by all pages)--> */}
          <link
            rel="stylesheet"
            href="/assets/plugins/global/plugins.bundle.css"
          />
          <link rel="stylesheet" href="/assets/css/style.bundle.css" />
          {/* <!--end::Global Theme Styles--> */}
          {/* <!--begin::Layout Themes(used by all pages)--> */}
          <link
            rel="stylesheet"
            href="/assets/css/themes/layout/header/base/light.css"
          />
          <link
            rel="stylesheet"
            href="/assets/css/themes/layout/header/menu/light.css"
          />
          <link
            rel="stylesheet"
            href="/assets/css/themes/layout/brand/dark.css" //dark
          />
          <link
            rel="stylesheet"
            href="/assets/css/themes/layout/aside/dark.css" //dark
          />

          {/* <!--end::Layout Themes--> */}
          <link rel="shortcut icon" href="/assets/icon/mainlogo.svg" />

          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
            integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
            crossOrigin="true"
          />
          <script
            src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
            integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
            crossOrigin="true"
          ></script>

          <script
            type="text/javascript"
            src="/assets/plugins/global/plugins.bundle.min.js"
          ></script>
          <script
            type="text/javascript"
            src="/assets/js/scripts2.bundle.min.js"
          ></script>
        </Head>
        <body
          className={`header-fixed header-mobile-fixed subheader-enabled subheader-fixed aside-enabled aside-fixed aside-minimize-hoverable page-loading
          `}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
