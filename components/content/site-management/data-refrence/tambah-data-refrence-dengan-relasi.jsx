import React, { useState, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconAdd from "../../../assets/icon/Add";
import IconDelete from "../../../assets/icon/Delete";
import Select from "react-select";

const Tambah = ({ token }) => {
  const router = useRouter();

  let selectRefDataReference = null;
  let selectRefDataFromReference = null;

  const [nameReference, setNameReference] = useState("");
  const [status, setStatus] = useState("");
  const [idReference, setIdReference] = useState("");
  const [optionReference, setOptionReference] = useState([]);
  const [optionFromReference, setOptionFromReference] = useState([]);
  const [formValue, setFormValue] = useState([]);
  const [formReferenceAndText, setFormReferenceAndText] = useState([
    {
      relasi_id: "",
      value: [
        {
          label: "",
        },
      ],
    },
  ]);

  console.log("formReferenceAndText",formReferenceAndText)

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
    },
  ])
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
    });

    console.log("_temp",_temp)
    setFormReferenceAndText(_temp);
  };

  const handleCHangeNameReference = (e, index) => {
    let _temp = [...formReferenceAndText];
    
    _temp[index].relasi_id = e.id;
    setFormReferenceAndText(_temp);



    
  };

  const handleChangeTextForm = (e, idx, index) => {
    let _temp = [...formReferenceAndText];

    _temp[idx].value[index].label = e.target.value;

    setFormReferenceAndText(_temp);
  };

  const [labelReference, setLabeReferencel] = useState("")
  const handleInputChange =(e)=>{
    console.log("e.target.value",e)
    setLabeReferencel(e)
  }

  const submit = async (e) => {
    e.preventDefault();
    if (nameReference === "") {
      Swal.fire("Gagal", `Nama data reference tidak boleh kosong`, "error");
    } else if (status === "") {
      Swal.fire("Gagal", `Status tidak boleh kosong`, "error");
    } else if (idReference === "") {
      Swal.fire("Gagal", `Harus pilih data reference`, "error");
    } else if (formValue.length === 1) {
      Swal.fire(
        "Gagal",
        `Form data provinsi dan kabupaten tidak boleh kosong`,
        "error"
      );
    } else {

      console.log("formReferenceAndText test",formReferenceAndText)


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
        Swal.fire("Gagal simpan", `${error.response.data.message}`, "error");
      }
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

    if (idReference || (labelReference.length===3)) {
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
          console.log("data",data)
          let resultOptionReferenceChooce = data.data.map((items) => {
            return { ...items, label: items.label,value: items.label };
          });
          setOptionFromReference(resultOptionReferenceChooce);
        } catch (error) {
          notify(error.response.data.message);
        }
      }

      getAllDataFromIdReference(token, idReference);
    }
  }, [token, idReference,labelReference]);

  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark titles-1 mb-0"
            >
              Tambah Reference Dengan Relasi
            </h3>
          </div>
          <form>
            <div className="card-body pt-0 px-4 px-sm-8">
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Nama Data Reference
                </label>
                <input
                  required
                  placeholder="Masukan nama reference"
                  type="text"
                  className="form-control"
                  onChange={(e) => setNameReference(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  className="form-control"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Pilih status</option>
                  <option value="1">Aktif</option>
                  <option value="0">Tidak Aktif</option>
                </select>
              </div>
              <div className="form-group">
                <label>Pilih Data Reference</label>

                <Select
                  ref={(ref) => (selectRefDataReference = ref)}
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Pilih provinsi"
                  // defaultValue={allMK.stateListMitra[0]}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={true}
                  name="color"
                  onChange={(e) => changeListDataReference(e)}
                  options={optionReference}
                />
              </div>

              {/*  */}
              {formReferenceAndText.map((itemsRef, idx) => {
                return (
                  <div className="row" key={idx}>
                    <div className="col-12 col-sm-6">
                      <div className="form-group mt-4">
                        <label>List {nameListFromReference}</label>

                        <Select
                          ref={(ref) => (selectRefDataFromReference = ref)}
                          className="basic-single"
                          classNamePrefix="select"
                          placeholder="Pilih provinsi"
                          // defaultValue={allMK.stateListMitra[0]}
                          isDisabled={false}
                          isLoading={false}
                          isClearable={false}
                          isRtl={false}
                          isSearchable={true}
                          name="color"
                          onInputChange={handleInputChange}
                          onChange={(e) => handleCHangeNameReference(e, idx)}
                          options={optionFromReference}
                        />
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
                                  type="text"
                                  className="form-control"
                                  placeholder="Masukan data value"
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
                                    <IconDelete />
                                  </button>
                                )}
                              </div>
                            </div>
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
