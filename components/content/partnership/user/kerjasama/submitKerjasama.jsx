import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Link from "next/link";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import {
  fetchListCooperationSelect,
  changeCooperationSelectByID,
  fetchListCooperationSelectById,
} from "../../../../../redux/actions/partnership/user/cooperation.actions";
import axios from "axios";
const DetailDokumenKerjasama = ({token}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const allCooperationUser = useSelector((state) => state.allCooperationUser);

  const [error, setError] = useState({
    date: "",
    title: "",
    cooperationC_id: "",
    period: "",
    periodUnit: "",
    AllCooperation: "",
    // institution_name: "",
  });

  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [period, setPeriod] = useState("");
  const [periodUnit, setPeriodUnit] = useState("tahun");

  const [AllCooperation, setAllCooperation] = useState("");
  const changeFormCooporation = (index, e) => {
    let dataaa = [...allCooperationUser.singleCooporationSelect.data.option];
    dataaa[index].cooperation = e.target.value;
    setAllCooperation(dataaa);
  };

  const [cooperationC_id, setCooperationC_id] = useState("");
  const changeSetCooperationC_id = (value) => {
    setCooperationC_id(value);
    dispatch(changeCooperationSelectByID(value));
  };

  const submit = (e) => {
    e.preventDefault();

    if (date === "") {
      setError({ ...error, date: "Harus isi data tanggal" });
      notify("Harus isi data tanggal");
    } else if (title === "") {
      setError({ ...error, title: "Judul kerjasama tidak boleh kosong" });
      notify("Judul kerjasama tidak boleh kosong");
    } else if (cooperationC_id === "") {
      setError({
        ...error,
        cooperationC_id: "Kategori kerjasama tidak boleh kosong",
      });
      notify("Kategori kerjasama tidak boleh kosong");
    } else if (period === "") {
      setError({
        ...error,
        period: "Periode tidak boleh kosong",
      });
      notify("Periode tidak boleh kosong");
    } else if (periodUnit === "") {
      setError({ ...error, periodUnit: "Period unit tidak boleh kosong" });
      notify("Period unit tidak boleh kosong");
    } else if (AllCooperation === "") {
      setError({
        ...error,
        AllCooperation: "Kerjasama form tidak boleh kosong",
      });
      notify("Kerjasama form tidak boleh kosong");
    } else {
      Swal.fire({
        title: "Apakah anda yakin ingin simpan ?",
        // text: "Data ini tidak bisa dikembalikan !",
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
          formData.append("date", date);
          formData.append("title", title);
          formData.append("cooperation_category_id", cooperationC_id);
          formData.append("period", period);
          formData.append("period_unit", periodUnit);

          let parseAllCooperation = AllCooperation;
          let dataee = parseAllCooperation.map((items, i) => {
            return items.cooperation;
          });
          dataee.forEach((item, i) => {
            formData.append(`cooperation_form_content[${i}]`, item);
          });

          try {
            let { data } = await axios.post(
              `${process.env.END_POINT_API_PARTNERSHIP_MITRA}api/cooperations/proposal`,
              formData,
              {
                headers: {
                  authorization:
                    `Bearer ${token}`,
                },
              }
            );
            // alert("berhasil");
            console.log("data",data)
            router.push({
              pathname: `/partnership/user/kerjasama/review-kerjasama-1`,
              query: { successSubmitKerjasama: true,id:data.data.id },
            });
          } catch (error) {
            // alert("gagal");
            console.log("error",error)
          }

          // let allDataPart = [
          //   {
          //     institution_name: institution_name,
          //     date: date,
          //     title: title,
          //     period: period,
          //     periodUnit: periodUnit,
          //     cooperationC_id: cooperationC_id,
          //     AllCooperation: AllCooperation,
          //   },
          // ];

          // sessionStorage.setItem("dataBefore", JSON.stringify(allDataPart));

          // router.push({
          //   pathname: "/partnership/kerjasama/submit",
          // });
        }
      });
    }
  };

  const onNewReset = () => {
    setIsProfile(false);
    router.replace("/partnership/user/kerjasama/submit-kerjasama", undefined, { shallow: true });
  };

  const onChangePeriod = (e) => {
    const regex = new RegExp(/[^0-9]/, "g");
    const val = e.target.value;
    if (val.match(regex)) {
      setError({ ...error, period: "Masukan angka" });
      notify("Masukan angka");
      setPeriod("");
    } else {
      setPeriod(e.target.value);
    }
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

  const [isProfile, setIsProfile] = useState(false)
  useEffect(() => {
    if(router.query.isProfile){
      setIsProfile(true)
    }
    dispatch(fetchListCooperationSelect(token));
    dispatch(fetchListCooperationSelectById(cooperationC_id,token));
    setDate(moment(new Date()).format("YYYY-MM-DD"));
  }, [dispatch,cooperationC_id,token,router.query.isProfile]);
  return (
    <PageWrapper>
      {isProfile ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
          style={{ backgroundColor: "#C9F7F5" }}
        >
          <div className="alert-icon">
            <i className="flaticon2-checkmark" style={{ color: "#1BC5BD" }}></i>
          </div>
          <div className="alert-text" style={{ color: "#1BC5BD" }}>
            Berhasil menyimpan data profile
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
      <div className="col-lg-12 order-1 px-0">
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
            <h3 className="card-title fz-20 fw-500 text-dark">
              Submit Kerjasama
            </h3>
          </div>

          <div className="card-body">
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
                  <div className="line-progress"></div>
                  <div className="circle-progress">
                    <span className="title-progress">Review Kerjasama</span>
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
                    <span className="title-progress">
                      Submit Dokumen Kerjasama
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress">
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

            <form onSubmit={submit}>
              {/* tanggal apakah diambil date now atau otomatis date sekarang */}
              <div className="form-group mb-10">
                <label className="required mb-2">Tanggal</label>
                <div className="position-relative">
                  <input
                    placeholder="Pilih Tanggal"
                    readOnly
                    value={date}
                    type="date"
                    className="form-control mb-3 mb-lg-0"
                  />
                  {/* icon calender */}
                </div>
                {error.date ? <p className="error-text">{error.date}</p> : ""}
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="form-group mb-10">
                    <label className="required mb-2">Judul Kerjasama</label>
                    <input
                      onFocus={() => setError({ ...error, title: "" })}
                      type="text"
                      className="form-control mb-3 mb-lg-0"
                      placeholder="Masukan Judul Kerjasama"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    {error.title ? (
                      <p className="error-text">{error.title}</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="form-group mb-10">
                    <label className="required mb-2">Kategori Kerjasama</label>
                    <select
                      className="form-control"
                      onFocus={() =>
                        setError({ ...error, cooperationC_id: "" })
                      }
                      onChange={(e) => changeSetCooperationC_id(e.target.value)}
                    >
                      <option value="">Pilih Kategori Kerjasama</option>
                      {allCooperationUser.cooperationActiveSelect.length === 0
                        ? ""
                        : allCooperationUser.cooperationActiveSelect.data.map(
                            (items, index) => {
                              return (
                                <option key={index} value={items.id}>
                                  {items.cooperation_categories}
                                </option>
                              );
                            }
                          )}
                    </select>
                    {error.cooperationC_id ? (
                      <p className="error-text">{error.cooperationC_id}</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="form-group mb-10">
                    <label className="required mb-2">Periode Kerjasama</label>
                    <input
                      onFocus={() => setError({ ...error, period: "" })}
                      value={period}
                      type="text"
                      name="text_input"
                      className="form-control mb-3 mb-lg-0"
                      placeholder="Masukkan Lama Kerjasama"
                      onChange={(e) => onChangePeriod(e)}
                    />
                    {error.period ? (
                      <p className="error-text">{error.period}</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="form-group mb-10">
                    <label className="required mb-2"></label>
                    <select className="form-control mt-2 remove-icon-default" disabled>
                      <option value="">Tahun</option>
                    </select>
                    {/* {error.date ? <p className="error-text">{error.date}</p> : ""} */}
                  </div>
                </div>
              </div>

              {/* looping */}
              {allCooperationUser.singleCooporationSelect.length === 0
                ? ""
                : allCooperationUser.singleCooporationSelect.data.option.map(
                    (items, index) => {
                      return (
                        <div className="form-group" key={index}>
                          <label
                            htmlFor="staticEmail"
                            className="col-form-label"
                          >
                            {items.cooperation_form}
                          </label>
                          <div>
                            <textarea
                              onFocus={() =>
                                setError({ ...error, AllCooperation: "" })
                              }
                              onChange={(e) => changeFormCooporation(index, e)}
                              name="cooperation"
                              id=""
                              cols="30"
                              rows="5"
                              className="form-control"
                              placeholder="Masukan Tujuan Kerjasama"
                            ></textarea>
                            {error.AllCooperation ? (
                              <p className="error-text">
                                {error.AllCooperation}
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
              {/* end loopingg */}

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/partnership/user/kerjasama" passHref>
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
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

export default DetailDokumenKerjasama;
