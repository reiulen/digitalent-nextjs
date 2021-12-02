import { useRouter } from "next/router";

import React from "react";
import BreadcrumbComponent from "../../../components/global/Breadcrumb.component";
import styles from "./pusatInformasi.module.css";

import HomeWrapper from "../../../components/wrapper/Home.wrapper";

const PusatInformasi = () => {
  const router = useRouter();
  return (
    <HomeWrapper>
      <BreadcrumbComponent
        data={[{ link: router.asPath, name: "Pusat Informasi" }]}
      />
      <div>
        {/* content */}
        <h1 className="fw-700 fz-40">Pusat Informasi</h1>
        <p className="mr-6 fz-18 text-muted fw-400">
          Pusat Informasi untuk Panduan Test Substansi dan Hak & Kewajiban
        </p>
        <div className="border px-6 py-10 mt-10">
          <ul
            className="nav-tabs-customes nav nav-tabs"
            id="myTab"
            role="tablist"
          >
            <li className={`${styles.menu} nav-item`} role="presentation">
              <a
                className={`${styles.menuPanduan} nav-link active fw-600 title-2 fz-20`}
                id="home-tab"
                data-toggle="tab"
                href="#home"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Panduan Tes Substansi
              </a>
            </li>
            <li className={`${styles.menu} nav-item`} role="presentation">
              <a
                className={`${styles.menuHak} nav-link fw-600 title-2 fz-20`}
                id="profile-tab"
                data-toggle="tab"
                href="#profile"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Hak dan Kewajiban
              </a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div className="mt-8 list-pusat-informasi">
                <ol className="pl-4 text-break">
                  <li>
                    Sebelum mengerjakan tes, harap perhatikan dan lakukan
                    hal-hal berikut :
                    <ol className="pl-7">
                      <li>
                        Pastikan koneksi internet stabil (sangat disarankan
                        menggunakan koneksi internet broadband dengan kecepatan
                        akses download 384 kbps ke atas). Cek hal ini melalui{" "}
                        <span>
                          <a
                            href="https://www.speedtest.net/"
                            target="_blank"
                            rel="noreferrer"
                          >
                            https://www.speedtest.net/
                          </a>
                        </span>
                      </li>
                      <li>
                        Gunakan browser : Mozilla Firefox atau Google Chrome
                        versi terbaru
                      </li>
                      <li>
                        Pastikan Javascript ACTIVE/ENABLED. Cek hal ini melalui{" "}
                        <span>
                          <a
                            href="https://www.whatismybrowser.com/detect/is-javascript-enabled"
                            target="_blank"
                            rel="noreferrer"
                          >
                            https://www.whatismybrowser.com/detect/is-javascript-enabled
                          </a>
                        </span>{" "}
                        atau baca terlebih dahulu Panduan Pengaktifan
                      </li>
                      <li>
                        Pastikan Cookies ACTIVE/ENABLED. Baca Panduan
                        Pengaktifan Cookie pada{" "}
                        <a
                          href="https://k-cloud.kominfo.go.id/s/XaJKPwL5PYWaXQo"
                          target="_blank"
                          rel="noreferrer"
                        >
                          https://k-cloud.kominfo.go.id/s/XaJKPwL5PYWaXQo
                        </a>
                      </li>
                      <li>
                        Pastikan keyboard dan mouse/trackpad Anda dalam keadaan
                        baik.
                      </li>
                      <li>
                        Siapkan kertas dan pensil/pulpen untuk mencoret-coret
                        jika diperlukan.
                      </li>
                    </ol>
                  </li>
                  <li>
                    Alokasi waktu yang diberikan untuk mengerjakan Tes Substansi
                    sesuai dengan masing-masing tema pelatihan. Informasi
                    tersebut dapat di akses pada dashboard Tes Substansi.
                  </li>
                  <li>
                    Peserta wajib menjawab seluruh soal Tes Substansi dan jumlah
                    soal sesuai dengan masing-masing tema pelatihan. Tidak ada
                    nilai negatif untuk jawaban yang salah.
                  </li>
                  <li>
                    Setelah Tes Substansi dimulai, waktu tes tidak dapat
                    diberhentikan dan tes tidak dapat diulang. Setelah waktu
                    habis, halaman soal akan tertutup secara otomatis.
                  </li>
                  <li>
                    Skor untuk soal yang sudah dijawab tetap terhitung walaupun
                    peserta belum menekan tombol submit atau peserta mengalami
                    force majeure.
                  </li>
                </ol>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div className="mt-8 list-pusat-informasi">
                <p>
                  Untuk tujuan membantu memperlancar proses pelatihan, setiap
                  peserta diharapkan membaca informasi dan memahami tentang Hak
                  dan Kewajiban Peserta Program DTS 2021, sebagai berikut: Hak
                  Peserta
                </p>
                <ol className="pl-7">
                  <li>
                    Mengikuti program pelatihan sesuai dengan tema dan mitra
                    penyelenggara pelatihan yang telah dipilih pada proses
                    pendaftaran
                  </li>
                  <li>
                    Menerima materi pelatihan dari mitra penyelenggara pelatihan
                  </li>
                  <li>
                    Menerima materi soft-skills pada Pasca Pelatihan bagi
                    program academy yang memiliki target penyerapan tenaga kerja
                  </li>
                  <li>
                    Menerima Sertifikat kepersertaan pelatihan dan/atau
                    Sertifikat Kompetensi sesuai dengan Academy dan tema
                    pelatihan yang telah dipilih pada proses pendaftaran
                  </li>
                  <li>
                    Peserta pelatihan berhak mendapatkan akses terhadap materi
                    pelatihan tertentu selama mengikuti pelatihan sesuai dengan
                    ketentuan yang berlaku.
                  </li>
                </ol>
                <p>Kewajiban Peserta</p>
                <ol className="pl-7">
                  <li>
                    Mentaati seluruh Tata Tertib yang telah ditentukan
                    penyelenggara pelatihan, mitra pelatihan
                  </li>
                  <li>
                    Mengikuti seluruh kegiatan pelatihan dan menyelesaikan
                    pelatihan sesuai dengan jadwal yang telah ditentukan
                  </li>
                  <li>
                    Tidak akan menyebarluaskan segala bentuk materi pelatihan,
                    termasuk untuk keperluan komersil, yang diberikan dalam
                    pelatihan Digital Talent Scholarship.
                  </li>
                </ol>
                <p>
                  Bersikap jujur dan bertanggungjawab sebagai Peserta Digital
                  Talent Scholarship Kementerian Komunikasi dan Informatika.
                  dalam hal ini apabila di kemudian hari terbukti ditemukan
                  pelanggaran atas kewajiban yang dilakukan peserta, maka Saya
                  bersedia menerima ketentuan yang telah ditetapkan sesuai
                  ketentuan perundang-undangan yang berlaku.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeWrapper>
  );
};

export default PusatInformasi;
