import React, { useState, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateMasterCategory } from "../../../../redux/actions/partnership/mk_cooporation.actions";
import { useDispatch, useSelector } from "react-redux";

const Edit = ({ token }) => {
  const router = useRouter();
  let dispatch = useDispatch();
  const allMKCooporation = useSelector((state) => state.allMKCooporation);
  const [categoryCooporation, setCategoryCooporation] = useState("");
  const [stateDataSingleOld, setStateDataSingleOld] = useState([]);
  const [stateDataSingle, setStateDataSingle] = useState([]);
  const handleChange = (e, index) => {
    const { name, value } = e.target;

    let _temp_new = [...stateDataSingle];
    let _temp_old = [...stateDataSingleOld];

    if (_temp_new[index]["isTipe"] === _temp_old[index]["isTipe"]) {
      _temp_new[index][name] = value;
      setStateDataSingle(_temp_new);
    } else {
      _temp_new[index]["name"] = value;
      _temp_old[index]["cooperation_form"] = value;
      setStateDataSingle(_temp_new);
      setStateDataSingleOld(_temp_old);
    }
  };

  const handleAddInput = () => {
    let arr_new = [...stateDataSingle];
    let arr_old = [...stateDataSingleOld];

    arr_new.push({
      cooperation_category_id: new Date(),
      name: "",
      isTipe: "new",
    });
    arr_old.push({
      cooperation_category_id: new Date(),
      cooperation_form: "",
      isTipe: "old",
    });
    setStateDataSingle(arr_new);
    setStateDataSingleOld(arr_old);
  };

  const handleDelete = (i) => {
    let arr_new = [...stateDataSingle];
    let arr_old = [...stateDataSingleOld];
    let filterResultNew = arr_new.filter((items, index) => index !== i);
    let filterResultOld = arr_old.filter((items, index) => index !== i);
    setStateDataSingle(filterResultNew);
    setStateDataSingleOld(filterResultOld);
  };

  const [status, setStatus] = useState("");
  const handleChangeStatus = (e) => {
    setStatus(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Apakah anda yakin ingin ubah data?",
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
        // here
        let formData = new FormData();
        formData.append("cooperation_categories", categoryCooporation);
        formData.append("_method", "PUT");
        for (let i = 0; i < stateDataSingle.length; i++) {
          let statusPro = status ? 1 : 0;
          let method = "PUT";
          if (stateDataSingle[i].isTipe === stateDataSingleOld[i].isTipe) {
            formData.append("_method", method);
            formData.append(
              `cooperation_form_old[${i}]`,
              stateDataSingleOld[i].cooperation_form
            );
            formData.append(`cooperation_form[${i}]`, stateDataSingle[i].name);
            formData.append("status", statusPro);
          } else {
            formData.append("_method", method);
            formData.append(
              `cooperation_form_old[${i}]`,
              stateDataSingle[i].name
            );
            formData.append(`cooperation_form[${i}]`, stateDataSingle[i].name);
            formData.append("status", statusPro);
          }
        }
        dispatch(updateMasterCategory(token, formData, router.query.id));
      }
    });
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
    async function getSingleData (id,token) {
      try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      let arr = [],
        arr_new = [];
      data.data.cooperation_category_forms.forEach((item) => {
        item.isTipe = "old";
        arr.push(item);
      });
      data.data.cooperation_category_forms.forEach((item) => {
        item.name = item.cooperation_form;
        item.isTipe = "old";
        arr_new.push(item);
      });
      setStateDataSingle(arr_new);
      setStateDataSingleOld(arr);
      setCategoryCooporation(data.data.cooperation_categories);
      setStatus(data.data.status);
    } catch (error) {
      console.log(error);
    }

    } 
    getSingleData(router.query.id,token);
    if (allMKCooporation.status === "success") {
      router.push({
        pathname: "/partnership/master-kategori-kerjasama",
        query: { update: true },
      });
    }
  }, [router.query.id, allMKCooporation.status,router,token]);
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
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark"
              style={{ fontSize: "24px" }}
            >
              Ubah Master Kategori Kerjasama
            </h3>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Kategori Kerjasama
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  placeholder="Masukkan Kategori Lembaga"
                  value={categoryCooporation}
                  onChange={(e) => setCategoryCooporation(e.target.value)}
                />
              </div>

              {/* start loop */}
              {stateDataSingle === undefined
                ? ""
                : stateDataSingle.map((item, index) => {
                    return (
                      <div key={index}>
                        <div className="form-group">
                            {index === 0 ? 
                          <label
                            htmlFor="staticEmail"
                            className="col-form-label"
                            >
                            Form Kerjasama
                            
                          </label>
                            : 
                            
                            ""}
                          <div className="position-relative d-flex align-items-center">
                            <input
                              type="text"
                              name="name"
                              className="form-control mr-6"
                              placeholder="Tujuan Kerjasama"
                              value={item.name}
                              onChange={(e) => handleChange(e, index)}
                            />
                            {index === 0 ? (
                              ""
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleDelete(index)}
                                className="btn"
                          style={{ backgroundColor:"#EE2D41" }}
                              >
                                <svg
                                  className="position-relative"
                                  style={{ bottom: "2px" }}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                >
                                  <path fill="none" d="M0 0h24v24H0z" />
                                  <path
                                    d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"
                                    fill="#ffffff"
                                  />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              {/* end loop */}

              {/* start loop old */}
              {stateDataSingleOld === undefined
                ? ""
                : stateDataSingleOld.map((item, index) => {
                    return (
                      <div key={index} className="d-none">
                        <div className="form-group">
                            {index === 0 ? 
                          <label
                            htmlFor="staticEmail"
                            className="col-form-label"
                            >
                            Form Kerjasama
                            
                          </label>
                            : ""
                            
                            }
                          <input
                            required
                            type="text"
                            name="cooperation_form"
                            className="form-control"
                            placeholder="Tujuan Kerjasama"
                            value={item.cooperation_form}
                            onChange={(e) => handleChange(e, index)}
                          />
                        </div>
                      </div>
                    );
                  })}
              {/* end loop old */}

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label"></label>

                <p
                  className="btn btn-rounded-full bg-blue-primary text-white"
                  style={{
                    backgroundColor: "#40A9FF",
                    color: "#FFFFFF",
                    width: "max-content",
                  }}
                  onClick={() => handleAddInput()}
                >
                  Tambah Form Kerjasama
                </p>
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Status kerjasama
                </label>
                <div className="row mt-5">
                  <div className="col-12 d-flex align-items-center">
                    <label className="switches mr-5">
                      <input
                        required
                        className="checkbox"
                        checked={status}
                        type="checkbox"
                        onChange={(e) => handleChangeStatus(e)}
                      />
                      <span
                        className={`sliders round ${
                          status ? "text-white" : "pl-2"
                        }`}
                      ></span>
                    </label>
                    <p
                      className="position-relative mb-0"
                      style={{ bottom: "5px" }}
                    >
                      {status ? "Aktif" : "Tidak aktif"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/partnership/master-kategori-kerjasama">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                    onClick={(e) => handleSubmit(e)}
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

export default Edit;
