import "@splidejs/splide/dist/css/splide.min.css";
import "../styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";
import "remixicon/fonts/remixicon.css";
import "react-toastify/dist/ReactToastify.css";
import "react-image-crop/dist/ReactCrop.css";
import "react-phone-input-2/lib/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; //NEW
import "../styles/sitemanagement/pelatihan.css";
import "../styles/peserta/dashboards.css";
import "../styles/progresBar.css";
import "../styles/styleCustomUtilities.css";
import "../styles/dashboard.module.css";
import "../components/Table/tableStyle.css";
import "../components/content/sertifikat/style.css";
import "../styles/sitemanagement/pelatihan.css";
import "../styles/peserta/dashboards.css";
// import "../styles/peserta/galeri.module.css"
import "../styles/homepage/landingpage.css";
import React, { useState, useEffect } from "react";
import "../styles/dashboard/style.css";
import SimpleReactValidator from "simple-react-validator";
import { wrapper } from "../redux/store";
import moment from "moment";
import "moment/locale/id";
import { useDispatch, useSelector } from "react-redux";
import { getSidebar } from "../redux/actions/site-management/role.actions";
import { useRouter } from "next/router";
import Layout from "../components/templates/layout.component";
import { getFirebaseToken } from "../messaging_get_token";
import Maintenance from "./maintenance";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  SimpleReactValidator.addLocale("id", {
    accepted: ":attribute harus diterima.",
    after: ":attribute harus lebih dari :date.",
    after_or_equal: ":attribute harus lebih dari atau sama dengan :date.",
    alpha: ":attribute hanya boleh berisikan teks.",
    alpha_space: ":attribute hanya boleh berisikan teks dan spasi.",
    alpha_num: ":attribute hanya boleh berisikan teks dan angka.",
    alpha_num_space: ":attribute hanya boleh berisikan teks, angka, dan spasi.",
    alpha_num_dash:
      ":attribute hanya boleh berisikan teks, angka, dan garis datar.",
    alpha_num_dash_space:
      ":attribute hanya boleh berisikan teks, angka, garis datar dan spasi.",
    array: ":attribute harus berupa array.",
    before: ":attribute harus kurang dari :date.",
    before_or_equal: ":attribute harus kurang dari atau sama dengan :date.",
    between: ":attribute harus diantara :min dan :max:type.",
    boolean: ":attribute harus berupa boolean.",
    card_exp:
      ":attribute harus berupa tanggal expire yang valid valid expiration date.",
    card_num: ":attribute harus berupa nomor kartu kredit.",
    currency: ":attribute harus berupa mata uang yang valid.",
    date: ":attribute harus berupa tanggal.",
    date_equals: ":attribute harus sama dengan :date.",
    email: ":attribute harus berupa alamat email yang valid.",
    in: ":attribute terpilih harus :values.",
    integer: ":attribute harus berupa angka.",
    max: ":attribute harus kurang dari :max:type.",
    min: ":attribute harus lebih dari :min:type.",
    not_in: ":attribute terpilih tidak boleh sama dengan :values.",
    not_regex: ":attribute tidak boleh cocok dengan pola yang ditentukan.",
    numeric: ":attribute harus berupa angka.",
    phone: ":attribute harus berupa nomor ponsel yang valid.",
    regex: ":attribute harus cocok dengan pola yang ditentukan.",
    required: ":attribute tidak boleh kosong.",
    size: ":attribute harus :size:type.",
    string: ":attribute harus berupa string.",
    typeof: ":attribute tidak cocok dengan tipe :type.",
    url: "Harus :attribute yang valid.",
    // url: ":attribute harus berupa url.",
  });

  const dispatch = useDispatch();
  const router = useRouter();
  const [disabledRightClick, setDisabledRightClick] = useState(false);

  useEffect(() => {
    getFirebaseToken();
    if (pageProps?.session?.user?.user?.data?.token) {
      if (!localStorage.getItem("sidebar")) {
        dispatch(getSidebar(pageProps?.session?.user?.user?.data?.token));
      }
    }
  }, [dispatch, pageProps?.session?.user?.user?.data?.token]);

  useEffect(() => {
    // if (
    //   router.pathname.includes(
    //     "/peserta/riwayat-pelatihan/[nama_pelatihan]/sertifikat/[id]"
    //   )
    // ) {
    //   setDisabledRightClick(true);
    // } else {
    //   setDisabledRightClick(false);
    // }
    // if (disabledRightClick) {

    if (process.env.NODE_ENV != "development") {
      setDisabledRightClick(true);
      document.onkeydown = function (e) {
        if (e.keyCode == 123 || e.code == "F12" || e.key == "F12") {
          return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
          return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
          return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
          return false;
        }
        if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
          return false;
        }
      };
    }
  }, []);

  moment.locale("id");

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Website Digital Talent Scholarship Kementerian Komunikasi dan Informatika RI"
        />
        <meta
          name="keywords"
          content="Digital Talent Scholarship, Digital Talent, Digitalent, Kementerian, Kominfo, Informatika, Sertifikasi, Pelatihan, Bimtek, Bimbingan Teknis, SKKNI, Literasi, SDM, Indonesia, Proserti, Litprofkom, Litprofinformatika, DTS, Scholarship"
        />
        <meta name="author" content="Digital Talent Scholarship 2022" />
        {/* <meta name="csrf-token" content="{{ csrf_token() }}" />
          <meta name="color:Background" content="#f4fbfa" />
          <meta property="og:url" content="{{ url('/') }}" /> */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Digital Talent Scholarship 2022" />
        <meta
          property="og:description"
          content="Digital Talent Scholarship Kementerian Komunikasi dan Informatika"
        />
        <meta
          property="og:site_name"
          content="Website Digital Talent Scholarship Kementerian Komunikasi dan Informatika RI"
        />
      </Head>
      {pageProps.data !== "auth" && pageProps.session ? (
        <Layout title={pageProps.title}>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <div
          onContextMenu={(e) => {
            if (disabledRightClick) {
              e.preventDefault();
            }
          }}
        >
          {/* {true && router.pathname != "/login/admin" ? (
            <Maintenance />
          ) : (
            <Component {...pageProps} />
          )} */}
          <Component {...pageProps} />
        </div>
      )}
    </>
  );
}

export default wrapper.withRedux(MyApp);
