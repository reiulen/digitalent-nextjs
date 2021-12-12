import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
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
} from "../../../../../redux/actions/pelatihan/function.actions";
import {
  getProfilePendidikan,
  getDataRefPekerjaan,
  getDataAsalSekolah,
} from "../../../../../redux/actions/pelatihan/profile.actions";
import { useDispatch, useSelector } from "react-redux";

const ModalPreview = ({
  propsTitle,
  propsForm,
  propsModalShow,
  sendPropsFormBuilder,
  sendPropsModalShow,
  propsToken,
}) => {
  const dispatch = useDispatch();

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

  const [title] = useState(propsTitle);
  const [modalShow, setModalShow] = useState(propsModalShow);
  const [formBuilder, setFormBuilder] = useState(propsForm);

  useEffect(() => {
    if (propsForm && propsForm.length > 0) {
      propsForm.map((row, i) => {
        if (row.option === "select_reference") {
          if (row.dataOption === "status_menikah")
            dispatch(getDropdownStatusMenikah(propsToken));
          if (row.dataOption === "pendidikan")
            dispatch(dropdownPendidikan(propsToken));
          if (row.dataOption === "status_pekerjaan")
            dispatch(dropdownStatusPekerjaan(propsToken));
          if (row.dataOption === "hubungan")
            dispatch(getDropdownHubungan(propsToken));
          if (row.dataOption === "bidang_pekerjaan")
            dispatch(getDataRefPekerjaan(propsToken));
          if (row.dataOption === "level_pelatihan")
            dispatch(dropdownLevelPelatihan(propsToken));
          if (row.dataOption === "agama") dispatch(dropdownAgama(propsToken));
          if (row.dataOption === "penyelengaara")
            dispatch(dropdownPenyelenggara(propsToken));
          if (row.dataOption === "provinsi")
            dispatch(dropdownProvinsi(propsToken));
          if (row.dataOption === "kota/kabupaten")
            dispatch(getDropdownKabupatenAll(propsToken));
          if (row.dataOption === "universitas")
            dispatch(getDataAsalSekolah(propsToken));
        }
      });
    }
  }, [dispatch]);

  const closePreviewHandler = () => {
    let list = [...formBuilder];
    list.forEach((row, i) => {
      if (row.option === "manual") {
        let dataOption = row.dataOption.join(";");
        row.dataOption = dataOption;
      }
    });
    setFormBuilder(list);
    sendPropsFormBuilder(list);
    setModalShow(false);
    sendPropsModalShow(false);
  };

  const readerElementHandler = (row, i) => {
    switch (row.element) {
      case "text":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <input
              type={row.element}
              name=""
              className="form-control"
              required={row.required}
            />
          </div>
        );
        break;
      case "select":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <select name="" className="form-control" required={row.required}>
              <option value="">--Pilih Data--</option>
              {modalShow === true
                ? row.option === "manual"
                  ? row.dataOption.map((dat, i) => (
                      <option value={dat} key={i}>
                        {dat}
                      </option>
                    ))
                  : row.dataOption === "status_menikah"
                  ? statusMenikah &&
                    statusMenikah.data &&
                    statusMenikah.data.length > 0 &&
                    statusMenikah.data.map((row, i) => (
                      <option value={row.id} key={i}>
                        {row.label}
                      </option>
                    ))
                  : row.dataOption === "pendidikan"
                  ? dataPendidikan &&
                    dataPendidikan.data &&
                    dataPendidikan.data.length > 0 &&
                    dataPendidikan.data.map((row, i) => (
                      <option value={row.id} key={i}>
                        {row.label}
                      </option>
                    ))
                  : row.dataOption === "status_pekerjaan"
                  ? statusPekerjaan &&
                    statusPekerjaan.data &&
                    statusPekerjaan.data.length > 0 &&
                    statusPekerjaan.data.map((row, i) => (
                      <option value={row.id} key={i}>
                        {row.label}
                      </option>
                    ))
                  : row.dataOption === "hubungan"
                  ? dataHubungan &&
                    dataHubungan.data &&
                    dataHubungan.data.length > 0 &&
                    dataHubungan.data.map((row, i) => (
                      <option value={row.id} key={i}>
                        {row.label}
                      </option>
                    ))
                  : row.dataOption === "bidang_pekerjaan"
                  ? dataBidangPekerjaan &&
                    dataBidangPekerjaan.length > 0 &&
                    dataBidangPekerjaan.map((row, i) => (
                      <option value={row.id} key={i}>
                        {row.label}
                      </option>
                    ))
                  : row.dataOption === "bidang_pekerjaan"
                  ? dataBidangPekerjaan &&
                    dataBidangPekerjaan.length > 0 &&
                    dataBidangPekerjaan.map((row, i) => (
                      <option value={row.id} key={i}>
                        {row.label}
                      </option>
                    ))
                  : row.dataOption === "level_pelatihan"
                  ? dataLevelPelatihan &&
                    dataLevelPelatihan.data &&
                    dataLevelPelatihan.data.length > 0 &&
                    dataLevelPelatihan.data.map((row, i) => (
                      <option value={row.id} key={i}>
                        {row.label}
                      </option>
                    ))
                  : row.dataOption === "agama"
                  ? dataAgama &&
                    dataAgama.data &&
                    dataAgama.data.length > 0 &&
                    dataAgama.data.map((row, i) => (
                      <option value={row.id} key={i}>
                        {row.label}
                      </option>
                    ))
                  : row.dataOption === "penyelengaara"
                  ? dataPenyelenggara &&
                    dataPenyelenggara.data &&
                    dataPenyelenggara.data.length > 0 &&
                    dataPenyelenggara.data.map((row, i) => (
                      <option value={row.id} key={i}>
                        {row.label}
                      </option>
                    ))
                  : row.dataOption === "provinsi"
                  ? dataProvinsi &&
                    dataProvinsi.data &&
                    dataProvinsi.data.length > 0 &&
                    dataProvinsi.data.map((row, i) => (
                      <option value={row.id} key={i}>
                        {row.label}
                      </option>
                    ))
                  : row.dataOption === "kota/kabupaten"
                  ? dataKabupaten &&
                    dataKabupaten.data &&
                    dataKabupaten.data.length > 0 &&
                    dataKabupaten.data.map((row, i) => (
                      <option value={row.id} key={i}>
                        {row.label}
                      </option>
                    ))
                  : row.dataOption === "universitas"
                  ? dataUniversitas &&
                    dataUniversitas.length > 0 &&
                    dataUniversitas.map((row, i) => (
                      <option value={row.id} key={i}>
                        {row.label}
                      </option>
                    ))
                  : ""
                : ""}
            </select>
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
              {modalShow === true
                ? row.option === "manual"
                  ? row.dataOption.map((dat, i) => (
                      <div className="form-check pb-3" key={i}>
                        <input
                          type="checkbox"
                          name="plotRegistration"
                          className="form-check-input"
                          required={row.required}
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
                          value={el.id}
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
                          value={el.id}
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
                          value={el.id}
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
                          value={el.id}
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
                          value={el.id}
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
                          value={el.id}
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
                          value={el.id}
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
                          value={el.id}
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
                          value={el.id}
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
                          value={el.id}
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
                          value={el.id}
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
                          value={el.id}
                        />
                        <label className="form-check-label">{el.label}</label>
                      </div>
                    ))
                  : ""
                : ""}
            </div>
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
              name=""
              cols="30"
              rows="5"
              className="form-control"
              required={row.required}
            />
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
              {modalShow === true
                ? row.option === "manual"
                  ? row.dataOption.map((dat, i) => (
                      <div className="form-check pb-3" key={i}>
                        <input
                          type="radio"
                          name={row.name}
                          className="form-check-input"
                          value={dat}
                          required={row.required}
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
                          value={el.id}
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
                          value={el.id}
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
                          value={el.id}
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
                          value={el.id}
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
                          value={el.id}
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
                          value={el.id}
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
                          value={el.id}
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
                          value={el.id}
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
                          value={el.id}
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
                          value={el.id}
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
                          value={el.id}
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
                          value={el.id}
                          required={row.required}
                        />
                        <label className="form-check-label">{el.label}</label>
                      </div>
                    ))
                  : ""
                : ""}
            </div>
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
                required={row.required}
              />
              <label className="custom-file-label" htmlFor="customFile">
                Belum ada File
              </label>
            </div>
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
                required={row.required}
              />
              <label className="custom-file-label" htmlFor="customFile">
                Belum ada File
              </label>
            </div>
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
              type={row.element}
              name=""
              className="form-control"
              required={row.required}
            />
          </div>
        );
        break;
      default:
        break;
    }
  };
  return (
    <>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        <button type="button" className="close" onClick={closePreviewHandler}>
          <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          {formBuilder.map((row, i) => (
            <>{readerElementHandler(row, i)}</>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer className="py-2">
        <div className="float-right">
          <button
            className="btn btn-warning"
            type="button"
            style={{ borderRadius: "30px", fontWeight: "600" }}
            onClick={closePreviewHandler}
          >
            Kembali
          </button>
        </div>
      </Modal.Footer>
    </>
  );
};

export default ModalPreview;
