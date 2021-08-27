import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* please uncommented if you read this */}
          {/* <meta name="description" content="Aside light theme example" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" /> */}
          {/* please uncommented if you read this */}

          <link rel="canonical" href="https://keenthemes.com/metronic" />
          {/* <!--begin::Fonts--> */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700&display=optional"
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
            href="/assets/css/themes/layout/brand/light.css"  //dark
          />
          <link
            rel="stylesheet"
            href="/assets/css/themes/layout/aside/light.css"  //dark
          />
          {/* <link href="/assets/plugins/custom/fullcalendar/fullcalendar.bundle.css" rel="stylesheet" type="text/css" /> */}

          {/* <!--end::Layout Themes--> */}
          <link rel="shortcut icon" href="/assets/media/logos/favicon.ico" />

          <script
            type="text/javascript"
            src="/assets/plugins/global/plugins.bundle.js"
          ></script>
          <script
            type="text/javascript"
            src="/assets/js/scripts.bundle.js"
          ></script>
        </Head>
        <body className="header-fixed header-mobile-fixed subheader-enabled subheader-fixed aside-enabled aside-fixed aside-minimize-hoverable page-loading">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
