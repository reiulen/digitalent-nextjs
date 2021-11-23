import DatePicker from "react-datepicker";
import { addDays } from "date-fns";

import React, { useState, useEffect } from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import moment from "moment";
import axios from "axios";

import IconCalender from "../../../assets/icon/Calender";

const RevisiKerjasama = ({ token }) => {
  const router = useRouter();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [period_start, setPeriod_start] = useState("");
  const [period_end, setPeriod_end] = useState("");
  const [no_perjanjianLembaga, setNo_perjanjianLembaga] = useState("");
  const [no_perjanjianKoninfo, setNo_perjanjianKoninfo] = useState("");
  const [tgl_ttd, setTgl_ttd] = useState("");
  const [dokument, setDokument] = useState("");
  const [catatanREvisi, setCatatanREvisi] = useState("");
  const [error, setError] = useState({
    catatanREvisi: "",
  });

  const acceptDokument = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Apakah anda yakin ingin terima kerjasama ?",
      // text: "Data ini tidak bisa dikembalikan !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya !",
      dismissOnDestroy: false,
    }).then(async (result) => {
      if (result.value) {
        try {
          let { data } = await axios.put(
            `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal/accept-document/${router.query.id}`,
            null,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          router.push({
            pathname: "/partnership/kerjasama/",
            query: { successTerima: true },
          });
        } catch (error) {
          Swal.fire("Gagal", `${error.response.data.message}`, "error").then(
            () => {
              router.push("/partnership/kerjasama");
            }
          );
        }
      }
    });
  };

  const rejectDokument = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Apakah anda yakin ingin tolak kerjasama ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya !",
      dismissOnDestroy: false,
    }).then(async (result) => {
      if (result.value) {
        try {
          let { data } = await axios.put(
            `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal/reject/${router.query.id}`,
            null,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          router.push({
            pathname: "/partnership/kerjasama/",
            query: { successReject: true },
          });
        } catch (error) {
          Swal.fire("Gagal", `${error.response.data.message}`, "error").then(
            () => {
              router.push("/partnership/kerjasama");
            }
          );
        }
      }
    });
  };
  const ajukanRevisiDokumen = async (e) => {
    e.preventDefault();
    if (catatanREvisi === "") {
      setError({ ...error, catatanREvisi: "Catatan Revisi harus diisi" });
    } else {
      Swal.fire({
        title: "Apakah anda yakin ingin ajukan revisi ?",
        // text: "Data ini tidak bisa dikembalikan !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Batal",
        confirmButtonText: "Ya !",
        dismissOnDestroy: false,
      }).then(async (result) => {
        if (result.value) {
          try {
            let formData = new FormData();
            formData.append("_method", "PUT");
            formData.append("note", catatanREvisi);
            let { data } = await axios.post(
              `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal/revisi-document/${router.query.id}`,
              formData,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            );
            router.push({
              pathname: "/partnership/kerjasama/",
              query: { successMakeREvisi: true },
            });
          } catch (error) {
            Swal.fire("Gagal", `${error.response.data.message}`, "error");
          }
        }
      });
    }
  };

  useEffect(() => {
    async function setDataSingle(id, token) {
      try {
        let { data } = await axios.get(
          `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal/cek-progres/${id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setPeriod_start(data.data.period_date_start);
        setPeriod_end(data.data.period_date_end);
        setNo_perjanjianLembaga(data.data.agreement_number_partner);
        setNo_perjanjianKoninfo(data.data.agreement_number_kemkominfo);
        setTgl_ttd(data.data.signing_date);
        setDokument(data.data.document);
      } catch (error) {
        Swal.fire("Gagal", `${error.response.data.message}`, "error");
      }
    }
    setDataSingle(router.query.id, token);
  }, [router.query.id, token]);

  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark titles-1">
              Submit Dokumen Kerjasama Revisi
            </h3>
          </div>
          <div className="card-body pt-0">
            <form>
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Periode Kerjasama
                </label>
                <div className="row">
                  <div className="col-12 col-xl-6">
                    <div className="d-flex align-items-center position-relative datepicker-w mt-2 disabled-form">
                      <DatePicker
                        className="form-search-date form-control-sm form-control cursor-pointer ml-n3"
                        selected={startDate}
                        selectsStart
                        value={period_start && period_start}
                        readOnly
                        dateFormat="YYYY-MM-DD"
                        placeholderText="Dari Tanggal"
                        minDate={moment().toDate()}
                      />
                      <IconCalender
                        className="right-center-absolute"
                        style={{ right: "10px" }}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-xl-6">
                    <div className="d-flex align-items-center position-relative datepicker-w mt-2 disabled-form">
                      <DatePicker
                        className="form-search-date form-control-sm form-control cursor-pointer "
                        selected={endDate}
                        readOnly
                        selectsEnd
                        value={period_end && period_end}
                        startDate={startDate}
                        endDate={endDate}
                        minDate={moment().toDate()}
                        maxDate={addDays(startDate, 20)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Sampai Tanggal"
                      />
                      <IconCalender
                        className="right-center-absolute"
                        style={{ right: "10px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="fv-row mb-10">
                <label className="required fw-bold fs-6 mb-2">
                  Nomor Perjanjian Lembaga
                </label>
                <input
                  type="text"
                  readOnly
                  name="text_input"
                  className="form-control mb-3 mb-lg-0 border-0 ml-n3"
                  placeholder="Masukan Nomor Perjanjian Lembaga"
                  value={no_perjanjianLembaga && no_perjanjianLembaga}
                />
              </div>
              <div className="fv-row mb-10">
                <label className="required fw-bold fs-6 mb-2">
                  Nomor Perjanjian Kemkominfo
                </label>
                <input
                  readOnly
                  type="text"
                  name="text_input"
                  className="form-control mb-3 mb-lg-0 border-0 ml-n3"
                  placeholder="Masukan Nomor Perjanjian Kemkominfo"
                  value={no_perjanjianKoninfo && no_perjanjianKoninfo}
                />
              </div>

              <div className="row">
                <div className="col-12 col-xl-6">
                  <label htmlFor="staticEmail" className="col-form-label">
                    Tanggal Penandatanganan
                  </label>
                  <div className="d-flex align-items-center position-relative datepicker-w mt-2 disabled-form">
                    <DatePicker
                      readOnly
                      value={tgl_ttd && tgl_ttd}
                      className="form-search-date form-control-sm form-control cursor-pointer ml-n2"
                      selected={startDate}
                      selectsStart
                      dateFormat="YYYY-MM-DD"
                      placeholderText="Dari Tanggal"
                      minDate={moment().toDate()}
                    />
                    <IconCalender
                      className="right-center-absolute"
                      style={{ right: "10px" }}
                    />
                  </div>
                </div>
                <div className="col-12 col-xl-6">
                  <div className="form-group">
                    <label htmlFor="staticEmail" className="col-form-label">
                      Dokumen Kerjasama
                    </label>
                    <div className="position-relative overflow-hidden w-100 ">
                      <input
                        disabled
                        type="text"
                        className="form-control"
                        placeholder={`${dokument}`}
                      />
                      <button
                        type="button"
                        className="btn right-center-absolute"
                        style={{
                          borderTopLeftRadius: "0",
                          borderBottomLeftRadius: "0",
                          backgroundColor: "#D7E1EA",
                          color: "#6C6C6C",
                        }}
                        onClick={() =>
                          window.open(
                            `https://dts-partnership-dev.s3.ap-southeast-1.amazonaws.com${dokument}`
                          )
                        }
                      >
                        Unduh
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Catatan Revisi
                </label>
                <div>
                  <textarea
                    onFocus={() => setError({ ...error, catatanREvisi: "" })}
                    onChange={(e) => setCatatanREvisi(e.target.value)}
                    name="cooperation"
                    id=""
                    cols="30"
                    rows="5"
                    value={catatanREvisi}
                    className="form-control"
                    placeholder="Masukan Catatan Revisi"
                  ></textarea>
                  {error.catatanREvisi ? (
                    <p className="error-text">{error.catatanREvisi}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="form-group">
                <div className="d-flex flex-column flex-md-row  flex-wrap justify-content-start justify-content-sm-end">
                  <button
                    onClick={(e) => rejectDokument(e)}
                    className="btn btn-sm btn-rounded-full bg-red-primary text-white ml-3 ml-sm-0 mt-2"
                  >
                    Tolak
                  </button>
                  <button
                    onClick={(e) => ajukanRevisiDokumen(e)}
                    className="btn btn-sm btn-rounded-full bg-yellow-primary text-white mx-3 mt-2"
                  >
                    Ajukan Revisi
                  </button>
                  <button
                    onClick={(e) => acceptDokument(e)}
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white ml-3 ml-sm-0 mt-2"
                  >
                    Terima
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default RevisiKerjasama;
