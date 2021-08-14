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
  getAllTandaTangan,
} from "../../../../redux/actions/partnership/tandaTangan.actions";
import { NEW_TANDA_TANGAN_RESET } from "../../../../redux/types/partnership/tandaTangan.type";

const EditTandaTangan = () => {
  const importSwitch = () => import("bootstrap-switch-button-react");

  const signCanvas = useRef({});
  const dispatch = useDispatch();

  const clear = () => {
    signCanvas.current.clear();
  };

  const { loading, error, success } = useSelector(
    (state) => state.newTandaTangan
  );

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [tandaTangan, setTandaTangan] = useState("");

  const dataTandaTangan = () => {
    const data = signCanvas.current.toDataURL();
    setTandaTangan(data);
  };

  const router = useRouter();
  const Swal = require("sweetalert2");

  useEffect(() => {
    if (success) {
      router.push({
        pathname: `/partnership/tanda-tangan`,
        query: { success: true },
      });
    }
  }, [dispatch, error, success, simpleValidator]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      if (error) {
        dispatch(clearErrors());
      }

      if (success) {
        dispatch({
          type: NEW_TANDA_TANGAN_RESET,
        });
      }
      const data = {
        name: nama,
        position: jabatan,
        signature_image: tandaTangan,
        status: "aktif",
      };

      dispatch(newTandaTangan(data));

      console.log(data);
    } else {
      simpleValidator.current.showMessages();
      // forceUpdate(1);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi data dengan benar !",
      });
    }
  };
  return (
    <PageWrapper>
      {error ? (
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
      )}

      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        {loading ? <LoadingPage loading={loading} /> : ""}
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Tambah Tanda Tangan Digital
            </h3>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Nama
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Nama"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("nama")
                    }
                  />
                  {simpleValidator.current.message("nama", nama, "required", {
                    className: "text-danger",
                  })}
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
                    type="text"
                    className="form-control"
                    placeholder="Masukkan Jabatan"
                    onChange={(e) => setJabatan(e.target.value)}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("jabatan")
                    }
                  />
                  {simpleValidator.current.message(
                    "jabatan",
                    jabatan,
                    "required",
                    {
                      className: "text-danger",
                    }
                  )}
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
                      onClick={(e) => onSubmit(e)}
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

export default EditTandaTangan;
