import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { Card, Button, Modal, ModalBody } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";
import styles from "./testSubstansi.module.css";

const TestSubstansi = () => {
  const router = useRouter();
  const temaId = Cookies.get("id_tema");
  const pelatihanId = Cookies.get("id_pelatihan");
  const handlePage = () => {
    router.push(
      `/peserta/subvit/substansi/1?theme_id=${temaId}&training_id=${pelatihanId}&category=Test Substansi`
    );
  };

  const [show, setShow] = useState(false);

  const handleModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  return (
    <>
      <PesertaWrapper>
        <Card className={styles.cardBase}>
          <h1 className={styles.title}>Panduan Test Substansi</h1>
          <Card className={styles.cardPanduan}>
            <table>
              <tr>
                <td style={{ position: "absolute" }}>1.</td>
                <td>&nbsp;</td>
                <td>
                  Sebelum mengerjakan test, harap perhatikan dan lakukan hal-hal
                  berikut :
                  <ul>
                    <li>
                      Pastikan koneksi internet stabil (sangat disarankan
                      menggunakan koneksi internet broadband dengan kecepatan
                      akses download 384 kbps ke atas). Cek hal ini melalui{" "}
                      <a href="https://www.speedtest.net/">
                        https://www.speedtest.net/
                      </a>
                    </li>
                    <li>
                      Gunakan browser : Mozilla Firefox atau Google Chrome versi
                      terbaru
                    </li>
                    <li>
                      Pastikan Javascript ACTIVE/ENABLED. Cek hal ini melalui{" "}
                      <a href="https://www.whatismybrowser.com/detect/is-javascript-enabled">
                        https://www.whatismybrowser.com/detect/is-javascript-enabled
                      </a>{" "}
                      atau baca terlebih dahulu Panduan Pengaktifan Javascript
                      pada{" "}
                      <a href="https://k-cloud.kominfo.go.id/s/jwFLJLrJfyFgbEo">
                        https://k-cloud.kominfo.go.id/s/jwFLJLrJfyFgbEo
                      </a>
                    </li>
                    <li>
                      Pastikan Cookies ACTIVE/ENABLED. Baca Panduan Pengaktifan
                      Cookie pada{" "}
                      <a href="https://k-cloud.kominfo.go.id/s/XaJKPwL5PYWaXQo">
                        https://k-cloud.kominfo.go.id/s/XaJKPwL5PYWaXQo
                      </a>
                    </li>
                    <li>
                      Pastikan keyboard dan mouse/trackpad Anda dalam keadaan
                      baik.
                    </li>
                    <li>
                      Siapkan kertas dan pensil/pulpen untuk mencoret-coret jika
                      diperlukan.
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td style={{ position: "absolute" }}>2.</td>
                <td>&nbsp;</td>
                <td>
                  Alokasi waktu yang diberikan untuk mengerjakan Test Substansi
                  sesuai dengan masing-masing tema pelatihan. Informasi tersebut
                  dapat di akses pada dashboard Test Substansi.
                </td>
              </tr>
              <tr>
                <td style={{ position: "absolute" }}>3.</td>
                <td>&nbsp;</td>
                <td>
                  Peserta wajib menjawab seluruh soal Test Substansi dan jumlah
                  soal sesuai dengan masing-masing tema pelatihan. Tidak ada
                  nilai negatif untuk jawaban yang salah.
                </td>
              </tr>
              <tr>
                <td style={{ position: "absolute" }}>4.</td>
                <td>&nbsp;</td>
                <td>
                  Setelah Test Substansi dimulai, waktu tes tidak dapat
                  diberhentikan dan tes tidak dapat diulang. Setelah waktu
                  habis, halaman soal akan tertutup secara otomatis.
                </td>
              </tr>
              <tr>
                <td style={{ verticalAlign: "top" }}>5.</td>
                <td>&nbsp;</td>
                <td>
                  Skor untuk soal yang sudah dijawab tetap terhitung walaupun
                  peserta belum menekan tombol submit atau peserta mengalami
                  force majeure.
                </td>
              </tr>
            </table>
          </Card>
          <div
            style={{
              textAlign: "right",
              marginTop: "30px",
            }}
          >
            <Button className={styles.btnStart} onClick={handleModal}>
              <div className="d-flex flex-row">
                <div className="p-2">Kerjakan Test</div>
                <div className="p-2">
                  <i className="ri-arrow-right-s-line"></i>
                </div>
              </div>
            </Button>
          </div>
        </Card>
      </PesertaWrapper>

      {/* MODAL KONFIRMASI */}
      <Modal show={show} onHide={closeModal} size="lg">
        <ModalHeader className={styles.headerKonfirmasi}>
          Konfirmasi Test Substansi
          <button type="button" className="close" onClick={closeModal}>
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </ModalHeader>
        <ModalBody className={styles.bodyKonfirmasi}>
          Peserta wajib membaca panduan Test Substansi dengan seksama.
          <br /> Dengan ini saya menyatakan sudah membaca semua ketentuan yang
          berlaku, siap <br /> mengikuti test substansi, dan tidak melakukan
          kecurangan dalam bentuk apapun.
          <br />
          <br /> Jika sudah siap, silahkan klik tombol “Mulai Test” untuk
          memulai Test Substansi.
          <br />
          <br />
          <div style={{ textAlign: "right" }}>
            <Button
              variant="link"
              onClick={closeModal}
              className={styles.btnBatal}
            >
              Batal
            </Button>
            <Button onClick={handlePage} className={styles.btnMulai}>
              Mulai Test
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
export default TestSubstansi;
