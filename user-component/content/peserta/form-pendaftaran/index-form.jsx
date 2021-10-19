import React, { useState, useEffect } from "react";
import { Col, Row, Card, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

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
  const [title, setTitle] = useState(dataForm.judul_form);
  const [formBuilder] = useState(dataForm.FormBuilder);
  const [dataPeserta] = useState(dataPribadi);
  const [dataPelatihan] = useState(dataTraining);
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
            // funcView={(val) => setView(val)}
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
      {/* <LoadingPage loading={true} /> */}
      <Container>
        <Card className="card-custom card-stretch gutter-b">
          {showViewForm()}
        </Card>
      </Container>
    </>
  );
};

export default IndexForm;
