import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import LoadingTable from "../../../../LoadingTable";
import IconEye from "../../../../assets/icon/Eye";
import IconPencil from "../../../../assets/icon/Pencil";
import IconDelete from "../../../../assets/icon/Delete";
import IconAdd from "../../../../assets/icon/Add";
import IconSearch from "../../../../assets/icon/Search";

import {
  getListApi,
  getListField,
  postApi,
} from "../../../../../redux/actions/site-management/settings/api.actions";
import Select from "react-select";

import {POST_API_RESET} from '../../../../../redux/types/site-management/settings/api.type'

const TambahApi = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const [nameApi, setNameApi] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [status, setStatus] = useState("");
  const [apiChoice, setApiChoice] = useState("");
  const [field, setField] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const listApi = useSelector((state) => state.listApi);
  const listField = useSelector((state) => state.listField);
  const {error:errorDelete,success} = useSelector((state) => state.newApi);
  // console.log("newApi", newApi);

  const [error, setError] = useState({
    nameApi: "",
    nameUser: "",
    status: "",
    apiChoice: "",
    field: "",
    from: "",
    to: "",
  });

  const submit = (e) => {
    e.preventDefault();
    if (nameApi === "") {
      setError({ ...error, nameApi: "Nama api harus diisi" });
    } else if (nameUser === "") {
      setError({ ...error, nameUser: "Nama user api harus diisi" });
    } else if (status === "") {
      setError({ ...error, status: "Status harus diisi" });
    } else if (apiChoice === "") {
      setError({ ...error, apiChoice: "Field API harus diisi" });
    } else if (field === "") {
      setError({ ...error, field: "Field harus diisi" });
    } else if (from === "") {
      setError({ ...error, from: "Field from harus diisi" });
    } else if (to === "") {
      setError({ ...error, to: "Field to harus diisi" });
    } else {
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
      }).then((result) => {
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
          dispatch(postApi(sendData, token));
        }
      });
    }
  };

  const changeListField = (e) => {
    let data = e.map((items) => items.label);
    setField(data);
  };

  useEffect(() => {
    dispatch(getListApi(token));
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(getListField(apiChoice, token));
  }, [apiChoice, dispatch, token]);

  useEffect(() => {
    if (errorDelete) {
      Swal.fire("Ada kesalahan", `${errorDelete}`, "error");
    }else if(success){
      Swal.fire("Berhasil", "Data berhasil disimpan", "success").then(() => {
        router.push("/site-management/setting/api/")
      });
    }
    dispatch({
      type:POST_API_RESET
    })
  }, [errorDelete,success,router,dispatch]);

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 mb-5 mt-5"
              style={{ fontSize: "24px" }}
            >
              Tambah API
            </h3>
          </div>
          <div className="card-body pt-0">
            <form onSubmit={submit}>
              <div className="form-group">
                <label>Nama API</label>
                <input
                  value={nameApi}
                  onFocus={() => setError({ ...error, nameApi: "" })}
                  type="text"
                  onChange={(e) => setNameApi(e.target.value)}
                  className="form-control"
                  placeholder="Placeholder"
                />

                {error.nameApi ? (
                  <span className="form-text text-muted">{error.nameApi}</span>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group">
                <label>Nama Pengguna</label>
                <input
                  value={nameUser}
                  onChange={(e) => setNameUser(e.target.value)}
                  onFocus={() => setError({ ...error, nameUser: "" })}
                  type="text"
                  className="form-control"
                  placeholder="Placeholder"
                />
                {error.nameUser ? (
                  <span className="form-text text-muted">{error.nameUser}</span>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group">
                <label htmlFor="exampleSelect1">Status</label>
                <select
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-control"
                  id="exampleSelect1"
                  onFocus={() => setError({ ...error, status: "" })}
                >
                  <option value="">Pilih status</option>
                  <option value="Aktif">Aktif</option>
                  <option value="Nonaktif">Nonaktif</option>
                </select>
                {error.status ? (
                  <span className="form-text text-muted">{status}</span>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group">
                <label htmlFor="exampleSelect1">Pilih API</label>
                <select
                  onChange={(e) => setApiChoice(e.target.value)}
                  className="form-control"
                  id="exampleSelect1"
                  onFocus={() => setError({ ...error, apiChoice: "" })}
                >
                  <option>Pilih Api</option>
                  {!listApi.listApi ? (
                    <option>...</option>
                  ) : (
                    listApi.listApi.map((items, index) => {
                      return (
                        <option key={index} value={items.id}>
                          {items.api_url}
                        </option>
                      );
                    })
                  )}
                </select>
                {error.apiChoice ? (
                  <span className="form-text text-muted">
                    {error.apiChoice}
                  </span>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group">
                <label htmlFor="exampleSelect1">Field</label>
                {/* <select
                  className="form-control"
                  id="exampleSelect1"
                  
                >
                  <option>Placeholder</option>
                </select> */}

                <Select
                  onFocus={() => setError({ ...error, field: "" })}
                  // defaultValue={[colourOptions[2], colourOptions[3]]}
                  isMulti
                  name="colors"
                  options={listField?.dataSortir}
                  onChange={(e) => changeListField(e)}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />

                {error.field ? (
                  <span className="form-text text-muted">{error.field}</span>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group row">
                <div className="col-lg-6">
                  <label>From</label>
                  <input
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    onFocus={() => setError({ ...error, from: "" })}
                    type="date"
                    className="form-control"
                    placeholder="Enter full name"
                  />
                  {error.from ? (
                    <span className="form-text text-muted">{error.from}</span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-lg-6">
                  <label>To</label>
                  <input
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    onFocus={() => setError({ ...error, to: "" })}
                    type="date"
                    className="form-control"
                    placeholder="Enter contact number"
                  />
                  {error.to ? (
                    <span className="form-text text-muted">{error.to}</span>
                  ) : (
                    ""
                  )}
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
                    type="submit"
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
