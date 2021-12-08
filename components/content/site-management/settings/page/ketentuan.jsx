import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Select from "react-select";

import styles from "../../../../../styles/previewGaleri.module.css";

import { postKetentuan } from '../../../../../redux/actions/site-management/settings/pelatihan.actions'

export default function Ketentuan(props) {
  const [statusLulus, setStatusLulus] = useState("");
  const [statusAdmin, setStatusAdmin] = useState("");
  const [statusTidakLulus, setStatusTidakLulus] = useState("");
  const [statusPelatihan, setStatusPelatihan] = useState("");
  const [totalPelatihan, setTotalPelatihan] = useState("");

  const optionsPelatihan = [
    { value: "1", label: "1 Pelatihan" },
    { value: "2", label: "2 Pelatihan" },
    { value: "3", label: "3 Pelatihan" },
    { value: "4", label: "4 Pelatihan" },
    { value: "5", label: "5 Pelatihan" },
    { value: "6", label: "6 Pelatihan" },
    { value: "7", label: "7 Pelatihan" },
    { value: "8", label: "8 Pelatihan" },
    { value: "9", label: "9 Pelatihan" },
    { value: "10", label: "10 Pelatihan" },
    { value: "-", label: "Lebih dari 10 Pelatihan" },
  ];

  let dispatch = useDispatch()

  useEffect(() => {
    axios.get(
      `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-trainings/list-training-condition`,
      {
        headers: {
          authorization: `Bearer ${props.token}`,
        },
      }
    ).then(items => {
      setStatusLulus(parseInt(items.data.data.training_rules.trainingPassStatus))
      setStatusAdmin(parseInt(items.data.data.training_rules.completeFinalAdministrativeStatus))
      setStatusTidakLulus(parseInt(items.data.data.training_rules.statusNotPassedTraining))
      setStatusPelatihan(parseInt(items.data.data.training_rules.noTrainingAccepted))
      setTotalPelatihan({value: items.data.data.training_rules.numberOfTraining, label: `${items.data.data.training_rules.numberOfTraining} pelatihan`})
    })
  }, [props.token])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postKetentuan(props.token, totalPelatihan.value, statusLulus || statusLulus === 1 ? "1" : "0", statusAdmin || statusAdmin === 1 ? "1" : "0", statusTidakLulus || statusTidakLulus === 1 ? "1" : "0", statusPelatihan || statusPelatihan === 1 ? "1" : "0"))
  };

  return (
    <div className="row">
      <div className="col-xl-11 styling-content-pelatihan mt-5">
        <form onSubmit={handleSubmit}>
          <div className="notification-title border-resnponsive">
            <h1>Ketentuan Pelatihan</h1>
          </div>
          <div className="form-group">
            <label>Jumlah Pelatihan yang dapat diikuti dalam satu tahun</label>
            <div className="mr-4" style={{ zIndex: '99', position: 'relative' }}>
              <Select
                placeholder="Pilih Pelatihan"
                options={optionsPelatihan}
                value={totalPelatihan}
                onChange={(e) => {
                  setTotalPelatihan({ value: e.value, label: e.label });
                }}
              />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="judul">Syarat</h3>
            <div className="col-9 col-form-label">
              <div className="checkbox-list">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    name="Checkboxes4"
                    checked={statusLulus}
                    onChange={(e) => {
                      setStatusLulus(e.target.checked);
                    }}
                  />
                  <span className="checkbox-ketentuan"></span>
                  Status Lulus Pelatihan
                </label>
                <label className="checkbox">
                  <input type="checkbox" name="Checkboxes4" checked={statusTidakLulus} onChange={(e) => {
                    setStatusTidakLulus(e.target.checked);
                  }} />
                  <span className="checkbox-ketentuan"></span>
                  Status Tidak Lulus Pelatihan
                </label>
                <label className="checkbox">
                  <input type="checkbox" name="Checkboxes4" checked={statusPelatihan} onChange={(e) => {
                    setStatusPelatihan(e.target.checked);
                  }} />
                  <span className="checkbox-ketentuan"></span>
                  Tidak Diterima Pelatihan
                </label>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mb-4">
            <button
              type="submit"
              className={`${styles.btnSimpan} btn btn-primary-rounded-full rounded-pill mr-3`}
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
