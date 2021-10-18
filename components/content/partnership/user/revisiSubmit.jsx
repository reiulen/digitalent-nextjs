import React, { useState, useRef, useEffect } from "react";

import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";

import Style from "../../../../styles/progressbar.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RevisiSubmit = ({token}) => {
  const router = useRouter();
  const [information2, setInformation2] = useState("")

  const [allCooperation, setAllCooperation] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [cooperationID, setCooperationID] = useState("");
  const [period, setPeriod] = useState("");
  const [periodUnit, setPeriodUnit] = useState("tahun");
  const [note, setNote] = useState("");

  const handleSubmit = async () => {
    // e.preventDefault();
    Swal.fire({
      title: "Apakah anda yakin ingin simpan revisi?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Tidak",
      confirmButtonText: "Ya",
      dismissOnDestroy: false,
    }).then(async (result) => {
      if (result.value) {
        // console.log("sdfsdf")
        let formData = new FormData();

        const method = "PUT";
        formData.append("_method", method);
        // formData.append("note", note);

        let dataee = allCooperation.map((items, i) => {
          return items.form_content;
        });

        // dataee.forEach((item, i) => {
        //   formData.append(`cooperation_form_content[${i}]`, item);
        // });

        dataee.forEach((item, i) => {
          formData.append(`cooperation_form_content[${i}]`, item);
        });

        // console.log("note",note)
        // console.log(object)

        try {
          let respoonse = await axios.post(
            `${process.env.END_POINT_API_PARTNERSHIP_MITRA}api/cooperations/proposal/revisi/${router.query.id}/${router.query.version}`,
            formData,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );

            router.push({
              pathname: "/partnership/user/kerjasama",
              query: { successInputProfile: true },
            });
          

        } catch (error) {
          notify(error.response.data.message);
        }
      }
    });
  };

  // const setDataSingle = async (id,version) => {
    
  // };

  const [lengthListCard, setLengthListCard] = useState("")
  const [indexCard, setIndexCard] = useState("")
  const getLengthListCard = async (id) => {
    
  };


  const handleChange = (e, index) => {
    let dataaa = [...allCooperation];
    dataaa[index].form_content = e.target.value;
    setAllCooperation(dataaa);
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
  useEffect(() => {
    async function setDataSingle(id,version) {
      try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP_MITRA}api/cooperations/proposal/show-revisi/${id}/${version}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle(data.data.title);
      setDate(data.data.date);
      setCooperationID(data.data.cooperation_category);
      setPeriod(data.data.period);
      setPeriodUnit(data.data.period_unit);
      setAllCooperation(data.data.cooperation_category.data_content);
      setNote(data.data.note);
    } catch (error) {
      console.log("action getSIngle gagal", error);
    }
    }

    async function getLengthListCard(id) {
      try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP_MITRA}api/cooperations/proposal/card-review/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setLengthListCard(data.data.length - 1)
    } catch (error) {
      console.log("action getSIngle gagal", error);
    }
      
    }
    setDataSingle(router.query.id,router.query.version);
    setInformation2(router.query.information2)
    getLengthListCard(router.query.id)
    setIndexCard(router.query.index)
  }, [router.query.id,router.query.version,router.query.information2,router.query.index,token]);

  return (
    <PageWrapper>
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
            <h3 className="card-title fz-20 fw-500 text-dark">Revisi</h3>
          </div>

          <div className="card-body">
            <div className="row mt-8 mb-10 relative-progress">
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
                    <span className="title-progress active">Review Kerjasama</span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress">
                    <span className="title-progress">Pembahasan</span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress">
                    <span className="title-progress text-center" style={{top:"-4rem"}}>
                      Submit Dokumen<br/>Kerjasama
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress">
                    <span className="title-progress text-center" style={{top:"-4rem"}}>
                      Review Dokumen<br/>Kerjasama
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

            <form>
              {/* tanggal apakah diambil date now atau otomatis date sekarang */}
              <div className="form-group mb-10">
                <label className="required mb-2">Tanggal</label>
                <div className="position-relative">
                  <input
                    placeholder="Pilih Tanggal"
                    readOnly
                    value={date && date}
                    type="date"
                    className="form-control mb-3 mb-lg-0 border-0"
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
                      value={title && title}
                      type="text"
                      className="form-control mb-3 mb-lg-0 border-0"
                    />
                    {/* {error.date ? <p className="error-text">{error.date}</p> : ""} */}
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="form-group mb-10">
                    <label className="required mb-2">Kategori Kerjasama</label>
                    <select
                      className="form-control remove-icon-default border-0"
                      disabled
                      style={{backgroundColor:"transparent"}}
                    >
                      <option value="">
                        {cooperationID && cooperationID.name}
                      </option>
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
                      value={period && period}
                      type="number"
                      className="form-control mb-3 mb-lg-0 border-0"
                    />
                    {/* {error.date ? <p className="error-text">{error.date}</p> : ""} */}
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="form-group mb-10">
                    <label className="required mb-2"></label>
                    <select className="form-control mt-2 border-0" style={{backgroundColor:"transparent"}} disabled>
                      <option value="">Tahun</option>
                    </select>
                    {/* {error.date ? <p className="error-text">{error.date}</p> : ""} */}
                  </div>
                </div>
              </div>

              {/* start loop */}

              {!allCooperation.length
                ? ""
                : allCooperation.map((items, index) => {
                    return (
                      <div className="row" key={index}>
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label
                              htmlFor="staticEmail"
                              className="col-form-label"
                            >
                              {items.cooperation_form}
                            </label>
                            <div>
                              <textarea
                              disabled={(lengthListCard || indexCard) === "" ? false  : lengthListCard == indexCard ? false : true }
                                name="cooperation"
                                id=""
                                onChange={(e) => handleChange(e, index)}
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
                            <label
                              htmlFor="staticEmail"
                              className="col-form-label"
                            >
                              Catatan Revisi
                            </label>
                            <div>
                              <textarea
                                disabled
                                value={items.form_content_review}
                                name="cooperation"
                                id=""
                                cols="30"
                                rows="5"
                                className="form-control border-0"
                                style={{backgroundColor:"transparent"}}
                                placeholder="Tuliskan Catatan Revisi"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

              {/* end loop */}

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Catatan Tambahan
                </label>
                <div>
                  <textarea
                    onChange={(e) => setNote(e.target.value)}
                    name="cooperation"
                    id=""
                    disabled
                    value={note && note}
                    cols="30"
                    rows="5"
                    className="form-control border-0"
                    style={{backgroundColor:"transparent"}}
                    placeholder="Tuliskan Catatan Tambahan"
                  ></textarea>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href={{
                    pathname:"/partnership/user/kerjasama/review-list-kerjasama",
                    query:{id:router.query.id}
                  }}>
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link>
                  {(lengthListCard || indexCard) === "" ? ""  : lengthListCard == indexCard ? 
                  <button
                  type="button"
                  className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                    onClick={() => handleSubmit()}
                    >
                    Simpan
                  </button>
                  :""}
                </div>
              </div>
            </form>
         
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default RevisiSubmit;
