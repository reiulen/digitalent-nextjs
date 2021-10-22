import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import axios from 'axios'

import { postFileSize } from '../../../../../redux/actions/site-management/settings/pelatihan.actions'

export default function FileSize(props) {

  const [image, setImage] = useState("")
  const [document, setDocument] = useState("")

  let dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault();
    
    dispatch(postFileSize(props.token, image, document))
  }

  useEffect(() => {
    axios.get(`${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-trainings/list-file-size`, {
      headers: {
        authorization: `Bearer ${props.token}`,
      },
    }).then()
  }, [props.token])

  return (
    <div className="col styling-content-pelatihan">
      <form onSubmit={handleSubmit}>
        <div className="notification-title">
          <h1>File Size</h1>
        </div>
        <div className="form-group">
          <h3 className="judul">Image</h3>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Size Image"
              onChange={e => {
                setImage(e.target.value)
              }}
              required
            />
            <span className="input-group-text" id="basic-addon2">
              MB
            </span>
          </div>
        </div>
        <div classNameName="form-group">
          <h3 classNameName="judul">Document</h3>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Size Document"
              onChange={e => {
                setDocument(e.target.value)
              }}
              required
            />
            <span className="input-group-text" id="basic-addon2">
              MB
            </span>
          </div>
        </div>
        <div className="d-flex justify-content-end mb-4">
          <button type="reset" className="btn btn-reset">
            Reset
          </button>
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
