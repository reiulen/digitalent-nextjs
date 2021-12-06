import React, { useState, useEffect } from "react";
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
import Select from "react-select";
import FormSubmit from "./submitKerjasama";
import { helperRemoveZeroFromIndex0 } from "../../../../utils/middleware/helper/index";

const Tambah = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { formSubmit } = router.query;
  const allMK = useSelector((state) => state.allMK);
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

  const [AllCooperation, setAllCooperation] = useState("");
  const changeFormCooporation = (index, e) => {
    let dataaa = [...allMK.singleCooporationSelect.data.option];
    dataaa[index].cooperation = e.target.value;
    setAllCooperation(dataaa);
  };

  const submit = (e) => {
    e.preventDefault();

    let isError = false;

    if (AllCooperation === "") {
      setError({
        ...error,
        AllCooperation: "Kerjasama form tidak boleh kosong",
      });
    } else {
      let errorAllCooperation = AllCooperation.map((items) => {
        if (!items.cooperation) {
          isError = true;
          return { ...items, error: `Harus isi ${items.cooperation_form}` };
        } else {
          return { ...items };
        }
      });
      setAllCooperation(errorAllCooperation);
    }

    if (institution_name === "") {
      setError({ ...error, institution_name: "Harus pilih nama lembaga" });
    } else if (period === "") {
      setError({ ...error, period: "Field periode tidak boleh kosong" });
    } else if (date === "") {
      setError({ ...error, date: "Field tanggal tidak boleh kosong" });
    } else if (title === "") {
      setError({ ...error, title: "Field judul kerjasama tidak boleh kosong" });
    } else if (cooperationC_id === "") {
      setError({
        ...error,
        cooperationC_id: "Field kategori kerjasama tidak boleh kosong",
      });
    } else if (periodUnit === "") {
      setError({
        ...error,
        periodUnit: "Field period unit tidak boleh kosong",
      });
    } else if (AllCooperation === "") {
      setError({
        ...error,
        AllCooperation: "Field kerjasama form tidak boleh kosong",
      });
    } else if (isError) {
      return;
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
            pathname: "/partnership/kerjasama/tambah",
            query: { formSubmit: true },
          });
        }
      });
    }
  };
  const onChangePeriod = (e) => {
    setError({ ...error, period: "" });
    const regex = new RegExp(/[^0-9]/, "g");
    const val = e.target.value;
    if (val.match(regex)) {
      setError({ ...error, period: "Masukkan angka" });
      setPeriod("");
    } else if (e.target.value.toString().charAt(0) === "0") {
      setError({
        ...error,
        period: "Lama Periode tidak boleh kosong atau angka nol",
      });
      setPeriod("");
    } else if (e.target.value.toString().length > 5) {
      setError({
        ...error,
        period: "Lama Periode maksimum 5 karakter.",
      });
      // setPeriod("");
    } else {
      setPeriod(e.target.value);
    }
  };

  const [cooperationC_id, setCooperationC_id] = useState("");
  const changeSetCooperationC_id = (value) => {
    setCooperationC_id(value);
    dispatch(changeCooperationSelectByID(value));
  };

  useEffect(() => {
    dispatch(fetchDataEmail(token));
    dispatch(fetchListSelectCooperation(token));
    dispatch(fetchListCooperationSelect(token));
    dispatch(fetchListCooperationSelectById(token, cooperationC_id));
    dispatch(fetchListSelectMitra(token));
    setDate(moment(new Date()).format("YYYY-MM-DD"));
  }, [
    dispatch,
    allMK.institution_name,
    allMK.idCooporationSelect,
    cooperationC_id,
    token,
  ]);

  return (
    <PageWrapper>
      {!formSubmit ? (
        <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
          <div className="card card-custom card-stretch gutter-b">
            <div className="card-header border-0">
              <h3 className="card-title font-weight-bolder text-dark titles-1">
                Tambah Kerjasama
              </h3>
            </div>
            <div className="card-body pt-0">
              <form onSubmit={submit}>
                <div className="fv-row mb-10">
                  <label className="required fw-bold fs-6 mb-2">Tanggal</label>
                  <div className="position-relative">
                    <input
                      disabled
                      type="text"
                      value={date}
                      name="text_input"
                      className="form-control mb-3 mb-lg-0 border-0"
                      style={{ backgroundColor: "transparent" }}
                    />
                    <div className="box-hide-arrow"></div>
                    {/* icon calender */}
                  </div>

                  {error.date ? <p className="error-text">{error.date}</p> : ""}
                </div>
                <div className="row">
                  <div className="col-12 col-xl-6">
                    <div
                      className="fv-row mb-6 position-relative"
                      style={{ zIndex: "4" }}
                    >
                      <label className="required fw-bold fs-6 mb-2">
                        Lembaga
                      </label>
                      <Select
                        placeholder="Silahkan Pilih Lembaga"
                        options={allMK?.stateListMitra.map((item, index) => {
                          return {
                            label: item.label,
                            value: item.label,
                          };
                        })}
                        onChange={(e) => changeInstitusi(e.label)}
                      />
                      {error.institution_name ? (
                        <p className="error-text">{error.institution_name}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-xl-6">
                    <div className="fv-row mb-6">
                      <label className="required fw-bold fs-6 mb-2">
                        Email
                      </label>
                      <input
                        disabled
                        type="text"
                        value={allMK.email}
                        name="text_input"
                        className="form-control mb-3 mb-lg-0 border-0"
                        style={{ backgroundColor: "transparent" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-12 col-sm-6">
                    <div className="form-group mb-4">
                      <label>Periode Kerjasama</label>
                      <div className="input-group">
                        <input
                          onFocus={() => setError({ ...error, period: "" })}
                          type="text"
                          value={period}
                          className="form-control mb-lg-0"
                          placeholder="Masukkan Lama Kerjasama"
                          onChange={(e) => onChangePeriod(e)}
                        />

                        <div className="input-group-append">
                          <button
                            className="btn btn-secondary"
                            type="button"
                            disabled
                          >
                            Tahun
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {error.period ? (
                  <p className="error-text mb-4 mt-0">{error.period}</p>
                ) : (
                  ""
                )}

                <div className="fv-row mb-6">
                  <label className="required fw-bold fs-6 mb-2">
                    Judul Kerjasama
                  </label>
                  <input
                    onFocus={() => setError({ ...error, title: "" })}
                    type="text"
                    name="text_input"
                    className="form-control mb-3 mb-lg-0"
                    placeholder="Masukkan judul kerjasama"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {error.title ? (
                    <p className="error-text">{error.title}</p>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="staticEmail" className="col-form-label">
                    Kategori kerjasama
                  </label>
                  <div>
                    <select
                      onFocus={() =>
                        setError({ ...error, cooperationC_id: "" })
                      }
                      onChange={(e) => changeSetCooperationC_id(e.target.value)}
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
                                onChange={(e) =>
                                  changeFormCooporation(index, e)
                                }
                                name="cooperation"
                                id=""
                                cols="30"
                                rows="5"
                                className="form-control"
                                placeholder={`Masukan ${items.cooperation_form}`}
                              ></textarea>
                              {AllCooperation[index]?.error ? (
                                <p className="error-text">
                                  {AllCooperation[index]?.error}
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
                {error.AllCooperation ? (
                  <p className="error-text">{error.AllCooperation}</p>
                ) : (
                  ""
                )}
                <div className="form-group">
                  <div className="d-flex justify-content-end flex-column flex-md-row">
                    <Link href="/partnership/kerjasama">
                      <a 
                        className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-sm-5 mr-0 d-flex justify-content-center"
                      >
                        Kembali
                      </a>
                    </Link>

                    <button
                      type="submit"
                      className="btn btn-sm btn-rounded-full bg-blue-primary text-white d-flex justify-content-center"
                    >
                      Lanjut
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <FormSubmit token={token} />
      )}
    </PageWrapper>
  );
};

export default Tambah;
