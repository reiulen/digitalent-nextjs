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

  const drowpdownProvinsi = useSelector((state) => state.drowpdownProvinsi);
  const detailUnitWork = useSelector((state) => state.detailUnitWork);
  let tempOptionsProvinsi = drowpdownProvinsi.data.data;
  let defaultOptionFromApi = detailUnitWork.unitWork.provinsi;
  const [provinsi, setProvinsi] = useState([]);
  const [nameUnitWork, setNameUnitWork] = useState("");
  const [status, setStatus] = useState("");
  const [valueProvinsi, setValueProvinsi] = useState("");
  const [defaultValueProvisniApi, setDefaultValueProvisniApi] = useState([])
  const [kabupaten, setKabupaten] = useState([]);

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
    } else if (valueProvinsi === "") {
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

            Swal.fire("Berhasil", "Data berhasil diubah", "succes").then(() => {
              router.push(
                `/site-management/master-data/master-satuan-kerja-penyelenggara/`
              );
            });
          } catch (error) {
            Swal.fire("Gagal ubah", `${error.response.data.message}`, "error");
          }
        }
      });
    }
  };

  useEffect(() => {
    let optionProvinsi = tempOptionsProvinsi.map((items) => {
      return { ...items, label: items.value };
    });
    setProvinsi(optionProvinsi);


    
    let optionProvinsiApiDefault = defaultOptionFromApi.map((items) => {
      return { ...items, label: items.provinsi };
    });
    setDefaultValueProvisniApi(optionProvinsiApiDefault);


  }, [defaultOptionFromApi,tempOptionsProvinsi]);
  return (
    <PageWrapper>
      <form onSubmit={submit}>
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
                  value={detailUnitWork.unitWork.name}
                  type="text"
                  className="form-control"
                  placeholder="Placeholder"
                />
                {/* <span className="form-text text-muted">
                  Please enter your full name
                </span> */}
              </div>
              <div className="form-group">
                <label>Status</label>
                {detailUnitWork.unitWork.status === "Aktif" ? (
                  <select
                    className="form-control"
                    id="exampleSelect1"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Tidak Aktif">Tidak Aktif</option>
                  </select>
                ) : (
                  <select
                    className="form-control"
                    id="exampleSelect1"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Tidak Aktif">Tidak Aktif</option>
                    <option value="Aktif">Aktif</option>
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
                  isMulti
                  // defaultValue={allMK.stateListMitra[0]}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={true}
                  name="color"
                  onChange={(e) => changeListProvinsi(e)}
                  options={provinsi}
                />
                {/* <span className="form-text text-muted">
                  Please enter your full name
                </span> */}
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
                    type="submit"
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
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
