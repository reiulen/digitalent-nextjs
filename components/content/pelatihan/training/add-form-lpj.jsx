import React, { useEffect, useState, useRef } from "react";

import { useRouter } from "next/router";

import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch, useSelector } from "react-redux";

import PageWrapper from "../../../wrapper/page.wrapper";
import LoadingPage from "../../../LoadingPage";

const AddFormLpj = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const [formLpj, setFormLpj] = useState([{ key: 1, name: "" }]);

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  const handleInputForm = (value, index) => {
    let list = [...formLpj];
    list[index]["name"] = value;

    setFormLpj(list);
  };

  const handleDeleteForm = (index) => {
    const list = [...formLpj];
    list.splice(index, 1);
    setFormLpj(list);
  };

  const handleAddForm = () => {
    let newKey = 1;
    if (formLpj.length > 0) {
      newKey = formLpj[formLpj.length - 1].key + 1;
    }
    setFormLpj([...formLpj, { key: newKey, name: "" }]);
  };

  const submitHandler = (e) => {
    console.log(formLpj);
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
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
              Tambah Form LPJ
            </h2>
          </div>

          <div className="card-body py-4">
            <form onSubmit={submitHandler}>
              {formLpj.map((row, i) => (
                <div className="row" key={i}>
                  <div className="form-group col-md-1 col-sm-1">
                    <label className="col-form-label font-weight-bold">
                      No
                    </label>
                    <input
                      type="text"
                      className="form-control-plaintext disabled readonly"
                      value={row.key}
                    />
                  </div>
                  <div className="form-group col-md-10 col-sm-10 mb-0 pb-0">
                    <label className="col-form-label font-weight-bold">
                      Nama Field
                    </label>
                    <input
                      type="text"
                      placeholder="Masukan Nama Field"
                      className="form-control mb-0"
                      value={row.name}
                      onChange={(e) => handleInputForm(e.target.value, i)}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor(
                          `nama field ${i + 1}`
                        )
                      }
                    />
                    {simpleValidator.current.message(
                      `nama field ${i + 1}`,
                      row.name,
                      "required",
                      { className: "text-danger" }
                    )}
                  </div>
                  <div className="form-group col-md-1 col-sm-1 d-flex align-items-end">
                    <button
                      className="btn btn-link-action bg-danger text-white"
                      type="button"
                      onClick={() => handleDeleteForm(i)}
                    >
                      <i className="ri-delete-bin-fill p-0 text-white"></i>
                    </button>
                  </div>
                </div>
              ))}
              <div className="row">
                <div className="ml-auto mb-5 mt-4">
                  <button
                    className="btn btn-primary-rounded-full text-white"
                    type="button"
                    onClick={handleAddForm}
                  >
                    <i className="ri-pencil-fill text-white"></i> Tambah Field
                  </button>
                </div>
              </div>

              <div className="form-group my-5 pb-5">
                <div className="float-right mb-5">
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

export default AddFormLpj;
