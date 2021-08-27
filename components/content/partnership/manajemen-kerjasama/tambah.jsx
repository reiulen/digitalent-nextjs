import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  setNameLembaga,
  fetchDataEmail,
  fetchListSelectCooperation,
  fetchListCooperationSelect,
  fetchListCooperationSelectById,
  changeCooperationSelectByID,
  fetchListSelectMitra
} from "../../../../redux/actions/partnership/managementCooporation.actions";
import moment from 'moment'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tambah = () => {
  const dispatch = useDispatch()
  const allMK = useSelector((state) => state.allMK);
  const [pagees, setPagees] = useState(false)
  console.log("allMK",allMK)
  // state form data 1
  const [institution_name, setInstitution_name] = useState("")
  const changeInstitusi = (value) =>{
    setInstitution_name(value)
    dispatch(setNameLembaga(value))
  }
  const [error, setError] = useState({
    institution_name:"",
    date:'',
    title: '',
    period: '',
    periodUnit: '',
    cooperationC_id: '',
    AllCooperation:'',
})
  const [date, setDate] = useState("")
  const [title, setTitle] = useState("")
  const [period, setPeriod] = useState("")
  const [periodUnit, setPeriodUnit] = useState("tahun")
  const [cooperationC_id, setCooperationC_id] = useState("")
  console.log("cooperationC_id",cooperationC_id)
  const changeSetCooperationC_id = (value) =>{
    setCooperationC_id(value)
    dispatch(changeCooperationSelectByID(value))
  }
  const [AllCooperation, setAllCooperation] = useState("")
  const changeFormCooporation = (index,e) =>{
    let dataaa = [...allMK.singleCooporationSelect.data.option]
    dataaa[index].cooperation = e.target.value
    setAllCooperation(dataaa)
  }
  

  const router = useRouter();
  const Swal = require("sweetalert2");
  
  const submit = (e) => {
    e.preventDefault();
    
  if (institution_name === "") {
    setError({...error,institution_name:"Harus pilih nama lembaga"})
    notify("Harus pilih nama lembaga")
  } else if (date === "") {
    setError({...error,date:"Filed tanggal tidak boleh kosong"})
    notify("Filed tanggal tidak boleh kosong")
  } else if (title === "") {
    setError({...error,title:"Filed judul kerjasama tidak boleh kosong"})
    notify("Filed judul kerjasama tidak boleh kosong")
  } else if (cooperationC_id === "") {
    setError({...error,cooperationC_id:"Filed kategori kerjasama tidak boleh kosong"})
    notify("Filed kategori kerjasama tidak boleh kosong")
  }else if (period === "") {
    setError({...error,period:"Filed periode tidak boleh kosong"})
    notify("Filed periode tidak boleh kosong")
  } else if (periodUnit === "") {
    setError({...error,periodUnit:"Filed period unit tidak boleh kosong"})
    notify("Filed period unit tidak boleh kosong")
  }  else if (AllCooperation === "") {
    setError({...error,AllCooperation:"Filed kerjasama form tidak boleh kosong"})
    notify("Filed kerjasama form tidak boleh kosong")
  } else {
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
    if(result.value){

      router.push({
        pathname: '/partnership/manajemen-kerjasama/submit',
        query: { institution_name:institution_name,date: date,title:title,period:period,periodUnit:periodUnit,cooperationC_id:cooperationC_id,AllCooperation:JSON.stringify(AllCooperation) },
      })
    }
  })
  }
  
  };
  // onChange validate period setPeriod(e.target.value)
  const onChangePeriod = (e) =>{
    const regex = new RegExp(/[^0-9]/, 'g');
    const val = e.target.value;
    if (val.match(regex)) {
      // alert("Masukan angka");
      setError({...error,period:"Masukan angka"})
      notify("Masukan angka")
      setPeriod("")
    }else{
      setPeriod(e.target.value)
    }
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
    dispatch(fetchDataEmail())
    dispatch(fetchListSelectCooperation())
    dispatch(fetchListCooperationSelect())
    dispatch(fetchListCooperationSelectById(cooperationC_id))
    dispatch(fetchListSelectMitra())
    setDate(moment(new Date()).format("YYYY-MM-DD"))
  }, [dispatch,allMK.institution_name,allMK.idCooporationSelect,cooperationC_id])
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
              Tambah Kerjasama
            </h3>
          </div>
          <div className="card-body">
            <form onSubmit={submit}>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Nama Lembaga
                </label>
                <div className="col-sm-3">
                  <select onFocus={()=>setError({...error,institution_name:""})} className="form-control" onChange={(e)=>changeInstitusi(e.target.value)}>
                    <option value="">Pilih lembaga</option>
                    {allMK.stateListMitra.length=== 0?"":allMK.stateListMitra.data.map((items,index)=>{
                      return(
                        <option key={index} value={items.name}>{items.name}</option>
                        )
                    })}
                  </select>
                  {error.institution_name ? <p className="error-text">{error.institution_name}</p>:"" }
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Email
                </label>
                <div className="col-sm-6">
                  <input readOnly type="text" value={allMK.email} className="form-control" placeholder="Masukan nama lembaga" />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Tanggal
                </label>
                <div className="col-sm-3">
                  <input  readOnly value={date} type="text" className="form-control" />
              {error.date ? <p className="error-text">{error.date}</p>:"" }
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
                  onFocus={()=>setError({...error,title:""})}
                    type="text"
                    className="form-control"
                    placeholder="Judul Kerjasama"
                    onChange={(e)=>setTitle(e.target.value)}
                  />
                  {error.title ? <p className="error-text">{error.title}</p>:"" }
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Kategori kerjasama
                </label>
                <div className="col-sm-10">
                  <select onFocus={()=>setError({...error,cooperationC_id:""})}  onChange={(e)=>changeSetCooperationC_id(e.target.value)} name="" id="" className="form-control">
                    <option value="">Pilih Kategory Kerjasama</option>
                    {allMK.cooperationActiveSelect.length === 0 ? "":allMK.cooperationActiveSelect.data.map((items,index) =>{
                      return(
                        <option key={index} value={items.id}>{items.cooperation_categories}</option>
                        )
                      })}
                  </select>
                  {error.cooperationC_id ? <p className="error-text">{error.cooperationC_id}</p>:"" }
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
                      onFocus={()=>setError({...error,period:""})}
                      value={period} className="form-control" placeholder="Masukan periode masa periode misal 1 atau 2" type="text" onChange={(e)=>onChangePeriod(e) } />
                      {error.period ? <p className="error-text">{error.period}</p>:"" }
                      {/* <DatePicker
                        className="form-control-sm form-control"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Dari Tanggal"
                        // minDate={addDays(new Date(), 20)}
                      /> */}
                    </div>
                    <div className="col-lg-3 col-xl-3 mt-5 mt-lg-5">
                      {/* <DatePicker
                        className="form-control-sm form-control"
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

                      {/* <select onFocus={()=>setError({...error,periodUnit:""})}  className="form-control" onChange={(e)=>setPeriodUnit(e.target.value)}>
                        <option value="">Pilih periode bulan/tahun</option>
                        <option value="bulan">Bulan</option>
                        <option value="tahun">Tahun</option>
                      </select> */}
                      <div className="form-control">
                          Tahun
                      </div>
                      {/* {error.periodUnit ? <p className="error-text">{error.periodUnit}</p>:"" } */}
                    </div>
                  </div>
                </div>
              </div>

              {/* looping */}
              {allMK.singleCooporationSelect.length === 0 ?"": allMK.singleCooporationSelect.data.option.map((items,index)=>{
                return(
                  
                  <div className="form-group row" key={index}>
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                  >
                  {
                    items.cooperation_form}
                </label>
                <div className="col-sm-10">
                  <textarea 
                  onFocus={()=>setError({...error,AllCooperation:""})}
                  onChange={(e)=>changeFormCooporation(index,e)}
                    name="cooperation"
                    id=""
                    cols="30"
                    rows="5"
                    className="form-control"
                    placeholder="Masukan Tujuan Kerjasama"
                    ></textarea>
                    {error.AllCooperation ? <p className="error-text">{error.AllCooperation}</p>:"" }
                </div>
              </div>
                )
              })
              }
  {/* end loopingg */}
              <div className="form-group row">
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                  <Link href="/partnership/manajemen-kerjasama">
                    <a className="btn btn-outline-primary mr-2 btn-sm">
                      Kembali
                    </a>
                  </Link>
                  {/* <Link href="/partnership/manajemen-kerjasama/submit "> */}
                  {/* <a className="btn btn-outline-primary mr-2 btn-sm">
                      Kembali
                    </a> */}
                  <button
                  type="submit"
                    className="btn btn-primary btn-sm"
                    // onClick={(e) => submit(e)}
                  >
                    Lanjut
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

export default Tambah;
