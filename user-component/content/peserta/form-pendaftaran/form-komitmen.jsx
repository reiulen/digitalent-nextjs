import React, { useState } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import style from "./style.module.css";

import { newPendaftaranPelatihan } from "../../../../redux/actions/pelatihan/register-training.actions";

const FormKomitmen = ({
  propsDataPribadi,
  propsForm,
  propsDataPelatihan,
  token,
  funcView,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { id } = router.query;

  const [dataPeserta] = useState(propsDataPribadi);
  const [dataPelatihan] = useState(propsDataPelatihan);
  const [menyatakan, setMenyatakan] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (dataPelatihan.komitmen === "1") {
      if (menyatakan) {
        const data = {
          pelatian_id: parseInt(id),
          komitmen: menyatakan ? "1" : "0",
          form_pendaftaran: propsForm,
        };
        dispatch(newPendaftaranPelatihan(data, token));
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Komitmen Harus Diisi !",
        });
      }
    } else {
      const data = {
        pelatihan_id: parseInt(id),
        form_pendaftaran: propsForm,
      };
      dispatch(newPendaftaranPelatihan(data, token));
    }
  };
  return (
    <>
      <Card.Body>
        <Form onSubmit={onSubmit}>
          <div className="form-komitmen">
            <h3 className="font-weight-bolder pb-5 pt-4">Form Komitmen</h3>
            <Row>
              <Col md={6}>
                <p className="text-neutral-body my-1">Nama Lengkap</p>
                <p>{(dataPeserta && dataPeserta.name) || "-"}</p>
              </Col>
              <Col md={6}>
                <p className="text-neutral-body my-1">Email</p>
                <p>{(dataPeserta && dataPeserta.email) || "-"}</p>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <p className="text-neutral-body my-1">NIK</p>
                <p>{(dataPeserta && dataPeserta.nik) || "-"}</p>
              </Col>
              <Col md={6}>
                <p className="text-neutral-body my-1">Nomor Handphone</p>
                <p>{(dataPeserta && dataPeserta.nomor_handphone) || "-"}</p>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <p className="text-neutral-body my-1">Tempat Lahir</p>
                <p>{(dataPeserta && dataPeserta.tempat_lahir) || "-"}</p>
              </Col>
              <Col md={6}>
                <p className="text-neutral-body my-1">Tanggal Lahir</p>
                <p>{(dataPeserta && dataPeserta.tanggal_lahir) || "-"}</p>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <p className="text-neutral-body my-1">Alamat Domisili</p>
                <p>{(dataPeserta && dataPeserta.address) || "-"}</p>
              </Col>
            </Row>
          </div>

          <div className="program-keahlian">
            <h3 className="font-weight-bolder pb-5 pt-4">Program Keahlian</h3>
            <Row>
              <Col md={6}>
                <p className="text-neutral-body my-1">Akademi</p>
                <p>{(dataPelatihan && dataPelatihan.akademi) || "-"}</p>
              </Col>
              <Col md={6}>
                <p className="text-neutral-body my-1">Tama</p>
                <p>{(dataPelatihan && dataPelatihan.tema) || "-"}</p>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <p className="text-neutral-body my-1">Pelatihan</p>
                <p>{(dataPelatihan && dataPelatihan.name) || "-"}</p>
              </Col>
              <Col md={6}>
                <p className="text-neutral-body my-1">Mitra</p>
                <p>{(dataPelatihan && dataPelatihan.mitra) || "-"}</p>
              </Col>
            </Row>
          </div>
          {dataPelatihan && dataPelatihan.komitmen === "1" && (
            <div className="menyatakan">
              <h3 className="font-weight-bolder pb-5 pt-4">Menyatakan</h3>
              <Row>
                <Col md={12}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: dataPelatihan && dataPelatihan.deskripsi_komitmen,
                    }}
                  ></div>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <div className="form-group row mb-4">
                    <div className="col-sm-6">
                      <div className="d-flex flex-row  align-items-start pt-2">
                        <div className="form-check form-check-inline pt-1">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={menyatakan}
                            value={menyatakan}
                            onClick={() => setMenyatakan(!menyatakan)}
                          />
                        </div>
                        <h6 className="form-weight-bolder">
                          Telah Menyatakan Menyetujui dengan sebenarnya secara
                          sadar dan tanpa paksaan dan telah menerima segala hak
                          yang telah disetuju
                        </h6>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          )}

          <div className="button-aksi mt-7 float-right">
            <Button
              className={`${style.button_profile_batal} rounded-xl mr-3`}
              type="button"
              onClick={() => funcView(1)}
            >
              Kembali
            </Button>
            <Button
              className={`${style.button_profile_simpan} rounded-xl`}
              type="submit"
            >
              Daftar
            </Button>
          </div>
        </Form>
      </Card.Body>
    </>
  );
};

export default FormKomitmen;
