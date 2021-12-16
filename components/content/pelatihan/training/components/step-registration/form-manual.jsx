import React, { useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";

const FormManual = ({
  title,
  formBuilder,
  funcTitle,
  funcFormBuilder,
  funcModalShow,
  element,
  size,
  options,
  dataOptions,
}) => {
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const inputChangeHandler = (
    e,
    alfa,
    beta = null,
    gamma = null,
    delta = null
  ) => {
    const { value, name, checked } = e.target;
    if (alfa !== null && beta === null && gamma === null && delta === null) {
      const list = [...formBuilder];
      if (name === "upload-document") {
        const type = [
          "image/jpg",
          "image/png",
          "image/jpeg",
          "application/pdf",
        ];
        if (e.target.files[0]) {
          if (type.includes(e.target.files[0].type)) {
            const reader = new FileReader();
            reader.onload = () => {
              if (reader.readyState === 2) {
                list[alfa].dataOption = reader.result;
              }
            };
            reader.readAsDataURL(e.target.files[0]);
            list[alfa].fileName = e.target.files[0].name;
          } else {
            e.target.value = null;
            Swal.fire(
              "Oops !",
              "Data yang bisa dimasukkan hanya berupa file pdf dan gambar.",
              "error"
            );
          }
        }
      }
      if (name === "element" && value === "triggered") {
        list[alfa].option = "manual";
        list[alfa].size = "col-md-12";
      }
      list[alfa][name] = value;
      if (name === "required") {
        let check = checked === true ? "1" : "0";
        list[alfa]["required"] = check;
      }

      if (name === "triggered") {
        let check = checked === true ? "1" : "0";
        if (checked) {
          list.map((row, i) => {
            if (row.option === "manual") {
              if (row.dataOption !== "") {
                let dataOption = row.dataOption.split(";");
                dataOption.map((triggeredOption, index) => {
                  let val = {
                    key: index + 1,
                    name: triggeredOption,
                    element: "",
                    size: "",
                    option: "",
                    dataOption: "",
                    fileName: "Belum ada file",
                    triggered: "0",
                    triggered_children: [],
                  };
                  list[alfa].triggered_parent.push(val);
                });
              }
            }
          });
        } else {
          list[alfa].triggered_parent = [];
        }
        list[alfa]["triggered"] = check;
      }
      funcFormBuilder(list);
    }

    if (alfa !== null && beta !== null && gamma === null && delta === null) {
      const list = [...formBuilder];
      if (name === "upload-document") {
        const type = [
          "image/jpg",
          "image/png",
          "image/jpeg",
          "application/pdf",
        ];
        if (e.target.files[0]) {
          if (type.includes(e.target.files[0].type)) {
            const reader = new FileReader();
            reader.onload = () => {
              if (reader.readyState === 2) {
                list[alfa].triggered_parent[beta].dataOption = reader.result;
              }
            };
            reader.readAsDataURL(e.target.files[0]);
            list[alfa].triggered_parent[beta].fileName = e.target.files[0].name;
          } else {
            e.target.value = null;
            Swal.fire(
              "Oops !",
              "Data yang bisa dimasukkan hanya berupa file pdf dan gambar.",
              "error"
            );
          }
        }
      }
      if (name === "element" && value === "triggered") {
        list[alfa].triggered_parent[beta].option = "manual";
        list[alfa].triggered_parent[beta].size = "col-md-12";
      }
      list[alfa].triggered_parent[beta][name] = value;
      if (name === "required") {
        let check = checked === true ? "1" : "0";
        list[alfa].triggered_parent[beta]["required"] = check;
      }
      if (name === "triggered") {
        let check = checked === true ? "1" : "0";
        list[alfa].triggered_parent[beta]["triggered"] = check;
        if (checked) {
          list[alfa].triggered_parent.map((row, i) => {
            if (row.option === "manual") {
              if (row.dataOption !== "") {
                let dataOption = row.dataOption.split(";");
                dataOption.map((triggeredOption, index) => {
                  let val = {
                    key: index + 1,
                    name: triggeredOption,
                    element: "",
                    size: "",
                    option: "",
                    dataOption: "",
                    fileName: "Belum ada file",
                    triggered: "0",
                    triggered_index: [],
                  };
                  list[alfa].triggered_parent[beta].triggered_children.push(
                    val
                  );
                });
              }
            }
          });
        } else {
          list[alfa].triggered_parent[beta].triggered_children = [];
        }
      }
      funcFormBuilder(list);
    }

    if (alfa !== null && beta !== null && gamma !== null && delta === null) {
      const list = [...formBuilder];
      if (name === "upload-document") {
        const type = [
          "image/jpg",
          "image/png",
          "image/jpeg",
          "application/pdf",
        ];
        if (e.target.files[0]) {
          if (type.includes(e.target.files[0].type)) {
            const reader = new FileReader();
            reader.onload = () => {
              if (reader.readyState === 2) {
                list[alfa].triggered_parent[beta].triggered_children[
                  gamma
                ].dataOption = reader.result;
              }
            };
            reader.readAsDataURL(e.target.files[0]);
            list[alfa].triggered_parent[beta].triggered_children[
              gamma
            ].fileName = e.target.files[0].name;
          } else {
            e.target.value = null;
            Swal.fire(
              "Oops !",
              "Data yang bisa dimasukkan hanya berupa file pdf dan gambar.",
              "error"
            );
          }
        }
      }
      if (name === "element" && value === "triggered") {
        list[alfa].triggered_parent[beta].triggered_children[gamma].option =
          "manual";
        list[alfa].triggered_parent[beta].triggered_children[gamma].size =
          "col-md-12";
      }
      list[alfa].triggered_parent[beta].triggered_children[gamma][name] = value;
      if (name === "required") {
        let check = checked === true ? "1" : "0";
        list[alfa].triggered_parent[beta].triggered_children[gamma][
          "required"
        ] = check;
      }
      if (name === "triggered") {
        let check = checked === true ? "1" : "0";
        list[alfa].triggered_parent[beta].triggered_children[gamma][
          "triggered"
        ] = check;
        if (checked) {
          list[alfa].triggered_parent[beta].triggered_children.map((row, i) => {
            if (row.option === "manual") {
              if (row.dataOption !== "") {
                let dataOption = row.dataOption.split(";");
                dataOption.map((triggeredOption, index) => {
                  let val = {
                    key: index + 1,
                    name: triggeredOption,
                    element: "",
                    size: "",
                    option: "",
                    dataOption: "",
                    fileName: "Belum ada file",
                  };
                  list[alfa].triggered_parent[beta].triggered_children[
                    gamma
                  ].triggered_index.push(val);
                });
              }
            }
          });
        } else {
          list[alfa].triggered_parent[beta].triggered_children[
            gamma
          ].triggered_index = [];
        }
      }
      funcFormBuilder(list);
    }

    if (alfa !== null && beta !== null && gamma !== null && delta !== null) {
      const list = [...formBuilder];
      if (name === "upload-document") {
        const type = [
          "image/jpg",
          "image/png",
          "image/jpeg",
          "application/pdf",
        ];
        if (e.target.files[0]) {
          if (type.includes(e.target.files[0].type)) {
            const reader = new FileReader();
            reader.onload = () => {
              if (reader.readyState === 2) {
                list[alfa].triggered_parent[beta].triggered_children[
                  gamma
                ].triggered_index[delta].dataOption = reader.result;
              }
            };
            reader.readAsDataURL(e.target.files[0]);
            list[alfa].triggered_parent[beta].triggered_children[
              gamma
            ].triggered_index[delta].fileName = e.target.files[0].name;
          } else {
            e.target.value = null;
            Swal.fire(
              "Oops !",
              "Data yang bisa dimasukkan hanya berupa file pdf dan gambar.",
              "error"
            );
          }
        }
      }
      if (name === "element" && value === "triggered") {
        list[alfa].triggered_parent[beta].triggered_children[
          gamma
        ].triggered_index[delta].option = "manual";
        list[alfa].triggered_parent[beta].triggered_children[
          gamma
        ].triggered_index[delta].size = "col-md-12";
      }
      list[alfa].triggered_parent[beta].triggered_children[
        gamma
      ].triggered_index[delta][name] = value;
      if (name === "required") {
        let check = checked === true ? "1" : "0";
        list[alfa].triggered_parent[beta].triggered_children[
          gamma
        ].triggered_index[delta]["required"] = check;
      }
      funcFormBuilder(list);
    }
  };

  const removeFieldHandler = (
    alfa,
    beta = null,
    gamma = null,
    delta = null
  ) => {
    if (alfa && beta === null && gamma === null && delta === null) {
      const list = [...formBuilder];
      list.splice(alfa, 1);
      list.forEach((row, i) => {
        let key = i + 1;
        list[i]["key"] = key;
      });
      funcFormBuilder(list);
    }

    if (alfa !== null && beta !== null && gamma === null && delta === null) {
      const list = [...formBuilder];
      let listAlfa = list[alfa];
      listAlfa.triggered_parent.splice(beta, 1);
      if (listAlfa.triggered_parent.length > 0) {
        listAlfa.triggered_parent.map((row, i) => {
          let key = i + 1;
          listAlfa.triggered_parent[i].key = key;
        });
      }
      funcFormBuilder(list);
    }

    if (alfa !== null && beta !== null && gamma !== null && delta === null) {
      const list = [...formBuilder];
      const listBeta = list[alfa].triggered_parent[beta];
      listBeta.triggered_children.splice(gamma, 1);
      if (listBeta.triggered_children.length > 0) {
        listBeta.triggered_children.map((row, i) => {
          let key = i + 1;
          listBeta.triggered_children[i].key = key;
        });
      }
      funcFormBuilder(list);
    }

    if (alfa !== null && beta !== null && gamma !== null && delta !== null) {
      const list = [...formBuilder];
      const listGamma =
        list[alfa].triggered_parent[beta].triggered_children[gamma];
      listGamma.triggered_index.splice(delta, 1);
      if (listGamma.triggered_index.length > 0) {
        listGamma.triggered_index.map((row, i) => {
          let key = i + 1;
          listGamma.triggered_index[i].key = key;
        });
      }
      funcFormBuilder(list);
    }
  };

  const renderDataOptionHandler = (row, i, j = null, k = null, l = null) => {
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
              onChange={(e) => inputChangeHandler(e, i, j, k, l)}
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
              onChange={(e) => inputChangeHandler(e, i, j, k, l)}
              required
            />
          </div>
        </div>
      );
    }
  };

  const renderMultipleHandler = (row, i, j = null, k = null, l = null) => {
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
                onChange={(e) => inputChangeHandler(e, i, j, k, l)}
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
          {renderDataOptionHandler(row, i, j, k, l)}
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
                onChange={(e) => inputChangeHandler(e, i, j, k, l)}
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
                onChange={(e) => inputChangeHandler(e, i, j, k, l)}
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
                onChange={(e) => inputChangeHandler(e, i, j, k, l)}
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
                onChange={(e) => inputChangeHandler(e, i, j, k, l)}
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
                onChange={(e) => inputChangeHandler(e, i, j, k, l)}
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
    let list = [...formBuilder];
    // list.forEach((row, i) => {
    //   if (row.option === "manual") {
    //     let dataOption = row.dataOption.split(";");
    //     row.dataOption = dataOption;
    //   }
    // });
    funcFormBuilder(list);
    funcModalShow(true);
  };

  const addFieldHandler = () => {
    const newKey = formBuilder[formBuilder.length - 1].key + 1;
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
      },
    ]);
  };

  return (
    <>
      <div className="form-group mb-4">
        <label className="col-form-label font-weight-bold">Judul Form</label>
        <input
          type="text"
          placeholder="Silahkan Masukan Judul Form"
          className="form-control"
          value={title}
          onChange={(e) => funcTitle(e.target.value)}
          onBlur={() => simpleValidator.current.showMessageFor("judul form")}
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

      {formBuilder.map((row, i) => (
        <div className="builder row" key={i}>
          <div className="col-sm-12 col-md-2">
            <div className="form-group mb-2">
              <label className="col-form-label font-weight-bold">
                Nama Field
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={row.name}
                placeholder="Field"
                autoComplete="off"
                onChange={(e) => inputChangeHandler(e, i)}
                required
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-2">
            <div className="form-group mb-2">
              <label className="col-form-label font-weight-bold">
                Pilih Element
              </label>
              <select
                className="form-control"
                name="element"
                value={row.element}
                onChange={(e) => inputChangeHandler(e, i)}
                required
                disabled={row.triggered === "1" ? true : false}
              >
                <option value="" disabled selected>
                  -- PILIH --
                </option>
                {element.map((el, i) => (
                  <option key={i} value={el.value}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-sm-12 col-md-2">
            <div className="form-group mb-2">
              <label className="col-form-label font-weight-bold">Size</label>
              <select
                className="form-control"
                name="size"
                value={row.size}
                onChange={(e) => inputChangeHandler(e, i)}
                required
                disabled={row.element === "triggered" ? true : false}
              >
                <option value="" disabled selected>
                  -- PILIH --
                </option>
                {size.map((siz, i) => (
                  <option key={i} value={siz.value}>
                    {siz.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {renderMultipleHandler(row, i)}
          <div className="col-sm-6 col-md-2">
            <label className="col-form-label font-weight-bold ">Req</label>
            {row.element === "triggered" && (
              <label className="col-form-label font-weight-bold ml-3">
                Triggered
              </label>
            )}
            <div className="d-flex align-items-end justify-content-between">
              <div className="form-group ">
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    name="required"
                    checked={row.required === "1" ? true : false}
                    className="form-check-input"
                    onChange={(e) => inputChangeHandler(e, i)}
                  />
                </div>
              </div>
              {row.element === "triggered" && (
                <div className="">
                  <label className="switches">
                    <input
                      className="checkbox"
                      name="triggered"
                      checked={row.triggered === "1" ? true : false}
                      type="checkbox"
                      onChange={(e) => inputChangeHandler(e, i)}
                    />
                    <span className={`sliders round pl-2`}></span>
                  </label>
                </div>
              )}
              {formBuilder.length !== 1 && row.key !== 1 ? (
                <button
                  className="btn btn-link-action bg-danger text-white mb-3 "
                  type="button"
                  onClick={() => removeFieldHandler(i)}
                >
                  <i className="ri-delete-bin-fill p-0 text-white"></i>
                </button>
              ) : (
                <button
                  className="btn btn-link-action bg-danger text-white mb-3  invisible"
                  type="button"
                  onClick={() => removeFieldHandler(i)}
                >
                  <i className="ri-delete-bin-fill p-0 text-white"></i>
                </button>
              )}
            </div>
          </div>

          {row.triggered_parent &&
            row.triggered_parent.length > 0 &&
            row.triggered_parent.map((rowParent, j) => (
              <div className="container pl-15" key={j}>
                <div className="row justify-content-start">
                  <div className="col-sm-12 col-md-2">
                    <div className="form-group mb-2">
                      <label className="col-form-label font-weight-bold">
                        Opsi : {j + 1}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={rowParent.name}
                        placeholder="Field"
                        autoComplete="off"
                        onChange={(e) => inputChangeHandler(e, i, j)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-2">
                    <div className="form-group mb-2">
                      <label className="col-form-label font-weight-bold">
                        Pilih Element
                      </label>
                      <select
                        className="form-control"
                        name="element"
                        value={rowParent.element}
                        onChange={(e) => inputChangeHandler(e, i, j)}
                        required
                        disabled={rowParent.triggered === "1" ? true : false}
                      >
                        <option value="" disabled selected>
                          -- PILIH --
                        </option>
                        {element.map((el, i) => (
                          <option key={i} value={el.value}>
                            {el.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-2">
                    <div className="form-group mb-2">
                      <label className="col-form-label font-weight-bold">
                        Size
                      </label>
                      <select
                        className="form-control"
                        name="size"
                        value={rowParent.size}
                        onChange={(e) => inputChangeHandler(e, i, j)}
                        required
                        disabled={
                          rowParent.element === "triggered" ? true : false
                        }
                      >
                        <option value="" disabled selected>
                          -- PILIH --
                        </option>
                        {size.map((siz, i) => (
                          <option key={i} value={siz.value}>
                            {siz.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {renderMultipleHandler(rowParent, i, j)}
                  <div className="col-sm-6 col-md-2">
                    <label className="col-form-label font-weight-bold ">
                      Req
                    </label>
                    {rowParent.element === "triggered" && (
                      <label className="col-form-label font-weight-bold ml-3">
                        Triggered
                      </label>
                    )}
                    <div className="d-flex align-items-end justify-content-between">
                      <div className="form-group ">
                        <div className="form-check mb-4">
                          <input
                            type="checkbox"
                            name="required"
                            checked={rowParent.required === "1" ? true : false}
                            className="form-check-input"
                            onChange={(e) => inputChangeHandler(e, i, j)}
                          />
                        </div>
                      </div>
                      {rowParent.element === "triggered" && (
                        <div className="">
                          <label className="switches">
                            <input
                              className="checkbox"
                              name="triggered"
                              checked={
                                rowParent.triggered === "1" ? true : false
                              }
                              type="checkbox"
                              onChange={(e) => inputChangeHandler(e, i, j)}
                            />
                            <span className={`sliders round pl-2`}></span>
                          </label>
                        </div>
                      )}
                      <button
                        className="btn btn-link-action bg-danger text-white mb-3 "
                        type="button"
                        onClick={() => removeFieldHandler(i, j)}
                      >
                        <i className="ri-delete-bin-fill p-0 text-white"></i>
                      </button>
                    </div>
                  </div>

                  {rowParent.triggered_children &&
                    rowParent.triggered_children.length > 0 &&
                    rowParent.triggered_children.map((rowChildren, k) => (
                      <div className="container pl-15" key={k}>
                        <div className="row justify-content-start">
                          <div className="col-sm-12 col-md-2">
                            <div className="form-group mb-2">
                              <label className="col-form-label font-weight-bold">
                                Opsi : {k + 1}
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={rowChildren.name}
                                placeholder="Field"
                                autoComplete="off"
                                onChange={(e) => inputChangeHandler(e, i, j, k)}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-2">
                            <div className="form-group mb-2">
                              <label className="col-form-label font-weight-bold">
                                Pilih Element
                              </label>
                              <select
                                className="form-control"
                                name="element"
                                value={rowChildren.element}
                                onChange={(e) => inputChangeHandler(e, i, j, k)}
                                required
                                disabled={
                                  rowChildren.triggered === "1" ? true : false
                                }
                              >
                                <option value="" disabled selected>
                                  -- PILIH --
                                </option>
                                {element.map((el, i) => (
                                  <option key={i} value={el.value}>
                                    {el.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-2">
                            <div className="form-group mb-2">
                              <label className="col-form-label font-weight-bold">
                                Size
                              </label>
                              <select
                                className="form-control"
                                name="size"
                                value={rowChildren.size}
                                onChange={(e) => inputChangeHandler(e, i, j, k)}
                                required
                                disabled={
                                  rowChildren.element === "triggered"
                                    ? true
                                    : false
                                }
                              >
                                <option value="" disabled selected>
                                  -- PILIH --
                                </option>
                                {size.map((siz, i) => (
                                  <option key={i} value={siz.value}>
                                    {siz.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {renderMultipleHandler(rowChildren, i, j, k)}
                          <div className="col-sm-6 col-md-2">
                            <label className="col-form-label font-weight-bold ">
                              Req
                            </label>
                            {rowChildren.element === "triggered" && (
                              <label className="col-form-label font-weight-bold ml-3">
                                Triggered
                              </label>
                            )}
                            <div className="d-flex align-items-end justify-content-between">
                              <div className="form-group ">
                                <div className="form-check mb-4">
                                  <input
                                    type="checkbox"
                                    name="required"
                                    checked={
                                      rowChildren.required === "1"
                                        ? true
                                        : false
                                    }
                                    className="form-check-input"
                                    onChange={(e) =>
                                      inputChangeHandler(e, i, j, k)
                                    }
                                  />
                                </div>
                              </div>
                              {rowChildren.element === "triggered" && (
                                <div className="">
                                  <label className="switches">
                                    <input
                                      className="checkbox"
                                      name="triggered"
                                      checked={
                                        rowChildren.triggered === "1"
                                          ? true
                                          : false
                                      }
                                      type="checkbox"
                                      onChange={(e) =>
                                        inputChangeHandler(e, i, j, k)
                                      }
                                    />
                                    <span
                                      className={`sliders round pl-2`}
                                    ></span>
                                  </label>
                                </div>
                              )}
                              <button
                                className="btn btn-link-action bg-danger text-white mb-3 "
                                type="button"
                                onClick={() => removeFieldHandler(i, j, k)}
                              >
                                <i className="ri-delete-bin-fill p-0 text-white"></i>
                              </button>
                            </div>
                          </div>

                          {rowChildren.triggered_index &&
                            rowChildren.triggered_index.length > 0 &&
                            rowChildren.triggered_index.map((rowIndex, l) => (
                              <div className="container pl-20" key={l}>
                                <div className="row justify-content-start">
                                  <div className="col-sm-12 col-md-2">
                                    <div className="form-group mb-2">
                                      <label className="col-form-label font-weight-bold">
                                        Opsi : {l + 1}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={rowIndex.name}
                                        placeholder="Field"
                                        autoComplete="off"
                                        onChange={(e) =>
                                          inputChangeHandler(e, i, j, k, l)
                                        }
                                        required
                                      />
                                    </div>
                                  </div>
                                  <div className="col-sm-12 col-md-2">
                                    <div className="form-group mb-2">
                                      <label className="col-form-label font-weight-bold">
                                        Pilih Element
                                      </label>
                                      <select
                                        className="form-control"
                                        name="element"
                                        value={rowIndex.element}
                                        onChange={(e) =>
                                          inputChangeHandler(e, i, j, k, l)
                                        }
                                        required
                                        disabled={
                                          rowIndex.triggered === "1"
                                            ? true
                                            : false
                                        }
                                      >
                                        <option value="" disabled selected>
                                          -- PILIH --
                                        </option>
                                        {element.map(
                                          (el, i) =>
                                            el.value !== "triggered" && (
                                              <option key={i} value={el.value}>
                                                {el.name}
                                              </option>
                                            )
                                        )}
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-sm-12 col-md-2">
                                    <div className="form-group mb-2">
                                      <label className="col-form-label font-weight-bold">
                                        Size
                                      </label>
                                      <select
                                        className="form-control"
                                        name="size"
                                        value={rowIndex.size}
                                        onChange={(e) =>
                                          inputChangeHandler(e, i, j, k, l)
                                        }
                                        required
                                        disabled={
                                          rowIndex.element === "triggered"
                                            ? true
                                            : false
                                        }
                                      >
                                        <option value="" disabled selected>
                                          -- PILIH --
                                        </option>
                                        {size.map((siz, i) => (
                                          <option key={i} value={siz.value}>
                                            {siz.name}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>

                                  {renderMultipleHandler(rowIndex, i, j, k, l)}
                                  <div className="col-sm-6 col-md-2">
                                    <label className="col-form-label font-weight-bold ml-md-10">
                                      Req
                                    </label>
                                    <div className="d-flex align-items-end justify-content-between">
                                      <div className="form-group ml-md-10">
                                        <div className="form-check form-check-inline">
                                          <input
                                            type="checkbox"
                                            name="required"
                                            checked={
                                              rowIndex.required === "1"
                                                ? true
                                                : false
                                            }
                                            className="form-check-input"
                                            onChange={(e) =>
                                              inputChangeHandler(e, i, j, k, l)
                                            }
                                          />
                                        </div>
                                      </div>
                                      <button
                                        className="btn btn-link-action bg-danger text-white mb-3 "
                                        type="button"
                                        onClick={() =>
                                          removeFieldHandler(i, j, k, l)
                                        }
                                      >
                                        <i className="ri-delete-bin-fill p-0 text-white"></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          <div className="col-md-12">
            <hr />
          </div>
        </div>
      ))}

      <div className="form-group mb-9 mt-10">
        <div className="text-right">
          <button
            className="btn btn-light-success mr-2"
            type="button"
            style={{ borderRadius: "30px", fontWeight: "600" }}
            onClick={showPreviewHandler}
          >
            Review
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

export default FormManual;
