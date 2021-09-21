import React, { useEffect, useState, useRef } from "react";

import { useRouter } from "next/router";

import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import DatePicker from "react-datepicker";

import PageWrapper from "../../../../wrapper/page.wrapper";
import StepInputPelatihan from "../../../../StepInputPelatihan";
import LoadingPage from "../../../../LoadingPage";

const AddTrainingStep1 = () => {
  const editorRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();

  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor, Base64UploadAdapter } =
    editorRef.current || {};

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  //data pelatihan
  const [program, setProgram] = useState("");
  const [ketentuan, setKetentuan] = useState(false);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [academy, setAcademy] = useState("");
  const [theme, setTheme] = useState("");
  const [logoFile, setLogoFile] = useState("");
  const [logoName, setLogoName] = useState("Belum ada file");
  const [silabusFile, setSilabusFile] = useState("");
  const [silabusName, setSilabusName] = useState("Belum ada file");
  const [metodeImplementation, setMetodeImplementation] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [mitra, setMitra] = useState("");
  //tanggal pendaftaran
  const [startDateRegistration, setStartDateRegistration] = useState(null);
  const [endDateRegistration, setEndDateRegistration] = useState(null);
  //tanggal pelatihan
  const [startDateTraining, setStartDateTraining] = useState(null);
  const [endDateTraining, setEndDateTraining] = useState(null);
  const [description, setDescription] = useState("");
  //kuota
  const [targetKuotaRegister, setTargetKuotaRegister] = useState("");
  const [targetKuotaUser, setTargetKuotaUser] = useState("");
  const [statusKuota, setStatusKuota] = useState("");
  const [plotRegistration, setPlotRegistration] = useState("");
  const [sertification, setSertification] = useState("");
  const [lpjUser, setLpjUser] = useState("");
  const [zonasi, setZonasi] = useState("");
  const [batch, setBatch] = useState("");
  const [metodeTraining, setMetodeTraining] = useState("");
  //location
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [disabilitas, setDisabilitas] = useState([]);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
      // Base64UploadAdapter: require('@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter')
    };

    setEditorLoaded(true);
  }, []);

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      const data = {
        program,
        ketentuan,
        name,
        level,
        academy,
        theme,
        logoFile,
        silabusFile,
        metodeImplementation,
        organizer,
        mitra,
        startDateRegistration,
        endDateRegistration,
        startDateTraining,
        endDateTraining,
        description,
        targetKuotaRegister,
        targetKuotaUser,
        statusKuota,
        plotRegistration,
        sertification,
        lpjUser,
        zonasi,
        batch,
        metodeTraining,
        address,
        province,
        city,
        disabilitas,
      };
      console.log(data);
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi data yang bener dong lu !",
      });
    }
  };

  const onLogoHandler = (e) => {
    const type = ["image/jpg", "image/png", "image/jpeg"];
    if (type.includes(e.target.files[0].type)) {
      setLogoFile(e.target.files[0]);
      setLogoName(e.target.files[0].name);
    } else {
      e.target.value = null;
      Swal.fire(
        "Oops !",
        "Data yang bisa dimasukkan hanya berupa data gambar.",
        "error"
      );
    }
  };

  const onDeleteHandler = (type) => {
    switch (type) {
      case "LOGO":
        setLogoFile("");
        setLogoName("Belum ada file");
        break;
      case "SILABUS":
        setSilabusFile("");
        setSilabusName("Belum ada file");
        break;
      default:
        break;
    }
  };

  const onSilabusHandler = (e) => {
    const type = ["application/pdf"];
    if (type.includes(e.target.files[0].type)) {
      setSilabusFile(e.target.files[0]);
      setSilabusName(e.target.files[0].name);
    } else {
      e.target.value = null;
      Swal.fire(
        "Oops !",
        "Data yang bisa dimasukkan hanya berupa file pdf.",
        "error"
      );
    }
  };

  const disabilitasHandler = (value) => {
    if (disabilitas.some((res) => res === value)) {
      setDisabilitas(disabilitas.filter((res) => res !== value));
      return;
    }
    setDisabilitas([...disabilitas, value]);
  };

  return (
    <PageWrapper>
      <StepInputPelatihan step={1} />
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-body py-4">
            <form onSubmit={submitHandler}>
              <h3 className="font-weight-bolder pb-5 pt-4">Data Pelatihan</h3>

              <div className="form-group row mb-4">
                <label className="col-form-label font-weight-bold col-sm-2">
                  Program DTS
                </label>
                <div className="col-sm-10 my-auto">
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      name="program"
                      className="form-check-input"
                      value="Ya"
                      checked={program === "Ya"}
                      onClick={() => setProgram("Ya")}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("program dts")
                      }
                    />
                    <label className="form-check-label">Ya</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      name="program"
                      value="Tidak"
                      className="form-check-input"
                      checked={program === "Tidak"}
                      onClick={() => setProgram("Tidak")}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("program dts")
                      }
                    />
                    <label className="form-check-label">Tidak</label>
                  </div>
                  {simpleValidator.current.message(
                    "program dts",
                    program,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group row mb-4">
                <label className="col-form-label font-weight-bold col-sm-2">
                  Ketentuan Peserta
                </label>
                <div className="col-sm-10 my-auto">
                  <div className="form-check form-check-inline ">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value={ketentuan}
                      onClick={() => setKetentuan(!ketentuan)}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("ketentuan")
                      }
                    />
                    <label className="form-check-label">
                      Peserta dapat mengikuti pelatihan <br /> ini ditahun yang
                      sama pada Akademi ini
                    </label>
                  </div>
                  {simpleValidator.current.message(
                    "ketentuan",
                    ketentuan,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group mb-4">
                <label className="col-form-label font-weight-bold">
                  Nama Pelatihan
                </label>
                <input
                  type="text"
                  placeholder="Silahkan Masukkan Nama Pelatihan"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("nama pelatihan")
                  }
                />
                {simpleValidator.current.message(
                  "nama pelatihan",
                  name,
                  "required",
                  { className: "text-danger" }
                )}
              </div>

              <div className="form-group mb-4">
                <label className="col-form-label font-weight-bold">
                  Level Pelatihan
                </label>
                <Select
                  options={options}
                  defaultValue={level}
                  onChange={(e) => setLevel(e.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("level pelatihan")
                  }
                />
                {simpleValidator.current.message(
                  "level pelatihan",
                  level,
                  "required",
                  { className: "text-danger" }
                )}
              </div>

              <div className="form-group mb-4">
                <label className="col-form-label font-weight-bold">
                  Akademi
                </label>
                <Select
                  options={options}
                  defaultValue={academy}
                  onChange={(e) => setAcademy(e.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("akademi")
                  }
                />
                {simpleValidator.current.message(
                  "akademi",
                  academy,
                  "required",
                  { className: "text-danger" }
                )}
              </div>

              <div className="form-group mb-4">
                <label className="col-form-label font-weight-bold">Tema</label>
                <Select
                  options={options}
                  defaultValue={theme}
                  onChange={(e) => setTheme(e.value)}
                  onBlur={() => simpleValidator.current.showMessageFor("tema")}
                />
                {simpleValidator.current.message("tema", theme, "required", {
                  className: "text-danger",
                })}
              </div>

              <div className="form-group mb-3">
                <label className="col-form-label font-weight-bold">
                  Logo Reference (Optional)
                </label>
                <div className="d-flex">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      accept="image/png, image/jpeg , image/jpg"
                      onChange={onLogoHandler}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("logo reference")
                      }
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      {logoName}
                    </label>
                    <label style={{ marginTop: "15px" }}>
                      {simpleValidator.current.message(
                        "logo reference",
                        logoFile,
                        "required",
                        { className: "text-danger" }
                      )}
                    </label>
                  </div>
                  <button
                    className="btn btn-link-action bg-danger text-white ml-3"
                    type="button"
                    onClick={() => onDeleteHandler("LOGO")}
                  >
                    <i className="ri-delete-bin-fill p-0 text-white"></i>
                  </button>
                </div>
                <small className="text-muted">
                  Format File (.png/.jpg) & Max 2 mb
                </small>
              </div>

              <div className="form-group mb-3">
                <label className="col-form-label font-weight-bold">
                  Upload Silabus
                </label>
                <div className="d-flex">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      accept="application/pdf"
                      onChange={onSilabusHandler}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("upload silabus")
                      }
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      {silabusName}
                    </label>
                    <label style={{ marginTop: "15px" }}>
                      {simpleValidator.current.message(
                        "upload silabus",
                        silabusFile,
                        "required",
                        { className: "text-danger" }
                      )}
                    </label>
                  </div>
                  <button
                    className="btn btn-link-action bg-danger text-white ml-3"
                    type="button"
                    onClick={() => onDeleteHandler("SILABUS")}
                  >
                    <i className="ri-delete-bin-fill p-0 text-white"></i>
                  </button>
                </div>
                <small className="text-muted">
                  Format File (.pdf) & Max 2 mb
                </small>
              </div>

              <div className="form-group row mb-0 pt-2">
                <label className="col-form-label font-weight-bold col-sm-2">
                  Metode Pelaksanaan
                </label>
                <div className="col-sm-10 my-auto">
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      name="metode"
                      value="Swakelola"
                      checked={metodeImplementation === "Swakelola"}
                      onClick={() => setMetodeImplementation("Swakelola")}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor(
                          "metode pelaksanaan"
                        )
                      }
                      className="form-check-input"
                    />
                    <label className="form-check-label">Swakelola</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      name="metode"
                      className="form-check-input"
                      value="Mitra"
                      checked={metodeImplementation === "Mitra"}
                      onClick={() => setMetodeImplementation("Mitra")}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor(
                          "metode pelaksanaan"
                        )
                      }
                    />
                    <label className="form-check-label">Mitra</label>
                  </div>
                  {simpleValidator.current.message(
                    "metode pelaksanaan",
                    metodeImplementation,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group mb-4">
                <label className="col-form-label font-weight-bold">
                  Penyelenggara
                </label>
                <Select
                  options={options}
                  defaultValue={organizer}
                  onChange={(e) => setOrganizer(e.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("penyelenggara")
                  }
                />
                {simpleValidator.current.message(
                  "penyelenggara",
                  organizer,
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </div>

              <div className="form-group mb-4">
                <label className="col-form-label font-weight-bold">
                  Pilih Mitra
                </label>
                <Select
                  options={options}
                  defaultValue={mitra}
                  onChange={(e) => setMitra(e.value)}
                  onBlur={() => simpleValidator.current.showMessageFor("mitra")}
                />
                {simpleValidator.current.message("mitra", mitra, "required", {
                  className: "text-danger",
                })}
              </div>

              <h3 className="font-weight-bolder pt-3">Tanggal Pendaftaran</h3>

              <div className="form-group row mb-2">
                <div className="col-sm-12 col-md-6">
                  <label className="col-form-label font-weight-bold">
                    Tanggal Mulai
                  </label>
                  <DatePicker
                    wrapperClassName="datepicker"
                    className="form-control w-100 d-block"
                    name="start_date"
                    selected={startDateRegistration}
                    onChange={(date) => setStartDateRegistration(date)}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("tanggal mulai")
                    }
                    selectsStart
                    startDate={startDateRegistration}
                    endDate={endDateRegistration}
                    dateFormat="dd/MM/yyyy"
                    autoComplete="off"
                    placeholderText="Silahkan Pilih Tanggal Dari"
                  />
                  {simpleValidator.current.message(
                    "tanggal mulai",
                    startDateRegistration,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
                <div className="col-sm-12 col-md-6">
                  <label className="col-form-label font-weight-bold">
                    Tanggal Sampai
                  </label>
                  <DatePicker
                    wrapperClassName="datepicker"
                    className="form-control w-100"
                    selected={endDateRegistration}
                    onChange={(date) => setEndDateRegistration(date)}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("tanggal sampai")
                    }
                    selectsEnd
                    startDate={startDateRegistration}
                    endDate={endDateRegistration}
                    minDate={startDateRegistration}
                    dateFormat="dd/MM/yyyy"
                    autoComplete="off"
                    placeholderText="Silahkan Pilih Tanggal Sampai"
                  />
                  {simpleValidator.current.message(
                    "tanggal sampai",
                    endDateRegistration,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <h3 className="font-weight-bolder pt-3">Tanggal Pelatihan</h3>

              <div className="form-group row mb-2">
                <div className="col-sm-12 col-md-6">
                  <label className="col-form-label font-weight-bold">
                    Tanggal Mulai
                  </label>
                  <DatePicker
                    wrapperClassName="datepicker"
                    className="form-control w-100 d-block"
                    name="start_date"
                    selected={startDateTraining}
                    onChange={(date) => setStartDateTraining(date)}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("tanggal mulai")
                    }
                    selectsStart
                    startDate={startDateTraining}
                    endDate={endDateTraining}
                    dateFormat="dd/MM/yyyy"
                    autoComplete="off"
                    placeholderText="Silahkan Pilih Tanggal Dari"
                  />
                  {simpleValidator.current.message(
                    "tanggal mulai",
                    startDateTraining,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
                <div className="col-sm-12 col-md-6">
                  <label className="col-form-label font-weight-bold">
                    Tanggal Sampai
                  </label>
                  <DatePicker
                    wrapperClassName="datepicker"
                    className="form-control w-100"
                    selected={endDateTraining}
                    onChange={(date) => setEndDateTraining(date)}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("tanggal sampai")
                    }
                    selectsEnd
                    startDate={startDateTraining}
                    endDate={endDateTraining}
                    minDate={startDateTraining}
                    dateFormat="dd/MM/yyyy"
                    autoComplete="off"
                    placeholderText="Silahkan Pilih Tanggal Sampai"
                  />
                  {simpleValidator.current.message(
                    "tanggal sampai",
                    endDateTraining,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group mb-4">
                <label className="col-form-label font-weight-bold">
                  Deskripsi
                </label>
                <div className="ckeditor">
                  {editorLoaded ? (
                    <CKEditor
                      editor={ClassicEditor}
                      data={description}
                      onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setDescription(data);
                        // console.log({ event, editor, data });
                      }}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("deskripsi")
                      }
                      config={{
                        placeholder: "Silahkan Masukan Deskripsi Detail",
                      }}
                    />
                  ) : (
                    <p>Tunggu Sebentar</p>
                  )}
                  {simpleValidator.current.message(
                    "deskripsi",
                    description,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <h3 className="font-weight-bolder pt-3">Kuota</h3>

              <div className="form-group row mb-2">
                <div className="col-sm-12 col-md-6">
                  <label className="col-form-label font-weight-bold">
                    Kuota Target Pendaftar
                  </label>
                  <input
                    type="number"
                    value={targetKuotaRegister}
                    onChange={(e) => setTargetKuotaRegister(e.target.value)}
                    className="form-control"
                    onBlur={() =>
                      simpleValidator.current.showMessageFor(
                        "kuota target pendaftar"
                      )
                    }
                  />
                  {simpleValidator.current.message(
                    "kuota target pendaftar",
                    targetKuotaRegister,
                    "required|integer",
                    { className: "text-danger" }
                  )}
                </div>
                <div className="col-sm-12 col-md-6">
                  <label className="col-form-label font-weight-bold">
                    Kuota Target Peserta
                  </label>
                  <input
                    type="number"
                    value={targetKuotaUser}
                    onChange={(e) => setTargetKuotaUser(e.target.value)}
                    className="form-control"
                    onBlur={() =>
                      simpleValidator.current.showMessageFor(
                        "kuota target peserta"
                      )
                    }
                  />
                  {simpleValidator.current.message(
                    "kuota target peserta",
                    targetKuotaUser,
                    "required|integer",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group row mb-0">
                <label className="col-form-label font-weight-bold col-sm-2">
                  Status Kuota
                </label>
                <div className="col-sm-10 my-auto">
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      name="statusKuota"
                      className="form-check-input"
                      value="Available"
                      checked={statusKuota === "Available"}
                      onClick={() => setStatusKuota("Available")}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("status kuota")
                      }
                    />
                    <label className="form-check-label">Available</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      name="statusKuota"
                      className="form-check-input"
                      value="Full"
                      checked={statusKuota === "Full"}
                      onClick={() => setStatusKuota("Full")}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("status kuota")
                      }
                    />
                    <label className="form-check-label">Full</label>
                  </div>
                  {simpleValidator.current.message(
                    "status kuota",
                    statusKuota,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group row mb-0">
                <label className="col-form-label font-weight-bold col-sm-2">
                  Alur Pendaftaran
                </label>
                <div className="col-sm-10">
                  <div className="form-check mt-3">
                    <input
                      type="radio"
                      name="plotRegistration"
                      className="form-check-input"
                      value="Administrasi - Test Substansi"
                      checked={
                        plotRegistration === "Administrasi - Test Substansi"
                      }
                      onClick={() =>
                        setPlotRegistration("Administrasi - Test Substansi")
                      }
                      onBlur={() =>
                        simpleValidator.current.showMessageFor(
                          "alur pendaftaran"
                        )
                      }
                    />
                    <label className="form-check-label">
                      Administrasi - Test Substansi
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      name="plotRegistration"
                      className="form-check-input"
                      value="Tes Substansi - Administrasi"
                      checked={
                        plotRegistration === "Tes Substansi - Administrasi"
                      }
                      onClick={() =>
                        setPlotRegistration("Tes Substansi - Administrasi")
                      }
                      onBlur={() =>
                        simpleValidator.current.showMessageFor(
                          "alur pendaftaran"
                        )
                      }
                    />
                    <label className="form-check-label">
                      Tes Substansi - Administrasi
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      name="plotRegistration"
                      className="form-check-input"
                      value="Tanpa Tes Substansi & Administrasi"
                      checked={
                        plotRegistration ===
                        "Tanpa Tes Substansi & Administrasi"
                      }
                      onClick={() =>
                        setPlotRegistration(
                          "Tanpa Tes Substansi & Administrasi"
                        )
                      }
                      onBlur={() =>
                        simpleValidator.current.showMessageFor(
                          "alur pendaftaran"
                        )
                      }
                    />
                    <label className="form-check-label">
                      Tanpa Tes Substansi & Administrasi
                    </label>
                  </div>
                  {simpleValidator.current.message(
                    "alur pendaftaran",
                    plotRegistration,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group row mb-0 mt-2">
                <label className="col-form-label font-weight-bold col-sm-2">
                  Sertifikasi
                </label>
                <div className="col-sm-10 my-auto">
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      name="sertification"
                      className="form-check-input"
                      value="Ya"
                      checked={sertification === "Ya"}
                      onClick={() => setSertification("Ya")}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("sertifikasi")
                      }
                    />
                    <label className="form-check-label">Ya</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      name="sertification"
                      className="form-check-input"
                      value="Tidak"
                      checked={sertification === "Tidak"}
                      onClick={() => setSertification("Tidak")}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("sertifikasi")
                      }
                    />
                    <label className="form-check-label">Tidak</label>
                  </div>
                  {simpleValidator.current.message(
                    "sertifikasi",
                    sertification,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group row mb-0">
                <label className="col-form-label font-weight-bold col-sm-2">
                  LPJ Peserta
                </label>
                <div className="col-sm-10 my-auto">
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      name="lpjPeserta"
                      className="form-check-input"
                      value="Ya"
                      checked={lpjUser === "Ya"}
                      onClick={() => setLpjUser("Ya")}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("lpj peserta")
                      }
                    />
                    <label className="form-check-label">Ya</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      name="lpjPeserta"
                      className="form-check-input"
                      value="Tidak"
                      checked={lpjUser === "Tidak"}
                      onClick={() => setLpjUser("Tidak")}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("lpj peserta")
                      }
                    />
                    <label className="form-check-label">Tidak</label>
                  </div>
                  {simpleValidator.current.message(
                    "lpj peserta",
                    lpjUser,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group row mb-2">
                <div className="col-sm-12 col-md-6">
                  <label className="col-form-label font-weight-bold">
                    Zonasi
                  </label>
                  <Select
                    options={options}
                    defaultValue={zonasi}
                    onChange={(e) => setZonasi(e.value)}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("zonasi")
                    }
                  />
                  {simpleValidator.current.message(
                    "zonasi",
                    zonasi,
                    "required",
                    {
                      className: "text-danger",
                    }
                  )}
                </div>
                <div className="col-sm-12 col-md-6">
                  <label className="col-form-label font-weight-bold">
                    Batch
                  </label>
                  <Select
                    options={options}
                    defaultValue={batch}
                    onChange={(e) => setBatch(e.value)}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("batch")
                    }
                  />
                  {simpleValidator.current.message("batch", batch, "required", {
                    className: "text-danger",
                  })}
                </div>
              </div>

              <div className="form-group row mb-0 mt-3">
                <label className="col-form-label font-weight-bold col-sm-2">
                  Metode Pelatihan
                </label>
                <div className="col-sm-10 my-auto">
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      name="metodeTraining"
                      className="form-check-input"
                      value="Offline"
                      checked={metodeTraining === "Offline"}
                      onClick={() => setMetodeTraining("Offline")}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor(
                          "metode pelatihan"
                        )
                      }
                    />
                    <label className="form-check-label">Offline</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      name="metodeTraining"
                      className="form-check-input"
                      value="Online"
                      checked={metodeTraining === "Online"}
                      onClick={() => setMetodeTraining("Online")}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor(
                          "metode pelatihan"
                        )
                      }
                    />
                    <label className="form-check-label">Online</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      name="metodeTraining"
                      className="form-check-input"
                      value="Online&Offline"
                      checked={metodeTraining === "Online&Offline"}
                      onClick={() => setMetodeTraining("Online&Offline")}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor(
                          "metode pelatihan"
                        )
                      }
                    />
                    <label className="form-check-label">Online & Offline</label>
                  </div>
                  {simpleValidator.current.message(
                    "metode pelatihan",
                    metodeTraining,
                    "required",
                    {
                      className: "text-danger",
                    }
                  )}
                </div>
              </div>

              <h3 className="font-weight-bolder pt-3">Lokasi Pelatihan</h3>

              <div className="form-group mb-4">
                <label className="col-form-label font-weight-bold">
                  Alamat
                </label>
                <textarea
                  value={address}
                  rows="6"
                  className="form-control"
                  onChange={(e) => setAddress(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("alamat")
                  }
                  placeholder="Silahkan Masukan Alamat Disini"
                />
                {simpleValidator.current.message(
                  "alamat",
                  address,
                  "required",
                  {
                    className: "text-danger",
                  }
                )}
              </div>

              <div className="form-group row mb-2">
                <div className="col-sm-12 col-md-6">
                  <label className="col-form-label font-weight-bold">
                    Provinsi
                  </label>
                  <Select
                    options={options}
                    defaultValue={province}
                    onChange={(e) => setProvince(e.value)}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("provinsi")
                    }
                  />
                  {simpleValidator.current.message(
                    "provinsi",
                    province,
                    "required",
                    {
                      className: "text-danger",
                    }
                  )}
                </div>
                <div className="col-sm-12 col-md-6">
                  <label className="col-form-label font-weight-bold">
                    Kota / Kabupaten
                  </label>
                  <Select
                    options={options}
                    defaultValue={city}
                    onChange={(e) => setCity(e.value)}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("kota/kabupaten")
                    }
                  />
                  {simpleValidator.current.message(
                    "kota/kabupaten",
                    city,
                    "required",
                    {
                      className: "text-danger",
                    }
                  )}
                </div>
              </div>

              <div className="form-group row mb-0">
                <label className="col-form-label font-weight-bold col-sm-2">
                  Disabilitas
                </label>
                <div className="col-sm-10">
                  <div className="form-check mt-3">
                    <input
                      type="checkbox"
                      name="plotRegistration"
                      className="form-check-input"
                      value="Umum"
                      onChange={() => disabilitasHandler("Umum")}
                    />
                    <label className="form-check-label">Umum</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      name="plotRegistration"
                      className="form-check-input"
                      value="Tuna Netra"
                      onChange={() => disabilitasHandler("Tuna Netra")}
                    />
                    <label className="form-check-label">Tuna Netra</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      name="plotRegistration"
                      className="form-check-input"
                      value="Tuna Rungu"
                      onChange={() => disabilitasHandler("Tuna Rungu")}
                    />
                    <label className="form-check-label">Tuna Rungu</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      name="plotRegistration"
                      className="form-check-input"
                      value="Tuna Daksa"
                      onChange={() => disabilitasHandler("Tuna Daksa")}
                    />
                    <label className="form-check-label">Tuna Daksa</label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="text-right">
                  <button
                    className="btn btn-light-ghost-rounded-full mr-2"
                    type="button"
                    onClick={() => router.back()}
                  >
                    Batal
                  </button>
                  <button
                    className="btn btn-primary-rounded-full"
                    type="submit"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AddTrainingStep1;
