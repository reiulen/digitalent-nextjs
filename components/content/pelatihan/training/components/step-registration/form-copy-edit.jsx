import React, { useState, useRef, useEffect } from "react";
import SimpleReactValidator from "simple-react-validator";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { getDetailMasterCopyEditPelatihan } from "../../../../../../redux/actions/pelatihan/master-pendaftaran.action";
import LoadingTable from "../../../../../LoadingTable";

import {
  helperChangeInputFormBuilder,
  helperAddFieldTriggered,
  helperRemoveField,
} from "../../../../../../utils/middleware/helper";

import RenderFormElement from "../render-form-element.component";

const FormCopyEdit = ({
  optionsForm,
  title,
  formBuilder,
  funcTitle,
  funcFormBuilder,
  element,
  size,
  options,
  dataOptions,
  funcModalShow,
  token,
}) => {
  const {
    loading: loadingFormPendaftaran,
    form: formPendaftaran,
    error: errorForm,
  } = useSelector((state) => state.getDetailMasterCopyEditPelatihan);

  const dispatch = useDispatch();
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  useEffect(() => {
    // dispatch(getDetailMasterPelatihan(99999, token));
    if (
      formPendaftaran &&
      Object.keys(formPendaftaran).length !== 0 &&
      Object.getPrototypeOf(formPendaftaran) === Object.prototype
    ) {
      funcFormBuilder(formPendaftaran.data.formBuilder);
    }
  }, [dispatch, formPendaftaran]);

  const showPreviewHandler = () => {
    let list = [...formBuilder];
    funcFormBuilder(list);
    funcModalShow(true);
  };

  const addFieldHandler = () => {
    let newKey;
    if (formBuilder.length > 0) {
      newKey = formBuilder[formBuilder.length - 1].key + 1;
    } else {
      newKey = 1;
    }
    funcFormBuilder([
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
    funcFormBuilder(valueForm);
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
    funcFormBuilder(valueForm);
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
    funcFormBuilder(valueForm);
  };

  return (
    <>
      <div className="form-group mb-4">
        <label className="col-form-label font-weight-bold">Judul Form</label>

        <Select
          options={optionsForm}
          placeholder={
            title !== "" ? title : `Silahkan Pilih Nama Form Pendaftaran`
          }
          onChange={(e) => {
            funcTitle(e.label);
            dispatch(getDetailMasterCopyEditPelatihan(e.value, token));
          }}
        />

        {simpleValidator.current.message("judul form", title, "required", {
          className: "text-danger",
        })}
      </div>

      {loadingFormPendaftaran !== true ? (
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
                                    titleChildren.triggeredForm.length > 0 &&
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
                                                childrenIndex={childrenTitle}
                                                k={k}
                                                dataOptions={dataOptions}
                                              />
                                            </div>
                                          </div>

                                          {rowChildren.triggered_index &&
                                            rowChildren.triggered_index.length >
                                              0 &&
                                            rowChildren.triggered_index.map(
                                              (titleIndex, indexTitle) => (
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
                                                      {titleIndex.triggeredName}
                                                    </p>
                                                  </div>

                                                  {titleIndex.triggeredForm &&
                                                    titleIndex.triggeredForm
                                                      .length > 0 &&
                                                    titleIndex.triggeredForm.map(
                                                      (rowIndex, l) => (
                                                        <>
                                                          <div
                                                            className="col-md-12"
                                                            style={{
                                                              maxWidth: "91%",
                                                            }}
                                                          >
                                                            <div className="row ">
                                                              <RenderFormElement
                                                                row={rowIndex}
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
                                      <i className="ri-add-line"></i> Tambah
                                      Field
                                    </button>
                                  </div>
                                </>
                              )
                            )}
                        </>
                      ))}

                    <div className="col-md-12 my-2" style={{ maxWidth: "97%" }}>
                      <button
                        className="btn btn-outline-primary px-10 btn-sm rounded-xl font-weight-bolder"
                        type="button"
                        onClick={() => addFieldTriggeredHandler(i, parentTitle)}
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
      ) : (
        <LoadingTable loading={loadingFormPendaftaran} />
      )}

      <div className="form-group mb-9 mt-4">
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
    </>
  );
};

export default FormCopyEdit;
