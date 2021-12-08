import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Select from "react-select";
import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import style from "../style.module.css";

import {
  dropdownKabupaten,
  dropdownKabupatenDomisili,
  dropdownKecamatanToDesa,
  dropdownProvinsiToDesa,
} from "../../../../../redux/actions/pelatihan/function.actions";

import {
  updateProfileAlamat,
  clearErrors,
} from "../../../../../redux/actions/pelatihan/profile.actions";

import { UPDATE_ALAMAT_RESET } from "../../../../../redux/types/pelatihan/profile.type";

import {
  helperRegexNumber,
  SweatAlert,
} from "../../../../../utils/middleware/helper";
import { useRouter } from "next/router";

const AlamatEdit = ({ funcViewEdit, token, wizzard, globalData }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { error: errorAlamat, alamat } = useSelector(
    (state) => state.dataAlamat
  );
  const { error: errorProvinsi, data: dataProvinsi } = useSelector(
    (state) => state.drowpdownProvinsi
  );

  const { error: errorKabupaten, data: dataKabupaten } = useSelector(
    (state) => state.drowpdownKabupaten
  );

  const { error: errorKecamatan, data: dataKecamatan } = useSelector(
    (state) => state.drowpdownProvinsiToDesa.data
  );

  const { error: errorKelurahan, data: dataKelurahan } = useSelector(
    (state) => state.drowpdownKecamatanToDesa.data
  );

  const { error: errorKabupatenDomisili, data: dataKabupatenDomisili } =
    useSelector((state) => state.drowpdownKabupatenDomisili);

  const {
    error: errorUpdateData,
    loading,
    success,
  } = useSelector((state) => state.updateAlamat);

  const [isValid, setIsValid] = useState(false);

  const [isProvinsi, setIsProvinsi] = useState(false);

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const [sesuai, setSesuai] = useState(false);

  const [alamatKtp, setAlamatKtp] = useState(
    (alamat && alamat.address_ktp) || ""
  );
  const [provinsiKtp, setProvinsiKtp] = useState(
    (alamat && { label: alamat.provinsi_ktp }) || null
  );
  const [kotaKtp, setKotaKtp] = useState(
    (alamat && { label: alamat.kota_ktp }) || null
  );
  const [kecamatanKtp, setKecamatanKtp] = useState(
    (alamat && { label: alamat.kecamatan_ktp }) || null
  );
  const [kelurahanKtp, setKelurahanKtp] = useState(
    (alamat && { label: alamat.kelurahan_ktp }) || null
  );
  const [kodePosKtp, setKodePosKtp] = useState(
    (alamat && alamat.kode_pos_ktp) || ""
  );

  const [alamatDomisili, setAlamatDomisili] = useState(
    (alamat && alamat.address) || ""
  );
  const [provinsiDomisili, setProvinsiDomisili] = useState(
    (alamat && { label: alamat.provinsi }) || null
  );
  const [kotaDomisili, setKotaDomisili] = useState(
    (alamat && { label: alamat.kota }) || null
  );
  const [kecamatanDomisili, setKecamatanDomisili] = useState(
    (alamat && { label: alamat.kecamatan }) || null
  );
  const [kelurahanDomisili, setKelurahanDomisili] = useState(
    (alamat && { label: alamat.kelurahan }) || null
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
  let selectRefKecamatan = null;
  let selectRefKelurahan = null;

  const optionsKabupaten = [];
  if (dataKabupaten && dataKabupaten.length !== 0) {
    for (let index = 0; index < dataKabupaten.data.length; index++) {
      let val = {
        value: dataKabupaten.data[index].id,
        label: dataKabupaten.data[index].value,
      };
      optionsKabupaten.push(val);
    }
  }

  const optionsKecamatan = [];

  dataKecamatan &&
    dataKecamatan.map((item) => {
      return optionsKecamatan.push({ label: item.value, value: item.id });
    });

  const optionsKelurahan = [];

  dataKelurahan &&
    dataKelurahan.map((item) => {
      return optionsKelurahan.push({ label: item.value, value: item.id });
    });

  const optionsKabupatenDomisili = [];
  if (dataKabupatenDomisili?.length !== 0) {
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
      SweatAlert("Gagal", errorUpdateData, "error");
      dispatch(clearErrors());
    }

    if (success) {
      SweatAlert("Berhasil", "Berhasil Update Data", "success");
      dispatch({ type: UPDATE_ALAMAT_RESET });
      if (wizzard) {
        router.push("/peserta/wizzard/pendidikan");
      } else {
        funcViewEdit(false);
      }
    }
  }, [errorUpdateData, success, dispatch]);

  const handleSesuaiKtp = (val) => {
    setIsValid(true);
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
      setKecamatanDomisili({
        value: "",
        label: "",
      });
      setKelurahanDomisili({
        value: "",
        label: "",
      });
      setKodePosDomisili("");
    }
  };

  useEffect(() => {
    if (sesuai) {
      setAlamatDomisili(alamatKtp);
      setProvinsiDomisili(provinsiKtp);
      setKecamatanDomisili(kecamatanKtp);
      setKodePosDomisili(kodePosKtp);
      setKotaDomisili(kotaKtp);
      setKelurahanDomisili(kelurahanKtp);
    }
  }, [
    sesuai,
    alamatKtp,
    provinsiKtp,
    kecamatanKtp,
    kodePosKtp,
    kotaKtp,
    kelurahanKtp,
  ]);

  const handleViewDomisili = () => {
    if (sesuai) {
      return (
        <>
          <Form.Group className="mb-3" controlId="formGridAddress1" key={1}>
            <Form.Label>Alamat Lengkap </Form.Label>
            <Form.Control
              disabled={isValid}
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
                isDisabled={isValid}
                key={1}
                placeholder={
                  (alamat && alamat.provinsi) || "Silahkan Pilih Provinsi"
                }
                options={optionsProvinsi}
                defaultValue={provinsiDomisili}
                onChange={(e) => {
                  setKotaDomisili(null);
                  // selectRefKabupatenDomisili.select.clearValue();
                  setProvinsiDomisili({ label: e?.label, value: e?.value });
                  dispatch(dropdownKabupatenDomisili(token, e.value));
                }}
                value={provinsiDomisili}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("provinsi domisili")
                }
              />
              {simpleValidator.current.message(
                "provinsi domisili",
                provinsiDomisili,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="formGridKelamin">
              <Form.Label>Kota / Kabupaten</Form.Label>
              <Select
                isDisabled={isValid}
                key={1}
                ref={(ref) => (selectRefKabupatenDomisili = ref)}
                placeholder={
                  kotaKtp !== null
                    ? alamat && alamat.kota
                    : "Silahkan Pilih Kota"
                }
                options={optionsKabupatenDomisili}
                defaultValue={kotaDomisili}
                onChange={(e) =>
                  setKotaDomisili({ label: e?.label, value: e?.value })
                }
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kota domisili")
                }
                value={kotaDomisili}
              />
              {simpleValidator.current.message(
                "kota domisili",
                kotaDomisili,
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

              <Select
                isDisabled={isValid}
                placeholder={
                  kecamatanKtp === null
                    ? "Silahkan Pilih Kecamatan"
                    : alamat && alamat.kecamatan
                }
                defaultValue={kecamatanDomisili}
                options={optionsKecamatan}
                value={kecamatanDomisili}
                onChange={(e) => {
                  setKecamatanDomisili({ label: e?.label, value: e?.value });
                  dispatch(dropdownKecamatanToDesa(token, e.value));
                }}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kecamatan")
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
            <Form.Group as={Col} md={6} controlId="formGridNik">
              <Form.Label>Desa / Kelurahan</Form.Label>

              <Select
                isDisabled={isValid}
                placeholder={
                  kelurahanKtp === null
                    ? "Silahkan Pilih Kelurahan"
                    : alamat && alamat.kelurahan
                }
                options={optionsKelurahan}
                defaultValue={kelurahanDomisili}
                value={kelurahanDomisili}
                onChange={(e) => {
                  setKelurahanDomisili({ label: e?.label, value: e?.value });
                  dispatch(dropdownKecamatanToDesa(token, e.value));
                }}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kelurahan domisili")
                }
              />

              {simpleValidator.current.message(
                "kelurahan domisili",
                kelurahanDomisili,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md={6} controlId="formGridPassword">
              <Form.Label>Kode Pos</Form.Label>
              <Form.Control
                disabled={isValid}
                type="text"
                placeholder="Silahkan Masukkan Kode Pos"
                value={kodePosDomisili}
                onChange={(e) => setKodePosDomisili(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kode pos domisili")
                }
                maxLength={5}
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
            <Form.Label>Alamat Lengkap </Form.Label>
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
                placeholder={
                  alamat && alamat.provinsi
                    ? alamat.provinsi
                    : "Silahkan Pilih Provinsi"
                }
                options={optionsProvinsi}
                onChange={(e) => {
                  setKotaDomisili(null);
                  setKecamatanDomisili(null);
                  setKelurahanDomisili(null);
                  setProvinsiDomisili({ label: e?.label, value: e?.value });
                  dispatch(dropdownKabupatenDomisili(token, e.value));
                }}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("provinsi domisili")
                }
                value={provinsiDomisili}
              />
              {simpleValidator.current.message(
                "provinsi domisili",
                provinsiDomisili,
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
                placeholder={
                  alamat && alamat.kota ? alamat.kota : "Silahkan Pilih Kota"
                }
                options={optionsKabupatenDomisili}
                onChange={(e) => {
                  setKecamatanDomisili(null);
                  setKelurahanDomisili(null);
                  setKotaDomisili({ label: e?.label, value: e?.value });
                  dispatch(dropdownProvinsiToDesa(token, e.value));
                }}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kota domisili")
                }
                value={kotaDomisili}
                isDisabled={provinsiDomisili ? false : true}
              />
              {simpleValidator.current.message(
                "kota domisili",
                kotaDomisili,
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
              <Select
                placeholder={
                  (alamat && alamat.kecamatan) === ""
                    ? "Silahkan Pilih Kecamatan"
                    : alamat && alamat.kecamatan
                }
                defaultValue={kecamatanDomisili}
                options={optionsKecamatan}
                onChange={(e) => {
                  setKelurahanDomisili(null);
                  setKecamatanDomisili({ label: e?.label, value: e?.value });
                  dispatch(dropdownKecamatanToDesa(token, e.value));
                }}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kecamatan")
                }
                value={kecamatanDomisili}
                isDisabled={kotaDomisili ? false : true}
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
            <Form.Group as={Col} md={6} controlId="formGridNik">
              <Form.Label>Desa / Kelurahan</Form.Label>

              <Select
                placeholder={
                  (alamat && alamat.kelurahan) === ""
                    ? "Silahkan Pilih Kelurahan"
                    : alamat && alamat.kelurahan
                }
                options={optionsKelurahan}
                defaultValue={kelurahanDomisili}
                onChange={(e) => {
                  setKelurahanDomisili({ label: e?.label, value: e?.value });
                  dispatch(dropdownKecamatanToDesa(token, e.value));
                }}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kelurahan domisili")
                }
                value={kelurahanDomisili}
                isDisabled={kecamatanDomisili ? false : true}
              />

              {simpleValidator.current.message(
                "kelurahan domisili",
                kelurahanDomisili,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md={6} controlId="formGridPassword">
              <Form.Label>Kode Pos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Silahkan Masukkan Kode Pos"
                value={kodePosDomisili}
                onChange={(e) => {
                  if (
                    e.target.value === "" ||
                    helperRegexNumber.test(e.target.value)
                  ) {
                    setKodePosDomisili(e.target.value);
                  }
                }}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kode pos domisili")
                }
                maxLength={5}
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
    simpleValidator.current.fields["kota domisili"] = true;
    simpleValidator.current.fields["kota ktp"] = true;

    if (simpleValidator.current.allValid()) {
      const data = {
        address_ktp: alamatKtp,
        provinsi_ktp: provinsiKtp.label || provinsiKtp,
        kode_pos_ktp: kodePosKtp,
        kecamatan_ktp: kecamatanKtp.label || kecamatanKtp,
        kelurahan_ktp: kelurahanKtp.label || kelurahanKtp,
        kota_ktp: kotaKtp.label || kotaKtp,
        address: alamatDomisili,
        provinsi: provinsiDomisili.label || provinsiDomisili,
        kota: kotaDomisili.label || kotaDomisili,
        kecamatan: kecamatanDomisili.label || kecamatanDomisili,
        kelurahan: kelurahanDomisili.label || kelurahanDomisili,
        kode_pos: kodePosDomisili,
      };
      dispatch(updateProfileAlamat(data, token));
      window.scrollTo(0, 0);
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
            <Form.Label>Alamat Lengkap </Form.Label>
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
                placeholder={
                  alamat && alamat.provinsi_ktp
                    ? alamat.provinsi_ktp
                    : "Silahkan Pilih Provinsi"
                }
                options={optionsProvinsi}
                onChange={(e) => {
                  setKotaKtp(null);
                  setKecamatanKtp(null);
                  setKelurahanKtp(null);
                  setProvinsiKtp({ label: e?.label, value: e?.value });
                  dispatch(dropdownKabupaten(token, e.value));
                }}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("provinsi ktp")
                }
                value={provinsiKtp}
              />
              {simpleValidator.current.message(
                "provinsi ktp",
                provinsiKtp,
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
                placeholder={
                  kotaKtp === null
                    ? "Silahkan Pilih Kota"
                    : alamat && alamat.kota_ktp
                }
                options={optionsKabupaten}
                onChange={(e) => {
                  setKecamatanKtp(null);
                  setKelurahanKtp(null);
                  setKotaKtp({ label: e?.label, value: e?.value });
                  dispatch(dropdownProvinsiToDesa(token, e.value));
                }}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kota ktp")
                }
                value={kotaKtp}
                isDisabled={provinsiKtp ? false : true}
              />
              {simpleValidator.current.message(
                "kota ktp",
                kotaKtp,
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

              <Select
                placeholder={
                  kecamatanKtp === null
                    ? "Silahkan Pilih Kecamatan"
                    : alamat && alamat.kecamatan_ktp
                }
                options={optionsKecamatan}
                onChange={(e) => {
                  setKelurahanKtp(null);
                  setKecamatanKtp({ label: e?.label, value: e?.value });
                  dispatch(dropdownKecamatanToDesa(token, e.value));
                }}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kecamatan ktp")
                }
                value={kecamatanKtp}
                isDisabled={kotaKtp ? false : true}
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
            <Form.Group as={Col} md={6} controlId="formGridNik">
              <Form.Label>Desa / Kelurahan</Form.Label>

              <Select
                placeholder={
                  kelurahanKtp === null
                    ? "Silahkan Pilih Kelurahan"
                    : alamat && alamat.kelurahan_ktp
                }
                options={optionsKelurahan}
                onChange={(e) => {
                  setKelurahanKtp({ label: e?.label, value: e?.value });
                }}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kelurahan ktp")
                }
                value={kelurahanKtp}
                isDisabled={kecamatanKtp ? false : true}
              />

              {simpleValidator.current.message(
                "kelurahan ktp",
                kelurahanKtp,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md={6} controlId="formGridPassword">
              <Form.Label>Kode Pos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Silahkan Masukkan Kode Pos"
                value={kodePosKtp}
                onChange={(e) => {
                  if (
                    e.target.value === "" ||
                    helperRegexNumber.test(e.target.value)
                  ) {
                    setKodePosKtp(e.target.value);
                  }
                }}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kode pos ktp")
                }
                maxLength={5}
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
          <hr className={style.hr} style={{ marginTop: "40px" }} />
        </div>

        <div className="alamat-domisili mt-6">
          <h3 className="font-weight-bolder">Alamat Domisili</h3>
          <Form.Group className="my-6" id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              checked={sesuai}
              value={sesuai}
              label="Alamat sama dengan KTP"
              onClick={() => handleSesuaiKtp(!sesuai)}
            />
          </Form.Group>
          {handleViewDomisili()}
        </div>
        {!wizzard ? (
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
        ) : (
          <div className="button-aksi mt-5 float-right">
            <Button
              className={`${style.button_profile_simpan} rounded-xl`}
              type="submit"
            >
              Lanjut
            </Button>
          </div>
        )}
      </Form>
    </>
  );
};

export default AlamatEdit;
