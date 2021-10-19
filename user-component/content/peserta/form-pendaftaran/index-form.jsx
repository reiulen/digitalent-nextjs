import React, { useState, useEffect } from "react";
import { Col, Row, Card, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import style from "./style.module.css";

import LoadingPage from "../../../../components/LoadingPage";
import FormPendaftaran from "./form-pendaftaran";
import FormKomitmen from "./form-komitmen";
import FormBerhasil from "./form-berhasil";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";

const IndexForm = ({ token }) => {
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
  const [formBuilder] = useState((dataForm && dataForm.FormBuilder) || []);
  const [dataPeserta] = useState(dataPribadi || null);
  const [dataPelatihan] = useState(dataTraining || null);
  const [dataPendaftaran, setDataPendaftaran] = useState([]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const showViewForm = () => {
    switch (view) {
      case 1:
        return (
          <FormPendaftaran
            propsTitle={title}
            propsForm={formBuilder}
            funcForm={(val) => setDataPendaftaran(val)}
            funcView={(val) => setView(val)}
          />
        );
        break;

      case 2:
        return (
          <FormKomitmen
            propsDataPribadi={dataPeserta}
            propsForm={dataPendaftaran}
            propsDataPelatihan={dataPelatihan}
            token={token}
            // funcForm={(val) => setDataPendaftaran(val)}
            funcView={(val) => setView(val)}
          />
        );
        break;
      case 3:
        return <FormBerhasil />;
        break;
      default:
        return (
          <FormPendaftaran
            propsTitle={title}
            propsForm={formBuilder}
            funcForm={(val) => setDataPendaftaran(val)}
            funcView={(val) => setView(val)}
          />
        );
        break;
    }
  };

  return (
    <>
      <Container fluid>
        <Card className="mb-4" style={{ marginTop: "-50px" }}>
          <Card.Body>
            <Row>
              <Col md={2} sm={12} xs={12}>
                <Image
                  className="img-fluid rounded-xl w-100"
                  src="/assets/media/default-card.png"
                  objectFit="cover"
                  layout="fill"
                />
              </Col>
              <Col md={10}>
                <div className="d-flex flex-row">
                  <Image
                    src="/assets/media/mitra-icon/laravel-1.svg"
                    width={58}
                    height={58}
                    className={`${style.image_mitra}`}
                    objectFit="cover"
                  />
                  <div className="tema-mitra d-flex flex-column ml-5">
                    <p className={`my-0 ${style.text_title_card}`}>
                      Intermediate Multimedia Designer
                    </p>
                    <div className="d-flex flex-row">
                      <p className={`${style.text_mitra_card}`}>Gojek</p>
                      <p className={`mx-3 ${style.text_grey}`}>•</p>
                      <p className={`${style.text_tema_card}`}>
                        Vocational School Graduate Academy
                      </p>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-row flex-wrap mt-4">
                  <div className="date d-flex align-items-center align-middle mr-7">
                    <i className="ri-time-line"></i>
                    <span className={`${style.text_date_register} pl-2`}>
                      Pelatihan : 05 Jul 21 - 31 Jul 21
                    </span>
                  </div>
                  <div className="date d-flex align-items-center align-middle mr-7">
                    <i className="ri-map-pin-line"></i>
                    <span className={`${style.text_date_register} pl-2`}>
                      Lokasi : Pasaraya Blok M Gedung B Lt. 6, Jakarta Barat,
                      Indonesia
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card className="card-custom gutter-b">{showViewForm()}</Card>
      </Container>
    </>
  );
};

export default IndexForm;
