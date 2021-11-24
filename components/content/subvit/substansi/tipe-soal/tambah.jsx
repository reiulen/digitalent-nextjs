import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";

import {
  newSubtanceQuestionBanksType,
  clearErrors,
} from "../../../../../redux/actions/subvit/subtance-question-type.actions";
import { NEW_SUBTANCE_QUESTION_TYPE_RESET } from "../../../../../redux/types/subvit/subtance-question-type.type";

import PageWrapper from "/components/wrapper/page.wrapper";
import styles from "../../trivia/edit/step.module.css";
import { useRouter } from "next/router";
import LoadingPage from "../../../../LoadingPage";
import { FAIL_COOPERTAION_ACTIVE_SELECT_BY_ID } from "../../../../../redux/types/partnership/management_cooporation.type";
import { helperRegexNumber } from "../../../../../utils/middleware/helper";

const TambahTipeSoal = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, success } = useSelector(
    (state) => state.newSubtanceQuestionType
  );
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

  useEffect(() => {
    // if (error) {
    //     dispatch(clearErrors())
    // }

    if (success) {
      dispatch({
        type: NEW_SUBTANCE_QUESTION_TYPE_RESET,
      });
      router.push({
        pathname: `/subvit/substansi/tipe-soal`,
        query: { success: true },
      });
    }
  }, [dispatch, error, success, router]);

  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [status_, setStatus_] = useState(false);
  const [, forceUpdate] = useState();

  const saveDraft = () => {
    if (error) {
      dispatch(clearErrors());
    }
    if (simpleValidator.current.allValid()) {
      const data = {
        name,
        value,
        status: 0,
      };

      dispatch(newSubtanceQuestionBanksType(data, token));
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi data dengan benar !",
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (error) {
      dispatch(clearErrors());
    }
    if (simpleValidator.current.allValid()) {
      const data = {
        name,
        value,
        status: status_,
      };
      dispatch(newSubtanceQuestionBanksType(data, token));
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi data dengan benar !",
      });
    }
  };

  const handleChange = (e) => {
    setStatus_(e.target.value);
  };

  const handleBobot = (e) => {
    if (e === "" || helperRegexNumber.test(e)) {
      setValue(e);
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
      <div className="col-lg-12 order-1 order-xxl-2 px-0">
        {loading ? <LoadingPage loading={loading} /> : ""}
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h2 className="card-title h2 text-dark">
              Tambah Tipe Soal Test Substansi
            </h2>
          </div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="form-group row">
                <div className="col-sm-12">
                  <span className="font-weight-bold">Tipe Soal</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="*Contoh: Analitik"
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("tipe soal")
                    }
                  />
                  {simpleValidator.current.message(
                    "tipe soal",
                    name,
                    "required|max:50",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12">
                  <span className="font-weight-bold">Bobot Nilai</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="*Contoh: 2"
                    onChange={(e) => handleBobot(e.target.value)}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("bobot nilai")
                    }
                    value={value}
                  />
                  {simpleValidator.current.message(
                    "bobot nilai",
                    value,
                    "required|integer",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12">
                  <span className="font-weight-bold">Status</span>
                  <select
                    name="training_id"
                    id=""
                    onChange={(event) => handleChange(event)}
                    onBlur={(event) => handleChange(event)}
                    className="form-control"
                  >
                    <option value="" selected>
                      {" "}
                      -Pilih Status-{" "}
                    </option>
                    <option value={1}> Publish </option>
                    <option value={0}> Draft </option>
                  </select>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 text-right">
                  <button
                    className={`${styles.btnNext} btn btn-light-ghost-rounded-full mr-2`}
                    onClick={onSubmit}
                  >
                    Simpan & Lanjut
                  </button>
                  <button
                    className="btn btn-primary-rounded-full"
                    onClick={saveDraft}
                    type="button"
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

export default TambahTipeSoal;
