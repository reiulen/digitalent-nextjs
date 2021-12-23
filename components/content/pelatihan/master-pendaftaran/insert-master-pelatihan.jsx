import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import ModalPreview from "../training/components/modal-preview-form.component";
import { getRegistrationStep2 } from "../../../../redux/actions/pelatihan/function.actions";
import PageWrapper from "../../../wrapper/page.wrapper";
import axios from "axios";
import { SweatAlert } from "../../../../utils/middleware/helper";
import Cookies from "js-cookie";
import ModalProfile from "../training/components/modal-profile-peserta";
import RenderFormElement from "../training/components/render-form-element.component";

import {
  element,
  size,
  options,
} from "../../../../utils/middleware/helper/data";
import {
  helperChangeInputFormBuilder,
  helperAddFieldTriggered,
  helperRemoveField,
  helperUnformatCheckbox,
} from "../../../../utils/middleware/helper";

const AddMasterPelatihan = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const token_permission = Cookies.get("token_permission");

  const { registrationData } = useSelector((state) => state.registrationStep2);
  const { data: dataReferenceOption } = useSelector(
    (state) => state.allDataReference
  );

  const [success, setSuccess] = useState(0);
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [dataOptions, setDataOptions] = useState([]);
  const [limitProfile, setLimitProfile] = useState(false);

  const [title, setTitle] = useState(registrationData.judul_form);
  const [formBuilder, setFormBuilder] = useState(registrationData.formBuilder);

  useEffect(() => {
    const dataOptionsArr = [];
    if (dataReferenceOption) {
      dataReferenceOption.list_reference.map((row, i) => {
        let data = {
          id: row.id,
          value: row.name,
        };
        dataOptionsArr.push(data);
      });
    }
    setDataOptions(dataOptionsArr);
  }, []);

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  const renderDataOptionHandler = (
    row,
    i,
    parentIndex,
    j = null,
    childrenIndex,
    k = null,
    indexIndex,
    l = null
  ) => {
    if (row.option === "select_reference") {
      return (
        <div className="col-sm-12 col-md-2">
          <div className="form-group mb-2">
            <label className="col-form-label font-weight-bold">
              Data Option
            </label>
            <select
              className="form-control"
              name="dataOption"
              value={row.dataOption}
              onChange={(e) =>
                inputChangeParentHandler(
                  e,
                  i,
                  parentIndex,
                  j,
                  childrenIndex,
                  k,
                  indexIndex,
                  l
                )
              }
              required
            >
              <option value="" disabled selected>
                -- PILIH --
              </option>
              {dataOptions.map((datOpt, i) => (
                <option key={i} value={datOpt.id}>
                  {datOpt.value}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    } else {
      return (
        <div className="col-sm-12 col-md-2">
          <div className="form-group mb-2">
            <label className="col-form-label font-weight-bold">
              Data Option
            </label>
            <input
              type="text"
              className="form-control"
              name="dataOption"
              value={row.dataOption}
              placeholder="data1;data2"
              autoComplete="off"
              onChange={(e) =>
                inputChangeParentHandler(
                  e,
                  i,
                  parentIndex,
                  j,
                  childrenIndex,
                  k,
                  indexIndex,
                  l
                )
              }
              required
            />
          </div>
        </div>
      );
    }
  };

  const renderMultipleHandler = (
    row,
    i,
    parentIndex,
    j = null,
    childrenIndex,
    k = null,
    indexIndex,
    l = null
  ) => {
    if (
      row.element === "select" ||
      row.element === "checkbox" ||
      row.element === "radio"
    ) {
      return (
        <>
          <div className="col-sm-12 col-md-2">
            <div className="form-group mb-2">
              <label className="col-form-label font-weight-bold">Option</label>
              <select
                className="form-control"
                name="option"
                value={row.option}
                onChange={(e) =>
                  inputChangeParentHandler(
                    e,
                    i,
                    parentIndex,
                    j,
                    childrenIndex,
                    k,
                    indexIndex,
                    l
                  )
                }
                required
              >
                <option value="" disabled selected>
                  -- PILIH --
                </option>
                {options.map((opt, i) => (
                  <option key={i} value={opt.value}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {renderDataOptionHandler(
            row,
            i,
            parentIndex,
            j,
            childrenIndex,
            k,
            indexIndex,
            l
          )}
        </>
      );
    } else if (row.element === "triggered") {
      return (
        <>
          <div className="col-sm-12 col-md-2">
            <div className="form-group mb-2">
              <label className="col-form-label font-weight-bold">Option</label>
              <select
                className="form-control"
                name="option"
                value={row.option}
                onChange={(e) =>
                  inputChangeParentHandler(
                    e,
                    i,
                    parentIndex,
                    j,
                    childrenIndex,
                    k,
                    indexIndex,
                    l
                  )
                }
              >
                <option value="" disabled selected>
                  -- PILIH --
                </option>
                {options.map(
                  (opt, i) =>
                    opt.value !== "select_reference" && (
                      <option key={i} value={opt.value}>
                        {opt.name}
                      </option>
                    )
                )}
              </select>
            </div>
          </div>
          <div className="col-sm-12 col-md-2">
            <div className="form-group mb-2">
              <label className="col-form-label font-weight-bold">
                Data Option
              </label>
              <input
                type="text"
                className="form-control"
                name="dataOption"
                value={row.dataOption}
                placeholder="data1;data2"
                autoComplete="off"
                onChange={(e) =>
                  inputChangeParentHandler(
                    e,
                    i,
                    parentIndex,
                    j,
                    childrenIndex,
                    k,
                    indexIndex,
                    l
                  )
                }
                required
                disabled={row.triggered === "1" ? true : false}
              />
            </div>
          </div>
        </>
      );
    } else if (row.element === "upload_document") {
      return (
        <div className="col-sm-12 col-md-4">
          <div className="form-group mb-2">
            <label className="col-form-label font-weight-bold">
              Upload Document
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                name="upload-document"
                accept="image/png, image/jpeg , image/jpg, application/pdf"
                id="uploadThumbnail"
                onChange={(e) =>
                  inputChangeParentHandler(
                    e,
                    i,
                    parentIndex,
                    j,
                    childrenIndex,
                    k,
                    indexIndex,
                    l
                  )
                }
              />
              <label className="custom-file-label" htmlFor="customFile">
                {row.fileName}
              </label>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <div className="col-sm-12 col-md-2">
            <div className="form-group mb-2">
              <label className="col-form-label font-weight-bold">Option</label>
              <select
                className="form-control"
                name="option"
                value={row.option}
                onChange={(e) =>
                  inputChangeParentHandler(
                    e,
                    i,
                    parentIndex,
                    j,
                    childrenIndex,
                    k,
                    indexIndex,
                    l
                  )
                }
                disabled
              >
                <option value="" disabled selected>
                  -- PILIH --
                </option>
                {options.map((opt, i) => (
                  <option key={i} value={opt.value}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-sm-12 col-md-2">
            <div className="form-group mb-2">
              <label className="col-form-label font-weight-bold">
                Data Option
              </label>
              <select
                className="form-control"
                name="dataOption"
                value={row.dataOption}
                onChange={(e) =>
                  inputChangeParentHandler(
                    e,
                    i,
                    parentIndex,
                    j,
                    childrenIndex,
                    k,
                    indexIndex,
                    l
                  )
                }
                disabled
              >
                <option value="" disabled selected>
                  -- PILIH --
                </option>
                {dataOptions.map((datOpt, i) => (
                  <option key={i} value={datOpt.value}>
                    {datOpt.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      );
    }
  };

  const showPreviewHandler = () => {
    setModalShow(true);
  };

  const addFieldHandler = () => {
    let newKey;
    if (formBuilder.length > 0) {
      newKey = formBuilder[formBuilder.length - 1].key + 1;
    } else {
      newKey = 1;
    }
    setFormBuilder([
      ...formBuilder,
      {
        key: newKey,
        name: "",
        element: "",
        size: "",
        option: "",
        dataOption: "",
        fileName: "Belum ada file",
        required: "0",
        triggered: "0",
        triggered_parent: [],
        value: "",
      },
    ]);
  };

  const addFieldTriggeredHandler = (
    alfa = null,
    parentIndex = null,
    beta = null,
    childrenIndex = null,
    gamma = null,
    indexIndex = null,
    delta = null
  ) => {
    const valueForm = helperAddFieldTriggered(
      formBuilder,
      alfa,
      parentIndex,
      beta,
      childrenIndex,
      gamma,
      indexIndex,
      delta
    );
    setFormBuilder(valueForm);
  };

  const removeFieldHandler = (
    alfa = null,
    parentIndex = null,
    beta = null,
    childrenIndex = null,
    gamma = null,
    indexIndex = null,
    delta = null
  ) => {
    const valueForm = helperRemoveField(
      formBuilder,
      alfa,
      parentIndex,
      beta,
      childrenIndex,
      gamma,
      indexIndex,
      delta
    );
    setFormBuilder(valueForm);
  };

  const inputChangeParentHandler = (
    event,
    alfa = null,
    parentIndex = null,
    beta = null,
    childrenIndex = null,
    gamma = null,
    indexIndex = null,
    delta = null
  ) => {
    const valueForm = helperChangeInputFormBuilder(
      event,
      formBuilder,
      alfa,
      parentIndex,
      beta,
      childrenIndex,
      gamma,
      indexIndex,
      delta
    );
    setFormBuilder(valueForm);
  };

  const closePreviewHandler = () => {
    // let list = [...formBuilder];
    // list.forEach((row, i) => {
    //   if (row.option === "manual") {
    //     let dataOption = row.dataOption.join(";");
    //     row.dataOption = dataOption;
    //   }
    // });
    // setFormBuilder(list);
    setModalShow(false);
  };

  const backHandler = () => {
    router.push("/pelatihan/master-pendaftaran");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      const valueForm = helperUnformatCheckbox(formBuilder);
      const data = {
        judul_form: title,
        formBuilder: valueForm,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        Permission: token_permission,
      };
      try {
        const result = await axios.post(
          process.env.END_POINT_API_PELATIHAN + `api/v1/formBuilder/create`,
          data,
          config
        );
        if (result.status == 200) {
          SweatAlert("Berhasil", "Berhasil tambah form pendaftaran", "success");
          router.push("/pelatihan/master-pendaftaran");
        }
        if (!result.status) {
          throw new Error(result.message);
        }
      } catch (error) {
        SweatAlert("Gagal", error, "error");
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
  // useEffect(() => {
  //   if (success === 1) {
  //     SweatAlert("Berhasil", "Berhasil tambah form pendaftaran", "success");
  //     router.push("/pelatihan/master-pendaftaran");
  //   }
  // }, [success, router]);

  return (
    <PageWrapper>
      <>
        <div className="card card-custom gutter-b">
          <div className="card-header border-0 mt-3">
            <h1
              className="font-weight-bolder card-title"
              style={{ fontSize: "20px" }}
            >
              Form Pendaftaran
            </h1>
            <div className="card-toolbar justify-content-between d-flex">
              <button
                className="btn btn-warning px-6 font-weight-bolder"
                style={{ borderRadius: "30px" }}
                data-toggle="modal"
                data-target="#modalProfile"
                type="button"
              >
                Harap dibaca!
              </button>
            </div>
          </div>
          <div className="card-body py-4">
            <form onSubmit={submitHandler}>
              <div className="form-group mb-4">
                <label className="col-form-label font-weight-bold">
                  Judul Form
                </label>
                <input
                  type="text"
                  placeholder="Silahkan Masukan Judul Form"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("judul form")
                  }
                  autoComplete="off"
                  maxLength={100}
                  required
                />

                {simpleValidator.current.message(
                  "judul form",
                  title,
                  "required|max:100",
                  {
                    className: "text-danger",
                  }
                )}
              </div>

              <div className="row justify-content-end">
                {formBuilder.map((row, i) => (
                  <>
                    <RenderFormElement
                      row={row}
                      funcInputChangeParentHandler={(
                        e,
                        i,
                        parentIndex,
                        j,
                        childrenIndex,
                        k,
                        indexIndex,
                        l
                      ) => {
                        inputChangeParentHandler(
                          e,
                          i,
                          parentIndex,
                          j,
                          childrenIndex,
                          k,
                          indexIndex,
                          l
                        );
                      }}
                      funcRemoveFieldHandler={(
                        i,
                        parentIndex,
                        j,
                        childrenIndex,
                        k,
                        indexIndex,
                        l
                      ) => {
                        removeFieldHandler(
                          i,
                          parentIndex,
                          j,
                          childrenIndex,
                          k,
                          indexIndex,
                          l
                        );
                      }}
                      formBuilder={formBuilder}
                      i={i}
                      dataOptions={dataOptions}
                    />

                    {row.triggered_parent &&
                      row.triggered_parent.length > 0 &&
                      row.triggered_parent.map((titleParent, parentTitle) => (
                        <>
                          <div
                            className="col-md-12"
                            key={parentTitle}
                            style={{ maxWidth: "97%" }}
                          >
                            <p className="mb-0 mt-3 fw-600 fz-16">
                              Opsi : {titleParent.triggeredName}
                            </p>
                          </div>

                          {titleParent.triggeredForm &&
                            titleParent.triggeredForm.length > 0 &&
                            titleParent.triggeredForm.map((rowParent, j) => (
                              <>
                                <div
                                  className="col-md-12"
                                  style={{ maxWidth: "97%" }}
                                >
                                  <div className="row">
                                    <RenderFormElement
                                      row={rowParent}
                                      funcInputChangeParentHandler={(
                                        e,
                                        i,
                                        parentIndex,
                                        j,
                                        childrenIndex,
                                        k,
                                        indexIndex,
                                        l
                                      ) => {
                                        inputChangeParentHandler(
                                          e,
                                          i,
                                          parentIndex,
                                          j,
                                          childrenIndex,
                                          k,
                                          indexIndex,
                                          l
                                        );
                                      }}
                                      funcRemoveFieldHandler={(
                                        i,
                                        parentIndex,
                                        j,
                                        childrenIndex,
                                        k,
                                        indexIndex,
                                        l
                                      ) => {
                                        removeFieldHandler(
                                          i,
                                          parentIndex,
                                          j,
                                          childrenIndex,
                                          k,
                                          indexIndex,
                                          l
                                        );
                                      }}
                                      formBuilder={formBuilder}
                                      i={i}
                                      parentIndex={parentTitle}
                                      j={j}
                                      dataOptions={dataOptions}
                                    />
                                  </div>
                                </div>
                                {rowParent.triggered_children &&
                                  rowParent.triggered_children.length > 0 &&
                                  rowParent.triggered_children.map(
                                    (titleChildren, childrenTitle) => (
                                      <>
                                        <div
                                          className="col-md-12"
                                          key={childrenTitle}
                                          style={{ maxWidth: "94%" }}
                                        >
                                          <p className="mb-0 mt-3 fw-600 fz-16">
                                            Opsi : {titleChildren.triggeredName}
                                          </p>
                                        </div>

                                        {titleChildren.triggeredForm &&
                                          titleChildren.triggeredForm.length >
                                            0 &&
                                          titleChildren.triggeredForm.map(
                                            (rowChildren, k) => (
                                              <>
                                                <div
                                                  className="col-md-12"
                                                  style={{ maxWidth: "94%" }}
                                                >
                                                  <div className="row">
                                                    <RenderFormElement
                                                      row={rowChildren}
                                                      funcInputChangeParentHandler={(
                                                        e,
                                                        i,
                                                        parentIndex,
                                                        j,
                                                        childrenIndex,
                                                        k,
                                                        indexIndex,
                                                        l
                                                      ) => {
                                                        inputChangeParentHandler(
                                                          e,
                                                          i,
                                                          parentIndex,
                                                          j,
                                                          childrenIndex,
                                                          k,
                                                          indexIndex,
                                                          l
                                                        );
                                                      }}
                                                      funcRemoveFieldHandler={(
                                                        i,
                                                        parentIndex,
                                                        j,
                                                        childrenIndex,
                                                        k,
                                                        indexIndex,
                                                        l
                                                      ) => {
                                                        removeFieldHandler(
                                                          i,
                                                          parentIndex,
                                                          j,
                                                          childrenIndex,
                                                          k,
                                                          indexIndex,
                                                          l
                                                        );
                                                      }}
                                                      formBuilder={formBuilder}
                                                      i={i}
                                                      parentIndex={parentTitle}
                                                      j={j}
                                                      childrenIndex={
                                                        childrenTitle
                                                      }
                                                      k={k}
                                                      dataOptions={dataOptions}
                                                    />
                                                  </div>
                                                </div>

                                                {rowChildren.triggered_index &&
                                                  rowChildren.triggered_index
                                                    .length > 0 &&
                                                  rowChildren.triggered_index.map(
                                                    (
                                                      titleIndex,
                                                      indexTitle
                                                    ) => (
                                                      <>
                                                        <div
                                                          className="col-md-12"
                                                          key={indexTitle}
                                                          style={{
                                                            maxWidth: "91%",
                                                          }}
                                                        >
                                                          <p className="mb-0 mt-3 fw-600 fz-16">
                                                            Opsi :{" "}
                                                            {
                                                              titleIndex.triggeredName
                                                            }
                                                          </p>
                                                        </div>

                                                        {titleIndex.triggeredForm &&
                                                          titleIndex
                                                            .triggeredForm
                                                            .length > 0 &&
                                                          titleIndex.triggeredForm.map(
                                                            (rowIndex, l) => (
                                                              <>
                                                                <div
                                                                  className="col-md-12"
                                                                  style={{
                                                                    maxWidth:
                                                                      "91%",
                                                                  }}
                                                                >
                                                                  <div className="row ">
                                                                    <RenderFormElement
                                                                      row={
                                                                        rowIndex
                                                                      }
                                                                      funcInputChangeParentHandler={(
                                                                        e,
                                                                        i,
                                                                        parentIndex,
                                                                        j,
                                                                        childrenIndex,
                                                                        k,
                                                                        indexIndex,
                                                                        l
                                                                      ) => {
                                                                        inputChangeParentHandler(
                                                                          e,
                                                                          i,
                                                                          parentIndex,
                                                                          j,
                                                                          childrenIndex,
                                                                          k,
                                                                          indexIndex,
                                                                          l
                                                                        );
                                                                      }}
                                                                      funcRemoveFieldHandler={(
                                                                        i,
                                                                        parentIndex,
                                                                        j,
                                                                        childrenIndex,
                                                                        k,
                                                                        indexIndex,
                                                                        l
                                                                      ) => {
                                                                        removeFieldHandler(
                                                                          i,
                                                                          parentIndex,
                                                                          j,
                                                                          childrenIndex,
                                                                          k,
                                                                          indexIndex,
                                                                          l
                                                                        );
                                                                      }}
                                                                      formBuilder={
                                                                        formBuilder
                                                                      }
                                                                      i={i}
                                                                      parentIndex={
                                                                        parentTitle
                                                                      }
                                                                      j={j}
                                                                      childrenIndex={
                                                                        childrenTitle
                                                                      }
                                                                      k={k}
                                                                      indexIndex={
                                                                        indexTitle
                                                                      }
                                                                      l={l}
                                                                      dataOptions={
                                                                        dataOptions
                                                                      }
                                                                    />
                                                                  </div>
                                                                </div>
                                                              </>
                                                            )
                                                          )}
                                                        <div
                                                          className="col-md-12 my-2"
                                                          style={{
                                                            maxWidth: "91%",
                                                          }}
                                                        >
                                                          <button
                                                            className="btn btn-outline-primary px-10 btn-sm rounded-xl font-weight-bolder"
                                                            type="button"
                                                            onClick={() =>
                                                              addFieldTriggeredHandler(
                                                                i,
                                                                parentTitle,
                                                                j,
                                                                childrenTitle,
                                                                k,
                                                                indexTitle
                                                              )
                                                            }
                                                          >
                                                            <i className="ri-add-line"></i>{" "}
                                                            Tambah Field
                                                          </button>
                                                        </div>
                                                      </>
                                                    )
                                                  )}
                                              </>
                                            )
                                          )}

                                        <div
                                          className="col-md-12 my-2"
                                          style={{ maxWidth: "94%" }}
                                        >
                                          <button
                                            className="btn btn-outline-primary px-10 btn-sm rounded-xl font-weight-bolder"
                                            type="button"
                                            onClick={() =>
                                              addFieldTriggeredHandler(
                                                i,
                                                parentTitle,
                                                j,
                                                childrenTitle
                                              )
                                            }
                                          >
                                            <i className="ri-add-line"></i>{" "}
                                            Tambah Field
                                          </button>
                                        </div>
                                      </>
                                    )
                                  )}
                              </>
                            ))}

                          <div
                            className="col-md-12 my-2"
                            style={{ maxWidth: "97%" }}
                          >
                            <button
                              className="btn btn-outline-primary px-10 btn-sm rounded-xl font-weight-bolder"
                              type="button"
                              onClick={() =>
                                addFieldTriggeredHandler(i, parentTitle)
                              }
                            >
                              <i className="ri-add-line"></i> Tambah Field
                            </button>
                          </div>
                        </>
                      ))}

                    <div className="col-md-12">
                      <hr />
                    </div>
                  </>
                ))}
              </div>

              <div className="form-group mb-9 mt-10">
                <div className="text-right">
                  <button
                    className="btn btn-light-success mr-2"
                    type="button"
                    style={{ borderRadius: "30px", fontWeight: "600" }}
                    onClick={showPreviewHandler}
                  >
                    Preview
                  </button>
                  <button
                    className="btn btn-primary-rounded-full"
                    type="button"
                    onClick={addFieldHandler}
                  >
                    <i className="ri-pencil-fill"></i> Tambah Field
                  </button>
                </div>
              </div>

              <div className="form-group mt-md-10">
                <div className="text-right">
                  <button
                    className="btn btn-primary-rounded-full"
                    type="submit"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          </div>
          <Modal
            show={modalShow}
            onHide={closePreviewHandler}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <ModalPreview
              propsTitle={title}
              propsForm={formBuilder}
              propsModalShow={modalShow}
              sendPropsFormBuilder={(form) => setFormBuilder(form)}
              sendPropsModalShow={(value) => setModalShow(value)}
              propsToken={token}
            />
          </Modal>
        </div>

        <div
          className="modal fade"
          id="modalProfile"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modalProfile"
          aria-hidden="true"
        >
          <ModalProfile />
        </div>
      </>
    </PageWrapper>
  );
};

export default AddMasterPelatihan;
