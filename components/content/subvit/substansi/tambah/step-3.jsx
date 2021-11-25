import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import moment from "moment";

import {
  updateSubtanceQuestionBanksPublish,
  clearErrors,
} from "../../../../../redux/actions/subvit/subtance.actions";
import { UPDATE_SUBTANCE_QUESTION_BANKS_PUBLISH_RESET } from "../../../../../redux/types/subvit/subtance.type";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInput from "/components/StepInput";
import LoadingPage from "../../../../LoadingPage";
import styles from "../../trivia/edit/step.module.css";
import { helperRegexNumber } from "../../../../../utils/middleware/helper";

const StepThree = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  let { id } = router.query;
  const { loading, error, success } = useSelector(
    (state) => state.updateSubtanceQuestionBanksPublish
  );
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

  useEffect(() => {
    // if (error) {
    //     dispatch(clearErrors())
    // }

    if (success) {
      dispatch({
        type: UPDATE_SUBTANCE_QUESTION_BANKS_PUBLISH_RESET,
      });
      router.push({
        pathname: `/subvit/substansi`,
        query: { success: true },
      });
    }
  }, [dispatch, error, success, router]);

  const [, forceUpdate] = useState();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [duration, setDuration] = useState("");
  const [jumlah_soal, setJumlahSoal] = useState("");
  const [passing_grade, setPassingGrade] = useState("");
  const [status, setStatus] = useState("");

  const saveDraft = () => {
    if (simpleValidator.current.allValid()) {
      const start_at = moment(startDate).format("YYYY-MM-DD");
      const end_at = moment(endDate).format("YYYY-MM-DD");

      const data = {
        _method: "put",
        start_at,
        end_at,
        duration,
        passing_grade,
        status: 0,
        questions_to_share: jumlah_soal,
      };

      dispatch(updateSubtanceQuestionBanksPublish(data, id, token));
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
    if (
      moment(startDate).format("YYYY-MM-DD") >
      moment(endDate).format("YYYY-MM-DD")
    ) {
      Swal.fire(
        "Oops !",
        "Tanggal sebelum tidak boleh melebihi tanggal sesudah.",
        "error"
      );
      setStartDate(null);
      setEndDate(null);
    } else {
      if (simpleValidator.current.allValid()) {
        const start_at = moment(startDate).format("YYYY-MM-DD");
        const end_at = moment(endDate).format("YYYY-MM-DD");

        const data = {
          _method: "put",
          start_at,
          end_at,
          duration,
          passing_grade,
          status: status,
          questions_to_share: jumlah_soal,
        };

        dispatch(updateSubtanceQuestionBanksPublish(data, id, token));
      } else {
        simpleValidator.current.showMessages();
        forceUpdate(1);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Isi data dengan benar !",
        });
      }
    }
  };

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleTotalSoal = (e) => {
    if (e === "" || helperRegexNumber.test(e)) {
      setJumlahSoal(e);
    }
  };

  const handleDuration = (e) => {
    if (e === "" || helperRegexNumber.test(e)) {
      setDuration(e);
    }
  };

  const handlePassingGrade = (e) => {
    if (e === "" || helperRegexNumber.test(e)) {
      setPassingGrade(e);
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
      <div className="col-lg-12 order-1 order-xxl-2 px-0">
        {loading ? <LoadingPage loading={loading} /> : ""}
        <div className="card card-custom card-stretch gutter-b">
          <StepInput step="3"></StepInput>
          <div className="card-header border-0">
            <h2 className="card-title h2 text-dark">Publish Soal</h2>
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
                    className="form-control w-100 d-block"
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
                    className="form-control w-100"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("tanggal sampai")
                    }
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    dateFormat="dd/MM/yyyy"
                    autoComplete="off"
                    placeholderText="Silahkan Pilih Tanggal Sampai"
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
                      className="form-control"
                      aria-describedby="basic-addon2"
                      value={jumlah_soal}
                      placeholder="20"
                      onChange={(e) => handleTotalSoal(e.target.value)}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("jumlah soal")
                      }
                      min={1}
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
                    "required|integer",
                    { className: "text-danger" }
                  )}
                </div>

                <div className="col-sm-12 col-md-6">
                  <p
                    htmlFor="staticEmail"
                    className=" col-form-label font-weight-bold pb-0"
                  >
                    Durasi Test
                  </p>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      aria-describedby="basic-addon2"
                      value={duration}
                      placeholder="123 "
                      onChange={(e) => handleDuration(e.target.value)}
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
                    "required|integer",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group row">
                <div className="col-md-12">
                  <p
                    htmlFor="staticEmail"
                    className=" col-form-label font-weight-bold pb-0"
                  >
                    Passing Grade
                  </p>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="80.00"
                      className="form-control"
                      aria-describedby="basic-addon2"
                      value={passing_grade}
                      onChange={(e) => handlePassingGrade(e.target.value)}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("passing grade")
                      }
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text bg-primary text-white"
                        id="basic-addon2"
                      >
                        Nilai
                      </span>
                    </div>
                  </div>
                  {simpleValidator.current.message(
                    "passing grade",
                    passing_grade,
                    "required|integer",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group row">
                <div className="col-md-12">
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
                    onChange={(event) => handleStatus(event)}
                    onBlur={(event) => {
                      handleStatus(event);
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
                    passing_grade,
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

export default StepThree;
