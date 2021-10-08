import React, { useEffect, useState, useRef } from "react";

import { useRouter } from "next/router";

import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import {
  updateTheme,
  clearErrors,
} from "../../../../redux/actions/pelatihan/theme.actions";

import { UPDATE_THEME_RESET } from "../../../../redux/types/pelatihan/theme.type";

import PageWrapper from "../../../wrapper/page.wrapper";
import LoadingPage from "../../../LoadingPage";

const EditTheme = ({ token }) => {
  const editorRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();

  const { id } = router.query;

  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor, Base64UploadAdapter } =
    editorRef.current || {};

  const {
    loading: detailLoading,
    error: detailError,
    theme,
  } = useSelector((state) => state.detailTheme);

  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateTheme
  );

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const [name, setName] = useState(theme.name);
  const [academy, setAcademy] = useState({
    value: theme.akademi_id,
    label: theme.akademi,
  });
  const [description, setDescription] = useState(theme.deskripsi);

  const [status, setStatus] = useState(
    theme.status === "0"
      ? { value: "0", label: "Unpublish" }
      : { value: "1", label: "Publish" }
  );

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const optionsStatus = [
    { value: "1", label: "Publish" },
    { value: "0", label: "Unpublish" },
  ];

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
      // Base64UploadAdapter: require('@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter')
    };

    setEditorLoaded(true);

    if (isUpdated) {
      dispatch({
        type: UPDATE_THEME_RESET,
      });
      router.push({
        pathname: `/pelatihan/tema`,
        query: { success: true },
      });
    }
  }, [isUpdated]);

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      // const statusString = (status.value += "");
      const idInt = parseInt(id);
      const data = {
        name,
        deskripsi: description,
        status: status.value,
        akademi_id: academy.value,
        id: idInt,
      };
      dispatch(updateTheme(data, token));
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
    <PageWrapper>
      {error && (
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
      )}
      <div className="col-lg-12 order-1 px-0">
        {loading && <LoadingPage loading={loading} />}
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header mt-3">
            <h2
              className="card-title text-dark mt-2"
              style={{ fontSize: "24px" }}
            >
              Edit Tema
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
                  placeholder="Silahkan Masukan Nama Tema"
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
                <Select
                  options={optionsStatus}
                  defaultValue={status}
                  onChange={(e) =>
                    setStatus({ value: e.value, label: e.label })
                  }
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

export default EditTheme;
