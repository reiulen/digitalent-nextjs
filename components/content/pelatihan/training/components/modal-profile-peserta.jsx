import React from "react";

const ModalProfile = () => {
  return (
    <>
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Data Profile Peserta
            </h5>
            <button
              type="button"
              class="btn"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">
                <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
              </span>
            </button>
          </div>
          <div class="modal-body">
            <div className="list-profile">
              <div className="content-profile mb-5">
                <p className="mb-2 fz-16 text-dark fw-600">Data Diri</p>
                <p className="fz-16">
                  Foto Profil, Nama Lengkap, Email, NIK, Jenis Kelamin, Nomor
                  Handphone, Agama, Tempat dan Tanggal Lahir, Kontak Darurat
                  (Nama Lengkap, Nomor Handphone, Hubungan), File KTP
                </p>
              </div>
              <div className="content-profile mb-5">
                <p className="mb-2 fz-16 text-dark fw-600">Alamat KTP</p>
                <p className="fz-16">
                  Alamat Lengkap, Provinsi, Kota/Kabupaten, Kecamatan,
                  Desa/Kelurahan, Kode Pos
                </p>
              </div>
              <div className="content-profile mb-5">
                <p className="mb-2 fz-16 text-dark fw-600">Alamat Domisili</p>
                <p className="fz-16">
                  Alamat Lengkap, Provinsi, Kota/Kabupaten, Kecamatan,
                  Desa/Kelurahan, Kode Pos
                </p>
              </div>
              <div className="content-profile">
                <p className="mb-2 fz-16 text-dark fw-600">
                  Pendidikan Terakhir
                </p>
                <p className="fz-16 mb-2">Jenjang Pendidikan :</p>
                <ul className="fz-16">
                  <li>
                    TK, SD, SMP, SMA : Asal Sekolah, Tahun Masuk, File Ijazah
                  </li>
                  <li>
                    D3, S1, S2, S3 : Asal Perguruan Tinggi, Program Studi, IPK,
                    Tahun Masuk, File Ijazah
                  </li>
                </ul>
              </div>
              <div className="content-profile">
                <p className="mb-2 fz-16 text-dark fw-600">Pekerjaan</p>
                <p className="fz-16 mb-2">Status Pekerjaan :</p>
                <ul className="fz-16">
                  <li>
                    Bekerja : Pekerjaan, Perusahaan/Institut Tempat Bekerja,
                    Penghasilan Tidak Bekerja
                  </li>
                  <li>
                    Pelajar/Mahasiswa: Sekolah/Perguruan Tinggi, Tahun Masuk
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalProfile;
