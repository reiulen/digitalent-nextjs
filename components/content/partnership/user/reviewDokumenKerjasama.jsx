import React, { useState, useRef, useEffect } from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import IconCalender from "../../../assets/icon/Calender";
import DatePicker from "react-datepicker";

import { addDays } from "date-fns";

function ReviewDokumenKerjasama() {
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

  const [note, setNote] = useState("");
  console.log("note", note);

  const setDataSingle = async (id) => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/cek-progres/${id}`,{
          headers: {
            authorization: `Bearer ${process.env.TOKEN_PARTNERSHIP_TEMP}`,
          },
        }
      );
      setPeriod_start(data.data.period_date_start);
      setPeriod_end(data.data.period_date_end);
      setNo_perjanjianLembaga(data.data.agreement_number_partner);
      setNo_perjanjianKoninfo(data.data.agreement_number_kemkominfo);
      setTgl_ttd(data.data.signing_date);
      setDokument(data.data.document);
      setCatatanREvisi(data.data.note)
      setNote(data.data.note);
      console.log("data single",data)
    } catch (error) {
      console.log("action getSIngle gagal", error);
    }
  };



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
    } else {
      console.log("select your file");
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
        // formData.append("period", period);
        // formData.append("period_unit", periodUnit);

        if (documentLocal === "") {
          console.log("object");
        } else {
          formData.append("document", documentLocal);
        }

        try {
          let { data } = await axios.post(
            `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/proposal-revisi-document/${router.query.id}`,
            formData
          );

          console.log("data sukses",data)

          router.push({
            pathname: "/partnership/user/kerjasama/",
            query: { successSubmitDokumentKerjasama: true },
          });
        } catch (error) {
          notify(error.response.data.message);
        }
      }
    });
  };



  // kondisi jika note terisi alihkan page ke revisi
  useEffect(() => {
    setDataSingle(router.query.id);
  }, [router.query.id]);

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title fz-20 fw-500 text-dark">
              Review Dokumen Kerjasama
            </h3>
          </div>
          <div className="card-body pb-28">
            <div className="row mt-8 mb-10">
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
                    <span className="title-progress">
                      Submit Dokumen Kerjasama
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress active-line"></div>
                  <div className="circle-progress active-circle">
                    <span className="title-progress">
                      Review Dokumen Kerjasama
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

            {note === "-" ? (
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
                      Dokumen Kerjasama Anda Telah Diterima
                    </h1>
                    <p className="mt-5 fz-16">
                      Terima Kasih telah Melakukan Pengajuan Kerjasama Dengan
                      Kami.
                    </p>
                    <p className="fz-16">
                      Mohon tunggu beberapa saat untuk proses review berkas yang
                      anda submit
                    </p>
                  </div>

                  <div className="form-group row">
                    <div className="col-sm-12 d-flex justify-content-end">
                      {/* <Link href="/partnership/kerjasama">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link> */}
                      <button
                        // type="submit"
                        className="btn btn-sm btn-rounded-full bg-blue-primary text-white "
                      >
                        Selesai
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form>
                <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Periode Kerjasama
                </label>
                <div className="row">
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
                </div>
              </div>


                <div className="row">
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
                </div>
                <div className="row">
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
                </div>

                <div className="row">
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
                <div className="col-12 col-sm-6">
                  {/* <div className="form-group">
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
                            `https://dts-partnership-dev.s3.ap-southeast-1.amazonaws.com/partnership/files/document_cooperations/${dokument}`
                          )
                        }
                      >
                        Buka File
                      </button>
                    </div>
                  </div> */}
                  {/* start dokument */}
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Dokumen Kerjasama
                </label>
                {/* action show and upload */}
                {/* start action show and upload */}
                <div className="row">
                  <div className="col-sm-12">
                    <div className="d-flex flex-wrap align-items-center">
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
                    viewPDF ? "pdf-container w-100" : "pdf-container d-none"
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
                {/* start action show and upload */}
              </div>
              {/* end dokument */}
                </div>
              </div>

                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="staticEmail" className="col-form-label">
                        Catatan Tambahan
                      </label>
                      <div>
                        <textarea
                        readOnly
                        value={catatanREvisi&&catatanREvisi}
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
