import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import styles from "../listTraining.module.css";

import PageWrapper from "../../../../wrapper/page.wrapper";
import StepViewPelatihan from "../../../../StepViewPelatihan";
import Cookies from "js-cookie";
import ViewStep1Component from "../components/view-training/view-step1.component";

const ViewTrainingStep1 = () => {
  const router = useRouter();
  const token_permission = Cookies.get("token_permission");

  const { error: errorReview, review } = useSelector(
    (state) => state.getReviewStep1
  );

  const { id } = router.query;

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
    logoReference:
      review.logo && review.logo !== "Belum ada file"
        ? process.env.END_POINT_API_IMAGE_PELATIHAN + review.logo
        : "/assets/media/default.jpg",
    thumbnail:
      review.thumbnail && review.thumbnail !== "Belum ada file"
        ? process.env.END_POINT_API_IMAGE_PELATIHAN + review.thumbnail
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
  const [kuotaPelatihan, setKuotaPelatihan] = useState({
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
  const [alamatPelatihan, setAlamatPelatihan] = useState({
    alamat: review.alamat,
    provinsi: review.provinsi,
    kota: review.kabupaten,
  });

  return (
    <PageWrapper>
      <StepViewPelatihan
        step={1}
        title1="Data Pelatihan"
        title2="Form Pendaftaran"
        title3="Form Komitmen"
        title4="Parameter"
        link1={`/pelatihan/pelatihan/view-pelatihan/${id}`}
        link2={`/pelatihan/pelatihan/view-pelatihan/view-form-pendaftaran/${id}`}
        link3={`/pelatihan/pelatihan/view-pelatihan/view-komitmen/${id}`}
        link4={`/pelatihan/pelatihan/view-pelatihan/view-parameter/${id}`}
      />

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-body py-4">
            <ViewStep1Component review={review} />
            <div className="button my-5">
              <div className="text-right">
                <button
                  className="btn btn-primary-rounded-full mr-2"
                  type="button"
                  onClick={() => router.push("/pelatihan/pelatihan")}
                >
                  Kembali
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ViewTrainingStep1;
