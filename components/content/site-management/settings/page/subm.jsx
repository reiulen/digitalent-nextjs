import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import PageWrapper from "../../../../wrapper/page.wrapper";
import Upload from "../../../../../public/assets/icon/sitemanagement/Upload.svg";
import Unduh from "../../../../../public/assets/icon/sitemanagement/Unduh.svg";

export default function SUBM() {
  const initialState = {
    page: "Prompt",
    isEmail: false,
    isStatus: false,
    notification: false,
    isPromptEmail: "",
  };

  const [{ page, isEmail, isStatus, notification, isPromptEmail }, setState] =
    useState(initialState);

  const [via, setVia] = useState("template");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(via);
  };

  const onChangeVia = (e) => {
    setVia(e.target.value);
  };

  return (
    <div className="col-xl-8 styling-content-pelatihan">
      <form onSubmit={handleSubmit}>
        <div className="notification-title">
          <h1>Status Update & Broadcast Email</h1>
        </div>
        <div className="form-group my-4">
          <h3 className="judul">Judul</h3>
          <input
            type="text"
            name="judul"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Example input"
          />
        </div>
        <h3 className="judul my-2">Data List Peserta</h3>
        <div className="form-check d-flex pl-0 mb-4">
          <div className="d-flex custom-control custom-radio styling-radio mr-4">
            <input
              className="form-check-input"
              type="radio"
              name="via"
              id="template"
              value="template"
              onChange={(e) => {
                setVia(e.target.value);
              }}
            />
            <h3 className="judul">Via Template</h3>
          </div>
          <div className="d-flex custom-control custom-radio styling-radio ml-4">
            <input
              className="form-check-input"
              type="radio"
              name="via"
              id="filter"
              value="filter"
              onChange={(e) => {
                setVia(e.target.value);
              }}
            />
            <h3 className="judul">Via Filter</h3>
          </div>
        </div>

        {via === "template" && (
          <div className="mt-4">
            <div className="row">
              <div className="col">
                <div className="title-unduh">
                  <h3 className="judul">Unduh Template Data Peserta</h3>
                </div>
                <div className="d-flex justify-content-start">
                  <button className="btn btn-rounded-full bg-blue-primary text-white btn-unduh">
                    <div className="mr-4">
                      <Image src={Unduh} width={24} height={24} alt="Unduh" />
                    </div>
                    Unduh
                  </button>
                </div>
              </div>
              <div className="col">
                <div className="title-unduh">
                  <h3>Upload Data Peserta</h3>
                </div>
                <div className="d-flex justify-content-start">
                  <button className="btn btn-rounded-full bg-blue-primary text-white btn-upload">
                    <div className="mr-4">
                      <Image src={Upload} width={24} height={24} alt="Upload" />
                    </div>
                    Upload
                  </button>
                </div>
              </div>
            </div>
            <p className="border-bottom mt-4 pb-3">
              *Isi Template Data Peserta Dengan Nomor Registrasi
            </p>
            <div className="update-status">
              <h3 className="judul mb-4">Update Status Seleksi Peserta</h3>
              <span className="d-flex switch switch-primary status-peserta">
                <label>
                  <input
                    type="checkbox"
                    name="select"
                    id="email-check"
                    onClick={() => {
                      if (isStatus) {
                        setState({ page, isEmail, isStatus: false });
                      } else {
                        setState({ page, isEmail, isStatus: true });
                      }
                    }}
                  />
                  <span></span>
                </label>
                <h3 className="mt-2 judul">
                  {isStatus ? "Aktif" : "Tidak Aktif"}
                </h3>
              </span>
            </div>
            <div className="status-peserta">
              <div className="form-group">
                <h3 className="mb-4 judul">Status</h3>
                <select className="form-control">
                  <option value="Menunggu">Menunggu</option>
                  <option value="Tidak Lulus Administrasi">
                    Tidak Lulus Administrasi
                  </option>
                  <option value="Tidak Substansi">Tidak Substansi</option>
                  <option value="Tidak Lulus Tes Substansi">
                    Tidak Lulus Tes Substansi
                  </option>
                  <option value="Lulus Tes Substansi">
                    Lulus Tes Substansi
                  </option>
                  <option value="Ditolak">Ditolak</option>
                  <option value="Diterima">Diterima</option>
                  <option value="Pelatihan">Pelatihan</option>
                  <option value="Lulus Pelatihan">Lulus Pelatihan</option>
                  <option value="Tidak Lulus Pelatihan">
                    Tidak Lulus Pelatihan
                  </option>
                </select>
              </div>
            </div>
            <div className="update-status">
              <h3 className="mb-4 judul">
                Broadcast Email & Send Notification
              </h3>
              <span className="d-flex switch switch-primary status-peserta">
                <label>
                  <input
                    type="checkbox"
                    name="select"
                    id="email-check"
                    onClick={() => {
                      if (isEmail) {
                        setState({ page, isEmail: false, isStatus });
                      } else {
                        setState({ page, isEmail: true, isStatus });
                      }
                    }}
                  />
                  <span></span>
                </label>
                <h3 className="mt-2 judul">
                  {isEmail ? "Aktif" : "Tidak Aktif"}
                </h3>
              </span>
            </div>
            <div className="form-group">
              <h3 className="judul">Subjek Email</h3>
              <input
                type="text"
                name="subjekEmail"
                className="form-control"
                id="subjekEmail"
                placeholder="Subjek Email"
              />
            </div>
            <div className="form-group">
              <h3 className="judul">Konten Email</h3>
              <CKEditor
                editor={ClassicEditor}
                data=""
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                }}
              />
            </div>
          </div>
        )}

        {via === "filter" && (
          <div className="mt-4">
            <div className="row border-bottom">
              <div className="form-group col-xl-6">
                <h3 className="judul">Tahun</h3>
                <select className="form-control">
                  <option disabled>
                    Tahun
                  </option>
                </select>
              </div>
              <div className="form-group col-xl-6">
                <h3 className="judul">Akademi</h3>
                <select className="form-control">
                  <option disabled value="">
                    Tahun
                  </option>
                </select>
              </div>
              <div className="form-group col-xl-6">
                <h3 className="judul">Tema</h3>
                <select className="form-control">
                  <option disabled value="">
                    Tahun
                  </option>
                </select>
              </div>
              <div className="form-group col-xl-6">
                <h3 className="judul">Penyelenggara</h3>
                <select className="form-control">
                  <option disabled value="">
                    Tahun
                  </option>
                </select>
              </div>
              <div className="form-group col-xl-6">
                <h3 className="judul">Pelatihan</h3>
                <select className="form-control">
                  <option disabled value="">
                    Tahun
                  </option>
                </select>
              </div>
              <div className="form-group col-xl-6">
                <h3 className="judul">Status Profil</h3>
                <select className="form-control">
                  <option disabled value="">
                    Tahun
                  </option>
                </select>
              </div>
              <div className="form-group col-xl-6">
                <h3 className="judul">Status Seleksi</h3>
                <select className="form-control">
                  <option disabled value="">
                    Tahun
                  </option>
                </select>
              </div>
            </div>
            <div className="update-status mt-4">
              <h3 className="judul mb-4">Update Status Seleksi Peserta</h3>
              <span className="d-flex switch switch-primary status-peserta">
                <label>
                  <input
                    type="checkbox"
                    name="select"
                    id="email-check"
                    onClick={() => {
                      if (isStatus) {
                        setState({ page, isEmail, isStatus: false });
                      } else {
                        setState({ page, isEmail, isStatus: true });
                      }
                    }}
                  />
                  <span></span>
                </label>
                <h3 className="mt-2 judul">
                  {isStatus ? "Aktif" : "Tidak Aktif"}
                </h3>
              </span>
            </div>
            <div className="status-peserta">
              <div className="form-group">
                <h3 className="mb-4 judul">Status</h3>
                <select className="form-control">
                  <option value="Menunggu">Menunggu</option>
                  <option value="Tidak Lulus Administrasi">
                    Tidak Lulus Administrasi
                  </option>
                  <option value="Tidak Substansi">Tidak Substansi</option>
                  <option value="Tidak Lulus Tes Substansi">
                    Tidak Lulus Tes Substansi
                  </option>
                  <option value="Lulus Tes Substansi">
                    Lulus Tes Substansi
                  </option>
                  <option value="Ditolak">Ditolak</option>
                  <option value="Diterima">Diterima</option>
                  <option value="Pelatihan">Pelatihan</option>
                  <option value="Lulus Pelatihan">Lulus Pelatihan</option>
                  <option value="Tidak Lulus Pelatihan">
                    Tidak Lulus Pelatihan
                  </option>
                </select>
              </div>
            </div>
            <div className="update-status">
              <h3 className="mb-4 judul">
                Broadcast Email & Send Notification
              </h3>
              <span className="d-flex switch switch-primary status-peserta">
                <label>
                  <input
                    type="checkbox"
                    name="select"
                    id="email-check"
                    onClick={() => {
                      if (isEmail) {
                        setState({ page, isEmail: false, isStatus });
                      } else {
                        setState({ page, isEmail: true, isStatus });
                      }
                    }}
                  />
                  <span></span>
                </label>
                <h3 className="mt-2 judul">
                  {isEmail ? "Aktif" : "Tidak Aktif"}
                </h3>
              </span>
            </div>
            <div className="form-group">
              <h3 className="judul">Subjek Email</h3>
              <input
                type="text"
                name="subjekEmail"
                className="form-control"
                id="subjekEmail"
                placeholder="Subjek Email"
              />
            </div>
            <div className="form-group">
              <h3 className="judul">Konten Email</h3>
              <CKEditor
                editor={ClassicEditor}
                data=""
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                }}
              />
            </div>
          </div>
        )}

        {via === "" && (
          <div className="mt-4">
            <h1>Via Template / Filter</h1>
          </div>
        )}

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
