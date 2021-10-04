import React, { useEffect, useState, useRef } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import PageWrapper from "../../../wrapper/page.wrapper";
import {
  newAcademy,
  clearErrors,
} from "../../../../redux/actions/pelatihan/academy.actions";
import { NEW_ACADEMY_RESET } from "../../../../redux/types/pelatihan/academy.type";
import LoadingPage from "../../../LoadingPage";

const AddAcademy = ({ token }) => {
  const editorRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();

  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor, Base64UploadAdapter } =
    editorRef.current || {};

  const { loading, error, success, academy } = useSelector(
    (state) => state.newAcademy
  );

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const [logoPreview, setLogoPreview] = useState("/assets/media/default.jpg");
  const [logoFile, setLogoFile] = useState("");
  const [logoName, setLogoName] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [browsurName, setBrowsurName] = useState("Belum ada file");
  const [browsurFile, setBrowsurFile] = useState("");
  const [brosurPreview, setBrowsurPreview] = useState("");
  const [status, setStatus] = useState();

  const optionsStatus = [
    { value: 1, label: "Publish" },
    { value: 0, label: "Unpublish" },
  ];

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
      // Base64UploadAdapter: require('@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter')
    };

    setEditorLoaded(true);

    if (success) {
      dispatch({
        type: NEW_ACADEMY_RESET,
      });
      router.push({
        pathname: `/pelatihan/akademi`,
        query: { success: true },
      });
    }
  }, [success]);

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  const onChangeLogo = (e) => {
    const type = ["image/jpg", "image/png", "image/jpeg"];
    if (e.target.files[0]) {
      if (type.includes(e.target.files[0].type)) {
        if (e.target.files[0].size > 5000000) {
          e.target.value = null;
          Swal.fire("Oops !", "Gambar maksimal 5 MB.", "error");
        } else {
          setLogoFile(e.target.files[0]);
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              setLogoPreview(reader.result);
            }
          };
          reader.readAsDataURL(e.target.files[0]);
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

  const onDeleteLogo = () => {
    setLogoFile("");
    setLogoPreview("/assets/media/default.jpg");
    setLogoName("");
  };

  const onChangeBrowsur = (e) => {
    const type = ["image/jpg", "image/png", "image/jpeg", "application/pdf"];
    if (e.target.files[0]) {
      if (type.includes(e.target.files[0].type)) {
        if (e.target.files[0].size > 10000000) {
          e.target.value = null;
          Swal.fire("Oops !", "Gambar maksimal 5 MB.", "error");
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              setBrowsurPreview(reader.result);
            }
          };
          reader.readAsDataURL(e.target.files[0]);
          setBrowsurFile(e.target.files[0]);
          setBrowsurName(e.target.files[0].name);
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

  const onDeleteBrowsur = () => {
    setBrowsurFile("");
    setBrowsurName("Belum ada file");
    setBrowsurPreview("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      let statusString = toString(status);
      const data = {
        name,
        deskripsi: description,
        logo: logoPreview,
        brosur: brosurPreview,
        status: statusString,
      };
      dispatch(newAcademy(data, token));
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

  return (
    <PageWrapper>
      {error ? (
        <div
          className="alert alert-custom alert-light-danger fade show mb-5"
          role="alert"
        >
          <div className="alert-icon">
            <i className="flaticon-warning"></i>
          </div>
          <div className="alert-text">{error}</div>
          <div className="alert-close">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={handleResetError}
            >
              <span aria-hidden="true">
                <i className="ki ki-close"></i>
              </span>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="col-lg-12 order-1 px-0">
        {loading ? <LoadingPage loading={loading} /> : ""}
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header mt-3">
            <h2
              className="card-title text-dark mt-2"
              style={{ fontSize: "24px" }}
            >
              Tambah Akademi
            </h2>
          </div>

          <div className="card-body py-4">
            <form onSubmit={submitHandler}>
              <div className="form-group mb-4">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label font-weight-bold"
                >
                  Logo Akademi
                </label>
                <div className="ml-3 row">
                  <figure
                    className="avatar item-rtl position-relative"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                    <Image
                      src={logoPreview}
                      alt="image"
                      width={160}
                      height={160}
                      objectFit="cover"
                    />
                    <div className="circle-top" onClick={onDeleteLogo}>
                      <i className="ri-delete-bin-fill text-dark"></i>
                    </div>
                  </figure>
                  <div className="position-relative">
                    <label className="circle-bottom" htmlFor="inputGroupFile05">
                      <i className="ri-pencil-fill text-dark"></i>
                    </label>
                    <input
                      type="file"
                      name="gambar"
                      className="custom-file-input"
                      id="inputGroupFile05"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={onChangeLogo}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("logo")
                      }
                    />
                  </div>
                </div>
                <div className="ml-3">
                  {simpleValidator.current.message(
                    "logo",
                    logoFile,
                    "required",
                    { className: "text-danger" }
                  )}
                  {logoName !== null ? (
                    <small className="text-muted">{logoName}</small>
                  ) : null}
                </div>
                <div className="mt-3 col-sm-3 text-muted">
                  <p>
                    Format Image(.png) & <br /> Maksimal 5MB
                  </p>
                </div>
              </div>

              <div className="form-group mb-4">
                <label className="col-form-label font-weight-bold">
                  Nama Akademi
                </label>
                <input
                  type="text"
                  placeholder="Silahkan Masukan Nama Akademi"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("nama akademi")
                  }
                />
                {simpleValidator.current.message(
                  "nama akademi",
                  name,
                  "required",
                  { className: "text-danger" }
                )}
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

              <div className="form-group mb-3">
                <label className="col-form-label font-weight-bold">
                  Upload Browsur (Optional)
                </label>
                <div className="d-flex">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      name="question_image"
                      accept="image/png, image/jpeg , image/jpg ,application/pdf"
                      onChange={onChangeBrowsur}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      {browsurName}
                    </label>
                  </div>
                  <button
                    className="btn btn-link-action bg-danger text-white ml-3"
                    type="button"
                    onClick={onDeleteBrowsur}
                  >
                    <i className="ri-delete-bin-fill p-0 text-white"></i>
                  </button>
                </div>
                <small className="text-muted">
                  Format File (.png/.jpg/.pdf) & Max 10 mb
                </small>
              </div>

              <div className="form-group">
                <label className="col-form-label font-weight-bold">
                  Status
                </label>
                <Select
                  options={optionsStatus}
                  defaultValue={status}
                  onChange={(e) => setStatus(e.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("status")
                  }
                />
                {simpleValidator.current.message("status", status, "required", {
                  className: "text-danger",
                })}
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

export default AddAcademy;
