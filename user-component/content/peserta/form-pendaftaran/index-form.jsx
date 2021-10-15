import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import FormPendaftaran from "./form-pendaftaran";
import FormKomitmen from "./form-komitmen";
import FormBerhasil from "./form-berhasil";

const IndexForm = () => {
  const [view, setView] = useState(1);
  const [title, setTitle] = useState("Tambah User");
  const [formBuilder] = useState([
    {
      key: 1,
      name: "Nama Depan",
      element: "text",
      size: "col-md-6",
      option: "",
      dataOption: "",
      required: "0",
    },
    {
      key: 2,
      name: "Nama Belakang",
      element: "text",
      size: "col-md-6",
      option: "",
      dataOption: "",
      required: "1",
    },
    {
      key: 3,
      name: "Jenis Kelamin",
      element: "radio",
      size: "col-md-12",
      option: "manual",
      dataOption: "laki laki;perempuan",
      required: "0",
    },
    {
      key: 4,
      name: "Sekolah",
      element: "checkbox",
      size: "col-md-12",
      option: "manual",
      dataOption: "laki laki;perempuan",
      required: "1",
    },
    {
      key: 5,
      name: "Kota",
      element: "select",
      size: "col-md-12",
      option: "manual",
      dataOption: "laki laki;perempuan",
      required: "1",
    },
    {
      key: 6,
      name: "Alamat",
      element: "textarea",
      size: "col-md-12",
      option: "manual",
      dataOption: "",
      required: "1",
    },
    {
      key: 7,
      name: "Poto",
      element: "file_image",
      size: "col-md-6",
      option: "",
      dataOption: "",
      required: "1",
    },
    {
      key: 8,
      name: "Dokumen",
      element: "file_doc",
      size: "col-md-6",
      option: "",
      dataOption: "",
      required: "1",
    },
    {
      key: 9,
      name: "Tanggal",
      element: "date",
      size: "col-md-12",
      option: "",
      dataOption: "",
      required: "1",
    },
  ]);
  const [dataPendaftaran, setDataPendaftaran] = useState([]);

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
            propsTitle={title}
            propsForm={dataPendaftaran}
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
      <div className="container-fluid p-6">
        <Col lg={12} className="order-1 px-0">
          <Card className="card-custom card-stretch gutter-b">
            {showViewForm()}
          </Card>
        </Col>
      </div>
    </>
  );
};

export default IndexForm;
