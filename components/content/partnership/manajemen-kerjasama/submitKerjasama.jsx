import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import axios from "axios";
import IconCalender from '../../../assets/icon/Calender'

// pdf import need

// Import the main component
import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"; // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library
import moment from 'moment'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubmitKerjasama = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // pdf file
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");
  const [viewPDF, setViewPDF] = useState(null);
  const [error, setError] = useState({
    period_date_start:"",
    agreement_number_partner:'',
    agreement_number_kemkominfo:'',
    signing_date: '',
    document: '',
})

  const router = useRouter();
  // form data send
  const {
    institution_name,
    date,
    title,
    period,
    periodUnit,
    cooperationC_id,
    AllCooperation,
  } = router.query;
  const [period_date_start, setPeriod_date_start] = useState("");
  const [period_date_end, setPeriod_date_end] = useState("");
  const [agreement_number_partner, setAgreement_number_partner] = useState("");
  const [agreement_number_kemkominfo, setAgreement_number_kemkominfo] =
    useState("");
  const [signing_date, setSigning_date] = useState("");
  const [document, setDocument] = useState("");
  // form data send

const [NamePDF, setNamePDF] = useState(null);
  // onchange pdf
  

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
      console.log("select your file");
    }
  };


  const submit = (e) => {
    e.preventDefault();
    
      if (period_date_start === "") {
        setError({...error,period_date_start:"Harus isi tanggal priode kerjasama"})
    notify("Harus isi tanggal priode kerjasama")
      }  else if (agreement_number_partner === "") {
        setError({...error,agreement_number_partner:"Harus isi nomer perjanjian lembaga"})
    notify("Harus isi nomer perjanjian lembaga")
      } else if (agreement_number_kemkominfo === "") {
        setError({...error,agreement_number_kemkominfo:"Harus isi nomer perjanjian kemkominfo"})
    notify("Harus isi nomer perjanjian kemkominfo")
      } else if (signing_date === "") {
        setError({...error,signing_date:"Harus isi tanggal penandantangan"})
    notify("Harus isi tanggal penandantangan")
      } else if (document === "") {
        setError({...error,document:"Harus unggah file"})
    notify("Harus unggah file")
      } else {
        Swal.fire({
      title: "Apakah anda yakin ?",
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
          formData.append("institution_name", institution_name);
          formData.append("date", date);
          formData.append("title", title);
          formData.append("period", period);
          formData.append("period_unit", periodUnit);
          formData.append("cooperation_category_id", cooperationC_id);

          formData.append("period_date_start", period_date_start);
          formData.append("period_date_end", newDate);
          formData.append("agreement_number_partner", agreement_number_partner);
          formData.append(
            "agreement_number_kemkominfo",
            agreement_number_kemkominfo
          );
          formData.append("signing_date", signing_date);
          formData.append("document", document);
          let parseAllCooperation = JSON.parse(AllCooperation);
          let dataee = parseAllCooperation.map((items, i) => {
            return items.cooperation;
          });
          console.log("dataee",dataee)
          dataee.forEach((item, i) => {
            formData.append(`cooperation_form_content[${i}]`, item);
          });

          try {
            let { data } = await axios.post(
              `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal`,
              formData
            );
            
            // console.log("data sadfasdf",data.data.id)
            router.push(
                                            {
                                              pathname:`/partnership/manajemen-kerjasama/view/${data.data.id}`,
                                              query:{success:true}
                                            }
                                          )
            // alert("data berhasil ditambah");

            // router.push(
            //       "/partnership/manajemen-kerjasama/detail-dokumen-kerjasama"
            //     );
            // router.push({
            //   pathname:`/partnership/manajemen-kerjasama/detail-dokumen-kerjasama`,
            //   query: { success: true },
            // })
            // router.push("/partnership/manajemen-kerjasama");
          } catch (error) {
            alert("gagal menambahkan data tipe file harus pdf");
          }
        }
      });
      }
  };


  const showDocument = () => {
      if (!viewPDF) {
        setViewPDF(pdfFile);
      } else {
        setViewPDF(null);
      }
    
  };

  const [newDate, setNewDate] = useState('')

  const [periodValue, setPeriodValue] = useState('')
  const [periodUnitValue, setPeriodUnitValue] = useState('')

  const checkPeriod = (dateNow) =>{
    // let periodValue = value.period
    // let periodUnitValue = value.periodUnit
    // console.log("periodUnitValue",periodUnitValue)
    // clg

    if(periodUnitValue === "bulan"){
      let futureMonth = moment(dateNow).add(parseInt(periodValue), 'M').format('YYYY-MM-DD');
      console.log("BULAN SEKARANG",moment().format('YYYY-MM-DD'))
      console.log("BULAN UPDATE",futureMonth)
      setNewDate(futureMonth)
    }
    // jika tahun
    else{
      let futureYear = moment(dateNow).add(parseInt(periodValue), 'y').format('YYYY-MM-DD');
      console.log("TAHUN SEKARANG",moment().format('YYYY-MM-DD'))
      console.log("TAHUN UPDATE",futureYear)
      setNewDate(futureYear)
    }
  }

  const onChangePeriodeDateStart = (date) =>{
    setPeriod_date_start(moment(date).format('YYYY-MM-DD'))
    checkPeriod(moment(date).format('YYYY-MM-DD'))
  }

  const notify = (value) =>
    toast.info(`🦄 ${value}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  useEffect(() => {
    // checkPeriod(router.query)
    console.log("router.query.period",router.query.period)
    console.log("router.query.period",router.query.periodUnit)
    setPeriodValue(router.query.period)
    setPeriodUnitValue(router.query.periodUnit)
  }, [router.query])
  
  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
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
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Submit Dokumen Kerjasama
            </h3>
          </div>
          <div className="card-body">
            <form onSubmit={submit}>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Periode Kerjasama
                </label>
                <div className="col-sm-10">
                  <div className="row align-items-right">
                    <div className="col-lg-3 col-xl-3">
                      {/* <input
                        type="date"
                        className="form-control form-control-sm"
                      /> */}
                      <div className="d-flex align-items-center position-relative datepicker-w">
                      <DatePicker
                      onFocus={()=>setError({...error,period_date_start:""})}
                        className="form-search-date form-control-sm form-control cursor-pointer"
                        selected={startDate}
                        
                        onChange={(date) => onChangePeriodeDateStart(date)}
                        
                        selectsStart
                        value={period_date_start}
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="YYYY-MM-DD"
                        placeholderText="Dari Tanggal"
                        minDate={moment().toDate()}
                      />
                      <IconCalender className="right-center-absolute" style={{right:"10px"}} />
                      </div>
                    {error.period_date_start ? <p className="error-text">{error.period_date_start}</p>:"" }
                    </div>
                    <div className="col-lg-3 col-xl-3">
                      {/* <input
                        type="date"
                        // class = form-search-date
                        className="form-control form-control-sm"
                      /> */}
                      <div className="d-flex align-items-center position-relative datepicker-w">
                      <DatePicker
                        className="form-search-date form-control-sm form-control cursor-pointer"
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        readOnly
                        selectsEnd
                        value={newDate}
                        startDate={startDate}
                        endDate={endDate}
                        // minDate={startDate}
                        minDate={moment().toDate()}
                        maxDate={addDays(startDate, 20)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Sampai Tanggal"
                      />
                      <IconCalender className="right-center-absolute" style={{right:"10px"}} />
                      </div>
                      
                      {/* <input
                        required
                        type="date"
                        className="form-control"
                        onChange={(e) => setPeriod_date_end(e.target.value)}
                      /> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Nomer Perjanjian Lembaga
                </label>
                <div className="col-sm-10">
                  <input
                  onFocus={()=>setError({...error,agreement_number_partner:""})}
                    onChange={(e) =>
                      setAgreement_number_partner(e.target.value)
                    }
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Nomor Perjanjian Lembaga"
                  />
                  {error.agreement_number_partner ? <p className="error-text">{error.agreement_number_partner}</p>:"" }
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Nomer Perjanjian Kemkominfo
                </label>
                <div className="col-sm-10">
                  <input
                  onFocus={()=>setError({...error,agreement_number_kemkominfo:""})}
                    onChange={(e) =>
                      setAgreement_number_kemkominfo(e.target.value)
                    }
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Nomor Perjanjian Kemkominfo"
                  />
                  {error.agreement_number_kemkominfo ? <p className="error-text">{error.agreement_number_kemkominfo}</p>:"" }
                  
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Tanggal Penandantangan
                </label>
                <div className="col-sm-10">
                  <div className="row align-items-right">
                    <div className="col-lg-3 col-xl-3">
                      <div className="d-flex align-items-center position-relative datepicker-w">
                      <DatePicker
                        className="form-search-date form-control-sm form-control cursor-pointer"
                        selected={endDate}
onFocus={()=>setError({...error,signing_date:""})}
                        onChange={(date) => setSigning_date(moment(date).format('YYYY-MM-DD'))}
                        value={signing_date}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        // minDate={startDate}
                        minDate={moment().toDate()}
                        maxDate={addDays(startDate, 20)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Sampai Tanggal"
                      />
                      <IconCalender className="right-center-absolute" style={{right:"10px"}} />
                      </div>
                      {error.signing_date ? <p className="error-text">{error.signing_date}</p>:"" }
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Upload Dokumen Kerjasama
                </label>
                <div className="col-sm-3">
                  <div className="input-group">
                    <div className="custom-file">
                      <input
                      onFocus={()=>setError({...error,document:""})}
                        type="file"
                        name="gambar"
                        className="custom-file-input cursor-pointer"
                        id="inputGroupFile04"
                        accept=".pdf"
                        
                        onChange={handlePdfFileChange}
                      />
                      <label className="custom-file-label" htmlFor="inputGroupFile04">
                        
                        {NamePDF ? NamePDF : "Cari Dokumen"}
                      </label>
                    </div>
                  </div>
                  {pdfFile ? (
                    <div className="mt-3">
                      <button
                        className="btn btn-primary btn-sm mr-2"
                        type="button"
                        // onClick={() => setViewPDF(pdfFile ? pdfFile : null)}
                        onClick={() => showDocument()}
                      >
                        {viewPDF?"Tutup Dokument":"Tampilkan dokumen"}
                        
                      </button>
                      {/* <button
                        className="btn bg-light-danger btn-sm"
                        type="button"
                        onClick={() => setViewPDF(null)}
                      >
                        Tutup dokumen
                      </button> */}
                    </div>
                  ) : (
                    ""
                  )}
                  {error.document ? <p className="error-text">{error.document}</p>:"" }
                </div>
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

              <div className="form-group row">
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                  <Link href="/partnership/manajemen-kerjasama">
                    <a
                      className="btn bg-light-danger mr-2 btn-sm"
                      style={{ color: "red" }}
                    >
                      Batalkan
                    </a>
                  </Link>

                  {/* <Link href="/partnership/manajemen-kerjasama/detail-dokumen-kerjasama"> */}
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    // onClick={(e) => submit(e)}
                  >
                    Submit
                  </button>
                  {/* </Link> */}
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
