import "../styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";
import "remixicon/fonts/remixicon.css";
import "react-toastify/dist/ReactToastify.css";
import "react-image-crop/dist/ReactCrop.css";
import "react-phone-input-2/lib/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; //NEW
import "@splidejs/splide/dist/css/splide.min.css";
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
import "../styles/dashboard/style.css";
import SimpleReactValidator from "simple-react-validator";
import { wrapper } from "../redux/store";
import moment from "moment";
import "moment/locale/id";

import Layout from "../components/templates/layout.component";

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
    integer: ":attribute harus berupa integer.",
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
  moment.locale("id");

  return (
    <>
      {pageProps.data !== "auth" ? (
        <Layout title={pageProps.title}>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default wrapper.withRedux(MyApp);
