import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

import {
  helperChangeInputForm,
  helperFormatCheckbox,
} from "../../../../../utils/middleware/helper";
import FormBuilderComponent from "../../../../../user-component-new/content/peserta/form-pendaftaran/component/form-builder.component";

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
  const [formBuilder, setFormBuilder] = useState([]);

  const closePreviewHandler = () => {
    setModalShow(false);
    sendPropsModalShow(false);
  };

  const onChangeInputHandler = (
    value,
    alfa,
    parentIndex = null,
    beta = null,
    childrenIndex = null,
    gamma = null,
    indexIndex = null,
    delta = null
  ) => {
    const valueState = helperChangeInputForm(
      value,
      formBuilder,
      alfa,
      parentIndex,
      beta,
      childrenIndex,
      gamma,
      indexIndex,
      delta
    );
    setFormBuilder(valueState);
  };

  useEffect(() => {
    const copyForm = [...propsForm];
    const valueForm = helperFormatCheckbox(copyForm);
    setFormBuilder(valueForm);
  }, [propsForm]);

  return (
    <>
      <form method="post">
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
          <button type="button" className="close" onClick={closePreviewHandler}>
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          <FormBuilderComponent
            formBuilder={formBuilder}
            token={propsToken}
            funcChangeInput={(
              value,
              alfa,
              indexParent,
              beta,
              indexChildren,
              gamma,
              indexIndex,
              delta
            ) =>
              onChangeInputHandler(
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
      </form>
    </>
  );
};

export default ModalPreview;
