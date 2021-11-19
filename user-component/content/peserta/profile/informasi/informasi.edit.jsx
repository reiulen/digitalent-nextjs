import React, { useState, useRef, useEffect, useCallback } from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
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
import ReactCrop from "react-image-crop";
import { getDataPribadi } from "../../../../../redux/actions/pelatihan/function.actions";
import axios from "axios";

const InformasiEdit = ({ funcViewEdit, token, wizzard, setIndex }) => {
  const dispatch = useDispatch();
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const { error: errorDataPribadi, dataPribadi } = useSelector(
    (state) => state.getDataPribadi
  );

  const {
    error: errorUpdateData,
    loading,
    success,
  } = useSelector((state) => state.updateDataPribadi);
  const { error: errorAgama, data: dataAgama } = useSelector(
    (state) => state.drowpdownAgama
  );

  const { error: errorTempatLahir, data: dataTempatLahir } = useSelector(
    (state) => state.drowpdownTempatLahir.data
  );
  let optionsTempatLahir = [];

  dataTempatLahir.list_signatures.map((item) => {
    return optionsTempatLahir.push({ label: item.label, value: item.id });
  });

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
    (dataPribadi && dataPribadi.tempat_lahir) || null
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

  const onChangeKtp = (e) => {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      const data = {
        nik,
        name,
        jenis_kelamin: kelamin.label || kelamin,
        agama: agama.label || agama,
        tempat_lahir: tempatLahir.label || tempatLahir,
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

  const [showUpdateGambar, setShowUpdateGambar] = useState(false);
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 9 / 9 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  const generateImage = async (canvas, crop) => {
    if (!crop || !canvas) {
      return;
    }

    const base64Image = canvas.toDataURL("image/jpeg");

    const data = {
      foto: base64Image,
    };

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    await axios
      .post(
        process.env.END_POINT_API_PELATIHAN + "api/v1/auth/update-foto",
        data,
        config
      )
      .then((res) => {
        setShowUpdateGambar(false);
        toast.success("Berhasil Update");
        dispatch(getDataPribadi(token));
      })
      .catch((err) => {
        toast.error("gagal");
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="informasi-pribadi">
          <h3 className="font-weight-bolder mb-5">Informasi Pribadi</h3>

          <Row className="mb-3">
            {wizzard && (
              <>
                <Form.Group as={Col} md={12}>
                  <Form.Label className={style.label}>Foto Profil</Form.Label>
                  <div>
                    <figure
                      className="avatar item-rtl position-relative"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                      style={{ width: "max-content" }}
                    >
                      <img
                        alt=""
                        className={`${style.image_profile_wrapper} position-relative`}
                        src={`${
                          dataPribadi && dataPribadi.foto
                            ? dataPribadi.file_path + dataPribadi.foto
                            : "/assets/media/logos/default.png"
                        }`}
                        width={90}
                        height={90}
                        // objectFit="cover"
                      />
                      <div
                        className="position-absolute"
                        style={{ right: "10px" }}
                        onClick={() => setShowUpdateGambar(true)}
                      >
                        <label
                          className={`circle-bottom ${style.btn_edit_triger}`}
                        >
                          <i className="ri-pencil-fill text-white"></i>
                        </label>
                      </div>
                    </figure>
                  </div>
                </Form.Group>
                <Modal
                  show={showUpdateGambar}
                  onHide={() => setShowUpdateGambar(false)}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header>
                    <Modal.Title>Ganti Foto Profil</Modal.Title>
                    <button
                      type="button"
                      className="close"
                      onClick={() => setShowUpdateGambar(false)}
                    >
                      <i
                        className="ri-close-fill"
                        style={{ fontSize: "25px" }}
                      ></i>
                    </button>
                  </Modal.Header>
                  <Modal.Body>
                    <p>Foto</p>
                    <div>
                      {!completedCrop?.width || !completedCrop?.height ? (
                        <Button
                          className={`${style.button_profile_edit} rounded-xl `}
                          onClick={() => {
                            document.getElementById("update-foto").click();
                          }}
                        >
                          <i className="ri-upload-2-fill text-white"></i> Pilih
                          Foto
                        </Button>
                      ) : (
                        <Button
                          className={`${style.button_profile_wrapper} rounded-xl `}
                          onClick={() => {
                            document.getElementById("update-foto").click();
                          }}
                        >
                          <i className="ri-pencil-fill text-primary"></i> Ubah
                          Foto
                        </Button>
                      )}
                      <input
                        type="file"
                        name="gambar"
                        className="custom-file-input"
                        id="update-foto"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={onSelectFile}
                      />
                    </div>

                    <Row className="mt-5">
                      <Col md={6}>
                        <ReactCrop
                          src={upImg}
                          onImageLoaded={onLoad}
                          crop={crop}
                          onChange={(c) => setCrop(c)}
                          onComplete={(c) => setCompletedCrop(c)}
                        />
                      </Col>
                      <Col md={6}>
                        {upImg && (
                          <>
                            <p>Preview</p>
                            <canvas
                              ref={previewCanvasRef}
                              // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                              style={{
                                width: Math.round(completedCrop?.width ?? 0),
                                height: Math.round(completedCrop?.height ?? 0),
                                borderRadius: "50%",
                              }}
                            />
                          </>
                        )}
                      </Col>
                    </Row>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={() => setShowUpdateGambar(false)}
                      className={`${style.button_profile_batal} rounded-xl mr-3`}
                    >
                      Batal
                    </Button>
                    <Button
                      disabled={!completedCrop?.width || !completedCrop?.height}
                      onClick={() =>
                        generateImage(previewCanvasRef.current, completedCrop)
                      }
                      className={`${style.button_profile_edit} rounded-xl`}
                    >
                      Simpan
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            )}
            <Form.Group as={Col} md={6}>
              <Form.Label className={style.label}>Nama Lengkap</Form.Label>
              <Form.Control
                className={style.formControl}
                placeholder="Masukan Nama Lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setNik(e.target.value)}
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
                onChange={(e) => setKelamin({ label: e.label, value: e.value })}
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
                onChange={(e) => setNomorHandphone(e.target.value)}
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
                onChange={(e) => setAgama({ label: e.label, value: e.value })}
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
              {/* <Form.Control
                className={style.formControl}
                type="text"
                placeholder="Masukan Tempat Lahir"
                value={tempatLahir}
                onChange={(e) => setTempatLahir(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("tempat lahir")
                }
              /> */}
              <Select
                placeholder={
                  (dataPribadi && dataPribadi.tempat_lahir) === ""
                    ? "Silahkan Pilih Kecamatan"
                    : dataPribadi && dataPribadi.tempat_lahir
                }
                defaultValue={tempatLahir}
                options={optionsTempatLahir}
                onChange={(e) => {
                  setTempatLahir({ label: e?.label, value: e?.value });
                }}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("tempat lahir")
                }
              />

              {simpleValidator.current.message(
                "tempat lahir",
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
                onChange={(e) => setTanggalLahir(e.target.value)}
                onBlur={() =>
                  simpleValidator.current.showMessageFor("tanggal lahir")
                }
                max={moment().subtract(1, "year").format("YYYY-MM-DD")}
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
              onChange={(e) => setNameUrgent(e.target.value)}
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
                onChange={(e) => {
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
                onChange={(e) => setHubunganUrgent(e.target.value)}
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
