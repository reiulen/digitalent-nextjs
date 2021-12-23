import React from "react";
import { size, element } from "../../../../../utils/middleware/helper/data";
import MultipleElementRender from "./multiple-element.component";

const RenderFormElement = ({
  row,
  funcInputChangeParentHandler,
  funcRemoveFieldHandler,
  formBuilder,
  i,
  parentIndex = null,
  j = null,
  childrenIndex,
  k = null,
  indexIndex,
  l = null,
  dataOptions,
}) => {
  return (
    <>
      <div className="col-sm-12 col-md-2">
        <div className="form-group mb-2">
          <label className="col-form-label font-weight-bold">Nama Field</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={row.name}
            placeholder="Field"
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
      <div className="col-sm-12 col-md-2">
        <div className="form-group mb-2">
          <label className="col-form-label font-weight-bold">
            Pilih Element
          </label>
          <select
            className="form-control"
            name="element"
            value={row.element}
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
          >
            <option value="" disabled selected>
              -- PILIH --
            </option>
            {l !== null
              ? element.map(
                  (el, i) =>
                    el.value !== "triggered" && (
                      <option key={i} value={el.value}>
                        {el.name}
                      </option>
                    )
                )
              : element.map((el, i) => (
                  <option key={i} value={el.value}>
                    {el.name}
                  </option>
                ))}
            {/* {element.map((el, i) => (
              <option key={i} value={el.value}>
                {el.name}
              </option>
            ))} */}
          </select>
        </div>
      </div>
      <div className="col-sm-12 col-md-2">
        <div className="form-group mb-2">
          <label className="col-form-label font-weight-bold">Ukuran Form</label>
          <select
            className="form-control"
            name="size"
            value={row.size}
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
            disabled={
              j !== null ? true : row.element === "triggered" ? true : false
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
      <MultipleElementRender
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
          funcInputChangeParentHandler(
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
        dataOptions={dataOptions}
        i={i}
        parentIndex={parentIndex}
        j={j}
        childrenIndex={childrenIndex}
        k={k}
        indexIndex={indexIndex}
        l={l}
      />
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
                <span className={`sliders round pl-2`}></span>
              </label>
            </div>
          )}
          <button
            className="btn btn-link-action bg-danger text-white mb-3 "
            type="button"
            onClick={() =>
              funcRemoveFieldHandler(
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
            <i className="ri-delete-bin-fill p-0 text-white"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default RenderFormElement;
