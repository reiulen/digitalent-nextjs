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
import DatePicker from "react-datepicker";
import axios from "axios";
import IconCalender from "../../../../assets/icon/Calender";
import Select from "react-select";


const UbahApi = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();
  let selectRefListApi = null;
  let selectRefListField = null;

  const detailApi = useSelector((state) => state.detailApi);
   const [optionListField, setOptionListField] = useState([]);
  const listApi = useSelector(state => state.listApi)

  console.log("detailApi",detailApi)
  console.log("listApi",listApi)
 

  const [optionListApi, setOptionListApi] = useState(listApi.listApi.map((items)=>{
    return {label:items.api_url,value:items.api_url,id:items.id}
  }))
  const [nameApi, setNameApi] = useState(detailApi.apies.data.api_name);
  const [nameUser, setNameUser] = useState(detailApi.apies.data.username);
  const [status, setStatus] = useState(detailApi.apies.data.status);
  const [apiChoice, setApiChoice] = useState(detailApi.apies.data.id_api);
  const [defaultOptionListApi, setDefaultOptionListApi] = useState({label:detailApi.apies.data.api_url,value:detailApi.apies.data.api_url})
  const [nameApiChoice, setNameApiChoice] = useState(detailApi.apies.data.api_url)
const [defaultValueListField, setDefaultValueListField] = useState(detailApi.apies.data.fields.map((items)=>{
  return {label:items,value:items}
}))
  const [from, setFrom] = useState(detailApi.apies.data.from_date);
  const [to, setTo] = useState(detailApi.apies.data.to_date);
  const [field, setField] = useState([]);

  const onChangePeriodeDateStart = (date) => {
    setFrom(moment(date).format("YYYY-MM-DD"));
    // checkPeriod(moment(date).format("YYYY-MM-DD"));
  };
  const onChangePeriodeDateEnd = (date) => {
    setTo(moment(date).format("YYYY-MM-DD"));
    // checkPeriod(moment(date).format("YYYY-MM-DD"));
  };

  const changeListApi = (e) => {
    console.log("changeListApi ee", e);
    let resultSelect = e.map((items) => {
      return items.label;
    });
    console.log("resultSelect", resultSelect);
    setField(resultSelect);
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
          // console.log("berhasil get field", data);
          let optionListFieldResult = data.data.map((items) => {
            return {
              ...items,
              label: items.field_name,
              value: items.field_name,
            };
          });
          // console.log("optionListField", optionListField);

          setOptionListField(optionListFieldResult);

          // change list add label and value sisa implementasi ke render html list field and set state needed
        } catch (error) {
          console.log("error get list api", error);
        }
      }

      getListField(apiChoice, token);
    }



  }, [apiChoice,token])

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 mb-5 mt-5"
              style={{ fontSize: "24px" }}
            >
              Ubah API
            </h3>
          </div>
          <div className="card-body pt-0">
            <form>
              <div className="form-group">
                <label>Nama API</label>
                <input
                  value={nameApi}
                  onChange={(e) => setNameApi(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Masukan nama api"
                />
              </div>
              <div className="form-group">
                <label>Nama Pengguna</label>
                <input
                  value={nameUser}
                  onChange={(e) => setNameUser(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Masukan nama user"
                />
              </div>

              {status === "Aktif" ? (
                <div className="form-group">
                  <label>Status</label>
                  <select onChange={(e)=>setStatus(e.target.value)} className="form-control">
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </div>
              ) : (
                <div className="form-group">
                  <label>Status</label>
                  <select onChange={(e)=>setStatus(e.target.value)} className="form-control">
                    <option value="Nonaktif">Nonaktif</option>
                    <option value="Aktif">Aktif</option>
                  </select>
                </div>
              )}

              <div className="form-group">
                <label>Pilih API</label>
                <Select
                  ref={(ref) => (selectRefListApi = ref)}
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Pilih provinsi"
                  defaultValue={defaultOptionListApi}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={true}
                  name="color"
                  // onChange={(e) => changeListProvinsi(e)}
                  options={optionListApi}
                />
              </div>


              <div className="form-group">
                <label>Field</label>
                 <Select
                  ref={(ref) => (selectRefListField = ref)}
                  isMulti
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Pilih provinsi"
                  defaultValue={defaultValueListField}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={true}
                  name="color"
                  onChange={(e) => changeListApi(e)}
                  options={optionListField}
                />
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
                    />
                    <IconCalender
                      className="right-center-absolute"
                      style={{ right: "10px" }}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <label>To</label>
                  <div className="d-flex align-items-center position-relative datepicker-w mt-2">
                    <DatePicker
                      className="form-search-date form-control cursor-pointer"
                      onChange={(date) => onChangePeriodeDateEnd(date)}
                      value={to}
                      dateFormat="YYYY-MM-DD"
                      placeholderText="To"
                      minDate={moment().toDate()}
                    />
                    <IconCalender
                      className="right-center-absolute"
                      style={{ right: "10px" }}
                    />
                  </div>
                </div>
              </div>
            </form>
            <div className="form-group row">
              <div className="col-sm-12 d-flex justify-content-end">
                <Link href="/site-management/setting/api">
                  <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                    Kembali
                  </a>
                </Link>
                <button
                  type="button"
                  className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
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
