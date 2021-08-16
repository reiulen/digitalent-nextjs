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

const StepOne = () => {
  const dispatch = useDispatch();
  const importSwitch = () => import("bootstrap-switch-button-react");
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

  const saveDraft = () => {
    router.push("/subvit/trivia");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    router.push("/subvit/trivia/tambah/step-2");
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
      <div className="col-lg-12 col-xxl-4 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <StepInput step="1"></StepInput>
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Tambah Trivia
            </h3>
          </div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label "
                >
                  Akademi
                </label>
                <div className="col-sm-10">
                  <select
                    name="academy_id"
                    id=""
                    onChange={(e) => setRole(e.target.value)}
                    className="form-control"
                  >
                    <option selected> -Pilih Akademi -</option>
                    <option value="1"> Computer Scientist </option>
                    <option value="1"> Designer </option>
                  </select>
                  <span className="text-muted">Silahkan Pilih Akademi</span>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label "
                >
                  Tema
                </label>
                <div className="col-sm-10">
                  <select
                    name="the_id"
                    id=""
                    onChange={(e) => setRole(e.target.value)}
                    className="form-control"
                  >
                    <option selected> -Pilih Tema-</option>
                    <option value="1"> Cloud Computing </option>
                    <option value="1"> UI/UX Designer </option>
                  </select>
                  <span className="text-muted">Silahkan Pilih Tema</span>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label "
                >
                  Pelatihan
                </label>
                <div className="col-sm-10">
                  <select
                    name="training_id"
                    id=""
                    onChange={(e) => setRole(e.target.value)}
                    className="form-control"
                  >
                    <option selected> -Pilih Pelatihan-</option>
                    <option value="1"> Google Cloud Computing </option>
                    <option value="1"> Adobe UI/UX Designer </option>
                  </select>
                  <span className="text-muted">Silahkan Pilih Pelatihan</span>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label "
                >
                  Kategori
                </label>
                <div className="col-sm-10">
                  <select
                    name="category"
                    id=""
                    onChange={(e) => setRole(e.target.value)}
                    className="form-control"
                  >
                    <option selected> -Pilih Kategori-</option>
                    <option value="tes_trivia"> Tes Trivia </option>
                    <option value="mid_tes"> Mid Tes </option>
                  </select>
                  <span className="text-muted">Silahkan Pilih Kategori</span>
                </div>
              </div>

              <div className="form-group row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label "
                >
                  Metode
                </label>
                <div className="col-sm-10">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="method"
                      value="option1"
                    />
                    <label className="form-check-label">Entry Soal</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="method"
                      value="option2"
                    />
                    <label className="form-check-label">Import .csv/.xls</label>
                  </div>

                  <div>
                    <span className="text-muted">
                      Silahkan Pilih Metode Tambah Trivia
                    </span>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-2"></div>
                <div className="col-sm-10 text-right">
                  <button
                    className="btn btn-light-primary btn-sm mr-2"
                  >
                    Simpan & Lanjut
                  </button>
                  <button
                    onClick={saveDraft}
                    className="btn btn-primary btn-sm"
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

export default StepOne;
