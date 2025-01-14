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
import { getAllDataReference } from "../../../../../redux/actions/site-management/data-reference.actions";
import { helperUnformatCheckbox } from "../../../../../utils/middleware/helper";

import PageWrapper from "../../../../wrapper/page.wrapper";
import StepInputPelatihan from "../../../../StepInputPelatihan";
import LoadingPage from "../../../../LoadingPage";
import ModalPreview from "../components/modal-preview-form.component";
import ModalProfile from "../components/modal-profile-peserta";

import FormManual from "../components/step-registration/form-manual";
import FormCopy from "../components/step-registration/form-copy";
import FormCopyEdit from "../components/step-registration/form-copy-edit";
import { getDetailMasterPelatihan } from "../../../../../redux/actions/pelatihan/master-pendaftaran.action";
import Cookies from "js-cookie";

import {
  element,
  size,
  options,
} from "../../../../../utils/middleware/helper/data";

const AddRegistrationStep2 = ({ propsStep, dataOptions, token }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const token_permission = Cookies.get("token_permission");

  const { registrationData } = useSelector((state) => state.registrationStep2);
  const { data: dataForm, error: errorDropdownForm } = useSelector(
    (state) => state.drowpdownFormBuilder
  );

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();
  const [modalShow, setModalShow] = useState(false);

  const optionsForm = dataForm.data || [];

  // TITLE FORM
  const [titleManual, setTitleManual] = useState(registrationData.judul_form);
  const [titleCopy, setTitleCopy] = useState(registrationData.judul_form);
  const [titleCopyEdit, setTitleCopyEdit] = useState(
    registrationData.judul_form
  );
  // END TITLE FORM

  //  FORM BUILDER
  const [formBuilderManual, setFormBuilderManual] = useState(
    registrationData.formBuilder
  );
  const [formBuilderCopy, setFormBuilderCopy] = useState(
    registrationData.formBuilder
  );
  const [formBuilderCopyEdit, setFormBuilderCopyEdit] = useState(
    registrationData.formBuilder
  );
  // END FORM BUILDER

  const [viewForm, setViewForm] = useState(registrationData.type_form);

  useEffect(() => {
    dispatch(getAllDataReference(token, true));
    if (registrationData.type_form === "0") {
      setTitleCopy("");
      setFormBuilderCopy([]);
      dispatch(getDetailMasterPelatihan(99999, token, token_permission));
      setTitleCopyEdit("");
      setFormBuilderCopyEdit([]);
    } else if (registrationData.type_form === "1") {
      setTitleManual("");
      setFormBuilderManual([
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
      ]);
      setTitleCopyEdit("");
      setFormBuilderCopyEdit([]);
    } else if (registrationData.type_form === "2") {
      setTitleManual("");
      setFormBuilderManual([
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
      ]);
      setTitleCopy("");
      setFormBuilderCopy([]);
    }
  }, [dispatch]);

  const closePreviewHandler = () => {
    let list;
    if (viewForm === "0") {
      list = [...formBuilderManual];
    } else if (viewForm === "1") {
      list = [...formBuilderCopy];
    } else if (viewForm === "2") {
      list = [...formBuilderCopyEdit];
    }

    list.forEach((row, i) => {
      if (row.option === "manual") {
        let dataOption = row.dataOption.join(";");
        row.dataOption = dataOption;
      }
    });

    if (viewForm === "0") {
      setFormBuilderManual(list);
    } else if (viewForm === "1") {
      setFormBuilderCopy(list);
    } else if (viewForm === "2") {
      setFormBuilderCopyEdit(list);
    }

    setModalShow(false);
  };

  const backHandler = () => {
    let formBuilderStore;
    if (viewForm === "0") {
      formBuilderStore = formBuilderManual;
    } else if (viewForm === "1") {
      formBuilderStore = formBuilderCopy;
    } else if (viewForm === "2") {
      formBuilderStore = formBuilderCopyEdit;
    } else {
      formBuilderStore;
    }

    let titleStore;
    if (viewForm === "0") {
      titleStore = titleManual;
    } else if (viewForm === "1") {
      titleStore = titleCopy;
    } else if (viewForm === "2") {
      titleStore = titleCopyEdit;
    } else {
      titleStore;
    }

    const data = {
      judul_form: titleStore,
      type_form: viewForm,
      formBuilder: formBuilderStore,
    };
    dispatch(storeRegistrationStep2(data));
    propsStep(1);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let formBuilderStore;
    if (viewForm === "0") {
      formBuilderStore = formBuilderManual;
    } else if (viewForm === "1") {
      formBuilderStore = formBuilderCopy;
    } else if (viewForm === "2") {
      formBuilderStore = formBuilderCopyEdit;
    } else {
      formBuilderStore;
    }

    let titleStore;
    if (viewForm === "0") {
      titleStore = titleManual;
    } else if (viewForm === "1") {
      titleStore = titleCopy;
    } else if (viewForm === "2") {
      titleStore = titleCopyEdit;
    } else {
      titleStore;
    }

    if (!titleStore) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi judul form dengan benar !",
      });
    } else {
      if (simpleValidator.current.allValid()) {
        const valueForm = helperUnformatCheckbox(formBuilderStore, "admin");
        const data = {
          judul_form: titleStore,
          type_form: viewForm,
          formBuilder: valueForm,
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
    }
  };

  const viewRegistrationHandler = () => {
    switch (viewForm) {
      case "0":
        return (
          <>
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
          </>
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
          <FormCopyEdit
            optionsForm={optionsForm}
            title={titleCopyEdit}
            formBuilder={formBuilderCopyEdit}
            funcTitle={(value) => setTitleCopyEdit(value)}
            funcFormBuilder={(value) => setFormBuilderCopyEdit(value)}
            element={element}
            size={size}
            options={options}
            dataOptions={dataOptions}
            token={token}
            funcModalShow={(value) => setModalShow(value)}
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
        <div className="card-body py-0">
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
                    checked={viewForm === "0" && true}
                    onChange={(e) => setViewForm(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="0-1">
                    Buat Manual
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
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="copy-edit-3"
                    value="2"
                    checked={viewForm === "2" && true}
                    onChange={(e) => setViewForm(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="copy-edit-3">
                    Copy & Edit Form
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
                  onClick={() => backHandler()}
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
          // onHide={closePreviewHandler}
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
                : viewForm === "2" && titleCopyEdit
            }
            propsForm={
              viewForm === "0"
                ? formBuilderManual
                : viewForm === "1"
                ? formBuilderCopy
                : viewForm === "2" && formBuilderCopyEdit
            }
            propsModalShow={modalShow}
            sendPropsFormBuilder={(form) => {
              viewForm === "0"
                ? setFormBuilderManual(form)
                : viewForm === "1"
                ? setFormBuilderCopy(form)
                : viewForm === "2" && setFormBuilderCopyEdit(form);
            }}
            sendPropsModalShow={(value) => setModalShow(value)}
            propsToken={token}
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
    </>
    //   </div>

    // </PageWrapper>
  );
};

export default AddRegistrationStep2;
