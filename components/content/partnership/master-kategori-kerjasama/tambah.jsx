import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tambah = () => {
  const [valueCreateCooporations, setValueCreateCooporations] = useState([""]);

  const router = useRouter();

  const [categoryCooporation, setCategoryCooporation] = useState("");
  const [status, setStatus] = useState("");

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...valueCreateCooporations];
    list[index] = value;
    setValueCreateCooporations(list);
  };

  const handleDelete = (i) => {
    let filterResult = valueCreateCooporations.filter(
      (items, index) => index !== i
    );
    setValueCreateCooporations(filterResult);
  };

  const handleChangeStatus = (e) => {
    setStatus(e.target.checked);
  };

  const handleAddInput = () => {
    setValueCreateCooporations([...valueCreateCooporations, ""]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Apakah anda yakin ingin tambah data?",
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
        let statusPro = status ? 1 : 0;

        let formData = new FormData();
        formData.append("cooperation_categories", categoryCooporation);
        formData.append("status", statusPro);

        valueCreateCooporations.forEach((item, i) => {
          formData.append(`cooperation_form[${i}]`, item);
        });
        try {
          let { data } = await axios.post(
            `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/create`,
            formData
          );

          router.push({
            pathname: `/partnership/master-kategori-kerjasama`,
            query: { success: true },
          });
        } catch (error) {
          notify(error.response.data.message);
        }
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
              Tambah Master Kategori Kerjasama
            </h3>
          </div>
          <form>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Kategori Kerjasama
                </label>
                <input
                  required
                  placeholder="Masukkan Kategori Lembaga"
                  type="text"
                  name="category_cooperation"
                  className="form-control"
                  onChange={(e) => setCategoryCooporation(e.target.value)}
                />
              </div>

              {/*  */}
              {valueCreateCooporations.map((valueCreateCooporation, index) => {
                return (
                  <div className="form-group" key={index}>
                    <label htmlFor="staticEmail" className="col-form-label">
                      {index === 0 ? "Form Kerjasama" : ""}
                    </label>
                    <div className="position-relative">
                      <input
                        required
                        placeholder={
                          index === 0 ? "Tujuan kerja sama" : "Opsional"
                        }
                        name={`cooperation${index}`}
                        type="text"
                        onChange={(e) => handleChange(e, index)}
                        className="form-control"
                        value={valueCreateCooporation}
                      />
                      {index === 0 ? (
                        ""
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleDelete(index)}
                          className="btn position-absolute"
                          style={{ top: "0", right: "3px" }}
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
                              fill="#ADB5BD"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              {/*  */}
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
                      >
                      </span>
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
                    <a className="btn btn-sm btn-rounded-full text-blue-primary border-primary mr-5">
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
            </div>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Tambah;
