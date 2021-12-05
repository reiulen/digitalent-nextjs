import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import moment from "moment";
import IconCalender from "../../../../assets/icon/Calender";
import axios from "axios";
import Select from "react-select";
import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";

import styles from "../../../../../styles/previewGaleri.module.css"

const TambahApi = ({ token }) => {
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();
  
  let selectRefListApi = null;
  const router = useRouter();
  const listApi = useSelector((state) => state.listApi);
  const [nameApi, setNameApi] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [status, setStatus] = useState("");
  const [apiChoice, setApiChoice] = useState("");
  const [field, setField] = useState([]);
  const [valueField, setValueField] = useState([]);
  const [optionListField, setOptionListField] = useState([]);
  const [optionListApi, setOptionListApi] = useState(
    listApi.listApi.map((items) => {
      return { label: items.api_url, value: items.api_url, id: items.id };
    })
  );
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const onChangePeriodeDateStart = (date) => {
    setFrom(moment(date).format("YYYY-MM-DD"));
  };
  const onChangePeriodeDateEnd = (date) => {
    setTo(moment(date).format("YYYY-MM-DD"));
  };

  const onChangeStatus = (e) => {
    setStatus({ value: e.value, label: e.label });
  };

  const changeListApi = (e) => {
    let resultSelect = e.map((items) => {
      return items.label;
    });
    setValueField(e);
    setField(resultSelect);
  };

  const optionsStatus = [
    { value: "1", label: "Aktif" },
    { value: "0", label: "Tidak Aktif" },
  ];

  const changeChoiceApi = (e) => {
    setApiChoice(e.id);
    setValueField([]);
  };

  const submit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {

      Swal.fire({
        title: "Apakah anda yakin simpan ?",
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
            api_name: nameApi,
            username: nameUser,
            id_api: apiChoice,
            from_date: from,
            to_date: to,
            status: status.value,
            fields: field,
          };
          let { data } = await axios.post(
            `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-api/store`,
            sendData,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          Swal.fire("Berhasil", "Data berhasil disimpan", "success").then(
            () => {
              router.push(`/site-management/setting/api`);
            }
          );
        }
      });
    } else {
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
    if (apiChoice) {
      async function getListField(id, token) {
        try {
          let { data } = await axios.get(
            `${process.env.END_POINT_API_SITE_MANAGEMENT}api/api-list/fields/${id}`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          let optionListFieldResult = data.data.map((items) => {
            return {
              ...items,
              label: items.field_name,
              value: items.field_name,
            };
          });

          setOptionListField(optionListFieldResult);
        } catch (error) {
          return;
        }
      }

      getListField(apiChoice, token);
    }
  }, [apiChoice, token]);

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header">
            <h3 className="card-title font-weight-bolder text-dark">
              Tambah API
            </h3>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Nama API</label>
                <input
                  type="text"
                  onChange={(e) => setNameApi(e.target.value)}
                  className={`${styles.cari} form-control`}
                  placeholder="Masukkan nama api"
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("namaApi")
                  }
                />
                {simpleValidator.current.message(
                  "namaApi",
                  nameApi,
                  "required",
                  { className: "text-danger" }
                )}
              </div>
              <div className="form-group">
                <label>Nama Pengguna</label>
                <input
                  onChange={(e) => setNameUser(e.target.value)}
                  type="text"
                  className={`${styles.cari} form-control`}
                  placeholder="Masukkan nama pengguna"
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("namaPengguna")
                  }
                />
                {simpleValidator.current.message(
                  "namaPengguna",
                  nameUser,
                  "required",
                  { className: "text-danger" }
                )}
              </div>
              <div className="form-group">
                <label>Status</label>
                <div className="" style={{ zIndex: '99', position: 'relative' }}>
                  <Select
                    placeholder="Pilih Status"
                    className={`${styles.cari}`}
                    options={optionsStatus}
                    value={status}
                    onChange={onChangeStatus}
                    onBlur={(e) => {
                      simpleValidator.current.showMessageFor("status");
                    }}
                  />
                </div>

                {/* <select
                  onChange={(e) => setStatus(e.target.value)}
                  className={`${styles.cari} form-control`}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("status")
                  }
                >
                  <option value="">Pilih status</option>
                  <option value="1">Aktif</option>
                  <option value="0">Tidak Aktif</option>
                </select> */}
                {simpleValidator.current.message("status", status, "required", {
                  className: "text-danger",
                })}
              </div>

              <div className="form-group">
                <label>Pilih API</label>
                <Select
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("api")
                  }
                  className={`${styles.cari} basic-single`}
                  classNamePrefix="select"
                  placeholder="Pilih API"
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={true}
                  onChange={(e) => changeChoiceApi(e)}
                  name="color"
                  options={optionListApi}
                />
                {simpleValidator.current.message(
                  "api",
                  apiChoice,
                  "required",
                  { className: "text-danger" }
                )}
              </div>
              <div className="form-group">
                <label>Field</label>
                <Select
                  value={valueField}
                  className={`${styles.cari} basic-single`}
                  classNamePrefix="select"
                  placeholder="Pilih Field"
                  isMulti
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={true}
                  name="color"
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("field")
                  }
                  onChange={(e) => changeListApi(e)}
                  options={optionListField}
                />
                {simpleValidator.current.message(
                  "field",
                  valueField,
                  "required",
                  { className: "text-danger" }
                )}
              </div>
              <div className="form-group row">
                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 mb-5">
                  <label>From</label>
                  <div className="d-flex align-items-center position-relative datepicker-w mt-2">
                    <DatePicker
                      className={`${styles.cari} form-search-date form-control cursor-pointer`}
                      onChange={(date) => onChangePeriodeDateStart(date)}
                      value={from}
                      dateFormat="YYYY-MM-DD"
                      placeholderText="From"
                      minDate={moment().toDate()}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("from")
                      }
                    />
                    <IconCalender
                      className="right-center-absolute"
                      style={{ right: "10px" }}
                    />
                  </div>
                  {simpleValidator.current.message("from", from, "required", {
                    className: "text-danger",
                  })}
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                  <label>To</label>
                  <div className="d-flex align-items-center position-relative datepicker-w mt-2">
                    <DatePicker
                      className={`${styles.cari} form-search-date form-control cursor-pointer`}
                      onChange={(date) => onChangePeriodeDateEnd(date)}
                      value={to}
                      disabled={!from}
                      dateFormat="YYYY-MM-DD"
                      placeholderText="To"
                      minDate={moment(from).toDate()}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("to")
                      }
                    />
                    <IconCalender
                      className="right-center-absolute"
                      style={{ right: "10px" }}
                    />
                  </div>
                  {simpleValidator.current.message("to", to, "required", {
                    className: "text-danger",
                  })}
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/site-management/setting/api">
                    <a className={`${styles.btnKembali} btn btn-white-ghost-rounded-full rounded-pill mr-2`}>
                      Kembali
                    </a>
                  </Link>
                  <button
                    onClick={(e) => submit(e)}
                    type="button"
                    className={`${styles.btnSimpan} btn btn-primary-rounded-full rounded-pill`}
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

export default TambahApi;
