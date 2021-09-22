import React, { useEffect, useState, useRef } from "react";

import { useRouter } from "next/router";

import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import PageWrapper from "../../../wrapper/page.wrapper";
import LoadingPage from "../../../LoadingPage";

const AddTheme = () => {
  const editorRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();

  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor, Base64UploadAdapter } =
    editorRef.current || {};

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const [name, setName] = useState("");
  const [academy, setAcademy] = useState("");
  const [description, setDescription] = useState("");

  const [status, setStatus] = useState();

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
        academy,
        name,
        description,
        status,
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

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header mt-3">
            <h2
              className="card-title text-dark mt-2"
              style={{ fontSize: "24px" }}
            >
              Tambah Tema
            </h2>
          </div>

          <div className="card-body py-4">
            <form onSubmit={submitHandler}>
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
                <label className="col-form-label font-weight-bold">
                  Nama Tema
                </label>
                <input
                  type="text"
                  placeholder="placeholder"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("nama tema")
                  }
                />
                {simpleValidator.current.message(
                  "nama tema",
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

              <div className="form-group">
                <label className="col-form-label font-weight-bold">
                  Status
                </label>
                <select
                  value={status}
                  onBlur={(e) => {
                    setStatus(e.target.value);
                    simpleValidator.current.showMessageFor("status");
                  }}
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-control"
                >
                  <option value="" disabled selected>
                    -- PILIH STATUS --
                  </option>
                  <option value={1}>Publish</option>
                  <option value={0}>Unpublish</option>
                </select>
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

export default AddTheme;
