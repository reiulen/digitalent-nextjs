import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch } from "react-redux";
import Select from "react-select";
import styles from "../../../../../styles/previewGaleri.module.css";
import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";

import {
  postViaFilter,
  postViaTemplate,
} from "../../../../../redux/actions/site-management/settings/pelatihan.actions";

export default function SUBM(props) {
  let dispatch = useDispatch();

  const [via, setVia] = useState("template");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState([]);
  const [academy, setAcademy] = useState([]);
  const [theme, setTheme] = useState([]);
  const [organizer, setOrganizer] = useState([]);
  const [training, setTraining] = useState([]);
  const [profileStatus, setProfileStatus] = useState([]);
  const [selectionStatus, setSelectionStatus] = useState([]);
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

  const [listYear, setListYear] = useState([]);
  const [listAcademy, setListAcademy] = useState([]);
  const [listTheme, setListTheme] = useState([]);
  const [listOrganizer, setListOrganizer] = useState([]);
  const [listTraining, setListTraining] = useState([]);
  const [listProfileStatus, setListProfileStatus] = useState([]);
  const [listSelectionStatus, setListSelectionStatus] = useState([]);
  const [disableOption, setDisableOption] = useState(true);
  const [disableAkademi, setDisableAkademi] = useState(true);
  const [disableTema, setDisableTema] = useState(true);
  const [disablePenyelenggara, setDisablePenyelenggara] = useState(true);
  const [disablePelatihan, setDisablePelatihan] = useState(true);
  const [disableStatusProfile, setDisableStatusProfile] = useState(true);
  const [disableStatusSelection, setDisableStatusSelection] = useState(true);
  const [namaakademi, setnamakademi] = useState(null);
  const [namatema, setnamatema] = useState(null);
  const [namapenyelenggara, setnamapenyelenggara] = useState(null);
  const [namapelatihan, setnamapelatihan] = useState(null);
  const [namastatusseleksi, setnamastatusseleksi] = useState(null);
  const [nameFile, setNameFile] = useState(null);
  const [selectedTraining, setSelectedTraining] = useState(null);

  const optionsStatus = [
    { value: "seleksi administrasi", label: "Seleksi Administrasi" },
    { value: "tidak lulus administrasi", label: "Tidak Lulus Administrasi" },
    { value: "tes substansi", label: "Tes Substansi" },
    { value: "tidak lulus tes substansi", label: "Tidak Lulus Tes Substansi" },
    { value: "seleksi akhir", label: "Seleksi Akhir" },
    { value: "ditolak", label: "Ditolak" },
    { value: "diterima", label: "Diterima" },
    { value: "pelatihan", label: "Pelatihan" },
    { value: "administrasi akhir", label: "Administrasi Akhir" },
    { value: "lulus pelatihan", label: "Lulus Pelatihan" },
    { value: "tidak lulus pelatihan", label: "Tidak Lulus Pelatihan" },
  ];

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const handleSubmit = async (e) => {
    if (
      (!participantSelectionStatusUpdate ||
        participantSelectionStatusUpdate === 0) &&
      (!broadcastEmailSendNotification || broadcastEmailSendNotification === 0)
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Pilih antara Update Status Seleksi Peserta atau Broadcast Email & Send Notification",
      });
    } else {
      if (simpleValidator.current.allValid()) {
        if (via === "filter") {
          Swal.fire({
            title: "Apakah anda yakin ingin mengirim ?",
            // text: "Data ini tidak bisa dikembalikan !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Batal",
            confirmButtonText: "Ya !",
            dismissOnDestroy: false,
          }).then((result) => {
            dispatch(
              postViaFilter(
                props.token,
                title,
                year,
                academy,
                theme,
                organizer,
                training,
                profileStatus,
                selectionStatus,
                participantSelectionStatusUpdate ||
                  participantSelectionStatusUpdate === 1
                  ? true
                  : false,
                status.value ? status.value : "",
                broadcastEmailSendNotification ||
                  broadcastEmailSendNotification === 1
                  ? true
                  : false,
                emailSubject,
                emailContent,
                `via ${via}`
              )
            );
          });
        } else {
          Swal.fire({
            title: "Apakah anda yakin ingin mengirim ?",
            // text: "Data ini tidak bisa dikembalikan !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Batal",
            confirmButtonText: "Ya !",
            dismissOnDestroy: false,
          }).then((result) => {
            dispatch(
              postViaTemplate(
                props.token,
                title,
                file,
                participantSelectionStatusUpdate ||
                  participantSelectionStatusUpdate === 1
                  ? true
                  : false,
                status.value,
                broadcastEmailSendNotification ||
                  broadcastEmailSendNotification === 1
                  ? true
                  : false,
                emailSubject,
                emailContent,
                `via ${via}`
              )
            );
          });
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
      .get(`${process.env.END_POINT_API_SITE_MANAGEMENT}api/option/year`, {
        headers: {
          authorization: `Bearer ${props.token}`,
        },
      })
      .then((data) => {
        setListYear(data.data.data);
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
        setListProfileStatus(data.data.data);
      });
  }, [props.token, academy, theme]);

  const changeYear = (e) => {
    let data = e.map((item) => {
      return { ...item, value: item.value };
    });
    const datas = data.map((items) => {
      return items.value;
    });
    axios
      .get(
        process.env.END_POINT_API_PELATIHAN +
          `api/v1/pelatihan/dropdown-site-management`,
        {
          params: {
            type: "akademi",
            cari: datas.join(","),
          },
          headers: {
            authorization: `Bearer ${props.token}`,
          },
        }
      )
      .then((data) => {
        setListAcademy(data.data.data);
      });
    setYear(datas);
  };

  const changeAkademi = (e) => {
    let data = e.map((item) => {
      return { ...item, value: item.value };
    });
    const datas = data.map((items) => {
      return items.value;
    });
    axios
      .get(
        process.env.END_POINT_API_PELATIHAN +
          `api/v1/pelatihan/dropdown-site-management`,
        {
          params: {
            type: "tema",
            cari: datas.join(","),
          },
          headers: {
            authorization: `Bearer ${props.token}`,
          },
        }
      )
      .then((data) => {
        setListTheme(data.data.data);
      });
    setAcademy(datas);
  };

  const changeTema = (e) => {
    let data = e.map((item) => {
      return { ...item, value: item.value };
    });
    const datas = data.map((items) => {
      return items.value;
    });
    axios
      .get(
        process.env.END_POINT_API_PELATIHAN +
          `api/v1/pelatihan/dropdown-site-management`,
        {
          params: {
            type: "penyelenggara",
            cari: datas.join(","),
          },
          headers: {
            authorization: `Bearer ${props.token}`,
          },
        }
      )
      .then((data) => {
        setListOrganizer(data.data.data);
      });
    setTheme(datas);
  };

  const changePenyelenggara = (e) => {
    let data = e.map((item) => {
      return { ...item, value: item.value };
    });
    const datas = data.map((items) => {
      return items.value;
    });

    axios
      .get(
        process.env.END_POINT_API_PELATIHAN +
          `api/v1/pelatihan/dropdown-site-management`,
        {
          params: {
            type: "pelatihan",
            cari: datas.join(","),
          },
          headers: {
            authorization: `Bearer ${props.token}`,
          },
        }
      )
      .then((data) => {
        setListTraining(data.data.data);
      });
    setOrganizer(datas);
  };

  const changeTraining = (e) => {
    let data = e.map((item) => {
      return { ...item, value: item.value };
    });
    const datas = data.map((items) => {
      return items.label;
    });
    setTraining(datas);
    setSelectedTraining(
      data.map((item) => {
        return {
          value: item.value,
          label: item.label,
        };
      })
    );
  };

  const changeStatusAdministrasi = (e) => {
    let data = e.map((item) => {
      return { ...item, value: item.value };
    });
    const datas = data.map((items) => {
      return items.value;
    });
    setProfileStatus(datas);
  };

  const changeStatusPeserta = (e) => {
    let data = e.map((item) => {
      return { ...item, value: item.value };
    });
    const datas = data.map((items) => {
      return items.value;
    });
    setSelectionStatus(datas);
  };

  const listYears = listYear.map((items, index) => {
    return { label: items.value, value: items.value, id: items.id };
    // return (
    //   <option value={item.value} key={index}>
    //     {item.value}
    //   </option>
    // );
  });

  const optAcademy = listAcademy?.map((items, index) => {
    return { label: items.label, value: items.label, akademi: items.label };
    // return (
    //   <option value={item.value} key={index} akademi={item.label}>
    //     {item.label}
    //   </option>
    // );
  });

  const optTheme = listTheme?.map((items, index) => {
    return { label: items.label, value: items.label };
    // return (
    //   <option value={item.value} key={index}>
    //     {item.label}
    //   </option>
    // );
  });

  const optOrganizer = listOrganizer?.map((items, index) => {
    return { label: items.label, value: items.label };
    // return (
    //   <option value={item.label} key={index}>
    //     {item.label}
    //   </option>
    // );
  });

  const optTraining = listTraining?.map((item, index) => {
    return (
      <option value={item.value} key={index}>
        {item.label}
      </option>
    );
  });

  const optStatusProfile = listProfileStatus?.map((items, index) => {
    return { label: items.value, value: items.value };
  });

  const onChangeFile = (e) => {
    if (e.target.files[0].size > "10000000") {
      e.target.value = null;
      Swal.fire("Oops !", "File Size Melebihi 10 MB", "error");
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      setFile(e.target.files[0]);
      setNameFile(e.target.files[0].name);
    }
  };

  const trainingOpt = listTraining?.map((item, index) => {
    return {
      ...item,
      icon: (
        <span
          className={`text-${
            item.status ? "success" : "danger"
          } ml-auto font-weight-bolder`}
        >
          <i
            className={`fas fa-circle text-${
              item.status ? "success" : "danger"
            }`}
          ></i>{" "}
          {item.status ? "Aktif" : "Tidak Aktif"}
        </span>
      ),
    };
  });

  const formatLabel = (e) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ paddingRight: 6 }}>{e.label}</span>
        {e.icon}
      </div>
    );
  };

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
                  checked={via === "template"}
                  onClick={(e) => {
                    setVia("template");
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
                  onClick={(e) => {
                    setVia("filter");
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
                      <div className="position-relative">
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
                            onChangeFile(e);
                          }}
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  </div>
                  <p>{nameFile}</p>
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

                  <div style={{ zIndex: "20", position: "relative" }}>
                    <Select
                      className={`basic-single`}
                      classNamePrefix="select"
                      placeholder="Pilih Tahun"
                      isMulti
                      isDisabled={false}
                      isLoading={false}
                      isClearable={false}
                      isRtl={false}
                      isSearchable={true}
                      name="color"
                      onChange={(e) => {
                        changeYear(e);
                        setDisableOption(false);
                      }}
                      options={listYears}
                    />
                  </div>
                </div>
                <div className="form-group col-xl-6">
                  <h3 className="judul">Akademi</h3>
                  <div style={{ zIndex: "19", position: "relative" }}>
                    <Select
                      className={`basic-single`}
                      classNamePrefix="select"
                      placeholder="Pilih Akademi"
                      isMulti
                      isDisabled={
                        disableOption === true || disableOption === ""
                      }
                      isLoading={false}
                      isClearable={false}
                      isRtl={false}
                      isSearchable={true}
                      name="color"
                      onChange={(e) => {
                        changeAkademi(e);
                        setDisableAkademi(false);
                      }}
                      options={optAcademy}
                    />
                  </div>
                  {disableOption === true || disableOption === "" ? (
                    <small className="text-muted">
                      Mohon isi tahun terlebih dahulu
                    </small>
                  ) : null}
                </div>
                <div className="form-group col-xl-6">
                  <h3 className="judul">Tema</h3>
                  <div style={{ zIndex: "18", position: "relative" }}>
                    <Select
                      className={`basic-single`}
                      classNamePrefix="select"
                      placeholder="Pilih Tema"
                      isMulti
                      isDisabled={
                        disableAkademi === true || disableAkademi === ""
                      }
                      isLoading={false}
                      isClearable={false}
                      isRtl={false}
                      isSearchable={true}
                      name="color"
                      onChange={(e) => {
                        changeTema(e);
                        setDisableTema(false);
                      }}
                      options={optTheme}
                    />
                  </div>
                  {disableAkademi === true || disableAkademi === "" ? (
                    <small className="text-muted">
                      Mohon isi akademi terlebih dahulu
                    </small>
                  ) : null}
                </div>
                <div className="form-group col-xl-6">
                  <h3 className="judul">Penyelenggara</h3>
                  <div style={{ zIndex: "15", position: "relative" }}>
                    <Select
                      className={`basic-single`}
                      classNamePrefix="select"
                      placeholder="Pilih Penyelenggara"
                      isMulti
                      isDisabled={disableTema === true || disableTema === ""}
                      isLoading={false}
                      isClearable={false}
                      isRtl={false}
                      isSearchable={true}
                      name="color"
                      onChange={(e) => {
                        changePenyelenggara(e);
                        setDisablePenyelenggara(false);
                      }}
                      options={optOrganizer}
                    />
                  </div>
                  {disableTema === true || disableTema === "" ? (
                    <small className="text-muted">
                      Mohon isi tema terlebih dahulu
                    </small>
                  ) : null}
                </div>
                <div className="form-group col-xl-12">
                  <h3 className="judul">Pelatihan</h3>
                  <div style={{ zIndex: "14", position: "relative" }}>
                    <Select
                      placeholder="Pilih Pelatihan"
                      options={trainingOpt}
                      value={selectedTraining}
                      isMulti
                      onChange={(e) => {
                        // setnamapelatihan(e.target.selectedOptions[0].innerText);
                        setTraining(e?.label);
                        changeTraining(e);
                        // setSelectedTraining({value: e?.label, label: e?.label})
                        setDisablePelatihan(false);
                      }}
                      required
                      isDisabled={
                        disablePenyelenggara === true ||
                        disablePenyelenggara === ""
                      }
                      getOptionLabel={(e) => formatLabel(e)}
                    />
                  </div>

                  {/* <select
                    className="form-control"
                    onChange={(e) => {
                      setnamapelatihan(e.target.selectedOptions[0].innerText);
                      setTraining(e.target.value);
                      setDisablePelatihan(false);
                    }}
                    required
                    disabled={
                      disablePenyelenggara === true ||
                      disablePenyelenggara === ""
                    }
                    style={{
                      cursor:
                        disablePenyelenggara === true ||
                          disablePenyelenggara === ""
                          ? "not-allowed"
                          : "pointer",
                    }}
                  >
                    <option disabled selected>
                      PILIH PELATIHAN
                    </option>
                    {optTraining}
                  </select> */}
                  {disablePenyelenggara === true ||
                  disablePenyelenggara === "" ? (
                    <small className="text-muted">
                      Mohon isi penyelenggara terlebih dahulu
                    </small>
                  ) : null}
                </div>
                <div className="form-group col-xl-6">
                  <h3 className="judul">Status Administrasi</h3>
                  <Select
                    placeholder="Pilih Status Administrasi"
                    options={optStatusProfile}
                    isMulti
                    onChange={(e) => {
                      changeStatusAdministrasi(e);
                    }}
                    required
                  />
                  {/* <select
                    className="form-control"
                    onChange={(e) => {
                      setProfileStatus(e.target.value);
                      setDisableStatusProfile(false);
                    }}
                  >
                    <option disabled selected>
                      PILIH STATUS ADMINISTRASI
                    </option>
                    {optStatusProfile}
                  </select> */}
                </div>
                <div className="form-group col-xl-6">
                  <h3 className="judul">Status Peserta</h3>
                  <div
                    className=""
                    style={{ zIndex: "13", position: "relative" }}
                  >
                    <Select
                      placeholder="Pilih Status Peserta"
                      options={optionsStatus}
                      isMulti
                      onChange={(e) => {
                        changeStatusPeserta(e);
                      }}
                      required
                    />
                  </div>
                  {/* <select
                    className="form-control"
                    onChange={(e) => {
                      setSelectionStatus(e.target.value);
                      setDisableStatusSelection(false);
                    }}
                  >
                    <option disabled selected>
                      PILIH STATUS PESERTA
                    </option>
                    {optionsStatus.map((item, index) => {
                      return (
                        <option key={index} value={item.value}>
                          {item.label}
                        </option>
                      );
                    })}
                  </select> */}
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
                    if (e.target.checked) {
                      setParticipantSelectionStatusUpdate(e.target.checked);
                    } else {
                      setParticipantSelectionStatusUpdate(e.target.checked);
                      setStatus("");
                    }
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
              <h3 className="mb-4 judul">Status Peserta</h3>
              <div
                className="mr-4"
                style={{ zIndex: "10", position: "relative" }}
              >
                <Select
                  placeholder="PILIH STATUS PESERTA"
                  options={optionsStatus}
                  value={status}
                  onChange={(e) => {
                    setStatus({ value: e.value, label: e.label });
                  }}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("statusPeserta")
                  }
                  isDisabled={ participantSelectionStatusUpdate === 0 ||
                    participantSelectionStatusUpdate === false}
                />
                {simpleValidator.current.message(
                  "statusPeserta",
                  status,
                  participantSelectionStatusUpdate === 1 ||
                    participantSelectionStatusUpdate === true
                    ? "required"
                    : "",
                  { className: "text-danger" }
                )}
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
                    if (e.target.checked) {
                      setBroadcastEmailSendNotification(e.target.checked);
                    } else {
                      setBroadcastEmailSendNotification(e.target.checked);
                      setEmailContent("")
                      setEmailSubject("")
                    }
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
              value={emailSubject}
              id="subjekEmail"
              placeholder="Subjek Email"
              onChange={(e) => {
                setEmailSubject(e.target.value);
              }}
              onBlur={() =>
                simpleValidator.current.showMessageFor("subjekEmail")
              }
              disabled={ broadcastEmailSendNotification === 0 ||
                broadcastEmailSendNotification === false}
            />
            {simpleValidator.current.message(
              "subjekEmail",
              emailSubject,
              broadcastEmailSendNotification === 1 ||
                broadcastEmailSendNotification === true
                ? "required"
                : "",
              { className: "text-danger" }
            )}
          </div>
          <div className="form-group mr-4">
            <h3 className="judul">Konten Email</h3>
            <div style={{ zIndex: "2", position: "relative" }}>
              <CKEditor
                editor={ClassicEditor}
                data={emailContent}
                onChange={(event, editor) => {
                  let data = editor.getData();
                  setEmailContent(data);
                }}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kontenEmail")
                }
                disabled={ broadcastEmailSendNotification === 0 ||
                  broadcastEmailSendNotification === false}
              />
              {simpleValidator.current.message(
                "kontenEmail",
                emailContent,
                broadcastEmailSendNotification === 1 ||
                  broadcastEmailSendNotification === true
                  ? "required"
                  : "",
                { className: "text-danger" }
              )}
            </div>
          </div>
          {localStorage
            .getItem("permissions")
            .includes("site_management.setting.pelatihan.manage") && (
            <div className="d-flex justify-content-end mb-4 mr-4">
              <button
                type="reset"
                className={`${styles.btnKembali} btn btn-white-ghost-rounded-full rounded-pill mr-2`}
                onClick={() => {
                  setVia("template");
                  setTitle("");
                  setYear([]);
                  setAcademy([]);
                  setTheme([]);
                  setOrganizer([]);
                  setTraining([]);
                  setProfileStatus([]);
                  setSelectionStatus([]);
                  setParticipantSelectionStatusUpdate(0);
                  setStatus("");
                  setBroadcastEmailSendNotification(0);
                  setEmailSubject("");
                  setEmailContent("");
                  setFile("");
                  setLink("");
                  setSelectedTraining([]);
                  setDisableOption(true);
                  setDisableAkademi(true);
                  setDisableTema(true);
                  setDisablePenyelenggara(true);
                }}
              >
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
          )}
        </form>
      </div>
    </div>
  );
}
