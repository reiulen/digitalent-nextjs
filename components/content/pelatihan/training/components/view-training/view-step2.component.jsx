import React, { useState, useEffect } from "react";
import {
  helperFormatCheckbox,
  helperChangeInputForm,
} from "../../../../../../utils/middleware/helper";
import FormBuilderComponent from "../../../../../../user-component-new/content/peserta/form-pendaftaran/component/form-builder.component";

const ViewStep2Component = ({ titleForm, formBuilder, token }) => {
  const [formBuilderState, setFormBuilderState] = useState(formBuilder);

  useEffect(() => {
    const copyForm = [...formBuilder];
    const valueForm = helperFormatCheckbox(copyForm);
    setFormBuilderState(valueForm);
  }, [formBuilder]);

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
    setFormBuilderState(valueState);
  };

  return (
    <>
      <h3 className="text-neutral-bodyer pb-5 pt-4">{titleForm}</h3>

      {/* <div className="row justify-content-end">
        {formBuilder &&
          formBuilder !== null &&
          formBuilder.length > 0 &&
          formBuilder.map((row, i) => <>{helperElementRender(row, token)}</>)}
      </div> */}
      <FormBuilderComponent
        formBuilder={formBuilderState}
        token={token}
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
    </>
  );
};

export default ViewStep2Component;
