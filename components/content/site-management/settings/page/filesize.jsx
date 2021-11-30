import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";

import styles from "../../../../../styles/previewGaleri.module.css";

import { postFileSize } from '../../../../../redux/actions/site-management/settings/pelatihan.actions'

export default function FileSize(props) {

  const [image, setImage] = useState("")
  const [document, setDocument] = useState("")

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  let dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      if (image < 0 || document < 0) {
        Swal.fire("Oops...", "Isi data dengan benar !", "error");
      } else if (image > 20 || document > 20) {
        Swal.fire("Oops !", "Size Melebihi Ketentuan", "error");
      } else {
        dispatch(postFileSize(props.token, image, document))
      }
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi data dengan benar !",
      });
    }
  }

  useEffect(() => {
    axios.get(`${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-trainings/list-file-size`, {
      headers: {
        authorization: `Bearer ${props.token}`,
      },
    }).then(response => {
      setImage(response.data.data.training_rules.image[0].size)
      setDocument(response.data.data.training_rules.document[0].size)
    })
  }, [props.token])

  return (
    <div className="row">
      <div className="col-xl-11 styling-content-pelatihan mt-5">
        <form onSubmit={handleSubmit}>
          <div className="notification-title border-resnponsive mr-4">
            <h1>File Size</h1>
          </div>
          <div className="form-group mr-4">
            <h3 className="judul">Image</h3>
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Size Image"
                value={image}
                min="0"
                onChange={e => {
                  setImage(e.target.value.replace(/[^0-9]/g, ""))
                }}
                onBlur={(e) => {
                  setImage(e.target.value);
                  simpleValidator.current.showMessageFor("size image")
                }}
              />
              <span className="input-group-text" id="basic-addon2">
                MB
              </span>
            </div>
            {simpleValidator.current.message(
              "size image",
              image,
              "required",
              { className: "text-danger" }
            )}
          </div>
          <div classNameName="form-group mr-4">
            <h3 classNameName="judul">Document</h3>
            <div className="input-group mb-3 mr-4">
              <input
                type="number"
                value={document}
                className="form-control"
                placeholder="Size Document"
                min="0"
                onChange={e => {
                  setDocument(e.target.value)
                }}
                onBlur={(e) => {
                  setDocument(e.target.value);
                  simpleValidator.current.showMessageFor("size document")
                }}
              />
              <span className="input-group-text mr-4" id="basic-addon2">
                MB
              </span>
            </div>
            {simpleValidator.current.message(
              "size document",
              document,
              "required",
              { className: "text-danger" }
            )}
          </div>
          <div className="d-flex justify-content-end my-5 mr-4">
            <button type="reset" className={`${styles.btnKembali} btn btn-white-ghost-rounded-full rounded-pill mr-2`} onClick={() => {
              setImage("");
              setDocument("")
            }}>
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
