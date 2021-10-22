import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import axios from "axios";

import { postTemplate } from "../../../../../redux/actions/site-management/settings/pelatihan.actions";

export default function Template(props) {
  const [status, setStatus] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  let dispatch = useDispatch();

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postTemplate(props.token, subject, body, status));
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-trainings/list-template-email/tes substansi`,
        {
          headers: {
            authorization: `Bearer ${props.token}`,
          },
        }
      )
      .then((items) => {
        console.log(items.data.data.training_rules);
        setSubject(items.data.data.training_rules.subject)
        setBody(items.data.data.training_rules.body)
      });
  }, [props.token]);

  return (
    <div className="col-xl-8 styling-content-pelatihan">
      <form onSubmit={handleSubmit}>
        <div className="notification-title">
          <h1>Template Email</h1>
        </div>
        <div className="form-group">
          <label>Status</label>
          <select className="form-control" onChange={onChangeStatus}>
            <option disabled selected>
              Pilih Status
            </option>
            <option value="Menunggu">Menunggu</option>
            <option value="Tidak Lulus Administrasi">
              Tidak Lulus Administrasi
            </option>
            <option value="Tidak Substansi">Tidak Substansi</option>
            <option value="Tidak Lulus Tes Substansi">
              Tidak Lulus Tes Substansi
            </option>
            <option value="Lulus Tes Substansi">Lulus Tes Substansi</option>
            <option value="Ditolak">Ditolak</option>
            <option value="Diterima">Diterima</option>
            <option value="Pelatihan">Pelatihan</option>
            <option value="Lulus Pelatihan">Lulus Pelatihan</option>
            <option value="Tidak Lulus Pelatihan">Tidak Lulus Pelatihan</option>
          </select>
        </div>
        <div className="form-group">
          <label>Subject</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Example input"
            value={subject}
            onChange={onChangeSubject}
          />
        </div>
        <div className="form-group">
          <CKEditor
            editor={ClassicEditor}
            data={body}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              // console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              let data = editor.getData();
              setBody(data);
            }}
          />
        </div>
        <div className="d-flex justify-content-end mb-5">
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
