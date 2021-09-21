import React, { useState, useRef, useEffect } from "react";

import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";

import Style from "../../../../styles/progressbar.module.css";
import axios from "axios";
import { useRouter } from "next/router";

const DetailRevisiKerjasama = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const router = useRouter();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [cooperationID, setCooperationID] = useState("");
  const [allCooperation, setAllCooperation] = useState([])
  console.log("allCooperation",allCooperation)
  const [period, setPeriod] = useState("");
  const [periodUnit, setPeriodUnit] = useState("tahun");
  const [note, setNote] = useState("");


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
        formData.append("note", note);

        let dataee = allCooperation.map((items, i) => {
          return items.form_content_review;
        });

        dataee.forEach((item, i) => {
          formData.append(`cooperation_form_review[${i}]`, item);
        });



        // console.log("note",note);
        // console.log("method","PUT");



        // let formData = new FormData();
        // const method = "PUT";
        // formData.append("_method", method);
        // formData.append("note", note);

        // if (AllCooperation === "") {
        //   // start data default
        //   formData.append("cooperation_category_id", cooperationID.id);
        //   let dataee = cooperationID.data_content.map((items, i) => {
        //     return items.form_content;
        //   });
        //   dataee.forEach((item, i) => {
        //     formData.append(`cooperation_form_content[${i}]`, item);
        //   });
        //   // end data default
        // } else {
        //   // start jika tidak default
        //   formData.append("cooperation_category_id", cooperationC_id);
        //   let ez = AllCooperation.map((items, i) => {
        //     return items.cooperation;
        //   });
        //   ez.forEach((item, i) => {
        //     formData.append(`cooperation_form_content[${i}]`, item);
        //   });
        //   // end jika tidak default
        // }

        try {
          let { data } = await axios.post(
            `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/revisi/${router.query.id}/${router.query.varsion}`,
            formData
          );

          router.push({
            pathname: "/partnership/kerjasama/",
            // query: { update: true },
          });
        } catch (error) {
          notify(error.response.data.message);
        }
      }
    });
  };

  


  const setDataSingle = async (id) => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/cek-progres/${id}`
      );
      setTitle(data.data.title);
      setDate(data.data.submission_date);
      setAllCooperation(data.data.cooperation_category.data_content)
      setCooperationID(data.data.cooperation_category);
      setPeriod(data.data.period);
      setPeriodUnit(data.data.period_unit);
      setNote(data.data.note)

    } catch (error) {
      console.log("action getSIngle gagal", error);
    }
  };
  const handleChange = (e, index) => {
    let dataaa = [...allCooperation];
    dataaa[index].form_content_review = e.target.value;
    console.log("dataaa",dataaa)
    // console.log("index",index)
    setAllCooperation(dataaa);
  };
  useEffect(() => {
    setDataSingle(router.query.id);
  }, [router.query.id])


  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title fz-20 fw-500 text-dark">Detail Kerjasama Revisi</h3>
          </div>

          <div className="card-body">
            {" "}
            <form>
              {/* tanggal apakah diambil date now atau otomatis date sekarang */}
              <div className="form-group mb-10">
                <label className="required mb-2">Tanggal</label>
                <div className="position-relative">
                  <input
                    placeholder="Pilih Tanggal"
                    readOnly
                    value={date&&date}
                    type="date"
                    className="form-control mb-3 mb-lg-0"
                  />
                  {/* icon calender */}
                </div>
                {/* {error.date ? <p className="error-text">{error.date}</p> : ""} */}
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="form-group mb-10">
                    <label className="required mb-2">Judul Kerjasama</label>
                    <input
                      placeholder="Masukan Judul Kerjasama"
                      readOnly
                      value={title&&title}
                      type="text"
                      className="form-control mb-3 mb-lg-0"
                    />
                    {/* {error.date ? <p className="error-text">{error.date}</p> : ""} */}
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="form-group mb-10">
                    <label className="required mb-2">Kategori Kerjasama</label>
                    <select className="form-control remove-icon-default" disabled>
                      <option value="">{cooperationID&&cooperationID.name}</option>
                    </select>
                    {/* {error.date ? <p className="error-text">{error.date}</p> : ""} */}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="form-group mb-10">
                    <label className="required mb-2">Periode Kerjasama</label>
                    <input
                      placeholder="Masukan Lama Kerjasama"
                      readOnly
                      value={period&&period}
                      type="number"
                      className="form-control mb-3 mb-lg-0"
                    />
                    {/* {error.date ? <p className="error-text">{error.date}</p> : ""} */}
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="form-group mb-10">
                    <label className="required mb-2"></label>
                    <select className="form-control mt-2" disabled>
                      <option value="">Tahun</option>
                    </select>
                    {/* {error.date ? <p className="error-text">{error.date}</p> : ""} */}
                  </div>
                </div>
              </div>


              {/* start loop */}

              {!allCooperation.length ? "" : allCooperation.map((items,index)=>{
                return(
                    <div className="row" key={index}>
                <div className="col-12 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="staticEmail" className="col-form-label">
                      {items.cooperation_form}
                    </label>
                    <div>
                      <textarea
                        name="cooperation"
                        id=""
                        readOnly
                        cols="30"
                        rows="5"
                        value={items.form_content}
                        className="form-control"
                        placeholder="Tuliskan Tujuan Kerjasama"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="staticEmail" className="col-form-label">
                      Catatan Revisi
                    </label>
                    <div>
                      <textarea
                      onChange={(e) => handleChange(e, index)}
                      value={items.form_content_review}
                        name="cooperation"
                        id=""
                        cols="30"
                        rows="5"
                        className="form-control"
                        placeholder="Tuliskan Catatan Revisi"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>


                )
              })}

              {/* end loop */}

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Catatan Tambahan
                </label>
                <div>
                  <textarea
                  onChange={(e)=>setNote(e.target.value)}
                    name="cooperation"
                    id=""
                    value={note&&note}
                    cols="30"
                    rows="5"
                    className="form-control"
                    placeholder="Tuliskan Catatan Tambahan"
                  ></textarea>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/partnership/kerjasama">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
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
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default DetailRevisiKerjasama;
