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
  const [date, setDate] = useState("")
  const [title, setTitle] = useState("")
  const [period, setPeriod] = useState("")
  const [periodUnit, setPeriodUnit] = useState("")

  // const [listSelectCooperation, setListSelectCooperation] = useState([])
  // console.log("listSelectCooperation",listSelectCooperation)
  const [cooperationC_id, setCooperationC_id] = useState("")
  const changeSetCooperationC_id = (value) =>{
    setCooperationC_id(value)
    dispatch(changeCooperationSelectByID(value))

    // let _temp = [];
    // let add_temp = {..._temp,}
    // console.log("value",value)
    // console.log("asdasd",allMK.cooperationActiveSelect.data)

    // console.log(allMK.cooperationActiveSelect.data.filter((items,i)=>{return items.id === 1}))
    // let dataCooporationActive = allMK.cooperationActiveSelect.data.filter(items=>items.id === value)
    // setListSelectCooperation(dataCooporationActive)

    // console.log("dataCooporationActive",dataCooporationActive)
  }
  // const [cooperation1, setCooperation1] = useState("")
  // const [cooperation2, setCooperation2] = useState("")
  // const [cooperation3, setCooperation3] = useState("")
  const [AllCooperation, setAllCooperation] = useState("")
  const changeFormCooporation = (index,e) =>{

    // console.log(allMK.singleCooporationSelect.data.option)

    let dataaa = [...allMK.singleCooporationSelect.data.option]

    dataaa[index].cooperation = e.target.value
    setAllCooperation(dataaa)


    // console.log("dataaa[index]",dataaa[index])



  }
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  // end state form data 1
  
  const handleSubmit =(e)=>{
    e.preventDefault();
    // console.log("date",date)
    // console.log("title",title)
    // console.log("period",period)
    // console.log("periodUnit",periodUnit)
    // console.log("cooperationC_id",cooperationC_id)
    // console.log("cooperation1",cooperation1)
    // console.log("cooperation2",cooperation2)
    // console.log("cooperation3",cooperation3)
  }
  

  const router = useRouter();
  const Swal = require("sweetalert2");
  
  const submit = (e) => {
    e.preventDefault();
    // Swal.fire({
    //   title: "Apakah anda yakin ?",
    //   // text: "Data ini tidak bisa dikembalikan !",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   cancelButtonText: "Batal",
    //   confirmButtonText: "Ya !",
    //   dismissOnDestroy: false,
    // }).then((result) => {
      if (institution_name === "") {
      alert('ada data yg belum terisi')
  } else if (date === "") {
      alert('ada data yg belum terisi')
  } else if (title === "") {
      alert('ada data yg belum terisi')
  } else if (date === "") {
      alert('ada data yg belum terisi')
  } else if (period === "") {
      alert('ada data yg belum terisi')
  } else if (periodUnit === "") {
      alert('ada data yg belum terisi')
  } else if (cooperationC_id === "") {
      alert('ada data yg belum terisi')
  } else if (AllCooperation === "") {
      alert('ada data yg belum terisi')
  } else {
      // return;
      // if (result.value) {
        // router.push("/partnership/manajemen-kerjasama/submit");
        console.log("AllCooperationdasdas",AllCooperation)
    
        
    
        
    
    
        router.push({
          pathname: '/partnership/manajemen-kerjasama/submit',
          query: { institution_name:institution_name,date: date,title:title,period:period,periodUnit:periodUnit,cooperationC_id:cooperationC_id,AllCooperation:JSON.stringify(AllCooperation) },
        })
    
      // }
  }
// });
  
  };
  
  useEffect(() => {
    dispatch(fetchDataEmail())
    dispatch(fetchListSelectCooperation())
    dispatch(fetchListCooperationSelect())
    dispatch(fetchListCooperationSelectById(cooperationC_id))
    dispatch(fetchListSelectMitra())
    // console.log("state all cop",allMK.singleCooporationSelect)
    
    // setCooperationALl({})
  }, [allMK.institution_name,allMK.idCooporationSelect])
  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
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
                  {/* <input type="text" value={allMK.name_lembaga} onChange={(e)=>dispatch(setNameLembaga(e.target.value))} className="form-control" placeholder="Masukan nama lembaga" /> */}
                  {/* <select className="form-control" onChange={(e)=>dispatch(setNameLembaga(e.target.value))}> */}
                  <select required className="form-control" onChange={(e)=>changeInstitusi(e.target.value)}>
                    <option value="">Pilih lembaga</option>
                    {allMK.stateListMitra.length=== 0?"":allMK.stateListMitra.data.map((items,index)=>{
                      return(
                        <option value={items.name}>{items.name}</option>
                        )
                    })}
                  </select>
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
                  <input required type="date" onChange={(e)=>setDate(e.target.value)} className="form-control" />
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
                  <input required
                    type="text"
                    className="form-control"
                    placeholder="Judul Kerjasama"
                    onChange={(e)=>setTitle(e.target.value)}
                  />
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
                  <select required onChange={(e)=>changeSetCooperationC_id(e.target.value)} name="" id="" className="form-control">
                    <option value="">Pilih Kategory Kerjasama</option>
                    {allMK.cooperationActiveSelect.length === 0 ? "":allMK.cooperationActiveSelect.data.map(items =>{
                      return(
                        <option value={items.id}>{items.cooperation_categories}</option>
                      )
                    })}
                  </select>
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
                      <input required className="form-control" placeholder="Masukan periode masa periode misal 1 atau 2" type="number" onChange={(e)=>setPeriod(e.target.value)} />
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
                      <select required className="form-control" onChange={(e)=>setPeriodUnit(e.target.value)}>
                        <option value="">Pilih periode bulan/tahun</option>
                        <option value="bulan">Bulan</option>
                        <option value="tahun">Tahun</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* looping */}
              {allMK.singleCooporationSelect.length === 0 ?"": allMK.singleCooporationSelect.data.option.map((items,index)=>{
                return(

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  {
                  items.cooperation_form}
                </label>
                <div className="col-sm-10">
                  <textarea required
                  onChange={(e)=>changeFormCooporation(index,e)}
                    name="cooperation"
                    id=""
                    cols="30"
                    rows="5"
                    className="form-control"
                    placeholder="Masukan Tujuan Kerjasama"
                  ></textarea>
                </div>
              </div>
                )
              })
              

  }
  {/* end looping */}
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
