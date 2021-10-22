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

  // state cek review card-version
  const [allCooperationView, setAllCooperationView] = useState([]);
  const [titleView, setTitleView] = useState("");
  const [dateView, setDateView] = useState("");
  const [cooperationIDView, setCooperationIDView] = useState("");
  const [periodView, setPeriodView] = useState("");
  const [periodUnitView, setPeriodUnitView] = useState("tahun");
  const [noteView, setNoteView] = useState("");
  const [mitra, setMitra] = useState("");

  // cek review card-version

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
            `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal/accept/${router.query.id}`,
            null,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          router.push({
            pathname: "/partnership/kerjasama/",
            query: { successTerima: true },
          });
        } catch (error) {
          Swal.fire("Gagal", `${error.response.data.message}`, "error").then(
            () => {
              router.push({
                pathname: `/partnership/kerjasama`,
              });
            }
          );
        }
      }
    });
  };

  const rejectDokument = (e) => {
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
            `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal/reject/${router.query.id}`,
            null,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );

          router.push({
            pathname: "/partnership/kerjasama/",
            query: { successReject: true },
          });
        } catch (error) {



          Swal.fire("Gagal", `${error.response.data.message}`, "error").then(
            () => {
              router.push({
                pathname: `/partnership/kerjasama`,
              });
            }
          );



        }
      }
    });
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

  const [statusInfo, setstatusInfo] = useState("");
  useEffect(() => {
    async function setDataSingle(id, token) {
      try {
        let { data } = await axios.get(
          `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal/cek-progres/${id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setTitle(data.data.title);
        setDate(data.data.submission_date);
        setCooperationID(data.data.cooperation_category);
        setPeriod(data.data.period);
        setPeriodUnit(data.data.period_unit);
      } catch (error) {
        notify(error.response.data.message);
      }
    }
    setDataSingle(router.query.id, token);

    async function setDataSingleSelesaiReview(id, version, token) {
      try {
        let { data } = await axios.get(
          `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal/show-revisi/${id}/${version}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setTitleView(data.data.title);
        setDateView(data.data.date);
        setCooperationIDView(data.data.cooperation_category);
        setPeriodView(data.data.period);
        setPeriodUnitView(data.data.period_unit);
        setAllCooperationView(data.data.cooperation_category.data_content);
        setNoteView(data.data.note);
        setMitra(data.data.mitra);
      } catch (error) {
        notify(error.response.data.message);
      }
    }

    setDataSingleSelesaiReview(router.query.id, router.query.version, token);
    if (router.query.statusInfo) {
      setstatusInfo(router.query.statusInfo);
    }
  }, [router.query.id, router.query.version, router.query.statusInfo, token]);

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
              className="card-title font-weight-bolder text-dark titles-1"
            >
              Review Kerjasama {mitra && mitra}
            </h3>
          </div>
          <div className="card-body pt-0">
            {statusInfo && statusInfo === "Sudah direview" ? (
              <form>
                <div className="form-group">
                  <label htmlFor="staticEmail" className="col-form-label">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    required
                    value={dateView && dateView}
                    className="form-control border-0"
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
                    className="form-control border-0"
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
                    className="form-control border-0 remove-icon-default"
                    readOnly
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
                        className="form-control mt-2 border-0"
                        onChange={(e) => setPeriod(e.target.value)}
                        value={periodView}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-control mt-2 border-0">Tahun</div>
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
                                className="form-control border-0"
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
                                className="form-control border-0"
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
                      style={{backgroundColor:"transparent"}}
                      disabled
                      value={noteView && noteView}
                      cols="30"
                      rows="5"
                      className="form-control border-0"
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
                    className="form-control border-0"
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
                    className="form-control border-0"
                    placeholder="Judul Kerjasama"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="staticEmail" className="col-form-label">
                    Kategori kerjasama
                  </label>
                  <input
                    name=""
                    id=""
                    className="form-control border-0"
                    disabled
                    value={cooperationID.name}
                    style={{ backgroundColor: "transparent" }}
                  />
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
                        className="form-control mt-2 border-0"
                        onChange={(e) => setPeriod(e.target.value)}
                        value={period}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-control mt-2 border-0">Tahun</div>
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
                            className="form-control border-0"
                          ></textarea>
                        </div>
                      );
                    })}

                <div className="form-group row">
                  <div className="col-sm-12 d-flex flex-wrap justify-content-start justify-content-sm-end">
                    <button
                      type="button"
                      onClick={(e) => rejectDokument(e)}
                      className="btn btn-sm btn-rounded-full bg-red-primary text-white mt-2 ml-3 ml-sm-0"
                    >
                      Tolak
                    </button>

                    <button
                      type="button"
                      onClick={(e) => ajukanRevisi(e)}
                      className="btn btn-sm btn-rounded-full bg-yellow-primary text-white mx-3 mt-2"
                    >
                      Ajukan Revisi
                    </button>

                    <button
                      type="button"
                      onClick={(e) => acceptDokument(e)}
                      className="btn btn-sm btn-rounded-full bg-blue-primary text-white mt-2 ml-3 ml-sm-0"
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
