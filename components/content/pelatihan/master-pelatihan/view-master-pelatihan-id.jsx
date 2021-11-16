import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import PageWrapper from "../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";

const ViewTrainingStep2 = () => {
  const router = useRouter();

  const { error: errorReview, review } = useSelector(
    (state) => state.getReviewStep2
  );

  const { form } = useSelector((state) => state.getDetailMasterPelatihan);
  const [titleForm] = useState(form.data.judul_form);

  const readerElementHandler = (row, i) => {
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
              disabled
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
            <select name="" className="form-control" required={row.required}>
              {row.option === "manual"
                ? row.dataOption.split(";").map((dat, i) => (
                    <option value={dat} key={i}>
                      {dat}
                    </option>
                  ))
                : ""}
            </select>
          </div>
        );
      case "checkbox":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="my-auto">
              {row.option === "manual"
                ? row.dataOption.split(";").map((dat, i) => (
                    <div className="form-check pb-3" key={i}>
                      <input
                        type="checkbox"
                        name="plotRegistration"
                        className="form-check-input"
                        required={row.required}
                        value={dat}
                        disabled
                      />
                      <label className="form-check-label">{dat}</label>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        );
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
            />
          </div>
        );
      case "radio":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="my-auto">
              {row.option === "manual"
                ? row.dataOption.split(";").map((dat, i) => (
                    <div className="form-check pb-3" key={i}>
                      <input
                        type="radio"
                        name={row.name}
                        className="form-check-input"
                        value={dat}
                        required={row.required}
                        disabled
                      />
                      <label className="form-check-label">{dat}</label>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        );
      case "file_image":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label font-weight-bold">
              {row.name}
            </label>
            <div className="custom-file">
              <input
                disabled
                type="file"
                className="custom-file-input"
                accept="image/png, image/jpeg , image/jpg"
                required={row.required}
              />
              <label className="custom-file-label" htmlFor="customFile">
                Belum ada File
              </label>
            </div>
          </div>
        );
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
                required={row.required}
                disabled
              />
              <label className="custom-file-label" htmlFor="customFile">
                Belum ada File
              </label>
            </div>
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
              disabled
              type={row.element}
              name=""
              className="form-control"
              required={row.required}
            />
          </div>
        );
        break;
      default:
        break;
    }
  };

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-body py-4">
            <h3 className="font-weight-bolder pb-5 pt-4">{titleForm}</h3>

            <div className="row">
              {form.data.formBuilder.map((row, i) => (
                <>{readerElementHandler(row, i)}</>
              ))}
            </div>

            <div className="button my-5">
              <div className="text-right">
                <button
                  className="btn btn-primary-rounded-full mr-2"
                  type="button"
                  onClick={() => router.back()}
                >
                  Kembali
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ViewTrainingStep2;
