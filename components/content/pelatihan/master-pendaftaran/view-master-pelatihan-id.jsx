import React, { useState } from "react";
import { useRouter } from "next/router";

import PageWrapper from "../../../wrapper/page.wrapper";
import { useSelector } from "react-redux";
import OptionsReference from "../training/components/option-reference.component";
import CheckboxReference from "../training/components/checkbox-reference.component";
import RadioReference from "../training/components/radio-reference.component";

const ViewTrainingStep2 = ({ token }) => {
  const router = useRouter();

  const { form } = useSelector((state) => state.getDetailMasterPelatihan);
  const [titleForm] = useState(form.data.judul_form);

  const readerElementHandler = (row, i) => {
    switch (row.element) {
      case "text":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label text-neutral-body fz-14">
              {row.name}
            </label>
            <input
              type={row.element}
              className="form-control"
              required={row.required}
            />
          </div>
        );
        break;
      case "select":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label text-neutral-body fz-14">
              {row.name}
            </label>
            <select name="" className="form-control" required={row.required}>
              {row.option === "manual" ? (
                row.dataOption.split(";").map((dat, i) => (
                  <option value={dat} key={i}>
                    {dat}
                  </option>
                ))
              ) : (
                <OptionsReference id={row.dataOption} token={token} />
              )}
            </select>
          </div>
        );
        break;
      case "checkbox":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label text-neutral-body fz-14">
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
                      required={row.required}
                      value={dat}
                    />
                    <label className="form-check-label">{dat}</label>
                  </div>
                ))
              ) : (
                <CheckboxReference
                  id={row.dataOption}
                  token={token}
                  required={row.required}
                  onChangeValue={(value) => {}}
                />
              )}
            </div>
          </div>
        );
        break;
      case "textarea":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label text-neutral-body fz-14">
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
        break;
      case "radio":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label text-neutral-body fz-14">
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
                    />
                    <label className="form-check-label">{dat}</label>
                  </div>
                ))
              ) : (
                <RadioReference
                  id={row.dataOption}
                  token={token}
                  required={row.required}
                  onChangeValue={(value) => {}}
                />
              )}
            </div>
          </div>
        );
        break;
      case "file_image":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label text-neutral-body fz-14">
              {row.name}
            </label>
            <div className="custom-file">
              <input
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
        break;
      case "file_doc":
        return (
          <div className={`form-group mt-0 mb-0 ${row.size}`}>
            <label className="col-form-label text-neutral-body fz-14">
              {row.name}
            </label>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                accept="application/pdf"
                required={row.required}
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
            <label className="col-form-label text-neutral-body fz-14">
              {row.name}
            </label>
            <input
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
