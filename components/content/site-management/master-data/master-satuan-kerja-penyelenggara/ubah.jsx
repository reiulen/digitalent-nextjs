import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useSelector } from "react-redux";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from 'js-cookie'

import SimpleReactValidator from "simple-react-validator";

import styles from "../../../../../styles/previewGaleri.module.css"

const TambahApi = ({ token }) => {
  const router = useRouter();

  let selectRefProvinsi;

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const detailUnitWork = useSelector((state) => state.detailUnitWork);
  let sortirOptionTempProv = detailUnitWork?.unitWork?.provinsi

  let optionTempProv = sortirOptionTempProv.map((items) => {
    return { ...items, label: items.provinsi, region: items.provinsi, value: items.id }
  })

  const allProvincesSite = useSelector((state) => state.allProvincesSite);
  let sortirOptionTempProvList = allProvincesSite?.data

  const [changeProvince, setChangeProvince] = useState(false)


  let optionTempProvList = sortirOptionTempProvList.map((items) => {
    return { ...items, value: items.label }
  })
  
  const [valueProvinsi, setValueProvinsi] = useState(optionTempProv);
  const [nameUnitWork, setNameUnitWork] = useState(detailUnitWork.unitWork.name);
  const [status, setStatus] = useState(detailUnitWork.unitWork.status);
  

  let province = optionTempProvList.filter(item => {
    return !valueProvinsi.some(filter => {
      return item.label === filter.provinsi
    })
  })
  // filter data just region show
  const changeListProvinsi = (e) => {
    let data = e.map((items) => {
      return { ...items, region: items.label };
    });
    const datas = data.map((items) => {
      return {
        ...items,
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
          "Oops...",
          "Form nama satuan kerja tidak boleh kosong",
          "error"
        );
      }
      else if (status === "") {
        Swal.fire("Oops...", "Form status tidak boleh kosong", "error");
      }
      else {
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
              id: router.query.id,
              name: nameUnitWork,
              status: status,
              data: valueProvinsi.length === 0 ? optionTempProv : valueProvinsi,
            };

            try {
              let { data } = await axios.post(
                `${process.env.END_POINT_API_SITE_MANAGEMENT}api/satuan/update`,
                sendData,
                {
                  headers: {
                    authorization: `Bearer ${token}`,
                    Permission: Cookies.get("token_permission")
                  },
                }
              );

              Swal.fire("Berhasil", "Data berhasil diubah", "success").then(() => {
                router.push(
                  `/site-management/master-data/master-satuan-kerja-penyelenggara/`
                );
              });
            } catch (error) {
              Swal.fire("Oops...", `${error.response.data.message}`, "error");
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

  return (
    <PageWrapper>
      <form>
        <div className="col-lg-12 order-1 px-0">
          <div className="card card-custom card-stretch gutter-b">
            <div className="card-header">
              <h3
                className="card-title font-weight-bolder text-dark"
              >
                Ubah Satuan Kerja Penyelenggara
              </h3>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Nama Satuan Kerja</label>
                <input
                  onChange={(e) => setNameUnitWork(e.target.value)}
                  value={nameUnitWork}
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
                  onChange={(e) => setStatus(e.target.value)}
                  value={status}
                  onBlur={() => simpleValidator.current.showMessageFor("status")}
                >
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
                  ref={(ref) => { selectRefProvinsi = ref }}
                  className={`${styles.cari} basic-single`}
                  classNamePrefix="select"
                  placeholder="Pilih provinsi"
                  defaultValue={valueProvinsi}
                  isMulti
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={true}
                  name="color"
                  onChange={(e) => changeListProvinsi(e)}
                  options={province}
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
                    type="button"
                    className={`${styles.btnSimpan} btn btn-primary-rounded-full rounded-pill`}
                    onClick={(e) => submit(e)}
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
