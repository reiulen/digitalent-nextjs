import React, { useEffect, useState, useRef } from "react";

import { useRouter } from "next/router";

import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import PageWrapper from "../../../../wrapper/page.wrapper";
import StepInputPelatihan from "../../../../StepInputPelatihan";
import LoadingPage from "../../../../LoadingPage";

import { putTrainingStep3 } from "../../../../../redux/actions/pelatihan/training.actions";
import Cookies from "js-cookie";

const EditCommitmentStep3 = ({ token }) => {
  const editorRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const token_permission = Cookies.get("token_permission");

  const { data: getEditTraining3 } = useSelector(
    (state) => state.getEditTraining3
  );

  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor, Base64UploadAdapter } =
    editorRef.current || {};

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const [commitment, setCommitment] = useState(getEditTraining3.komitmen);
  const [description, setDescription] = useState(getEditTraining3.deskripsi);

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
    if (commitment !== "1") {
      simpleValidator.current.fields.deskripsi = true;
    }
    if (simpleValidator.current.allValid()) {
      const data = {
        Pelatian_id: parseInt(router.query.id),
        komitmen: commitment,
        deskripsi: commitment === "1" ? description : "",
      };
      dispatch(putTrainingStep3(token, data, token_permission));
      router.push("/pelatihan/pelatihan");
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tolong isi data dengan benar !",
      });
    }
  };

  const viewBackHandler = () => {
    if (commitment !== "1") {
      simpleValidator.current.fields.deskripsi = true;
    }
    if (simpleValidator.current.allValid()) {
      const data = {
        Pelatian_id: parseInt(router.query.id),
        komitmen: commitment,
        deskripsi: commitment === "1" ? description : "",
      };
      dispatch(putTrainingStep3(token, data, token_permission));
      router.back();
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tolong isi data dengan benar !",
      });
    }
  };

  return (
    <PageWrapper>
      <StepInputPelatihan
        step={3}
        title1="Edit Pelatihan"
        title2="Edit Form Pendaftaran"
        title3="Edit Form Komitmen"
      />
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-body py-4">
            <form onSubmit={submitHandler}>
              <h3 className="font-weight-bolder pb-5 pt-4">Form Komitmen</h3>
              <div className="form-group row mb-4">
                <label className="col-form-label font-weight-bold col-sm-2">
                  Komitmen Peserta
                </label>
                <div className="col-sm-10 my-auto">
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      name="commitment"
                      className="form-check-input"
                      value="1"
                      checked={commitment === "1"}
                      onClick={() => setCommitment("1")}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("komitmen")
                      }
                    />
                    <label className="form-check-label">Ya</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      name="commitment"
                      value="0"
                      className="form-check-input"
                      checked={commitment === "0"}
                      onClick={() => {
                        setCommitment("0");
                        setDescription("");
                      }}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("komitmen")
                      }
                    />
                    <label className="form-check-label">Tidak</label>
                  </div>
                  {simpleValidator.current.message(
                    "komitmen",
                    commitment,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>
              {commitment === "1" && (
                <div className="form-group mb-4">
                  <label className="col-form-label font-weight-bold">
                    Input Deskripsi
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
                        }}
                        config={{
                          placeholder: "Silahkan Masukan Deskripsi Detail",
                        }}
                      />
                    ) : (
                      <p>Tunggu Sebentar</p>
                    )}
                  </div>
                  {/* <textarea
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("deskripsi")
                    }
                    rows="10"
                  /> */}
                  {simpleValidator.current.message(
                    "deskripsi",
                    description,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              )}
              <div className="form-group">
                <div className="text-right">
                  <button
                    className="btn btn-light-ghost-rounded-full mr-2"
                    type="button"
                    onClick={() => router.back()}
                  >
                    Kembali
                  </button>
                  <button
                    className="btn btn-primary-rounded-full"
                    type="submit"
                  >
                    Simpan & Lanjut
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

export default EditCommitmentStep3;
