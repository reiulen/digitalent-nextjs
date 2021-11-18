import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import IconAdd from "../../../assets/icon/Add";
import IconDelete from "../../../assets/icon/Delete";
import Select from "react-select";
import SimpleReactValidator from "simple-react-validator";

const Tambah = ({ token }) => {
  const router = useRouter();
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  let selectRefDataReference = null;

  const [nameReference, setNameReference] = useState("");
  const [status, setStatus] = useState("");
  const [idReference, setIdReference] = useState("");
  const [optionReference, setOptionReference] = useState([]);
  const [optionFromReference, setOptionFromReference] = useState([]);
  const [formReferenceAndText, setFormReferenceAndText] = useState([
    {
      relasi_id: "",
      value: [
        {
          label: "",
        },
      ],
      values: [],
    },
  ]);

  const [nameListFromReference, setNameListFromReference] = useState("");

  const changeListDataReference = (e) => {
    setFormReferenceAndText([
      {
        relasi_id: "",
        value: [
          {
            label: "",
          },
        ],
        values: [],
      },
    ]);
    setIdReference(e.key);
    setNameListFromReference(e.value);
  };

  const handleAddInput = (idx, index) => {
    let _temp = [...formReferenceAndText];
    _temp.map((items, ids) => {
      if (ids === idx) {
        items.value.push({
          label: "",
        });
      }
    });

    setFormReferenceAndText(_temp);
  };

  const handleDelete = (parent, child) => {
    let _temp = [...formReferenceAndText];

    if (child === 0) {
      let resultTemp = _temp.filter((items, idz) => idz !== parent);
      setFormReferenceAndText(resultTemp);
    } else {
      _temp.map((items, ids) => {
        if (ids === parent) {
          items.value = items.value.filter((itemx, inc) => inc !== child);
        }
      });
      setFormReferenceAndText(_temp);
    }
  };

  const handleAddFormReferenceText = () => {
    let _temp = [...formReferenceAndText];
    _temp.push({
      relasi_id: "",
      value: [
        {
          label: "",
        },
      ],
      values: [],
    });

    setFormReferenceAndText(_temp);
  };

  const handleCHangeNameReference = (e, index) => {
    let _tempOption = [...optionFromReference];
    let _newTempOption = _tempOption.filter((items) => items.label !== e.label);
    setOptionFromReference(_newTempOption);
    let _temp = [...formReferenceAndText];

    _temp[index].relasi_id = e.id;
    _temp[index].values = [e];

    setFormReferenceAndText(_temp);
  };

  const handleChangeTextForm = (e, idx, index) => {
    let _temp = [...formReferenceAndText];

    _temp[idx].value[index].label = e.target.value;

    setFormReferenceAndText(_temp);
  };

  const [labelReference, setLabeReferencel] = useState("");
  const handleInputChange = (e) => {
    setLabeReferencel(e);
  };

  const submit = async (e) => {
    e.preventDefault();

    let sendData = {
      name: nameReference,
      status: status,
      data_references_relasi_id: idReference,
      data: formReferenceAndText,
    };

    try {
      let { data } = await axios.post(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/reference/store-relasi`,
        sendData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire("Berhasil", "Data berhasil disimpan", "success").then(() => {
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
  };

  useEffect(() => {
    async function getAllDataReference(token) {
      try {
        let { data } = await axios.get(
          `${process.env.END_POINT_API_SITE_MANAGEMENT}api/option/reference`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        let resultOptionReference = data.data.map((items) => {
          return { ...items, label: items.value };
        });
        setOptionReference(resultOptionReference);
      } catch (error) {
        notify(error.response.data.message);
      }
    }

    getAllDataReference(token);

    if (idReference || labelReference.length > 3) {
      async function getAllDataFromIdReference(token, id) {
        try {
          let { data } = await axios.get(
            `${process.env.END_POINT_API_SITE_MANAGEMENT}api/option/reference-choose/${id}?keyword=${labelReference}`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          let resultOptionReferenceChooce = data.data.map((items) => {
            return { ...items, label: items.label, value: items.label };
          });
          setOptionFromReference(resultOptionReferenceChooce);
        } catch (error) {
          notify(error.response.data.message);
        }
      }

      getAllDataFromIdReference(token, idReference);
    }
  }, [token, idReference, labelReference]);

  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark titles-1 mb-0">
              Tambah Reference Dengan Relasi
            </h3>
          </div>
          <form onSubmit={submit}>
            <div className="card-body pt-0 px-4 px-sm-8">
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Nama Data Reference
                </label>
                <input
                  placeholder="Masukkan nama reference"
                  type="text"
                  className="form-control"
                  onChange={(e) => setNameReference(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("nameReference")
                  }
                />
                {simpleValidator.current.message(
                  "nameReference",
                  nameReference,
                  "required",
                  { className: "text-danger" }
                )}
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  className="form-control"
                  onChange={(e) => setStatus(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("status")
                  }
                >
                  <option value="">Pilih status</option>
                  <option value="1">Aktif</option>
                  <option value="0">Tidak Aktif</option>
                </select>
                {simpleValidator.current.message("status", status, "required", {
                  className: "text-danger",
                })}
              </div>
              <div className="form-group">
                <label>Pilih Data Reference</label>

                <Select
                  ref={(ref) => (selectRefDataReference = ref)}
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Pilih data reference"
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={true}
                  name="color"
                  onChange={(e) => changeListDataReference(e)}
                  options={optionReference}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("Data reference")
                  }
                />
                {simpleValidator.current.message(
                  "Data reference",
                  idReference,
                  "required",
                  { className: "text-danger" }
                )}
              </div>

              {/*  */}
              {formReferenceAndText.map((itemsRef, idx) => {
                return (
                  <div className="row" key={idx}>
                    <div className="col-12 col-sm-6">
                      <div className="form-group mt-4">
                        <label>List {nameListFromReference}</label>

                        <Select
                          value={itemsRef.values}
                          className="basic-single"
                          classNamePrefix="select"
                          placeholder={`Pilih ${nameListFromReference}`}
                          isDisabled={false}
                          isLoading={false}
                          isClearable={false}
                          isRtl={false}
                          isSearchable={true}
                          name="color"
                          onInputChange={handleInputChange}
                          onChange={(e) => handleCHangeNameReference(e, idx)}
                          options={optionFromReference}
                          onBlur={() =>
                            simpleValidator.current.showMessageFor(
                              "nameListFromReference"
                            )
                          }
                        />
                        {simpleValidator.current.message(
                          "nameListFromReference",
                          itemsRef.values,
                          "required",
                          { className: "text-danger" }
                        )}
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      {/* start loop */}

                      {itemsRef.value.map((items, index) => {
                        return (
                          <div className="form-group mt-12" key={index}>
                            <div className="position-relative d-flex align-items-start w-100">
                              <div className="w-100 mr-6">
                                <input
                                  value={items.label}
                                  type="text"
                                  className="form-control"
                                  placeholder="Masukkan data value"
                                  onChange={(e) =>
                                    handleChangeTextForm(e, idx, index)
                                  }
                                  onBlur={() =>
                                    simpleValidator.current.showMessageFor(
                                      "value"
                                    )
                                  }
                                />
                              </div>

                              <div className="d-flex align-items-center">
                                <button
                                  type="button"
                                  className="btn mr-4"
                                  style={{ backgroundColor: "#04AA77" }}
                                  onClick={() => handleAddInput(idx, index)}
                                >
                                  <IconAdd />
                                </button>
                                {index === 0 && idx === 0 ? (
                                  ""
                                ) : (
                                  <button
                                    type="button"
                                    className="btn"
                                    style={{ backgroundColor: "#EE2D41" }}
                                    onClick={() => handleDelete(idx, index)}
                                  >
                                    <IconDelete />
                                  </button>
                                )}
                              </div>
                            </div>
                            {simpleValidator.current.message(
                              "value",
                              items.label,
                              "required",
                              { className: "text-danger" }
                            )}
                          </div>
                        );
                      })}

                      {/* end loop */}
                    </div>
                  </div>
                );
              })}

              <div className="d-flex align-items-center justify-content-end">
                <div className="form-group">
                  <label
                    htmlFor="staticEmail"
                    className="col-form-label"
                  ></label>

                  <p
                    className="btn btn-rounded-full bg-blue-secondary text-white"
                    style={{
                      backgroundColor: "#40A9FF",
                      color: "#FFFFFF",
                      width: "max-content",
                    }}
                    onClick={() => handleAddFormReferenceText()}
                  >
                    <IconAdd className="mr-3" width="14" height="14" />
                    Tambah Relasi
                  </p>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/site-management/reference">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
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
