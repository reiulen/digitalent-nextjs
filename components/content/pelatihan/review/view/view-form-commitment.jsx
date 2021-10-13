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

const ViewFormCommitment = ({ token }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [note, setNote] = useState("");

  const { id } = router.query;
  const { error: errorRevisi, revisi } = useSelector(
    (state) => state.listRevisi
  );
  const { error: errorReview, review } = useSelector(
    (state) => state.getReviewStep3
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

  const [komitmenPeserta] = useState(review.komitmen);
  const [formKomitmen] = useState(review.deskripsi);
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
      <StepReviewPelatihan
        step={3}
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
            <h3 className="font-weight-bolder pb-5 pt-4">Form Komitmen</h3>

            <div className="row">
              <div className="col-md-12">
                <p className="text-neutral-body">Komitmen Peserta</p>
                <p className="text-dark">
                  {komitmenPeserta === "1" ? "Ya" : "Tidak"}
                </p>
              </div>
              {komitmenPeserta === "1" && (
                <div className="col-md-12">
                  <p className="text-neutral-body">Form Komitmen</p>
                  <textarea rows="6" className="form-control" disabled>
                    {formKomitmen}
                  </textarea>
                </div>
              )}
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
                <button className="btn btn-primary-rounded-full" type="submit">
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

export default ViewFormCommitment;
