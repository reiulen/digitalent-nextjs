import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from 'axios'

import { putDataPrompt} from '../../../../../redux/actions/site-management/settings/pelatihan.actions'

export default function Prompt(props) {

      const [notification, setNotification] = useState(0);
      const [email, setEmail] = useState(0);
    
      let dispatch = useDispatch()
    
      useEffect(() => {
        axios.get(
          `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-trainings/list-propt`,
          {
            headers: {
              authorization: `Bearer ${props.token}`,
            },
          }
        ).then(items => {
          setNotification(items.data.data.training_rules.notification[0].status)
          setEmail(items.data.data.training_rules.email[0].status)
        })
      }, [props.token])

      const handleSubmit = (e) => {
        e.preventDefault()
        console.log(notification, email)
        dispatch(putDataPrompt(props.token, notification || notification === 1 ? 1 : 0, email || email === 1 ? 1 : 0))
      };

      const onChange = (e) => {
        setNotification(e.target.checked)
      };

      const onChangeEmail = (e) => {
        setEmail(e.target.checked)
      };
    
  return (
    <div className="col-xl-8 styling-content-pelatihan">
      <form onSubmit={handleSubmit}>
        <div className="notification-title">
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
                checked={notification}
                onChange={onChange}
              />
              <span className="email-check"></span>
            </label>
            <span className="isAktif">{notification === 1 || notification === true ? "Aktif" : "Tidak Aktif"}</span>
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
                checked={email}
                onChange={onChangeEmail}
              />
              <span></span>
            </label>
            <span className="isAktif">{email === 1 || email === true ? "Aktif" : "Tidak Aktif"}</span>
          </span>
        </div>
        <div className="button-submit-notif ">
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
