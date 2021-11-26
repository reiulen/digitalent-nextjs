import React, { useState, useEffect } from "react";
import { Col, Row, Card, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import style from "./style.module.css";
import moment from "moment";

import LoadingPage from "../../../../components/LoadingPage";
import FormPendaftaran from "./form-pendaftaran";
import FormKomitmen from "./form-komitmen";
import FormBerhasil from "./form-berhasil";

import { clearErrors } from "../../../../redux/actions/pelatihan/register-training.actions";
import { PENDAFTARAN_PELATIHAN_RESET } from "../../../../redux/types/pelatihan/register-training.type";
import Layout from "../../../components/template/form-pendaftaran/LayoutCustom.component";
// const Layout = dynamic(
//   () =>
//     import(
//       "../../../../user-component/components/template/LayoutCustom.component"
//     )
//   // import("../../../user-component/components/template/LayoutCustom.component")
// );

const IndexForm = ({ token, session }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { error: errorFormBuilder, formBuilder: dataForm } = useSelector(
    (state) => state.getFormBuilder
  );
  const { error: errorPelatihan, pelatihan: dataTraining } = useSelector(
    (state) => state.getPelatihan
  );
  const { error: errorDataPribadi, dataPribadi } = useSelector(
    (state) => state.getDataPribadi
  );
  const {
    error: errorNewPendaftaran,
    pendaftaran,
    loading,
    success,
  } = useSelector((state) => state.newPendaftaranPelatihan);

  let error;
  if (errorFormBuilder) error = errorFormBuilder;
  if (errorPelatihan) error = errorPelatihan;
  if (errorDataPribadi) error = errorDataPribadi;
  if (errorNewPendaftaran) error = errorNewPendaftaran;

  const [view, setView] = useState(1);
  const [title, setTitle] = useState(
    (dataForm && dataForm.judul_form) || "Tidak Ada Form"
  );
  // const [formBuilder] = useState((dataForm && dataForm.FormBuilder) || []);
  const [dataPeserta] = useState(dataPribadi || null);
  const [dataPelatihan] = useState(dataTraining || null);
  // const [dataPendaftaran, setDataPendaftaran] = useState([]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Berhasil Mendaftar Pelatihan");
      setView(3);
      dispatch({ type: PENDAFTARAN_PELATIHAN_RESET });
    }
  }, [error, success]);

  const [breadcrumb, setBreadcrumb] = useState("Form Pendaftaran");
  useEffect(() => {
    switch (view) {
      case 1:
        return setBreadcrumb("Pendaftaran Pelatihan");
      case 2:
        return setBreadcrumb("Form Komitmen");
      case 3:
        return setBreadcrumb("Pendaftaran Berhasil");
      default:
        return breadcrumb;
    }
  }, [view]);

  const showViewForm = () => {
    switch (view) {
      case 1:
        return (
          <>
            <Card className="mb-5" style={{ marginTop: "-50px" }}>
              <Card.Body>
                <Row>
                  <Col md={2} sm={12} className="p-0">
                    <img
                      className="img-fluid rounded-xl w-100 "
                      src={`${
                        dataPelatihan && dataPelatihan.thumbnail
                          ? process.env.END_POINT_API_IMAGE_BEASISWA +
                            dataPelatihan.thumbnail
                          : "/assets/media/default-card.png"
                      }`}
                      style={{ height: "105px", objectFit: "cover" }}
                    />
                  </Col>
                  <Col md={10}>
                    <div className="d-flex flex-row flex-wrap">
                      <img
                        src={`${
                          dataPelatihan && dataPelatihan.logo
                            ? process.env.END_POINT_API_IMAGE_BEASISWA +
                              dataPelatihan.logo
                            : "/assets/media/default-card.png"
                        }`}
                        width={58}
                        height={58}
                        className={`${style.image_mitra}`}
                      />
                      <div className="tema-mitra d-flex flex-column ml-5">
                        <p className={`my-0 ${style.text_title_card}`}>
                          {dataPelatihan ? dataPelatihan.name || "-" : "-"}
                        </p>
                        <div className="d-flex flex-row">
                          <p className={`${style.text_mitra_card}`}>
                            {dataPelatihan
                              ? dataPelatihan.mitra_nama || "-"
                              : "-"}
                          </p>
                          <p className={`mx-3 ${style.text_grey}`}>•</p>
                          <p className={`${style.text_tema_card}`}>
                            {dataPelatihan ? dataPelatihan.akademi || "-" : "-"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex flex-row flex-wrap align-content-end mt-6 ">
                        <div className="date d-flex align-items-center align-middle mr-7">
                          <i className="ri-time-line"></i>
                          <span className={`${style.text_date_register} pl-2`}>
                            Pelatihan :{" "}
                            {dataPelatihan
                              ? moment(dataPelatihan.pelatihan_mulai).format(
                                  "DD MMM YYYY"
                                )
                              : "-"}{" "}
                            -{" "}
                            {dataPelatihan
                              ? moment(dataPelatihan.pelatihan_selesai).format(
                                  "DD MMM YYYY"
                                )
                              : "-"}{" "}
                          </span>
                        </div>
                        <div className="date d-flex align-items-center align-middle mr-7">
                          <i className="ri-map-pin-line"></i>
                          <span className={`${style.text_date_register} pl-2`}>
                            Lokasi :{" "}
                            {dataPelatihan ? dataPelatihan.alamat : "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card className="card-custom gutter-b">
              <FormPendaftaran
                token={token}
                propsTitle={title}
                funcView={(val) => setView(val)}
              />
            </Card>
          </>
        );
        break;

      case 2:
        return (
          <Card className="card-custom gutter-b" style={{ marginTop: "-50px" }}>
            <FormKomitmen
              propsDataPribadi={dataPeserta}
              propsDataPelatihan={dataPelatihan}
              token={token}
              funcView={(val) => setView(val)}
            />
          </Card>
        );
        break;
      case 3:
        return (
          <Card className="card-custom gutter-b" style={{ marginTop: "-50px" }}>
            <FormBerhasil />
          </Card>
        );
        break;
      default:
        return (
          <>
            <Card className="mb-5" style={{ marginTop: "-50px" }}>
              <Card.Body>
                <Row>
                  <Col md={2} sm={12}>
                    <img
                      className="img-fluid rounded-xl w-100 h-80 mb-3"
                      src={`${
                        dataPelatihan
                          ? dataPelatihan.file_path + dataPelatihan.thumbnail
                          : "/assets/media/default-card.png"
                      }`}
                    />
                  </Col>
                  <Col md={10}>
                    <div className="d-flex flex-row">
                      <img
                        src={`${
                          dataPelatihan
                            ? dataPelatihan.file_path + dataPelatihan.logo
                            : "/assets/media/default-card.png"
                        }`}
                        width={58}
                        height={58}
                        className={`${style.image_mitra}`}
                      />
                      <div className="tema-mitra d-flex flex-column ml-5">
                        <p className={`my-0 ${style.text_title_card}`}>
                          {dataPelatihan ? dataPelatihan.name || "-" : "-"}
                        </p>
                        <div className="d-flex flex-row">
                          <p className={`${style.text_mitra_card}`}>
                            {dataPelatihan
                              ? dataPelatihan.mitra_nama || "-"
                              : "-"}
                          </p>
                          <p className={`mx-3 ${style.text_grey}`}>•</p>
                          <p className={`${style.text_tema_card}`}>
                            {dataPelatihan ? dataPelatihan.akademi || "-" : "-"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex flex-row flex-wrap align-content-end mt-3">
                      <div className="date d-flex align-items-center align-middle mr-7">
                        <i className="ri-time-line"></i>
                        <span className={`${style.text_date_register} pl-2`}>
                          Pelatihan :{" "}
                          {dataPelatihan
                            ? moment(dataPelatihan.pelatihan_mulai).format(
                                "DD MMM YYYY"
                              )
                            : "-"}{" "}
                          -{" "}
                          {dataPelatihan
                            ? moment(dataPelatihan.pelatihan_selesai).format(
                                "DD MMM YYYY"
                              )
                            : "-"}{" "}
                        </span>
                      </div>
                      <div className="date d-flex align-items-center align-middle mr-7">
                        <i className="ri-map-pin-line"></i>
                        <span className={`${style.text_date_register} pl-2`}>
                          Lokasi : {dataPelatihan ? dataPelatihan.alamat : "-"}
                        </span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card className="card-custom gutter-b">
              <FormPendaftaran
                propsTitle={title}
                funcView={(val) => setView(val)}
              />
            </Card>
          </>
        );
        break;
    }
  };

  return (
    <>
      <Layout
        title="Form Pendaftaran Peserta - Pelatihan"
        session={session}
        breadcrumb={breadcrumb}
      >
        <Container fluid>{showViewForm()}</Container>
      </Layout>
    </>
  );
};

export default IndexForm;
