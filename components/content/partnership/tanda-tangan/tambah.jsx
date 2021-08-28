import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import dynamic from "next/dynamic";
import SignaturePad from "react-signature-pad-wrapper";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";

import LoadingPage from "../../../LoadingPage";

import {
  newTandaTangan,
  clearErrors,
} from "../../../../redux/actions/partnership/tandaTangan.actions";
import { NEW_TANDA_TANGAN_RESET } from "../../../../redux/types/partnership/tandaTangan.type";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from 'axios'

const TambahTandaTangan = () => {
  const importSwitch = () => import("bootstrap-switch-button-react");

  const signCanvas = useRef({});
  const dispatch = useDispatch();
  const router = useRouter();
  const Swal = require("sweetalert2");

  const clear = () => {
    signCanvas.current.clear();
    setTandaTangan("");
    // Swal.fire({
    //   icon: "success",
    //   title: "Tanda Tangan Berhasil di Reset",
    //   // text: "Berhasil",
    // });
  };

  // const { loading, error, success } = useSelector(
  //   (state) => state.newTandaTangan
  // );

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [tandaTangan, setTandaTangan] = useState("");

  const [error, setError] = useState({
    nama: "",
    jabatan: "",
    tandaTangan: "",
  });

  const dataTandaTangan = () => {
    const data = signCanvas.current.toDataURL();
    if (!tandaTangan) {
      Swal.fire({
        icon: "success",
        title: "Tanda Tangan Berhasil di Buat",
        // text: "Berhasil",
      });
      setTandaTangan(data);
    }
    if (tandaTangan) {
      Swal.fire({
        icon: "error",
        title: "Tanda Tangan Sudah dibuat",
        // text: "Berhasil",
      });
    }
  };

  // useEffect(() => {
  //   if (success) {
  //     router.push({
  //       pathname: `/partnership/tanda-tangan`,
  //       query: { success: true },
  //     });
  //   }
  // }, [dispatch,router, error, success, simpleValidator]);

  const submit = (e) => {
    e.preventDefault()
    console.log("nama",nama)
    console.log("jabatan",jabatan)
    console.log("tanda_tangan",tandaTangan)
    // e.preventDefault();
    if (nama === "") {
      setError({...error,nama: "Harus isi nama"})
      notify("Harus isi nama")
    } else if (jabatan === "") {
      setError({ ...error,jabatan: "Harus isi jabatan"})
      notify("Harus isi jabatan")
    } else if (tandaTangan === "") {
      setError({...error,tandaTangan: "Pastikan sudah mengisi tanda tangan dan tekan tombol Buat tanda tangan"})
      notify("Pastikan sudah mengisi tanda tangan dan tekan tombol Buat tanda tangan")
    } else {
      console.log("sdfsdfdsf")
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
          formData.append("name", nama);
          formData.append("position", jabatan);
          formData.append("signature_image", tandaTangan);

          try {
            let { data } = await axios.post(
              `${process.env.END_POINT_API_PARTNERSHIP}/api/signatures/create`,
              formData
            );
            console.log("data",data)
            router.push({
              pathname: "/partnership/tanda-tangan",
              query: { success: true },
            });
          } catch (error) {
            console.log(error.response.data.message);
            notify(error.response.data.message);
          }


        }
      });


    }
  }

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
    // if (simpleValidator.current.allValid()) {
    //   if (error) {
    //     dispatch(clearErrors());
    //   }

    //   if (success) {
    //     dispatch({
    //       type: NEW_TANDA_TANGAN_RESET,
    //     });
    //   }
    //   const data = {
    //     name: nama,
    //     position: jabatan,
    //     signature_image: tandaTangan,
    //     // status: "aktif",
    //   };
    //   console.log(data);
    //   dispatch(newTandaTangan(data));
    //   // dispatch(newTandaTangan(JSON.stringify(data)));
    // } else {
    //   simpleValidator.current.showMessages();
    //   // forceUpdate(1);
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "Isi data dengan benar !",
    //   });
    // }
  

  const onNewReset = () => {
    router.replace("/partnership/tanda-tangan", undefined, { shallow: true });
  };

  return (
    <PageWrapper>
      {/* {error ? (
        <div
          className="alert alert-custom alert-light-danger fade show mb-5"
          role="alert"
        >
          <div className="alert-icon">
            <i className="flaticon-warning"></i>
          </div>
          <div className="alert-text">{error}</div>
          <div className="alert-close">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">
                <i className="ki ki-close"></i>
              </span>
            </button>
          </div>
        </div>
      ) : (
        ""
      )} */}

      {/* {success ? (
        <div
          className="alert alert-custom alert-light-success fade show mb-5"
          role="alert"
        >
          <div className="alert-icon">
            <i className="flaticon2-checkmark"></i>
          </div>
          <div className="alert-text">Berhasil Menambah Data</div>
          <div className="alert-close">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={onNewReset}
            >
              <span aria-hidden="true">
                <i className="ki ki-close"></i>
              </span>
            </button>
          </div>
        </div>
      ) : (
        ""
      )} */}

      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        {/* {loading ? <LoadingPage loading={loading} /> : ""} */}
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
            <h3 className="card-title font-weight-bolder text-dark">
              Tambah Tanda Tangan Digital
            </h3>
          </div>
          <div className="card-body">
            <form onSubmit={submit}>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Nama
                </label>
                <div className="col-sm-10">
                  <input
                  onFocus={()=>setError({...error,nama:""})}
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Nama"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    // onBlur={() =>
                    //   simpleValidator.current.showMessageFor("nama")
                    // }
                  />
                  {error.nama ? <p className="error-text">{error.nama}</p>:"" }
                  {/* {simpleValidator.current.message(
                    "nama",
                    nama,
                    "required|max:50",
                    {
                      className: "text-danger",
                    }
                  )} */}
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Jabatan
                </label>
                <div className="col-sm-10">
                  <input
                  onFocus={()=>setError({...error,jabatan:""})}
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Jabatan"
                    onChange={(e) => setJabatan(e.target.value)}
                    // onBlur={() =>
                    //   simpleValidator.current.showMessageFor("jabatan")
                    // }
                  />
                  {error.jabatan ? <p className="error-text">{error.jabatan}</p>:"" }
                  {/* {simpleValidator.current.message(
                    "jabatan",
                    jabatan,
                    "required|max:50",
                    {
                      className: "text-danger",
                    }
                  )} */}
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Buat Tanda Tangan
                </label>
                <div className="col-sm-10">
                  <div
                    style={{
                      background: "#FFFFFF",
                      boxShadow: "inset 10px 10px 40px rgba(0, 0, 0, 0.08)",
                      borderRadius: "10px",
                    }}
                  >
                    <SignaturePad
                      ref={signCanvas}
                      options={{
                        minWidth: 1,
                        maxWidth: 3,
                        penColor: "rgb(66, 133, 244)",
                      }}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("tandaTangan")
                      }
                    />
                    {simpleValidator.current.message(
                      "tandaTangan",
                      tandaTangan,
                      "required",
                      { className: "text-danger" }
                    )}
                  </div>
                  <div className="col-sm-10 mt-5">
                    {/* <Link href="/publikasi/artikel"> */}
                    <a
                      className="btn btn-outline-primary mr-2 btn-sm"
                      style={{
                        backgroundColor: "#C9F7F5",
                        color: "#1BC5BD",
                      }}
                      onClick={() => dataTandaTangan()}
                    >
                      Buat Tanda Tangan
                    </a>
                    {/* </Link> */}
                    <button
                      type="button"
                      onClick={clear}
                      className="btn btn-sm"
                      style={{
                        backgroundColor: "#EDEF80",
                        color: "#B0B328",
                      }}
                    >
                      Buat Ulang Tanda Tangan
                    </button>
                  </div>
                </div>
              </div>

              {/* masih rancu di pakai atau tidaknya */}

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
                    <Link href="/partnership/tanda-tangan">
                      <a className="btn btn-outline-primary btn-sm mr-3">
                        Kembali
                      </a>
                    </Link>
                    {/* <Link href="/partnership/tanda-tangan"> */}
                    <button
                      className="btn btn-primary btn-sm"
                      // onClick={(e) => onSubmit(e)}
                      type="submit"
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

export default TambahTandaTangan;
