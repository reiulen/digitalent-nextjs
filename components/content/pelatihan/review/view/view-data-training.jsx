import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import PageWrapper from "../../../../wrapper/page.wrapper";
import StepViewPelatihan from "../../../../StepReviewPelatihan";
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
import Cookies from "js-cookie";
import Swal from "sweetalert2";

import ViewStep1Component from "../../training/components/view-training/view-step1.component";

const ViewReviewTraining = ({ token }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token_permission = Cookies.get("token_permission");

  const [note, setNote] = useState("");
  const [noteSend, setNoteSend] = useState("");

  const { id } = router.query;
  const { error: errorRevisi, revisi } = useSelector(
    (state) => state.listRevisi
  );
  const { error: errorReview, review } = useSelector(
    (state) => state.getReviewStep1
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

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setRevision();

    if (successRevisi) {
      dispatch({ type: REVISI_REVIEW_RESET });
      router.push({
        pathname: `/pelatihan/review-pelatihan`,
        query: { success: true },
      });
    }

    if (successTolak) {
      dispatch({ type: TOLAK_REVIEW_RESET });
      router.push({
        pathname: `/pelatihan/review-pelatihan`,
        query: { success: true },
      });
    }
  }, [successRevisi, successTolak, dispatch, revisi, router, setRevision]);

  const setRevision = useCallback(() => {
    let notes = [];
    let revisiLength = revisi.length + 1;
    revisi &&
      revisi.length !== 0 &&
      revisi.map((row, i) => {
        revisiLength--;
        notes.push(revisiLength + "." + " " + row.revisi);
      });

    setNote(notes.join("\n \n"));
  }, [revisi]);

  const handleRevisi = () => {
    setShowModal(false);
    const data = {
      pelatian_id: parseInt(id),
      revisi: noteSend,
    };
    dispatch(revisiReviewPelatihan(data, token, token_permission));
  };

  const handleTolak = () => {
    const data = {
      pelatian_id: parseInt(id),
      status: "ditolak",
    };

    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Menolak pelatihan ini",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(tolakReviewPelatihan(data, token, token_permission));
      }
    });
  };

  const handleSetuju = () => {
    const data = {
      pelatian_id: parseInt(id),
      status: "disetujui",
    };
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Menyetujui pelatihan ini",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yakin",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(tolakReviewPelatihan(data, token, token_permission));
      }
    });
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
      <StepViewPelatihan
        step={1}
        title1="Data Pelatihan"
        title2="Form Pendaftaran"
        title3="Form Komitmen"
        link1={`/pelatihan/review-pelatihan/view-pelatihan/${id}`}
        link2={`/pelatihan/review-pelatihan/view-pelatihan/view-form-pendaftaran/${id}`}
        link3={`/pelatihan/review-pelatihan/view-pelatihan/view-form-komitmen/${id}`}
      />

      <div className="col-lg-12 order-1 px-0">
        {loading && <LoadingPage loading={loading} />}
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-body py-4">
            <ViewStep1Component review={review} />

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
                <button
                  className="btn btn-primary-rounded-full"
                  type="button"
                  onClick={() => handleSetuju()}
                >
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
              value={noteSend}
              placeholder={note}
              onChange={(e) => setNoteSend(e.target.value)}
              maxLength={200}
            ></textarea>
            {revisi.length > 0 && (
              <p className="text-danger fz-12">
                *Sebagai history, tambahkan catatan revisi <br /> dibawah
                catatan sebelumnya.
              </p>
            )}
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

export default ViewReviewTraining;
