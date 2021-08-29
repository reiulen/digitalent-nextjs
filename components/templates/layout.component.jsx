import React from "react";

import Head from "next/head";
import Link from "next/link";

import Sidebar from "./sidebar.component";
import Header from "./header.component";
import HeaderMobile from "./header-mobile.component";
// Content
import SubHeader from "./subheader.component";
// Wrapper
import ContentWrapper from "../wrapper/content.wrapper";

import Footer from "./footer.component";
import SimpleReactValidator from "simple-react-validator";

const Layout = ({ children, title = "Dashboard" }) => {
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
    url: ":attribute harus berupa url.",
  });
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <HeaderMobile />
      <div div className="d-flex flex-row flex-column-fluid page">
        <Sidebar />
        <div
          className="d-flex flex-column flex-row-fluid wrapper"
          id="kt_wrapper"
        >
          <Header />
          <ContentWrapper>
            <SubHeader />
            {children}
          </ContentWrapper>
          {/* <Footer /> */}
        </div>
      </div>

      <div id="kt_quick_user" className="offcanvas offcanvas-right p-10">
        <div className="offcanvas-header d-flex align-items-center justify-content-between pb-5">
          <h3 className="font-weight-bold m-0">User Profile</h3>
          <a
            href="#"
            className="btn btn-xs btn-icon btn-light btn-hover-primary"
            id="kt_quick_user_close"
          >
            <i className="ki ki-close icon-xs text-muted"></i>
          </a>
        </div>

        <div className="offcanvas-content pr-5 mr-n5">
          <div className="d-flex align-items-center mt-5">
            <div className="symbol symbol-100 mr-5">
              <div
                className="symbol-label"
                style={{ backgroundImage: 'url("/assets/media/default.jpg")' }}
              ></div>
              <i className="symbol-badge bg-success"></i>
            </div>
            <div className="d-flex flex-column">
              <a
                href="#"
                className="font-weight-bold font-size-h5 text-dark-75 text-hover-primary"
              >
                Dendy Juliano
              </a>
              <div className="text-muted mt-1">Admin Kominpo</div>
              <div className="navi mt-2">
                <a href="#" className="navi-item">
                  <span className="navi-link p-0 pb-2">
                    <span className="navi-icon mr-1">
                      <span className="svg-icon svg-icon-lg svg-icon-primary"></span>
                    </span>
                    <span className="navi-text text-muted text-hover-primary">
                      dendy@gmail.com
                    </span>
                  </span>
                </a>
                <Link href="/">
                  <a className="btn btn-sm btn-light-primary font-weight-bolder py-2 px-5">
                    Sign Out
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <div className="separator separator-dashed mt-8 mb-5"></div>

          {/* <div className="navi navi-spacer-x-0 p-0">
                        <a href="#" className="navi-item">
                            <div className="navi-link">
                                <div className="symbol symbol-40 bg-light mr-3">
                                    <div className="symbol-label">
                                        <span className="svg-icon svg-icon-md svg-icon-success">

                                        </span>
                                    </div>
                                </div>
                                <div className="navi-text">
                                    <div className="font-weight-bold">My Profile</div>
                                    <div className="text-muted">Account settings and more
                                        <span className="label label-light-danger label-inline font-weight-bold">update</span>
                                    </div>
                                </div>
                            </div>
                        </a>

                        <a href="#" className="navi-item">
                            <div className="navi-link">
                                <div className="symbol symbol-40 bg-light mr-3">
                                    <div className="symbol-label">
                                        <span className="svg-icon svg-icon-md svg-icon-warning">

                                        </span>
                                    </div>
                                </div>
                                <div className="navi-text">
                                    <div className="font-weight-bold">My Messages</div>
                                    <div className="text-muted">Inbox and tasks</div>
                                </div>
                            </div>
                        </a>
                    </div> */}
        </div>
      </div>

      <div id="kt_scrolltop" className="scrolltop">
        <span className="svg-icon">
          <i className="flaticon2-up"></i>
        </span>
      </div>
    </>
  );
};

export default Layout;
