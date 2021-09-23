import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";

import {
  updatewSubtanceQuestionBanksType,
  clearErrors,
} from "../../../../../redux/actions/subvit/subtance-question-type.actions";
import { UPDATE_SUBTANCE_QUESTION_TYPE_RESET } from "../../../../../redux/types/subvit/subtance-question-type.type";

import PageWrapper from "/components/wrapper/page.wrapper";
import LoadingPage from "../../../../LoadingPage";

const EditTipeSoal = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateSubtanceQuestionType
  );
  const { subtance_question_type } = useSelector(
    (state) => state.detailSubtanceQuestionType
  );
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  let { id } = router.query;

  const [name, setName] = useState(subtance_question_type.name);
  const [value, setValue] = useState(subtance_question_type.value);
  const [status, setStatus] = useState(subtance_question_type.status);
  const [, forceUpdate] = useState();

  useEffect(() => {
    // if (error) {
    //     dispatch(clearErrors())
    // }

    if (isUpdated) {
      dispatch({
        type: UPDATE_SUBTANCE_QUESTION_TYPE_RESET,
      });
      router.push({
        pathname: `/subvit/substansi/tipe-soal`,
        query: { successUpdate: true },
      });
    }
  }, [dispatch, isUpdated, router]);

  const handleBack = () => {
    router.push("/subvit/substansi/tipe-soal");
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (simpleValidator.current.allValid()) {
      const data = {
        name,
        value,
        status,
        _method: "put",
      };

      dispatch(updatewSubtanceQuestionBanksType(id, data, token));
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
        {loading ? <LoadingPage loading={loading} /> : ""}
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h2 className="card-title h2 text-dark">Edit Tipe Soal</h2>
          </div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="form-group row">
                <div className="col-sm-12">
                  <span className="font-weight-bold">Tipe Soal</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="*Contoh: Analitik"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("tipe soal")
                    }
                  />
                  {simpleValidator.current.message(
                    "tipe soal",
                    name,
                    "required|max:50",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12">
                  <span className="font-weight-bold">Bobot Nilai</span>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="*Contoh: 2"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("bobot nilai")
                    }
                  />
                  {simpleValidator.current.message(
                    "bobot nilai",
                    value,
                    "required|integer",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12">
                  <span className="font-weight-bold">Status</span>
                  <select
                    name="status"
                    id=""
                    onChange={(e) => setStatus(e.target.value)}
                    onBlur={(e) => setStatus(e.target.value)}
                    className="form-control"
                  >
                    {status == false ? (
                      <>
                        <option value={false} selected>
                          {" "}
                          Draft{" "}
                        </option>
                        <option value={true}> Publish </option>
                      </>
                    ) : (
                      <>
                        <option value={true} selected>
                          Publish{" "}
                        </option>
                        <option value={false}>Draft </option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 text-right">
                  <button
                    className="btn btn-light-ghost-rounded-full mr-2"
                    onClick={handleBack}
                  >
                    Kembali
                  </button>
                  <button className="btn btn-primary-rounded-full">
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

export default EditTipeSoal;
