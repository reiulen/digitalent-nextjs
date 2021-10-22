import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";
import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import style from "../style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  dropdownKabupaten,
  dropdownKabupatenDomisili,
} from "../../../../../redux/actions/pelatihan/function.actions";
import {
  updateProfileAlamat,
  clearErrors,
} from "../../../../../redux/actions/pelatihan/profile.actions";
import { UPDATE_ALAMAT_RESET } from "../../../../../redux/types/pelatihan/profile.type";

const AlamatEdit = ({ funcViewEdit, token }) => {
  const dispatch = useDispatch();

  const { error: errorAlamat, alamat } = useSelector(
    (state) => state.dataAlamat
  );
  const { error: errorProvinsi, data: dataProvinsi } = useSelector(
    (state) => state.drowpdownProvinsi
  );
  const { error: errorKabupaten, data: dataKabupaten } = useSelector(
    (state) => state.drowpdownKabupaten
  );
  const { error: errorKabupatenDomisili, data: dataKabupatenDomisili } =
    useSelector((state) => state.drowpdownKabupatenDomisili);

  const {
    error: errorUpdateData,
    loading,
    success,
  } = useSelector((state) => state.updateAlamat);

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const [sesuai, setSesuai] = useState(false);

  const [alamatKtp, setAlamatKtp] = useState(
    (alamat && alamat.address_ktp) || ""
  );
  const [provinsiKtp, setProvinsiKtp] = useState(
    (alamat && alamat.provinsi_ktp) || null
  );
  const [kotaKtp, setKotaKtp] = useState((alamat && alamat.kota_ktp) || null);
  const [kecamatanKtp, setKecamatanKtp] = useState(
    (alamat && alamat.kecamatan_ktp) || ""
  );
  const [kodePosKtp, setKodePosKtp] = useState(
    (alamat && alamat.kode_pos_ktp) || ""
  );

  const [alamatDomisili, setAlamatDomisili] = useState(
    (alamat && alamat.address) || ""
  );
  const [provinsiDomisili, setProvinsiDomisili] = useState(
    (alamat && alamat.provinsi) || null
  );
  const [kotaDomisili, setKotaDomisili] = useState(
    (alamat && alamat.kota) || null
  );
  const [kecamatanDomisili, setKecamatanDomisili] = useState(
    (alamat && alamat.kecamatan) || ""
  );
  const [kodePosDomisili, setKodePosDomisili] = useState(
    (alamat && alamat.kode_pos) || ""
  );

  const optionsProvinsi = [];
  if (dataProvinsi) {
    for (let index = 0; index < dataProvinsi.data.length; index++) {
      let val = {
        value: dataProvinsi.data[index].id,
        label: dataProvinsi.data[index].label,
      };
      optionsProvinsi.push(val);
    }
  }

  let selectRefKabupatenDomisili = null;
  let selectRefKabupaten = null;
  const optionsKabupaten = [];
  if (dataKabupaten.length !== 0) {
    for (let index = 0; index < dataKabupaten.data.length; index++) {
      let val = {
        value: dataKabupaten.data[index].id,
        label: dataKabupaten.data[index].value,
      };
      optionsKabupaten.push(val);
    }
  }
  const optionsKabupatenDomisili = [];
  if (dataKabupatenDomisili.length !== 0) {
    for (let index = 0; index < dataKabupatenDomisili.data.length; index++) {
      let val = {
        value: dataKabupatenDomisili.data[index].id,
        label: dataKabupatenDomisili.data[index].value,
      };
      optionsKabupatenDomisili.push(val);
    }
  }

  useEffect(() => {
    if (errorUpdateData) {
      toast.error(errorUpdateData);
      dispatch(clearErrors());
    }

    if (success) {
      console.log(success);
      toast.success("Berhasil Update Data");
      funcViewEdit(false);
      dispatch({ type: UPDATE_ALAMAT_RESET });
    }
  }, [errorUpdateData, success, dispatch]);

  const handleSesuaiKtp = (val) => {
    setSesuai(val);
    if (val) {
      setAlamatDomisili(alamatKtp);
      setProvinsiDomisili(provinsiKtp);
      setKecamatanDomisili(kecamatanKtp);
      setKodePosDomisili(kodePosKtp);
      setKotaDomisili(kotaKtp);
    } else {
      setAlamatDomisili("");
      setProvinsiDomisili({
        value: "",
        label: "",
      });
      setKotaDomisili({
        value: "",
        label: "",
      });
      setKecamatanDomisili("");
      setKodePosDomisili("");
    }
  };

  const handleViewDomisili = () => {
    if (sesuai) {
      return (
        <>
          <Form.Group className="mb-3" controlId="formGridAddress1" key={1}>
            <Form.Label>Alamat Lengkap (Sesuai KTP)</Form.Label>
            <Form.Control
              placeholder="Silahkan Masukkan Alamat Lengkap"
              value={alamatDomisili}
              onChange={(e) => setAlamatDomisili(e.target.value)}
              onBlur={() =>
                simpleValidator.current.showMessageFor("alamat domisili")
              }
            />
            {simpleValidator.current.message(
              "alamat domisili",
              alamatDomisili,
              "required",
              {
                className: "text-danger",
              }
            )}
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} md={6} controlId="formGridEmail">
              <Form.Label>Provinsi</Form.Label>
              <Select
                key={1}
                placeholder="Silahkan Pilih Provinsi"
                options={optionsProvinsi}
                defaultValue={provinsiDomisili}
                onChange={(e) => {
                  selectRefKabupatenDomisili.select.clearValue();
                  setProvinsiDomisili({ label: e?.label, value: e?.value });
                  dispatch(dropdownKabupatenDomisili(token, e.value));
                }}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("provinsi domisili")
                }
              />
              {simpleValidator.current.message(
                "provinsi domisili",
                provinsiDomisili.value,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="formGridKelamin">
              <Form.Label>Kota / Kabupaten</Form.Label>
              <Select
                key={1}
                ref={(ref) => (selectRefKabupatenDomisili = ref)}
                placeholder="Silahkan Pilih Kota / Kabupaten"
                options={optionsKabupatenDomisili}
                defaultValue={kotaDomisili}
                onChange={(e) =>
                  setKotaDomisili({ label: e?.label, value: e?.value })
                }
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kota domisili")
                }
              />
              {simpleValidator.current.message(
                "kota domisili",
                kotaDomisili.value,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md={6} controlId="formGridNik">
              <Form.Label>Kecamatan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Silahkan Masukkan Kecamatan"
                value={kecamatanDomisili}
                onChange={(e) => setKecamatanDomisili(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kecamatan domisili")
                }
              />
              {simpleValidator.current.message(
                "kecamatan domisili",
                kecamatanDomisili,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>

            <Form.Group as={Col} md={6} controlId="formGridPassword">
              <Form.Label>Kode Pos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Silahkan Masukkan Kode Pos"
                value={kodePosDomisili}
                onChange={(e) => setKodePosDomisili(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kode pos domisili")
                }
              />
              {simpleValidator.current.message(
                "kode pos domisili",
                kodePosDomisili,
                "required|integer",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
          </Row>
        </>
      );
    } else {
      return (
        <>
          <Form.Group className="mb-3" controlId="formGridAddress2" key={2}>
            <Form.Label>Alamat Lengkap (Sesuai KTP)</Form.Label>
            <Form.Control
              placeholder="Silahkan Masukkan Alamat Lengkap"
              value={alamatDomisili}
              onChange={(e) => setAlamatDomisili(e.target.value)}
              onBlur={() =>
                simpleValidator.current.showMessageFor("alamat domisili")
              }
            />
            {simpleValidator.current.message(
              "alamat domisili",
              alamatDomisili,
              "required",
              {
                className: "text-danger",
              }
            )}
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} md={6} controlId="formGridEmail">
              <Form.Label>Provinsi</Form.Label>
              <Select
                key={2}
                placeholder="Silahkan Pilih Provinsi"
                options={optionsProvinsi}
                defaultValue={provinsiDomisili}
                onChange={(e) => {
                  selectRefKabupatenDomisili.select.clearValue();
                  setProvinsiDomisili({ label: e?.label, value: e?.value });
                  dispatch(dropdownKabupatenDomisili(token, e.value));
                }}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("provinsi domisili")
                }
              />
              {simpleValidator.current.message(
                "provinsi domisili",
                provinsiDomisili !== null
                  ? provinsiDomisili.value
                  : provinsiDomisili,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="formGridKelamin">
              <Form.Label>Kota / Kabupaten</Form.Label>
              <Select
                key={2}
                ref={(ref) => (selectRefKabupatenDomisili = ref)}
                placeholder="Silahkan Pilih Kota / Kabupaten"
                options={optionsKabupatenDomisili}
                defaultValue={kotaDomisili}
                onChange={(e) =>
                  setKotaDomisili({ label: e?.label, value: e?.value })
                }
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kota domisili")
                }
              />
              {simpleValidator.current.message(
                "kota domisili",
                kotaDomisili !== null ? kotaDomisili.value : kotaDomisili,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md={6} controlId="formGridNik">
              <Form.Label>Kecamatan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Silahkan Masukkan Kecamatan"
                value={kecamatanDomisili}
                onChange={(e) => setKecamatanDomisili(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kecamatan domisili")
                }
              />
              {simpleValidator.current.message(
                "kecamatan domisili",
                kecamatanDomisili,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>

            <Form.Group as={Col} md={6} controlId="formGridPassword">
              <Form.Label>Kode Pos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Silahkan Masukkan Kode Pos"
                value={kodePosDomisili}
                onChange={(e) => setKodePosDomisili(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kode pos domisili")
                }
              />
              {simpleValidator.current.message(
                "kode pos domisili",
                kodePosDomisili,
                "required|integer",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
          </Row>
        </>
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      const data = {
        address_ktp: alamatKtp,
        provinsi_ktp: provinsiKtp.label,
        kode_pos_ktp: kodePosKtp,
        kecamatan_ktp: kecamatanKtp,
        kota_ktp: kotaKtp.label,
        address: alamatDomisili,
        provinsi: provinsiDomisili.label,
        kota: kotaDomisili.label,
        kecamatan: kecamatanDomisili,
        kode_pos: kodePosDomisili,
      };
      dispatch(updateProfileAlamat(data, token));
      console.log(data);
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
          <h3 className="font-weight-bolder mb-7">Alamat KTP</h3>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Alamat Lengkap (Sesuai KTP)</Form.Label>
            <Form.Control
              placeholder="Silahkan Masukkan Alamat Lengkap"
              value={alamatKtp}
              onChange={(e) => setAlamatKtp(e.target.value)}
              onBlur={() =>
                simpleValidator.current.showMessageFor("alamat lengkap ktp")
              }
            />
            {simpleValidator.current.message(
              "alamat lengkap ktp",
              alamatKtp,
              "required",
              {
                className: "text-danger",
              }
            )}
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} md={6} controlId="formGridEmail">
              <Form.Label>Provinsi</Form.Label>
              <Select
                placeholder="Silahkan Pilih Provinsi"
                options={optionsProvinsi}
                defaultValue={provinsiKtp}
                onChange={(e) => {
                  selectRefKabupaten.select.clearValue();
                  setProvinsiKtp({ label: e?.label, value: e?.value });
                  dispatch(dropdownKabupaten(token, e.value));
                }}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("provinsi ktp")
                }
              />
              {simpleValidator.current.message(
                "provinsi ktp",
                provinsiKtp !== null ? provinsiKtp.value : provinsiKtp,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="formGridKelamin">
              <Form.Label>Kota / Kabupaten</Form.Label>
              <Select
                ref={(ref) => (selectRefKabupaten = ref)}
                placeholder="Silahkan Pilih Kota / Kabupaten"
                options={optionsKabupaten}
                defaultValue={kotaKtp}
                onChange={(e) =>
                  setKotaKtp({ label: e?.label, value: e?.value })
                }
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kota ktp")
                }
              />
              {simpleValidator.current.message(
                "kota ktp",
                kotaKtp !== null ? kotaKtp.value : kotaKtp,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md={6} controlId="formGridNik">
              <Form.Label>Kecamatan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Silahkan Masukkan Kecamatan"
                value={kecamatanKtp}
                onChange={(e) => setKecamatanKtp(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kecamatan ktp")
                }
              />
              {simpleValidator.current.message(
                "kecamatan ktp",
                kecamatanKtp,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>

            <Form.Group as={Col} md={6} controlId="formGridPassword">
              <Form.Label>Kode Pos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Silahkan Masukkan Kode Pos"
                value={kodePosKtp}
                onChange={(e) => setKodePosKtp(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kode pos ktp")
                }
              />
              {simpleValidator.current.message(
                "kode pos ktp",
                kodePosKtp,
                "required|integer",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
          </Row>
        </div>

        <div className="alamat-domisili mt-6">
          <h3 className="font-weight-bolder">Alamat Domisili</h3>
          <Form.Group className="my-5" id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              checked={sesuai}
              value={sesuai}
              label="Sesuai KTP"
              onClick={() => handleSesuaiKtp(!sesuai)}
            />
          </Form.Group>
          {handleViewDomisili()}
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

export default AlamatEdit;
