import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

import { helperElementRender } from "../../../../../utils/middleware/helper";

const ModalPreview = ({
  propsTitle,
  propsForm,
  propsModalShow,
  sendPropsFormBuilder,
  sendPropsModalShow,
  propsToken,
}) => {
  const [title] = useState(propsTitle);
  const [modalShow, setModalShow] = useState(propsModalShow);
  const [formBuilder, setFormBuilder] = useState(propsForm);

  const closePreviewHandler = () => {
    setModalShow(false);
    sendPropsModalShow(false);
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
        <div className="row justify-content-end">
          {formBuilder.map((row, i) => (
            <>{helperElementRender(row, propsToken)}</>
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
