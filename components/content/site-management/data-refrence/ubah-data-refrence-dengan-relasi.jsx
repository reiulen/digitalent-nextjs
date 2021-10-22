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
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

const Tambah = ({ token }) => {
  const router = useRouter();
  let selectRefDataReference = null;
  let selectRefDataFromReference = null;

  const detailDataReference = useSelector((state) => state.detailDataReference);
  const allOptionReferenceSite = useSelector((state) => state.allOptionReferenceSite);
  let tempOptionsReference = allOptionReferenceSite?.data;

  console.log("detailDataReferenceReducer", detailDataReference);
  // console.log("allOptionReferenceSite", allOptionReferenceSite);
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
  const [idReference, setIdReference] = useState("");
  const [nameListFromReference, setNameListFromReference] = useState("");
  const [optionFromReference, setOptionFromReference] = useState([]);
  const changeListDataReference = (e) => {
     setIdReference(e.key)
     setNameListFromReference(e.value)
  };

  // sisa buat loop from detail nya

  // const [formInput, setFormInput] = useState(
  //   detailDataReference.dataReference.valueReference.map((items) => {
  //     return {
  //       provinsi: [{ label: items.provinsi, value: items.provinsi }],
  //       kabupaten: items.kota_kabupaten,
  //     };
  //   })
  // );

  // console.log("formInput", formInput);

  useEffect(() => {
    let optionReference = tempOptionsReference?.map((items) => {
      return { ...items, label: items.value };
    });
    setReferenceOption(optionReference);
  }, [tempOptionsReference]);

  useEffect(() => {
    if (idReference) {
      async function getAllDataFromIdReference(token, id) {
        try {
          let { data } = await axios.get(
            `${process.env.END_POINT_API_SITE_MANAGEMENT}api/option/reference-choose/${id}`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          let resultOptionReferenceChooce = data.data.map((items) =>{
          return {...items,label:items.value}
        })
          // console.log("data sub",data)
          setOptionFromReference(resultOptionReferenceChooce);
        } catch (error) {
          console.log(
            "error get all data reference",
            error.response.data.message
          );
        }
      }

      getAllDataFromIdReference(token, idReference);
    }
    

  }, [token, idReference])

  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark"
              style={{ fontSize: "24px" }}
            >
              Ubah Reference Dengan Relasi
            </h3>
          </div>
          <form>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Nama Data Reference
                </label>
                <input
                  placeholder="Masukan nama data reference"
                  type="text"
                  value={nameReference}
                  className="form-control"
                  onChange={(e) => setNameReference(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                {status == 1 ? (
                  <select
                    className="form-control"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="1">Aktif</option>
                    <option value="0">Tidak aktif</option>
                  </select>
                ) : (
                  <select
                    className="form-control"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="0">Tidak aktif</option>
                    <option value="1">Aktif</option>
                  </select>
                )}
              </div>

              <div className="form-group">
                <label>Pilih Data Reference</label>
                <Select
                  ref={(ref) => (selectRefDataReference = ref)}
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Pilih provinsi"
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
                />
              </div>

              {/*  */}
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="form-group mt-4">
                    <label>List {nameListFromReference}</label>
                <Select
                  ref={(ref) => (selectRefDataFromReference = ref)}
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Pilih provinsi"
                  defaultValue={detailDataReference.dataReference.valueReference.map((items) => {
                    return { label: items.value, value: items.value };
                  })}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={true}
                  name="color"
                  onChange={(e) => changeListDataReference(e)}
                  options={optionFromReference}
                />
                   
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="form-group mt-12">
                    <div className="position-relative d-flex align-items-start w-100">
                      <div className="w-100 mr-6">
                        <input
                          required
                          placeholder="Aceh"
                          name="cooperation"
                          type="text"
                          className="form-control"
                        />
                      </div>

                      <div className="d-flex align-items-center">
                        <button
                          type="button"
                          className="btn mr-4"
                          style={{ backgroundColor: "#04AA77" }}
                        >
                          <IconAdd />
                        </button>
                        <button
                          type="button"
                          className="btn"
                          style={{ backgroundColor: "#EE2D41" }}
                        >
                          <IconDelete />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="position-relative d-flex align-items-start w-100">
                      <div className="w-100 mr-6">
                        <input
                          placeholder="Aceh"
                          name="cooperation"
                          type="text"
                          className="form-control"
                        />
                      </div>

                      <div className="d-flex align-items-center">
                        <button
                          type="button"
                          className="btn mr-4"
                          style={{ backgroundColor: "#04AA77" }}
                        >
                          <IconAdd />
                        </button>
                        <button
                          type="button"
                          className="btn"
                          style={{ backgroundColor: "#EE2D41" }}
                        >
                          <IconDelete />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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
                    // onClick={() => handleAddInput()}
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
                    type="button"
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                    // onClick={e => handleSubmit(e)}
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
