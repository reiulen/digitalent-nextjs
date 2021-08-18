import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

// pdf import need

// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library

const SubmitKerjasama = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // pdf file
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [pdfFile, setPdfFile] = useState(null)
const [pdfFileError, setPdfFileError] = useState('')
const [viewPDF, setViewPDF] = useState(null)
  
  const router = useRouter();
  const {cooperation1,cooperation2,cooperation3,cooperationC_id,date,period,periodUnit,title} = router.query
  // onchange pdf
  const fileType=['application/pdf']
  const handlePdfFileChange = (e) =>{
    let selectedFile = e.target.files[0];
    if(selectedFile){
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) =>{
          setPdfFile(e.target.result);
          setPdfFileError('')
        }
      }else{
        setPdfFile(null);
        setPdfFileError('Please selet valid pdf file')
      }
    }else{
      console.log("select your file")
    }

  }
  // form data send
  const [period_date_start, setPeriod_date_start] = useState("")
  const [period_date_end, setPeriod_date_end] = useState("")
  const [agreement_number_partner, setAgreement_number_partner] = useState("")
  const [agreement_number_kemkominfo, setAgreement_number_kemkominfo] = useState("")
  const [signing_date, setSigning_date] = useState("")
  const [document, setDocument] = useState("")
  // form data send
  const Swal = require("sweetalert2");

  const submit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Apakah anda yakin ?",
      // text: "Data ini tidak bisa dikembalikan !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya !",
      dismissOnDestroy: false,
    }).then((result) => {
      if (result.value) {
        // console.log(object)
        // router.push(
        //   "/partnership/manajemen-kerjasama/detail-dokumen-kerjasama"
        // );

        // pdf submit
        if(pdfFile!==null){
          setViewPDF(pdfFile)
        }else{
          setViewPDF(null)
        }
      }
    });
  };
  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
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
                    <div className="col-lg-3 col-xl-3 mt-5 mt-lg-5">
                      {/* <input
                        type="date"
                        className="form-control form-control-sm"
                      /> */}
                      {/* <DatePicker
                        className="form-search-date form-control-sm form-control"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Dari Tanggal"
                        // minDate={addDays(new Date(), 20)}
                      /> */}
                      <input type="date" className="form-control" onChange={(e)=>setPeriod_date_start(e.target.value)}/>
                    </div>
                    <div className="col-lg-3 col-xl-3 mt-5 mt-lg-5">
                      {/* <input
                        type="date"
                        // class = form-search-date
                        className="form-control form-control-sm"
                      /> */}
                      {/* <DatePicker
                        className="form-search-date form-control-sm form-control"
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        maxDate={addDays(startDate, 20)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Sampai Tanggal"
                      /> */}
                      <input type="date" className="form-control" onChange={(e)=>setPeriod_date_end(e.target.value)}/>
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
                  onChange={(e)=>setAgreement_number_partner(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Nomor Perjanjian Lembaga"
                  />
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
                  onChange={(e)=>setAgreement_number_kemkominfo(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Nomor Perjanjian Kemkominfo"
                  />
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
                    <div className="col-lg-3 col-xl-3 mt-5 mt-lg-5">
                      {/* <DatePicker
                        className="form-search-date form-control-sm form-control"
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        maxDate={addDays(startDate, 20)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Dari Tanggal"
                      /> */}
                      <input type="date" className="form-control" onChange={(e)=>setSigning_date(e.target.value)}/>
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
                  <div class="input-group">
                    <div class="custom-file">
                      <input
                        type="file"
                        name="gambar"
                        class="custom-file-input"
                        id="inputGroupFile04"
                        required
                        onChange={handlePdfFileChange}
                      />
                      <label class="custom-file-label" for="inputGroupFile04">
                        Cari Dokumen
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {pdfFileError&&<div>{pdfFileError}</div>}

              <div className='pdf-container'>
        {/* show pdf conditionally (if we have one)  */}
        {viewPDF&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
          <Viewer fileUrl={viewPDF}
            plugins={[defaultLayoutPluginInstance]} />
      </Worker></>}

      {/* if we dont have pdf or viewPDF state is null */}
      {!viewPDF&&<>No pdf file selected</>}
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
