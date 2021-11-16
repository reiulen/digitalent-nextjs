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

const TambahApi = ({ token }) => {
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();
  const router = useRouter();
  const listApi = useSelector((state) => state.listApi);
  const [nameApi, setNameApi] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [status, setStatus] = useState("");
  const [apiChoice, setApiChoice] = useState("");
  const [field, setField] = useState([]);
  const [valueField, setValueField] = useState([]);
  const [optionListField, setOptionListField] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const onChangePeriodeDateStart = (date) => {
    setFrom(moment(date).format("YYYY-MM-DD"));
  };
  const onChangePeriodeDateEnd = (date) => {
    setTo(moment(date).format("YYYY-MM-DD"));
  };

  const changeListApi = (e) => {
    let resultSelect = e.map((items) => {
      return items.label;
    });
    setValueField(e);
    setField(resultSelect);
  };

  const changeChoiceApi = (e) => {
    setApiChoice(e.target.value);
    setValueField([]);
  };

  const submit = (e) => {
    e.preventDefault();
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
          status: status,
          fields: field,
        };
        try {
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
    });
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
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 mb-5 mt-5 titles-1">
              Tambah API
            </h3>
          </div>
          <div className="card-body pt-0">
            <form>
              <div className="form-group">
                <label>Nama API</label>
                <input
                  type="text"
                  onChange={(e) => setNameApi(e.target.value)}
                  className="form-control"
                  placeholder="Masukkan nama api"
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("nameApi")
                  }
                />
                {simpleValidator.current.message(
                  "nameApi",
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
                  className="form-control"
                  placeholder="Masukkan nama pengguna"
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("nameUser")
                  }
                />
                {simpleValidator.current.message(
                  "nameUser",
                  nameUser,
                  "required",
                  { className: "text-danger" }
                )}
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-control"
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("status")
                  }
                >
                  <option value="">Pilih status</option>
                  <option value="1">Aktif</option>
                  <option value="0">Nonaktif</option>
                </select>
                {simpleValidator.current.message("status", status, "required", {
                  className: "text-danger",
                })}
              </div>

              <div className="form-group">
                <label>Pilih API</label>
                <select
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("apiChoice")
                  }
                  onChange={(e) => changeChoiceApi(e)}
                  className="form-control"
                >
                  <option value="">Pilih api</option>
                  {listApi?.listApi?.map((items, index) => {
                    return (
                      <option key={index} value={items.id}>
                        {items.api_url}
                      </option>
                    );
                  })}
                </select>
                {simpleValidator.current.message(
                  "apiChoice",
                  apiChoice,
                  "required",
                  { className: "text-danger" }
                )}
              </div>
              <div className="form-group">
                <label>Field</label>
                <Select
                  value={valueField}
                  className="basic-single"
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
                    simpleValidator.current.showMessageFor("valueField")
                  }
                  onChange={(e) => changeListApi(e)}
                  options={optionListField}
                />
                {simpleValidator.current.message(
                  "valueField",
                  valueField,
                  "required",
                  { className: "text-danger" }
                )}
              </div>
              <div className="form-group row">
                <div className="col-12 col-sm-6">
                  <label>From</label>
                  <div className="d-flex align-items-center position-relative datepicker-w mt-2">
                    <DatePicker
                      className="form-search-date form-control cursor-pointer"
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
                <div className="col-lg-6">
                  <label>To</label>
                  <div className="d-flex align-items-center position-relative datepicker-w mt-2">
                    <DatePicker
                      className="form-search-date form-control cursor-pointer"
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
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link>
                  <button
                    onClick={(e) => submit(e)}
                    type="button"
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
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
