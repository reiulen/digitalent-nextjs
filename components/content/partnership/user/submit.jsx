import React, { useState, useRef, useEffect } from "react";

import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import Swal from "sweetalert2";
import axios from "axios";
import IconCalender from "../../../assets/icon/Calender";
import { useRouter } from "next/router";
import moment from "moment";

const SubmitKerjasama = ({ token }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");
  const [viewPDF, setViewPDF] = useState(null);
  const [error, setError] = useState({
    period_date_start: "",
    agreement_number_partner: "",
    agreement_number_kemkominfo: "",
    signing_date: "",
    document: "",
  });

  const router = useRouter();
  const [period_date_start, setPeriod_date_start] = useState("");
  const [agreement_number_partner, setAgreement_number_partner] = useState("");
  const [agreement_number_kemkominfo, setAgreement_number_kemkominfo] =
    useState("");
  const [signing_date, setSigning_date] = useState("");
  const [document, setDocument] = useState("");

  const [NamePDF, setNamePDF] = useState(null);

  const fileType = ["application/pdf"];
  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    setDocument(selectedFile);
    setViewPDF("");
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setPdfFileError("");
          setNamePDF(selectedFile.name);
        };
      } else {
        setNamePDF(null);
        setPdfFile(null);
        setPdfFileError("Please selet valid pdf file");
      }
    } else {
      Swal.fire("Gagal", `select your file`, "error");
    }
  };

  const submit = (e) => {
    e.preventDefault();

    if (period_date_start === "") {
      setError({
        ...error,
        period_date_start: "Harus isi tanggal priode kerjasama",
      });
    } else if (agreement_number_partner === "") {
      setError({
        ...error,
        agreement_number_partner: "Harus isi nomor perjanjian lembaga",
      });
    } else if (agreement_number_kemkominfo === "") {
      setError({
        ...error,
        agreement_number_kemkominfo: "Harus isi nomor perjanjian kemkominfo",
      });
    } else if (signing_date === "") {
      setError({ ...error, signing_date: "Harus isi tanggal penandatangan" });
    } else if (document === "") {
      setError({ ...error, document: "Harus unggah file" });
    } else {
      Swal.fire({
        title: "Apakah anda yakin ingin simpan ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Batal",
        confirmButtonText: "Ya !",
        dismissOnDestroy: false,
      }).then(async (result) => {
        if (result.value) {
          let formData = new FormData();
          formData.append("_method", "put");
          formData.append("period_date_start", period_date_start);
          formData.append("period_date_end", newDate);
          formData.append("agreement_number_partner", agreement_number_partner);
          formData.append(
            "agreement_number_kemkominfo",
            agreement_number_kemkominfo
          );
          formData.append("signing_date", signing_date);
          formData.append("document", document);

          try {
            let { data } = await axios.post(
              `${process.env.END_POINT_API_PARTNERSHIP_MITRA}api/cooperations/proposal/proposal-revisi-document/${router.query.id}`,
              formData,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            );
            router.push({
              pathname: `/partnership/user/kerjasama/review-dokumen-kerjasama`,
              query: {
                successSubmitDokumentKerjasama: true,
                id: router.query.id,
              },
            });
          } catch (error) {
            Swal.fire("Gagal", `${error.response.data.message}`, "error");
          }
        }
      });
    }
  };

  const [newDate, setNewDate] = useState("");

  const [periodValue, setPeriodValue] = useState("");
  const [periodUnitValue, setPeriodUnitValue] = useState("");

  const checkPeriod = (dateNow) => {
    if (periodUnitValue === "bulan") {
      let futureMonth = moment(dateNow)
        .add(parseInt(periodValue), "M")
        .format("YYYY-MM-DD");

      setNewDate(futureMonth);
    } else {
      let futureYear = moment(dateNow)
        .add(parseInt(periodValue), "y")
        .format("YYYY-MM-DD");

      setNewDate(futureYear);
    }
  };

  const onChangePeriodeDateStart = (date) => {
    setPeriod_date_start(moment(date).format("YYYY-MM-DD"));
    checkPeriod(moment(date).format("YYYY-MM-DD"));
  };

  useEffect(() => {
    async function cekProgresStatus(id) {
      try {
        let { data } = await axios.get(
          `${process.env.END_POINT_API_PARTNERSHIP_MITRA}api/cooperations/proposal/cek-progres/${id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        setPeriodValue(data.data.period);
      } catch (error) {
        Swal.fire("Gagal", `${error.response.data.message}`, "error");
      }
    }
    cekProgresStatus(router.query.id);
  }, [router.query.id, token]);

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title titles-1 fw-500 text-dark">
              Submit Dokumen Kerjasama
            </h3>
          </div>

          <div className="card-body">
            <div className="row mt-8 mb-10 position-relative">
              <div className="col-2 p-0">
                <div className="progress-items">
                  <div className="circle-progress active-circle">
                    <span className="title-progress">Submit Kerjasama</span>
                  </div>
                </div>
              </div>
              <div className="col-2 p-0">
                <div className="progress-items">
                  <div className="line-progress active-line"></div>
                  <div className="circle-progress active-circle">
                    <span className="title-progress">Review Kerjasama</span>
                  </div>
                </div>
              </div>
              <div className="col-2 p-0">
                <div className="progress-items">
                  <div className="line-progress active-line"></div>
                  <div className="circle-progress active-circle">
                    <span className="title-progress">Pembahasan</span>
                  </div>
                </div>
              </div>
              <div className="col-2 p-0">
                <div className="progress-items">
                  <div className="line-progress active-line"></div>
                  <div className="circle-progress active-circle">
                    <span
                      className="title-progress text-center active"
                      style={{ top: "-4rem" }}
                    >
                      Submit Dokumen
                      <br />
                      Kerjasama
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-2 p-0">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress">
                    <span
                      className="title-progress text-center"
                      style={{ top: "-4rem" }}
                    >
                      Review Dokumen
                      <br />
                      Kerjasama
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-2 p-0">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress">
                    <span className="title-progress">Hasil</span>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={submit}>
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Periode Kerjasama
                </label>
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <div className="d-flex align-items-center position-relative datepicker-w mt-2">
                      <DatePicker
                        onFocus={() =>
                          setError({ ...error, period_date_start: "" })
                        }
                        className="form-search-date form-control cursor-pointer"
                        selected={startDate}
                        onChange={(date) => onChangePeriodeDateStart(date)}
                        selectsStart
                        value={period_date_start}
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="YYYY-MM-DD"
                        placeholderText="Dari Tanggal"
                        // minDate={moment().toDate()}
                      />
                      <IconCalender
                        className="right-center-absolute"
                        style={{ right: "10px" }}
                      />
                    </div>
                    {error.period_date_start ? (
                      <p className="error-text">{error.period_date_start}</p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="d-flex align-items-center position-relative datepicker-w mt-2 disabled-form">
                      <DatePicker
                        className="form-control cursor-pointer border-0"
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        readOnly
                        selectsEnd
                        value={newDate}
                        startDate={startDate}
                        endDate={endDate}
                        // minDate={moment().toDate()}
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

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Nomor Perjanjian Lembaga
                </label>
                <input
                  onFocus={() =>
                    setError({ ...error, agreement_number_partner: "" })
                  }
                  onChange={(e) => setAgreement_number_partner(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Masukkan Nomor Perjanjian Lembaga"
                />
                {error.agreement_number_partner ? (
                  <p className="error-text">{error.agreement_number_partner}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Nomor Perjanjian Kemkominfo
                </label>
                <input
                  onFocus={() =>
                    setError({ ...error, agreement_number_kemkominfo: "" })
                  }
                  onChange={(e) =>
                    setAgreement_number_kemkominfo(e.target.value)
                  }
                  type="text"
                  className="form-control"
                  placeholder="Masukkan Nomor Perjanjian Kemkominfo"
                />
                {error.agreement_number_kemkominfo ? (
                  <p className="error-text">
                    {error.agreement_number_kemkominfo}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Tanggal Penandatangan
                </label>
                <div className="d-flex align-items-center position-relative datepicker-w w-100">
                  <DatePicker
                    className="form-search-date form-control cursor-pointer"
                    selected={endDate}
                    onFocus={() => setError({ ...error, signing_date: "" })}
                    onChange={(date) =>
                      setSigning_date(moment(date).format("YYYY-MM-DD"))
                    }
                    value={signing_date}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    // minDate={moment().toDate()}
                    maxDate={addDays(startDate, 20)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Sampai Tanggal"
                  />
                  <IconCalender
                    className="right-center-absolute"
                    style={{ right: "10px" }}
                  />
                </div>
                {error.signing_date ? (
                  <p className="error-text">{error.signing_date}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Upload Dokumen Kerjasama
                </label>
                <div className="input-group">
                  <div className="custom-file">
                    <input
                      onFocus={() => setError({ ...error, document: "" })}
                      type="file"
                      name="gambar"
                      className="custom-file-input cursor-pointer"
                      id="inputGroupFile04"
                      accept=".pdf"
                      onChange={handlePdfFileChange}
                    />
                    <label
                      className="custom-file-label"
                      htmlFor="inputGroupFile04"
                    >
                      {NamePDF ? NamePDF : "Cari Dokumen"}
                    </label>
                  </div>
                </div>
                {error.document ? (
                  <p className="error-text">{error.document}</p>
                ) : (
                  ""
                )}
              </div>
              {pdfFileError && <div>{pdfFileError}</div>}

              <div
                className={`${
                  viewPDF ? "pdf-container" : "pdf-container d-none"
                }`}
              >
                <iframe
                  src={viewPDF}
                  frameBorder="0"
                  scrolling="auto"
                  height={viewPDF ? "500px" : ""}
                  width="100%"
                ></iframe>
                {!viewPDF && <>No pdf file selected </>}
              </div>

              <div className="form-group row mt-6">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/partnership/user/kerjasama">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Batalkan
                    </a>
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                  >
                    Simpan
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

export default SubmitKerjasama;
