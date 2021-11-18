import React, { useEffect, useState } from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import IconDelete from "../../../assets/icon/Delete";
import IconAdd from "../../../assets/icon/Add";
import Image from "next/image";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import Modal from "../../site-management/modal";
const Table = ({ token }) => {
  const [array, setArray] = useState([]);

  const firstPush = () => {
    let _temp = [...array];
    _temp.push({
      name: "",
      link: "",
      child: [],
    });
    setArray(_temp);
  };

  const handleCreate = (index) => {
    let _temp = [...array];

    _temp.forEach((item, i) => {
      if (i === index) {
        item.child.push({
          name: "",
          link: "",
          child: [],
        });
      }
    });
    setArray(_temp);
  };

  const handleCreateWithoutLink = (index) => {
    let _temp = [...array];

    _temp.forEach((item, i) => {
      if (i === index) {
        item.child.push({
          name: "",
          child: [],
        });
      }
    });

    setArray(_temp);
  };
  const handleCreate2 = (index, j) => {
    let _temp = [...array];
    _temp[index].child[j].child.push({
      name: "",
      link: "",
    });
    setArray(_temp);
  };

  const handleDeletechild = (i, j, k) => {
    let _temp = [...array];
    _temp[i].child[j].child.splice(k, 1);
    setArray(_temp);
  };

  const handleDeleteChild = (i, j) => {
    let _temp = [...array];
    _temp[i].child.splice(j, 1);
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
      _temp[i].error = "";
    } else {
      _temp[i].link = e.target.value;
      _temp[i].error = "";
    }
    setArray(_temp);
  };

  const handleChangeInput1 = (e, i, j) => {
    let _temp = [...array];
    if (e.target.name === "inputName") {
      _temp[i].child[j].name = e.target.value;
      _temp[i].child[j].error = "";
    } else {
      _temp[i].child[j].error = "";
      _temp[i].child[j].link = e.target.value;
    }
    setArray(_temp);
  };

  const handleChangeInput2 = (e, i, j, k) => {
    let _temp = [...array];
    if (e.target.name === "inputName") {
      _temp[i].child[j].child[k].name = e.target.value;
      _temp[i].child[j].child[k].error = "";
    } else {
      _temp[i].child[j].child[k].error = "";
      _temp[i].child[j].child[k].link = e.target.value;
    }
    setArray(_temp);
  };

  const submit = async (e) => {
    e.preventDefault();
    let datar = [...array]

    datar.forEach((items, index) => {
      if (!items.name && !items.link) {
        datar[index] = {
          ...items,
          error: "field name dan link tidak boleh kosong",
        };
        setArray(datar)
      }
      if (items.name && !items.link) {
        datar[index] = { ...items, error: "field link tidak boleh kosong" };
        setArray(datar)
      }
      if (!items.name && items.link) {
        datar[index] = { ...items, error: "field name tidak boleh kosong" };
        setArray(datar)
      }
      if (items.child.length) {
        items.child.forEach((itm, idx) => {
          if (!itm.name && itm.link === "") {
            datar[index].child[idx] = {
              ...itm,
              error: "field name dan link submenu tidak boleh kosong",
            };
            setArray(datar)
          }
          if (itm.name && itm.link === "") {
            datar[index].child[idx] = {
              ...itm,
              error: "field link submenu tidak boleh kosong",
            };
            setArray(datar)
          }
          if (!itm.name && itm.link !== "") {
            datar[index].child[idx] = {
              ...itm,
              error: "field link submenu tidak boleh kosong",
            };
            setArray(datar)
          }
          if (!itm.name && itm.link === undefined) {
            datar[index].child[idx] = {
              ...itm,
              error: "field name submenu tidak boleh kosong",
            };
            setArray(datar)
          }
          if (itm.child.length) {
            itm.child.forEach((itz, idz) => {
              if (!itz.name && !itz.link) {
                datar[index].child[idx].child[idz] = {
                  ...itz,
                  error: "field name dan link submenu tidak boleh kosong",
                };
                setArray(datar)
              }
              if (itz.name && !itz.link) {
                datar[index].child[idx].child[idz] = {
                  ...itz,
                  error: "field link submenu tidak boleh kosong",
                };
                setArray(datar)
              }
              if (!itz.name && itz.link) {
                datar[index].child[idx].child[idz] = {
                  ...itz,
                  error: "field name submenu tidak boleh kosong",
                };
                setArray(datar)
              }
            });
          }
        });
      }
    });
    
    const sendData = { menu: array };
    try {
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
    } catch (error) {
      Swal.fire("Gagal", `${error.response.data.message}`, "error")
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
        Swal.fire("Gagal", `${error.response.data.message}`, "error");
      }
    }
    getDataMenu(token);
  }, [token]);
  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-b">
            <h3 className="card-title font-weight-bolder text-dark titles-1">
              Menu
            </h3>
            <div className="card-toolbar">
              <button
                className="btn btn-rounded-full bg-blue-primary text-white"
                onClick={() => firstPush()}
              >
                <IconAdd className="mr-3" width="14" height="14" />
                Tambah Menu
              </button>
            </div>
          </div>
          <div className="card-body pt-0 mt-10 px-4 px-sm-8">
            <form onSubmit={submit}>
              {array.map((parrent, i) => {
                return (
                  <div key={i}>
                    <div>
                      <div className="row">
                        <div className="col-md-12 col-xl-5">
                          <div className="form-group">
                            <label>Menu {i + 1}</label>
                            <input
                              value={parrent.name}
                              name="inputName"
                              onChange={(e) => handleChangeInput(e, i)}
                              type="text"
                              className="form-control"
                              placeholder="Masukkan Menu"
                            />
                          </div>
                          <p className="error-text mb-4">{parrent?.error}</p>
                        </div>
                        <div className="col-md-12 col-xl-5">
                          <div className="form-group">
                            <label>Link {i + 1}</label>
                            <input
                              value={parrent.link}
                              name="inputLink"
                              onChange={(e) => handleChangeInput(e, i)}
                              type="text"
                              className="form-control"
                              placeholder={`Masukkan link ${i+1}`}
                            />
                          </div>
                        </div>
                        <div className="col-md-12 col-xl-2">
                          <div className="d-flex align-items-center h-100">
                            <button
                              type="button"
                              className="btn mr-4 mb-5"
                              style={{ backgroundColor: "#4299E1" }}
                              onClick={() => handleCreateWithoutLink(i)}
                            >
                              <IconAdd />
                            </button>
                            <button
                              type="button"
                              className="btn mr-4 mb-5 minimal-image"
                              style={{ backgroundColor: "#4299E1" }}
                              onClick={() => handleCreate(i)}
                            >
                              <Image
                                src="/assets/icon/link.svg"
                                alt="link"
                                width={16}
                                height={16}
                              />
                            </button>
                            <button
                              type="button"
                              className="btn mb-5"
                              style={{ backgroundColor: "#EE2D41" }}
                              onClick={() => handleDeleteMenu(i)}
                            >
                              <IconDelete />
                            </button>
                            <Modal />
                          </div>
                        </div>
                      </div>
                    </div>

                    {parrent.child.map((child1, j) => {
                      return (
                        <div key={j}>
                          {child1.link === "" || child1.link ? (
                            <div className="row pl-10">
                              <div className="col-md-12 col-xl-5">
                                <div className="form-group">
                                  <label>Sub Menu {j + 1}</label>
                                  <input
                                    onChange={(e) =>
                                      handleChangeInput1(e, i, j)
                                    }
                                    name="inputName"
                                    type="text"
                                    value={child1.name}
                                    className="form-control"
                                    placeholder={`Masukkan sub menu ${j+1}`}
                                  />
                                </div>
                                <p className="error-text mb-4">{child1?.error}</p>
                              </div>
                              <div className="col-md-12 col-xl-5">
                                <div className="form-group">
                                  <label>Sub Link {j + 1}</label>
                                  <input
                                    value={child1.link}
                                    onChange={(e) =>
                                      handleChangeInput1(e, i, j)
                                    }
                                    name="inputLink"
                                    type="text"
                                    className="form-control"
                                    placeholder={`Masukkan sub link ${j+1}`}
                                  />
                                </div>
                              </div>
                              <div className="col-md-12 col-xl-2">
                                <div className="d-flex align-items-center h-100">
                                  <button
                                    type="button"
                                    className="btn mr-4 mb-5 minimal-image"
                                    style={{ backgroundColor: "#4299E1" }}
                                    onClick={() => handleCreate2(i, j)}
                                  >
                                    <Image
                                      src="/assets/icon/link.svg"
                                      alt="link"
                                      width={16}
                                      height={16}
                                    />
                                  </button>
                                  <button
                                    type="button"
                                    className="btn mb-5"
                                    style={{ backgroundColor: "#EE2D41" }}
                                    onClick={() => handleDeleteChild(i, j)}
                                  >
                                    <IconDelete />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="row pl-10">
                              <div className="col-md-12 col-xl-10">
                                <div className="form-group">
                                  <label>Sub Menu {j + 1}</label>
                                  <input
                                    onChange={(e) =>
                                      handleChangeInput1(e, i, j)
                                    }
                                    name="inputName"
                                    type="text"
                                    value={child1.name}
                                    className="form-control"
                                    placeholder={`Masukkan sub menu ${j+1}`}
                                  />
                                </div>
                                <p className="error-text mb-4">{child1?.error}</p>
                              </div>
                              <div className="col-md-12 col-xl-2">
                                <div className="d-flex align-items-center h-100">
                                  <button
                                    type="button"
                                    className="btn mr-4 mb-5 minimal-image"
                                    style={{ backgroundColor: "#4299E1" }}
                                    onClick={() => handleCreate2(i, j)}
                                  >
                                    <Image
                                      src="/assets/icon/link.svg"
                                      alt="link"
                                      width={16}
                                      height={16}
                                    />
                                  </button>
                                  <button
                                    type="button"
                                    className="btn mb-5"
                                    style={{ backgroundColor: "#EE2D41" }}
                                    onClick={() => handleDeleteChild(i, j)}
                                  >
                                    <IconDelete />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          {child1.child.map((child3, k) => {
                            return (
                              <div className="row pl-20" key={k}>
                                <div className="col-md-12 col-xl-5">
                                  <div className="form-group">
                                    <label>Sub Sub Menu {k + 1}</label>
                                    <input
                                      value={child3?.name}
                                      onChange={(e) =>
                                        handleChangeInput2(e, i, j, k)
                                      }
                                      name="inputName"
                                      type="text"
                                      className="form-control"
                                      placeholder={`Masukkan sub sub menu ${k+1}`}
                                    />
                                  </div>
                                  <p className="error-text mb-4">{child3?.error}</p>
                                </div>
                                <div className="col-md-12 col-xl-5">
                                  <div className="form-group">
                                    <label>Sub Sub Link {k + 1}</label>
                                    <input
                                      value={child3?.link}
                                      onChange={(e) =>
                                        handleChangeInput2(e, i, j, k)
                                      }
                                      name="inputLink"
                                      type="text"
                                      className="form-control"
                                      placeholder={`Masukkan sub sub link ${k + 1}`}
                                    />
                                    
                                  </div>
                                </div>
                                <div className="col-md-12 col-xl-2">
                                  <div className="d-flex align-items-center h-100">
                                    <button
                                      type="button"
                                      className="btn"
                                      style={{ backgroundColor: "#EE2D41" }}
                                      onClick={() => handleDeletechild(i, j, k)}
                                    >
                                      <IconDelete />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              {!array.length ? <div className="d-flex justify-content-center py-5">Data kosong</div>:""}

              <div className="form-group row mt-10 mt-sm-5">
                <div className="col-sm-12 d-flex justify-content-end">
                  <button
                    className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5"
                    type="button"
                    onClick={() => cancel()}
                  >
                    Batal
                  </button>
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

export default Table;
