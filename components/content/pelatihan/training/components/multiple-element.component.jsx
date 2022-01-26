import React from "react";
import { options } from "../../../../../utils/middleware/helper/data";

const MultipleElementRender = ({
  row,
  funcInputChangeParentHandler,
  dataOptions,
  i,
  parentIndex,
  j = null,
  childrenIndex,
  k = null,
  indexIndex,
  l = null,
}) => {
  const DataOptionElementRender = (
    row,
    i,
    parentIndex,
    j,
    childrenIndex,
    k,
    indexIndex,
    l
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
                funcInputChangeParentHandler(
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
                funcInputChangeParentHandler(
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
                funcInputChangeParentHandler(
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
        {DataOptionElementRender(
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
                funcInputChangeParentHandler(
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
                funcInputChangeParentHandler(
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
              required
              onChange={(e) =>
                funcInputChangeParentHandler(
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
              {row.fileName === ""
                ? row.dataOption.split("/")[2]
                : row.fileName}
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
                funcInputChangeParentHandler(
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
                funcInputChangeParentHandler(
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

export default MultipleElementRender;
