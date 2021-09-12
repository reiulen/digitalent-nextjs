import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
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
  fetchListSelectMitra,
} from "../../../../redux/actions/partnership/managementCooporation.actions";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

const Tambah = () => {
  const dispatch = useDispatch();
  const allMK = useSelector((state) => state.allMK);
  const [pagees, setPagees] = useState(false);
  // state form data 1
  const [institution_name, setInstitution_name] = useState("");
  const changeInstitusi = (value) => {
    setInstitution_name(value);
    dispatch(setNameLembaga(value));
  };
  const [error, setError] = useState({
    institution_name: "",
    date: "",
    title: "",
    period: "",
    periodUnit: "",
    cooperationC_id: "",
    AllCooperation: "",
  });
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [period, setPeriod] = useState("");
  const [periodUnit, setPeriodUnit] = useState("tahun");
  const [cooperationC_id, setCooperationC_id] = useState("");
  const changeSetCooperationC_id = (value) => {
    setCooperationC_id(value);
    dispatch(changeCooperationSelectByID(value));
  };
  const [AllCooperation, setAllCooperation] = useState("");
  const changeFormCooporation = (index, e) => {
    let dataaa = [...allMK.singleCooporationSelect.data.option];
    dataaa[index].cooperation = e.target.value;
    setAllCooperation(dataaa);
  };

  const router = useRouter();

  const submit = (e) => {
    e.preventDefault();

    if (institution_name === "") {
      setError({ ...error, institution_name: "Harus pilih nama lembaga" });
      notify("Harus pilih nama lembaga");
    } else if (date === "") {
      setError({ ...error, date: "Filed tanggal tidak boleh kosong" });
      notify("Filed tanggal tidak boleh kosong");
    } else if (title === "") {
      setError({ ...error, title: "Filed judul kerjasama tidak boleh kosong" });
      notify("Filed judul kerjasama tidak boleh kosong");
    } else if (cooperationC_id === "") {
      setError({
        ...error,
        cooperationC_id: "Filed kategori kerjasama tidak boleh kosong",
      });
      notify("Filed kategori kerjasama tidak boleh kosong");
    } else if (period === "") {
      setError({ ...error, period: "Filed periode tidak boleh kosong" });
      notify("Filed periode tidak boleh kosong");
    } else if (periodUnit === "") {
      setError({
        ...error,
        periodUnit: "Filed period unit tidak boleh kosong",
      });
      notify("Filed period unit tidak boleh kosong");
    } else if (AllCooperation === "") {
      setError({
        ...error,
        AllCooperation: "Filed kerjasama form tidak boleh kosong",
      });
      notify("Filed kerjasama form tidak boleh kosong");
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
        if (result.value) {
          let allDataPart = [
            {
              institution_name: institution_name,
              date: date,
              title: title,
              period: period,
              periodUnit: periodUnit,
              cooperationC_id: cooperationC_id,
              AllCooperation: AllCooperation,
            },
          ];

          sessionStorage.setItem("dataBefore", JSON.stringify(allDataPart));

          router.push({
            pathname: "/partnership/kerjasama/submit",
          });
        }
      });
    }
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

  useEffect(() => {
    dispatch(fetchDataEmail());
    dispatch(fetchListSelectCooperation());
    dispatch(fetchListCooperationSelect());
    dispatch(fetchListCooperationSelectById(cooperationC_id));
    dispatch(fetchListSelectMitra());
    setDate(moment(new Date()).format("YYYY-MM-DD"));
  }, [
    dispatch,
    allMK.institution_name,
    allMK.idCooporationSelect,
    cooperationC_id,
  ]);
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
            <h3 className="card-title font-weight-bolder text-dark" style={{fontSize:"24px"}}>
              Tambah Kerjasama
            </h3>
          </div>
          <div className="card-body">
            <form onSubmit={submit}>

              <div className="fv-row mb-10">
                <label className="required fw-bold fs-6 mb-2">
                      Tanggal
                    </label>

                  <input
                    readOnly
                    value={date}
                    type="text"
                    className="form-control mb-3 mb-lg-0"
                  />
                  {error.date ? <p className="error-text">{error.date}</p> : ""}
              </div>
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="fv-row mb-10">
                    <label className="required fw-bold fs-6 mb-2">
                      Lembaga
                    </label>
                    <Select
                      onFocus={() =>
                        setError({ ...error, institution_name: "" })
                      }
                      className="basic-single"
                      classNamePrefix="select"
                      placeholder="Pilih Lembaga"
                      defaultValue={allMK?.stateListMitra[0]}
                      isDisabled={false}
                      isLoading={false}
                      isClearable={false}
                      isRtl={false}
                      isSearchable={true}
                      name="color"
                      onChange={(e) => changeInstitusi(e.label)}
                      options={allMK?.stateListMitra}
                    />
                    {error.institution_name ? (
                      <p className="error-text">{error.institution_name}</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="fv-row mb-10">
                    <label className="required fw-bold fs-6 mb-2">Email</label>
                    <input
                    readOnly
                      type="text"
                      value={allMK.email}
                      name="text_input"
                      className="form-control form-control-solid mb-3 mb-lg-0"
                      placeholder="Masukan Alamat E-mail"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="fv-row mb-10">
                    <label className="required fw-bold fs-6 mb-2">Periode Kerjasama</label>
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
                  <div className="fv-row mb-10">
                    <label className="required fw-bold fs-6 mb-2"></label>
                    <input
                    disabled
                      type="text"
                      name="text_input"
                      className="form-control mb-3 mb-lg-0 mt-2"
                      placeholder="Tahun"
                      
                    />
                  </div>

                </div>
              </div>

              <div className="fv-row mb-10">
                <label className="required fw-bold fs-6 mb-2">Judul Kerjasama</label>
                <input
                onFocus={() => setError({ ...error, title: "" })}
                  type="text"
                  name="text_input"
                  className="form-control mb-3 mb-lg-0"
                  placeholder="Masukan judul kerjasama"
                  onChange={(e) => setTitle(e.target.value)}
                />
                {error.title ? (
                    <p className="error-text">{error.title}</p>
                  ) : (
                    ""
                  )}

              </div>

              <div className="form-group">
                <label
                  htmlFor="staticEmail"
                  className="col-form-label"
                >
                  Kategori kerjasama
                </label>
                <div>
                  <select
                    onFocus={() => setError({ ...error, cooperationC_id: "" })}
                    onChange={(e) => changeSetCooperationC_id(e.target.value)}
                    name=""
                    id=""
                    className="form-control"
                  >
                    <option value="">Pilih Kategory Kerjasama</option>
                    {allMK.cooperationActiveSelect.length === 0
                      ? ""
                      : allMK.cooperationActiveSelect.data.map(
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

              {/* looping */}
              {allMK.singleCooporationSelect.length === 0
                ? ""
                : allMK.singleCooporationSelect.data.option.map(
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
                  <Link href="/partnership/kerjasama">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary">
                      Kembali
                    </a>
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                  >
                    Lanjut
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

export default Tambah;
