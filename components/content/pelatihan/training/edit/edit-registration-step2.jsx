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
import { putTrainingStep2 } from "../../../../../redux/actions/pelatihan/training.actions";

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

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();
  const [modalShow, setModalShow] = useState(false);

  // TITLE FORM
  const [titleManual, setTitleManual] = useState(getEditTraining2.judul_form);
  const [titleCopy, setTitleCopy] = useState(getEditTraining2.judul_form);
  // END TITLE FORM

  //  FORM BUILDER
  const [formBuilderManual, setFormBuilderManual] = useState(
    getEditTraining2.FormBuilder
  );
  const [formBuilderCopy, setFormBuilderCopy] = useState(
    getEditTraining2.FormBuilder
  );
  // END FORM BUILDER

  const [viewForm, setViewForm] = useState(getEditTraining2.type_form);

  const [element] = useState([
    {
      value: "select",
      name: "Select",
    },
    {
      value: "text",
      name: "Text",
    },
    {
      value: "checkbox",
      name: "Checkbox",
    },
    {
      value: "textarea",
      name: "Text Area",
    },
    {
      value: "radio",
      name: "Radio",
    },
    {
      value: "file_image",
      name: "File Image",
    },
    {
      value: "file_doc",
      name: "File Documet",
    },
    {
      value: "date",
      name: "Input Date",
    },
  ]);

  const [size] = useState([
    { value: "col-md-6", name: "Half" },
    { value: "col-md-12", name: "Full" },
  ]);

  const [options] = useState([
    {
      name: "Manual",
      value: "manual",
    },
    {
      name: "Select Reference",
      value: "select_reference",
    },
  ]);

  const [dataOptions] = useState([
    {
      value: "status_menikah",
    },
    {
      value: "pendidikan",
    },
    {
      value: "status_pekerjaan",
    },
    {
      value: "hubungan",
    },
    {
      value: "bidang_pekerjaan",
    },
    {
      value: "level_pelatihan",
    },
    {
      value: "agama",
    },
    {
      value: "penyelengaara",
    },
    {
      value: "provinsi",
    },
    {
      value: "kota/kabupaten",
    },
    {
      value: "universitas",
    },
  ]);

  const optionsForm = dataForm.data || [];

  const [formBuilder, setFormBuilder] = useState(
    getEditTraining2.FormBuilder || [
      {
        key: 1,
        name: "",
        element: "",
        size: "",
        option: "",
        dataOption: "",
        required: false,
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
    const data = {
      judul_form: titleStore,
      Pelatian_id: parseInt(router.query.id),
      formBuilder: formBuilderStore,
      type_form: viewForm,
    };
    if (simpleValidator.current.allValid()) {
      dispatch(putTrainingStep2(token, data));
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
        <div className="card-body py-4">
          <form onSubmit={submitHandler}>
            <h3 className="font-weight-bolder pb-5 pt-4">Form Pendaftaran</h3>

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
                  onClick={() => router.back()}
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
    </div>
  );
};

export default EditRegistrationStep2;
