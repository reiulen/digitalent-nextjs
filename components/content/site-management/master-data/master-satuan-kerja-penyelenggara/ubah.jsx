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
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";

const TambahApi = ({ token }) => {
  const router = useRouter();
  let selectRefProvinsi = null;

 

  const detailUnitWork = useSelector((state) => state.detailUnitWork);
  console.log("detailUnitWork", detailUnitWork);
  let sortirOptionTempProv = detailUnitWork?.unitWork?.provinsi
  let optionTempProv = sortirOptionTempProv.map((items)=>{
    return {...items,label:items.provinsi}
  })
  console.log("optionTempProv",optionTempProv)

  



const allProvincesSite = useSelector((state) => state.
allProvincesSite);
console.log("allProvincesSite", allProvincesSite);
let sortirOptionTempProvList = allProvincesSite?.data
  let optionTempProvList = sortirOptionTempProvList.map((items)=>{
    return {...items,value:items.label}
  })
  console.log("optionTempProvList",optionTempProvList)
 const [valueProvinsi, setValueProvinsi] = useState([]);
  console.log("valueProvinsi",valueProvinsi)
  const [nameUnitWork, setNameUnitWork] = useState(detailUnitWork.unitWork.name);
  const [status, setStatus] = useState(detailUnitWork.unitWork.status);



// const [optionProvinces, setOptionProvinces] = useState([])

  // console.log("detailUnitWork", detailUnitWork);
  // let tempOptionsProvinsi = drowpdownProvinsi.data.data;
  // let defaultOptionFromApi = detailUnitWork.unitWork.provinsi;
  // const [provinsi, setProvinsi] = useState([]);
  // const [defaultValueProvisniApi, setDefaultValueProvisniApi] = useState([])
  // console.log("defaultValueProvisniApi",defaultValueProvisniApi)
  // const [kabupaten, setKabupaten] = useState([]);

  // filter data just region show
  const changeListProvinsi = (e) => {
    let data = e.map((items) => {
      return { ...items, region: items.label };
    });
    const datas = data.map((items) => {
      return {
        region: items.region,
      };
    });

    setValueProvinsi(datas);

    console.log("change provinsi value", datas);
  };

  const submit = (e) => {
    e.preventDefault();

    if (nameUnitWork === "") {
      Swal.fire(
        "Gagal simpan",
        "Form nama satuan kerja tidak boleh kosong",
        "error"
      );
    } else if (status === "") {
      Swal.fire("Gagal simpan", "Form status tidak boleh kosong", "error");
    } else if (valueProvinsi.length === 0) {
      Swal.fire("Gagal simpan", "Form provinsi tidak boleh kosong", "error");
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
      }).then(async (result) => {
        if (result.value) {
          const sendData = {
            id:router.query.id,
            name: nameUnitWork,
            status: status,
            data: valueProvinsi,
          };

          try {
            let { data } = await axios.post(
              `${process.env.END_POINT_API_SITE_MANAGEMENT}api/satuan/update`,
              sendData,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            );

            Swal.fire("Berhasil", "Data berhasil diubah", "success").then(() => {
              router.push(
                `/site-management/master-data/master-satuan-kerja-penyelenggara/`
              );
            });
          } catch (error) {
            console.log(error);
            Swal.fire("Gagal ubah", `${error.response.data.message}`, "error");
          }
        }
      });
    }
  };

 

  // useEffect(() => {
  //   let optionProvinsi = tempOptionsProvinsi.map((items) => {
  //     return { ...items, label: items.value };
  //   });
  //   setProvinsi(optionProvinsi);


    
  //   let optionProvinsiApiDefault = defaultOptionFromApi.map((items) => {
  //     return { ...items, label: items.provinsi };
  //   });
  //   setDefaultValueProvisniApi(optionProvinsiApiDefault);


  // }, [defaultOptionFromApi,tempOptionsProvinsi]);
  return (
    <PageWrapper>
      <form>
        <div className="col-lg-12 order-1 px-0">
          <div className="card card-custom card-stretch gutter-b">
            <div className="card-header border-0">
              <h3
                className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 mb-5 mt-5"
                style={{ fontSize: "24px" }}
              >
                Ubah Satuan Kerja Penyelenggara
              </h3>
            </div>
            <div className="card-body pt-0">
              <div className="form-group">
                <label>Nama Satuan Kerja</label>
                <input
                onChange={(e)=>setNameUnitWork(e.target.value)}
                  value={nameUnitWork}
                  type="text"
                  className="form-control"
                  placeholder="Placeholder"
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                {detailUnitWork.unitWork.status == "0" ? (
                  <select
                    className="form-control"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="0">Tidak Aktif</option>
                    <option value="1">Aktif</option>
                  </select>
                ) : (
                  <select
                    className="form-control"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="1">Aktif</option>
                    <option value="0">Tidak Aktif</option>
                  </select>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="exampleSelect1">Provinsi</label>
                <Select
                  ref={(ref) => (selectRefProvinsi = ref)}
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Pilih provinsi"
                  defaultValue={optionTempProv}
                  isMulti
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={true}
                  name="color"
                  onChange={(e) => changeListProvinsi(e)}
                  options={optionTempProvList}
                />
              </div>

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link
                    href="/site-management/master-data/master-satuan-kerja-penyelenggara"
                    passHref
                  >
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                      Kembali
                    </a>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                    onClick={(e)=>submit(e)}
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </PageWrapper>
  );
};

export default TambahApi;
