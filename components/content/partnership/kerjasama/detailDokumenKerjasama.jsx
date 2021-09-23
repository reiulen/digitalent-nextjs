import React, { useState, useRef, useEffect } from "react";

import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getSingleCooperation } from "../../../../redux/actions/partnership/managementCooporation.actions";

const DetailDokumenKerjasama = ({token}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  let { success } = router.query;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const allMK = useSelector((state) => state.allMK);

  const [pdfFIle, setPdfFIle] = useState("");

  const getSingleValue = async (id) => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/${id}`
      );
      setPdfFIle(data.data.document_file);
    } catch (error) {
      console.log("action getSingleValue gagal", error);
    }
  };

  useEffect(() => {
    getSingleValue(router.query.id);
    dispatch(getSingleCooperation(router.query.id));
  }, [dispatch, router.query.id]);

  return (
    <PageWrapper>
      {success ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
        >
          <div className="alert-icon">
            <i className="flaticon2-checkmark"></i>
          </div>
          <div className="alert-text">Berhasil Menyimpan Data</div>
          <div className="alert-close">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              // onClick={onNewReset}
            >
              <span aria-hidden="true">
                <i className="ki ki-close"></i>
              </span>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

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
                  value={
                    allMK.cooperationById.length === 0
                      ? ""
                      : allMK.cooperationById.data.submission_date
                  }
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
                  value={
                    allMK.cooperationById.length === 0
                      ? ""
                      : allMK.cooperationById.data.title
                  }
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
                    {allMK.cooperationById.length === 0
                      ? ""
                      : allMK.cooperationById.data.cooperation_category.name}
                  </option>
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
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      readOnly
                      value={
                        allMK.cooperationById.length === 0
                          ? ""
                          : allMK.cooperationById.data.period_date_start
                      }
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Dari Tanggal"
                      // minDate={addDays(new Date(), 20)}
                    />
                  </div>
                  <div className="col-12 col-sm-6 form-date-picker">
                    <DatePicker
                      className="form-control"
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      value={
                        allMK.cooperationById.length === 0
                          ? ""
                          : allMK.cooperationById.data.period_date_end
                      }
                      minDate={startDate}
                      readOnly
                      maxDate={addDays(startDate, 20)}
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
                      value={
                        allMK.cooperationById.length === 0
                          ? ""
                          : allMK.cooperationById.data.period
                      }
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <input
                      type="text"
                      value={
                        allMK.cooperationById.length === 0
                          ? ""
                          : allMK.cooperationById.data.period_unit
                      }
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
                  value={
                    allMK.cooperationById.length === 0
                      ? ""
                      : allMK.cooperationById.data.agreement_number_partner
                  }
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
                  value={
                    allMK.cooperationById.length === 0
                      ? ""
                      : allMK.cooperationById.data.agreement_number_kemkominfo
                  }
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
                          value={
                            allMK.cooperationById.length === 0
                              ? ""
                              : allMK.cooperationById.data.signing_date
                          }
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
                            placeholder={`${pdfFIle}`}
                          />
                          <button
                            type="button"
                            className="btn right-center-absolute"
                            style={{
                              borderTopLeftRadius: "0",
                              borderBottomLeftRadius: "0",
                              backgroundColor:"#D7E1EA",
                              color:"#6C6C6C"
                            }}
                            onClick={()=>window.open(`https://dts-partnership-dev.s3.ap-southeast-1.amazonaws.com/partnership/files/document_cooperations/${pdfFIle}`)}
                          >
                            Buka File
                          </button>
                    </div>
                  </div>
                </div>
              </div>

              {allMK.cooperationById.length === 0 ? (
                ""
              ) : allMK.cooperationById.data.cooperation_category.data_content
                  .cooperation_form === "-" ? (
                <h1 className="my-4">Data kerja sama tidak ada</h1>
              ) : (
                allMK.cooperationById.data.cooperation_category.data_content.map(
                  (items, i) => {
                    return (
                      <div className="form-group" key={i}>
                        <label htmlFor="staticEmail" className="col-form-label">
                          {items.cooperation_form}
                        </label>
                        <textarea
                          readOnly
                          value={items.form_content}
                          name=""
                          id=""
                          cols="30"
                          rows="5"
                          className="form-control"
                          placeholder="Masukkan Tujuan Kerjasama disini"
                        ></textarea>
                      </div>
                    );
                  }
                )
              )}
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
