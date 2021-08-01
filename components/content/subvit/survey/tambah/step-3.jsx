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

const StepThree = () => {
  const dispatch = useDispatch();
  const importSwitch = () => import("bootstrap-switch-button-react");
  const SwitchButton = dynamic(importSwitch, {
    ssr: false,
  });

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

  const [role, setRole] = useState("");

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
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <StepInput step="3"></StepInput>
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Publish Soal
            </h3>
          </div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="form-group row">
                <div className="col-sm-6 col-md-3">
                  <span>Pelaksanaan dari</span>
                  <input
                    name="start_at"
                    type="date"
                    className="form-control"
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <small className="text-muted">
                    Silahkan Pilih Tanggal Dari
                  </small>
                </div>

                <div className="col-sm-6 col-md-3">
                  <span>Sampai</span>
                  <input
                    name="end_at"
                    type="date"
                    className="form-control"
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <small className="text-muted">
                    Silahkan Pilih Tanggal Sampai
                  </small>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-6 col-md-2">
                  <span>Jumlah Soal</span>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      aria-describedby="basic-addon2"
                    />
                    <div class="input-group-append">
                      <span class="input-group-text" id="basic-addon2">
                        Soal
                      </span>
                    </div>
                  </div>
                  <small className="text-muted">
                    Silahkan Input Jumlah Soal
                  </small>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-6 col-md-2">
                  <span>Durasi Test</span>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      aria-describedby="basic-addon2"
                    />
                    <div class="input-group-append">
                      <span class="input-group-text" id="basic-addon2">
                        Menit
                      </span>
                    </div>
                  </div>
                  <small className="text-muted">
                    Silahkan Input Durasi Test
                  </small>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-6 col-md-2">
                  <span>Passing Grade</span>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      aria-describedby="basic-addon2"
                    />
                    <div class="input-group-append">
                      <span class="input-group-text" id="basic-addon2">
                        Nilai
                      </span>
                    </div>
                  </div>
                  <small className="text-muted">
                    Silahkan Input Passing Grade
                  </small>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 col-md-8">
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

              <div className="form-group row">
                <div className="col-sm-2"></div>
                <div className="col-sm-10 text-right">
                  <Link href='/subvit/survey/'>
                    <a className="btn btn-light-primary btn-sm mr-2">
                      Simpan & Lanjut
                    </a>
                  </Link>
                  <button className="btn btn-primary btn-sm">
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

export default StepThree;
