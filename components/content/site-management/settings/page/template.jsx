import React, { useState, useEffect, useRef } from "react";

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import Select from "react-select";

import styles from "../../../../../styles/previewGaleri.module.css";
import { postTemplate } from "../../../../../redux/actions/site-management/settings/pelatihan.actions";

export default function Template(props) {
  const [status, setStatus] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const selectReset = useRef()
  const router = useRouter();

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  let dispatch = useDispatch();

  const optionsStatus = [
    { value: "Menunggu", label: "Menunggu" },
    { value: "Tidak Lulus Administrasi", label: "Tidak Lulus Administrasi" },
    { value: "Tes Substansi", label: "Tes Substansi" },
    { value: "Tidak Lulus Tes Substansi", label: "Tidak Lulus Tes Substansi" },
    { value: "Lulus Tes Substansi", label: "Lulus Tes Substansi" },
    { value: "Ditolak", label: "Ditolak" },
    { value: "Diterima", label: "Diterima" },
    { value: "Pelatihan", label: "Pelatihan" },
    { value: "Lulus Pelatihan", label: "Lulus Pelatihan" },
    { value: "Tidak Lulus Pelatihan", label: "Tidak Lulus Pelatihan" },
  ];

  const onChangeStatus = (e) => {
    setStatus({ value: e.value, label: e.label });
  };

  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      dispatch(postTemplate(props.token, subject, body, status.value.toLowerCase()));
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

  useEffect(() => {
    axios
      .get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-trainings/list-template-email/${status}`,
        {
          headers: {
            authorization: `Bearer ${props.token}`,
          },
        }
      )
      .then((items) => {
        setSubject(items.data.data.training_rules.subject);
        setBody(items.data.data.training_rules.body);
      });
  }, [props.token, status]);

  return (
    <div className="row">
      <div className="col-xl-11 styling-content-pelatihan mt-5">
        <form onSubmit={handleSubmit}>
          <div className="">
            <div className="notification-title border-resnponsive mr-4">
              <h1>Email</h1>
            </div>
            <div className="form-group">
              <label>Status</label>
              <div className="mr-4" style={{ zIndex: '99', position: 'relative' }}>
                <Select
                  placeholder="Pilih Status"
                  options={optionsStatus}
                  value={status}
                  onChange={onChangeStatus}
                  onBlur={(e) => {
                    simpleValidator.current.showMessageFor("status");
                  }}
                />
              </div>
              {simpleValidator.current.message(
                "status",
                status,
                "required",
                { className: "text-danger" }
              )}
            </div>
            <div className="form-group mr-4">
              <label>Subject</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Subject Email"
                value={subject}
                onChange={onChangeSubject}
                onBlur={(e) => {
                  setSubject(e.target.value);
                  simpleValidator.current.showMessageFor("subject");
                }}
              />
              {simpleValidator.current.message(
                "subject",
                subject,
                "required",
                { className: "text-danger" }
              )}
            </div>
            <div className="form-group mr-4">
              <CKEditor
                editor={ClassicEditor}
                data={body}
                onChange={(event, editor) => {
                  let data = editor.getData();
                  setBody(data);
                }}
                onBlur={(e) => {
                  simpleValidator.current.showMessageFor("data");
                }}
              />
              {simpleValidator.current.message(
                "data",
                body,
                "required",
                { className: "text-danger" }
              )}
            </div>
          </div>
          <div className="d-flex justify-content-end mb-5 mr-4">
            <button
              type="reset"
              className={`${styles.btnKembali} btn btn-white-ghost-rounded-full rounded-pill mr-2`}
              onClick={(e) => {
                setStatus("")
                setSubject("")
                setBody("")
              }}
            >
              Reset
            </button>
            <button
              type="submit"
              className={`${styles.btnSimpan} btn btn-primary-rounded-full rounded-pill`}
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
