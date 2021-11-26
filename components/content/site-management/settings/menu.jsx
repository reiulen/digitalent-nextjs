import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import PageWrapper from "../../../wrapper/page.wrapper";
import IconDelete from "../../../assets/icon/Delete";
import IconAdd from "../../../assets/icon/Add";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import Modal from "../../site-management/modal";

import styles from "../../../../styles/sitemanagement/userMitra.module.css";
import styles2 from "../../../../styles/previewGaleri.module.css";

import SimpleReactValidator from "simple-react-validator";

const Table = ({ token }) => {
  const [array, setArray] = useState([]);
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();
  const router = useRouter();

  const allPage = useSelector((state) => state.allPage);

  const firstPush = () => {
    let _temp = [...array];
    _temp.push({
      name: "",
      page_id: "",
    });
    setArray(_temp);
  };

  const handleDeleteMenu = (i) => {
    let _temp = [...array];
    _temp.splice(i, 1);
    setArray(_temp);
  };

  const handleChangeInput = (e, i) => {
    let _temp = [...array];
    if (e.target.name === "inputName") {
      _temp[i].name = e.target.value;
    } else {
      _temp[i].id = e.target.value;
    }
    setArray(_temp);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {

      let datar = [...array]

      let dataPage = datar.map((row, i) => {
        return {
          name: row.name,
          page_id: row.id
        }
      })

      const sendData = { menu: dataPage };
      let { data } = await axios.post(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-menu/store`,
        sendData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire("Berhasil", "Data berhasil disimpan", "success");
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



  const cancel = () => {
    Swal.fire({
      title: "Apakah anda yakin ingin batal ?",
      // text: "Data ini tidak bisa dikembalikan !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya !",
      dismissOnDestroy: false,
    }).then((result) => {
      if (result.isConfirmed) {
        let arrayStorage = JSON.parse(sessionStorage.getItem("array2"));
        setArray(arrayStorage);
      }
    });
  };

  useEffect(() => {
    async function getDataMenu(token) {
      try {
        let { data } = await axios.get(
          `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-menu/all`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setArray(data.data);
        sessionStorage.setItem("array2", JSON.stringify(data.data));
        localStorage.setItem("array2", data.data);
      } catch (error) {
        Swal.fire("Oops...", `${error.response.data.message}`, "error");
      }
    }
    getDataMenu(token);
  }, [token]);

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header row border-b">
            <h3 className={`${styles2.headTitle} col-12 col-sm-8 col-md-8 col-lg-7 col-xl-9`}>
              Menu
            </h3>
            <div className="card-toolbar row col-12 col-sm-4 col-md-4 col-lg-5 col-xl-3">
              <button
                className={`${styles2.btnTambah} btn btn-primary-rounded-full px-6 font-weight-bold btn-block`}
                onClick={() => firstPush()}
              >
                <IconAdd className="mr-3" width="14" height="14" />
                Tambah Menu
              </button>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={submit}>
              {array.map((parrent, i) => {
                return (
                  <div key={i}>
                    <div>
                      <div className="row">
                        <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                          <div className="form-group">
                            <label>Menu {i + 1}</label>
                            <input
                              value={parrent.name}
                              name="inputName"
                              onChange={(e) => handleChangeInput(e, i)}
                              type="text"
                              className="form-control"
                              placeholder="Masukkan Menu"
                              onBlur={() => simpleValidator.current.showMessageFor("menu")}
                            />
                            {simpleValidator.current.message(
                              "menu",
                              parrent.name,
                              "required",
                              { className: "text-danger" }
                            )}
                          </div>

                        </div>
                        <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                          <div className="form-group">
                            <label>Halaman {i + 1}</label>
                            <select
                              name=""
                              id=""
                              className="form-control"
                              defaultValue={parrent.page_id}
                              onChange={(e) => handleChangeInput(e, i)}
                              onBlur={(e) => {
                                simpleValidator.current.showMessageFor("halaman");
                              }}
                            >
                              <option selected disabled value="">
                                -- Halaman --
                              </option>
                              {!allPage || (allPage && allPage.data.setting_page.length === 0) ? (
                                <option value="">Data kosong</option>
                              ) : (
                                allPage &&
                                allPage.data.setting_page.map((row) => {
                                  return (
                                    <option key={row.id} value={row.id}>
                                      {row.id}
                                    </option>
                                  );
                                })
                              )}
                            </select>

                            {simpleValidator.current.message(
                              "halaman",
                              parrent.id,
                              "required",
                              { className: "text-danger" }
                            )}
                          </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                          <div className="d-flex align-items-center h-100">
                            <div className={`${styles.deleteMenu}`}>
                              <button
                                type="button"
                                className="col-11 col-sm-8 col-md-4 col-lg-4 col-xl-3 btn"
                                style={{ backgroundColor: "#EE2D41", position: 'absolute', top: '25px' }}
                                onClick={() => handleDeleteMenu(i)}
                              >
                                <IconDelete />
                              </button>
                            </div>
                            <Modal />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {!array.length ? <div className="d-flex justify-content-center py-5">Data kosong</div> : ""}

              <div className="form-group row mt-10 mt-sm-5">
                <div className="col-sm-12 d-flex justify-content-end">
                  <button
                    className={`${styles.btnKembali} btn btn-white-ghost-rounded-full rounded-pill mr-2`}
                    type="button"
                    onClick={() => cancel()}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
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

export default Table;
