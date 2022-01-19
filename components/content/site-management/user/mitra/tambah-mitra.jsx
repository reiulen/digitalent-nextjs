import React, { useState, useEffect, useRef, useCallback } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import PageWrapper from "../../../../wrapper/page.wrapper";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import ReactCrop from "react-image-crop";
import IconClose from "../../../../../components/assets/icon/Close";

import { postMitraSite } from "../../../../../redux/actions/site-management/user/mitra-site.actions";

import styles from "../../../../../styles/sitemanagement/userMitra.module.css"
import styles2 from "../../../../../styles/previewGaleri.module.css"
import Cookies from 'js-cookie'

const TambahApi = ({ token }) => {
  const router = useRouter();
  const [nameCooperation, setNameCooperation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [agency_logo, setAgencyLogo] = useState("");
  const [gambarPreview, setGambarPreview] = useState(
    "/assets/media/default.jpg"
  );
  const [gambarName, setGambarName] = useState(null);

  const imgRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 9 / 9 });
  const [showEditImage, setShowEditImage] = useState(false);
  const [upImg, setUpImg] = useState();
  const [imageview, setImageview] = useState("");
  const defaultImage = "/assets/media/default.jpg";
  const previewCanvasRef = useRef(null);
  const [completedCrop, setCompletedCrop] = useState(null);

  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);

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
    var input = document.getElementById("confirm-input-password");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      if (nameCooperation === "") {
        Swal.fire("Oops...", "Form Nama Lembaga tidak boleh kosong", "error");
      } else if (email === "") {
        Swal.fire("Oops...", "Form Email tidak boleh kosong", "error");
      } else if (password === "") {
        Swal.fire("Oops...", "Form Password tidak boleh kosong", "error");
      } else if (confirmPassword === "") {
        Swal.fire(
          "Oops...",
          "Form Konfirmasi Password tidak boleh kosong",
          "error"
        );
      } else if (status === "") {
        Swal.fire("Oops...", "Form Status tidak boleh kosong", "error");
      } else {
        let formData = new FormData();
        formData.append("name", nameCooperation);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("password_confirmation", confirmPassword);
        formData.append("status", status);
        formData.append("agency_logo", agency_logo);
        try {
          let { data } = await axios.post(
            `${process.env.END_POINT_API_SITE_MANAGEMENT}api/user-mitra/store`,
            formData,
            {
              headers: {
                authorization: `Bearer ${token}`,
                "Permission" : Cookies.get("token_permission")
              },
            }
          );
          Swal.fire("Berhasil", "Data berhasil disimpan", "success").then(
            () => {
              router.push(`/site-management/user/mitra/`);
            }
          );
        } catch (error) {
          Swal.fire("Oops...", `${error.response.data.message}`, "error");
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

  const onChangeGambar = (e) => {
    const type = ["image/jpg", "image/png", "image/jpeg"];

    if (type.includes(e.target.files[0].type)) {
      if (e.target.files[0].size > "2000000") {
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
      Swal.fire("Oops !", "Thumbnail harus berupa data gambar.", "error");
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

  const onHandleHideModal = () => {
    setShowEditImage(false);
    setUpImg(null);
  };

  const onSubmitEditImage = () => {
    setShowEditImage(false);
    setUpImg(null);
    setAgencyLogo(previewCanvasRef.current.toDataURL("image/png"));
  };

  const onSelectFile = (e) => {
    if (e.target.files[0].size > "2000000") {
      e.target.value = null;
      Swal.fire("Oops !", "Data Image Melebihi Ketentuan", "error");
    } else if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header">
            <h3 className="card-title font-weight-bolder text-dark">
              Tambah Mitra
            </h3>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Nama Lembaga</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Masukkan nama lengkap"
                  onChange={(e) => setNameCooperation(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("namaLengkap")
                  }
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

              <div className="form-group mb-0 mb-sm-4">
                <label htmlFor="staticEmail" className="col-form-label">
                  Gambar Logo
                </label>

                {!agency_logo ? (
                  <div className="ml-0 row">
                    <figure
                      className="avatar item-rtl position-relative"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                    >
                      <Image
                        src={
                          imageview
                            ? process.env.END_POINT_API_IMAGE_PARTNERSHIP +
                              imageview
                            : defaultImage
                        }
                        alt="image"
                        width={160}
                        height={160}
                        objectFit="fill"
                        className={imageview ? "rounded-circle" : ""}
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
                ) : (
                  <div className="ml-0 row">
                    <figure
                      className="avatar item-rtl position-relative shadow-sm rounded-circle"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                    >
                      <Image
                        src={agency_logo}
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
                )}

                {agency_logo && imageview ? (
                  <button
                    className="btn btn-primary btn-sm my-3 mr-3"
                    type="button"
                    onClick={() => setAgencyLogo("")}
                  >
                    Batal ubah
                  </button>
                ) : (
                  ""
                )}
              </div>

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
                        Logo Gambar
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
                      {!agency_logo ? (
                        <Image
                          src={
                            process.env.END_POINT_API_IMAGE_PARTNERSHIP +
                            imageview
                          }
                          alt="Picture of the author"
                          layout="fill"
                          objectFit="fill"
                        />
                      ) : (
                        <Image
                          src={agency_logo}
                          alt="Picture of the author"
                          layout="fill"
                          objectFit="fill"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="position-relative">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="input-password"
                    className={`${styles.passwordWord} form-control`}
                    placeholder="Masukkan password"
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("password")
                    }
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

                  {simpleValidator.current.message(
                    "password",
                    password,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
                <p className={`${styles.notes}`} style={{ color: "#b7b5cf" }}>
                  Min. 8 Karakter
                  <br />
                  Min. 1 Uppercase dan 1 Lowercase (Case Sensitivity)
                  <br />
                  Min. 1 Simbol dan 1 Angka
                </p>
              </div>

              <div className="form-group mb-2">
                <label>Konfirmasi Password</label>
                <div className="position-relative">
                  <input
                    id="confirm-input-password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    className={`${styles.passwordWord} form-control`}
                    placeholder="Masukkan konfirmasi password"
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("confirmPassword")
                    }
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

                  {simpleValidator.current.message(
                    "confirmPassword",
                    confirmPassword,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  className="form-control"
                  onChange={(e) => setStatus(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("status")
                  }
                >
                  <option value="">Pilih status</option>
                  <option value="1">Aktif</option>
                  <option value="0">Tidak Aktif</option>
                </select>

                {simpleValidator.current.message("status", status, "required", {
                  className: "text-danger",
                })}
              </div>
            </form>
            <div className="form-group row mt-8">
              <div className="col-sm-12 d-flex justify-content-end">
                <Link href="/site-management/user/mitra" passHref>
                  <a
                    className={`${styles.btnKembali} btn btn-white-ghost-rounded-full rounded-pill mr-2`}
                  >
                    Kembali
                  </a>
                </Link>
                <button
                  type="button"
                  onClick={(e) => submit(e)}
                  className={`${styles.btnSimpan} btn btn-primary-rounded-full rounded-pill`}
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
          <div>Logo Lembaga</div>

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
                {upImg ? (
                  <div>
                    <div>Pratinjau</div>
                    <canvas
                      ref={previewCanvasRef}
                      style={{
                        width: Math.round(completedCrop?.width ?? 0),
                        height: Math.round(completedCrop?.height ?? 0),
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                ) : null}
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
