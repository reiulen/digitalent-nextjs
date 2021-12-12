import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  newPendaftaranPelatihan,
  storeFormRegister,
} from "../../../../redux/actions/pelatihan/register-training.actions";
import {
  getDropdownStatusMenikah,
  dropdownStatusPekerjaan,
  getDropdownHubungan,
  dropdownLevelPelatihan,
  dropdownAgama,
  dropdownPenyelenggara,
  dropdownProvinsi,
  getDropdownKabupatenAll,
  dropdownPendidikan,
} from "../../../../redux/actions/pelatihan/function.actions";
import {
  getDataRefPekerjaan,
  getDataAsalSekolah,
} from "../../../../redux/actions/pelatihan/profile.actions";

const FormPendaftaran = ({ propsTitle, funcView, token }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const [title, setTitle] = useState(propsTitle);
  const { dataForm } = useSelector((state) => state.formRegister);
  const [dataPendaftaran, setDataPendaftaran] = useState(
    dataForm?.form_pendaftaran
  );
  const { error: errorPelatihan, pelatihan: dataTraining } = useSelector(
    (state) => state.getPelatihan
  );
  const { data: statusMenikah } = useSelector(
    (state) => state.drowpdownStatusMenikah
  );
  const { data: dataPendidikan } = useSelector(
    (state) => state.drowpdownPendidikan
  );
  const { data: statusPekerjaan } = useSelector(
    (state) => state.drowpdownStatusPekerjaan
  );
  const { data: dataHubungan } = useSelector(
    (state) => state.drowpdownHubungan
  );
  const { dataRefPekerjaan: dataBidangPekerjaan } = useSelector(
    (state) => state.getRefPekerjaan
  );
  const { data: dataLevelPelatihan } = useSelector(
    (state) => state.drowpdownLevelPelatihan
  );
  const { data: dataAgama } = useSelector((state) => state.drowpdownAgama);
  const { data: dataPenyelenggara } = useSelector(
    (state) => state.drowpdownPenyelenggara
  );
  const { data: dataProvinsi } = useSelector(
    (state) => state.drowpdownProvinsi
  );
  const { data: dataKabupaten } = useSelector(
    (state) => state.drowpdownKabupaten
  );
  const { data: dataUniversitas } = useSelector(
    (state) => state.getAsalSekolah
  );

  useEffect(() => {
    if (dataForm && dataForm.form_pendaftaran.length > 0) {
      dataForm.form_pendaftaran.map((row, i) => {
        if (row.option === "select_reference") {
          if (row.dataOption === "status_menikah")
            dispatch(getDropdownStatusMenikah(token));
          if (row.dataOption === "pendidikan")
            dispatch(dropdownPendidikan(token));
          if (row.dataOption === "status_pekerjaan")
            dispatch(dropdownStatusPekerjaan(token));
          if (row.dataOption === "hubungan")
            dispatch(getDropdownHubungan(token));
          if (row.dataOption === "bidang_pekerjaan")
            dispatch(getDataRefPekerjaan(token));
          if (row.dataOption === "level_pelatihan")
            dispatch(dropdownLevelPelatihan(token));
          if (row.dataOption === "agama") dispatch(dropdownAgama(token));
          if (row.dataOption === "penyelengaara")
            dispatch(dropdownPenyelenggara(token));
          if (row.dataOption === "provinsi") dispatch(dropdownProvinsi(token));
          if (row.dataOption === "kota/kabupaten")
            dispatch(getDropdownKabupatenAll(token));
          if (row.dataOption === "universitas")
            dispatch(getDataAsalSekolah(token));
        }
      });
    }
  }, [dispatch]);

  const readerElementHandler = (row, i) => {
    switch (row.type) {
      case "text":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <input
              type={row.type}
              name={row.name}
              className="form-control"
              onChange={(e) => onChangeInput(i, e.target.value)}
              onBlur={() => simpleValidator.current.showMessageFor(row.name)}
              value={row.value}
            />
            {simpleValidator.current.message(
              row.name,
              row.value,
              row.required === "1" ? "required" : "",
              {
                className: "text-danger",
              }
            )}
          </div>
        );
        break;
      case "select":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <select
              name={row.name}
              className="form-control"
              value={row.value}
              onChange={(e) => onChangeInput(i, e.target.value)}
              onBlur={() => simpleValidator.current.showMessageFor(row.name)}
            >
              <option value="" disabled selected>
                Silahkan Pilih {row.name}
              </option>
              {row.option === "manual"
                ? row.dataOption.split(";").map((dat, i) => (
                    <option value={dat} key={i}>
                      {dat}
                    </option>
                  ))
                : row.dataOption === "status_menikah"
                ? statusMenikah &&
                  statusMenikah.data &&
                  statusMenikah.data.length > 0 &&
                  statusMenikah.data.map((row, i) => (
                    <option value={row.label} key={i}>
                      {row.label}
                    </option>
                  ))
                : row.dataOption === "pendidikan"
                ? dataPendidikan &&
                  dataPendidikan.data &&
                  dataPendidikan.data.length > 0 &&
                  dataPendidikan.data.map((row, i) => (
                    <option value={row.label} key={i}>
                      {row.label}
                    </option>
                  ))
                : row.dataOption === "status_pekerjaan"
                ? statusPekerjaan &&
                  statusPekerjaan.data &&
                  statusPekerjaan.data.length > 0 &&
                  statusPekerjaan.data.map((row, i) => (
                    <option value={row.label} key={i}>
                      {row.label}
                    </option>
                  ))
                : row.dataOption === "hubungan"
                ? dataHubungan &&
                  dataHubungan.data &&
                  dataHubungan.data.length > 0 &&
                  dataHubungan.data.map((row, i) => (
                    <option value={row.label} key={i}>
                      {row.label}
                    </option>
                  ))
                : row.dataOption === "bidang_pekerjaan"
                ? dataBidangPekerjaan &&
                  dataBidangPekerjaan.length > 0 &&
                  dataBidangPekerjaan.map((row, i) => (
                    <option value={row.label} key={i}>
                      {row.label}
                    </option>
                  ))
                : row.dataOption === "bidang_pekerjaan"
                ? dataBidangPekerjaan &&
                  dataBidangPekerjaan.length > 0 &&
                  dataBidangPekerjaan.map((row, i) => (
                    <option value={row.label} key={i}>
                      {row.label}
                    </option>
                  ))
                : row.dataOption === "level_pelatihan"
                ? dataLevelPelatihan &&
                  dataLevelPelatihan.data &&
                  dataLevelPelatihan.data.length > 0 &&
                  dataLevelPelatihan.data.map((row, i) => (
                    <option value={row.label} key={i}>
                      {row.label}
                    </option>
                  ))
                : row.dataOption === "agama"
                ? dataAgama &&
                  dataAgama.data &&
                  dataAgama.data.length > 0 &&
                  dataAgama.data.map((row, i) => (
                    <option value={row.label} key={i}>
                      {row.label}
                    </option>
                  ))
                : row.dataOption === "penyelengaara"
                ? dataPenyelenggara &&
                  dataPenyelenggara.data &&
                  dataPenyelenggara.data.length > 0 &&
                  dataPenyelenggara.data.map((row, i) => (
                    <option value={row.label} key={i}>
                      {row.label}
                    </option>
                  ))
                : row.dataOption === "provinsi"
                ? dataProvinsi &&
                  dataProvinsi.data &&
                  dataProvinsi.data.length > 0 &&
                  dataProvinsi.data.map((row, i) => (
                    <option value={row.label} key={i}>
                      {row.label}
                    </option>
                  ))
                : row.dataOption === "kota/kabupaten"
                ? dataKabupaten &&
                  dataKabupaten.data &&
                  dataKabupaten.data.length > 0 &&
                  dataKabupaten.data.map((row, i) => (
                    <option value={row.label} key={i}>
                      {row.label}
                    </option>
                  ))
                : row.dataOption === "universitas"
                ? dataUniversitas &&
                  dataUniversitas.length > 0 &&
                  dataUniversitas.map((row, i) => (
                    <option value={row.label} key={i}>
                      {row.label}
                    </option>
                  ))
                : ""}
            </select>
            {simpleValidator.current.message(
              row.name,
              row.value,
              row.required === "1" ? "required" : "",
              {
                className: "text-danger",
              }
            )}
          </div>
        );
        break;
      case "checkbox":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="my-auto">
              {row.option === "manual"
                ? row.dataOption.split(";").map((dat, j) => (
                    <div className="form-check pb-3" key={j}>
                      <input
                        type="checkbox"
                        name="plotRegistration"
                        className="form-check-input"
                        onBlur={() =>
                          simpleValidator.current.showMessageFor(row.name)
                        }
                        onChange={(e) => onChangeInput(i, dat)}
                        value={dat}
                      />
                      <label className="form-check-label">{dat}</label>
                    </div>
                  ))
                : row.dataOption === "status_menikah"
                ? statusMenikah &&
                  statusMenikah.data &&
                  statusMenikah.data.length > 0 &&
                  statusMenikah.data.map((el, i) => (
                    <div className="form-check pb-3" key={i}>
                      <input
                        type="checkbox"
                        name="plotRegistration"
                        className="form-check-input"
                        required={row.required}
                        value={el.label}
                      />
                      <label className="form-check-label">{el.label}</label>
                    </div>
                  ))
                : row.dataOption === "pendidikan"
                ? dataPendidikan &&
                  dataPendidikan.data &&
                  dataPendidikan.data.length > 0 &&
                  dataPendidikan.data.map((el, i) => (
                    <div className="form-check pb-3" key={i}>
                      <input
                        type="checkbox"
                        name="plotRegistration"
                        className="form-check-input"
                        required={row.required}
                        value={el.label}
                      />
                      <label className="form-check-label">{el.label}</label>
                    </div>
                  ))
                : row.dataOption === "status_pekerjaan"
                ? statusPekerjaan &&
                  statusPekerjaan.data &&
                  statusPekerjaan.data.length > 0 &&
                  statusPekerjaan.data.map((el, i) => (
                    <div className="form-check pb-3" key={i}>
                      <input
                        type="checkbox"
                        name="plotRegistration"
                        className="form-check-input"
                        required={row.required}
                        value={el.label}
                      />
                      <label className="form-check-label">{el.label}</label>
                    </div>
                  ))
                : row.dataOption === "hubungan"
                ? dataHubungan &&
                  dataHubungan.data &&
                  dataHubungan.data.length > 0 &&
                  dataHubungan.data.map((el, i) => (
                    <div className="form-check pb-3" key={i}>
                      <input
                        type="checkbox"
                        name="plotRegistration"
                        className="form-check-input"
                        required={row.required}
                        value={el.label}
                      />
                      <label className="form-check-label">{el.label}</label>
                    </div>
                  ))
                : row.dataOption === "bidang_pekerjaan"
                ? dataBidangPekerjaan &&
                  dataBidangPekerjaan.length > 0 &&
                  dataBidangPekerjaan.map((el, i) => (
                    <div className="form-check pb-3" key={i}>
                      <input
                        type="checkbox"
                        name="plotRegistration"
                        className="form-check-input"
                        required={row.required}
                        value={el.label}
                      />
                      <label className="form-check-label">{el.label}</label>
                    </div>
                  ))
                : row.dataOption === "bidang_pekerjaan"
                ? dataBidangPekerjaan &&
                  dataBidangPekerjaan.length > 0 &&
                  dataBidangPekerjaan.map((el, i) => (
                    <div className="form-check pb-3" key={i}>
                      <input
                        type="checkbox"
                        name="plotRegistration"
                        className="form-check-input"
                        required={row.required}
                        value={el.label}
                      />
                      <label className="form-check-label">{el.label}</label>
                    </div>
                  ))
                : row.dataOption === "level_pelatihan"
                ? dataLevelPelatihan &&
                  dataLevelPelatihan.data &&
                  dataLevelPelatihan.data.length > 0 &&
                  dataLevelPelatihan.data.map((el, i) => (
                    <div className="form-check pb-3" key={i}>
                      <input
                        type="checkbox"
                        name="plotRegistration"
                        className="form-check-input"
                        required={row.required}
                        value={el.label}
                      />
                      <label className="form-check-label">{el.label}</label>
                    </div>
                  ))
                : row.dataOption === "agama"
                ? dataAgama &&
                  dataAgama.data &&
                  dataAgama.data.length > 0 &&
                  dataAgama.data.map((el, i) => (
                    <div className="form-check pb-3" key={i}>
                      <input
                        type="checkbox"
                        name="plotRegistration"
                        className="form-check-input"
                        required={row.required}
                        value={el.label}
                      />
                      <label className="form-check-label">{el.label}</label>
                    </div>
                  ))
                : row.dataOption === "penyelengaara"
                ? dataPenyelenggara &&
                  dataPenyelenggara.data &&
                  dataPenyelenggara.data.length > 0 &&
                  dataPenyelenggara.data.map((el, i) => (
                    <div className="form-check pb-3" key={i}>
                      <input
                        type="checkbox"
                        name="plotRegistration"
                        className="form-check-input"
                        required={row.required}
                        value={el.label}
                      />
                      <label className="form-check-label">{el.label}</label>
                    </div>
                  ))
                : row.dataOption === "provinsi"
                ? dataProvinsi &&
                  dataProvinsi.data &&
                  dataProvinsi.data.length > 0 &&
                  dataProvinsi.data.map((el, i) => (
                    <div className="form-check pb-3" key={i}>
                      <input
                        type="checkbox"
                        name="plotRegistration"
                        className="form-check-input"
                        required={row.required}
                        value={el.label}
                      />
                      <label className="form-check-label">{el.label}</label>
                    </div>
                  ))
                : row.dataOption === "kota/kabupaten"
                ? dataKabupaten &&
                  dataKabupaten.data &&
                  dataKabupaten.data.length > 0 &&
                  dataKabupaten.data.map((el, i) => (
                    <div className="form-check pb-3" key={i}>
                      <input
                        type="checkbox"
                        name="plotRegistration"
                        className="form-check-input"
                        required={row.required}
                        value={el.label}
                      />
                      <label className="form-check-label">{el.label}</label>
                    </div>
                  ))
                : row.dataOption === "universitas"
                ? dataUniversitas &&
                  dataUniversitas.length > 0 &&
                  dataUniversitas.map((el, i) => (
                    <div className="form-check pb-3" key={i}>
                      <input
                        type="checkbox"
                        name="plotRegistration"
                        className="form-check-input"
                        required={row.required}
                        value={el.label}
                      />
                      <label className="form-check-label">{el.label}</label>
                    </div>
                  ))
                : ""}
            </div>
            {simpleValidator.current.message(
              row.name,
              row.value,
              row.required === "1" ? "required" : "",
              {
                className: "text-danger",
              }
            )}
          </div>
        );
        break;
      case "textarea":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <textarea
              name={row.name}
              cols="30"
              rows="5"
              className="form-control"
              onChange={(e) => onChangeInput(i, e.target.value)}
              onBlur={() => simpleValidator.current.showMessageFor(row.name)}
              value={row.value}
            />
            {simpleValidator.current.message(
              row.name,
              row.value,
              row.required === "1" ? "required" : "",
              {
                className: "text-danger",
              }
            )}
          </div>
        );
        break;
      case "radio":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="my-auto">
              {row.option === "manual"
                ? row.dataOption.split(";").map((dat, j) => (
                    <div className="form-check pb-3" key={j}>
                      <input
                        type="radio"
                        name={row.name}
                        className="form-check-input"
                        value={dat}
                        onChange={(e) => onChangeInput(i, dat)}
                        onBlur={() =>
                          simpleValidator.current.showMessageFor(row.name)
                        }
                        value={row.value}
                      />
                      <label className="form-check-label">{dat}</label>
                    </div>
                  ))
                : row.dataOption === "status_menikah"
                ? statusMenikah &&
                  statusMenikah.data &&
                  statusMenikah.data.length > 0 &&
                  statusMenikah.data.map((el, i) => (
                    <div className="form-check pb-3" key={i}>
                      <input
                        type="radio"
                        name={el.label}
                        className="form-check-input"
                        value={el.label}
                        required={row.required}
                      />
                      <label className="form-check-label">{el.label}</label>
                    </div>
                  ))
                : row.dataOption === "pendidikan"
                ? dataPendidikan &&
                  dataPendidikan.data &&
                  dataPendidikan.data.length > 0 &&
                  dataPendidikan.data.map((el, i) => (
                    <div className="form-check pb-3" key={i}>
                      <input
                        type="radio"
                        name={el.label}
                        className="form-check-input"
                        value={el.label}
                        required={row.required}
                      />
                      <label className="form-check-label">{el.label}</label>
                    </div>
                  ))
                : row.dataOption === "status_pekerjaan"
                ? statusPekerjaan &&
                  statusPekerjaan.data &&
                  statusPekerjaan.data.length > 0 &&
                  statusPekerjaan.data.map((el, i) => (
                    <div className="form-check pb-3" key={i}>
                      <input
                        type="radio"
                        name={el.label}
                        className="form-check-input"
                        value={el.label}
                        required={row.required}
                      />
                      <label className="form-check-label">{el.label}</label>
                    </div>
                  ))
                : row.dataOption === "hubungan"
                ? dataHubungan &&
                  dataHubungan.data &&
                  dataHubungan.data.length > 0 &&
                  dataHubungan.data.map((el, i) => (
                    <div className="form-check pb-3" key={i}>
                      <input
                        type="radio"
                        name={el.label}
                        className="form-check-input"
                        value={el.label}
                        required={row.required}
                      />
                      <label className="form-check-label">{el.label}</label>
                    </div>
                  ))
                : row.dataOption === "bidang_pekerjaan"
                ? dataBidangPekerjaan &&
                  dataBidangPekerjaan.length > 0 &&
                  dataBidangPekerjaan.map((el, i) => (
                    <div className="form-check pb-3" key={i}>
                      <input
                        type="radio"
                        name={el.label}
                        className="form-check-input"
                        value={el.label}
                        required={row.required}
                      />
                      <label className="form-check-label">{el.label}</label>
                    </div>
                  ))
                : row.dataOption === "bidang_pekerjaan"
                ? dataBidangPekerjaan &&
                  dataBidangPekerjaan.length > 0 &&
                  dataBidangPekerjaan.map((el, i) => (
                    <div className="form-check pb-3" key={i}>
                      <input
                        type="radio"
                        name={el.label}
                        className="form-check-input"
                        value={el.label}
                        required={row.required}
                      />
                      <label className="form-check-label">{el.label}</label>
                    </div>
                  ))
                : row.dataOption === "level_pelatihan"
                ? dataLevelPelatihan &&
                  dataLevelPelatihan.data &&
                  dataLevelPelatihan.data.length > 0 &&
                  dataLevelPelatihan.data.map((el, i) => (
                    <div className="form-check pb-3" key={i}>
                      <input
                        type="radio"
                        name={el.label}
                        className="form-check-input"
                        value={el.label}
                        required={row.required}
                      />
                      <label className="form-check-label">{el.label}</label>
                    </div>
                  ))
                : row.dataOption === "agama"
                ? dataAgama &&
                  dataAgama.data &&
                  dataAgama.data.length > 0 &&
                  dataAgama.data.map((el, i) => (
                    <div className="form-check pb-3" key={i}>
                      <input
                        type="radio"
                        name={el.label}
                        className="form-check-input"
                        value={el.label}
                        required={row.required}
                      />
                      <label className="form-check-label">{el.label}</label>
                    </div>
                  ))
                : row.dataOption === "penyelengaara"
                ? dataPenyelenggara &&
                  dataPenyelenggara.data &&
                  dataPenyelenggara.data.length > 0 &&
                  dataPenyelenggara.data.map((el, i) => (
                    <div className="form-check pb-3" key={i}>
                      <input
                        type="radio"
                        name={el.label}
                        className="form-check-input"
                        value={el.label}
                        required={row.required}
                      />
                      <label className="form-check-label">{el.label}</label>
                    </div>
                  ))
                : row.dataOption === "provinsi"
                ? dataProvinsi &&
                  dataProvinsi.data &&
                  dataProvinsi.data.length > 0 &&
                  dataProvinsi.data.map((el, i) => (
                    <div className="form-check pb-3" key={i}>
                      <input
                        type="radio"
                        name={el.label}
                        className="form-check-input"
                        value={el.label}
                        required={row.required}
                      />
                      <label className="form-check-label">{el.label}</label>
                    </div>
                  ))
                : row.dataOption === "kota/kabupaten"
                ? dataKabupaten &&
                  dataKabupaten.data &&
                  dataKabupaten.data.length > 0 &&
                  dataKabupaten.data.map((el, i) => (
                    <div className="form-check pb-3" key={i}>
                      <input
                        type="radio"
                        name={el.label}
                        className="form-check-input"
                        value={el.label}
                        required={row.required}
                      />
                      <label className="form-check-label">{el.label}</label>
                    </div>
                  ))
                : row.dataOption === "universitas"
                ? dataUniversitas &&
                  dataUniversitas.length > 0 &&
                  dataUniversitas.map((el, i) => (
                    <div className="form-check pb-3" key={i}>
                      <input
                        type="radio"
                        name={el.label}
                        className="form-check-input"
                        value={el.label}
                        required={row.required}
                      />
                      <label className="form-check-label">{el.label}</label>
                    </div>
                  ))
                : ""}
            </div>
            {simpleValidator.current.message(
              row.name,
              row.value,
              row.required === "1" ? "required" : "",
              {
                className: "text-danger",
              }
            )}
          </div>
        );
        break;
      case "file_image":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                accept="image/png, image/jpeg , image/jpg"
                onChange={(e) => onChangeInput(i, e)}
                onBlur={() => simpleValidator.current.showMessageFor(row.name)}
              />
              <label className="custom-file-label" htmlFor="customFile">
                {row.fileName || "Belum ada File"}
              </label>
            </div>
            {simpleValidator.current.message(
              row.name,
              row.value,
              row.required === "1" ? "required" : "",
              {
                className: "text-danger",
              }
            )}
          </div>
        );
        break;
      case "file_doc":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                accept="application/pdf"
                onChange={(e) => onChangeInput(i, e)}
                onBlur={() => simpleValidator.current.showMessageFor(row.name)}
              />
              <label className="custom-file-label" htmlFor="customFile">
                {row.fileName || "Belum ada File"}
              </label>
            </div>
            {simpleValidator.current.message(
              row.name,
              row.value,
              row.required === "1" ? "required" : "",
              {
                className: "text-danger",
              }
            )}
          </div>
        );
        break;
      case "date":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <input
              type={row.type}
              name={row.name}
              className="form-control"
              onChange={(e) => onChangeInput(i, e.target.value)}
              onBlur={() => simpleValidator.current.showMessageFor(row.name)}
              value={row.value}
            />
            {simpleValidator.current.message(
              row.name,
              row.value,
              row.required === "1" ? "required" : "",
              {
                className: "text-danger",
              }
            )}
          </div>
        );
        break;
      default:
        break;
    }
  };

  const onChangeInput = (index, value) => {
    let list = [...dataForm.form_pendaftaran];
    list[index].value = value;
    if (list[index].type === "file_image" || list[index].type === "file_doc") {
      let type = [""];
      if (list[index].type === "file_image") {
        type = ["image/jpg", "image/png", "image/jpeg"];
      } else if (list[index].type === "file_doc") {
        type = ["application/pdf"];
      }
      if (value.target.files[0]) {
        if (type.includes(value.target.files[0].type)) {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              list[index].value = reader.result;
            }
          };
          reader.readAsDataURL(value.target.files[0]);
          list[index].fileName = value.target.files[0].name;
        } else {
          value.target.value = null;
          Swal.fire(
            "Oops !",
            "Data yang dimasukkan tidak sesuai format.",
            "error"
          );
        }
      }
    }
    setDataPendaftaran(list);
    // funcForm(list);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (dataTraining?.komitmen == "1") {
      if (simpleValidator.current.allValid()) {
        const data = {
          komitmen: dataForm.komitmen,
          form_pendaftaran: dataPendaftaran,
        };
        dispatch(storeFormRegister(data));
        funcView(2);
      } else {
        simpleValidator.current.showMessages();
        forceUpdate(1);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Isi data dengan benar !",
        });
      }
    } else {
      const data = {
        komitmen: `${dataForm.komitmen}`,
        form_pendaftaran: dataPendaftaran,
        pelatian_id: +router.query.id,
      };
      dispatch(newPendaftaranPelatihan(data, token));
    }
  };

  return (
    <>
      <Card.Body>
        <form onSubmit={onSubmit}>
          <h3 className="font-weight-bolder pb-5 pt-4">{title}</h3>
          <div className="row">
            {dataForm &&
              dataForm.form_pendaftaran.map((row, i) => (
                <>{readerElementHandler(row, i)}</>
              ))}
          </div>

          <div className="button-aksi mt-7 float-right">
            <Button
              className={`${style.button_profile_batal} rounded-xl mr-3`}
              type="button"
              onClick={() => router.back()}
            >
              Batal
            </Button>
            <Button
              className={`${style.button_profile_simpan} rounded-xl`}
              type="submit"
            >
              {dataTraining?.komitmen == "1" ? "Lanjut" : "Daftar"}
            </Button>
          </div>
        </form>
      </Card.Body>
    </>
  );
};

export default FormPendaftaran;
