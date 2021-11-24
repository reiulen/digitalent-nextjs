import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import LoadingTable from "../../../LoadingTable";
import IconEye from "../../../assets/icon/Eye";
import IconPencil from "../../../assets/icon/Pencil";
import IconDelete from "../../../assets/icon/Delete";
import IconAdd from "../../../assets/icon/Add";
import IconSearch from "../../../assets/icon/Search";
import IconPlus from "../../../../public/assets/icon/Plus.svg";
import IconMinus from "../../../../public/assets/icon/Minus.svg";
import Image from "next/image";
import Select from "react-select";
import {
  dropdownKabupaten,
  dropdownPelatihanbyTema,
  dropdownTemabyAkademi,
} from "../../../../redux/actions/pelatihan/function.actions";

const UbahRole = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const [tahun, setTahun] = useState(null);
  const [akademi, setAkademi] = useState(null);
  const [tema, setTema] = useState(null);
  const [penyelenggara, setPenyelenggara] = useState(null);
  const [pelatihan, setPelatihan] = useState(null);
  const [provinsi, setProvinsi] = useState(null);
  const [kota, setKota] = useState(null);

  const drowpdownYear = useSelector((state) => state.drowpdownYear);
  const drowpdownAkademi = useSelector((state) => state.drowpdownAkademi);
  const drowpdownTemabyAkademi = useSelector(
    (state) => state.drowpdownTemabyAkademi
  );
  const drowpdownPenyelenggara = useSelector(
    (state) => state.drowpdownPenyelenggara
  );
  const drowpdownPelatihanbyTema = useSelector(
    (state) => state.drowpdownPelatihanbyTema
  );
  const drowpdownProvinsi = useSelector((state) => state.drowpdownProvinsi);
  const drowpdownKabupaten = useSelector((state) => state.drowpdownKabupaten);

  console.log(drowpdownKabupaten);

  const btnIconPlus = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "19px",
    height: "19px",
    borderRadius: "5px",
    backgroundColor: "#ADB5BD",
  };
  const btnMin = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "19px",
    height: "19px",
    borderRadius: "5px",
    backgroundColor: "#4299E1",
  };

  const onNewReset = () => {
    router.replace("/site-management/api", undefined, {
      shallow: true,
    });
  };
  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 mb-5 mt-5 titles-1">
              Filter Export Data
            </h3>
          </div>
          <div className="card-body pt-0 px-4 px-sm-8">
            <form>
              <div className="form-group">
                <label htmlFor="exampleSelect1">Tahun</label>
                <Select
                  placeholder="Silahkan Pilih Tahun"
                  options={drowpdownYear.data.data.map((item) => {
                    return {
                      label: item.value,
                      value: item.id,
                    };
                  })}
                  onChange={(e) =>
                    setTahun({ value: e?.value, label: e?.label })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleSelect1">Akademi</label>
                <Select
                  placeholder="Silahkan Pilih Akademi"
                  options={drowpdownAkademi.data.data}
                  onChange={(e) => {
                    setTema(null);
                    setAkademi({ value: e?.value, label: e?.label });
                    dispatch(dropdownTemabyAkademi(e?.value, token));
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleSelect1">Tema</label>
                <Select
                  placeholder="Silahkan Pilih Tema"
                  value={tema}
                  isDisabled={akademi === null}
                  options={drowpdownTemabyAkademi.data.data}
                  onChange={(e) => {
                    setPelatihan(null);
                    dispatch(dropdownPelatihanbyTema(e?.value, token));
                    setTema({ value: e?.value, label: e?.label });
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleSelect1">Penyelenggara</label>
                <Select
                  placeholder="Silahkan Pilih Penyelenggara"
                  options={drowpdownPenyelenggara.data.data.map((item) => {
                    return {
                      label: item.label,
                      value: item.id,
                    };
                  })}
                  onChange={(e) =>
                    setPenyelenggara({ value: e?.value, label: e?.label })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleSelect1">Pelatihan</label>
                <Select
                  placeholder="Silahkan Pilih Pelatihan"
                  isDisabled={tema === null}
                  value={pelatihan}
                  options={drowpdownPelatihanbyTema.data.data}
                  onChange={(e) =>
                    setPelatihan({ value: e?.value, label: e?.label })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleSelect1">Provinsi</label>
                <Select
                  placeholder="Silahkan Pilih Tahun"
                  options={drowpdownProvinsi.data.data.map((item) => {
                    return {
                      label: item.label,
                      value: item.id,
                    };
                  })}
                  onChange={(e) => {
                    setKota(null)
                    setProvinsi({ value: e?.value, label: e?.label });
                    dispatch(dropdownKabupaten(token, e?.value));
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleSelect1">Kota/Kabupaten</label>
                <Select
                  placeholder="Silahkan Pilih Tahun"
                  value={kota}
                  isDisabled={provinsi === null}
                  options={drowpdownKabupaten?.data?.data?.map((item) => {
                    return {
                      label: item.value,
                      value: item.id,
                    };
                  })}
                  onChange={(e) =>
                    setKota({ value: e?.value, label: e?.label })
                  }
                />
              </div>
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
                    // onClick={() => handleAddInput()}
                  >
                    <IconSearch className="mr-4" />
                    Search
                  </p>
                </div>
              </div>
            </form>

            {/* <div className="table-page mt-5">
              <h3
                className="card-title font-weight-bolder  w-100  mt-5 mb-0"
                style={{ fontSize: "24px", color: "#04AA77" }}
              >
                Pencarian Sukses
              </h3>
              <p className="mb-0" style={{ color: "#6C6C6C" }}>
                200 Total Data
              </p>
              <div className="table-responsive mt-10">
                <table className="table table-separate table-head-custom table-checkable">
                  <thead style={{ background: "#F3F6F9" }}>
                    <tr>
                      <th className="text-left">No</th>
                      <th className="text-left align-middle">Nama Peserta</th>
                      <th className="text-left align-middle">Pelatihan</th>
                      <th className="text-left align-middle">
                        Tanggal Pelatihan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="align-middle text-left">1</td>
                      <td className="align-middle text-left">email</td>
                      <td className="align-middle text-left">08973383733</td>
                      <td className="align-middle text-left">tgl </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="row px-4">
                <div className="table-pagination">
                  pagination
                
                </div>

                <div className="table-total ml-auto mr-4">
                  <div className="row mt-4">
                    <div className="col-4 mr-0 p-0">
                      <select
                        className="form-control cursor-pointer pr-2"
                        id="exampleFormControlSelect2"
                        defaultValue=""
                        style={{
                          width: "63px",
                          background: "#F3F6F9",
                          borderColor: "#F3F6F9",
                          color: "#9E9E9E",
                        }}
                      >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                      </select>
                    </div>
                    <div className="col-8 my-auto">
                      <p
                        className="align-middle mt-3"
                        style={{ color: "#B5B5C3", whiteSpace: "nowrap" }}
                      >
                        Total Data 9 List Data
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            {/* start footer btn */}
            <div className="form-group row mt-10">
              <div className="col-sm-12 d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                  onClick={() => {
                    router.push("/site-management/export-data")
                  }}
                >
                  Simpan
                </button>
              </div>
            </div>
            {/* end footer btn */}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default UbahRole;
