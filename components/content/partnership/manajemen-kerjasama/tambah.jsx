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
  fetchListSelectCooperation
} from "../../../../redux/actions/partnership/managementCooporation.actions";

const Tambah = () => {
  const dispatch = useDispatch()
  const allMK = useSelector((state) => state.allMK);
  const [pagees, setPagees] = useState(false)
  console.log("allMK",allMK)
  // state form data 1
  const [institution_name, setInstitution_name] = useState("")
  const [date, setDate] = useState("")
  console.log("date eee",date)
  const [title, setTitle] = useState("")
  const [period, setPeriod] = useState("")
  const [periodUnit, setPeriodUnit] = useState("")
  const [cooperationC_id, setCooperationC_id] = useState("")
  const [cooperation1, setCooperation1] = useState("")
  const [cooperation2, setCooperation2] = useState("")
  const [cooperation3, setCooperation3] = useState("")
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  // end state form data 1

  const handleSubmit =(e)=>{
    e.preventDefault();
    console.log("date",date)
    console.log("title",title)
    console.log("period",period)
    console.log("periodUnit",periodUnit)
    console.log("cooperationC_id",cooperationC_id)
    console.log("cooperation1",cooperation1)
    console.log("cooperation2",cooperation2)
    console.log("cooperation3",cooperation3)
  }


  const router = useRouter();
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
        // router.push("/partnership/manajemen-kerjasama/submit");
        router.push({
          pathname: '/partnership/manajemen-kerjasama/submit',
          query: { date: date,title:title,period:period,periodUnit:periodUnit,cooperationC_id:cooperationC_id,cooperation1:cooperation1,cooperation2:cooperation2,cooperation3:cooperation3 },
        })
      }
    });
  };

  useEffect(() => {
    dispatch(fetchDataEmail())
    dispatch(fetchListSelectCooperation())
  }, [allMK.institution_name])

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
            <form onSubmit={handleSubmit}>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Nama Lembaga
                </label>
                <div className="col-sm-3">
                  <input type="text" value={allMK.name_lembaga} onChange={(e)=>dispatch(setNameLembaga(e.target.value))} className="form-control" placeholder="Masukan nama lembaga" />
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
                  <input type="text" value={allMK.email} disabled className="form-control" placeholder="Masukan nama lembaga" />
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
                  <input type="date" onChange={(e)=>setDate(e.target.value)} className="form-control" />
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
                  <select onChange={(e)=>setCooperationC_id(e.target.value)} name="" id="" className="form-control">
                    <option value="">Pilih Kategory Kerjasama</option>
                    {allMK.stateListKerjaSama.length === 0 ? "":allMK.stateListKerjaSama.data.map(items =>{
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
                      <input className="form-control" placeholder="Masukan periode masa periode misal 1 atau 2" type="number" onChange={(e)=>setPeriod(e.target.value)} />
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
                      <select className="form-control" onChange={(e)=>setPeriodUnit(e.target.value)}>
                        <option value="">Pilih periode bulan/tahun</option>
                        <option value="bulan">Bulan</option>
                        <option value="tahun">Tahun</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Tujuan Kerjasama
                </label>
                <div className="col-sm-10">
                  <textarea
                  onChange={(e)=>setCooperation1(e.target.value)}
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    className="form-control"
                    placeholder="Masukan Tujuan Kerjasama"
                  ></textarea>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Ruang Lingkup Kerjasama
                </label>
                <div className="col-sm-10">
                  <textarea
                  onChange={(e)=>setCooperation2(e.target.value)}
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    className="form-control"
                    placeholder="Masukan Ruang Lingkup Kerjasama"
                  ></textarea>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Target Kerjasama
                </label>
                <div className="col-sm-10">
                  <textarea
                  onChange={(e)=>setCooperation3(e.target.value)}
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    className="form-control"
                    placeholder="Masukan Target Kerjasama disini"
                  ></textarea>
                </div>
              </div>

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
                  // type="submit"
                    className="btn btn-primary btn-sm"
                    onClick={(e) => submit(e)}
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
