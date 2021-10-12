import React, { useEffect, useState, useRef } from "react";

import { useRouter } from "next/router";

import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import DatePicker from "react-datepicker";

import { GET_TRAINING_STEP1 } from "../../../../../redux/types/pelatihan/function.type";
import {
  storeTrainingStep1,
  getTrainingStep1,
} from "../../../../../redux/actions/pelatihan/function.actions";
import LoadingPage from "../../../../LoadingPage";

const AddTrainingStep1 = ({ propsStep }) => {
  const editorRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();

  const { trainingData } = useSelector((state) => state.trainingStep1);
  const { error: dropdownErrorAkademi, data: dataAkademi } = useSelector(
    (state) => state.drowpdownAkademi
  );
  const { error: dropdownErrorTema, data: dataTema } = useSelector(
    (state) => state.drowpdownTema
  );

  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor, Base64UploadAdapter } =
    editorRef.current || {};

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  //data pelatihan
  const [program, setProgram] = useState(trainingData.program_dts);
  const [ketentuan, setKetentuan] = useState(trainingData.ketentuan_peserta);
  const [name, setName] = useState(trainingData.name);
  const [level, setLevel] = useState(trainingData.level_pelatihan);
  const [academy, setAcademy] = useState(trainingData.akademi_id);
  const [theme, setTheme] = useState(trainingData.tema_id);
  const [logoFile, setLogoFile] = useState(trainingData.logoFile);
  const [logoBase, setLogoBase] = useState(trainingData.logo);
  const [logoName, setLogoName] = useState(trainingData.logoName);
  const [thumbnailFile, setThumbnailFile] = useState(
    trainingData.thumbnailFile
  );
  const [thumbnailBase, setThumbnailBase] = useState(trainingData.thumbnail);
  const [thumbnailName, setThumbnailName] = useState(
    trainingData.thumbnailName
  );
  const [silabusFile, setSilabusFile] = useState(trainingData.silabusFile);
  const [silabusBase, setSilabusBase] = useState(trainingData.silabus);
  const [silabusName, setSilabusName] = useState(trainingData.silabusName);
  const [metodeImplementation, setMetodeImplementation] = useState(
    trainingData.metode_pelaksanaan
  );
  const [organizer, setOrganizer] = useState(trainingData.penyelenggara);
  const [mitra, setMitra] = useState(trainingData.mitra);
  //tanggal pendaftaran
  const [startDateRegistration, setStartDateRegistration] = useState(
    trainingData.pendaftaran_mulai
  );
  const [endDateRegistration, setEndDateRegistration] = useState(
    trainingData.pendaftaran_selesai
  );
  //tanggal pelatihan
  const [startDateTraining, setStartDateTraining] = useState(
    trainingData.pelatihan_mulai
  );
  const [endDateTraining, setEndDateTraining] = useState(
    trainingData.pelatihan_selesai
  );
  const [description, setDescription] = useState(trainingData.deskripsi);
  //kuota
  const [targetKuotaRegister, setTargetKuotaRegister] = useState(
    trainingData.kuota_pendaftar
  );
  const [targetKuotaUser, setTargetKuotaUser] = useState(
    trainingData.kuota_peserta
  );
  const [statusKuota, setStatusKuota] = useState(trainingData.status_kuota);
  const [plotRegistration, setPlotRegistration] = useState(
    trainingData.alur_pendaftaran
  );
  const [sertification, setSertification] = useState(trainingData.sertifikasi);
  const [lpjUser, setLpjUser] = useState(trainingData.lpj_peserta);
  const [zonasi, setZonasi] = useState(trainingData.zonasi_id);
  const [batch, setBatch] = useState(trainingData.batch);
  const [metodeTraining, setMetodeTraining] = useState(
    trainingData.metode_pelatihan
  );
  //location
  const [address, setAddress] = useState(trainingData.alamat);
  const [province, setProvince] = useState(trainingData.provinsi);
  const [city, setCity] = useState(trainingData.kabupaten);

  const [umum, setUmum] = useState(trainingData.umum);
  const [tuna_netra, setTunaNetra] = useState(trainingData.tuna_netra);
  const [tuna_rungu, setTunaRungu] = useState(trainingData.tuna_rungu);
  const [tuna_daksa, setTunaDaksa] = useState(trainingData.tuna_daksa);
  // const [disabilitas, setDisabilitas] = useState(trainingData.disabilitas);

  const options = [
    { value: "1", label: "Chocolate" },
    { value: "2", label: "Strawberry" },
    { value: "3", label: "Vanilla" },
  ];
  const optionsAkademi = dataAkademi.data;
  const optionsTema = dataTema.data;

  let optionBatch = [];
  for (let index = 0; index < 20; index++) {
    const val = { value: index + 1, label: index + 1 };
    optionBatch.push(val);
  }

  useEffect(() => {
    dispatch(getTrainingStep1());

    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
      // Base64UploadAdapter: require('@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter')
    };

    setEditorLoaded(true);
  }, [dispatch]);

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  const onLogoHandler = (e) => {
    const type = ["image/jpg", "image/png", "image/jpeg"];
    if (e.target.files[0]) {
      if (type.includes(e.target.files[0].type)) {
        if (e.target.files[0].size > 2000000) {
          e.target.value = null;
          Swal.fire("Oops !", "Data yang bisa dimasukkan hanya 2 MB.", "error");
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              setLogoBase(reader.result);
            }
          };
          reader.readAsDataURL(e.target.files[0]);
          setLogoFile(e.target.files[0]);
          setLogoName(e.target.files[0].name);
        }
      } else {
        e.target.value = null;
        Swal.fire(
          "Oops !",
          "Data yang bisa dimasukkan hanya berupa data gambar.",
          "error"
        );
      }
    }
  };

  const onThumbnailHandler = (e) => {
    const type = ["image/jpg", "image/png", "image/jpeg"];
    if (e.target.files[0]) {
      if (type.includes(e.target.files[0].type)) {
        if (e.target.files[0].size > 2000000) {
          e.target.value = null;
          Swal.fire("Oops !", "Data yang bisa dimasukkan hanya 2 MB.", "error");
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              setThumbnailBase(reader.result);
            }
          };
          reader.readAsDataURL(e.target.files[0]);
          setThumbnailFile(e.target.files[0]);
          setThumbnailName(e.target.files[0].name);
        }
      } else {
        e.target.value = null;
        Swal.fire(
          "Oops !",
          "Data yang bisa dimasukkan hanya berupa data gambar.",
          "error"
        );
      }
    }
  };

  const onDeleteHandler = (type) => {
    switch (type) {
      case "LOGO":
        setLogoFile("");
        setLogoName("Belum ada file");
        break;
      case "THUMBNAIL":
        setThumbnailFile("");
        setThumbnailName("Belum ada file");
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
    if (e.target.files[0]) {
      if (type.includes(e.target.files[0].type)) {
        if (e.target.files[0].size > 2000000) {
          e.target.value = null;
          Swal.fire("Oops !", "Data yang bisa dimasukkan hanya 2 MB.", "error");
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              setSilabusBase(reader.result);
            }
          };
          reader.readAsDataURL(e.target.files[0]);
          setSilabusFile(e.target.files[0]);
          setSilabusName(e.target.files[0].name);
        }
      } else {
        e.target.value = null;
        Swal.fire(
          "Oops !",
          "Data yang bisa dimasukkan hanya berupa file pdf.",
          "error"
        );
      }
    }
  };

  // const disabilitasHandler = (value) => {
  //   if (disabilitas.some((res) => res === value)) {
  //     setDisabilitas(disabilitas.filter((res) => res !== value));
  //     return;
  //   }
  //   setDisabilitas([...disabilitas, value]);
  // };

  const submitHandler = (e) => {
    e.preventDefault();
    // router.push("/pelatihan/pelatihan/tambah-pelatihan/tambah-registrasi");
    if (simpleValidator.current.allValid()) {
      const data = {
        program_dts: program,
        ketentuan_peserta: ketentuan,
        name,
        level_pelatihan: level,
        akademi_id: academy,
        tema_id: theme,
        logoFile,
        logo: logoBase,
        logoName,
        thumbnailFile,
        thumbnail: thumbnailBase,
        thumbnailName,
        silabusFile,
        silabus: silabusBase,
        silabusName,
        metode_pelaksanaan: metodeImplementation,
        penyelenggara: organizer,
        mitra,
        pendaftaran_mulai: startDateRegistration,
        pendaftaran_selesai: endDateRegistration,
        pelatihan_mulai: startDateTraining,
        pelatihan_selesai: endDateTraining,
        deskripsi: description,
        kuota_pendaftar: targetKuotaRegister,
        kuota_peserta: targetKuotaUser,
        status_kuota: statusKuota,
        alur_pendaftaran: plotRegistration,
        sertifikasi: sertification,
        lpj_peserta: lpjUser,
        zonasi_id: zonasi,
        batch,
        metode_pelatihan: metodeTraining,
        alamat: address,
        provinsi: province,
        kabupaten: city,
        umum,
        tuna_netra,
        tuna_rungu,
        tuna_daksa,
      };
      dispatch(storeTrainingStep1(data));
      // console.log(data);
      propsStep(2);
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

  return (
    // <PageWrapper>
    //   <StepInputPelatihan
    //     step={1}
    //     title1="Tambah Pelatihan"
    //     title2="Tambah Form Pendaftaran"
    //     title3="Tambah Form Komitmen"
    //   />
    //   <div className="col-lg-12 order-1 px-0">
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
                  value="1"
                  checked={program === "1"}
                  onClick={() => setProgram("1")}
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
                  value="0"
                  className="form-check-input"
                  checked={program === "0"}
                  onClick={() => setProgram("0")}
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
            <div className="col-sm-10 ">
              <div className="d-flex flex-row  align-items-start pt-2">
                <div className="form-check form-check-inline pt-1">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={ketentuan}
                    value={ketentuan}
                    onClick={() => setKetentuan(!ketentuan)}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("ketentuan")
                    }
                  />
                </div>
                <label className="form-check-label">
                  Peserta dapat mengikuti pelatihan <br /> ini ditahun yang sama
                  pada Akademi ini
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
            <div className="position-relative" style={{ zIndex: "6" }}>
              <Select
                placeholder="Silahkan Pilih Level Pelatihan"
                options={options}
                defaultValue={level}
                onChange={(e) => setLevel({ value: e.value, label: e.label })}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("level pelatihan")
                }
              />
            </div>
            {simpleValidator.current.message(
              "level pelatihan",
              level.value,
              "required",
              { className: "text-danger" }
            )}
          </div>

          <div className="form-group mb-4">
            <label className="col-form-label font-weight-bold">Akademi</label>
            <div className="position-relative" style={{ zIndex: "5" }}>
              <Select
                placeholder="Silahkan Pilih Akademi"
                options={optionsAkademi}
                defaultValue={academy}
                onChange={(e) => setAcademy({ value: e.value, label: e.label })}
                onBlur={() => simpleValidator.current.showMessageFor("akademi")}
              />
            </div>
            {simpleValidator.current.message(
              "akademi",
              academy.value,
              "required",
              {
                className: "text-danger",
              }
            )}
          </div>

          <div className="form-group mb-4">
            <label className="col-form-label font-weight-bold">Tema</label>
            <div className="position-relative" style={{ zIndex: "4" }}>
              <Select
                placeholder="Silahkan Pilih Tema"
                options={optionsTema}
                defaultValue={theme}
                onChange={(e) => setTheme({ value: e.value, label: e.label })}
                onBlur={() => simpleValidator.current.showMessageFor("tema")}
              />
            </div>
            {simpleValidator.current.message("tema", theme.value, "required", {
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
                />
                <label className="custom-file-label" htmlFor="customFile">
                  {logoName}
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
              Upload Thumbnail (Optional)
            </label>
            <div className="d-flex">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  accept="image/png, image/jpeg , image/jpg"
                  onChange={onThumbnailHandler}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  {thumbnailName}
                </label>
              </div>
              <button
                className="btn btn-link-action bg-danger text-white ml-3"
                type="button"
                onClick={() => onDeleteHandler("THUMBNAIL")}
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
            <small className="text-muted">Format File (.pdf) & Max 2 mb</small>
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
                    simpleValidator.current.showMessageFor("metode pelaksanaan")
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
                    simpleValidator.current.showMessageFor("metode pelaksanaan")
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
              placeholder="Silahkan Pilih Penyelenggara"
              options={options}
              defaultValue={organizer}
              onChange={(e) => setOrganizer({ value: e.value, label: e.label })}
              onBlur={() =>
                simpleValidator.current.showMessageFor("penyelenggara")
              }
            />
            {simpleValidator.current.message(
              "penyelenggara",
              organizer.value,
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
              placeholder="Silahkan Pilih Mitra"
              options={options}
              defaultValue={mitra}
              onChange={(e) => setMitra({ value: e.value, label: e.label })}
              onBlur={() => simpleValidator.current.showMessageFor("mitra")}
            />
            {simpleValidator.current.message("mitra", mitra.value, "required", {
              className: "text-danger",
            })}
          </div>

          <h3 className="font-weight-bolder pt-3">Tanggal Pendaftaran</h3>

          <div className="form-group row mb-2">
            <div className="col-sm-12 col-md-6">
              <label className="col-form-label font-weight-bold">
                Tanggal Mulai
              </label>
              <div className="position-relative">
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
                <i className="ri-calendar-line right-center-absolute pr-3"></i>
              </div>
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
              <div className="position-relative">
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
                <i className="ri-calendar-line right-center-absolute pr-3"></i>
              </div>
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
              <div className="position-relative">
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
                <i className="ri-calendar-line right-center-absolute pr-3"></i>
              </div>
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
              <div className="position-relative">
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
                <i className="ri-calendar-line right-center-absolute pr-3"></i>
              </div>
              {simpleValidator.current.message(
                "tanggal sampai",
                endDateTraining,
                "required",
                { className: "text-danger" }
              )}
            </div>
          </div>

          <div className="form-group mb-4">
            <label className="col-form-label font-weight-bold">Deskripsi</label>
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
                placeholder="Silahkan Masukan Kuota Target Pendaftar"
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
                placeholder="Silahkan Masukan Kuota Target Peserta"
                type="number"
                value={targetKuotaUser}
                onChange={(e) => setTargetKuotaUser(e.target.value)}
                className="form-control"
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kuota target peserta")
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
                  checked={plotRegistration === "Administrasi - Test Substansi"}
                  onClick={() =>
                    setPlotRegistration("Administrasi - Test Substansi")
                  }
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("alur pendaftaran")
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
                  checked={plotRegistration === "Tes Substansi - Administrasi"}
                  onClick={() =>
                    setPlotRegistration("Tes Substansi - Administrasi")
                  }
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("alur pendaftaran")
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
                    plotRegistration === "Tanpa Tes Substansi & Administrasi"
                  }
                  onClick={() =>
                    setPlotRegistration("Tanpa Tes Substansi & Administrasi")
                  }
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("alur pendaftaran")
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
                  value="1"
                  checked={sertification === "1"}
                  onClick={() => setSertification("1")}
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
                  value="0"
                  checked={sertification === "0"}
                  onClick={() => setSertification("0")}
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
                  value="1"
                  checked={lpjUser === "1"}
                  onClick={() => setLpjUser("1")}
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
                  value="0"
                  checked={lpjUser === "0"}
                  onClick={() => setLpjUser("0")}
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
              <label className="col-form-label font-weight-bold">Zonasi</label>
              <Select
                placeholder="Silahkan Pilih Level Zonasi"
                options={options}
                defaultValue={zonasi}
                onChange={(e) => setZonasi({ value: e.value, label: e.label })}
                onBlur={() => simpleValidator.current.showMessageFor("zonasi")}
              />
              {simpleValidator.current.message(
                "zonasi",
                zonasi.value,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </div>
            <div className="col-sm-12 col-md-6">
              <label className="col-form-label font-weight-bold">Batch</label>
              <Select
                placeholder="Silahkan Pilih Batch"
                options={optionBatch}
                defaultValue={batch}
                onChange={(e) => setBatch({ value: e.value, label: e.label })}
                onBlur={() => simpleValidator.current.showMessageFor("batch")}
              />
              {simpleValidator.current.message(
                "batch",
                batch.value,
                "required",
                {
                  className: "text-danger",
                }
              )}
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
                    simpleValidator.current.showMessageFor("metode pelatihan")
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
                    simpleValidator.current.showMessageFor("metode pelatihan")
                  }
                />
                <label className="form-check-label">Online</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  name="metodeTraining"
                  className="form-check-input"
                  value="Online dan Offline"
                  checked={metodeTraining === "Online dan Offline"}
                  onClick={() => setMetodeTraining("Online dan Offline")}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("metode pelatihan")
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
            <label className="col-form-label font-weight-bold">Alamat</label>
            <textarea
              value={address}
              rows="6"
              className="form-control"
              onChange={(e) => setAddress(e.target.value)}
              onBlur={() => simpleValidator.current.showMessageFor("alamat")}
              placeholder="Silahkan Masukan Alamat Disini"
            />
            {simpleValidator.current.message("alamat", address, "required", {
              className: "text-danger",
            })}
          </div>

          <div className="form-group row mb-2">
            <div className="col-sm-12 col-md-6">
              <label className="col-form-label font-weight-bold">
                Provinsi
              </label>
              <Select
                placeholder="Silahkan Pilih Provinsi"
                options={options}
                defaultValue={province}
                onChange={(e) =>
                  setProvince({ value: e.value, label: e.label })
                }
                onBlur={() =>
                  simpleValidator.current.showMessageFor("provinsi")
                }
              />
              {simpleValidator.current.message(
                "provinsi",
                province.value,
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
                placeholder="Silahkan Pilih Kota / Kabupaten"
                options={options}
                defaultValue={city}
                onChange={(e) => setCity({ value: e.value, label: e.label })}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("kota/kabupaten")
                }
              />
              {simpleValidator.current.message(
                "kota/kabupaten",
                city.value,
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
                  checked={umum}
                  value={umum}
                  onClick={() => setUmum(!umum)}
                />
                <label className="form-check-label">Umum</label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  name="plotRegistration"
                  className="form-check-input"
                  checked={tuna_netra}
                  value={tuna_netra}
                  onClick={() => setTunaNetra(!tuna_netra)}
                />
                <label className="form-check-label">Tuna Netra</label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  name="plotRegistration"
                  className="form-check-input"
                  checked={tuna_rungu}
                  value={tuna_rungu}
                  onClick={() => setTunaRungu(!tuna_rungu)}
                />
                <label className="form-check-label">Tuna Rungu</label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  name="plotRegistration"
                  className="form-check-input"
                  checked={tuna_daksa}
                  value={tuna_daksa}
                  onClick={() => setTunaDaksa(!tuna_daksa)}
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
                onClick={() => router.push("/pelatihan/pelatihan")}
              >
                Batal
              </button>
              <button className="btn btn-primary-rounded-full" type="submit">
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    //   </div>
    // </PageWrapper>
  );
};

export default AddTrainingStep1;
