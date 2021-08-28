import React, { useState, useRef, useEffect } from "react";

import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  fetchListSelectCooperation,
  cancelChangeCategory,
  cancelChangeNamaLembaga,
  changeCooperationSelectByID,
  fetchListCooperationSelectById,
  fetchListSelectMitra,
  getEmail,
  setNameLembaga,
  fetchDataEmail,
} from "../../../../redux/actions/partnership/managementCooporation.actions";
import IconCalender from '../../../assets/icon/Calender'
import moment from 'moment'


import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const EditDokumentKerjasamaById = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  let {idDetail} = router.query
  
  const allMK = useSelector((state) => state.allMK);
  console.log("allMK", allMK);
  //
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  //
  // state onchange form data
  let singleproduct = useSelector((state) => state.allMK);
  // console.log("singleproduct",singleproduct)
  const [isntitusiName, setIsntitusiName] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [cooperationID, setCooperationID] = useState("");
  const [cooperationC_id, setCooperationC_id] = useState("");
  const [period, setPeriod] = useState("");
  const [periodUnit, setPeriodUnit] = useState("tahun");
  console.log("periodUnit", periodUnit);
  const [periodDateStart, setPeriodDateStart] = useState("");
  console.log("periodDateStart",periodDateStart)
  const [periodDateEnd, setPeriodDateEnd] = useState("");
  const [aggrementNumber, setAggrementNumber] = useState("");
  const [aggrementNumberInfo, setAggrementNumberInfo] = useState("");
  const [signinDate, setSigninDate] = useState("");
  const [email, setEmail] = useState("");

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
  // console.log("viewPDF",viewPDF)

  

  const handleSubmit = async () => {
    // e.preventDefault();
    console.log("edit")
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
        formData.append("title", title);
        formData.append("date", date);
        formData.append("period", period);
        formData.append("period_unit", periodUnit);

        if (documentLocal === "") {
          console.log("object");
        } else {
          formData.append("document", documentLocal);
        }
        

        formData.append("period_date_start", periodDateStart);
        formData.append("period_date_end", periodDateEnd);
        formData.append("agreement_number_partner", aggrementNumber);
        formData.append("agreement_number_kemkominfo", aggrementNumberInfo);
        formData.append("signing_date", signinDate);

      
        if (AllCooperation === "") {
          // start data default
          formData.append("cooperation_category_id", cooperationID.id);
          let dataee = cooperationID.data_content.map((items, i) => {
            return items.form_content;
          });
          dataee.forEach((item, i) => {
            formData.append(`cooperation_form_content[${i}]`, item);
          });
          // end data default
        } else {
          // start jika tidak default
          formData.append("cooperation_category_id", cooperationC_id);
          let ez = AllCooperation.map((items, i) => {
            return items.cooperation;
          });
          ez.forEach((item, i) => {
            formData.append(`cooperation_form_content[${i}]`, item);
          });
          // end jika tidak default
        }


        try {
          let { data } = await axios.post(
            `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/${router.query.id}`,
            formData
          );

//           Swal.fire(
//   'Berhasil update data!',
//   'success'
// )

          router.push({
            pathname:'/partnership/manajemen-kerjasama/',
            query:{update:true},
          })
          
        } catch (error) {
console.log("error.response",error.response)
notify(error.response.data.message)
        }
      }
    });
  };


  const changeSetCooperationC_id = (value) => {
    setCooperationC_id(value);
    dispatch(changeCooperationSelectByID(value));
  };

  const setDataSingle = async (id) => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/${id}`
      );
      console.log("data",data)
      setIsntitusiName(data.data.institution_name);
      setTitle(data.data.title);
      setDate(data.data.submission_date);
      setCooperationID(data.data.cooperation_category);
      setPeriod(data.data.period);
      setPeriodUnit(data.data.period_unit);
      setPeriodDateStart(data.data.period_date_start);
      setPeriodDateEnd(data.data.period_date_end);
      setAggrementNumber(data.data.agreement_number_partner);
      setAggrementNumberInfo(data.data.agreement_number_kemkominfo);
      setSigninDate(data.data.signing_date);
      setDocument(data.data.document_file);
      setEmail(data.data.email);
      

    } catch (error) {
      console.log("action getSIngle gagal", error);
    }
  };


  const [AllCooperation, setAllCooperation] = useState("");
  console.log(AllCooperation, "AllCooperation");
  const changeFormCooporation = (index, e) => {
    let dataaa = [...allMK.singleCooporationSelect.data.option];
    dataaa[index].cooperation = e.target.value;
    console.log("dataaa",dataaa)
    setAllCooperation(dataaa);
  };

  // onchange textarea default cooperationID
  const changeDataContentDefault = (event, i) => {
    // console.log("object")
    let dataCoopertaion = { ...cooperationID };
    dataCoopertaion.data_content[i].form_content = event.target.value;
    console.log("dataCoopertaion",dataCoopertaion)
    setCooperationID(dataCoopertaion);
  };
  console.log("cooperationID",cooperationID)

  const changeInstitusi = (value) => {
    setIsntitusiName(value);
    dispatch(setNameLembaga(value));
  };

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
    setDataSingle(router.query.id);
    dispatch(cancelChangeCategory());
    dispatch(cancelChangeNamaLembaga());
  }, [dispatch,router.query.id]);
  useEffect(() => {
    dispatch(fetchListCooperationSelectById(cooperationC_id));
  }, [dispatch,allMK.idCooporationSelect,cooperationC_id]);
  useEffect(() => {
    dispatch(fetchDataEmail());
  }, [dispatch,allMK.institution_name, allMK.stateListMitra]);
  return (
    <PageWrapper>
      
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <ToastContainer
          position="top-right"
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
              Detail Dokumen Kerjasama
            </h3>
          </div>

          <div className="card-body">
            <form>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Tanggal
                </label>
                <div className="col-sm-3">
                  <input
                  readOnly
                    type="date"
                    required
                    value={date}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Judul kerjasama
                </label>
                <div className="col-sm-10">
                  <input
                    required
                    readOnly
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Judul Kerjasama"
                  />
                </div>
              </div>

              {/* start list kategory */}
              {allMK.stateListKerjaSama.length === 0 ? (
                <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-2 col-form-label"
                  >
                    Kategori kerjasama
                  </label>
                  <div className="col-sm-10">
                    <select
                      name=""
                      id=""
                      className="form-control"
                      disabled
                      value={cooperationID.id}
                      // onChange={(e) => setKategoriId(e.target.value)}
                    >
                      <option>{cooperationID.name}</option>
                    </select>
                  </div>
                  {/* <button
                    type="button"
                    className="col-sm-3 btn btn-primary btn-sm"
                    onClick={() => dispatch(fetchListSelectCooperation())}
                  >
                    Ubah Kategory
                  </button> */}
                </div>
              ) : (
                <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-2 col-form-label"
                  >
                    Kategori kerjasama
                  </label>
                  <div className="col-sm-7">
                    <select
                      required
                      onChange={(e) => changeSetCooperationC_id(e.target.value)}
                      name=""
                      id=""
                      className="form-control"
                    >
                      <option value="">Pilih Kategory Kerjasama</option>
                      {allMK.stateListKerjaSama.length === 0
                        ? ""
                        : allMK.stateListKerjaSama.data.map((items,i) => {
                            return (
                              <option key={i} value={items.id}>
                                {items.cooperation_categories}
                              </option>
                            );
                          })}
                    </select>
                  </div>
                  <button
                    type="button"
                    className="col-sm-3 btn btn-primary btn-sm"
                    onClick={() => dispatch(cancelChangeCategory())}
                  >
                    Batal Ubah Kategory
                  </button>
                </div>
              )}
              {/* end list kategory */}
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
                        required
                        readOnly
                        type="number"
                        className="form-control"
                        onChange={(e) => setPeriod(e.target.value)}
                        value={period}
                      />
                    </div>
                    <div className="col-lg-3 col-xl-3 mt-5 mt-lg-5">
                      {/* {periodUnit === "bulan" ? (
                        <select
                          className="form-control"
                          onChange={(e) => setPeriodUnit(e.target.value)}
                        >
                          <option value="bulan">Bulan</option>
                          <option value="tahun">Tahun</option>
                        </select>
                      ) : (
                        <select
                          className="form-control"
                          onChange={(e) => setPeriodUnit(e.target.value)}
                        >
                          <option value="tahun">Tahun</option>
                          <option value="bulan">Bulan</option>
                        </select>
                      )} */}
                      <div className="form-control">
                          Tahun
                      </div>
                      {/* <input
                      required
                        type="text"
                        className="form-control"
                        value={periodUnit}
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
                  Periode Kerjasama
                </label>
                <div className="col-sm-10">
                  <div className="row align-items-right">
                    <div className="col-lg-3 col-xl-3 mt-5 mt-lg-5">
                      {/* <input
                        required
                        type="date"
                        onChange={(e) => setPeriodDateStart(e.target.value)}
                        value={periodDateStart}
                        className="form-control"
                      /> */}

                      <div className="d-flex align-items-center position-relative datepicker-w">
                      <DatePicker
                      readOnly
                        className="form-search-date form-control-sm form-control cursor-pointer"
                        // selected={periodDateStart}
                        onChange={(date) => setPeriodDateStart(moment(date).format('YYYY-MM-DD'))}
                        value={periodDateStart}
                        // selectsEnd
                        // startDate={startDate}
                        // endDate={endDate}
                        // minDate={startDate}
                        minDate={moment().toDate()}
                        // maxDate={addDays(startDate, 20)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Sampai Tanggal"
                      />
                      <IconCalender className="right-center-absolute" style={{right:"10px"}} />
                      </div>

                    </div>
                    <div className="col-lg-3 col-xl-3 mt-5 mt-lg-5">
                      <div className="d-flex align-items-center position-relative datepicker-w">
                      <DatePicker
                      readOnly  
                        className="form-search-date form-control-sm form-control cursor-pointer"
                        // selected={periodDateStart}
                        onChange={(date) => setPeriodDateEnd(moment(date).format('YYYY-MM-DD'))}
                        value={periodDateEnd}
                        // selectsEnd
                        // startDate={startDate}
                        // endDate={endDate}
                        // minDate={startDate}
                        minDate={moment().toDate()}
                        // maxDate={addDays(startDate, 20)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Sampai Tanggal"
                      />
                      <IconCalender className="right-center-absolute" style={{right:"10px"}} />
                      </div>
{/* 
                      <input
                        required
                        onChange={(e) => setPeriodDateEnd(e.target.value)}
                        type="date"
                        value={periodDateEnd}
                        className="form-control"
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
                    Nama Lembaga
                  </label>
                  <div className="col-sm-10">
                    <div aria-readonly disabled className="form-control">
                      {isntitusiName}
                    </div>
                  </div>
                </div>

              {/* {allMK.stateListMitra.length === 0 ? (
                <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-2 col-form-label"
                  >
                    Nama Lembaga
                  </label>
                  <div className="col-sm-7">
                    <select aria-readonly disabled className="form-control">
                      <option value={isntitusiName}>{isntitusiName}</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    className="col-sm-3 btn btn-primary btn-sm"
                    onClick={() => dispatch(fetchListSelectMitra())}
                  >
                    Ubah Nama Lembaga
                  </button>
                </div>
              ) : (
                <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-2 col-form-label"
                  >
                    Nama Lembaga
                  </label>
                  <div className="col-sm-7">
                    <select
                      required
                      className="form-control"
                      onChange={(e) => changeInstitusi(e.target.value)}
                    >
                      <option value="">Pilih lembaga</option>
                      {allMK.stateListMitra.length === 0
                        ? ""
                        : allMK.stateListMitra.data.map((items, index) => {
                            return (
                              <option value={items.name}>{items.name}</option>
                            );
                          })}
                    </select>
                  </div>
                  <button
                    type="button"
                    className="col-sm-3 btn btn-primary btn-sm"
                    onClick={() => dispatch(cancelChangeNamaLembaga())}
                  >
                    Batal Ubah
                  </button>
                </div>
              )} */}

              <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-2 col-form-label"
                  >
                    Email
                  </label>
                  <div className="col-sm-10">
                    <p className="form-control">{email}</p>
                  </div>
                </div>

              {/* {allMK.email === "-" ? (
                <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-2 col-form-label"
                  >
                    Email
                  </label>
                  <div className="col-sm-3">
                    <p className="form-control">{email}</p>
                  </div>
                </div>
              ) : (
                <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-2 col-form-label"
                  >
                    Email
                  </label>
                  <div className="col-sm-3">
                    <p className="form-control">{allMK.email}</p>
                  </div>
                </div>
              )} */}

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Nomor Perjanjian Lembaga
                </label>
                <div className="col-sm-10">
                  {/* <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Nomor Perjanjian Lembaga"
                  /> */}
                  <input
                    required
                    readOnly
                    onChange={(e) => setAggrementNumber(e.target.value)}
                    type="text"
                    value={aggrementNumber}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Nomor Perjanjian KemKominfo
                </label>
                <div className="col-sm-10">
                  {/* <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Nomor Perjanjian Kemkominfo"
                  /> */}
                  <input
                  readOnly
                    required
                    type="text"
                    onChange={(e) => setAggrementNumberInfo(e.target.value)}
                    value={aggrementNumberInfo}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Tanggal Penandatanganan
                </label>
                <div className="col-sm-10">
                  <div className="row align-items-right">
                    <div className="col-lg-3 col-xl-3 mt-5 mt-lg-5">
                      {/* <input
                        required
                        onChange={(e) => setSigninDate(e.target.value)}
                        value={signinDate}
                        type="date"
                        className="form-control form-control-sm"
                      /> */}

                      <div className="d-flex align-items-center position-relative datepicker-w">
                      <DatePicker
                      readOnly
                        className="form-search-date form-control-sm form-control cursor-pointer"
                        // selected={periodDateStart}
                        onChange={(date) => setSigninDate(moment(date).format('YYYY-MM-DD'))}
                        value={signinDate}
                        // selectsEnd
                        // startDate={startDate}
                        // endDate={endDate}
                        // minDate={startDate}
                        minDate={moment().toDate()}
                        // maxDate={addDays(startDate, 20)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Sampai Tanggal"
                      />
                      <IconCalender className="right-center-absolute" style={{right:"10px"}} />
                      </div>

                      
                    </div>
                  </div>
                </div>
              </div>

              {/* start dokument */}
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Dokumen Kerjasama
                </label>
                {/* action show and upload */}
                {/* start action show and upload */}
                <div className="col-sm-10">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm mr-3"
                    onClick={() => showDocument()}
                  >
                    {viewPDF || showDokument
                      ? "Tutup dokument"
                      : "Lihat dokumen"}
                  </button>
                  {/* <button
                    type="button"
                    className="btn btn-primary btn-sm mr-3"
                    onClick={() => setDocumentChange()}
                  >
                    {!changeDokumen ? "Ubah dokumen" : "Batal Ubah"}
                  </button> */}

                  {changeDokumen && !viewPDF ? (
                    <div className="input-group mt-3">
                      <div className="custom-file">
                        <input
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
                    src={`http://dts-partnership-dev.majapahit.id/storage/partnership/files/document_cooperations/${document}`}
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

              {/* start first loop */}

              {cooperationID === ""
                ? ""
                : cooperationID.data_content.map((items, i) => {
                    return (
                      <div key={i}
                        className={`form-group row ${
                          allMK.stateListKerjaSama.length !== 0 ? "d-none" : ""
                        }`}
                      >
                        <label
                          htmlFor="staticEmail"
                          className="col-sm-2 col-form-label"
                        >
                          {items.cooperation_form}
                        </label>
                        <div className="col-sm-10">
                          <textarea
                          readOnly
                            onChange={(e) => changeDataContentDefault(e, i)}
                            value={items.form_content}
                            name=""
                            id={i}
                            cols="30"
                            rows="5"
                            className="form-control"
                            placeholder="Masukkan Tujuan Kerjasama disini"
                          ></textarea>
                        </div>
                      </div>
                    );
                  })}
              {/* loop first end loop*/}

              {/* looping second */}
              {allMK.singleCooporationSelect.length === 0
                ? ""
                : allMK.singleCooporationSelect.data.option.map(
                    (items, index) => {
                      return (
                        <div
                        key={index}
                          className={`form-group row ${
                            allMK.stateListKerjaSama.length === 0
                              ? "d-none"
                              : ""
                          }`}
                        >
                          <label
                            htmlFor="staticEmail"
                            className="col-sm-2 col-form-label"
                          >
                            {items.cooperation_form}
                          </label>
                          <div className="col-sm-10">
                            <textarea
                              required
                              onChange={(e) => changeFormCooporation(index, e)}
                              name="cooperation"
                              id={index+1}
                              cols="30"
                              rows="5"
                              className="form-control"
                              placeholder="Masukan Tujuan Kerjasama"
                            ></textarea>
                          </div>
                        </div>
                      );
                    }
                  )}
              {/* end looping second */}
              <div className="form-group row">
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                  <Link
                    href={`/partnership/manajemen-mitra/detail/${idDetail}`}
                    className="mr-2"


          //  router.push({
          //   pathname:`/partnership/manajemen-mitra/detail/${idDetail}`,
          //   query:{update:true},
          // })
                  >
                    <a className="btn btn-outline-primary mr-2 btn-sm">
                      Kembali
                    </a>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => handleSubmit()}
                  >
                    Ubah
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

export default EditDokumentKerjasamaById;
