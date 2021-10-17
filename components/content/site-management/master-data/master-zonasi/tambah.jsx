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

  const drowpdownProvinsi = useSelector((state) => state.drowpdownProvinsi);
  let tempOptionsProvinsi = drowpdownProvinsi?.data?.data?.value_reference;
  const [provinsi, setProvinsi] = useState([]);
  const [namaZonation, setNamaZonation] = useState("");
  const [status, setStatus] = useState("");

  const [formInput, setFormInput] = useState([]);
  const [valueForm, setValueForm] = useState([
    {
      provinsi: "",
      kota_kabupaten: [],
    },
  ]);

  console.log("formInput", formInput);
  console.log("valueForm", valueForm);
  const handleAddInput = () => {
    let _temp = [...formInput];
    let _tempValue = [...valueForm];
    _temp.push({
      provinces: provinsi,
      kabupaten: [],
    });
    _tempValue.push({
      provinsi: "",
      kota_kabupaten: [],
    });
    setFormInput(_temp);
    setValueForm(_tempValue);
  };
  const handleDelete = (index) => {
    let _temp = [...formInput];
    let _tempValue = [...valueForm];
    let filterHasil = _temp.filter((items, idx) => {
      return idx !== index;
    });
    let filterHasilValue = _tempValue.filter((items, idx) => {
      return idx !== index;
    });
    setFormInput(filterHasil);
    setValueForm(filterHasilValue);
  };
  const changeListKabupaten = (e, index) => {
    let _tempValue = [...valueForm];
    _tempValue[index].kota_kabupaten = e.map((items) => {
      return { label: items.label };
    });
    setValueForm(_tempValue);
  };
  const changeListProvinces = async (e, index) => {
    let _temp = [...formInput];
    let _tempValue = [...valueForm];
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/reference/choose-provinsi/${e.id}`,
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
      setFormInput(_temp);

      _tempValue[index].provinsi = e.label;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let sendData = {
      name: namaZonation,
      status: status,
      data: valueForm,
    };
    try {
      let sendData = {
        name: namaZonation,
        status: status,
        data: valueForm,
      };
      let { data } = await axios.post(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/zonasi/store`,
        sendData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire("Berhasil", "Data berhasil disimpan", "success").then(() => {
        router.push("/site-management/master-data/master-zonasi");
      });
    } catch (error) {
      Swal.fire("Gagal simpan", `${error.response.data.message}`, "error");
    }
  };

  useEffect(() => {
    let optionProvinsi = tempOptionsProvinsi?.map((items) => {
      return { ...items, label: items.value };
    });
    setProvinsi(optionProvinsi);
    setFormInput([
      {
        provinces: optionProvinsi,
        kabupaten: [],
      },
    ]);
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
                <label htmlFor="staticEmail" className="col-form-label">
                  Nama Zonasi
                </label>
                <input
                  required
                  onChange={(e) => setNamaZonation(e.target.value)}
                  placeholder="Provinsi"
                  type="text"
                  name="category_cooperation"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  className="form-control"
                  id="exampleSelect1"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Pilih Status</option>
                  <option value="1">Aktif</option>
                  <option value="0">Tidak Aktif</option>
                </select>
              </div>

              {formInput &&
                formInput.map((items, index) => {
                  return (
                    <div className="row" key={index}>
                      <div className="col-12 col-sm-6">
                        <div className="form-group mt-4">
                          <label htmlFor="exampleSelect1">Provinsi</label>

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
                            options={items.provinces}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="form-group mt-4">
                          <div className="position-relative d-flex align-items-center w-100">
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
                              <span className="form-text text-muted">
                                Please enter your full name
                              </span>
                            </div>

                            {index === 0 ? (
                              ""
                            ) : (
                              <button
                                type="button"
                                className="btn"
                                style={{ backgroundColor: "#EE2D41" }}
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
