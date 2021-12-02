import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Link from "next/link";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

import { fetchListCooperationSelect, changeCooperationSelectByID, fetchListCooperationSelectById } from "../../../../../redux/actions/partnership/user/cooperation.actions";
import axios from "axios";
import AlertBar from "../../components/BarAlert";
const DetailDokumenKerjasama = ({ token }) => {
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

    if (date === "") {
      setError({ ...error, date: "Harus isi data tanggal" });
    } else if (title === "") {
      setError({ ...error, title: "Judul kerjasama tidak boleh kosong" });
    } else if (cooperationC_id === "") {
      setError({
        ...error,
        cooperationC_id: "Kategori kerjasama tidak boleh kosong",
      });
    } else if (period === "" || period === 0 || period === "0") {
      setError({
        ...error,
        period: "Lama periode kerjasama tidak boleh kosong atau nol",
      });
    } else if (period.length > 5) {
      setError({
        ...error,
        period: "Maksimum 5 karakter",
      });
    } else if (periodUnit === "") {
      setError({ ...error, periodUnit: "Period unit tidak boleh kosong" });
    } else if (AllCooperation === "") {
      setError({
        ...error,
        AllCooperation: "Kerjasama form tidak boleh kosong",
      });
    } else if (isError) {
      return;
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
            let { data } = await axios.post(`${process.env.END_POINT_API_PARTNERSHIP_MITRA}api/cooperations/proposal`, formData, {
              headers: {
                authorization: `Bearer ${token}`,
              },
            });
            router.push({
              pathname: `/partnership/user/kerjasama/review-kerjasama`,
              query: { successSubmitKerjasama: true, id: data.data.id },
            });
          } catch (error) {
            Swal.fire("Gagal", `${error.response.data.message}`, "error");
          }
        }
      });
    }
  };

  const onNewReset = () => {
    setIsProfile(false);
    router.replace("/partnership/user/kerjasama/submit-kerjasama", undefined, {
      shallow: true,
    });
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

  const [isProfile, setIsProfile] = useState(false);
  useEffect(() => {
    if (router.query.isProfile) {
      setIsProfile(true);
    }
    dispatch(fetchListCooperationSelect(token));
    dispatch(fetchListCooperationSelectById(cooperationC_id, token));
    setDate(moment(new Date()).format("YYYY-MM-DD"));
  }, [dispatch, cooperationC_id, token, router.query.isProfile]);

  return (
    <PageWrapper>
      {isProfile ? <AlertBar text="Berhasil menyimpan data profile" className="alert-light-success" onClick={() => onNewReset()} /> : ""}
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title fw-500 text-dark titles-1 ">Submit Kerjasama</h3>
          </div>

          <div className="card-body pt-0">
            <div className="row mt-8 mb-10 position-relative">
              <div className="col-2 p-0 relative-progress">
                <div className="progress-items">
                  <div className="circle-progress active-circle ">
                    <span className="title-progress active">Submit Kerjasama</span>
                  </div>
                </div>
              </div>
              <div className="col-2 p-0">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress">
                    <span className="title-progress">Review Kerjasama</span>
                  </div>
                </div>
              </div>
              <div className="col-2 p-0">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress ">
                    <span className="title-progress">Pembahasan</span>
                  </div>
                </div>
              </div>
              <div className="col-2 p-0">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress ">
                    <span className="title-progress text-center" style={{ top: "-4rem" }}>
                      Submit Dokumen
                      <br />
                      Kerjasama
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-2 p-0">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress ">
                    <span className="title-progress text-center" style={{ top: "-4rem" }}>
                      Review Dokumen
                      <br />
                      Kerjasama
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-2 p-0">
                <div className="progress-items">
                  <div className="line-progress"></div>
                  <div className="circle-progress ">
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
                  <input placeholder="Pilih Tanggal" readOnly value={date} type="date" className="form-control mb-3 mb-lg-0 border-0" style={{ backgroundColor: "transparent" }} />
                  <div className="box-hide-arrow"></div>
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
                      placeholder="Masukkan Judul Kerjasama"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    {error.title ? <p className="error-text">{error.title}</p> : ""}
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="form-group mb-10">
                    <label className="required mb-2">Kategori Kerjasama</label>
                    <select className="form-control" onFocus={() => setError({ ...error, cooperationC_id: "" })} onChange={(e) => changeSetCooperationC_id(e.target.value)}>
                      <option value="">Pilih Kategori Kerjasama</option>
                      {allCooperationUser.cooperationActiveSelect.length === 0
                        ? ""
                        : allCooperationUser.cooperationActiveSelect.data.map((items, index) => {
                            return (
                              <option key={index} value={items.id}>
                                {items.cooperation_categories}
                              </option>
                            );
                          })}
                    </select>
                    {error.cooperationC_id ? <p className="error-text">{error.cooperationC_id}</p> : ""}
                  </div>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-12 col-sm-6">
                  <div className="form-group mb-0">
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
                        <button className="btn btn-secondary" type="button" disabled>
                          Tahun
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {error.period ? <p className="error-text">{error.period}</p> : ""}
              {/* looping */}
              {allCooperationUser.singleCooporationSelect.length === 0
                ? ""
                : allCooperationUser.singleCooporationSelect.data.option.map((items, index) => {
                    return (
                      <div className="form-group" key={index}>
                        <label htmlFor="staticEmail" className="col-form-label">
                          {items.cooperation_form}
                        </label>
                        <div>
                          <textarea
                            onFocus={() => setError({ ...error, AllCooperation: "" })}
                            onChange={(e) => changeFormCooporation(index, e)}
                            name="cooperation"
                            id=""
                            cols="30"
                            rows="5"
                            className="form-control"
                            placeholder={`Masukkan ${items.cooperation_form}`}
                          ></textarea>
                          {AllCooperation[index]?.error ? <p className="error-text">{AllCooperation[index]?.error}</p> : ""}
                        </div>
                      </div>
                    );
                  })}

              {/* end loopingg */}
              {error.AllCooperation ? <p className="error-text">{error.AllCooperation}</p> : ""}

              <div className="form-group">
                <div className="d-flex justify-content-end flex-column flex-md-row">
                  <Link href="/partnership/user/kerjasama" passHref>
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5 d-flex justify-content-center">Kembali</a>
                  </Link>
                  <button type="submit" className="btn btn-sm btn-rounded-full bg-blue-primary text-white d-flex justify-content-center">
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
