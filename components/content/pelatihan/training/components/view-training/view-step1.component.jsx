import React, { useState } from "react";
import moment from "moment";
import Image from "next/image";
import { Modal } from "react-bootstrap";
import { PDFReader } from "react-read-pdf";

const ViewStep1Component = ({ review }) => {
  const [dataPelatihan] = useState({
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
    mitra: review.mitra_nama || "-",
    tanggalPendaftaran:
      moment(review.pendaftaran_mulai).utc().format("DD MMMM YYYY") +
      " sd " +
      moment(review.pendaftaran_selesai).utc().format("DD MMMM YYYY"),
    tanggalPelatihan:
      moment(review.pelatihan_mulai).utc().format("DD MMMM YYYY") +
      " sd " +
      moment(review.pelatihan_selesai).utc().format("DD MMMM YYYY"),
    deskripsi: review.deskripsi,
  });
  const [kuotaPelatihan] = useState({
    kuotaTargetPendaftar: review.kuota_pendaftar,
    kuotaTargetPeserta: review.kuota_peserta,
    komitmenPeserta: review.komitmen === "1" ? "Iya" : "Tidak",
    lpjPeserta: review.lpj_peserta === "1" ? "Iya" : "Tidak",
    infoSertifikasi: review.sertifikasi === "0" ? "Tidak" : review.sertifikasi,
    metodePelatihan: review.metode_pelatihan,
    statusKuota: review.status_kuota,
    alurPendaftaran: review.alur_pendaftaran,
    zonasi: review.zonasi,
    batch: review.batch,
  });
  const [alamatPelatihan] = useState({
    alamat: review.alamat,
    provinsi: review.provinsi,
    kota: review.kabupaten,
    disabilitas: "Umum",
  });
  const [showModalPreview, setShowModalPreview] = useState(false);

  return (
    <>
      <h3 className="font-weight-bolder pb-5 pt-4">Data Pelatihan</h3>
      <div className="row">
        <div className="col-md-6">
          <p className="text-neutral-body mb-2 fz-14">Program DTS</p>
          <p className="fz-16" style={{ color: "#1f1f1f" }}>
            {dataPelatihan.peserta}
          </p>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-6">
          <p className="text-neutral-body mb-2 fz-14">Nama Pelatihan</p>
          <p className="fz-16" style={{ color: "#1f1f1f" }}>
            {dataPelatihan.namaPelatihan}
          </p>
        </div>
        <div className="col-md-6">
          <p className="text-neutral-body mb-2 fz-14">Level Pelatihan</p>
          <p className="fz-16" style={{ color: "#1f1f1f" }}>
            {dataPelatihan.levelPelatihan}
          </p>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-6">
          <p className="text-neutral-body mb-2 fz-14">Akademi</p>
          <p className="fz-16" style={{ color: "#1f1f1f" }}>
            {dataPelatihan.akademi}
          </p>
        </div>
        <div className="col-md-6">
          <p className="text-neutral-body mb-2 fz-14">Tema</p>
          <p className="fz-16" style={{ color: "#1f1f1f" }}>
            {dataPelatihan.tema}
          </p>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-6">
          <p className="text-neutral-body mb-2 fz-14">Logo Reference</p>
          <div className="">
            {dataPelatihan.logoReference.split("/").length === 3 && <p>-</p>}
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
          <p className="text-neutral-body mb-2 fz-14">Thumbnail</p>
          <div className="">
            {dataPelatihan.thumbnail.includes("default") && <p>-</p>}
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
          <p className="text-neutral-body mb-2 fz-14">Silabus</p>
          <p
            className="fz-16 text-primary"
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => setShowModalPreview(true)}
          >
            {dataPelatihan.silabus.split("/")[2]}
          </p>
        </div>
        <div className="col-md-6">
          <p className="text-neutral-body mb-2 fz-14">Metode Pelatihan</p>
          <p className="fz-16" style={{ color: "#1f1f1f" }}>
            {dataPelatihan.metodePelatihan}
          </p>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-6">
          <p className="text-neutral-body mb-2 fz-14">Penyelenggara</p>
          <p className="fz-16" style={{ color: "#1f1f1f" }}>
            {dataPelatihan.penyelenggara}
          </p>
        </div>
        <div className="col-md-6">
          <p className="text-neutral-body mb-2 fz-14">Mitra</p>
          <p className="fz-16" style={{ color: "#1f1f1f" }}>
            {dataPelatihan.mitra}
          </p>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-6">
          <p className="text-neutral-body mb-2 fz-14">Tanggal Pendaftaran</p>
          <p className="fz-16" style={{ color: "#1f1f1f" }}>
            {dataPelatihan.tanggalPendaftaran}
          </p>
        </div>
        <div className="col-md-6">
          <p className="text-neutral-body mb-2 fz-14">Tanggal Pelatihan</p>
          <p className="fz-16" style={{ color: "#1f1f1f" }}>
            {dataPelatihan.tanggalPelatihan}
          </p>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-12">
          <p className="text-neutral-body mb-2 fz-14">Deskripsi</p>
          <div
            dangerouslySetInnerHTML={{ __html: dataPelatihan.deskripsi }}
            style={{ overflowWrap: "break-word" }}
          ></div>
        </div>
      </div>

      <h3 className="font-weight-bolder pb-5 pt-4">Kuota Pelatihan</h3>
      <div className="row">
        <div className="col-md-6">
          <p className="text-neutral-body mb-2 fz-14">Kuota Target Pendaftar</p>
          <p className="fz-16" style={{ color: "#1f1f1f" }}>
            {kuotaPelatihan.kuotaTargetPendaftar}
          </p>
        </div>
        <div className="col-md-6">
          <p className="text-neutral-body mb-2 fz-14">Kuota Target Peserta</p>
          <p className="fz-16" style={{ color: "#1f1f1f" }}>
            {kuotaPelatihan.kuotaTargetPeserta}
          </p>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-6">
          <p className="text-neutral-body mb-2 fz-14">Komitmen Peserta</p>
          <p className="fz-16" style={{ color: "#1f1f1f" }}>
            {kuotaPelatihan.komitmenPeserta}
          </p>
        </div>
        <div className="col-md-6">
          <p className="text-neutral-body mb-2 fz-14">LPJ Peserta</p>
          <p className="fz-16" style={{ color: "#1f1f1f" }}>
            {kuotaPelatihan.lpjPeserta}
          </p>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-6">
          <p className="text-neutral-body mb-2 fz-14">Info Sertifikasi</p>
          <p className="fz-16" style={{ color: "#1f1f1f" }}>
            {" "}
            {kuotaPelatihan.infoSertifikasi}
          </p>
        </div>
        <div className="col-md-6">
          <p className="text-neutral-body mb-2 fz-14">Metode Pelatihan</p>
          <p className="fz-16" style={{ color: "#1f1f1f" }}>
            {" "}
            {kuotaPelatihan.metodePelatihan}
          </p>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-6">
          <p className="text-neutral-body mb-2 fz-14">Status Kuota</p>
          <p className="fz-16" style={{ color: "#1f1f1f" }}>
            {" "}
            {kuotaPelatihan.statusKuota}
          </p>
        </div>
        <div className="col-md-6">
          <p className="text-neutral-body mb-2 fz-14">Alur Pendaftaran</p>
          <p className="fz-16" style={{ color: "#1f1f1f" }}>
            {" "}
            {kuotaPelatihan.alurPendaftaran}
          </p>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-6">
          <p className="text-neutral-body mb-2 fz-14">Zonasi</p>
          <p className="fz-16" style={{ color: "#1f1f1f" }}>
            {" "}
            {kuotaPelatihan.zonasi}
          </p>
        </div>
        <div className="col-md-6">
          <p className="text-neutral-body mb-2 fz-14">Batch</p>
          <p className="fz-16" style={{ color: "#1f1f1f" }}>
            {" "}
            {kuotaPelatihan.batch}
          </p>
        </div>
      </div>

      <h3 className="font-weight-bolder pb-5 pt-4">Alamat</h3>
      <div className="row">
        <div className="col-md-12">
          <p className="text-neutral-body mb-2 fz-14">Alamat</p>
          <p className="fz-16" style={{ color: "#1f1f1f" }}>
            {alamatPelatihan.alamat}
          </p>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-6">
          <p className="text-neutral-body mb-2 fz-14">Provinsi</p>
          <p className="fz-16" style={{ color: "#1f1f1f" }}>
            {alamatPelatihan.provinsi}
          </p>
        </div>
        <div className="col-md-6">
          <p className="text-neutral-body mb-2 fz-14">Kota / Kabupaten</p>
          <p className="fz-16" style={{ color: "#1f1f1f" }}>
            {alamatPelatihan.kota}
          </p>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-md-12">
          <p className="text-neutral-body mb-2 fz-14">Disabilitas</p>
          {review.umum === "1" && (
            <p className="fz-16 mb-1" style={{ color: "#1f1f1f" }}>
              Umum
            </p>
          )}
          {review.tuna_netra === "1" && (
            <p className="fz-16 mb-1" style={{ color: "#1f1f1f" }}>
              Tuna Netra
            </p>
          )}
          {review.tuna_rungu === "1" && (
            <p className="fz-16 mb-1" style={{ color: "#1f1f1f" }}>
              Tuna Rungu
            </p>
          )}
          {review.tuna_daksa === "1" && (
            <p className="fz-16 mb-1" style={{ color: "#1f1f1f" }}>
              Tuna Daksa
            </p>
          )}
        </div>
      </div>

      <h3 className="font-weight-bolder pb-5 pt-4">Status Pelatihan</h3>
      <div className="row">
        <div className="col-md-12">
          <p className="text-neutral-body mb-2 fz-14">Status Publish</p>
          <p className="fz-16" style={{ color: "#1f1f1f" }}>
            {review.status_publish === "0"
              ? "Unpublish"
              : review.status_publish === "1"
              ? "Publish"
              : "Unlisted"}
          </p>
        </div>
        <div className="col-md-12">
          <p className="text-neutral-body mb-2 fz-14">Link Detail Pelatihan</p>
          {review.status_publish === 0 ? (
            <p className="fz-16 ">
              {`http://dts-dev.majapahit.id/detail/pelatihan/${review.id}?akademiId=${review.akademi_id}`}
            </p>
          ) : (
            <p
              className="fz-16 text-primary"
              style={{ cursor: "pointer" }}
              onClick={() =>
                window.open(
                  `http://dts-dev.majapahit.id/detail/pelatihan/${review.id}?akademiId=${review.akademi_id}`,
                  "_blank"
                )
              }
            >
              {`http://dts-dev.majapahit.id/detail/pelatihan/${review.id}?akademiId=${review.akademi_id}`}
            </p>
          )}
        </div>
      </div>

      <Modal
        show={showModalPreview}
        onHide={() => setShowModalPreview(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Preview Silabus</Modal.Title>
          <button
            type="button"
            className="close"
            onClick={() => setShowModalPreview(false)}
          >
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div style={{ overflow: "scroll", height: 600 }}>
            <PDFReader url={review.file_path + review.silabus} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() =>
              window.open(review.file_path + review.silabus, "_blank")
            }
          >
            Download
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewStep1Component;
