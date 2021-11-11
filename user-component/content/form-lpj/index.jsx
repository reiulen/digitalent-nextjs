import { Card, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../../user-component/components/beranda/footer";
import styles from "./formLpj.module.css";
import Image from "next/dist/client/image";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getBerandaFooter } from "../../../redux/actions/beranda/beranda.actions";
import ImageWhiteLogo from "../../../components/assets/icon-dashboard-peserta/whitelogo.png";

const FormLPJ = () => {
  const dispatch = useDispatch();

  const { footer, loading } = useSelector((state) => state.berandaFooter);

  useEffect(() => {
    dispatch(getBerandaFooter());
  }, [dispatch]);

  return (
    <>
      <Container fluid className={styles.mainContainer}>
        <Card className={styles.mainCard}>
          <Card.Body>
            <h1 className={styles.title}>
              Form Laporan Pertanggungjawaban (LPJ)
            </h1>
            <p className={styles.subTitle}>Data Diri</p>
            <Row>
              <Col className={styles.label} xs={12} sm={6}>
                Nama Lengkap
                <br />
                <span className={styles.content}>
                  Muhammad Abdul Ghani Bin Abdullah Al Aziz
                </span>
              </Col>
              <Col className={styles.label} xs={12} sm={6}>
                No Identitas (KTP)
                <br />
                <span className={styles.content}>1234567890123456</span>
              </Col>
            </Row>
            <Row>
              <Col className={styles.label} xs={12} sm={6}>
                Email
                <br />
                <span className={styles.content}>iniemail@gmail.com</span>
              </Col>
              <Col className={styles.label} xs={12} sm={6}>
                Nomor Handphone
                <br />
                <span className={styles.content}>081234567890</span>
              </Col>
            </Row>
            <Row>
              <Col className={styles.label} xs={12} sm={6}>
                Alamat Domisili
                <br />
                <span className={styles.content}>
                  Jl. Almuwahiddin Kp. Kaum Kidul Desa Karang Tengah No. 1 Depok
                  Jawabarat
                </span>
              </Col>
            </Row>
            <p className={styles.subTitle}>Program Pelatihan</p>
            <Row>
              <Col className={styles.label} xs={12} sm={6}>
                Akademi
                <br />
                <span className={styles.content}>
                  Vocational School Graduate Academy (VSGA)
                </span>
              </Col>
              <Col className={styles.label} xs={12} sm={6}>
                Tema
                <br />
                <span className={styles.content}>
                  Intermediate Multimedia Designer
                </span>
              </Col>
            </Row>
            <Row>
              <Col className={styles.label} xs={12} sm={6}>
                Pelatihan
                <br />
                <span className={styles.content}>
                  Intermediate Multimedia Designer
                </span>
              </Col>
              <Col className={styles.label} xs={12} sm={6}>
                Penyelenggara
                <br />
                <span className={styles.content}>Gojek</span>
              </Col>
            </Row>
            <Row>
              <Col className={styles.label}>
                Tanggal Pelatihan
                <br />
                <span className={styles.content}>
                  21 September 2021 - 21 Oktober 2021
                </span>
              </Col>
            </Row>
            <hr />
            <h1 className={styles.subTitle}>Pelaksanaan Kegiatan</h1>
            <table>
              <tr>
                <td className={styles.tableLabel}>No</td>
                <td
                  className={styles.tableLabel}
                  style={{ textAlign: "center" }}
                >
                  Uraian
                </td>
                <td className={styles.tableLabel}>Checklist</td>
              </tr>
              <tr>
                <td className={styles.numberTable}>1</td>
                <td className={styles.contentTable}>
                  <b>Self-paced Learning</b> : Peserta pelatihan belajar secara
                  mandiri melalui laptop/komputer, jadwal pelaksanaan Self-paced
                  Learning diatur secara mandiri oleh peserta dalam batas durasi
                  pelatihan Online Academy
                </td>
                <td className={styles.checkbox}>
                  <input type="checkbox" />
                </td>
              </tr>
              <tr>
                <td className={styles.numberTable}>2</td>
                <td className={styles.contentTable}>
                  <b>Live Session</b> : Sesi tatap muka secara daring/online
                  antara instruktur dan peserta pelatihan, peserta pelatihan
                  mendapatkan kesempatan bertanya dan berinteraksi dengan
                  instruktur pada tema pelatihan tertentu di Program Online
                  Academy
                </td>
                <td className={styles.checkbox}>
                  <input type="checkbox" />
                </td>
              </tr>
              <tr>
                <td className={styles.numberTable}>3</td>
                <td className={styles.contentTable}>
                  <b>Virtual Lab</b> : Peserta akan mengerjakan suatu project
                  secara mandiri pada Virtual Lab
                </td>
                <td className={styles.checkbox}>
                  <input type="checkbox" />
                </td>
              </tr>
              <tr>
                <td className={styles.numberTable}>4</td>
                <td className={styles.contentTable}>
                  <b>Certificate of Completion</b> : Diberikan kepada peserta
                  yang menyelesaikan seluruh sesi pelatihan, mengisi survey dan
                  mengunggah/upload Laporan Pertanggungjawaban (form ini) di
                  digitalent.kominfo.go.id
                </td>
                <td className={styles.checkbox}>
                  <input type="checkbox" />
                </td>
              </tr>
            </table>
            <hr />
            <h1 className={styles.subTitle}>
              Saran/Rekomendasi Pelaksanaan Kegiatan
            </h1>
            <Form.Control
              as="textarea"
              placeholder="Isi saran, kritik, atau rekomendasi mengenai pelatihan dan pelaksanaan kegiatan"
              style={{ height: "100px" }}
              className={styles.textArea}
            />
            <p className={styles.confirmation}>
              <table>
                <tr>
                  <td style={{ verticalAlign: "top", paddingRight: "10px" }}>
                    <input type="checkbox" />
                  </td>
                  <td>
                    Saya menyatakan telah menyetujui dengan sebenarnya, secara
                    sadar dan tanpa paksaan, serta telah menerima segala hak
                    yang telah disetujui.
                  </td>
                </tr>
              </table>
            </p>
            <div style={{ textAlign: "right" }}>
              <Button className={styles.btnBack} variant="link">
                Kembali
              </Button>
              <Button className={styles.btnSend}>Kirim</Button>
            </div>
          </Card.Body>
        </Card>
        <div className={styles.footer}>
          <Footer />
        </div>
      </Container>
    </>
  );
};
export default FormLPJ;
