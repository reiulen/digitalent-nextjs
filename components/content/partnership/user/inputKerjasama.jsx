import React from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";

import Style from "../../../../styles/progressbar.module.css";

const InputKerjasama = ({token}) => {
  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Review Kerjasama
            </h3>
          </div>
          <div className={`card-body ${Style.refreshZindex}`}>
            <div className={Style.containerProggres}>
              <ul className={Style.progressbar}>
                <li className={Style.active}>Submit Kerjasama</li>
                <li className={Style.active}>Review Kerjasama</li>
                <li>Pembahasan</li>
                <li>Dokumen Kerjasama</li>
                <li>Review Dokumen </li>
                <li>Selesai</li>
              </ul>
            </div>
            <form>
              <div className={`row form-group ${Style.clearRow}`}>
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Tanggal
                </label>
                <div className="col-sm-10">
                  <div className="row align-items-right">
                    <div className="col-lg-3 col-xl-3 mt-5 mt-lg-5">
                      <input
                        type="date"
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Judul Kerjasama
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Judul Kerjasama"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Kategori Kerjasama
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Memorandum of Understanding (MoU)"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Periode
                </label>
                <div className="col-sm-10">
                  <div className="row align-items-right">
                    <div className="col-lg-3 col-xl-3 mt-5 mt-lg-5">
                      <input
                        type="date"
                        className="form-control form-control-sm"
                      />
                    </div>
                    <div className="col-lg-3 col-xl-3 mt-5 mt-lg-5">
                      <input
                        type="date"
                        className="form-control form-control-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Tujuan Kerjasama
                </label>
                <div className="col-sm-6">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    className="form-control"
                    placeholder="Masukkan Tujuan Kerjasama disini"
                  ></textarea>
                </div>
                <div className="col-sm-4" style={{ marginTop: "-2.7%" }}>
                  <label htmlFor="staticEmail" className="col-sm-10">
                    Catatan Revisi
                  </label>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    className="form-control"
                    placeholder="kurang rapih, kurang titik koma, kurang kondusif"
                  ></textarea>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Ruang Lingkup Kerjasama
                </label>
                <div className="col-sm-6">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    className="form-control"
                    placeholder="Masukkan Ruang Lingkup Kerjasama disini"
                  ></textarea>
                </div>
                <div className="col-sm-4">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    className="form-control"
                    placeholder="kurang rapih, kurang titik koma, kurang kondusif"
                  ></textarea>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Target Kerjasama
                </label>
                <div className="col-sm-6">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    className="form-control"
                    placeholder="Masukkan Target Kerjasama disini
"
                  ></textarea>
                </div>
                <div className="col-sm-4">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    className="form-control"
                    placeholder="kurang rapih, kurang titik koma, kurang kondusif"
                  ></textarea>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Catatan Tambahan
                </label>
                <div className="col-sm-10">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    className="form-control"
                    placeholder="kurang rapih, kurang titik koma, kurang kondusif
                    kurang rapih, kurang titik koma, kurang kondusif
                    kurang rapih, kurang titik koma, kurang kondusif"
                  ></textarea>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                  <Link href="/partnership/kerjasama/review-kerjasama">
                    <a
                      className="btn bg- mr-2 btn-sm btn-outline-primary"
                      style={{ color: "#40A9FF" }}
                    >
                      Kembali
                    </a>
                  </Link>
                  <Link href="/partnership/kerjasama/review-kerjasama" passHref>
                    <button className="btn btn-primary btn-sm">Submit</button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default InputKerjasama;
