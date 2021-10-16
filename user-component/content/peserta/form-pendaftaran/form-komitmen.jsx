import React, { useState } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { newPendaftaranPelatihan } from "../../../../redux/actions/pelatihan/register-training.actions";

const FormKomitmen = ({
  propsDataPribadi,
  propsForm,
  propsDataPelatihan,
  token,
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
                <p>{dataPeserta.name || "-"}</p>
              </Col>
              <Col md={6}>
                <p className="text-neutral-body my-1">Email</p>
                <p>{dataPeserta.email || "-"}</p>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <p className="text-neutral-body my-1">NIK</p>
                <p>{dataPeserta.nik || "-"}</p>
              </Col>
              <Col md={6}>
                <p className="text-neutral-body my-1">Nomor Handphone</p>
                <p>{dataPeserta.nomor_handphone || "-"}</p>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <p className="text-neutral-body my-1">Tempat Lahir</p>
                <p>{dataPeserta.tempat_lahir || "-"}</p>
              </Col>
              <Col md={6}>
                <p className="text-neutral-body my-1">Tanggal Lahir</p>
                <p>{dataPeserta.tanggal_lahir || "-"}</p>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <p className="text-neutral-body my-1">Alamat Domisili</p>
                <p>{dataPeserta.address || "-"}</p>
              </Col>
            </Row>
          </div>

          <div className="program-keahlian">
            <h3 className="font-weight-bolder pb-5 pt-4">Program Keahlian</h3>
            <Row>
              <Col md={6}>
                <p className="text-neutral-body my-1">Akademi</p>
                <p>{dataPelatihan.akademi || "-"}</p>
              </Col>
              <Col md={6}>
                <p className="text-neutral-body my-1">Tama</p>
                <p>{dataPelatihan.tema || "-"}</p>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <p className="text-neutral-body my-1">Pelatihan</p>
                <p>{dataPelatihan.name || "-"}</p>
              </Col>
              <Col md={6}>
                <p className="text-neutral-body my-1">Mitra</p>
                <p>{dataPelatihan.mitra || "-"}</p>
              </Col>
            </Row>
          </div>
          {dataPelatihan.komitmen === "1" && (
            <div className="menyatakan">
              <h3 className="font-weight-bolder pb-5 pt-4">Menyatakan</h3>
              <Row>
                <Col md={12}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: dataPelatihan.deskripsi_komitmen,
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
                          yang telah disetujui
                        </h6>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          )}

          <Button
            variant="transparent"
            className="btn-rounded-full mt-3 float-right bg-blue-primary text-white"
            size="sm"
            type="submit"
          >
            Daftar
          </Button>
        </Form>
      </Card.Body>
    </>
  );
};

export default FormKomitmen;
