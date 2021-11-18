import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

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
import { route } from "next/dist/server/router";

const ViewReviewTraining = ({ token }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [note, setNote] = useState("");

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

  const [dataPelatihan, setDataPelatihan] = useState({
    peserta: review.program_dts === "1" ? "Ya" : "Tidak",
    ketentuanPeserta:
      review.ketentuan_peserta === "1"
        ? "Peserta dapat mengikuti pelatihan ini ditahun yang sama pada Akademi ini"
        : "",
    namaPelatihan: review.name,
    levelPelatihan: review.level_pelatihan,
    akademi: review.akademi,
    tema: review.tema,
    logoReference: review.file_path
      ? review.file_path + review.logo
      : "/assets/media/default.jpg",
    thumbnail:
      review.file_path && review.thumbnail
        ? review.file_path + review.thumbnail
        : "/assets/media/default.jpg",
    silabus: review.silabus,
    metodePelatihan: review.metode_pelatihan,
    penyelenggara: review.penyelenggara,
    mitra: review.mitra_nama,
    tanggalPendaftaran:
      moment(review.pendaftaran_mulai).format("DD MMMM YYYY") +
      " sd " +
      moment(review.pendaftaran_selesai).format("DD MMMM YYYY"),
    tanggalPelatihan:
      moment(review.pelatihan_mulai).format("DD MMMM YYYY") +
      " sd " +
      moment(review.pelatihan_selesai).format("DD MMMM YYYY"),
    deskripsi: review.deskripsi,
  });
  const [kuotaPelatihan, setKuotaPelatihan] = useState({
    kuotaTargetPendaftar: review.kuota_pendaftar,
    kuotaTargetPeserta: review.kuota_peserta,
    komitmenPeserta: review.komitmen === "1" ? "Iya" : "Tidak",
    lpjPeserta: review.lpj_peserta === "1" ? "Iya" : "Tidak",
    infoSertifikasi: review.sertifikasi === "1" ? "Iya" : "Tidak",
    metodePelatihan: review.metode_pelatihan,
    statusKuota: review.status_kuota,
    alurPendaftaran: review.alur_pendaftaran,
    zonasi: review.zonasi,
    batch: "2",
  });
  const [alamatPelatihan, setAlamatPelatihan] = useState({
    alamat: review.alamat,
    provinsi: review.provinsi,
    kota: review.kabupaten,
    disabilitas: "Umum",
  });
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
  }, [successRevisi, successTolak, dispatch, revisi, router]);

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

  const handleSetuju = () => {
    const data = {
      pelatian_id: parseInt(id),
      status: "disetujui",
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
            <h3 className="font-weight-bolder pb-5 pt-4">Data Pelatihan</h3>
            <div className="row">
              <div className="col-md-6">
                <p className="text-neutral-body">Program DTS</p>
                <p>{dataPelatihan.peserta}</p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Ketentuan Peserta</p>
                <p className="font-weight-bold">
                  {dataPelatihan.ketentuanPeserta}
                </p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <p className="text-neutral-body">Nama Pelatihan</p>
                <p className="text-dark">{dataPelatihan.namaPelatihan}</p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Level Pelatihan</p>
                <p className="text-dark">{dataPelatihan.levelPelatihan}</p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <p className="text-neutral-body">Akademi</p>
                <p className="text-dark">{dataPelatihan.akademi}</p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Tema</p>
                <p className="text-dark">{dataPelatihan.tema}</p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <p className="text-neutral-body">Logo Reference</p>
                <div className="">
                {dataPelatihan.logoReference.split("/").length === 3 && (
                    <p>-</p>
                  )}
                   {dataPelatihan.logoReference.split("/").length > 3 && (
                  <figure
                    className="avatar item-rtl"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                    <Image
                      src={dataPelatihan.logoReference}
                      alt="image"
                      width={160}
                      height={160}
                      objectFit="cover"
                    />
                  </figure>
                
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Thumbnail</p>
                <div className="">
                {dataPelatihan.thumbnail.includes("default") && (
                    <p>-</p>
                  )}
                   {dataPelatihan.thumbnail.includes("https") && (
                  <figure
                    className="avatar item-rtl"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                    <Image
                      src={dataPelatihan.thumbnail}
                      alt="image"
                      width={160}
                      height={160}
                      objectFit="cover"
                    />
                  </figure>
                  )}
                </div>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <p className="text-neutral-body">Silabus</p>
                <p className="text-dark">{dataPelatihan.silabus}</p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Metode Pelatihan</p>
                <p className="text-dark">{dataPelatihan.metodePelatihan}</p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <p className="text-neutral-body">Penyelenggara</p>
                <p className="text-dark">{dataPelatihan.penyelenggara}</p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Mitra</p>
                <p className="text-dark">{dataPelatihan.mitra}</p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <p className="text-neutral-body">Tanggal Pendaftaran</p>
                <p className="text-dark">{dataPelatihan.tanggalPendaftaran}</p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Tanggal Pelatihan</p>
                <p className="text-dark">{dataPelatihan.tanggalPelatihan}</p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-12">
                <p className="text-neutral-body">Deskripsi</p>
                <div
                  dangerouslySetInnerHTML={{ __html: dataPelatihan.deskripsi }}
                  style={{ overflowWrap: "break-word" }}
                ></div>
              </div>
            </div>

            <h3 className="font-weight-bolder pb-5 pt-4">Kuota Pelatihan</h3>
            <div className="row">
              <div className="col-md-6">
                <p className="text-neutral-body">Kuota Target Pendaftar</p>
                <p className="text-dark">
                  {kuotaPelatihan.kuotaTargetPendaftar}
                </p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Kuota Target Peserta</p>
                <p className="text-dark">{kuotaPelatihan.kuotaTargetPeserta}</p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <p className="text-neutral-body">Komitmen Peserta</p>
                <p className="text-dark">{kuotaPelatihan.komitmenPeserta}</p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">LPJ Peserta</p>
                <p className="text-dark">{kuotaPelatihan.lpjPeserta}</p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <p className="text-neutral-body">Info Sertifikasi</p>
                <p className="text-dark"> {kuotaPelatihan.infoSertifikasi}</p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Metode Pelatihan</p>
                <p className="text-dark"> {kuotaPelatihan.metodePelatihan}</p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <p className="text-neutral-body">Status Kuota</p>
                <p className="text-dark"> {kuotaPelatihan.statusKuota}</p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Alur Pendaftaran</p>
                <p className="text-dark"> {kuotaPelatihan.alurPendaftaran}</p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <p className="text-neutral-body">Zonasi</p>
                <p className="text-dark"> {kuotaPelatihan.zonasi}</p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Batch</p>
                <p className="text-dark"> {kuotaPelatihan.batch}</p>
              </div>
            </div>

            <h3 className="font-weight-bolder pb-5 pt-4">Alamat</h3>
            <div className="row">
              <div className="col-md-12">
                <p className="text-neutral-body">Alamat</p>
                <p className="text-dark">{alamatPelatihan.alamat}</p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-6">
                <p className="text-neutral-body">Provinsi</p>
                <p className="text-dark">{alamatPelatihan.provinsi}</p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Kota / Kabupaten</p>
                <p className="text-dark">{alamatPelatihan.kota}</p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col-md-12">
                <p className="text-neutral-body">Disabilitas</p>
                <p className="text-dark">{alamatPelatihan.disabilitas}</p>
              </div>
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

export default ViewReviewTraining;
