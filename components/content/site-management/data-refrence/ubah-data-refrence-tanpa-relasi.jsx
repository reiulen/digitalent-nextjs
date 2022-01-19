import React, { useState, useRef } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import IconAdd from "../../../assets/icon/Add";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

import SimpleReactValidator from "simple-react-validator";

const Tambah = ({ token }) => {
  const router = useRouter();
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const detailDataReference = useSelector((state) => state.detailDataReference);

  const [nameReference, setNameReference] = useState(
    detailDataReference.dataReference.name
  );
  const [status, setStatus] = useState(
    detailDataReference.dataReference.status
  );
  const [values, setValues] = useState(
    detailDataReference.dataReference.value_reference.map((items) => {
      return { ...items, value_old: items.value };
    })
  );
  const [formInput, setFormInput] = useState(
    detailDataReference.dataReference.value_reference.map((items) => {
      return { value_old: items.value, value: items.value };
    })
  );

  const handleAdd = () => {
    let _temp = [...values];
    let _tempValue = [...formInput];
    _temp.push({
      value: "",
    });
    _tempValue.push({
      value_old: "",
      value: "",
    });
    setValues(_temp);
    setFormInput(_tempValue);
  };

  const handleChange = (e, index) => {
    let _temp = [...values];
    let _tempValue = [...formInput];

    _tempValue[index].value = e.target.value;

    _temp[index].value = e.target.value;

    _tempValue[index].value = e.target.value;

    setFormInput(_tempValue);
    setValues(_temp);
  };

  const handleRemove = (index) => {
    let _temp = [...values];
    let _tempValue = [...formInput];

    let resultTemp = _temp.filter((items, idx) => idx !== index);
    let resultTempValue = _tempValue.filter((items, idx) => idx !== index);

    setValues(resultTemp);
    setFormInput(resultTempValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("id", router.query.id);
    formData.append("name", nameReference);
    formData.append("status", status);

    formInput.forEach((element, index) => {
      if (!element.value_old.length) {
        element.value_old = values[index].value;
      }
    });

    formInput.forEach((element, i) => {
      formData.append(`value_old[${i}]`, element.value_old);
    });

    formInput.forEach((element, i) => {
      formData.append(`value[${i}]`, element.value);
    });

    try {
      let { data } = await axios.post(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/reference/update`,
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            Permission: Cookies.get("token_permission"),
          },
        }
      );

      Swal.fire("Berhasil", "Data berhasil diubah", "success").then(() => {
        router.push("/site-management/reference");
      });
    } catch (error) {
      simpleValidator.current.showMessages();
      forceUpdate(1);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi data dengan benar !",
      });
    }
    // }
  };

  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark titles-1 mb-0">
              Ubah Reference Tanpa Relasi
            </h3>
          </div>
          <form>
            <div className="card-body pt-0 px-4 px-sm-8">
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Nama Data Reference
                </label>
                <input
                  placeholder="Masukkan nama reference"
                  type="text"
                  className="form-control"
                  value={nameReference}
                  onChange={(e) => setNameReference(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor(
                      "nama data reference"
                    )
                  }
                />
                {simpleValidator.current.message(
                  "nama data reference",
                  nameReference,
                  "required",
                  { className: "text-danger" }
                )}
              </div>
              <div className="form-group">
                <label>Status</label>
                {detailDataReference.dataReference.status == 1 ? (
                  <select
                    onChange={(e) => setStatus(e.target.value)}
                    className="form-control"
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("status")
                    }
                  >
                    <option value="1">Aktif</option>
                    <option value="0">Tidak Aktif</option>
                  </select>
                ) : (
                  <select
                    onChange={(e) => setStatus(e.target.value)}
                    className="form-control"
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("status")
                    }
                  >
                    <option value="0">Tidak Aktif</option>
                    <option value="1">Aktif</option>
                  </select>
                )}
                {simpleValidator.current.message("status", status, "required", {
                  className: "text-danger",
                })}
              </div>

              {values.map((items, index) => {
                return (
                  <div className="form-group" key={index}>
                    <label htmlFor="staticEmail" className="col-form-label">
                      Value {index + 1}
                      {/* {items.name} */}
                    </label>
                    <div className="position-relative d-flex align-items-center">
                      <input
                        placeholder="Masukkan value"
                        type="text"
                        value={items.value}
                        onChange={(e) => handleChange(e, index)}
                        className="form-control mr-6"
                        onBlur={() =>
                          simpleValidator.current.showMessageFor("Value")
                        }
                      />
                      {index == 0 ? (
                        ""
                      ) : (
                        <button
                          type="button"
                          className="btn"
                          style={{ backgroundColor: "#EE2D41" }}
                          onClick={() => handleRemove(index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                          >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path
                              d="M17 4h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5V2h10v2zM9 9v8h2V9H9zm4 0v8h2V9h-2z"
                              fill="rgba(255,255,255,1)"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                    {simpleValidator.current.message(
                      "Value",
                      items.value,
                      "required",
                      { className: "text-danger" }
                    )}
                  </div>
                );
              })}

              <div className="d-flex align-items-center justify-content-end">
                <div className="form-group">
                  <label className="col-form-label"></label>

                  <p
                    className="btn btn-rounded-full bg-blue-secondary text-white"
                    style={{
                      backgroundColor: "#40A9FF",
                      color: "#FFFFFF",
                      width: "max-content",
                    }}
                    onClick={() => handleAdd()}
                  >
                    <IconAdd className="mr-3" width="14" height="14" />
                    Tambah Value
                  </p>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/site-management/reference/">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link>
                  <button
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Tambah;
