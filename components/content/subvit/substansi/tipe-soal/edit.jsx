import React, { useState, useEffect } from "react";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import {
  newArtikel,
  clearErrors,
} from "/redux/actions/publikasi/artikel.actions";
import { NEW_ARTIKEL_RESET } from "/redux/types/publikasi/artikel.type";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInput from "/components/StepInput";
import { useRouter } from "next/router";

const EditTipeSoal = () => {
  const dispatch = useDispatch();
  const importSwitch = () => import("bootstrap-switch-button-react");
  const SwitchButton = dynamic(importSwitch, {
    ssr: false,
  });
  const router = useRouter();

  const { loading, error, success } = useSelector((state) => state.newArtikel);

  useEffect(() => {
    // if (error) {
    //     dispatch(clearErrors())
    // }

    if (success) {
      dispatch({
        type: NEW_ARTIKEL_RESET,
      });
    }
  }, [dispatch, error, success]);

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const saveAndContinue = () => {
    router.push("/subvit/substansi/tipe-soal");
  };

  const saveDraft = () => {
    router.push("/subvit/substansi/tipe-soal");
  };

  const onSubmit = (e) => {
    e.preventDefault();
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
      <div className="col-lg-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Edit Tipe Soal
            </h3>
          </div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="form-group row">
                <div className="col-sm-12">
                  <span>Tipe Soal</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="*Contoh: Analitik"
                  />
                  <span className="text-muted">Silahkan Input Tipe Soal</span>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12">
                  <span>Bobot Nilai</span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="*Contoh: 2"
                  />
                  <span className="text-muted">Silahkan Input Bobot Nilai</span>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12">
                  <span>Status</span>
                  <select
                    name="training_id"
                    id=""
                    onChange={(e) => setRole(e.target.value)}
                    className="form-control"
                  >
                    <option value="1"> Publish </option>
                    <option value="1"> Draft </option>
                  </select>
                  <span className="text-muted">
                    Silahkan Pilih Status Publish
                  </span>
                </div>
              </div>

              {/* disini akan di ubah */}
              <div className="form-group row">
                <div className="col-sm-12 text-right">
                  <button
                    className="btn btn-light-primary btn-sm mr-2"
                    onClick={saveAndContinue}
                  >
                    Kembali
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={saveDraft}
                  >
                    Simpan Draft
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

export default EditTipeSoal;
