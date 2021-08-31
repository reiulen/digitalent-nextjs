import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tambah = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const importSwitch = () => import("bootstrap-switch-button-react");
  const SwitchButton = dynamic(importSwitch, {
    ssr: false,
  });

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

  const handleSubmit =  (e) => {
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

      if(result){


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
    })

    
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
            <h3 className="card-title font-weight-bolder text-dark">
              Tambah Master Kategori Kerjasama
            </h3>
          </div>
          <form>
            <div className="card-body">
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
                    placeholder="Masukkan Kategori Lembaga"
                    type="text"
                    name="category_cooperation"
                    className="form-control"
                    onChange={(e) => setCategoryCooporation(e.target.value)}
                  />
                </div>
              </div>

              {/*  */}
              {valueCreateCooporations.map((valueCreateCooporation, index) => {
                return (
                  <div className="form-group row" key={index}>
                    {/* {console.log(valueCreateCooporation,index)} */}
                    <label
                      htmlFor="staticEmail"
                      className="col-sm-2 col-form-label"
                    >
                      {index === 0 ? "Form Kerjasama" : ""}
                    </label>
                    <div className="col-sm-10 position-relative">
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
                );
              })}

              {/*  */}
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
                  {/* <SwitchButton
                    checked={false}
                    onlabel=" "
                    onstyle="primary"
                    offlabel=" "
                    offstyle="danger"
                    size="sm"
                  /> */}
                  {/* <input
                  type="checkbox"
                  checked={status}
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

              <div className="form-group row">
                <div className="row align-items-right mt-5 ml-auto">
                  <div className="col-sm mr-4">
                    <Link href="/partnership/master-kategori-kerjasama">
                      <a className="btn btn-outline-primary btn-sm mr-3">
                        Kembali
                      </a>
                    </Link>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Simpan
                    </button>
                  </div>
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
