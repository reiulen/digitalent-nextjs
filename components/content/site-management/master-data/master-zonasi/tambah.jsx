import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../../wrapper/page.wrapper";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconAdd from "../../../../assets/icon/Add";
import IconDelete from "../../../../assets/icon/Delete";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { GET_DROPDOWN_KABUPATEN } from "../../../../../redux/types/pelatihan/function.type";

const Tambah = ({ token }) => {
  const router = useRouter();
  let selectRefProvinsi = null;
  let selectRefKabupaten = null;

  const [nameZonation, setNameZonation] = useState("");
  const [status, setStatus] = useState("");
  // state provinsi for set in option provinsi
  const [provincesOption, setProvincesOption] = useState([]);
  // state kabupaten for set in option kabupaten
  const [kabupatenOption, setKabupatenOption] = useState([]);
  // state id provinsi just for get kabputaen value
  const [idProvinsi, setIdProvinsi] = useState("");
  // value for option list dinamic
  const [formInput, setFormInput] = useState([
    {
      provinsi: [],
      kabupaten: [],
    },
  ]);
  console.log("formInput", formInput);
  // value to send api
  const [valueSend, setValueSend] = useState([
    {
      provinsi: "",
      kota_kabupaten: [],
    },
  ]);
  console.log("valueSend", valueSend);

  const drowpdownProvinsi = useSelector((state) => state.allProvincesSite);
  // console.log("drowpdownProvinsi",drowpdownProvinsi)

  let tempOptionsProvinsi = drowpdownProvinsi?.data;
  // console.log("tempOptionsProvinsi",tempOptionsProvinsi)

  // onchange set value to form input loop
  const changeListProvinces = async (e, index) => {
    console.log("event change provinsices", e.id);
    let _temp = [...formInput];
    let _tempValue = [...valueSend];

    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/option/provinsi-choose/${e.id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      let optionProvinsiKab = data.data.map((items) => {
        return { ...items, label: items.value };
      });
      _temp[index].kabupaten = optionProvinsiKab;
      _tempValue[index].provinsi = e.label;
      setFormInput(_temp);
      setValueSend(_tempValue);
    } catch (error) {
      console.log(error);
    }
  };
  // onchange set value to form input loop
  const changeListKabupaten = (e, index) => {
    console.log("event change kabupaten", e, index);
    let _tempValue = [...valueSend];
    _tempValue[index].kota_kabupaten = e.map((items) => {
      return { label: items.label };
    });
    setValueSend(_tempValue);
  };

  // function add array state form for loop

  const handleAddInput = () => {
    let _temp = [...formInput];
    let _tempValue = [...valueSend];
    _temp.push({
      provinsi: [],
      kabupaten: [],
    });
    _tempValue.push({
      provinsi: "",
      kabupaten: [],
    });
    setFormInput(_temp);
    setValueSend(_tempValue);
  };

  const handleDelete = (index) => {
    let _temp = [...formInput];
    let _tempValue = [...valueSend];
    let filterHasil = _temp.filter((items, idx) => {
      return idx !== index;
    });
    let filterHasilValue = _tempValue.filter((items, idx) => {
      return idx !== index;
    });
    setFormInput(filterHasil);
    setValueSend(filterHasilValue);
  };

  const submit = (e) => {
    e.preventDefault();

    if (nameZonation === "") {
      Swal.fire(
        "Gagal simpan",
        "Nama zonasi tidak boleh kosong",
        "error"
      );
    } else if (status === "") {
      Swal.fire("Gagal simpan", "Form status tidak boleh kosong", "error");
    } 
    // else if (valueProvinsi === "") {
    //   Swal.fire("Gagal simpan", "Form provinsi tidak boleh kosong", "error");
    // } 
    else {
      Swal.fire({
        title: "Apakah anda yakin simpan ?",
        // text: "Data ini tidak bisa dikembalikan !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Batal",
        confirmButtonText: "Ya !",
        dismissOnDestroy: false,
      }).then(async (result) => {
        if (result.value) {
          const sendData = {
            name: nameZonation,
            status: status,
            data: valueSend,
          };

          try {
            let { data } = await axios.post(
              `${process.env.END_POINT_API_SITE_MANAGEMENT}api/zonasi/store`,
              sendData,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            );

            Swal.fire("Berhasil", "Data berhasil disimpan", "success").then(
              () => {
                router.push(
                  `/site-management/master-data/master-zonasi`
                );
              }
            );
          } catch (error) {
            Swal.fire(
              "Gagal simpan",
              `${error.response.data.message}`,
              "error"
            );
          }
        }
      });
    }
  };

  // add value and label in response api for react select first load page
  useEffect(() => {
    let optionProvinsi = tempOptionsProvinsi?.map((items) => {
      return { ...items, value: items.label };
    });
    setProvincesOption(optionProvinsi);
  }, [tempOptionsProvinsi]);

  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark"
              style={{ fontSize: "24px" }}
            >
              Tambah Zonasi
            </h3>
          </div>
          <form>
            <div className="card-body">
              <div className="form-group">
                <label>
                  Nama Zonasi
                </label>
                <input
                  onChange={(e) => setNameZonation(e.target.value)}
                  placeholder="Masukan nama zonasi"
                  type="text"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  className="form-control"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Pilih Status</option>
                  <option value="1">Aktif</option>
                  <option value="0">Tidak Aktif</option>
                </select>
              </div>

              {formInput.map((items, index) => {
                return (
                  <div className="row" key={index}>
                    <div className="col-12 col-sm-6">
                      <div className="form-group mt-4">
                        <label>Provinsi</label>

                        <Select
                          ref={(ref) => (selectRefProvinsi = ref)}
                          className="basic-single"
                          classNamePrefix="select"
                          placeholder="Pilih provinsi"
                          isDisabled={false}
                          isLoading={false}
                          isClearable={false}
                          isRtl={false}
                          isSearchable={true}
                          name="color"
                          onChange={(e) => changeListProvinces(e, index)}
                          options={provincesOption}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group mt-4">
                        <div className="position-relative d-flex align-items-end w-100">
                          <div className="form-group w-100 mr-6 mb-1">
                            <label htmlFor="exampleSelect1">
                              Kota / Kabupaten
                            </label>
                            <Select
                              ref={(ref) => (selectRefKabupaten = ref)}
                              className="basic-single"
                              classNamePrefix="select"
                              placeholder="Pilih kabupaten"
                              isMulti
                              isDisabled={false}
                              isLoading={false}
                              isClearable={false}
                              isRtl={false}
                              isSearchable={true}
                              name="color"
                              onChange={(e) => changeListKabupaten(e, index)}
                              options={items.kabupaten}
                            />
                          </div>

                          {index === 0 ? (
                            ""
                          ) : (
                            <button
                              type="button"
                              className="btn position-relative"
                              style={{
                                backgroundColor: "#EE2D41",
                                top: "-3px",
                              }}
                              onClick={() => handleDelete(index)}
                            >
                              <IconDelete />
                            </button>
                          )}
                        </div>
                      </div>
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
                    onClick={() => handleAddInput()}
                  >
                    <IconAdd className="mr-3" width="14" height="14" />
                    Tambah Provinsi
                  </p>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/site-management/master-data/master-zonasi">
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
