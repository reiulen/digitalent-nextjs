import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { postKetentuan } from '../../../../../redux/actions/site-management/settings/pelatihan.actions'

export default function Ketentuan(props) {
  const [statusLulus, setStatusLulus] = useState("");
  const [statusAdmin, setStatusAdmin] = useState("");
  const [statusTidakLulus, setStatusTidakLulus] = useState("");
  const [statusPelatihan, setStatusPelatihan] = useState("");
  const [totalPelatihan, setTotalPelatihan] = useState("");

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
      console.log(items.data.data.training_rules)
      setStatusLulus(parseInt(items.data.data.training_rules.trainingPassStatus))
      setStatusAdmin(parseInt(items.data.data.training_rules.completeFinalAdministrativeStatus))
      setStatusTidakLulus(parseInt(items.data.data.training_rules.statusNotPassedTraining))
      setStatusPelatihan(parseInt(items.data.data.training_rules.noTrainingAccepted))
      setTotalPelatihan(items.data.data.training_rules.numberOfTraining)
    })
  }, [props.token])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(totalPelatihan)
    dispatch(postKetentuan(props.token, totalPelatihan,statusLulus || statusLulus === 1 ? "1" : "0", statusAdmin || statusAdmin === 1 ? "1" : "0", statusTidakLulus || statusTidakLulus === 1 ? "1" : "0", statusPelatihan || statusPelatihan === 1 ? "1" : "0" ))
  };

  return (
    <div className="col styling-content-pelatihan">
      <form onSubmit={handleSubmit}>
        <div className="notification-title">
          <h1>Ketentuan Pelatihan</h1>
        </div>
        <div className="form-group">
          <label>Jumlah Pelatihan yang dapat diikuti dalam satu tahun</label>
          <select className="form-control" value={totalPelatihan} onChange={e => {
            setTotalPelatihan(e.target.value)
          }} >
            <option value="1">1 Pelatihan</option>
            <option value="2">2 Pelatihan</option>
            <option value="3">3 Pelatihan</option>
            <option value="4">4 Pelatihan</option>
            <option value="5">5 Pelatihan</option>
            <option value="6">6 Pelatihan</option>
            <option value="7">7 Pelatihan</option>
            <option value="8">8 Pelatihan</option>
            <option value="9">9 Pelatihan</option>
            <option value="10" {...totalPelatihan === "10" ? " selected" : ""}>10 Pelatihan</option>
          </select>
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
                <input type="checkbox" className="checkbox-ketentuan" name="Checkboxes4" checked={statusAdmin} onChange={(e) => {
                    setStatusAdmin(e.target.checked);
                  }}  />
                <span className="checkbox-ketentuan"></span>
                Status Administrasi Akhir Lengkap
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
            className="btn btn-rounded-full bg-blue-primary text-white"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
