import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const ModalPreview = ({
  propsTitle,
  propsForm,
  propsModalShow,
  sendPropsFormBuilder,
  sendPropsModalShow,
}) => {
  const [title] = useState(propsTitle);
  const [modalShow, setModalShow] = useState(propsModalShow);
  const [formBuilder, setFormBuilder] = useState(propsForm);

  const closePreviewHandler = () => {
    let list = [...formBuilder];
    list.forEach((row, i) => {
      if (row.option === "manual") {
        let dataOption = row.dataOption.join(";");
        row.dataOption = dataOption;
      }
    });
    setFormBuilder(list);
    sendPropsFormBuilder(list);
    setModalShow(false);
    sendPropsModalShow(false);
  };

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
              {modalShow === true
                ? row.option === "manual"
                  ? row.dataOption.map((dat, i) => (
                      <option value={dat} key={i}>
                        {dat}
                      </option>
                    ))
                  : ""
                : ""}
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
              {modalShow === true
                ? row.option === "manual"
                  ? row.dataOption.map((dat, i) => (
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
                  : ""
                : ""}
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
              {modalShow === true
                ? row.option === "manual"
                  ? row.dataOption.map((dat, i) => (
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
                  : ""
                : ""}
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
            <label className="col-form-label font-weight-bold">
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
            <label className="col-form-label font-weight-bold">
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
    <>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        <button type="button" className="close" onClick={closePreviewHandler}>
          <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          {formBuilder.map((row, i) => (
            <>{readerElementHandler(row, i)}</>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer className="py-2">
        <div className="float-right">
          <button
            className="btn btn-warning"
            type="button"
            style={{ borderRadius: "30px", fontWeight: "600" }}
            onClick={closePreviewHandler}
          >
            Kembali
          </button>
        </div>
      </Modal.Footer>
    </>
  );
};

export default ModalPreview;
