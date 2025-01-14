import React, { useEffect, useState, useRef } from "react";

import { useRouter } from "next/router";

import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch, useSelector } from "react-redux";

import PageWrapper from "../../../wrapper/page.wrapper";
import LoadingPage from "../../../LoadingPage";
import { postLpj } from "../../../../redux/actions/pelatihan/training.actions";
import Cookies from "js-cookie";

const AddFormLpj = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const token_permission = Cookies.get("token_permission");

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();
  const { data: getFormLPJ } = useSelector((state) => state.getFormLPJ);

  const [formLpj, setFormLpj] = useState(
    getFormLPJ.data.length > 0
      ? getFormLPJ.data.map((item, index) => {
          return {
            key: index + 1,
            name: item.name,
          };
        })
      : [{ key: 1, name: "" }]
  );

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
    list.forEach((row, i) => {
      let key = i + 1;
      list[i]["key"] = key;
    });
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
    e.preventDefault();
    let form = formLpj.map((item) => {
      return {
        name: item.name,
      };
    });
    const data = {
      pelatian_id: parseInt(router.query.id),
      data: form,
    };

    dispatch(postLpj(token, data, token_permission));
    // if (simpleValidator.current.allValid()) {
    // } else {
    //   simpleValidator.current.showMessages();
    //   forceUpdate(1);
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "Isi data dengan benar !",
    //   });
    // }
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
              <div className="d-flex justify-content-start align-items-center mb-5">
                <label className="col-form-label font-weight-bold">No</label>
                <label className="col-form-label font-weight-bold mx-md-10 mx-5">
                  Nama Field
                </label>
              </div>
              {formLpj.map((row, i) => (
                <div
                  className="d-flex justify-content-between align-items-center mb-5"
                  key={i}
                >
                  <div style={{ width: "20px" }}>{row.key}</div>
                  <div className="w-100 mx-md-10 mx-5">
                    <input
                      type="text"
                      placeholder="Masukan Nama Field"
                      className="form-control w-100"
                      value={row.name}
                      onChange={(e) => handleInputForm(e.target.value, i)}
                      maxLength={749}
                      required
                    />
                  </div>
                  <div className="">
                    <button
                      className={`btn btn-link-action bg-danger text-white ${
                        i === 0 && `invisible`
                      }`}
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
                    <i className="ri-add-fill text-white"></i> Tambah Field
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
