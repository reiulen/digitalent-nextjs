import React from "react";
import CheckboxReference from "../../../../../components/content/pelatihan/training/components/checkbox-reference.component";
import OptionsReference from "../../../../../components/content/pelatihan/training/components/option-reference.component";
import RadioReference from "../../../../../components/content/pelatihan/training/components/radio-reference.component";

const FormBuilderComponent = ({ formBuilder, token, funcChangeInput }) => {
  const helperElementRenderIndex = (
    row,
    propsToken,
    alfa,
    indexParent,
    beta,
    indexChildren,
    gamma,
    indexIndex,
    delta
  ) => {
    switch (row.element) {
      case "text":
        return (
          <div
            style={{ maxWidth: "100%" }}
            className={`form-group  mt-0 mb-0 ${row.size}`}
          >
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <input
              type={row.element}
              name=""
              value={row.value}
              className="form-control"
              required={row.required}
              placeholder={`Silahkan Masukkan ${row.name}`}
              onChange={(e) =>
                funcChangeInput(
                  e.target.value,
                  alfa,
                  indexParent,
                  beta,
                  indexChildren,
                  gamma,
                  indexIndex,
                  delta
                )
              }
            />
          </div>
        );
        break;
      case "select":
        return (
          <div
            style={{ maxWidth: "100%" }}
            className={`form-group  mt-0 mb-0 ${row.size}`}
          >
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <select
              name=""
              className="form-control"
              required={row.required}
              value={row.value}
              onChange={(e) =>
                funcChangeInput(
                  e.target.value,
                  alfa,
                  indexParent,
                  beta,
                  indexChildren,
                  gamma,
                  indexIndex,
                  delta
                )
              }
            >
              <option value="">--Pilih Data--</option>
              {row.option === "manual" ? (
                row.dataOption.split(";").map((dat, i) => (
                  <option value={dat} key={i}>
                    {dat}
                  </option>
                ))
              ) : (
                <OptionsReference id={row.dataOption} token={propsToken} />
              )}
            </select>
          </div>
        );
        break;
      case "checkbox":
        return (
          <div
            style={{ maxWidth: "100%" }}
            className={`form-group  mt-0 mb-0 ${row.size}`}
          >
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="my-auto">
              {row.option === "manual" ? (
                row.dataOption.split(";").map((dat, i) => (
                  <div className="form-check pb-3" key={i}>
                    <input
                      type="checkbox"
                      name="plotRegistration"
                      className="form-check-input"
                      value={dat}
                      onChange={(e) =>
                        funcChangeInput(
                          e.target.value,
                          alfa,
                          indexParent,
                          beta,
                          indexChildren,
                          gamma,
                          indexIndex,
                          delta
                        )
                      }
                    />
                    <label className="form-check-label">{dat}</label>
                  </div>
                ))
              ) : (
                <CheckboxReference
                  id={row.dataOption}
                  token={propsToken}
                  required={row.required}
                  onChangeValue={(value) =>
                    funcChangeInput(
                      value,
                      alfa,
                      indexParent,
                      beta,
                      indexChildren,
                      gamma,
                      indexIndex,
                      delta
                    )
                  }
                />
              )}
            </div>
          </div>
        );
        break;
      case "textarea":
        return (
          <div
            style={{ maxWidth: "100%" }}
            className={`form-group  mt-0 mb-0 ${row.size}`}
          >
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <textarea
              name=""
              cols="30"
              rows="5"
              className="form-control"
              required={row.required}
              value={row.value}
              onChange={(e) =>
                funcChangeInput(
                  e.target.value,
                  alfa,
                  indexParent,
                  beta,
                  indexChildren,
                  gamma,
                  indexIndex,
                  delta
                )
              }
            />
          </div>
        );
        break;
      case "radio":
        return (
          <div
            style={{ maxWidth: "100%" }}
            className={`form-group  mt-0 mb-0 ${row.size}`}
          >
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="my-auto">
              {row.option === "manual" ? (
                row.dataOption.split(";").map((dat, i) => (
                  <div className="form-check pb-3" key={i}>
                    <input
                      type="radio"
                      name={row.name}
                      className="form-check-input"
                      value={dat}
                      required={row.required}
                      onChange={(e) =>
                        funcChangeInput(
                          e.target.value,
                          alfa,
                          indexParent,
                          beta,
                          indexChildren,
                          gamma,
                          indexIndex,
                          delta
                        )
                      }
                    />
                    <label className="form-check-label">{dat}</label>
                  </div>
                ))
              ) : (
                <RadioReference
                  id={row.dataOption}
                  token={propsToken}
                  required={row.required}
                  onChangeValue={(value) =>
                    funcChangeInput(
                      value,
                      alfa,
                      indexParent,
                      beta,
                      indexChildren,
                      gamma,
                      indexIndex,
                      delta
                    )
                  }
                />
              )}
            </div>
          </div>
        );
        break;
      case "file_image":
        return (
          <div
            style={{ maxWidth: "100%" }}
            className={`form-group  mt-0 mb-0 ${row.size}`}
          >
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                accept="image/png, image/jpeg , image/jpg"
                required={row.value === "" ? row.required : false}
                onChange={(e) =>
                  funcChangeInput(
                    e,
                    alfa,
                    indexParent,
                    beta,
                    indexChildren,
                    gamma,
                    indexIndex,
                    delta
                  )
                }
              />
              <label className="custom-file-label" htmlFor="customFile">
                {row.fileName}
              </label>
            </div>
            <small className="text-muted">
              Silakan masukkan type file JPG/JPEG/PNG
            </small>
          </div>
        );
        break;
      case "file_doc":
        return (
          <div
            style={{ maxWidth: "100%" }}
            className={`form-group  mt-0 mb-0 ${row.size}`}
          >
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                accept="application/pdf"
                required={row.value === "" ? row.required : false}
                onChange={(e) =>
                  funcChangeInput(
                    e,
                    alfa,
                    indexParent,
                    beta,
                    indexChildren,
                    gamma,
                    indexIndex,
                    delta
                  )
                }
              />
              <label className="custom-file-label" htmlFor="customFile">
                {row.fileName}
              </label>
            </div>
            <small className="text-muted">Silakan masukkan type file PDF</small>
          </div>
        );
        break;
      case "date":
        return (
          <div
            style={{ maxWidth: "100%" }}
            className={`form-group  mt-0 mb-0 ${row.size}`}
          >
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <input
              type={row.element}
              name=""
              className="form-control"
              required={row.required}
              onChange={(e) =>
                funcChangeInput(
                  e.target.value,
                  alfa,
                  indexParent,
                  beta,
                  indexChildren,
                  gamma,
                  indexIndex,
                  delta
                )
              }
            />
          </div>
        );
        break;
      case "upload_document":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold d-flex">
              {row.name}
              <p
                className="text-primary ml-3 mb-0"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  !row.dataOption.includes("data:") &&
                    window.open(
                      process.env.END_POINT_API_IMAGE_BEASISWA + row.dataOption,
                      "_blank"
                    );
                }}
              >
                Unduh Contoh Document
              </p>
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                accept="application/pdf"
                required={row.value === "" ? row.required : false}
                onChange={(e) =>
                  funcChangeInput(
                    e,
                    alfa,
                    indexParent,
                    beta,
                    indexChildren,
                    gamma,
                    indexIndex,
                    delta
                  )
                }
              />
              <label className="custom-file-label" htmlFor="customFile">
                {row.value === "" ? "Belum ada file" : row.fileName}
              </label>
            </div>
            <small className="text-muted">
              Silakan masukkan type file JPG/JPEG/PNG/PDF
            </small>
          </div>
        );
        break;
      default:
        break;
    }
  };
  const helperElementRenderChildren = (
    row,
    propsToken,
    alfa,
    indexParent,
    beta,
    indexChildren,
    gamma
  ) => {
    switch (row.element) {
      case "text":
        return (
          <div
            style={{ maxWidth: "100%" }}
            className={`form-group  mt-0 mb-0 ${row.size}`}
          >
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <input
              type={row.element}
              name=""
              className="form-control"
              required={row.required}
              value={row.value}
              placeholder={`Silahkan Masukkan ${row.name}`}
              onChange={(e) =>
                funcChangeInput(
                  e.target.value,
                  alfa,
                  indexParent,
                  beta,
                  indexChildren,
                  gamma
                )
              }
            />
          </div>
        );
        break;
      case "select":
        return (
          <div
            style={{ maxWidth: "100%" }}
            className={`form-group  mt-0 mb-0 ${row.size}`}
          >
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <select
              name=""
              className="form-control"
              required={row.required}
              value={row.value}
              onChange={(e) =>
                funcChangeInput(
                  e.target.value,
                  alfa,
                  indexParent,
                  beta,
                  indexChildren,
                  gamma
                )
              }
            >
              <option value="">--Pilih Data--</option>
              {row.option === "manual" ? (
                row.dataOption.split(";").map((dat, i) => (
                  <option value={dat} key={i}>
                    {dat}
                  </option>
                ))
              ) : (
                <OptionsReference id={row.dataOption} token={propsToken} />
              )}
            </select>
          </div>
        );
        break;
      case "checkbox":
        return (
          <div
            style={{ maxWidth: "100%" }}
            className={`form-group  mt-0 mb-0 ${row.size}`}
          >
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="my-auto">
              {row.option === "manual" ? (
                row.dataOption.split(";").map((dat, i) => (
                  <div className="form-check pb-3" key={i}>
                    <input
                      type="checkbox"
                      name="plotRegistration"
                      className="form-check-input"
                      value={dat}
                      onChange={(e) =>
                        funcChangeInput(
                          e.target.value,
                          alfa,
                          indexParent,
                          beta,
                          indexChildren,
                          gamma
                        )
                      }
                    />
                    <label className="form-check-label">{dat}</label>
                  </div>
                ))
              ) : (
                <CheckboxReference
                  id={row.dataOption}
                  token={propsToken}
                  required={row.required}
                  onChangeValue={(value) =>
                    funcChangeInput(
                      value,
                      alfa,
                      indexParent,
                      beta,
                      indexChildren,
                      gamma
                    )
                  }
                />
              )}
            </div>
          </div>
        );
        break;
      case "textarea":
        return (
          <div
            style={{ maxWidth: "100%" }}
            className={`form-group  mt-0 mb-0 ${row.size}`}
          >
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <textarea
              name=""
              cols="30"
              rows="5"
              className="form-control"
              required={row.required}
              value={row.value}
              onChange={(e) =>
                funcChangeInput(
                  e.target.value,
                  alfa,
                  indexParent,
                  beta,
                  indexChildren,
                  gamma
                )
              }
            />
          </div>
        );
        break;
      case "radio":
        return (
          <div
            style={{ maxWidth: "100%" }}
            className={`form-group  mt-0 mb-0 ${row.size}`}
          >
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="my-auto">
              {row.option === "manual" ? (
                row.dataOption.split(";").map((dat, i) => (
                  <div className="form-check pb-3" key={i}>
                    <input
                      type="radio"
                      name={row.name}
                      className="form-check-input"
                      value={dat}
                      required={row.required}
                      onChange={(e) =>
                        funcChangeInput(
                          e.target.value,
                          alfa,
                          indexParent,
                          beta,
                          indexChildren,
                          gamma
                        )
                      }
                    />
                    <label className="form-check-label">{dat}</label>
                  </div>
                ))
              ) : (
                <RadioReference
                  id={row.dataOption}
                  token={propsToken}
                  required={row.required}
                  onChangeValue={(value) =>
                    funcChangeInput(
                      value,
                      alfa,
                      indexParent,
                      beta,
                      indexChildren,
                      gamma
                    )
                  }
                />
              )}
            </div>
          </div>
        );
        break;
      case "file_image":
        return (
          <div
            style={{ maxWidth: "100%" }}
            className={`form-group  mt-0 mb-0 ${row.size}`}
          >
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                accept="image/png, image/jpeg , image/jpg"
                required={row.value === "" ? row.required : false}
                onChange={(e) =>
                  funcChangeInput(
                    e,
                    alfa,
                    indexParent,
                    beta,
                    indexChildren,
                    gamma
                  )
                }
              />
              <label className="custom-file-label" htmlFor="customFile">
                {row.fileName}
              </label>
            </div>
            <small className="text-muted">
              Silakan masukkan type file JPG/JPEG/PNG
            </small>
          </div>
        );
        break;
      case "file_doc":
        return (
          <div
            style={{ maxWidth: "100%" }}
            className={`form-group  mt-0 mb-0 ${row.size}`}
          >
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                accept="application/pdf"
                required={row.value === "" ? row.required : false}
                onChange={(e) =>
                  funcChangeInput(
                    e,
                    alfa,
                    indexParent,
                    beta,
                    indexChildren,
                    gamma
                  )
                }
              />
              <label className="custom-file-label" htmlFor="customFile">
                {row.fileName}
              </label>
            </div>
            <small className="text-muted">Silakan masukkan type file PDF</small>
          </div>
        );
        break;
      case "date":
        return (
          <div
            style={{ maxWidth: "100%" }}
            className={`form-group  mt-0 mb-0 ${row.size}`}
          >
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <input
              type={row.element}
              name=""
              className="form-control"
              required={row.required}
              value={row.value}
              onChange={(e) =>
                funcChangeInput(
                  e.target.value,
                  alfa,
                  indexParent,
                  beta,
                  indexChildren,
                  gamma
                )
              }
            />
          </div>
        );
        break;
      case "triggered":
        return (
          <>
            <div
              style={{ maxWidth: "100%" }}
              className={`form-group  mt-0 mb-0 ${row.size}`}
            >
              <label className="col-form-label font-weight-bold">
                {row.name}
              </label>
              <select
                name=""
                className="form-control"
                required={row.required}
                value={row.value}
                onChange={(e) =>
                  funcChangeInput(
                    e.target.value,
                    alfa,
                    indexParent,
                    beta,
                    indexChildren,
                    gamma
                  )
                }
              >
                <option value="">--Pilih Data--</option>
                {row.option === "manual" &&
                  row.dataOption.split(";").map((dat, i) => (
                    <option value={dat} key={i}>
                      {dat}
                    </option>
                  ))}
              </select>
            </div>
            {row.triggered_index.map(
              (rowIndex, indexIndex) =>
                row.value === rowIndex.triggeredName &&
                rowIndex.triggeredForm.map((rowForm, delta) => (
                  <>
                    {helperElementRenderIndex(
                      rowForm,
                      propsToken,
                      alfa,
                      indexParent,
                      beta,
                      indexChildren,
                      gamma,
                      indexIndex,
                      delta
                    )}
                  </>
                ))
            )}
          </>
        );
        break;
      case "upload_document":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold d-flex">
              {row.name}
              <p
                className="text-primary ml-3 mb-0"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  !row.dataOption.includes("data:") &&
                    window.open(
                      process.env.END_POINT_API_IMAGE_BEASISWA + row.dataOption,
                      "_blank"
                    );
                }}
              >
                Unduh Contoh Document
              </p>
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                accept="application/pdf"
                required={row.value === "" ? row.required : false}
                onChange={(e) =>
                  funcChangeInput(
                    e,
                    alfa,
                    indexParent,
                    beta,
                    indexChildren,
                    gamma
                  )
                }
              />
              <label className="custom-file-label" htmlFor="customFile">
                {row.value === "" ? "Belum ada file" : row.fileName}
              </label>
            </div>
            <small className="text-muted">
              Silakan masukkan type file JPG/JPEG/PNG/PDF
            </small>
          </div>
        );
        break;
      default:
        break;
    }
  };
  const helperElementRenderParent = (
    row,
    propsToken,
    alfa,
    indexParent,
    beta
  ) => {
    switch (row.element) {
      case "text":
        return (
          <div
            style={{ maxWidth: "100%" }}
            className={`form-group  mt-0 mb-0 ${row.size}`}
          >
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <input
              type={row.element}
              name=""
              className="form-control"
              required={row.required}
              value={row.value}
              placeholder={`Silahkan Masukkan ${row.name}`}
              onChange={(e) =>
                funcChangeInput(e.target.value, alfa, indexParent, beta)
              }
            />
          </div>
        );
        break;
      case "select":
        return (
          <div
            style={{ maxWidth: "100%" }}
            className={`form-group  mt-0 mb-0 ${row.size}`}
          >
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <select
              name=""
              className="form-control"
              required={row.required}
              value={row.value}
              onChange={(e) =>
                funcChangeInput(e.target.value, alfa, indexParent, beta)
              }
            >
              <option value="">--Pilih Data--</option>
              {row.option === "manual" ? (
                row.dataOption.split(";").map((dat, i) => (
                  <option value={dat} key={i}>
                    {dat}
                  </option>
                ))
              ) : (
                <OptionsReference id={row.dataOption} token={propsToken} />
              )}
            </select>
          </div>
        );
        break;
      case "checkbox":
        return (
          <div
            style={{ maxWidth: "100%" }}
            className={`form-group  mt-0 mb-0 ${row.size}`}
          >
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="my-auto">
              {row.option === "manual" ? (
                row.dataOption.split(";").map((dat, i) => (
                  <div className="form-check pb-3" key={i}>
                    <input
                      type="checkbox"
                      name="plotRegistration"
                      className="form-check-input"
                      value={dat}
                      onChange={(e) =>
                        funcChangeInput(e.target.value, alfa, indexParent, beta)
                      }
                    />
                    <label className="form-check-label">{dat}</label>
                  </div>
                ))
              ) : (
                <CheckboxReference
                  id={row.dataOption}
                  token={propsToken}
                  required={row.required}
                  onChangeValue={(value) =>
                    funcChangeInput(value, alfa, indexParent, beta)
                  }
                />
              )}
            </div>
          </div>
        );
        break;
      case "textarea":
        return (
          <div
            style={{ maxWidth: "100%" }}
            className={`form-group  mt-0 mb-0 ${row.size}`}
          >
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <textarea
              name=""
              cols="30"
              rows="5"
              className="form-control"
              required={row.required}
              value={row.value}
              onChange={(e) =>
                funcChangeInput(e.target.value, alfa, indexParent, beta)
              }
            />
          </div>
        );
        break;
      case "radio":
        return (
          <div
            style={{ maxWidth: "100%" }}
            className={`form-group  mt-0 mb-0 ${row.size}`}
          >
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="my-auto">
              {row.option === "manual" ? (
                row.dataOption.split(";").map((dat, i) => (
                  <div className="form-check pb-3" key={i}>
                    <input
                      type="radio"
                      name={row.name}
                      className="form-check-input"
                      value={dat}
                      required={row.required}
                      onChange={(e) =>
                        funcChangeInput(e.target.value, alfa, indexParent, beta)
                      }
                    />
                    <label className="form-check-label">{dat}</label>
                  </div>
                ))
              ) : (
                <RadioReference
                  id={row.dataOption}
                  token={propsToken}
                  required={row.required}
                  onChangeValue={(value) =>
                    funcChangeInput(value, alfa, indexParent, beta)
                  }
                />
              )}
            </div>
          </div>
        );
        break;
      case "file_image":
        return (
          <div
            style={{ maxWidth: "100%" }}
            className={`form-group  mt-0 mb-0 ${row.size}`}
          >
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                accept="image/png, image/jpeg , image/jpg"
                required={row.value === "" ? row.required : false}
                onChange={(e) => funcChangeInput(e, alfa, indexParent, beta)}
              />
              <label className="custom-file-label" htmlFor="customFile">
                {row.fileName}
              </label>
            </div>
            <small className="text-muted">
              Silakan masukkan type file JPG/JPEG/PNG
            </small>
          </div>
        );
        break;
      case "file_doc":
        return (
          <div
            style={{ maxWidth: "100%" }}
            className={`form-group  mt-0 mb-0 ${row.size}`}
          >
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                accept="application/pdf"
                required={row.value === "" ? row.required : false}
                onChange={(e) => funcChangeInput(e, alfa, indexParent, beta)}
              />
              <label className="custom-file-label" htmlFor="customFile">
                {row.fileName}
              </label>
            </div>
            <small className="text-muted">Silakan masukkan type file PDF</small>
          </div>
        );
        break;
      case "date":
        return (
          <div
            style={{ maxWidth: "100%" }}
            className={`form-group  mt-0 mb-0 ${row.size}`}
          >
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <input
              type={row.element}
              name=""
              className="form-control"
              required={row.required}
              value={row.value}
              onChange={(e) =>
                funcChangeInput(e.target.value, alfa, indexParent, beta)
              }
            />
          </div>
        );
        break;
      case "triggered":
        return (
          <>
            <div
              style={{ maxWidth: "100%" }}
              className={`form-group  mt-0 mb-0 ${row.size}`}
            >
              <label className="col-form-label font-weight-bold">
                {row.name}
              </label>
              <select
                name=""
                className="form-control"
                required={row.required}
                value={row.value}
                onChange={(e) =>
                  funcChangeInput(e.target.value, alfa, indexParent, beta)
                }
              >
                <option value="">--Pilih Data--</option>
                {row.option === "manual" &&
                  row.dataOption.split(";").map((dat, i) => (
                    <option value={dat} key={i}>
                      {dat}
                    </option>
                  ))}
              </select>
            </div>
            {row.triggered_children.map(
              (rowChildren, indexChildren) =>
                row.value === rowChildren.triggeredName &&
                rowChildren.triggeredForm.map((rowForm, gamma) => (
                  <>
                    {helperElementRenderChildren(
                      rowForm,
                      propsToken,
                      alfa,
                      indexParent,
                      beta,
                      indexChildren,
                      gamma
                    )}
                  </>
                ))
            )}
          </>
        );
        break;
      case "upload_document":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold d-flex">
              {row.name}
              <p
                className="text-primary ml-3 mb-0"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  !row.dataOption.includes("data:") &&
                    window.open(
                      process.env.END_POINT_API_IMAGE_BEASISWA + row.dataOption,
                      "_blank"
                    );
                }}
              >
                Unduh Contoh Document
              </p>
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                accept="application/pdf"
                required={row.value === "" ? row.required : false}
                onChange={(e) => funcChangeInput(e, alfa, indexParent, beta)}
              />
              <label className="custom-file-label" htmlFor="customFile">
                {row.value === "" ? "Belum ada file" : row.fileName}
              </label>
            </div>
            <small className="text-muted">
              Silakan masukkan type file JPG/JPEG/PNG/PDF
            </small>
          </div>
        );
        break;
      default:
        break;
    }
  };
  const helperElementRender = (row, propsToken, alfa) => {
    switch (row.element) {
      case "text":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <input
              type={row.element}
              name=""
              className="form-control"
              required={row.required}
              value={row.value}
              placeholder={`Silahkan Masukkan ${row.name}`}
              onChange={(e) => funcChangeInput(e.target.value, alfa)}
            />
          </div>
        );
        break;
      case "select":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <select
              name=""
              className="form-control"
              required={row.required}
              value={row.value}
              onChange={(e) => funcChangeInput(e.target.value, alfa)}
            >
              <option value="">--Pilih Data--</option>

              {row.option === "manual" ? (
                row.dataOption.split(";").map((dat, i) => (
                  <option value={dat} key={i}>
                    {dat}
                  </option>
                ))
              ) : (
                <OptionsReference id={row.dataOption} token={propsToken} />
              )}
            </select>
          </div>
        );
        break;
      case "checkbox":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="my-auto">
              {row.option === "manual" ? (
                row.dataOption.split(";").map((dat, i) => (
                  <div className="form-check pb-3" key={i}>
                    <input
                      type="checkbox"
                      name="plotRegistration"
                      className="form-check-input"
                      value={dat}
                      onChange={(e) => funcChangeInput(e.target.value, alfa)}
                    />
                    <label className="form-check-label">{dat}</label>
                  </div>
                ))
              ) : (
                <CheckboxReference
                  id={row.dataOption}
                  token={propsToken}
                  required={row.required}
                  onChangeValue={(value) => funcChangeInput(value, alfa)}
                />
              )}
            </div>
          </div>
        );
        break;
      case "textarea":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <textarea
              name=""
              cols="30"
              rows="5"
              className="form-control"
              required={row.required}
              value={row.value}
              onChange={(e) => funcChangeInput(e.target.value, alfa)}
            />
          </div>
        );
        break;
      case "radio":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="my-auto">
              {row.option === "manual" ? (
                row.dataOption.split(";").map((dat, i) => (
                  <div className="form-check pb-3" key={i}>
                    <input
                      type="radio"
                      name={row.name}
                      className="form-check-input"
                      value={dat}
                      required={row.required}
                      onChange={(e) => funcChangeInput(e.target.value, alfa)}
                    />
                    <label className="form-check-label">{dat}</label>
                  </div>
                ))
              ) : (
                <RadioReference
                  id={row.dataOption}
                  token={propsToken}
                  required={row.required}
                  onChangeValue={(value) => funcChangeInput(value, alfa)}
                />
              )}
            </div>
          </div>
        );
        break;
      case "file_image":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                accept="image/png, image/jpeg , image/jpg"
                required={row.value === "" ? row.required : false}
                onChange={(e) => funcChangeInput(e, alfa)}
              />
              <label className="custom-file-label" htmlFor="customFile">
                {row.fileName}
              </label>
            </div>
            <small className="text-muted">
              Silakan masukkan type file JPG/JPEG/PNG
            </small>
          </div>
        );
        break;
      case "file_doc":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                accept="application/pdf"
                required={row.value === "" ? row.required : false}
                onChange={(e) => funcChangeInput(e, alfa)}
              />
              <label className="custom-file-label" htmlFor="customFile">
                {row.fileName}
              </label>
            </div>
            <small className="text-muted">Silakan masukkan type file PDF</small>
          </div>
        );
        break;
      case "date":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <input
              type={row.element}
              name=""
              className="form-control"
              required={row.required}
              value={row.value}
              onChange={(e) => funcChangeInput(e.target.value, alfa)}
            />
          </div>
        );
        break;
      case "triggered":
        return (
          <>
            <div className={`form-group mt-0 mb-0 ${row.size}`}>
              <label className="col-form-label font-weight-bold">
                {row.name}
              </label>
              <select
                name=""
                className="form-control"
                required={row.required}
                value={row.value}
                onChange={(e) => funcChangeInput(e.target.value, alfa)}
              >
                <option value="">--Pilih Data--</option>
                {row.option === "manual" &&
                  row.dataOption.split(";").map((dat, i) => (
                    <option value={dat} key={i}>
                      {dat}
                    </option>
                  ))}
              </select>
            </div>
            {row.triggered_parent.map(
              (rowParent, indexParent) =>
                row.value === rowParent.triggeredName &&
                rowParent.triggeredForm.map((rowForm, beta) => (
                  <>
                    {helperElementRenderParent(
                      rowForm,
                      propsToken,
                      alfa,
                      indexParent,
                      beta
                    )}
                  </>
                ))
            )}
          </>
        );
        break;
      case "upload_document":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold d-flex">
              {row.name}
              <p
                className="text-primary ml-3 mb-0"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  !row.dataOption.includes("data:") &&
                    window.open(
                      process.env.END_POINT_API_IMAGE_BEASISWA + row.dataOption,
                      "_blank"
                    );
                }}
              >
                Unduh Contoh Document
              </p>
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                accept="application/pdf"
                required={row.value === "" ? row.required : false}
                onChange={(e) => funcChangeInput(e, alfa)}
              />
              <label className="custom-file-label" htmlFor="customFile">
                {row.value === "" ? "Belum ada file" : row.fileName}
              </label>
            </div>
            <small className="text-muted">
              Silakan masukkan type file JPG/JPEG/PNG/PDF
            </small>
          </div>
        );
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="row justify-content-start">
        {formBuilder &&
          formBuilder.map((row, alfa) => (
            <>{helperElementRender(row, token, alfa)}</>
          ))}
      </div>
    </>
  );
};

export default FormBuilderComponent;
