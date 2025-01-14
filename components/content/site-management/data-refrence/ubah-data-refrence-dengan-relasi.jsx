import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import IconAdd from "../../../assets/icon/Add";
import { useSelector } from "react-redux";
import Select from "react-select";
import SimpleReactValidator from "simple-react-validator";
import Cookies from 'js-cookie'

const Tambah = ({ token }) => {
  const router = useRouter();
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();
  let selectRefDataReference = null;
  const [labelReference, setLabeReferencel] = useState("");

  const detailDataReference = useSelector((state) => state.detailDataReference);

  const allOptionReferenceSite = useSelector(
    (state) => state.allOptionReferenceSite
  );
  let tempOptionsReference = allOptionReferenceSite?.data;

  const [defaultDataReference, setDefaultDataReference] = useState([
    detailDataReference.dataReference.data_reference,
  ]);

  const [nameReference, setNameReference] = useState(
    detailDataReference.dataReference.name
  );
  const [status, setStatus] = useState(
    detailDataReference.dataReference.status
  );
  // state provinsi for set in option provinsi
  const [referenceOption, setReferenceOption] = useState([]);
  const [idReference, setIdReference] = useState(
    detailDataReference.dataReference.data_references_relasi_id
  );
  const [nameListFromReference, setNameListFromReference] = useState("");
  const [optionFromReference, setOptionFromReference] = useState([]);
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

  const manipulate1 = detailDataReference.dataReference.valueReference.map(
    (items) => {
      return { ...items, value: { label: items.value, value: items.value } };
    }
  );
  const transformed = manipulate1.map(
    ({ data_references_id, relasi, value, relasi_id, id }) => ({
      value: relasi,
      data_references_relasi_id: data_references_id,
      relasi_id: id,
      label: value,
    })
  );
  const [formReferenceAndText, setFormReferenceAndText] = useState(
    transformed.map((items) => {
      return {
        ...items,
        values: items.label,
        value: items.value.map((itemx) => {
          return { ...itemx, label: itemx.value, label_old: itemx.value };
        }),
      };
    })
  );
  const [formReferenceAndTextValue, setFormReferenceAndTextValue] = useState(
    transformed.map((items) => {
      return {
        ...items,
        value: items.value.map((itemx) => {
          return { ...itemx, label: itemx.value, label_old: itemx.value };
        }),
      };
    })
  );

  const handleAddFormReferenceText = () => {
    let _temp = [...formReferenceAndText];
    let _tempValue = [...formReferenceAndTextValue];
    _temp.push({
      relasi_id: "",
      value: [
        {
          label_old: "",
          label: "",
          value: "",
        },
      ],
      values: [],
    });
    _tempValue.push({
      relasi_id: "",
      value: [
        {
          label_old: "",
          label: "",
          value: "",
        },
      ],
    });
    setFormReferenceAndText(_temp);
    setFormReferenceAndTextValue(_tempValue);
  };

  const handleAddInput = (idx, index) => {
    let _temp = [...formReferenceAndText];
    let _tempValue = [...formReferenceAndTextValue];
    _temp.map((items, ids) => {
      if (ids === idx) {
        items.value.push({
          label: "",
          label_old: "",
        });
      }
    });
    _tempValue.map((items, ids) => {
      if (ids === idx) {
        items.value.push({
          label: "",
          label_old: "",
        });
      }
    });

    setFormReferenceAndText(_temp);
    setFormReferenceAndTextValue(_tempValue);
  };

  const handleCHangeNameReference = (e, index) => {
    let _tempOption = [...optionFromReference];
    let _newTempOption = _tempOption.filter((items) => items.label !== e.label);
    setOptionFromReference(_newTempOption);
    let _temp = [...formReferenceAndText];
    let _tempValue = [...formReferenceAndTextValue];
    _temp[index].relasi_id = e.id;
    _temp[index].values = [e];
    _tempValue[index].relasi_id = e.id;
    setFormReferenceAndText(_temp);
    setFormReferenceAndTextValue(_tempValue);
  };

  const handleChangeTextForm = (e, idx, index) => {
    let _temp = [...formReferenceAndText];
    let _tempValue = [...formReferenceAndTextValue];

    _temp[idx].value[index].value = e.target.value;
    _temp[idx].value[index].label = e.target.value;

    _tempValue[idx].value[index].value = e.target.value;
    _tempValue[idx].value[index].label = e.target.value;

    setFormReferenceAndText(_temp);
    setFormReferenceAndTextValue(_tempValue);
  };

  const handleDelete = (parent, child) => {
    let _temp = [...formReferenceAndText];
    let _tempValue = [...formReferenceAndTextValue];

    if (child === 0) {
      let resultTemp = _temp.filter((items, idz) => idz !== parent);
      setFormReferenceAndText(resultTemp);
      let resultTempValue = _tempValue.filter((items, idz) => idz !== parent);
      setFormReferenceAndText(resultTemp);
      setFormReferenceAndTextValue(resultTempValue);
    } else {
      _temp.map((items, ids) => {
        if (ids === parent) {
          items.value = items.value.filter((itemx, inc) => inc !== child);
        }
      });
      _tempValue.map((items, ids) => {
        if (ids === parent) {
          items.value = items.value.filter((itemx, inc) => inc !== child);
        }
      });
      setFormReferenceAndText(_temp);
      setFormReferenceAndTextValue(_tempValue);
    }
  };

  const handleInputChange = (e) => {
    setLabeReferencel(e);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (
      !formReferenceAndText[0].relasi_id ||
      !formReferenceAndText[0].value[0].label
    ) {
      simpleValidator.current.showMessages();
      forceUpdate(1);
      Swal.fire("Gagal", `Value tidak boleh kosong`, "error");
    } else {
      formReferenceAndTextValue.map((items, index) => {
        items.value.map((itemz, idx) => {
          if (!itemz.label_old) {
            formReferenceAndTextValue[index].value[idx].label_old = itemz.value;
          }
        });
      });

      const sendData = {
        id: router.query.id,
        name: nameReference,
        status: status,
        data_references_relasi_id: idReference,
        data: formReferenceAndTextValue,
      };

      try {
        let { data } = await axios.post(
          `${process.env.END_POINT_API_SITE_MANAGEMENT}api/reference/update-relasi`,
          sendData,
          {
            headers: {
              authorization: `Bearer ${token}`,
            Permission: Cookies.get("token_permission")
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
    }
  };

  useEffect(() => {
    let optionReference = tempOptionsReference?.map((items) => {
      return { ...items, label: items.value };
    });
    setReferenceOption(optionReference);
  }, [tempOptionsReference]);

  useEffect(() => {
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
          return;
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
              Ubah Reference Dengan Relasi
            </h3>
          </div>
          <form>
            <div className="card-body pt-0 px-4 px-sm-8">
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Nama Data Reference
                </label>
                <input
                  placeholder="Masukkan nama data reference"
                  type="text"
                  value={nameReference}
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
                {detailDataReference.dataReference.status == 1 ? (
                  <select
                    className="form-control"
                    onChange={(e) => setStatus(e.target.value)}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("status")
                    }
                  >
                    <option value="1">Aktif</option>
                    <option value="0">Tidak aktif</option>
                  </select>
                ) : (
                  <select
                    className="form-control"
                    onChange={(e) => setStatus(e.target.value)}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("status")
                    }
                  >
                    <option value="0">Tidak aktif</option>
                    <option value="1">Aktif</option>
                  </select>
                )}
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
                  defaultValue={defaultDataReference.map((items) => {
                    return { ...items, label: items.name, value: items.name };
                  })}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={true}
                  name="color"
                  onChange={(e) => changeListDataReference(e)}
                  options={referenceOption}
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
                          defaultValue={itemsRef.label}
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
                              `List ${nameListFromReference}`
                            )
                          }
                        />
                        {simpleValidator.current.message(
                          `List ${nameListFromReference}`,
                          itemsRef.values,
                          "required",
                          { className: "text-danger" }
                        )}
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
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
                                    {/* <IconDelete width="11" height="11" /> */}
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
                  <Link href="/site-management/reference/">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                    onClick={(e) => submit(e)}
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
