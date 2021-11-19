import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'

import { putDataPrompt} from '../../../../../redux/actions/site-management/settings/pelatihan.actions'

export default function Prompt(props) {

  const allPrompt = useSelector(state => state.allPrompt)

      const [notification, setNotification] = useState(allPrompt.notification.training_rules.notification[0]?.status);
      const [email, setEmail] = useState(allPrompt.notification.training_rules.email[0]?.status);
    
      let dispatch = useDispatch()

      const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(putDataPrompt(props.token, notification === "1" || notification === true  ? "1" : "0",  email === "1" || email === true  ? "1" : "0"))
      };
    
  return (
    <div className="col-xl-8 styling-content-pelatihan">
      <form onSubmit={handleSubmit}>
        <div className="notification-title border-resnponsive mr-4">
          <h1>Prompt Update Notification</h1>
        </div>
        <div className="notification">
          <h5>Notification</h5>
        </div>
        <div className="input-notification">
          <span className="switch switch-primary">
            <label>
              <input
                type="checkbox"
                name="notification"
                value={notification}
                defaultChecked={notification === "1"}
                onClick={e => {
                  setNotification(e.target.checked)
                }}
              />
              <span className="email-check"></span>
            </label>
            <span className="isAktif">{notification === "1" || notification === true ? "Aktif" : "Tidak Aktif"}</span>
          </span>
        </div>
        <div className="email">
          <h3>Email</h3>
        </div>
        <div className="input-email ml-auto">
          <span className="d-flex switch switch-primary">
            <label>
              <input
                type="checkbox"
                name="select"
                id="email-check"
                value={email}
                defaultChecked={email === "1"}
                onClick={e => {
                  setEmail(e.target.checked)
                }}
              />
              <span></span>
            </label>
            <span className="isAktif">{email === "1" || email === true ? "Aktif" : "Tidak Aktif"}</span>
          </span>
        </div>
        <div className="button-submit-notif mb-5">
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-rounded-full bg-blue-primary text-white"
            >
              Simpan
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
