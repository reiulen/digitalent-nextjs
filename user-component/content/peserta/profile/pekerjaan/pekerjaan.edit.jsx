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

  const [statusPekerjaan, setStatusPekerjaan] = useState(
    (pekerjaan && pekerjaan.status_pekerjaan) || "-"
  );
  const [pekerjaanNama, setPekerjaan] = useState(
    (pekerjaan && pekerjaan.pekerjaan) || ""
  );
  const [perusahaan, setPerusahaan] = useState(
    (pekerjaan && pekerjaan.perusahaan) || ""
  );
  const [penghasilan, setPenghasilan] = useState(
    (pekerjaan && pekerjaan.penghasilan) || "1"
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
      let data = {};
      if (
        statusPekerjaan === "Tidak Bekerja" ||
        statusPekerjaan.label === "Tidak Bekerja"
      ) {
        data = {
          status_pekerjaan: statusPekerjaan.label || statusPekerjaan,
          pekerjaan: "-",
          perusahaan: "-",
          penghasilan: "1",
          sekolah: "-",
          tahun_masuk: parseInt(0),
        };
      } else if (
        statusPekerjaan === "Bekerja" ||
        statusPekerjaan.label === "Bekerja"
      ) {
        data = {
          status_pekerjaan: statusPekerjaan.label || statusPekerjaan,
          pekerjaan: pekerjaanNama,
          perusahaan,
          penghasilan: penghasilan.split(".").join(""),
          sekolah: "-",
          tahun_masuk: 0,
        };
      } else if (
        statusPekerjaan === "Pelajar/Mahasiswa" ||
        statusPekerjaan.label === "Pelajar/Mahasiswa"
      ) {
        data = {
          status_pekerjaan: statusPekerjaan.label || statusPekerjaan,
          pekerjaan: "-",
          perusahaan: "-",
          penghasilan: "1",
          sekolah,
          tahun_masuk: parseInt(tahunMasuk),
        };
      }

      dispatch(updateProfilePekerjaan(data, token));

      // check deploy today
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

  let separator = "";

  function formatRupiah(angka, prefix) {
    var number_string = angka.replace(/[^,\d]/g, "").toString(),
      split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="informasi-pribadi">
          <h3 className="font-weight-bolder mb-5">Pekerjaan</h3>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Status Pekerjaan</Form.Label>
            <Select
              options={optionsStatusPekerjaan}
              onChange={(e) =>
                setStatusPekerjaan({ label: e.label, value: e.value })
              }
              onBlur={() =>
                simpleValidator.current.showMessageFor("status pekerjaan")
              }
              placeholder={`${
                pekerjaan && pekerjaan.status_pekerjaan
                  ? pekerjaan.status_pekerjaan
                  : "Silahkan Pilih Status Pekerjaan"
              }`}
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
        {statusPekerjaan !== "-" &&
          statusPekerjaan.label === "Tidak Bekerja" && <div className=""></div>}
        {statusPekerjaan !== "-" && statusPekerjaan.label === "Bekerja" && (
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
                    statusPekerjaan === "Bekerja" ||
                      statusPekerjaan.label === "Bekerja"
                      ? "required"
                      : "",
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
                    statusPekerjaan === "Bekerja" ||
                      statusPekerjaan.label === "Bekerja"
                      ? "required"
                      : "",
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
                value={formatRupiah(penghasilan)}
                onChange={(e) => {
                  setPenghasilan(formatRupiah(e.target.value));
                }}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("penghasilan")
                }
              />
              {simpleValidator.current.message(
                "penghasilan",
                penghasilan,
                statusPekerjaan === "Bekerja" ||
                  statusPekerjaan.label === "Bekerja"
                  ? "required"
                  : "",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
          </div>
        )}

        {statusPekerjaan !== "-" &&
          statusPekerjaan.label === "Pelajar/Mahasiswa" && (
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
                      statusPekerjaan === "Pelajar/Mahasiswa" ||
                        statusPekerjaan.label === "Pelajar/Mahasiswa"
                        ? "required"
                        : "",
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
                      statusPekerjaan === "Pelajar/Mahasiswa" ||
                        statusPekerjaan.label === "Pelajar/Mahasiswa"
                        ? "required|integer"
                        : "",
                      {
                        className: "text-danger",
                      }
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </div>
          )}

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
            Simpan
          </Button>
        </div>
      </Form>
    </>
  );
};

export default PekerjaanEdit;
