import { Card, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../../user-component/components/beranda/footer";
import styles from "./formLpj.module.css";
import { useEffect, useState } from "react";
import { getBerandaFooter } from "../../../redux/actions/beranda/beranda.actions";
import moment from "moment";
import "moment/locale/id";
import { SweatAlert } from "../../../utils/middleware/helper";
import axios from "axios";

const FormLPJ = ({ token }) => {
  const dispatch = useDispatch();

  const { dataPribadi } = useSelector((state) => state.getDataPribadi);

  const { data: dataLPJ } = useSelector((state) => state.getFormLPJ.data);

  const { pelatihan: dataTraining } = useSelector(
    (state) => state.getPelatihan
  );

  const [konfirmasi, setKonfirmasi] = useState("0");
  const [value, setValue] = useState("");
  const [saran, setSaran] = useState("");
  const [idx, setIdx] = useState();

  useEffect(() => {
    dispatch(getBerandaFooter());
  }, [dispatch]);

  const handleSaran = (e) => {
    setSaran(e.target.value);
  };

  const handleKonfirmasi = (e) => {
    e.target.checked === true ? setKonfirmasi("1") : setKonfirmasi("0");
  };

  const handleLPJ = (e, i) => {
    setIdx(i);
    e.target.checked === true ? setValue("1") : setValue("0");
  };

  const handlePost = () => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    let link =
      process.env.END_POINT_API_PELATIHAN + "api/v1/formPendaftaran/create-lpj";

    const setData = {
      pelatian_id: dataTraining.id,
      menyetujui: konfirmasi,
      saran: saran,
      form_lpj: dataLPJ.map((item, index) => {
        if (index === idx) {
          return { ...item, value: value };
        } else {
          return { ...item, value: "0" };
        }
      }),
    };

    axios
      .post(link, setData, config)
      .then((res) => SweatAlert("Berhasil", res.data.data.message, "success"))
      .catch((err) => SweatAlert("Gagal", err.response.data.message, "error"));
  };

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
                  {dataPribadi ? dataPribadi.name : "-"}
                </span>
              </Col>
              <Col className={styles.label} xs={12} sm={6}>
                No Identitas (KTP)
                <br />
                <span className={styles.content}>
                  {dataPribadi ? dataPribadi.nik : "-"}
                </span>
              </Col>
            </Row>
            <Row>
              <Col className={styles.label} xs={12} sm={6}>
                Email
                <br />
                <span className={styles.content}>
                  {dataPribadi ? dataPribadi.email : "-"}
                </span>
              </Col>
              <Col className={styles.label} xs={12} sm={6}>
                Nomor Handphone
                <br />
                <span className={styles.content}>
                  {dataPribadi ? dataPribadi.nomor_handphone : "-"}
                </span>
              </Col>
            </Row>
            <Row>
              <Col className={styles.label} xs={12} sm={6}>
                Alamat Domisili
                <br />
                <span className={styles.content}>
                  {dataPribadi ? dataPribadi.address : "-"}
                </span>
              </Col>
            </Row>
            <p className={styles.subTitle}>Program Pelatihan</p>
            <Row>
              <Col className={styles.label} xs={12} sm={6}>
                Akademi
                <br />
                <span className={styles.content}>
                  {dataTraining ? dataTraining.akademi : "-"}
                </span>
              </Col>
              <Col className={styles.label} xs={12} sm={6}>
                Tema
                <br />
                <span className={styles.content}>
                  {dataTraining ? dataTraining.tema : "-"}
                </span>
              </Col>
            </Row>
            <Row>
              <Col className={styles.label} xs={12} sm={6}>
                Pelatihan
                <br />
                <span className={styles.content}>
                  {dataTraining ? dataTraining.name : "-"}
                </span>
              </Col>
              <Col className={styles.label} xs={12} sm={6}>
                Penyelenggara
                <br />
                <span className={styles.content}>
                  {" "}
                  {dataTraining ? dataTraining.penyelenggara : "-"}
                </span>
              </Col>
            </Row>
            <Row>
              <Col className={styles.label}>
                Tanggal Pelatihan
                <br />
                <span className={styles.content}>
                  {dataTraining
                    ? moment(dataTraining.pelatihan_mulai).format("LL")
                    : "-"}{" "}
                  -{" "}
                  {dataTraining
                    ? moment(dataTraining.pelatihan_selesai).format("LL")
                    : "-"}
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
              {dataLPJ &&
                dataLPJ.map((item, index) => {
                  return (
                    <>
                      <tr>
                        <td className={styles.numberTable}>{index + 1}</td>
                        <td className={styles.contentTable}>{item.name}</td>
                        <td className={styles.checkbox}>
                          <input
                            type="checkbox"
                            onChange={(event) => handleLPJ(event, index)}
                          />
                        </td>
                      </tr>
                    </>
                  );
                })}
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
              onChange={(event) => handleSaran(event)}
            />
            <p className={styles.confirmation}>
              <table>
                <tr>
                  <td style={{ verticalAlign: "top", paddingRight: "10px" }}>
                    <input
                      type="checkbox"
                      value="1"
                      onChange={handleKonfirmasi}
                    />
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
              <Button
                className={styles.btnSend}
                onClick={handlePost}
                disabled={konfirmasi !== "1" || saran === ""}
              >
                Kirim
              </Button>
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
