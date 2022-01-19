import React, { useEffect, useState, useRef } from "react";
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
import Cookies from 'js-cookie'

import SimpleReactValidator from "simple-react-validator";

import styles from "../../../../../styles/previewGaleri.module.css"

const TambahApi = ({ token }) => {
  const router = useRouter();
  let selectRefProvinsi = null;

  const drowpdownProvinsi = useSelector((state) => state.allProvincesSite);
  let tempOptionsProvinsi = drowpdownProvinsi?.data;
  const [provinsi, setProvinsi] = useState([]);
  const [nameUnitWork, setNameUnitWork] = useState("");
  const [status, setStatus] = useState("");
  const [valueProvinsi, setValueProvinsi] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

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
    if (simpleValidator.current.allValid()) {

      if (nameUnitWork === "") {
        Swal.fire(
          "Gagal simpan",
          "Form nama satuan kerja tidak boleh kosong",
          "error"
        );
      } else if (status === "") {
        Swal.fire("Gagal simpan", "Form status tidak boleh kosong", "error");
      } else if (!valueProvinsi.length) {
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
                `${process.env.END_POINT_API_SITE_MANAGEMENT}api/satuan/store`,
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
                  router.push(
                    `/site-management/master-data/master-satuan-kerja-penyelenggara/`
                  );
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
  };

  useEffect(() => {
    let optionProvinsi = tempOptionsProvinsi?.map((items) => {
      return { ...items, value: items.label };
    });
    setProvinsi(optionProvinsi);
  }, [tempOptionsProvinsi]);
  return (
    <PageWrapper>
      <form onSubmit={submit}>
        <div className="col-lg-12 order-1 px-0">
          <div className="card card-custom card-stretch gutter-b">
            <div className="card-header">
              <h3 className="card-title font-weight-bolder text-dark">
                Tambah Satuan Kerja Penyelenggara
              </h3>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Nama Satuan Kerja</label>
                <input
                  onChange={(e) => setNameUnitWork(e.target.value)}
                  type="text"
                  className={`${styles.cari} form-control`}
                  placeholder="Masukkan nama satuan kerja"
                  onBlur={() => simpleValidator.current.showMessageFor("namaSatuanKerja")}
                />

                {simpleValidator.current.message(
                  "namaSatuanKerja",
                  nameUnitWork,
                  "required",
                  { className: "text-danger" }
                )}
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  className={`${styles.cari} form-control`}
                  id="exampleSelect1"
                  onChange={(e) => setStatus(e.target.value)}
                  onBlur={() => simpleValidator.current.showMessageFor("status")}
                >
                  <option value="">Pilih Status</option>
                  <option value="1">Aktif</option>
                  <option value="0">Tidak Aktif</option>
                </select>

                {simpleValidator.current.message(
                  "status",
                  status,
                  "required",
                  { className: "text-danger" }
                )}
              </div>
              <div className="form-group">
                <label htmlFor="exampleSelect1">Provinsi</label>
                <Select
                  ref={(ref) => (selectRefProvinsi = ref)}
                  className={`${styles.cari} basic-single`}
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
                  onBlur={() => simpleValidator.current.showMessageFor("provinsi")}
                />

                {simpleValidator.current.message(
                  "provinsi",
                  valueProvinsi,
                  "required",
                  { className: "text-danger" }
                )}
              </div>
              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link
                    href="/site-management/master-data/master-satuan-kerja-penyelenggara"
                    passHref
                  >
                    <a className={`${styles.btnKembali} btn btn-white-ghost-rounded-full rounded-pill mr-2`}>
                      Kembali
                    </a>
                  </Link>
                  <button
                    type="submit"
                    className={`${styles.btnSimpan} btn btn-primary-rounded-full rounded-pill`}
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
