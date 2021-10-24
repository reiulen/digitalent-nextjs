import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import Select from "react-select";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import SimpleReactValidator from "simple-react-validator";
import style from "../style.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfilePekerjaan,
  clearErrors,
} from "../../../../../redux/actions/pelatihan/profile.actions";
import { UPDATE_PEKERJAAN_RESET } from "../../../../../redux/types/pelatihan/profile.type";

const PekerjaanEdit = ({ funcViewEdit, token }) => {
  const dispatch = useDispatch();

  const { error: errorPekerjaan, pekerjaan } = useSelector(
    (state) => state.dataPekerjaan
  );
  const { error: errorStatusPekerjaan, data: dataStatusPekerjaan } =
    useSelector((state) => state.drowpdownStatusPekerjaan);
  const {
    error: errorUpdateData,
    loading,
    success,
  } = useSelector((state) => state.updatePekerjaan);

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const [statusPekerjaan, setStatusPekerjaan] = useState(null);
  const [pekerjaanNama, setPekerjaan] = useState(
    (pekerjaan && pekerjaan.pekerjaan) || ""
  );
  const [perusahaan, setPerusahaan] = useState(
    (pekerjaan && pekerjaan.perusahaan) || ""
  );
  const [penghasilan, setPenghasilan] = useState(
    (pekerjaan && pekerjaan.penghasilan) || ""
  );
  const [sekolah, setSekolah] = useState(
    (pekerjaan && pekerjaan.sekolah) || ""
  );
  const [tahunMasuk, setTahunMasuk] = useState(
    (pekerjaan && pekerjaan.tahun_masuk) || ""
  );

  const optionsStatusPekerjaan = [];
  if (dataStatusPekerjaan) {
    for (let index = 0; index < dataStatusPekerjaan.data.length; index++) {
      let val = {
        value: dataStatusPekerjaan.data[index].id,
        label: dataStatusPekerjaan.data[index].label,
      };
      optionsStatusPekerjaan.push(val);
    }
  }

  useEffect(() => {
    if (errorUpdateData) {
      toast.error(errorUpdateData);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Berhasil Update Data");
      funcViewEdit(false);
      dispatch({ type: UPDATE_PEKERJAAN_RESET });
    }
  }, [errorUpdateData, success, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      const data = {
        status_pekerjaan: statusPekerjaan.label,
        pekerjaan: pekerjaanNama,
        perusahaan,
        penghasilan,
        sekolah,
        tahun_masuk: parseInt(tahunMasuk),
      };
      dispatch(updateProfilePekerjaan(data, token));
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi data dengan benar !",
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="informasi-pribadi">
          <h3 className="font-weight-bolder mb-5">Pekerjaan</h3>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Status Pekerjaan</Form.Label>
            <Select
              placeholder={
                (pekerjaan && pekerjaan.status_pekerjaan) ||
                "Silahkan Pilih Status Pekerjaan"
              }
              options={optionsStatusPekerjaan}
              defaultValue={statusPekerjaan}
              onChange={(e) =>
                setStatusPekerjaan({ label: e.label, value: e.value })
              }
              onBlur={() =>
                simpleValidator.current.showMessageFor("status pekerjaan")
              }
            />
            {simpleValidator.current.message(
              "status pekerjaan",
              statusPekerjaan,
              "required",
              {
                className: "text-danger",
              }
            )}
          </Form.Group>
        </div>
        <div className="kontak-darurat mt-6">
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Pekerjaan</Form.Label>
                <Form.Control
                  placeholder="Silahkan Masukan Pekerjaan"
                  value={pekerjaanNama}
                  onChange={(e) => setPekerjaan(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("pekerjaan")
                  }
                />
                {simpleValidator.current.message(
                  "pekerjaan",
                  pekerjaanNama,
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Perusahaan / Institut Tempat Bekerja</Form.Label>
                <Form.Control
                  placeholder="Silahkan Masukan Perusahaan"
                  value={perusahaan}
                  onChange={(e) => setPerusahaan(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("perusahaan")
                  }
                />
                {simpleValidator.current.message(
                  "perusahaan",
                  perusahaan,
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Penghasilan</Form.Label>
            <Form.Control
              placeholder="Silahkan Masukan Penghasilan"
              value={penghasilan}
              onChange={(e) => setPenghasilan(e.target.value)}
              onBlur={() =>
                simpleValidator.current.showMessageFor("penghasilan")
              }
            />
            {simpleValidator.current.message(
              "penghasilan",
              penghasilan,
              "required|integer",
              {
                className: "text-danger",
              }
            )}
          </Form.Group>
        </div>
        <div className="unggah-berkas-pribadi mt-6">
          <h3 className="font-weight-bolder">Status Pelajar Mahasiswa</h3>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Sekolah / Perguruan Tinggi</Form.Label>
                <Form.Control
                  placeholder="Silahkan Masukan Sekolah"
                  value={sekolah}
                  onChange={(e) => setSekolah(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("sekolah")
                  }
                />
                {simpleValidator.current.message(
                  "sekolah",
                  sekolah,
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Tahun Masuk</Form.Label>
                <Form.Control
                  placeholder="Silahkan Masukan Tahun Masuk"
                  value={tahunMasuk}
                  onChange={(e) => setTahunMasuk(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("tahun masuk")
                  }
                />
                {simpleValidator.current.message(
                  "tahun masuk",
                  tahunMasuk,
                  "required|integer",
                  {
                    className: "text-danger",
                  }
                )}
              </Form.Group>
            </Col>
          </Row>
        </div>
        <div className="button-aksi mt-5 float-right">
          <Button
            className={`${style.button_profile_batal} rounded-xl mr-2`}
            type="button"
            onClick={() => funcViewEdit(false)}
          >
            Batal
          </Button>
          <Button
            className={`${style.button_profile_simpan} rounded-xl`}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default PekerjaanEdit;
