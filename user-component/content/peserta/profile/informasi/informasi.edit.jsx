import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";
import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import style from "../style.module.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  updateProfileDataPribadi,
  clearErrors,
} from "../../../../../redux/actions/pelatihan/profile.actions";
import { UPDATE_DATA_PRIBADI_RESET } from "../../../../../redux/types/pelatihan/profile.type";
import {
  helperRegexNumber,
  SweatAlert,
} from "../../../../../utils/middleware/helper";

const InformasiEdit = ({ funcViewEdit, token, wizzard, setIndex }) => {
  const dispatch = useDispatch();
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const { error: errorDataPribadi, dataPribadi } = useSelector(
    state => state.getDataPribadi
  );

  const {
    error: errorUpdateData,
    loading,
    success,
  } = useSelector(state => state.updateDataPribadi);
  const { error: errorAgama, data: dataAgama } = useSelector(
    state => state.drowpdownAgama
  );

  const [name, setName] = useState((dataPribadi && dataPribadi.name) || "");
  const [email, setEmail] = useState((dataPribadi && dataPribadi.email) || "");
  const [kelamin, setKelamin] = useState(
    (dataPribadi && dataPribadi.jenis_kelamin) || null
  );
  const [nik, setNik] = useState((dataPribadi && dataPribadi.nik) || "");
  const [nomorHandphone, setNomorHandphone] = useState(
    (dataPribadi && dataPribadi.nomor_handphone) || ""
  );
  const [agama, setAgama] = useState(
    (dataPribadi && dataPribadi.agama) || null
  );
  const [tempatLahir, setTempatLahir] = useState(
    (dataPribadi && dataPribadi.tempat_lahir) || ""
  );
  const [tanggalLahir, setTanggalLahir] = useState(
    (dataPribadi && moment(dataPribadi.tanggal_lahir).format("YYYY-MM-DD")) ||
      ""
  );

  const [nameUrgent, setNameUrgent] = useState(
    (dataPribadi && dataPribadi.Nama_kontak_darurat) || ""
  );
  const [nomorUrgent, setNomorUrgent] = useState(
    (dataPribadi && dataPribadi.nomor_handphone_darurat) || ""
  );
  const [hubunganUrgent, setHubunganUrgent] = useState(
    (dataPribadi && dataPribadi.hubungan) || ""
  );

  const [ktpName, setKtpName] = useState(
    (dataPribadi && dataPribadi.File_ktp) || "Belum ada file"
  );
  const [ktp, setKtp] = useState("");
  const [ktpPreview, setKtpPreview] = useState(
    (dataPribadi && dataPribadi.file_path + dataPribadi.File_ktp) || ""
  );

  // const [cvName, setCvName] = useState(
  //   (dataPribadi && dataPribadi.cv) || "Belum ada file"
  // );
  // const [cv, setCv] = useState("");
  // const [cvPreview, setCvPreview] = useState(
  //   (dataPribadi && dataPribadi.file_path + dataPribadi.cv) || ""
  // );

  // const [link, setLink] = useState((dataPribadi && dataPribadi.link) || "");

  const optionsKelamin = [
    { value: "0", label: "Laki - Laki" },
    { value: "1", label: "Perempuan" },
  ];

  const optionsAgama = [];
  if (dataAgama) {
    for (let index = 0; index < dataAgama.data.length; index++) {
      let val = {
        value: dataAgama.data[index].id,
        label: dataAgama.data[index].label,
      };
      optionsAgama.push(val);
    }
  }

  useEffect(() => {
    if (errorUpdateData) {
      // toast.error(errorUpdateData);
      SweatAlert("Gagal", errorUpdateData, "error");
      dispatch(clearErrors());
    }

    if (success) {
      SweatAlert("Berhasil", "Berhasil Update Data", "success");
      // toast.success("Berhasil Update Data");
      dispatch({ type: UPDATE_DATA_PRIBADI_RESET });
      if (wizzard) {
        funcViewEdit(2);
      } else {
        funcViewEdit(false);
      }
    }
  }, [errorUpdateData, success, dispatch, funcViewEdit]);

  const onChangeKtp = e => {
    const type = ["image/jpg", "image/png", "image/jpeg", "application/pdf"];
    if (e.target.files[0]) {
      if (type.includes(e.target.files[0].type)) {
        if (e.target.files[0].size > 2000000) {
          e.target.value = null;
          Swal.fire("Oops !", "Gambar maksimal 2 MB.", "error");
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              setKtp(reader.result);
            }
          };
          reader.readAsDataURL(e.target.files[0]);
          setKtpPreview(e.target.files[0]);
          setKtpName(e.target.files[0].name);
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

  // const onChangeCV = (e) => {
  //   const type = ["application/pdf"];
  //   if (e.target.files[0]) {
  //     if (type.includes(e.target.files[0].type)) {
  //       if (e.target.files[0].size > 2000000) {
  //         e.target.value = null;
  //         Swal.fire("Oops !", "Gambar maksimal 2 MB.", "error");
  //       } else {
  //         const reader = new FileReader();
  //         reader.onload = () => {
  //           if (reader.readyState === 2) {
  //             setCv(reader.result);
  //           }
  //         };
  //         reader.readAsDataURL(e.target.files[0]);
  //         setCvPreview(e.target.files[0]);
  //         setCvName(e.target.files[0].name);
  //       }
  //     } else {
  //       e.target.value = null;
  //       Swal.fire(
  //         "Oops !",
  //         "Data yang bisa dimasukkan hanya berupa data PDF.",
  //         "error"
  //       );
  //     }
  //   }
  // };
  const handleSubmit = e => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      const data = {
        nik,
        name,
        jenis_kelamin: kelamin.label || kelamin,
        agama: agama.label || agama,
        tempat_lahir: tempatLahir,
        tanggal_lahir: tanggalLahir,
        hubungan: hubunganUrgent,
        nama_kontak_darurat: nameUrgent,
        nomor_handphone_darurat: nomorUrgent,
        file_ktp: ktp,
        nomorHandphone,
        email,
      };

      dispatch(updateProfileDataPribadi(data, token));
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

  const handleInfoEdit = () => {
    if (localStorage.getItem("viewEdit") === "false") {
      funcViewEdit(false);
    }
    funcViewEdit(false);
  };

  const today = new Date();
  const [dd, setdd] = useState(today.getDate());
  const [mm, setmm] = useState(today.getMonth() + 1); //January is 0 so need to add 1 to make it 1!
  const [yyyy, setyyyy] = useState(today.getFullYear());

  useEffect(() => {
    if (dd < 10) {
      setdd((dd = "0" + dd));
    }
    if (mm < 10) {
      setmm((mm = "0" + mm));
    }
  }, [dd, mm]);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="informasi-pribadi">
          <h3 className="font-weight-bolder mb-5">Informasi Pribadi</h3>

          <Row className="mb-3">
            <Form.Group as={Col} md={6}>
              <Form.Label className={style.label}>Nama Lengkap</Form.Label>
              <Form.Control
                className={style.formControl}
                placeholder="Masukan Nama Lengkap"
                value={name}
                onChange={e => setName(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("nama lengkap")
                }
              />
              {simpleValidator.current.message(
                "nama lengkap",
                name,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
            <Form.Group as={Col} md={6}>
              <Form.Label className={style.label}>Email</Form.Label>
              <Form.Control
                className={style.formControl}
                disabled
                type="email"
                placeholder="Masukan Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={() => simpleValidator.current.showMessageFor("email")}
              />
              {simpleValidator.current.message("email", email, "required", {
                className: "text-danger",
              })}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md={6} controlId="formGridNik">
              <Form.Label className={style.label}>NIK</Form.Label>
              <Form.Control
                className={style.formControl}
                disabled
                type="text"
                placeholder="Masukan NIK"
                value={nik}
                onChange={e => setNik(e.target.value)}
                onBlur={() => simpleValidator.current.showMessageFor("nik")}
              />
              {simpleValidator.current.message("nik", nik, "required|integer", {
                className: "text-danger",
              })}
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="formGridKelamin">
              <Form.Label className={style.label}>Jenis Kelamin</Form.Label>
              <Select
                className={style.formControl}
                placeholder={`${
                  kelamin === "" ? "Silahkan Pilih Jenis Kelamin" : kelamin
                }`}
                options={optionsKelamin}
                defaultValue={{ value: kelamin, label: kelamin }}
                onChange={e => setKelamin({ label: e.label, value: e.value })}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("jenis kelamin")
                }
              />
              {simpleValidator.current.message(
                "jenis kelamin",
                kelamin,
                kelamin === null ? "required" : "",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md={6} controlId="formGridPassword">
              <Form.Label className={style.label}>Nomor Handphone</Form.Label>
              <Form.Control
                className={style.formControl}
                disabled
                type="text"
                placeholder="Masukan Nomor Handphone"
                value={nomorHandphone}
                onChange={e => setNomorHandphone(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("nomor handphone")
                }
              />
              {simpleValidator.current.message(
                "nomor handphone",
                nomorHandphone,
                "required|integer",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="formGridAgama">
              <Form.Label className={style.label}>Agama</Form.Label>
              <Select
                className={style.formControl}
                placeholder={`${
                  agama === "" ? "Silahkan Pilih Agama" : dataPribadi?.agama
                }`}
                options={optionsAgama}
                defaultValue={{ value: agama, label: agama }}
                onChange={e => setAgama({ label: e.label, value: e.value })}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("jenis kelamin")
                }
              />

              {simpleValidator.current.message("agama", agama, "required", {
                className: "text-danger",
              })}
            </Form.Group>
          </Row>
          <Form.Group className="mb-3"></Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} md={6}>
              <Form.Label className={style.label}>Tempat Lahir</Form.Label>
              <Form.Control
                className={style.formControl}
                type="text"
                placeholder="Masukan Tempat Lahir"
                value={tempatLahir}
                onChange={e => setTempatLahir(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("tempat lahir")
                }
              />

              {simpleValidator.current.message(
                "templat lahir",
                tempatLahir,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>

            <Form.Group as={Col} md={6} controlId="formGridPassword">
              <Form.Label className={style.label}>Tanggal lahir</Form.Label>
              <Form.Control
                className={style.formControl}
                type="date"
                value={tanggalLahir}
                onChange={e => setTanggalLahir(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("tanggal lahir")
                }
                max={yyyy - 1 + "-" + mm + "-" + dd}
              />
              {simpleValidator.current.message(
                "tanggal lahir",
                tanggalLahir,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
          </Row>
          <hr className={style.hr} />
        </div>
        <div className="kontak-darurat mt-6">
          <h3 className="font-weight-bolder mb-5">Kontak Darurat</h3>
          <Form.Group className="mb-3">
            <Form.Label>Nama Lengkap</Form.Label>
            <Form.Control
              className={style.formControl}
              placeholder="Masukan Nama Lengkap"
              value={nameUrgent}
              onChange={e => setNameUrgent(e.target.value)}
              onBlur={() =>
                simpleValidator.current.showMessageFor("nama lengkap darurat")
              }
            />
            {simpleValidator.current.message(
              "nama lengkap darurat",
              nameUrgent,
              "required",
              {
                className: "text-danger",
              }
            )}
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} md={6}>
              <Form.Label>Nomor Handphone</Form.Label>
              <Form.Control
                className={style.formControl}
                type="text"
                placeholder="Masukan Nomor Handphone"
                value={nomorUrgent}
                onChange={e => {
                  if (
                    e.target.value === "" ||
                    helperRegexNumber.test(e.target.value)
                  ) {
                    setNomorUrgent(e.target.value);
                  }
                }}
                onBlur={() =>
                  simpleValidator.current.showMessageFor(
                    "nomor handphone darurat"
                  )
                }
                maxLength="14"
              />
              {simpleValidator.current.message(
                "nomor handphone darurat",
                nomorUrgent,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>

            <Form.Group as={Col} md={6} controlId="formGridKelamin">
              <Form.Label>Hubungan</Form.Label>
              <Form.Control
                className={style.formControl}
                type="text"
                placeholder="Masukan Hubungan"
                value={hubunganUrgent}
                onChange={e => setHubunganUrgent(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("hubungan darurat")
                }
              />
              {simpleValidator.current.message(
                "hubungan darurat",
                hubunganUrgent,
                "required",
                {
                  className: "text-danger",
                }
              )}
            </Form.Group>
          </Row>
          <hr className={style.hr} />
        </div>
        <div className="unggah-berkas-pribadi mt-6">
          <h3 className="font-weight-bolder">Upload Berkas Pribadi</h3>
          <div className="form-group mb-1">
            <label className="col-form-label">KTP</label>
            <div className="d-flex">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  name="question_image"
                  accept="image/png, image/jpeg , image/jpg ,application/pdf"
                  onChange={onChangeKtp}
                  onBlur={() => simpleValidator.current.showMessageFor("ktp")}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  {ktpName.split("/ktp/")}
                </label>
                <label style={{ marginTop: "15px" }}>
                  {simpleValidator.current.message(
                    "ktp",
                    ktpName || ktp,
                    "required",
                    {
                      className: "text-danger",
                    }
                  )}
                </label>
              </div>
            </div>
            <small className="text-muted">
              * JPG/PNG/PDF (Maksimal ukuran file 2 MB)
            </small>
          </div>
          {/* <div className="form-group mb-5">
            <label className="col-form-label">CV</label>
            <div className="d-flex">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  name="question_image"
                  accept="application/pdf"
                  onChange={onChangeCV}
                  onBlur={() => simpleValidator.current.showMessageFor("cv")}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  {cvName}
                </label>
                <label style={{ marginTop: "15px" }}>
                  {simpleValidator.current.message("cv", cv, "required", {
                    className: "text-danger",
                  })}
                </label>
              </div>
            </div>
            <small className="text-muted">
              * PDF (Maksimal ukuran file 2 MB)
            </small>
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Link Portofolio</Form.Label>
            <Form.Control
              placeholder="Belum Ada link porfofolio"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              onBlur={() =>
                simpleValidator.current.showMessageFor("link portofolio")
              }
            />
            {simpleValidator.current.message(
              "link portofolio",
              link,
              "required",
              {
                className: "text-danger",
              }
            )}
          </Form.Group> */}
          {!wizzard ? (
            <div className="button-aksi mt-5 float-right">
              <Button
                className={`${style.button_profile_batal} rounded-xl mr-2`}
                type="button"
                onClick={() => handleInfoEdit()}
              >
                Batal
              </Button>
              <Button
                className={`${style.button_profile_simpan} rounded-xl`}
                type="submit"
              >
                Simpan
              </Button>
            </div>
          ) : (
            <div className="button-aksi mt-5 float-right">
              <Button
                className={`${style.button_profile_simpan} rounded-xl`}
                type="submit"
              >
                Lanjut
              </Button>
            </div>
          )}
        </div>
      </Form>
    </>
  );
};

export default InformasiEdit;
