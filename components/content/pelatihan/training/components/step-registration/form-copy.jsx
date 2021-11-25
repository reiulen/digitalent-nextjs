import React, { useState, useRef, useEffect } from "react";
import SimpleReactValidator from "simple-react-validator";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { getDetailMasterPelatihan } from "../../../../../../redux/actions/pelatihan/master-pendaftaran.action";

const FormCopy = ({
  title,
  optionsForm,
  funcTitle,
  funcFormBuilder,
  funcModalShow,
  token,
}) => {
  const dispatch = useDispatch();
  const {
    loading: loadingFormPendaftaran,
    form: formPendaftaran,
    error: errorForm,
  } = useSelector((state) => state.getDetailMasterPelatihan);

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  useEffect(() => {
    if (
      formPendaftaran &&
      Object.keys(formPendaftaran).length !== 0 &&
      Object.getPrototypeOf(formPendaftaran) === Object.prototype
    ) {
      funcFormBuilder(formPendaftaran.data.formBuilder);
    }
  }, [formPendaftaran]);

  const showPreviewHandler = () => {
    let list = [...formPendaftaran.data.formBuilder];
    list.forEach((row, i) => {
      if (row.option === "manual") {
        let dataOption = row.dataOption.split(";");
        row.dataOption = dataOption;
      }
    });
    funcFormBuilder(list);
    funcModalShow(true);
  };

  return (
    <>
      <div className="form-group mb-4">
        <label className="col-form-label font-weight-bold">Judul Form</label>
        {console.log([{id: title, label: title}])}

        <Select
          options={optionsForm}
          value={{value: title, label: title}}
          onChange={(e) => {
            funcTitle(e.label);
            dispatch(getDetailMasterPelatihan(e.value, token));
          }}
        />
        <small className="form-text text-danger">
          *Form pendaftaran akan terhubung dengan master form pendaftaran.
          Apabila master form pendaftaran diubah maka form pendaftaran pelatihan
          ini akan ikut berubah.
        </small>

        {simpleValidator.current.message("judul form", title, "required", {
          className: "text-danger",
        })}
      </div>

      <div className="form-group mb-9 mt-4">
        <div className="text-right">
          <button
            className="btn btn-light-success mr-2"
            type="button"
            style={{ borderRadius: "30px", fontWeight: "600" }}
            onClick={showPreviewHandler}
          >
            Review
          </button>
        </div>
      </div>
    </>
  );
};

export default FormCopy;
