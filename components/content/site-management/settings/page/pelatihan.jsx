import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import PageWrapper from "../../../../wrapper/page.wrapper";
import Upload from "../../../../../public/assets/icon/sitemanagement/Upload.svg";
import Unduh from "../../../../../public/assets/icon/sitemanagement/Unduh.svg";
import Prompt from "./prompt";

import { loadDataPrompt } from "../../../../../redux/actions/site-management/settings/pelatihan.actions";

export default function Pelatihan({ token }) {
  const { allPrompt } = useSelector(
    (state) => ({
      allPrompt: state.allPrompt,
    }),
    shallowEqual
  );

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadDataPrompt(token));
  }, [token, dispatch]);

  const initialState = {
    page: "Prompt",
    isEmail: false,
    isStatus: false,
    notification: false,
    isPromptEmail: "",
  };

  const [{ page, isEmail, isStatus, notification, isPromptEmail }, setState] =
    useState(initialState);

  return (
    <PageWrapper>
      <div className="order-1 px-0">
        <div className="card">
          <div className="card-body py-0">
            <div className="row">
              <div className="border-right">
                <div
                  className="col-xl-12 align-items-center"
                  style={{ marginTop: "32px"}}
                >
                  <Link href="/site-management/setting/pelatihan" passHref>
                    <a>
                      <div
                        className={`d-flex align-items-center ${
                          page === "Prompt" ? "active" : "prompt"
                        }`}
                        onClick={() => {
                          setState({ page: "Prompt" });
                        }}
                      >
                        <Image
                          src={"/assets/icon/sitemanagement/Prompt.svg"}
                          width={24}
                          height={24}
                          alt="Prompt Icon"
                        />
                        <h3>Prompt Update</h3>
                      </div>
                    </a>
                  </Link>
                  <Link href="/site-management/setting/pelatihan" passHref>
                    <a>
                      <div
                        className={`d-flex align-items-center ${
                          page === "Template" ? "active" : "prompt"
                        }`}
                        onClick={() => {
                          setState({ page: "Template" });
                        }}
                      >
                        <Image
                          src={"/assets/icon/sitemanagement/Email.svg"}
                          width={24}
                          height={24}
                          alt="Prompt Icon"
                        />
                        <h3>Template Email</h3>
                      </div>
                    </a>
                  </Link>
                  <Link href="/site-management/setting/pelatihan" passHref>
                    <a>
                      <div
                        className={`d-flex align-items-center ${
                          page === "SUBM" ? "active" : "prompt"
                        }`}
                        onClick={() => {
                          setState({ page: "SUBM" });
                        }}
                      >
                        <Image
                          src={"/assets/icon/sitemanagement/SUBM.svg"}
                          width={24}
                          height={24}
                          alt="Prompt Icon"
                        />
                        <h3>SUBM</h3>
                      </div>
                    </a>
                  </Link>
                  <Link href="/site-management/setting/pelatihan" passHref>
                    <a>
                      <div
                        className={`d-flex align-items-center ${
                          page === "File Size" ? "active" : "prompt"
                        }`}
                        onClick={() => {
                          setState({ page: "File Size" });
                        }}
                      >
                        <Image
                          src={"/assets/icon/sitemanagement/FileSize.svg"}
                          width={24}
                          height={24}
                          alt="Prompt Icon"
                        />
                        <h3>File Size</h3>
                      </div>
                    </a>
                  </Link>
                  <Link href="/site-management/setting/pelatihan" passHref>
                    <a>
                      <div
                        className={`d-flex align-items-center ${
                          page === "Ketentuan Pelatihan" ? "active" : "prompt"
                        }`}
                        onClick={() => {
                          setState({ page: "Ketentuan Pelatihan" });
                        }}
                      >
                        <Image
                          src={"/assets/icon/sitemanagement/Ketentuan.svg"}
                          width={24}
                          height={24}
                          alt="Prompt Icon"
                        />
                        <h3>Ketentuan Pelatihan</h3>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>

              {page === "Prompt" && <Prompt token={token} />}

              {page === "Template" && (
                <div className="col-lg-4 styling-content-pelatihan">
                  <form action="">
                    <div className="notification-title">
                      <h1>Template Email</h1>
                    </div>
                    <div className="form-group">
                      <label>Status</label>
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
                    <div className="form-group">
                      <label>Subject</label>
                      <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder="Example input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Subject</label>
                      <CKEditor
                        editor={ClassicEditor}
                        data=""
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                          console.log("Editor is ready to use!", editor);
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          console.log({ event, editor, data });
                        }}
                      />
                    </div>
                    <div className="d-flex justify-content-end">
                      <button className="btn btn-rounded-full bg-blue-primary text-white">
                        Simpan
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {page === "SUBM" && (
                <div className="col styling-content-pelatihan">
                  <form action="">
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
                          checked
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
                        />
                        <h3 className="judul">Via Filter</h3>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col">
                        <div className="title-unduh">
                          <h3 className="judul">Unduh Template Data Peserta</h3>
                        </div>
                        <div className="d-flex justify-content-start">
                          <button className="btn btn-rounded-full bg-blue-primary text-white btn-unduh">
                            <div className="mr-4">
                              <Image
                                src={Unduh}
                                width={24}
                                height={24}
                                alt="Unduh"
                              />
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
                              <Image
                                src={Upload}
                                width={24}
                                height={24}
                                alt="Upload"
                              />
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
                      <h3 className="judul mb-4">
                        Update Status Seleksi Peserta
                      </h3>
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
                          <option value="Tidak Substansi">
                            Tidak Substansi
                          </option>
                          <option value="Tidak Lulus Tes Substansi">
                            Tidak Lulus Tes Substansi
                          </option>
                          <option value="Lulus Tes Substansi">
                            Lulus Tes Substansi
                          </option>
                          <option value="Ditolak">Ditolak</option>
                          <option value="Diterima">Diterima</option>
                          <option value="Pelatihan">Pelatihan</option>
                          <option value="Lulus Pelatihan">
                            Lulus Pelatihan
                          </option>
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
                          console.log({ event, editor, data });
                        }}
                      />
                    </div>

                    <div className="d-flex justify-content-end mb-4">
                      <button className="btn btn-reset">Reset</button>
                      <button className="btn btn-rounded-full bg-blue-primary text-white">
                        Simpan
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {page === "File Size" && (
                <div className="col styling-content-pelatihan">
                  <form action="">
                    <div className="notification-title">
                      <h1>File Size</h1>
                    </div>
                  </form>
                </div>
              )}

              {page === "Ketentuan Pelatihan" && (
                <div className="col styling-content-pelatihan">
                  <form action="">
                    <div className="notification-title">
                      <h1>Ketentuan Pelatihan</h1>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
