import React from "react";

const ModalProfile = () => {
  return (
    <>
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="28"
                height="28"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  fill="#FFC800"
                  d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z"
                />
              </svg>{" "}
              Data yang sudah diisi peserta!
            </h5>
            <button
              type="button"
              className="btn"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">
                <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
              </span>
            </button>
          </div>
          <div className="modal-body">
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
