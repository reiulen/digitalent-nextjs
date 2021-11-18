import React, { useEffect, useState, useRef } from "react";

import { useRouter } from "next/router";

import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import Select from "react-select";

import {
  storeRegistrationStep2,
  getRegistrationStep2,
} from "../../../../../redux/actions/pelatihan/function.actions";

import PageWrapper from "../../../../wrapper/page.wrapper";
import StepInputPelatihan from "../../../../StepInputPelatihan";
import LoadingPage from "../../../../LoadingPage";
import ModalPreview from "../components/modal-preview-form.component";

import FormManual from "./step-registration/form-manual";
import FormCopy from "./step-registration/form-copy";
import FormCopyEdit from "./step-registration/form-copy-edit";

const AddRegistrationStep2 = ({ propsStep }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { registrationData } = useSelector((state) => state.registrationStep2);

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();
  const [modalShow, setModalShow] = useState(false);

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
      name: "File Document",
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

  const optionsForm = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [title, setTitle] = useState(registrationData.judul_form);
  const [formBuilder, setFormBuilder] = useState(registrationData.formBuilder);
  const [viewForm, setViewForm] = useState("buat-manual");

  useEffect(() => {
    dispatch(getRegistrationStep2());
  }, [dispatch]);

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  // const inputChangeHandler = (e, index) => {
  //   const { value, name, checked } = e.target;
  //   const list = [...formBuilder];
  //   list[index][name] = value;
  //   if (name === "required") {
  //     let check = checked === true ? "1" : "0";
  //     list[index]["required"] = check;
  //   }
  //   setFormBuilder(list);
  // };

  const addFieldHandler = () => {
    const newKey = formBuilder[formBuilder.length - 1].key + 1;
    setFormBuilder([
      ...formBuilder,
      {
        key: newKey,
        name: "",
        element: "",
        size: "",
        option: "",
        dataOption: "",
        required: "0",
      },
    ]);
  };

  // const removeFieldHandler = (index) => {
  //   const list = [...formBuilder];
  //   list.splice(index, 1);
  //   list.forEach((row, i) => {
  //     let key = i + 1;
  //     list[i]["key"] = key;
  //   });
  //   setFormBuilder(list);
  // };

  const showPreviewHandler = () => {
    let list = [...formBuilder];
    list.forEach((row, i) => {
      if (row.option === "manual") {
        let dataOption = row.dataOption.split(";");
        row.dataOption = dataOption;
      }
    });
    setFormBuilder(list);
    setModalShow(true);
  };

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

  const backHandler = () => {
    const data = {
      judul_form: title,
      formBuilder,
    };
    dispatch(storeRegistrationStep2(data));
    propsStep(1);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      const data = {
        judul_form: title,
        formBuilder,
      };
      dispatch(storeRegistrationStep2(data));
      propsStep(3);
    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi data dengan benar !",
      });
    }
  };

  const viewRegistrationHandler = () => {
    switch (viewForm) {
      case "buat-manual":
        return (
          <FormManual
            formBuilder={formBuilder}
            funcFormBuilder={(value) => setFormBuilder(value)}
            element={element}
            size={size}
            options={options}
            dataOptions={dataOptions}
          />
        );
        break;
      case "copy-form":
        return <FormCopy />;
        break;
      case "copy-edit":
        return (
          <FormCopyEdit
            formBuilder={formBuilder}
            funcFormBuilder={(value) => setFormBuilder(value)}
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
            formBuilder={formBuilder}
            funcFormBuilder={(value) => setFormBuilder(value)}
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
    // <PageWrapper>
    //   <StepInputPelatihan
    //     step={2}
    //     title1="Tambah Pelatihan"
    //     title2="Tambah Form Pendaftaran"
    //     title3="Tambah Form Komitmen"
    //   />
    //   <div className="col-lg-12 order-1 px-0">
    <>
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
                    id="buat-manual-1"
                    value="buat-manual"
                    checked={viewForm === "buat-manual" && true}
                    onChange={(e) => setViewForm(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="buat-manual-1">
                    Buat Manual
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="copy-form-2"
                    value="copy-form"
                    checked={viewForm === "copy-form" && true}
                    onChange={(e) => setViewForm(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="copy-form-2">
                    Copy Form
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="copy-edit-3"
                    value="copy-edit"
                    checked={viewForm === "copy-edit" && true}
                    onChange={(e) => setViewForm(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="copy-edit-3">
                    Copy & Edit Form
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group mb-4">
              <label className="col-form-label font-weight-bold">
                Judul Form
              </label>
              {viewForm === "buat-manual" ? (
                <input
                  type="text"
                  placeholder="Silahkan Masukan Judul Form"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("judul form")
                  }
                  autoComplete="off"
                />
              ) : (
                <>
                  <Select
                    options={optionsForm}
                    placeholder="Silahkan Masukkan Nama Form Pendaftaran"
                    onChange={(e) => setTitle(e.label)}
                  />
                  {viewForm === "copy-form" && (
                    <small className="form-text text-danger">
                      *Form pendaftaran akan terhubung dengan master form
                      pendaftaran. Apabila master form pendaftaran diubah maka
                      form pendaftaran pelatihan ini akan ikut berubah.
                    </small>
                  )}
                </>
              )}
              {simpleValidator.current.message(
                "judul form",
                title,
                "required",
                { className: "text-danger" }
              )}
            </div>

            {viewRegistrationHandler()}

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
                {viewForm !== "copy-form" && (
                  <button
                    className="btn btn-primary-rounded-full"
                    type="button"
                    onClick={addFieldHandler}
                  >
                    <i className="ri-pencil-fill"></i> Tambah Field
                  </button>
                )}
              </div>
            </div>
            <div className="form-group mt-9">
              <div className="text-right">
                <button
                  className="btn btn-light-ghost-rounded-full mr-2"
                  type="button"
                  onClick={backHandler}
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
        <Modal
          show={modalShow}
          onHide={closePreviewHandler}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <ModalPreview
            propsTitle={title}
            propsForm={formBuilder}
            propsModalShow={modalShow}
            sendPropsFormBuilder={(form) => setFormBuilder(form)}
            sendPropsModalShow={(value) => setModalShow(value)}
          />
        </Modal>
      </div>
    </>
    //   </div>

    // </PageWrapper>
  );
};

export default AddRegistrationStep2;
