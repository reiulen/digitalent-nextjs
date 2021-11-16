import React, { useEffect, useState, useRef } from "react";

import { useRouter } from "next/router";

import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  getCommitmentStep3,
  storeCommitmentStep3,
} from "../../../../../redux/actions/pelatihan/function.actions";
import { newTrainingStep1 } from "../../../../../redux/actions/pelatihan/training.actions";
import { NEW_TRAINING_STEP1_RESET } from "../../../../../redux/types/pelatihan/training.type";

import PageWrapper from "../../../../wrapper/page.wrapper";
import StepInputPelatihan from "../../../../StepInputPelatihan";
import LoadingPage from "../../../../LoadingPage";

const AddCommitmentStep3 = ({ propsStep, token }) => {
  const editorRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();

  const { trainingData } = useSelector((state) => state.trainingStep1);
  const { registrationData } = useSelector((state) => state.registrationStep2);
  const { commitmentData } = useSelector((state) => state.commitmentStep3);
  const { training, loading, success, error } = useSelector(
    (state) => state.newTraining
  );

  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor, Base64UploadAdapter } =
    editorRef.current || {};

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const [commitment, setCommitment] = useState(commitmentData.komitmen);
  const [description, setDescription] = useState(commitmentData.deskripsi);

  useEffect(() => {
    dispatch(getCommitmentStep3());

    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
      // Base64UploadAdapter: require('@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter')
    };

    if (success) {
      dispatch({
        type: NEW_TRAINING_STEP1_RESET,
      });
      router.push({
        pathname: `/pelatihan/pelatihan`,
        query: { success: true },
      });
    }

    setEditorLoaded(true);
  }, [dispatch, success, router]);

  const backHandler = () => {
    const data = {
      komitmen: commitment,
      deskripsi: description,
    };
    dispatch(storeCommitmentStep3(data));
    propsStep(2);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      const dataStep3 = {
        komitmen: commitment,
        deskripsi_komitmen: description,
      };
      dispatch(storeCommitmentStep3(dataStep3));
      const data = {
        ...trainingData,
        ...registrationData,
        ...dataStep3,
      };
      data.akademi_id = data.akademi_id.value;
      data.tema_id = data.tema_id.value;
      data.kuota_pendaftar = parseInt(data.kuota_pendaftar);
      data.kuota_peserta = parseInt(data.kuota_peserta);
      data.batch = data.batch.toString();
      data.kabupaten = data.kabupaten.label && data.kabupaten.label;
      data.level_pelatihan =
        data.level_pelatihan.label && data.level_pelatihan.label;
      data.mitra = data.mitra.value && data.mitra.value + "";
      data.penyelenggara = data.penyelenggara.label && data.penyelenggara.label;
      data.provinsi = data.provinsi.label && data.provinsi.label;
      data.zonasi_id = data.zonasi_id.label && data.zonasi_id.label;
      data.tuna_daksa = data.tuna_daksa ? "1" : "0";
      data.tuna_netra = data.tuna_netra ? "1" : "0";
      data.tuna_rungu = data.tuna_rungu ? "1" : "0";
      data.umum = data.umum ? "1" : "0";
      data.ketentuan_peserta = data.ketentuan_peserta ? "1" : "0";
      data.pendaftaran_mulai = moment(data.pendaftaran_mulai).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      data.pendaftaran_selesai = moment(data.pendaftaran_selesai).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      data.pelatihan_mulai = moment(data.pelatihan_mulai).format("YYYY-MM-DD HH:mm:ss");
      data.pelatihan_selesai = moment(data.pelatihan_selesai).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      dispatch(newTrainingStep1(data, token));
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
    <>
      {loading && <LoadingPage loading={loading} />}
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
            {commitment === "1" ? (
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
              </div>
            ) : (
              ""
            )}
            <div className="form-group">
              <div className="text-right">
                <button
                  className="btn btn-light-ghost-rounded-full mr-2"
                  type="button"
                  onClick={backHandler}
                >
                  Kembali
                </button>
                <button className="btn btn-primary-rounded-full" type="submit">
                  Simpan & Lanjut
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCommitmentStep3;
