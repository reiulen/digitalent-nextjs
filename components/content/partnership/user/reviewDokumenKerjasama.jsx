import React, { useState, useRef, useEffect } from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import IconCalender from "../../../assets/icon/Calender";
import DatePicker from "react-datepicker";

import { addDays } from "date-fns";

function ReviewDokumenKerjasama({ token }) {
  const router = useRouter();
  const { revisiDone } = router.query;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [period_start, setPeriod_start] = useState("");
  const [period_end, setPeriod_end] = useState("");
  const [no_perjanjianLembaga, setNo_perjanjianLembaga] = useState("");
  const [no_perjanjianKoninfo, setNo_perjanjianKoninfo] = useState("");
  const [tgl_ttd, setTgl_ttd] = useState("");
  const [dokument, setDokument] = useState("");
  const [catatanREvisi, setCatatanREvisi] = useState("");

  const [note, setNote] = useState("");

  // const setDataSingle = async (id) => {

  // };

  // pdf from api
  const [document, setDocument] = useState("");
  const [showDokument, setShowDokument] = useState(null);
  // pdf from local upload
  const [viewPDF, setViewPDF] = useState(null);
  const [documentLocal, setDocumentLocal] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");
  const [NamePDF, setNamePDF] = useState(null);
  // change state
  const [changeDokumen, setChangeDokumen] = useState(false);

  // onchange pdf

  const fileType = ["application/pdf"];
  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    setDocumentLocal(selectedFile);
    setViewPDF("");
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setNamePDF(selectedFile.name);
          setPdfFileError("");
        };
      } else {
        setNamePDF(null);
        setPdfFile(null);
        setPdfFileError("Please selet valid pdf file !!");
      }
    }
  };

  // show document
  const showDocument = () => {
    if (changeDokumen) {
      if (!viewPDF) {
        setViewPDF(pdfFile);
      } else {
        setViewPDF(null);
      }
    } else {
      setShowDokument(showDokument ? false : true);
    }
  };
  // change document batal
  const setDocumentChange = () => {
    setShowDokument(false);
    setChangeDokumen(changeDokumen ? false : true);
    setViewPDF(null);
    setPdfFile(null);
    setNamePDF(null);
  };

  const notify = (value) =>
    toast.info(`${value}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleSubmit = async () => {
    // e.preventDefault();
    Swal.fire({
      title: "Apakah anda yakin ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Tidak",
      confirmButtonText: "Ya",
      dismissOnDestroy: false,
    }).then(async (result) => {
      if (result.value) {
        let formData = new FormData();
        const method = "PUT";
        formData.append("_method", method);
        formData.append("period_date_start", period_start);
        formData.append("period_date_end", period_end);
        formData.append("agreement_number_partner", no_perjanjianLembaga);
        formData.append("agreement_number_kemkominfo", no_perjanjianKoninfo);
        formData.append("signing_date", tgl_ttd);
        formData.append("document", documentLocal);

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
            pathname: "/partnership/user/kerjasama/review-dokumen-kerjasama/",
            query: { revisiDone: true, id: router.query.id },
          });
        } catch (error) {         
          notify(error.response.data.message);
        }
      }
    });
  };

  const onNewReset = () => {
    router.replace(
      "/partnership/user/kerjasama/review-dokumen-kerjasama",
      undefined,
      { shallow: true }
    );
  };

  // kondisi jika note terisi alihkan page ke revisi
  useEffect(() => {
    async function setDataSingle(id) {
      try {
        let { data } = await axios.get(
          `${process.env.END_POINT_API_PARTNERSHIP_MITRA}api/cooperations/proposal/cek-progres/${id}`,
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
        setCatatanREvisi(data.data.note);
        setNote(data.data.note);
        if ((data.data.status_migrates_id.status === "aktif") || (data.data.status_migrates_id.status === "dibatalkan") ) {
          router.push({
            pathname: "/partnership/user/kerjasama/hasil",
            query: {
              id: router.query.id,
              statusKerjasama: data.data.status_migrates_id.status,
            },
          });
        }

        if (data.data.status_migrates_id.status === "pengajuan-document" ) {
          router.push({
            pathname: "/partnership/user/kerjasama/review-dokumen-kerjasama",
            query: {
              id: router.query.id,
            },
          });
        }
      } catch (error) {
        notify(error.response.data.message);
      }
    }

    setDataSingle(router.query.id);
  }, [router.query.id, token]);

  return (
    <PageWrapper>
      {revisiDone ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
          style={{ backgroundColor: "#C9F7F5" }}
        >
          <div className="alert-icon">
            <i className="flaticon2-checkmark" style={{ color: "#1BC5BD" }}></i>
          </div>
          <div className="alert-text" style={{ color: "#1BC5BD" }}>
            Berhasil merevisi data
          </div>
          <div className="alert-close">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => onNewReset()}
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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title fz-20 fw-500 text-dark">
              Review Dokumen Kerjasama
            </h3>
          </div>
          <div className="card-body pb-28">
            <div className="row mt-8 mb-10 position-relative">
              <div className="col-2 p-0">
                <div className="progress-items">
                  {/* <div className="line-progress"></div> */}
                  <div className="circle-progress active-circle">
                    <span className="title-progress">Submit Kerjasama</span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress active-line"></div>
                  <div className="circle-progress active-circle">
                    <span className="title-progress">Review Kerjasama</span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress active-line"></div>
                  <div className="circle-progress active-circle">
                    <span className="title-progress">Pembahasan</span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress active-line"></div>
                  <div className="circle-progress active-circle">
                    <span
                      className="title-progress text-center"
                      style={{ top: "-4rem" }}
                    >
                      Submit Dokumen
                      <br />
                      Kerjasama
                    </span>
                  </div>
                </div>
              </div>

             
                <div className="col-2">
                  <div className="progress-items">
                    <div className="line-progress active-line"></div>
                    <div className="circle-progress active-circle">
                      <span
                        className="title-progress text-center active"
                        style={{ top: "-4rem" }}
                      >
                        Review Dokumen
                        <br />
                        Kerjasama
                      </span>
                    </div>
                  </div>
                </div>

              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress">
                    <span className="title-progress">Hasil</span>
                  </div>
                </div>
              </div>
            </div>

            {note === "-" || revisiDone ? (
              <div className={`row mt-20`}>
                <div className="col-12 col-sm-6">
                  <Image
                    src="/assets/media/hubungi-kami-1.svg"
                    height={300}
                    width={400}
                    alt="hubungi-kami"
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <div className="d-flex flex-column align-items-start justify-content-center h-100">
                    <h1 className="fz-40 fw-700" style={{ color: "#6C6C6C" }}>
                      Dokumen Kerjasama Terkirim!
                    </h1>
                    <p className="mt-5 fz-16">
                      Terima kasih telah mengirimkan dokumen kerjasama. Mohon tunggu dalam beberapa waktu karena Kami akan segera memproses dokumen kerjasamamu. 
                    </p>
                  </div>

                  <div className="form-group row">
                    <div className="col-sm-12 d-flex justify-content-end">
                      <Link href="/partnership/user/kerjasama" passHref>
                        <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary">
                          Kembali
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form>
                <div className="form-group">
                  <label
                    htmlFor="staticEmail"
                    className="col-form-label fz-14"
                    style={{ color: "#6C6C6C" }}
                  >
                    Periode Kerjasama
                  </label>
                  <p className="fz-16">
                    {period_start && period_start} - {period_end && period_end}
                  </p>

                  <label
                    htmlFor="staticEmail"
                    className="col-form-label fz-14"
                    style={{ color: "#6C6C6C" }}
                  >
                    Nomor Perjanjian Lembaga
                  </label>
                  <p className="fz-16">
                    {no_perjanjianLembaga && no_perjanjianLembaga}
                  </p>
                  <label
                    htmlFor="staticEmail"
                    className="col-form-label fz-14"
                    style={{ color: "#6C6C6C" }}
                  >
                    Nomor Perjanjian Kemkominfo
                  </label>
                  <p className="fz-16">
                    {no_perjanjianKoninfo && no_perjanjianKoninfo}
                  </p>
                  <label
                    htmlFor="staticEmail"
                    className="col-form-label fz-14"
                    style={{ color: "#6C6C6C" }}
                  >
                    Tanggal Tanda Tangan
                  </label>
                  <p className="fz-16">{tgl_ttd && tgl_ttd}</p>
                  <label
                    htmlFor="staticEmail"
                    className="col-form-label fz-14"
                    style={{ color: "#6C6C6C" }}
                  >
                    Catatan Revisi
                  </label>
                  <p className="fz-16">{catatanREvisi && catatanREvisi}</p>
                  {/* <div className="row">
                    <div className="col-12 col-sm-6">
                      <div className="d-flex align-items-center position-relative datepicker-w mt-2">
                        <DatePicker
                          className="form-search-date form-control-sm form-control cursor-pointer"
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
                    <div className="col-12 col-sm-6">
                      <div className="d-flex align-items-center position-relative datepicker-w mt-2">
                        <DatePicker
                          className="form-search-date form-control-sm form-control cursor-pointer"
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
                  </div> */}
                </div>

                {/* <div className="row">
                  <div className="col-12 col-sm-12">
                    <div className="form-group mb-10">
                      <label className="required mb-2">
                        Nomor Perjanjian Lembaga
                      </label>
                      <input
                        readOnly
                        type="text"
                        name="text_input"
                        className="form-control mb-3 mb-lg-0"
                        placeholder="Masukan Nomor Perjanjian Lembaga"
                        value={no_perjanjianLembaga && no_perjanjianLembaga}
                      />
                    </div>
                  </div>
                </div> */}
                {/* <div className="row">
                  <div className="col-12 col-sm-12">
                    <div className="form-group mb-10">
                      <label className="required mb-2">
                        Nomor Perjanjian Kemkominfo
                      </label>
                      <input
                        readOnly
                        type="text"
                        name="text_input"
                        className="form-control mb-3 mb-lg-0"
                        placeholder="Masukan Nomor Perjanjian Kemkominfo"
                        value={no_perjanjianKoninfo && no_perjanjianKoninfo}
                      />
                    </div>
                  </div>
                </div> */}

                {/* <div className="row">
                  <div className="col-12 col-sm-6">
                    <label htmlFor="staticEmail" className="col-form-label">
                      Tanggal Penandatanganan
                    </label>
                    <div className="d-flex align-items-center position-relative datepicker-w mt-2">
                      <DatePicker
                        value={tgl_ttd && tgl_ttd}
                        className="form-search-date form-control-sm form-control cursor-pointer"
                        selected={startDate}
                        selectsStart
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
                </div> */}
                {/* UPLOAD DOKUMENT SEBELUMNYA */}
                {/* <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="staticEmail" className="col-form-label">
                        Dokumen Kerjasama
                      </label>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="d-flex flex-wrap align-items-center mb-4">
                            <button
                              type="button"
                              className="btn btn-sm btn-rounded-full bg-blue-primary text-white mr-3 mt-2"
                              onClick={() => showDocument()}
                            >
                              {viewPDF || showDokument
                                ? "Tutup dokumen"
                                : "Lihat dokumen"}
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-rounded-full bg-blue-primary text-white mr-3 mt-2"
                              onClick={() => setDocumentChange()}
                            >
                              {!changeDokumen ? "Ubah dokumen" : "Batal Ubah"}
                            </button>
                          </div>

                          {changeDokumen && !viewPDF ? (
                            <div className="input-group mt-3">
                              <div className="custom-file">
                                <input
                                  accept=".pdf"
                                  type="file"
                                  name="gambar"
                                  className="custom-file-input cursor-pointer"
                                  id="inputGroupFile04"
                                  required
                                  onChange={handlePdfFileChange}
                                />
                                <label
                                  className="custom-file-label"
                                  htmlFor="inputGroupFile04"
                                >
                                  {NamePDF ? NamePDF : "Tambah dokumen baru"}
                                </label>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}

                          {pdfFileError && (
                            <div
                              className="mt-3"
                              style={{ color: "red", fontWeight: "bold" }}
                            >
                              {pdfFileError}
                            </div>
                          )}
                        </div>
                      </div>
                      <div
                        className={`${
                          viewPDF
                            ? "pdf-container w-100"
                            : "pdf-container d-none"
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
                      {showDokument ? (
                        <iframe
                          className="my-4 border"
                          src={`http://dts-partnership-dev.s3.ap-southeast-1.amazonaws.com/partnership/files/document_cooperations/${dokument}`}
                          frameBorder="0"
                          scrolling="auto"
                          height={"500px"}
                          width="100%"
                        ></iframe>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div> */}

                {/* <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="staticEmail" className="col-form-label">
                        Catatan Tambahan
                      </label>
                      <div>
                        <textarea
                          readOnly
                          value={catatanREvisi && catatanREvisi}
                          name="cooperation"
                          id=""
                          cols="30"
                          rows="5"
                          className="form-control"
                          placeholder="Tuliskan Catatan Tambahan"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className="form-group">
                  <label>Unggah Dokumen Kerjasama</label>
                  <div></div>
                  <div className="custom-file">
                    <input
                    accept=".pdf"
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                      onChange={handlePdfFileChange}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      {NamePDF ? NamePDF : "Belum ada file"}
                    </label>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-12 d-flex justify-content-end">
                    <Link href="/partnership/user/kerjasama" passHref>
                      <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                        Batalkan
                      </a>
                    </Link>
                    <button
                      type="button"
                      className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                      onClick={() => handleSubmit()}
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default ReviewDokumenKerjasama;
