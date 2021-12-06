import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  updateTriviaQuestionBanksPublish,
  clearErrors,
} from "../../../../../redux/actions/subvit/trivia-question.actions";
import { UPDATE_TRIVIA_QUESTION_BANKS_PUBLISH_RESET } from "../../../../../redux/types/subvit/trivia-question.type";

import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import moment from "moment";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInputPublish from "/components/StepInputPublish";
import LoadingPage from "../../../../LoadingPage";
import styles from "./step.module.css";
import { helperRegexNumber } from "../../../../../utils/middleware/helper";

const StepTwo = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

  let { id } = router.query;
  const { error: detailData, trivia } = useSelector(
    (state) => state.detailTriviaQuestionBanks
  );
  const { loading, error, success } = useSelector(
    (state) => state.updateTriviaQuestionBanksPublish
  );

  const [startDate, setStartDate] = useState(
    trivia.start_at ? new Date(trivia.start_at) : new Date(Date.now())
  );
  const [endDate, setEndDate] = useState(
    trivia.end_at ? new Date(trivia.end_at) : new Date(Date.now())
  );
  const [duration, setDuration] = useState(trivia.duration || "");
  const [jumlah_soal, setJumlahSoal] = useState(
    trivia.questions_to_share || ""
  );
  const [status, setStatus] = useState(trivia.status);
  const [, forceUpdate] = useState();

  useEffect(() => {
    // if (error) {
    //     dispatch(clearErrors())
    // }

    if (success) {
      dispatch({
        type: UPDATE_TRIVIA_QUESTION_BANKS_PUBLISH_RESET,
      });
      router.push({
        pathname: `/subvit/trivia`,
        query: { success: true },
      });
    }
  }, [dispatch, error, success, router]);

  const saveDraft = () => {
    if (simpleValidator.current.allValid()) {
      const start_at = moment(startDate).format("YYYY-MM-DD");
      const end_at = moment(endDate).format("YYYY-MM-DD");

      const data = {
        _method: "put",
        start_at,
        end_at,
        duration,
        status: 0,
        questions_to_share: jumlah_soal,
      };

      dispatch(updateTriviaQuestionBanksPublish(data, id, token));
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

    if (simpleValidator.current.allValid()) {
      const start_at = moment(startDate).format("YYYY-MM-DD");
      const end_at = moment(endDate).format("YYYY-MM-DD");

      const data = {
        _method: "put",
        start_at,
        end_at,
        duration,
        status: status,
        questions_to_share: jumlah_soal,
      };
      dispatch(updateTriviaQuestionBanksPublish(data, id, token));
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

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  const handleChange = (e) => {
    setStatus(e.target.value);
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
              onClick={handleResetError}
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
          <StepInputPublish step="2"></StepInputPublish>
          <div className="card-header border-0">
            <h2 className="card-title h2 text-dark">Publish Soal </h2>
          </div>
          <div className="card-body pt-0">
            <form onSubmit={onSubmit}>
              <div className="form-group row">
                <div className="col-sm-12 col-md-6">
                  <p
                    htmlFor="staticEmail"
                    className=" col-form-label font-weight-bold pb-0"
                  >
                    Pelaksanaan Dari
                  </p>
                  <DatePicker
                    wrapperClassName="datepicker"
                    className="form-control"
                    name="start_date"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("tanggal mulai")
                    }
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="dd/MM/yyyy"
                    autoComplete="off"
                    value={startDate}
                    placeholderText="Silahkan Pilih Tanggal Dari"
                  />

                  {simpleValidator.current.message(
                    "tanggal mulai",
                    startDate,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>

                <div className="col-sm-12 col-md-6">
                  <p
                    htmlFor="staticEmail"
                    className=" col-form-label font-weight-bold pb-0"
                  >
                    Pelaksanaan Sampai
                  </p>
                  <DatePicker
                    wrapperClassName="datepicker"
                    className="form-control"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    placeholderText="Silahkan Pilih Tanggal Sampai"
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("tanggal sampai")
                    }
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="dd/MM/yyyy"
                    autoComplete="off"
                    value={endDate}
                    disabled={!startDate}
                  />

                  {simpleValidator.current.message(
                    "tanggal sampai",
                    endDate,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 col-md-6">
                  <p
                    htmlFor="staticEmail"
                    className=" col-form-label font-weight-bold pb-0"
                  >
                    Jumlah Soal
                  </p>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="20"
                      className="form-control"
                      aria-describedby="basic-addon2"
                      value={jumlah_soal}
                      onChange={(e) => {
                        if (
                          e.target.value === "" ||
                          helperRegexNumber.test(e.target.value)
                        ) {
                          setJumlahSoal(e.target.value);
                        }
                      }}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("jumlah soal")
                      }
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text bg-primary text-white"
                        id="basic-addon2"
                      >
                        Soal
                      </span>
                    </div>
                  </div>

                  {simpleValidator.current.message(
                    "jumlah soal",
                    jumlah_soal,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
                <div className="col-sm-12 col-md-6">
                  <p
                    htmlFor="staticEmail"
                    className=" col-form-label font-weight-bold pb-0"
                  >
                    Durasi Tes
                  </p>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="123"
                      maxLength={3}
                      className="form-control"
                      aria-describedby="basic-addon2"
                      value={duration}
                      onChange={(e) => {
                        if (
                          e.target.value === "" ||
                          helperRegexNumber.test(e.target.value)
                        ) {
                          setDuration(e.target.value);
                        }
                      }}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("durasi")
                      }
                      min={1}
                    />
                    <div className="input-group-append bg-sedondary">
                      <span
                        className="input-group-text bg-primary text-white"
                        id="basic-addon2"
                      >
                        Menit
                      </span>
                    </div>
                  </div>
                  {simpleValidator.current.message(
                    "durasi",
                    duration,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 col-md-12">
                  <p
                    htmlFor="staticEmail"
                    className=" col-form-label font-weight-bold pb-0"
                  >
                    Status
                  </p>
                  <select
                    name="status"
                    id=""
                    className="form-control"
                    value={status}
                    onChange={(event) => handleChange(event)}
                    onBlur={(event) => {
                      (event) => handleChange(event);
                      simpleValidator.current.showMessageFor("status");
                    }}
                  >
                    <option value="" selected disabled>
                      -- PILIH STATUS --
                    </option>
                    <option value={1}> Publish </option>
                    <option value={0}> Draft </option>
                  </select>
                  {simpleValidator.current.message(
                    "status",
                    status,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-2"></div>
                <div className="col-sm-10 text-right">
                  <button
                    className={`${styles.btnNext} btn btn-light-ghost-rounded-full mr-2`}
                    type="submit"
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

export default StepTwo;
