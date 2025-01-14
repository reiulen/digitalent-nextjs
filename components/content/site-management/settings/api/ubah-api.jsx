import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import axios from "axios";
import IconCalender from "../../../../assets/icon/Calender";
import Select from "react-select";
import SimpleReactValidator from "simple-react-validator";
import Cookies from "js-cookie";

import styles from "../../../../../styles/previewGaleri.module.css";

const UbahApi = ({ token }) => {
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const router = useRouter();
  let selectRefListApi = null;

  const [isFrom, setIsFrom] = useState(false);

  const detailApi = useSelector((state) => state.detailApi);

  const [optionListField, setOptionListField] = useState([]);
  const listApi = useSelector((state) => state.listApi);
  const [optionListApi, setOptionListApi] = useState(
    listApi.listApi.map((items) => {
      return { label: items.api_url, value: items.api_url, id: items.id };
    })
  );
  const [valueFieldDefault, setValueFieldDefault] = useState(
    detailApi.apies.data.fields.map((items, index) => {
      return { label: items, value: items };
    })
  );
  const [nameApi, setNameApi] = useState(detailApi.apies.data.api_name);
  const [nameUser, setNameUser] = useState(detailApi.apies.data.username);
  const [status, setStatus] = useState(detailApi.apies.data.status);
  const [apiChoice, setApiChoice] = useState(detailApi.apies.data.id_api);
  const [defaultOptionListApi, setDefaultOptionListApi] = useState({
    label: detailApi.apies.data.api_url,
    value: detailApi.apies.data.api_url,
  });
  const [defaultValueListField, setDefaultValueListField] = useState(
    detailApi.apies.data.fields.map((items) => {
      return { label: items, value: items };
    })
  );

  const [valueField, setValueField] = useState([]);
  const [from, setFrom] = useState(detailApi.apies.data.from_date);
  const [to, setTo] = useState(detailApi.apies.data.to_date);
  const [field, setField] = useState(detailApi.apies.data.fields);

  const onChangePeriodeDateStart = (date) => {
    setFrom(moment(date).format("YYYY-MM-DD"));
    setIsFrom(true);
  };
  const onChangePeriodeDateEnd = (date) => {
    setTo(moment(date).format("YYYY-MM-DD"));
  };

  const changeListApi = (e) => {
    setApiChoice(e.id);
    setDefaultValueListField([]);
  };

  const changeListField = (e) => {
    let resultSelect = e.map((items) => {
      return items.field_name;
    });
    setValueField(resultSelect);
    setDefaultValueListField(e);
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
                Permission: Cookies.get("token_permission")
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
            status: status,
            fields: valueField.length === 0 ? field : valueField,
          };

          let { data } = await axios.post(
            `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-api/update/${router.query.id}`,
            sendData,
            {
              headers: {
                authorization: `Bearer ${token}`,
                Permission: Cookies.get("token_permission")
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

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header">
            <h3 className="card-title font-weight-bolder text-dark">
              Ubah API
            </h3>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Nama API</label>
                <input
                  value={nameApi}
                  onChange={(e) => setNameApi(e.target.value)}
                  type="text"
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
                  value={nameUser}
                  onChange={(e) => setNameUser(e.target.value)}
                  type="text"
                  className={`${styles.cari} form-control`}
                  placeholder="Masukkan nama user"
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

              {detailApi.apies.data.status == "1" ? (
                <div className="form-group">
                  <label>Status</label>
                  <select
                    onChange={(e) => setStatus(e.target.value)}
                    className={`${styles.cari} form-control`}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("status")
                    }
                  >
                    <option value="1">Aktif</option>
                    <option value="0">Tidak Aktif</option>
                  </select>
                  {simpleValidator.current.message(
                    "status",
                    status,
                    "required",
                    {
                      className: "text-danger",
                    }
                  )}
                </div>
              ) : (
                <div className="form-group">
                  <label>Status</label>
                  <select
                    onChange={(e) => setStatus(e.target.value)}
                    className={`${styles.cari} form-control`}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("status")
                    }
                  >
                    <option value="0">Tidak Aktif</option>
                    <option value="1">Aktif</option>
                  </select>
                  {simpleValidator.current.message(
                    "status",
                    status,
                    "required",
                    {
                      className: "text-danger",
                    }
                  )}
                </div>
              )}

              <div className="form-group">
                <label>Pilih API</label>
                <Select
                  onBlur={() => simpleValidator.current.showMessageFor("api")}
                  ref={(ref) => (selectRefListApi = ref)}
                  className={`${styles.cari} basic-single`}
                  classNamePrefix="select"
                  placeholder="Pilih provinsi"
                  defaultValue={defaultOptionListApi}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={true}
                  onChange={(e) => changeListApi(e)}
                  name="color"
                  options={optionListApi}
                />
                {simpleValidator.current.message("api", apiChoice, "required", {
                  className: "text-danger",
                })}
              </div>

              <div className="form-group">
                <label>Field</label>
                <Select
                  value={defaultValueListField}
                  isMulti
                  className={`${styles.cari} basic-single`}
                  classNamePrefix="select"
                  placeholder="Pilih field"
                  defaultValue={defaultValueListField}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={true}
                  name="color"
                  onChange={(e) => changeListField(e)}
                  options={optionListField}
                  onBlur={() => simpleValidator.current.showMessageFor("field")}
                />
                {defaultValueListField
                  ? ""
                  : simpleValidator.current.message(
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
                      onChange={(date) => {
                        onChangePeriodeDateStart(date);
                        setTo(null)
                      }}
                      value={from}
                      dateFormat="YYYY-MM-DD"
                      placeholderText="From"
                      minDate={moment().toDate()}
                      maxDate={moment(to).toDate()}
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
                      // disabled={!isFrom}
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
            </form>
            <div className="form-group row">
              <div className="col-sm-12 d-flex justify-content-end">
                <Link href="/site-management/setting/api">
                  <a
                    className={`${styles.btnKembali} btn btn-white-ghost-rounded-full rounded-pill mr-2`}
                  >
                    Kembali
                  </a>
                </Link>
                <button
                  type="button"
                  onClick={(e) => submit(e)}
                  className={`${styles.btnSimpan} btn btn-primary-rounded-full rounded-pill`}
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default UbahApi;
