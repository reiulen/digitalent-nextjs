import React, { useState, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ReviewKerjasama = ({ token }) => {
  const router = useRouter();

  // state cek-progres
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [cooperationID, setCooperationID] = useState("");
  const [period, setPeriod] = useState("");
  const [periodUnit, setPeriodUnit] = useState("tahun");

  // cek progress
  const setDataSingle = async (id) => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/cek-progres/${id}`
      );
      console.log("data sdfsdf", data);
      setTitle(data.data.title);
      setDate(data.data.submission_date);
      setCooperationID(data.data.cooperation_category);
      setPeriod(data.data.period);
      setPeriodUnit(data.data.period_unit);
    } catch (error) {
      console.log("action getSIngle gagal", error);
    }
  };

  // state cek review card-version
  const [allCooperationView, setAllCooperationView] = useState([]);
  const [titleView, setTitleView] = useState("");
  const [dateView, setDateView] = useState("");
  const [cooperationIDView, setCooperationIDView] = useState("");
  const [periodView, setPeriodView] = useState("");
  const [periodUnitView, setPeriodUnitView] = useState("tahun");
  const [noteView, setNoteView] = useState("");

  // cek review card-version
  const setDataSingleSelesaiReview = async (id, version) => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/show-revisi/${id}/${version}`
      );
      setTitleView(data.data.title);
      setDateView(data.data.date);
      setCooperationIDView(data.data.cooperation_category);
      setPeriodView(data.data.period);
      setPeriodUnitView(data.data.period_unit);
      setAllCooperationView(data.data.cooperation_category.data_content);
      setNoteView(data.data.note);
    } catch (error) {
      console.log("action getSIngle gagal", error);
    }
  };

  const ajukanRevisi = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Apakah anda yakin ingin ajukan revisi ?",
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
        router.push({
          pathname: "/partnership/kerjasama/detail-revisi-kerjasama",
          query: { id: router.query.id, varsion: router.query.version },
        });
      }
    });
  };

  const acceptDokument = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Apakah anda yakin ingin terima kerjasama ?",
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
        try {
          let { data } = await axios.put(
            `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/accept/${router.query.id}`
          );
          console.log("data", data);
          router.push({
            pathname: "/partnership/kerjasama/",
            query: { successTerima: true },
          });
        } catch (error) {
          console.log("error acceptDokument", error);
        }
      }
    });
  };

  const rejectDokument = (e) => {
    console.log("rejectDokument");
    e.preventDefault();

    Swal.fire({
      title: "Apakah anda yakin ingin tolak kerjasama ?",
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
        try {
          let { data } = await axios.put(
            `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/reject/${router.query.id}`
          );

          console.log("data asdasd", data);
          router.push({
            pathname: "/partnership/kerjasama/",
            query: { successReject: true },
          });
        } catch (error) {
          console.log("error acceptDokument", error);
        }
      }
    });
  };
  const [statusInfo, setstatusInfo] = useState("");
  useEffect(() => {
    setDataSingle(router.query.id);
    setDataSingleSelesaiReview(router.query.id, router.query.version);
    if (router.query.statusInfo) {
      setstatusInfo(router.query.statusInfo);
    }
  }, [router.query.id, router.query.version, router.query.statusInfo]);

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
            <h3
              className="card-title font-weight-bolder text-dark"
              style={{ fontSize: "24px" }}
            >
              Review Kerjasama
            </h3>
          </div>
          <div className="card-body">
            {statusInfo && statusInfo === "Sudah direview" ? (
              <form>
                <div className="form-group">
                  <label htmlFor="staticEmail" className="col-form-label">
                    Tanggal
                  </label>
                  <input
                    readOnly
                    type="date"
                    required
                    value={dateView && dateView}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="staticEmail" className="col-form-label">
                    Judul kerjasama
                  </label>
                  <input
                    required
                    readOnly
                    value={titleView && titleView}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Judul Kerjasama"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="staticEmail" className="col-form-label">
                    Kategori kerjasama
                  </label>
                  <select
                    name=""
                    id=""
                    className="form-control"
                    disabled
                    value={cooperationIDView.id}
                  >
                    <option>{cooperationIDView.name}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="staticEmail" className="col-form-label">
                    Periode
                  </label>
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <input
                        required
                        readOnly
                        type="number"
                        className="form-control mt-2"
                        onChange={(e) => setPeriod(e.target.value)}
                        value={periodView}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-control mt-2">Tahun</div>
                    </div>
                  </div>
                </div>

                {cooperationIDView === ""
                  ? ""
                  : cooperationIDView.data_content.map((items, i) => {
                      return (
                        <div className="row" key={i}>
                          <div className="col-12 col-sm-6">
                            <div className={`form-group`}>
                              <label
                                htmlFor="staticEmail"
                                className="col-form-label"
                              >
                                {items.cooperation_form}
                              </label>
                              <textarea
                                readOnly
                                value={items.form_content}
                                name=""
                                id={i}
                                cols="30"
                                rows="5"
                                className="form-control"
                              ></textarea>
                            </div>
                          </div>
                          <div className="col-12 col-sm-6">
                            <div className={`form-group`}>
                              <label
                                htmlFor="staticEmail"
                                className="col-form-label"
                              >
                                Catatan Revisi
                              </label>
                              <textarea
                                readOnly
                                value={items.form_content_review}
                                name=""
                                id={i}
                                cols="30"
                                rows="5"
                                className="form-control"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      );
                    })}

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
                      value={noteView && noteView}
                      cols="30"
                      rows="5"
                      className="form-control"
                      placeholder="Tuliskan Catatan Tambahan"
                    ></textarea>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-12 d-flex justify-content-end">
                    <Link
                      href={{
                        pathname: "/partnership/kerjasama/revisi-kerjasama",
                        query: { id: router.query.id },
                      }}
                      passHref
                    >
                      <a className="btn btn-sm btn-rounded-full bg-blue-primary text-white">
                        Kembali
                      </a>
                    </Link>
                  </div>
                </div>
              </form>
            ) : (
              <form>
                <div className="form-group">
                  <label htmlFor="staticEmail" className="col-form-label">
                    Tanggal
                  </label>
                  <input
                    readOnly
                    type="date"
                    required
                    value={date && date}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="staticEmail" className="col-form-label">
                    Judul kerjasama
                  </label>
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
                <div className="form-group">
                  <label htmlFor="staticEmail" className="col-form-label">
                    Kategori kerjasama
                  </label>
                  <select
                    name=""
                    id=""
                    className="form-control"
                    disabled
                    value={cooperationID.id}
                  >
                    <option>{cooperationID.name}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="staticEmail" className="col-form-label">
                    Periode
                  </label>
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <input
                        required
                        readOnly
                        type="number"
                        className="form-control mt-2"
                        onChange={(e) => setPeriod(e.target.value)}
                        value={period}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-control mt-2">Tahun</div>
                    </div>
                  </div>
                </div>

                {cooperationID === ""
                  ? ""
                  : cooperationID.data_content.map((items, i) => {
                      return (
                        <div key={i} className={`form-group`}>
                          <label
                            htmlFor="staticEmail"
                            className="col-form-label"
                          >
                            {items.cooperation_form}
                          </label>
                          <textarea
                            readOnly
                            value={items.form_content}
                            name=""
                            id={i}
                            cols="30"
                            rows="5"
                            className="form-control"
                          ></textarea>
                        </div>
                      );
                    })}

                <div className="form-group row">
                  <div className="col-sm-12 d-flex justify-content-end">
                    <button
                      type="button"
                      onClick={(e) => rejectDokument(e)}
                      className="btn btn-sm btn-rounded-full bg-red-primary text-white"
                    >
                      Tolak
                    </button>

                    <button
                      type="button"
                      onClick={(e) => ajukanRevisi(e)}
                      className="btn btn-sm btn-rounded-full bg-yellow-primary text-white mx-5"
                    >
                      Ajukan Revisi
                    </button>

                    <button
                      type="button"
                      onClick={(e) => acceptDokument(e)}
                      className="btn btn-sm btn-rounded-full bg-blue-primary text-white "
                    >
                      Terima
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ReviewKerjasama;
