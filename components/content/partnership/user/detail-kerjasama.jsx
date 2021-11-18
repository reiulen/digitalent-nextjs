import React from "react";

import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import DatePicker from "react-datepicker";

const DetailDokumenKerjasama = ({token}) => {

  return (
    <PageWrapper>

      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark"
              style={{ fontSize: "24px" }}
            >
              Detail Kerjasama
            </h3>
          </div>

          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Tanggal
                </label>
                <input
                  readOnly
                  type="date"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Judul kerjasama
                </label>
                <input
                  readOnly
                  type="text"
                  className="form-control"
                  placeholder="Judul Kerjasama"
                />
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Kategori kerjasama
                </label>
                <select name="" id="" className="form-control" disabled>
                  <option value="Kategori" selected>
                    asaas  </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Periode
                </label>
                <div className="row">
                  <div className="col-12 col-sm-6 form-date-picker">
                    <DatePicker
                      className="form-control w-100"
                      selectsStart
                      readOnly
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Dari Tanggal"
                    />
                  </div>
                  <div className="col-12 col-sm-6 form-date-picker">
                    <DatePicker
                      className="form-control"
                      selectsEnd
                      readOnly
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Sampai Tanggal"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Periode Kerjasama
                </label>
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <input
                      type="text"
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <input
                      type="text"
                      readOnly
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Nomor Perjanjian Lembaga
                </label>
                <input
                  type="text"
                  readOnly
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Nomor Perjanjian KemKominfo
                </label>
                <input
                  type="text"
                  readOnly
                  className="form-control"
                />
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="staticEmail" className="col-form-label">
                      Tanggal Penandatanganan
                    </label>
                        <input
                          readOnly
                          type="date"
                          className="form-control"
                        />
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="staticEmail" className="col-form-label">
                      Dokumen Kerjasama
                    </label>
                        <div className="position-relative overflow-hidden w-100 ">
                      
                          <input
                            disabled
                            type="text"
                            className="form-control"
                          />
                          <button
                            type="submit"
                            className="btn right-center-absolute"
                            style={{
                              borderTopLeftRadius: "0",
                              borderBottomLeftRadius: "0",
                              backgroundColor:"#D7E1EA",
                              color:"#6C6C6C"
                            }}
                          >
                            Buka File
                          </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ------------- jangan dihapus !! */}

              {/* start loop */}
                      <div className="form-group">
                        <label htmlFor="staticEmail" className="col-form-label">
                     
                          msmss
                        </label>
                        <textarea
                          readOnly
                          name=""
                          id=""
                          cols="30"
                          rows="5"
                          className="form-control"
                          placeholder="Masukkan Tujuan Kerjasama disini"
                        ></textarea>
                      </div>
              {/* loop end loop*/}

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/partnership/kerjasama">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary">
                      Kembali
                    </a>
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

export default DetailDokumenKerjasama;
