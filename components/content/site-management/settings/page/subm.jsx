import React, { useState, useEffect } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch } from "react-redux";
import Select from "react-select";
import styles from "../../../../../styles/previewGaleri.module.css"

import {
  postViaFilter,
  postViaTemplate,
} from "../../../../../redux/actions/site-management/settings/pelatihan.actions";

export default function SUBM(props) {
  let dispatch = useDispatch();

  const [via, setVia] = useState("template");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [academy, setAcademy] = useState("");
  const [theme, setTheme] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [training, setTraining] = useState("");
  const [profileStatus, setProfileStatus] = useState("");
  const [selectionStatus, setSelectionStatus] = useState("");
  const [
    participantSelectionStatusUpdate,
    setParticipantSelectionStatusUpdate,
  ] = useState(0);
  const [status, setStatus] = useState("");
  const [broadcastEmailSendNotification, setBroadcastEmailSendNotification] =
    useState(0);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [file, setFile] = useState("");
  const [link, setLink] = useState("");

  const [listYear, setListYear] = useState([])
  const [listAcademy, setListAcademy] = useState([])
  const [listTheme, setListTheme] = useState([])
  const [listOrganizer, setListOrganizer] = useState([])
  const [listTraining, setListTraining] = useState([])
  const [listProfileStatus, setListProfileStatus] = useState([])
  const [listSelectionStatus, setListSelectionStatus] = useState([])
  const [disableOption, setDisableOption] = useState(true)
  const [disableAkademi, setDisableAkademi] = useState(true)
  const [disableTema, setDisableTema] = useState(true)
  const [disablePenyelenggara, setDisablePenyelenggara] = useState(true)
  const [disablePelatihan, setDisablePelatihan] = useState(true)
  const [disableStatusProfile, setDisableStatusProfile] = useState(true)
  const [disableStatusSelection, setDisableStatusSelection] = useState(true)
  const [namaakademi, setnamakademi] = useState(null)
  const [namatema, setnamatema] = useState(null)
  const [namapenyelenggara, setnamapenyelenggara] = useState(null)
  const [namapelatihan, setnamapelatihan] = useState(null)
  const [namastatusseleksi, setnamastatusseleksi] = useState(null)


  const optionsStatus = [
    { value: "menunggu", label: "Menunggu" },
    { value: "tidak lulus administrasi", label: "Tidak Lulus Administrasi" },
    { value: "tes substansi", label: "Tes Substansi" },
    { value: "tidak lulus tes substansi", label: "Tidak Lulus Tes Substansi" },
    { value: "lulus tes substansi", label: "Lulus Tes Substansi" },
    { value: "ditolak", label: "Ditolak" },
    { value: "diterima", label: "Diterima" },
    { value: "pelatihan", label: "Pelatihan" },
    { value: "lulus pelatihan", label: "Lulus Pelatihan" },
    { value: "tidak lulus pelatihan", label: "Tidak Lulus Pelatihan" },
  ];

  const handleSubmit = async (e) => {

    if (via === "filter") {
      dispatch(
        postViaFilter(
          props.token,
          title,
          year,
          namaakademi ? namaakademi : "",
          namatema ? namatema : "",
          namapenyelenggara ? namapenyelenggara : "",
          namapelatihan ? namapelatihan : "",
          profileStatus ? profileStatus : "",
          selectionStatus ? selectionStatus : "",
          participantSelectionStatusUpdate ||
            participantSelectionStatusUpdate === 1
            ? true
            : false,
          status.value ? status.value : "",
          broadcastEmailSendNotification || broadcastEmailSendNotification === 1
            ? true
            : false,
          emailSubject,
          emailContent,
          `via ${via}`
        )
      );
    } else {
      dispatch(postViaTemplate(props.token, title, file, participantSelectionStatusUpdate ||
        participantSelectionStatusUpdate === 1
        ? true
        : false,
        status.value,
        broadcastEmailSendNotification || broadcastEmailSendNotification === 1
          ? true
          : false,
        emailSubject,
        emailContent, `via ${via}`));
    }
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-trainings/download-template-subm`,
        {
          headers: {
            authorization: `Bearer ${props.token}`,
          },
        }
      )
      .then((data) => {
        setLink(data.data.data);
      });

    axios
      .get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/option/year`,
        {
          headers: {
            authorization: `Bearer ${props.token}`,
          },
        }
      )
      .then((data) => {
        setListYear(data.data.data)
      });

    axios
      .get(
        process.env.END_POINT_API_PELATIHAN +
        `api/v1/tema/dropdown-tema-by-akademi?akademi_id=${academy}`,
        {
          headers: {
            authorization: `Bearer ${props.token}`,
          },
        }
      )
      .then((data) => {
        setListTheme(data.data.data)
      });

    axios
      .get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/option/academy`,
        {
          headers: {
            authorization: `Bearer ${props.token}`,
          },
        }
      )
      .then((data) => {
        setListAcademy(data.data.data)
      });

    axios
      .get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/option/organizer`,
        {
          headers: {
            authorization: `Bearer ${props.token}`,
          },
        }
      )
      .then((data) => {
        setListOrganizer(data.data.data)
      });

    axios
      .get(
        process.env.END_POINT_API_PELATIHAN +
        `api/v1/pelatihan/dropdown-pelatihan-tema?id=${theme}`,
        {
          headers: {
            authorization: `Bearer ${props.token}`,
          },
        }
      )
      .then((data) => {
        setListTraining(data.data.data)
      });

    axios
      .get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/option/status-profile`,
        {
          headers: {
            authorization: `Bearer ${props.token}`,
          },
        }
      )
      .then((data) => {
        setListProfileStatus(data.data.data)
      });

  }, [props.token, academy, theme]);

  const listYears = listYear.map((item, index) => {
    return (
      <option value={item.value} key={index} >{item.value}</option>
    )
  })

  const optAcademy = listAcademy.map((item, index) => {
    return (
      <option value={item.value} key={index} akademi={item.label} >{item.label}</option>
    )
  })

  const optTheme = listTheme.map((item, index) => {
    return (
      <option value={item.value} key={index} >{item.label}</option>
    )
  })

  const optOrganizer = listOrganizer.map((item, index) => {
    return (
      <option value={item.label} key={index} >{item.label}</option>
    )
  })

  const optTraining = listTraining.map((item, index) => {
    return (
      <option value={item.value} key={index} >{item.label}</option>
    )
  })

  const optStatusProfile = listProfileStatus.map((item, index) => {
    return (
      <option value={item.value} key={index} >{item.value}</option>
    )
  })

  return (
    <div className="row">
      <div className="col-xl-11 styling-content-pelatihan mt-5">
        <form>
          <div>
            <div className="notification-title border-resnponsive mr-4">
              <h1>Status Update & Broadcast Email</h1>
            </div>
            {/* <div className="form-group my-4 mr-4">
              <h3 className="judul">Judul</h3>
              <input
                type="text"
                name="judul"
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Masukkan Judul"
                required
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div> */}
          </div>
          <div className="mt-10">
            <h3 className="judul my-2">Data List Peserta</h3>
            <div className="row ml-0 mb-4">
              <div className="col-md-3 col-lg-5 col-xl-4 custom-control custom-radio styling-radio">
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
              <div className="col-md-4 col-lg-5 col-xl-3 custom-control custom-radio styling-radio">
                <input
                  className="form-check-input styling-radio"
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
          </div>

          {via === "template" && (
            <div className="mt-4">
              <div className="row">
                <div className="col-md-6 col-lg-6 mt-5">
                  <div className="title-unduh mb-5">
                    <h3 className="judul">Unduh Template Data Peserta</h3>
                  </div>
                  <div className="justify-content-start">
                    <div
                      className="mr-4 styling-unduh d-flex"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location = link;
                      }}
                    >
                      <div className="position-relative mb-4">
                        <i
                          className="fas fa-download"
                          style={{
                            position: "absolute",
                            top: "50%",
                            transform: "translateY(-50%)",
                            left: "20px",
                            color: "#fff",
                            fontWeight: "bold",
                          }}
                        ></i>
                        <span>Unduh</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 mt-5">
                  <div className="title-unduh">
                    <h3 className="judul">Upload Data Peserta</h3>
                  </div>
                  <div className="justify-content-start">
                    <div className="mr-4 styling-upload d-flex">
                      <div className="position-relative" >
                        <i
                          className="fas fa-upload"
                          style={{
                            position: "absolute",
                            top: "50%",
                            transform: "translateY(-50%)",
                            left: "20px",
                            color: "#fff",
                            fontWeight: "bold",
                          }}
                        ></i>
                        <input
                          type="file"
                          required
                          onChange={(e) => {
                            setFile(e.target.files[0]);
                          }}
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="border-bottom mt-4 pb-3 text-muted">
                *Isi Template Data Peserta Dengan Nomor Registrasi
              </p>
            </div>
          )}

          {via === "filter" && (
            <div className="mt-4">
              <div className="row border-bottom mr-2">
                <div className="form-group col-xl-6">
                  <h3 className="judul">Tahun</h3>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setYear(e.target.value);
                      setDisableOption(false)
                    }}
                    required
                  >
                    <option disabled selected>
                      PILIH TAHUN
                    </option>
                    {listYears}
                  </select>
                </div>
                <div className="form-group col-xl-6">
                  <h3 className="judul">Akademi</h3>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setnamakademi(e.target.selectedOptions[0].innerText)
                      setAcademy(e.target.value);
                      setDisableAkademi(false)
                    }}
                    required
                    disabled={disableOption === true || disableOption === ""}
                  >
                    <option disabled selected>
                      PILIH AKADEMI
                    </option>
                    {optAcademy}
                  </select>
                  {
                    disableOption === true || disableOption === "" ?
                      <small className="text-muted">
                        Mohon isi tahun terlebih dahulu
                      </small>
                      : null
                  }
                </div>
                <div className="form-group col-xl-6">
                  <h3 className="judul">Tema</h3>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setnamatema(e.target.selectedOptions[0].innerText)
                      setTheme(e.target.value);
                      setDisableTema(false)
                    }}
                    required
                    disabled={disableAkademi === true || disableAkademi === ""}
                  >
                    <option disabled selected>
                      PILIH TEMA
                    </option>
                    {optTheme}
                  </select>
                  {
                    disableAkademi === true || disableAkademi === "" ?
                      <small className="text-muted">
                        Mohon isi akademi terlebih dahulu
                      </small>
                      : null
                  }
                </div>
                <div className="form-group col-xl-6">
                  <h3 className="judul">Penyelenggara</h3>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setnamapenyelenggara(e.target.selectedOptions[0].innerText)
                      setOrganizer(e.target.value);
                      setDisablePenyelenggara(false)
                    }}
                    required
                    disabled={disableTema === true || disableTema === ""}
                  >
                    <option disabled selected>
                      PILIH PENYELENGGARA
                    </option>
                    {optOrganizer}
                  </select>
                  {
                    disableTema === true || disableTema === "" ?
                      <small className="text-muted">
                        Mohon isi tema terlebih dahulu
                      </small>
                      : null
                  }
                </div>
                <div className="form-group col-xl-12">
                  <h3 className="judul">Pelatihan</h3>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setnamapelatihan(e.target.selectedOptions[0].innerText)
                      setTraining(e.target.value);
                      setDisablePelatihan(false)
                    }}
                    required
                    disabled={disablePenyelenggara === true || disablePenyelenggara === ""}
                  >
                    <option disabled selected>
                      PILIH PELATIHAN
                    </option>
                    {optTraining}
                  </select>
                  {
                    disablePenyelenggara === true || disablePenyelenggara === "" ?
                      <small className="text-muted">
                        Mohon isi penyelenggara terlebih dahulu
                      </small>
                      : null
                  }
                </div>
                <div className="form-group col-xl-6">
                  <h3 className="judul">Status Profil</h3>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setProfileStatus(e.target.value);
                      setDisableStatusProfile(false)
                    }}
                    required
                    disabled={disablePelatihan === true || disablePelatihan === ""}
                  >
                    <option disabled selected>
                      PILIH STATUS PROFIL
                    </option>
                    {optStatusProfile}
                  </select>
                  {
                    disablePelatihan === true || disablePelatihan === "" ?
                      <small className="text-muted">
                        Mohon isi pelatihan terlebih dahulu
                      </small>
                      : null
                  }
                </div>
                <div className="form-group col-xl-6">
                  <h3 className="judul">Status Seleksi</h3>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setSelectionStatus(e.target.value);
                      setDisableStatusSelection(false)
                    }}
                    required
                    disabled={disableStatusProfile === true || disableStatusProfile === ""}
                  >
                    <option disabled selected>
                      PILIH STATUS SELEKSI
                    </option>
                    <option value="Lulus">Lulus</option>
                  </select>
                  {
                    disableStatusProfile === true || disableStatusProfile === "" ?
                      <small className="text-muted">
                        Mohon isi status profile terlebih dahulu
                      </small>
                      : null
                  }
                </div>
              </div>
            </div>
          )}

          {via === "" && (
            <div className="mt-4">
              <h1>Via Template / Filter</h1>
            </div>
          )}
          <div className="update-status mt-4">
            <h3 className="judul mb-4">Update Status Seleksi Peserta</h3>
            <span className="d-flex switch switch-primary status-peserta">
              <label className="checkbox-button">
                <input
                  
                  type="checkbox"
                  name="select"
                  checked={participantSelectionStatusUpdate}
                  onChange={(e) => {
                    setParticipantSelectionStatusUpdate(e.target.checked);
                  }}
                />
                <span></span>
              </label>
              <h3 className="mt-2 judul">
                {participantSelectionStatusUpdate ? "Aktif" : "Tidak Aktif"}
              </h3>
            </span>
          </div>
          <div className="status-peserta">
            <div className="form-group">
              <h3 className="mb-4 judul">Status</h3>
              <div className="mr-4" style={{ zIndex: '2', position: 'relative' }}>
                <Select
                  placeholder="PILIH PELATIHAN"
                  options={optionsStatus}
                  defaultValue={status}
                  onChange={(e) => {
                    setStatus({ value: e.value, label: e.label });
                  }}
                />
              </div>
              {/* <select
                className={`${styles.selectKategori} form-control`}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                required
              >
                <option selected>
                  {" "}
                  PILIH PELATIHAN
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
                <option value="Tidak Lulus Pelatihan">
                  Tidak Lulus Pelatihan
                </option>
              </select> */}
            </div>
          </div>
          <div className="update-status mr-4">
            <h3 className="mb-4 judul">Broadcast Email & Send Notification</h3>
            <span className="d-flex switch switch-primary status-peserta">
              <label>
                <input
                  type="checkbox"
                  name="select"
                  checked={broadcastEmailSendNotification}
                  onChange={(e) => {
                    setBroadcastEmailSendNotification(e.target.checked);
                  }}
                  required
                />
                <span></span>
              </label>
              <h3 className="mt-2 judul">
                {broadcastEmailSendNotification ? "Aktif" : "Tidak Aktif"}
              </h3>
            </span>
          </div>
          <div className="form-group mr-4">
            <h3 className="judul">Subjek Email</h3>
            <input
              type="text"
              name="subjekEmail"
              className="form-control"
              id="subjekEmail"
              placeholder="Subjek Email"
              onChange={(e) => {
                setEmailSubject(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-group mr-4">
            <h3 className="judul">Konten Email</h3>
            <div style={{ zIndex: '1' }}>
              <CKEditor
                editor={ClassicEditor}
                data={emailContent}
                onChange={(event, editor) => {
                  let data = editor.getData();
                  setEmailContent(data);
                }}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end mb-4 mr-4">
            <button type="reset" className={`${styles.btnKembali} btn btn-white-ghost-rounded-full rounded-pill mr-2`} onClick={() => {
              setVia("template");
              setTitle("");
              setYear("");
              setAcademy("");
              setTheme("");
              setOrganizer("");
              setTraining("");
              setProfileStatus("");
              setSelectionStatus("");
              setParticipantSelectionStatusUpdate(0);
              setStatus("");
              setBroadcastEmailSendNotification(0);
              setEmailSubject("");
              setEmailContent("");
              setFile("");
              setLink("");
            }}>
              Reset
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e)}
              className={`${styles.btnSimpan} btn btn-primary-rounded-full rounded-pill`}
            >
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
