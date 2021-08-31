import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { getSingleCooporation } from "../../../../redux/actions/partnership/mk_cooporation.actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Edit = () => {
  const dispatch = useDispatch();
  const router = useRouter();

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

  const importSwitch = () => import("bootstrap-switch-button-react");
  const SwitchButton = dynamic(importSwitch, {
    ssr: false,
  });

  const [status, setStatus] = useState("");
  const handleChangeStatus = (e) => {
    console.log("e.target.checked", e.target.checked);
    setStatus(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Apakah anda yakin ingin update data?",
      // text: "Data ini tidak bisa dikembalikan !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya !",
      dismissOnDestroy: false,
    }).then(async (result) => {
      if (result) {
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
        try {
          let id = router.query.id;
          let { data } = await axios.post(
            `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/${id}`,
            formData
          );
          router.push({
            pathname: "/partnership/master-kategori-kerjasama",
            query: { update: true },
          });
        } catch (error) {
          // console.log("erorr message",error.response.message);
          notify(error.response.data.message);
        }
      }
    });
  };

  const getSingleData = async (id) => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/${id}`
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
    getSingleData(router.query.id);
  }, [router.query.id]);
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
            <h3 className="card-title font-weight-bolder text-dark">
              Edit Master Kategori Kerjasama
            </h3>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Kategori Kerjasama
                </label>
                <div className="col-sm-10">
                  <input
                    required
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Kategori Lembaga"
                    value={categoryCooporation}
                    onChange={(e) => setCategoryCooporation(e.target.value)}
                  />
                </div>
              </div>

              {/* start loop */}
              {stateDataSingle === undefined
                ? ""
                : stateDataSingle.map((item, index) => {
                    return (
                      <div key={index}>
                        <div className="form-group row">
                          <label
                            htmlFor="staticEmail"
                            className="col-sm-2 col-form-label"
                          >
                            {index === 0 ? "Form Kerjasama" : ""}
                          </label>
                          <div className="col-sm-10 position-relative">
                            <input
                              type="text"
                              name="name"
                              className="form-control"
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
                                className="btn position-absolute"
                                style={{ top: "0", right: "10px" }}
                              >
                                <Image
                                  src={`/assets/icon/trash.svg`}
                                  width={18}
                                  height={18}
                                  alt="btn-delete"
                                />
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
                        <div className="form-group row">
                          <label
                            htmlFor="staticEmail"
                            className="col-sm-2 col-form-label"
                          >
                            {index === 0 ? "Form Kerjasama" : ""}
                          </label>
                          <div className="col-sm-10">
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
                      </div>
                    );
                  })}
              {/* end loop old */}

              {/* <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                ></label>
                <div className="col-sm-10">
                  <Link href="/publikasi/artikel">
                      <a
                        className="btn btn-outline-primary btn-sm"
                        style={{
                          backgroundColor: "#40A9FF",
                          color: "#FFFFFF",
                        }}
                      >
                        Tambah Form Kerjasama
                      </a>
                    </Link>
                </div>
              </div> */}

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                ></label>

                <p
                  className="btn btn-outline-primary btn-sm ml-4"
                  style={{
                    backgroundColor: "#40A9FF",
                    color: "#FFFFFF",
                  }}
                  onClick={() => handleAddInput()}
                >
                  Tambah Form Kerjasama
                </p>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Status
                </label>
                <div className="col-sm-1">
                  {/* <input
                    required
                      className="checkbox"
                      checked={status}
                      type="checkbox"
                      onChange={(e) => handleChangeStatus(e)}
                    /> */}
                  <label className="switches">
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
                    >
                      {status ? "Aktif" : "Tidak aktif"}
                    </span>
                  </label>
                </div>
              </div>

              {/* <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Status
                </label>
                <div className="col-sm-1">
                  <SwitchButton
                    checked={false}
                    onlabel=" "
                    onstyle="primary"
                    offlabel=" "
                    offstyle="danger"
                    size="sm"
                  />
                </div>
              </div> */}

              <div className="form-group row">
                <div className="row align-items-right mt-5 ml-auto">
                  <div className="col-sm mr-4">
                    <Link href="/partnership/master-kategori-kerjasama">
                      <a className="btn btn-outline-primary btn-sm mr-3">
                        Kembali
                      </a>
                    </Link>
                    {/* <Link href="/partnership/master-kategori-kerjasama"> */}
                    {/* <button
                      className="btn btn-primary btn-sm"
                      onClick={(e) => submit(e)}
                    >
                      Simpan
                    </button> */}
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Simpan
                    </button>
                    {/* </Link> */}
                  </div>
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
