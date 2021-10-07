import { useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import styles from "./footer.module.css";

const Footer = ({ number, answer }) => {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [showModalDone, setShowModalDone] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    setShowModalDone(true);
  };

  const handleDone = () => {
    localStorage.clear();
    location.replace("/user/done");
  };

  const handleNext = () => {
    const page = parseInt(router.query.id) + 1;
    router.push(`${router.pathname.slice(0, 21)}/${page}`);
  };

  const handleBack = () => {
    const page = parseInt(router.query.id) - 1;
    router.push(`${router.pathname.slice(0, 21)}/${page}`);
  };
  return (
    <>
      <Row style={{ marginTop: "50px" }}>
        <Col sm={6}>
          <Button
            className={styles.back}
            onClick={handleBack}
            disabled={parseInt(router.query.id) === 1}
            variant="link"
          >
            Kembali
          </Button>
          <Button className={styles.help} onClick={() => setShowModal(true)}>
            <i
              className="ri-error-warning-fill"
              style={{ fontSize: "15px", marginRight: "10px" }}
            ></i>
            Bantuan
          </Button>
        </Col>
        <Col sm={6} style={{ textAlign: "right" }}>
          <Button
            className={styles.next}
            onClick={handleNext}
            disabled={parseInt(router.query.id) === number}
            variant="link"
          >
            Lewati Soal
          </Button>
          {parseInt(router.query.id) === number ? (
            <Button className={styles.done} onClick={() => handleSubmit()}>
              Selesai
            </Button>
          ) : (
            <Button
              className={styles.done}
              onClick={() => handleNext()}
              // disabled={!answer}
            >
              Lanjut
            </Button>
          )}
        </Col>
      </Row>

      <Modal
        show={showModal}
        size="lg"
        className={styles.modal}
        onHide={handleClose}
      >
        <Modal.Header className={styles.modalHeader}>
          Panduan Tes Subtansi
          <button
            type="button"
            className="close"
            onClick={() => setShowModal(false)}
            style={{ backgroundColor: "transparent" }}
          >
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Card style={{ padding: "12px", marginTop: "30px" }}>
            <table>
              <tr style={{ position: "relative" }}>
                <td style={{ position: "absolute" }}>-</td>
                <td>
                  {" "}
                  Sebelum mengerjakan tes, harap perhatikan dan lakukan hal-hal
                  berikut :<br />
                  <ul>
                    <li style={{ listStyleType: "circle" }}>
                      Pastikan koneksi internet stabil (sangat disarankan
                      menggunakan koneksi internet broadband dengan kecepatan
                      akses download 384 kbps ke atas). Cek hal ini melalui{" "}
                      <a href=" https://www.speedtest.net/">
                        https://www.speedtest.net/
                      </a>
                    </li>
                    <li style={{ listStyleType: "circle" }}>
                      Gunakan browser : Mozilla Firefox atau Google Chrome versi
                      terbaru
                    </li>
                    <li style={{ listStyleType: "circle" }}>
                      Pastikan Javascript ACTIVE/ENABLED. Cek hal ini melalui{" "}
                      <a href="https://www.whatismybrowser.com/detect/is-javascript-enabled">
                        https://www.whatismybrowser.com/detect/is-javascript-enabled
                      </a>{" "}
                      atau baca terlebih dahulu Panduan Pengaktifan Javascript
                      pada
                      <br />
                      <a href="https://k-cloud.kominfo.go.id/s/jwFLJLrJfyFgbEo">
                        https://k-cloud.kominfo.go.id/s/jwFLJLrJfyFgbEo
                      </a>{" "}
                    </li>
                    <li style={{ listStyleType: "circle" }}>
                      Pastikan Cookies ACTIVE/ENABLED. Baca Panduan Pengaktifan
                      Cookie pada{" "}
                      <a href="https://k-cloud.kominfo.go.id/s/XaJKPwL5PYWaXQo">
                        https://k-cloud.kominfo.go.id/s/XaJKPwL5PYWaXQo
                      </a>
                    </li>
                    <li style={{ listStyleType: "circle" }}>
                      Pastikan keyboard dan mouse/trackpad Anda dalam keadaan
                      baik.
                    </li>
                    <li style={{ listStyleType: "circle" }}>
                      Siapkan kertas dan pensil/pulpen untuk mencoret-coret jika
                      diperlukan.
                    </li>
                  </ul>
                </td>
              </tr>
              <tr style={{ position: "relative" }}>
                <td style={{ position: "absolute" }}>-</td>
                <td>
                  Alokasi waktu yang diberikan untuk mengerjakan Tes Substansi
                  sesuai dengan masing-masing tema pelatihan. Informasi tersebut
                  dapat di akses pada dashboard Tes Substansi.
                </td>
              </tr>
              <tr style={{ position: "relative" }}>
                <td style={{ position: "absolute" }}>-</td>
                <td>
                  Peserta wajib menjawab seluruh soal Tes Substansi dan jumlah
                  soal sesuai dengan masing-masing tema pelatihan. Tidak ada
                  nilai negatif untuk jawaban yang salah.
                </td>
              </tr>
              <tr style={{ position: "relative" }}>
                <td style={{ position: "absolute" }}>-</td>
                <td>
                  Setelah Tes Substansi dimulai, waktu tes tidak dapat
                  diberhentikan dan tes tidak dapat diulang. Setelah waktu
                  habis, halaman soal akan tertutup secara otomatis.
                </td>
              </tr>
              <tr>
                <td>-</td>
                <td>
                  Skor untuk soal yang sudah dijawab tetap terhitung walaupun
                  peserta belum menekan tombol submit atau peserta mengalami
                  force majeure.
                </td>
              </tr>
            </table>
          </Card>
        </Modal.Body>
      </Modal>

      <Modal
        show={showModalDone}
        onHide={() => setShowModalDone(false)}
        size="lg"
        className={styles.modal}
        centered
      >
        <Modal.Header className={styles.modalHeader}>
          Peringatan
          <button
            type="button"
            className="close"
            onClick={() => setShowModalDone(false)}
          >
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </Modal.Header>
        <Modal.Body className={styles.modalBodySubmit}>
          Apakah anda ingin menyelesaikan test substansi dan mengirim semua
          hasil jawaban anda? Jika “Ya” maka anda sudah dinyatakan selesai
          mengikuti test substansi, dan anda tidak dapat memperbaiki jawaban
          anda.
          <br />
          <br /> Dengan ini saya menyatakan sudah menyelesaikan tes substansi
          dengan tidak melakukan kecurangan dalam bentuk apapun. Saya bersedia
          menerima segala keputusan penyelengaraan terkait hasil test substansi.
        </Modal.Body>
        <div style={{ textAlign: "right", padding: "20px 20px" }}>
          <Button
            onClick={() => setShowModalDone(false)}
            className={styles.btnCancel}
          >
            Batal
          </Button>
          <Button className={styles.btnSubmit} onClick={handleDone}>
            Submit
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default Footer;
