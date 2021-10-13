import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import PageWrapper from "../../../../wrapper/page.wrapper";
import StepReviewPelatihan from "../../../../StepReviewPelatihan";
import LoadingPage from "../../../../LoadingPage";

import {
  revisiReviewPelatihan,
  tolakReviewPelatihan,
  clearErrors,
} from "../../../../../redux/actions/pelatihan/review.actions";
import {
  REVISI_REVIEW_RESET,
  TOLAK_REVIEW_RESET,
} from "../../../../../redux/types/pelatihan/review.type";

const ReviewFormRegister = ({ token }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [note, setNote] = useState("");

  const { id } = router.query;
  const { error: errorRevisi, revisi } = useSelector(
    (state) => state.listRevisi
  );
  const { error: errorReview, review } = useSelector(
    (state) => state.getReviewStep2
  );
  const {
    success: successRevisi,
    loading: loadingReview,
    error: errorPostRevisi,
  } = useSelector((state) => state.revisiReview);
  const {
    success: successTolak,
    loading: loadingTolak,
    error: errorPostTolak,
  } = useSelector((state) => state.tolakReview);

  let loading;
  if (loadingReview) {
    loading = loadingReview;
  } else if (loadingTolak) {
    loading = loadingTolak;
  }

  let error;
  if (errorRevisi) {
    error = errorRevisi;
  } else if (errorReview) {
    error = errorReview;
  } else if (errorPostRevisi) {
    error = errorPostRevisi;
  } else if (errorPostTolak) {
    error = errorPostTolak;
  }

  const [formBuilder] = useState(review.FormBuilder);
  // const [formBuilder] = useState([
  //   {
  //     key: 1,
  //     name: "Nama Depan",
  //     element: "text",
  //     size: "col-md-6",
  //     option: "",
  //     dataOption: "",
  //     required: true,
  //   },
  //   {
  //     key: 2,
  //     name: "Nama Belakang",
  //     element: "text",
  //     size: "col-md-6",
  //     option: "",
  //     dataOption: "",
  //     required: true,
  //   },
  //   {
  //     key: 3,
  //     name: "Jenis Kelamin",
  //     element: "radio",
  //     size: "col-md-12",
  //     option: "manual",
  //     dataOption: "laki laki;perempuan",
  //     required: false,
  //   },
  // ]);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    revisi &&
      revisi.length !== 0 &&
      revisi.map((row, i) => {
        setNote(row.revisi);
      });

    if (successRevisi) {
      dispatch({ type: REVISI_REVIEW_RESET });
      router.push({
        pathname: `/pelatihan/review`,
        query: { success: true },
      });
    }

    if (successTolak) {
      dispatch({ type: TOLAK_REVIEW_RESET });
      router.push({
        pathname: `/pelatihan/review`,
        query: { success: true },
      });
    }
  }, [successRevisi, successTolak]);

  const readerElementHandler = (row, i) => {
    switch (row.element) {
      case "text":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <input
              type={row.element}
              name=""
              className="form-control"
              required={row.required === "1" ? true : false}
            />
          </div>
        );
        break;
      case "select":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <select
              name=""
              className="form-control"
              required={row.required === "1" ? true : false}
            >
              {row.option === "manual"
                ? row.dataOption.split(";").map((dat, i) => (
                    <option value={dat} key={i}>
                      {dat}
                    </option>
                  ))
                : ""}
            </select>
          </div>
        );
        break;
      case "checkbox":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="my-auto">
              {row.option === "manual"
                ? row.dataOption.split(";").map((dat, i) => (
                    <div className="form-check pb-3" key={i}>
                      <input
                        type="checkbox"
                        name="plotRegistration"
                        className="form-check-input"
                        required={row.required === "1" ? true : false}
                        value={dat}
                      />
                      <label className="form-check-label">{dat}</label>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        );
        break;
      case "textarea":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <textarea
              name=""
              cols="30"
              rows="5"
              className="form-control"
              required={row.required === "1" ? true : false}
            />
          </div>
        );
        break;
      case "radio":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="my-auto">
              {row.option === "manual"
                ? row.dataOption.split(";").map((dat, i) => (
                    <div className="form-check pb-3" key={i}>
                      <input
                        type="radio"
                        name={row.name}
                        className="form-check-input"
                        value={dat}
                        required={row.required === "1" ? true : false}
                      />
                      <label className="form-check-label">{dat}</label>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        );
        break;
      case "file_image":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                accept="image/png, image/jpeg , image/jpg"
                required={row.required === "1" ? true : false}
              />
              <label className="custom-file-label" htmlFor="customFile">
                Belum ada File
              </label>
            </div>
          </div>
        );
        break;
      case "file_doc":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                accept="application/pdf"
                required={row.required === "1" ? true : false}
              />
              <label className="custom-file-label" htmlFor="customFile">
                Belum ada File
              </label>
            </div>
          </div>
        );
        break;
      case "date":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <input
              type={row.element}
              name=""
              className="form-control"
              required={row.required === "1" ? true : false}
            />
          </div>
        );
        break;
      default:
        break;
    }
  };

  const handleRevisi = () => {
    setShowModal(false);
    const data = {
      pelatian_id: parseInt(id),
      revisi: note,
    };
    dispatch(revisiReviewPelatihan(data, token));
  };

  const handleTolak = () => {
    const data = {
      pelatian_id: parseInt(id),
      status: "ditolak",
    };
    dispatch(tolakReviewPelatihan(data, token));
  };

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  return (
    <PageWrapper>
      {error && (
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
      )}
      <StepReviewPelatihan
        step={2}
        title1="Data Pelatihan"
        title2="Form Pendaftaran"
        title3="Form Komitmen"
        link1={`/pelatihan/review/view-pelatihan/${id}`}
        link2={`/pelatihan/review/view-pelatihan/view-form-pendaftaran/${id}`}
        link3={`/pelatihan/review/view-pelatihan/view-form-komitmen/${id}`}
      />

      <div className="col-lg-12 order-1 px-0">
        {loading && <LoadingPage loading={loading} />}
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-body py-4">
            <h3 className="font-weight-bolder pb-5 pt-4">Form Pendaftaran</h3>

            <div className="row">
              {formBuilder.map((row, i) => (
                <>{readerElementHandler(row, i)}</>
              ))}
            </div>

            <div className="form-group my-5 pb-5">
              <div className="float-left mb-5">
                <button
                  className="btn btn-rounded-full btn-sm py-3 px-5 btn-danger mr-2"
                  type="button"
                  onClick={() => handleTolak()}
                >
                  Tolak
                </button>
              </div>
              <div className="float-right mb-5">
                <button
                  className="btn btn-light-ghost-rounded-full mr-2"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  Revisi
                </button>
                <button className="btn btn-primary-rounded-full" type="button">
                  Setujui
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Catatan Revisi</Modal.Title>
          <button
            type="button"
            className="close"
            onClick={() => setShowModal(false)}
          >
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mb-5">
            <label className="p-0">Isi Catatan</label>
            <textarea
              rows="5"
              className="form-control"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-light-ghost-rounded-full mr-2"
            type="button"
            onClick={() => setShowModal(false)}
          >
            Batal
          </button>
          <button
            className="btn btn-primary-rounded-full"
            type="button"
            onClick={() => handleRevisi()}
          >
            Ajukan Revisi
          </button>
        </Modal.Footer>
      </Modal>
    </PageWrapper>
  );
};

export default ReviewFormRegister;
