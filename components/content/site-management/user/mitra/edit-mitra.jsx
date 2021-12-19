import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import { Modal } from "react-bootstrap";
import ReactCrop from "react-image-crop";
import IconClose from "../../../../../components/assets/icon/Close";

import styles from "../../../../../styles/sitemanagement/userMitra.module.css"
import styles2 from "../../../../../styles/previewGaleri.module.css"

const TambahApi = ({ token, id }) => {
  const router = useRouter();
  let dispatch = useDispatch();

  const { mitaSite } = useSelector((state) => state.detailMitraSite);

  const [nameCooperation, setNameCooperation] = useState(mitaSite?.institution_name);
  const [email, setEmail] = useState(mitaSite?.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState(mitaSite?.status);

  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);
  const [agency_logoNew, setAgencyLogoNew] = useState("");
  // const [imageview, setImageview] = useState(
  //   process.env.END_POINT_API_IMAGE_PARTNERSHIP + mitaSite?.agency_logo
  // );
  const [agency_logo, setAgencyLogo] = useState(
    process.env.END_POINT_API_IMAGE_PARTNERSHIP + mitaSite?.agency_logo
  );

  const [gambarPreview, setGambarPreview] = useState(
    process.env.END_POINT_API_IMAGE_PARTNERSHIP + mitaSite?.agency_logo
  );

  const [gambarName, setGambarName] = useState(mitaSite?.agency_logo.split("/")[3]);

  const imgRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 9 / 9 });
  const [showEditImage, setShowEditImage] = useState(false)
  const [upImg, setUpImg] = useState();
  const [imageview, setImageview] = useState("");
  const defaultImage = "/assets/media/default.jpg"
  const previewCanvasRef = useRef(null);
  const [completedCrop, setCompletedCrop] = useState(null);

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const handlerShowPassword = (value) => {
    setHidePassword(value);
    var input = document.getElementById("input-password");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };

  const handlerShowPasswordConfirm = (value) => {
    setHidePasswordConfirm(value);
    var input = document.getElementById("input-password-confirm");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };

  const onChangeGambar = e => {
    const type = ["image/jpg", "image/png", "image/jpeg"];

    if (type.includes(e.target.files[0].type)) {
      if (e.target.files[0].size > '2000000') {
        e.target.value = null;
        Swal.fire("Oops !", "Data Image Melebihi Ketentuan", "error");
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAgencyLogo(reader.result);
            setGambarPreview(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
        setGambarName(e.target.files[0].name);
      }
    } else {
      e.target.value = null;
      Swal.fire(
        "Oops !",
        "Data yang bisa dimasukkan hanya berupa data gambar.",
        "error"
      );
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {

      if (nameCooperation === "") {
        Swal.fire(
          "Gagal simpan",
          "Form Nama Lembaga tidak boleh kosong",
          "error"
        );
      } else if (email === "") {
        Swal.fire("Gagal simpan", "Form Email tidak boleh kosong", "error");
      }
      else if (status === "") {
        Swal.fire("Gagal simpan", "Form Status tidak boleh kosong", "error");
      } else {
        let formData = new FormData();
        formData.append("name", nameCooperation);
        formData.append("email", email);


        if (password && confirmPassword) {
          formData.append("password", password);
          formData.append("password_confirmation", confirmPassword);
        }

        formData.append("agency_logo", agency_logoNew);
        formData.append("status", status);
        formData.append("_method", "put");
        try {
          let { data } = await axios.post(
            `${process.env.END_POINT_API_SITE_MANAGEMENT}api/user-mitra/update/${router.query.id}`,
            formData,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          Swal.fire("Berhasil", "Data berhasil disimpan", "success").then(() => {
            router.push(`/site-management/user/mitra/`);
          });
        } catch (error) {
          Swal.fire("Gagal simpan", `${error.response.data.message}`, "error");
        }
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
  };

  const onSelectFile = (e) => {
    if (e.target.files[0].size > '2000000') {
      e.target.value = null;
      Swal.fire("Oops !", "Data Image Melebihi Ketentuan", "error");
    } else if (e.target.files && e.target.files.length > 0) {
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

  useEffect(() => {

  }, [dispatch])

  const onHandleHideModal = () => {
    setShowEditImage(false)
    setUpImg(null)
  }

  const onSubmitEditImage = () => {
    setShowEditImage(false)
    setUpImg(null)
    setAgencyLogoNew(previewCanvasRef.current.toDataURL("image/png"))
  }

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header">
            <h3
              className="card-title font-weight-bolder text-dark"
            >
              Edit Mitra
            </h3>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Nama Lembaga</label>
                <input
                  value={nameCooperation}
                  type="text"
                  className="form-control"
                  placeholder="Masukkan nama lengkap"
                  onChange={(e) => setNameCooperation(e.target.value)}
                  onBlur={() => simpleValidator.current.showMessageFor("namaLengkap")}
                />

                {simpleValidator.current.message(
                  "namaLengkap",
                  nameCooperation,
                  "required",
                  { className: "text-danger" }
                )}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email && email}
                  type="email"
                  className="form-control"
                  placeholder="mitra@gmail.com"
                  onBlur={() => simpleValidator.current.showMessageFor("email")}
                />


                {simpleValidator.current.message(
                  "email",
                  email,
                  "required|email",
                  { className: "text-danger" }
                )}
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Gambar Logo
                </label>
                {/* ketika ada upload gambar baru */}
                <div className="ml-0 row">
                  <figure
                    className="avatar item-rtl position-relative shadow-sm rounded-circle"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                    <Image
                      src={
                        agency_logoNew === "" ? agency_logo :
                          agency_logoNew
                      }
                      alt="image"
                      width={160}
                      height={160}
                      objectFit="fill"
                      className="rounded-circle"
                    />
                  </figure>

                  <div className="position-relative">
                    <label
                      className="circle-top"
                      onClick={() => setShowEditImage(true)}
                    >
                      <i className="ri-add-line text-dark"></i>
                    </label>
                  </div>
                </div>

                {agency_logoNew !== "" ? (
                  <button
                    className="btn btn-primary btn-sm my-3 mr-3"
                    type="button"
                    onClick={() => setAgencyLogoNew("")}
                  >
                    Batal ubah
                  </button>
                ) : (
                  ""
                )}

                {/* modal view image */}
                <div
                  className="modal fade"
                  id="exampleModalCenter"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalCenterTitle"
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">
                          Gambar Logo
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <IconClose />
                        </button>
                      </div>

                      <div
                        className="modal-body text-left p-0"
                        style={{ height: "400px" }}
                      >
                        {agency_logo ? (
                          <div
                            className="w-100 h-100 position-relative"
                            style={{ padding: "6px" }}
                          >
                            <Image
                              src={agency_logo}
                              alt="images"
                              layout="fill"
                              objectFit="fill"
                            />
                          </div>
                        ) : (
                          <div
                            className="w-100 h-100 position-relative"
                            style={{ padding: "6px" }}
                          >
                            <Image
                              src={
                                process.env.END_POINT_API_IMAGE_PARTNERSHIP +
                                imageview
                              }
                              alt="images"
                              layout="fill"
                              objectFit="fill"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="position-relative">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    id="input-password"
                    type="password"
                    className={`${styles.passwordWord} form-control`}
                    placeholder="Masukkan password"
                    // onBlur={() => simpleValidator.current.showMessageFor("password")}
                  />

                  {hidePassword === true ? (
                    <i
                      className={`${styles.iconHide} ri-eye-fill right-center-absolute cursor-pointer`}
                      onClick={() => handlerShowPassword(false)}
                    />
                  ) : (
                    <i
                      className={`${styles.iconHide} ri-eye-off-fill right-center-absolute cursor-pointer`}
                      onClick={() => handlerShowPassword(true)}
                    />
                  )}

                  {/* {simpleValidator.current.message(
                    "password",
                    password,
                    "required",
                    { className: "text-danger" }
                  )} */}
                </div>
                <p className={`${styles.notes}`} style={{ color: "#b7b5cf" }}>
                  Min 8 Karakter,<br />
                  Case Sensitivity (min t.d 1 Uppercase, 1 lowercase)<br />
                  Min 1 Simbol dan angka
                </p>
              </div>
              <div className="form-group">
                <label>Konfirmasi Password</label>
                <div className="position-relative">
                  <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id="input-password-confirm"
                    type="password"
                    className={`${styles.passwordWord} form-control`}
                    placeholder="Masukkan password konfirmasi"
                    // onBlur={() => simpleValidator.current.showMessageFor("confirmPassword")}
                  />

                  {hidePasswordConfirm === true ? (
                    <i
                      className={`${styles.iconHide} ri-eye-fill right-center-absolute cursor-pointer`}
                      onClick={() => handlerShowPasswordConfirm(false)}
                    />
                  ) : (
                    <i
                      className={`${styles.iconHide} ri-eye-off-fill right-center-absolute cursor-pointer`}
                      onClick={() => handlerShowPasswordConfirm(true)}
                    />
                  )}

                  {/* {simpleValidator.current.message(
                    "confirmPassword",
                    confirmPassword,
                    "required",
                    { className: "text-danger" }
                  )} */}
                </div>
              </div>
              <div className="form-group">
                <label>Status</label>
                {mitaSite.status == 1 ? (
                  <select
                    className="form-control"
                    onChange={(e) => setStatus(e.target.value)}
                    onBlur={() => simpleValidator.current.showMessageFor("status")}
                  >
                    <option value="1">Aktif</option>
                    <option value="0">Tidak Aktif</option>
                  </select>
                ) : (
                  <select
                    className="form-control"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="0">Tidak Aktif</option>
                    <option value="1">Aktif</option>
                  </select>
                )}

                {simpleValidator.current.message(
                  "status",
                  status,
                  "required",
                  { className: "text-danger" }
                )}
              </div>
            </form>
            <div className="form-group row">
              <div className="col-sm-12 d-flex justify-content-end">
                <Link href="/site-management/user/mitra" passHref>
                  <a className={`${styles.btnKembali} btn btn-white-ghost-rounded-full rounded-pill mr-2`}>
                    Kembali
                  </a>
                </Link>
                <button
                  type="button"
                  className={`${styles.btnSimpan} btn btn-primary-rounded-full rounded-pill`}
                  onClick={(e) => submit(e)}
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Edit Image  */}
      <Modal
        show={showEditImage}
        onHide={() => onHandleHideModal()}
        centered
      // dialogClassName="mx-10 mx-sm-auto rounded-lg"
      >
        <Modal.Header>
          <Modal.Title>Ganti Logo Lembaga</Modal.Title>

          <button
            type="button"
            className="close"
            onClick={() => onHandleHideModal()}
          >
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>

        </Modal.Header>

        <Modal.Body>
          <div>
            Logo Lembaga
          </div>

          <div className="my-5">
            <button
              className="btn btn-rounded-full btn-sm bg-blue-primary text-white d-flex justify-content-center"
              onClick={() => {
                document.getElementById("edit-image").click();
              }}
            >
              <i className="ri-upload-2-fill text-white"></i> Pilih Logo Lembaga
            </button>

            <input
              type="file"
              name="gambar"
              className="custom-file-input"
              id="edit-image"
              accept="image/*"
              style={{ display: "none" }}
              onChange={onSelectFile}
            />

            <div className="row mt-5">
              <div className="col-12 col-md-6">
                <ReactCrop
                  src={upImg}
                  onImageLoaded={onLoad}
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                />
              </div>

              <div className="col-12 col-md-6">
                {
                  upImg ?
                    <div>
                      <div>
                        Pratinjau
                      </div>
                      <canvas
                        ref={previewCanvasRef}
                        style={{
                          width: Math.round(completedCrop?.width ?? 0),
                          height: Math.round(completedCrop?.height ?? 0),
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    :
                    null
                }
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <div className="row">
            <div className="d-flex justify-content-between align-items-center">
              <button
                className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5 d-flex justify-content-center"
                onClick={() => onHandleHideModal()}
              >
                Batal
              </button>
              <button
                className="btn btn-sm btn-rounded-full bg-blue-primary text-white d-flex justify-content-center"
                onClick={() => onSubmitEditImage()}
              >
                Simpan
              </button>
            </div>
          </div>
        </Modal.Footer>

      </Modal>
      {/* End of Modal Edit Image */}
    </PageWrapper>
  );
};

export default TambahApi;
