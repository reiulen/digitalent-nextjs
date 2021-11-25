import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import PageWrapper from "../../../../wrapper/page.wrapper";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import SimpleReactValidator from "simple-react-validator";
import IconAdd from "../../../../assets/icon/Add";
import IconDelete from "../../../../assets/icon/Delete";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import styles from "../../../../../styles/sitemanagement/userMitra.module.css"
import styles2 from "../../../../../styles/previewGaleri.module.css"

const Tambah = ({ token }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  let selectRefProvinsi = null;
  let selectRefKabupaten = null;

  const detailZonasi = useSelector((state) => state.detailZonasi);

  const drowpdownProvinsi = useSelector((state) => state.allProvincesSite);
  let tempOptionsProvinsi = drowpdownProvinsi?.data;

  const [nameZonation, setNameZonation] = useState(detailZonasi.data.data.name);
  const [status, setStatus] = useState(detailZonasi.data.data.status);
  const [defaultValueKabputen, setDefaultValueKabputen] = useState([]);
  const [defaultValueProvinces, setDefaultValueProvinces] = useState([]);

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  // state provinsi for set in option provinsi
  const [provincesOption, setProvincesOption] = useState([]);
  // state kabupaten for set in option kabupaten
  const [kabupatenOption, setKabupatenOption] = useState([]);
  // state id provinsi just for get kabputaen value
  const [idProvinsi, setIdProvinsi] = useState("");
  // value for option list dinamic
  const [formInput, setFormInput] = useState(
    detailZonasi.data.data.data.map((items) => {
      return {
        provinsi: [{ label: items.provinsi, value: items.provinsi }],
        kabupaten: items.kota_kabupaten,
        value: items.kota_kabupaten
      };
    })
  );

  // value to send api
  const [valueSend, setValueSend] = useState(
    detailZonasi.data.data.data.map((items) => {
      return { ...items, provinsi_old: items.provinsi };
    })
  );

  const handleAddInput = () => {
    let _temp = [...formInput];
    let _tempValue = [...valueSend];
    _temp.push({
      provinsi: [],
      kabupaten: [],
      value: []
    });
    _tempValue.push({
      provinsi_old: "",
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

  // onchange set value to form input loop
  const changeListProvinces = async (e, index) => {
    let _temp = [...formInput];
    let _tempValue = [...valueSend];

    let _tempOption = [...provincesOption];

    let _newTempOption = _tempOption.filter(items => items.label !== e.label)
    setProvincesOption(_newTempOption);


    _temp[index].value = []
    _temp[index].kabupaten = []
    _tempValue[index].kota_kabupaten = []

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
      notify(error.response.data.message);
    }
  };

  const changeListKabupaten = (e, index) => {
    let _tempValue = [...valueSend];
    let _temp = [...formInput]
    _tempValue[index].kota_kabupaten = e.map((items) => {
      return { label: items.label };
    });
    setValueSend(_tempValue);

    _temp[index]['value'] = e
    setFormInput(_temp)
  };

  const submit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {

      // cek field loop field kab
      let isRightKab = true
      formInput.forEach(element => {
        if (element.value.length === 0) {
          isRightKab = false
        }
      });
      // cek field loop field prov
      let isRightProv = true
      valueSend.forEach(element => {
        if (!element.provinsi) {
          isRightProv = false
        }
      });

      if (nameZonation === "") {
        Swal.fire("Gagal simpan", "Nama zonasi tidak boleh kosong", "error");
      } else if (status === "") {
        Swal.fire("Gagal simpan", "Form status tidak boleh kosong", "error");
      }

      else if (!isRightProv) {
        Swal.fire("Gagal simpan", "Form Provinsi tidak boleh kosong", "error");
      }
      else if (!isRightKab) {
        Swal.fire("Gagal simpan", "Form Kabupaten tidak boleh kosong", "error");
      }
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
              id: router.query.id,
              name: nameZonation,
              status: status,
              data: valueSend,
            };


            try {
              let { data } = await axios.post(
                `${process.env.END_POINT_API_SITE_MANAGEMENT}api/zonasi/update`,
                sendData,
                {
                  headers: {
                    authorization: `Bearer ${token}`,
                  },
                }
              );

              Swal.fire("Berhasil", "Data berhasil disimpan", "success").then(
                () => {
                  router.push(`/site-management/master-data/master-zonasi`);
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
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi data dengan benar !",
      });
    }
  }

  // add value and label in response api for react select first load page
  useEffect(() => {
    let optionProvinsi = tempOptionsProvinsi?.map((items) => {
      return { ...items, value: items.label };
    });
    setProvincesOption(optionProvinsi);
  }, [tempOptionsProvinsi]);

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header">
            <h3
              className="card-title font-weight-bolder text-dark"
            >
              Ubah Zonasi
            </h3>
          </div>
          <form>
            <div className="card-body">
              <div className="form-group">
                <label>Nama Zonasi</label>
                <input
                  onChange={(e) => setNameZonation(e.target.value)}
                  placeholder="Masukkan nama zonasi"
                  type="text"
                  value={nameZonation}
                  className="form-control"
                  onBlur={() => simpleValidator.current.showMessageFor("namaZonasi")}
                />

                {simpleValidator.current.message(
                  "namaZonasi",
                  nameZonation,
                  "required",
                  { className: "text-danger" }
                )}
              </div>

              {/*  */}
              <div className="form-group">
                <label>Status</label>
                <select
                  className="form-control"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  onBlur={() => simpleValidator.current.showMessageFor("status")}
                >
                  <option value="1">Aktif</option>
                  <option value="0">Tidak aktif</option>
                </select>

                {simpleValidator.current.message(
                  "status",
                  status,
                  "required",
                  { className: "text-danger" }
                )}
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
                            defaultValue={items.provinsi}
                            isDisabled={false}
                            isLoading={false}
                            isClearable={false}
                            isRtl={false}
                            isSearchable={true}
                            name="color"
                            onChange={(e) => changeListProvinces(e, index)}
                            options={provincesOption}
                            onBlur={() => simpleValidator.current.showMessageFor("province")}
                          />

                          {simpleValidator.current.message(
                            "province",
                            items.value,
                            "required",
                            { className: "text-danger" }
                          )}
                        </div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="form-group mt-4">
                          <div className="position-relative d-flex align-items-end w-100">
                            <div className="form-group w-100 mr-2 mb-1">
                              <label>Kota / Kabupaten</label>
                              <Select
                                // ref={(ref) => (selectRefKabupaten = ref)}
                                value={items.value}
                                className="basic-single"
                                classNamePrefix="select"
                                placeholder="Pilih kota/kabupaten"
                                isMulti={true}
                                isDisabled={false}
                                isLoading={false}
                                isClearable={false}
                                isRtl={false}
                                defaultValue={items.kabupaten}
                                isSearchable={true}
                                name="color"
                                onChange={(e) => changeListKabupaten(e, index)}
                                options={items.kabupaten}
                                onBlur={() => simpleValidator.current.showMessageFor("kabupaten")}
                              />

                              {simpleValidator.current.message(
                                "kabupaten",
                                items.value,
                                "required",
                                { className: "text-danger" }
                              )}
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
                    <a className={`${styles.btnKembali} btn btn-white-ghost-rounded-full rounded-pill mr-2`}>
                      Kembali
                    </a>
                  </Link>
                  <button
                    type="button"
                    className={`${styles.btnSimpan} btn btn-primary-rounded-full rounded-pill`}
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
