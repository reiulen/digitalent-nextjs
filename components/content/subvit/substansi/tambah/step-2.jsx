import React, { useState, useEffect } from "react";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import {
  newArtikel,
  clearErrors,
} from "/redux/actions/publikasi/artikel.actions";
import { NEW_ARTIKEL_RESET } from "/redux/types/publikasi/artikel.type";
import { useRouter } from "next/router";

import PageWrapper from "/components/wrapper/page.wrapper";
import StepInput from "/components/StepInput";
import Image from "next/image";

const StepTwo = () => {
  const dispatch = useDispatch();
  const importSwitch = () => import("bootstrap-switch-button-react");
  const SwitchButton = dynamic(importSwitch, {
    ssr: false,
  });
  const router = useRouter();

  const saveAndContinue = () => {
    router.push("/subvit/substansi/tambah/step-3");
  };

  const saveDraft = () => {
    router.push("/subvit/substansi");
  };

  const { loading, error, success } = useSelector((state) => state.newArtikel);

  useEffect(() => {
    // if (error) {
    //     dispatch(clearErrors())
    // }

    if (success) {
      dispatch({
        type: NEW_ARTIKEL_RESET,
      });
    }
  }, [dispatch, error, success]);

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [answerKey, setAnswerKey] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
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
      <div className="col-lg-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <StepInput step="2"></StepInput>
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">Soal 1</h3>
          </div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="form-group row">
                <div className="col-sm-12 col-md-8">
                  <span>Pertanyaan</span>
                  <input type="text" className="form-control" />
                  <span className="text-muted">Silahkan Input Pertanyaan</span>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 col-md-8">
                  <div class="custom-file">
                    <span>Gambar Pertanyaan (Opsional)</span>
                    <input type="file" class="custom-file-input" />
                    <label class="custom-file-label" for="customFile">
                      Choose file
                    </label>
                  </div>
                  <span className="text-muted">Silahkan Input Pertanyaan</span>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-4">
                  <p>Jawaban</p>
                </div>
                <div className="col-4">
                  <p>Input Gambar (Opsional)</p>
                </div>
                <div className="col-4">
                  <p>Kunci Jawaban Yang Benar</p>
                </div>
                <div className="col-sm-12 col-md-4">
                  <input type="text" className="form-control" placeholder="A" />
                  <span className="text-muted">Silahkan Pilihan A</span>
                </div>
                <div className="col-sm-12 col-md-3">
                  <div class="custom-file">
                    <input type="file" class="custom-file-input" />
                    <label class="custom-file-label" for="customFile">
                      Choose file
                    </label>
                  </div>
                  <span className="text-muted">Input Gambar (Opsional)</span>
                </div>
                <div className="col-sm-12 col-md-1">
                  <button className="btn mr-1">
                    <Image
                      alt="button-action"
                      src="/assets/icon/trash-red.svg"
                      width={18}
                      height={18}
                    />
                  </button>
                </div>
                <div className="col-sm-12 col-md-4">
                  <SwitchButton
                    checked={answerKey}
                    onlabel=" "
                    onstyle="primary"
                    offlabel=" "
                    offstyle="danger"
                    size="sm"
                    width={20}
                    height={10}
                    onChange={(checked) => setAnswerKey(checked)}
                  />
                  <span className="text-muted">
                    Silahkan pilih kunci jawaban yang benar
                  </span>
                </div>

                <div className="col-sm-12 col-md-4">
                  <input type="text" className="form-control" placeholder="B" />
                  <span className="text-muted">Silahkan Pilihan B</span>
                </div>
                <div className="col-sm-12 col-md-3">
                  <div class="custom-file">
                    <input type="file" class="custom-file-input" />
                    <label class="custom-file-label" for="customFile">
                      Choose file
                    </label>
                  </div>
                  <span className="text-muted">Input Gambar (Opsional)</span>
                </div>
                <div className="col-sm-12 col-md-1">
                  <button className="btn mr-1">
                    <Image
                      alt="button-action"
                      src="/assets/icon/trash-red.svg"
                      width={18}
                      height={18}
                    />
                  </button>
                </div>
                <div className="col-sm-12 col-md-4">
                  <SwitchButton
                    checked={answerKey}
                    onlabel=" "
                    onstyle="primary"
                    offlabel=" "
                    offstyle="danger"
                    size="sm"
                    width={20}
                    height={10}
                    onChange={(checked) => setAnswerKey(checked)}
                  />
                  <span className="text-muted">
                    Silahkan pilih kunci jawaban yang benar
                  </span>
                </div>

                <div className="col-sm-12 col-md-4">
                  <input type="text" className="form-control" placeholder="C" />
                  <span className="text-muted">Silahkan Pilihan C</span>
                </div>
                <div className="col-sm-12 col-md-3">
                  <div class="custom-file">
                    <input type="file" class="custom-file-input" />
                    <label class="custom-file-label" for="customFile">
                      Choose file
                    </label>
                  </div>
                  <span className="text-muted">Input Gambar (Opsional)</span>
                </div>
                <div className="col-sm-12 col-md-1">
                  <button className="btn mr-1">
                    <Image
                      alt="button-action"
                      src="/assets/icon/trash-red.svg"
                      width={18}
                      height={18}
                    />
                  </button>
                </div>
                <div className="col-sm-12 col-md-4">
                  <SwitchButton
                    checked={answerKey}
                    onlabel=" "
                    onstyle="primary"
                    offlabel=" "
                    offstyle="danger"
                    size="sm"
                    width={20}
                    height={10}
                    onChange={(checked) => setAnswerKey(checked)}
                  />
                  <span className="text-muted">
                    Silahkan pilih kunci jawaban yang benar
                  </span>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-6 col-md-2">
                  <button className="btn btn-primary">Tambah Jawaban</button>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 col-md-8">
                  <span>Tipe Soal</span>
                  <select
                    name="training_id"
                    id=""
                    onChange={(e) => setRole(e.target.value)}
                    className="form-control"
                  >
                    <option value="1"> Ingatan </option>
                    <option value="1"> Analitik </option>
                  </select>
                  <span className="text-muted">Silahkan Pilih Tipe Soal</span>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-2"></div>
                <div className="col-sm-10 text-right">
                  <button
                    className="btn btn-light-primary btn-sm mr-2"
                    onClick={saveAndContinue}
                  >
                    Simpan & Lanjut
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={saveDraft}
                  >
                    Simpan Draft
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

export default StepTwo;
