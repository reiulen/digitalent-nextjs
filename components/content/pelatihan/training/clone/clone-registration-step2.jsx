import React, { useEffect, useState, useRef } from "react";

import { useRouter } from "next/router";

import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";

import PageWrapper from "../../../../wrapper/page.wrapper";
import StepInputPelatihan from "../../../../StepInputPelatihan";
import LoadingPage from "../../../../LoadingPage";
import ModalPreview from "../components/modal-preview-form.component";
import ModalProfile from "../components/modal-profile-peserta";
import { putTrainingStep2 } from "../../../../../redux/actions/pelatihan/training.actions";
import {
  storeRegistrationStep2,
  getRegistrationStep2,
} from "../../../../../redux/actions/pelatihan/function.actions";
import {
  element,
  options,
  size,
} from "../../../../../utils/middleware/helper/data";
import { helperUnformatCheckbox } from "../../../../../utils/middleware/helper";

import FormManual from "../components/step-registration/form-manual";
import FormCopy from "../components/step-registration/form-copy";

const EditRegistrationStep2 = ({ token, propsStep }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: getEditTraining2 } = useSelector(
    (state) => state.getEditTraining2
  );
  const { data: dataForm, error: errorDropdownForm } = useSelector(
    (state) => state.drowpdownFormBuilder
  );
  const { data: dataReferenceOption } = useSelector(
    (state) => state.allDataReference
  );

  const { trainingData } = useSelector((state) => state.trainingStep1);
  const { registrationData } = useSelector((state) => state.registrationStep2);
  const { commitmentData } = useSelector((state) => state.commitmentStep3);

  const [dataOptions, setDataOptions] = useState([]);

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();
  const [modalShow, setModalShow] = useState(false);

  // TITLE FORM
  const [titleManual, setTitleManual] = useState(Object.getOwnPropertyNames(registrationData).length > 0
  ? registrationData.judul_form : getEditTraining2.judul_form);
  const [titleCopy, setTitleCopy] = useState(Object.getOwnPropertyNames(registrationData).length > 0
  ? registrationData.judul_form : getEditTraining2.judul_form);
  // END TITLE FORM

  //  FORM BUILDER
  const [formBuilderManual, setFormBuilderManual] = useState(
    Object.getOwnPropertyNames(registrationData).length > 0
  ? registrationData.formBuilder : getEditTraining2.FormBuilder
  );
  const [formBuilderCopy, setFormBuilderCopy] = useState(
    Object.getOwnPropertyNames(registrationData).length > 0
  ? registrationData.formBuilder :getEditTraining2.FormBuilder
  );
  // END FORM BUILDER

  const [viewForm, setViewForm] = useState( Object.getOwnPropertyNames(registrationData).length > 0
  ? registrationData.type_form :getEditTraining2.type_form);

  useEffect(() => {
    const dataOptionsArr = [];
    if (dataReferenceOption) {
      dataReferenceOption.list_reference.map((row, i) => {
        let data = {
          id: row.id,
          value: row.name,
        };
        dataOptionsArr.push(data);
      });
    }
    setDataOptions(dataOptionsArr);
  }, []);

  const optionsForm = dataForm.data || [];

  const [formBuilder, setFormBuilder] = useState(
    Object.getOwnPropertyNames(registrationData).length > 0
    ? registrationData.formBuilder|| [
      {
        key: 1,
        name: "",
        element: "",
        size: "",
        option: "",
        dataOption: "",
        required: "0",
        triggered: "0",
        triggered_parent: [],
        value: "",
      },
    ] : getEditTraining2.FormBuilder || [
      {
        key: 1,
        name: "",
        element: "",
        size: "",
        option: "",
        dataOption: "",
        required: "0",
        triggered: "0",
        triggered_parent: [],
        value: "",
      },
    ]
  );

  const closePreviewHandler = () => {
    let list = [...formBuilder];
    list.forEach((row, i) => {
      if (row.option === "manual") {
        let dataOption = row.dataOption.join(";");
        row.dataOption = dataOption;
      }
    });
    setFormBuilder(list);
    setModalShow(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let formBuilderStore;
    if (viewForm === "0") {
      formBuilderStore = formBuilderManual;
    } else if (viewForm === "1") {
      formBuilderStore = formBuilderCopy;
    } else if (viewForm === "2") {
      formBuilderStore = formBuilderManual;
    } else {
      formBuilderStore;
    }

    let titleStore;
    if (viewForm === "0") {
      titleStore = titleManual;
    } else if (viewForm === "1") {
      titleStore = titleCopy;
    } else if (viewForm === "2") {
      titleStore = titleManual;
    } else {
      titleStore;
    }
    if (simpleValidator.current.allValid()) {
      const valueForm = helperUnformatCheckbox(formBuilderStore);
      const data = {
        judul_form: titleStore,
        Pelatian_id: parseInt(router.query.id),
        formBuilder: valueForm,
        type_form: viewForm,
      };
      dispatch(storeRegistrationStep2(data));
      propsStep(3);
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi data yang bener dong lu !",
      });
    }
  };

  const viewRegistrationHandler = () => {
    switch (viewForm) {
      case "0":
        return (
          <FormManual
            title={titleManual}
            formBuilder={formBuilderManual}
            funcTitle={(value) => setTitleManual(value)}
            funcFormBuilder={(value) => setFormBuilderManual(value)}
            funcModalShow={(value) => setModalShow(value)}
            element={element}
            size={size}
            options={options}
            dataOptions={dataOptions}
          />
        );
        break;
      case "1":
        return (
          <FormCopy
            optionsForm={optionsForm}
            title={titleCopy}
            funcTitle={(value) => setTitleCopy(value)}
            funcFormBuilder={(value) => setFormBuilderCopy(value)}
            funcModalShow={(value) => setModalShow(value)}
            token={token}
          />
        );
        break;
      case "2":
        return (
          <FormManual
            title={titleManual}
            formBuilder={formBuilderManual}
            funcTitle={(value) => setTitleManual(value)}
            funcFormBuilder={(value) => setFormBuilderManual(value)}
            funcModalShow={(value) => setModalShow(value)}
            element={element}
            size={size}
            options={options}
            dataOptions={dataOptions}
          />
        );
        break;
      default:
        return (
          <FormManual
            title={titleManual}
            formBuilder={formBuilderManual}
            funcTitle={(value) => setTitleManual(value)}
            funcFormBuilder={(value) => setFormBuilderManual(value)}
            funcModalShow={(value) => setModalShow(value)}
            element={element}
            size={size}
            options={options}
            dataOptions={dataOptions}
          />
        );
        break;
    }
  };

  return (
    <div className="col-lg-12 order-1 px-0">
      <div className="card card-custom card-stretch gutter-b">
        <div className="card-header border-0">
          <h1
            className="font-weight-bolder card-title"
            style={{ fontSize: "20px" }}
          >
            Form Pendaftaran
          </h1>
          <div className="card-toolbar justify-content-between d-flex">
            <button
              className="btn btn-warning px-6 font-weight-bolder"
              style={{ borderRadius: "30px" }}
              data-toggle="modal"
              data-target="#modalProfile"
              type="button"
            >
              Harap dibaca!
            </button>
          </div>
        </div>
        <div className="card-body py-4">
          <form onSubmit={submitHandler}>
            <div className="form-group mb-4">
              <label className="col-form-label font-weight-bold">
                Tambah Form
              </label>
              <div className="type-form">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="0-1"
                    value="0"
                    checked={
                      (viewForm === "0" && true) || (viewForm === "2" && true)
                    }
                    onChange={(e) => setViewForm(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="0-1">
                    Buat Manual || Copy & Edit
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="1-2"
                    value="1"
                    checked={viewForm === "1" && true}
                    onChange={(e) => setViewForm(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="1-2">
                    Copy Form
                  </label>
                </div>
              </div>
            </div>

            {viewRegistrationHandler()}

            <div className="form-group mt-9">
              <div className="text-right">
                <button
                  className="btn btn-light-ghost-rounded-full mr-2"
                  type="button"
                  onClick={() => propsStep(1)}
                >
                  Kembali
                </button>
                <button className="btn btn-primary-rounded-full" type="submit">
                  Simpan & Lanjut
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Modal
        show={modalShow}
        onHide={closePreviewHandler}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalPreview
          propsTitle={
            viewForm === "0"
              ? titleManual
              : viewForm === "1"
              ? titleCopy
              : viewForm === "2" && titleManual
          }
          propsForm={
            viewForm === "0"
              ? formBuilderManual
              : viewForm === "1"
              ? formBuilderCopy
              : viewForm === "2" && formBuilderManual
          }
          propsModalShow={modalShow}
          sendPropsFormBuilder={(form) => {
            viewForm === "0"
              ? setFormBuilderManual(form)
              : viewForm === "1"
              ? setFormBuilderCopy(form)
              : viewForm === "2" && setFormBuilderManual(form);
          }}
          sendPropsModalShow={(value) => setModalShow(value)}
        />
      </Modal>

      <div
        className="modal fade"
        id="modalProfile"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modalProfile"
        aria-hidden="true"
      >
        <ModalProfile />
      </div>
    </div>
  );
};

export default EditRegistrationStep2;
