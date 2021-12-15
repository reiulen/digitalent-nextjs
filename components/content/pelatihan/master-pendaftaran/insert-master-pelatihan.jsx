import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import ModalPreview from "../training/components/modal-preview-form.component";
import { getRegistrationStep2 } from "../../../../redux/actions/pelatihan/function.actions";
import PageWrapper from "../../../wrapper/page.wrapper";
import axios from "axios";
import { SweatAlert } from "../../../../utils/middleware/helper";
import Cookies from "js-cookie";

const AddMasterPelatihan = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const token_permission = Cookies.get("token_permission");

  const { registrationData } = useSelector((state) => state.registrationStep2);
  const { data: dataReferenceOption } = useSelector(
    (state) => state.allDataReference
  );

  const [success, setSuccess] = useState(0);
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [dataOptions, setDataOptions] = useState([]);
  const [limitProfile, setLimitProfile] = useState(false);

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

  const [title, setTitle] = useState(registrationData.judul_form);
  const [formBuilder, setFormBuilder] = useState(registrationData.formBuilder);

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
  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  const inputChangeHandler = (e, index) => {
    const { value, name, checked } = e.target;
    const list = [...formBuilder];
    list[index][name] = value;
    if (name === "required") {
      let check = checked === true ? "1" : "0";
      list[index]["required"] = check;
    }
    setFormBuilder(list);
  };

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

  const removeFieldHandler = (index) => {
    const list = [...formBuilder];
    list.splice(index, 1);
    list.forEach((row, i) => {
      let key = i + 1;
      list[i]["key"] = key;
    });
    setFormBuilder(list);
  };

  const renderDataOptionHandler = (row, i) => {
    if (row.option === "select_reference") {
      return (
        <div className="col-sm-12 col-md-2">
          <div className="form-group mb-2">
            <label className="col-form-label font-weight-bold">
              Data Option
            </label>
            <select
              className="form-control"
              name="dataOption"
              value={row.dataOption}
              onChange={(e) => inputChangeHandler(e, i)}
              required
            >
              <option value="" disabled selected>
                -- PILIH --
              </option>
              {dataOptions.map((datOpt, i) => (
                <option key={i} value={datOpt.id}>
                  {datOpt.value}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    } else {
      return (
        <div className="col-sm-12 col-md-2">
          <div className="form-group mb-2">
            <label className="col-form-label font-weight-bold">
              Data Option
            </label>
            <input
              type="text"
              className="form-control"
              name="dataOption"
              value={row.dataOption}
              placeholder="data1;data2"
              autoComplete="off"
              onChange={(e) => inputChangeHandler(e, i)}
              required
            />
          </div>
        </div>
      );
    }
  };

  const renderMultipleHandler = (row, i) => {
    if (
      row.element === "select" ||
      row.element === "checkbox" ||
      row.element === "radio"
    ) {
      return (
        <>
          <div className="col-sm-12 col-md-2">
            <div className="form-group mb-2">
              <label className="col-form-label font-weight-bold">Option</label>
              <select
                className="form-control"
                name="option"
                value={row.option}
                onChange={(e) => inputChangeHandler(e, i)}
                required
              >
                <option value="" disabled selected>
                  -- PILIH --
                </option>
                {options.map((opt, i) => (
                  <option key={i} value={opt.value}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {renderDataOptionHandler(row, i)}
        </>
      );
    } else {
      return (
        <>
          <div className="col-sm-12 col-md-2">
            <div className="form-group mb-2">
              <label className="col-form-label font-weight-bold">Option</label>
              <select
                className="form-control"
                name="option"
                value={row.option}
                onChange={(e) => inputChangeHandler(e, i)}
                disabled
              >
                <option value="" disabled selected>
                  -- PILIH --
                </option>
                {options.map((opt, i) => (
                  <option key={i} value={opt.value}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-sm-12 col-md-2">
            <div className="form-group mb-2">
              <label className="col-form-label font-weight-bold">
                Data Option
              </label>
              <select
                className="form-control"
                name="dataOption"
                value={row.dataOption}
                onChange={(e) => inputChangeHandler(e, i)}
                disabled
              >
                <option value="" disabled selected>
                  -- PILIH --
                </option>
                {dataOptions.map((datOpt, i) => (
                  <option key={i} value={datOpt.value}>
                    {datOpt.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      );
    }
  };

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
    router.push("/pelatihan/master-pendaftaran");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      const data = {
        judul_form: title,
        formBuilder,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        Permission: token_permission,
      };
      try {
        const result = await axios.post(
          process.env.END_POINT_API_PELATIHAN + `api/v1/formBuilder/create`,
          data,
          config
        );
        if (result.status == 200) {
          setSuccess(1);
        }
        if (!result.status) {
          throw new Error(result.message);
        }
      } catch (error) {
        setSuccess(2);
      }
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
  useEffect(() => {
    if (success === 1) {
      SweatAlert("Berhasil", "Berhasil tambah form pendaftaran", "success");
      router.push("/pelatihan/master-pendaftaran");
    }
    if (success === 2) {
      SweatAlert("Gagal", "Panjang Karakter max 100", "error");
    }
  }, [success, router]);

  return (
    <PageWrapper>
      <>
        <div className="card card-custom mb-8">
          <div className="card-body">
            <h3 className="font-weight-bolder pb-5 pt-4">
              Data Profil Peserta
            </h3>
            <div className="list-profile">
              <div className="content-profile mb-5">
                <p className="mb-2 fz-16 text-dark fw-600">Data Diri</p>
                <p className="fz-16">
                  Foto Profil, Nama Lengkap, Email, NIK, Jenis Kelamin, Nomor
                  Handphone, Agama, Tempat dan Tanggal Lahir, Kontak Darurat
                  (Nama Lengkap, Nomor Handphone, Hubungan), File KTP
                </p>
              </div>
              {limitProfile ? (
                <>
                  <div className="content-profile mb-5">
                    <p className="mb-2 fz-16 text-dark fw-600">Alamat KTP</p>
                    <p className="fz-16">
                      Alamat Lengkap, Provinsi, Kota/Kabupaten, Kecamatan,
                      Desa/Kelurahan, Kode Pos
                    </p>
                  </div>
                  <div className="content-profile mb-5">
                    <p className="mb-2 fz-16 text-dark fw-600">
                      Alamat Domisili
                    </p>
                    <p className="fz-16">
                      Alamat Lengkap, Provinsi, Kota/Kabupaten, Kecamatan,
                      Desa/Kelurahan, Kode Pos
                    </p>
                  </div>
                  <div className="content-profile">
                    <p className="mb-2 fz-16 text-dark fw-600">
                      Pendidikan Terakhir
                    </p>
                    <p className="fz-16 mb-2">Jenjang Pendidikan :</p>
                    <ul className="fz-16">
                      <li>
                        TK, SD, SMP, SMA : Asal Sekolah, Tahun Masuk, File
                        Ijazah
                      </li>
                      <li>
                        D3, S1, S2, S3 : Asal Perguruan Tinggi, Program Studi,
                        IPK, Tahun Masuk, File Ijazah
                      </li>
                    </ul>
                  </div>
                  <div className="content-profile">
                    <p className="mb-2 fz-16 text-dark fw-600">Pekerjaan</p>
                    <p className="fz-16 mb-2">Status Pekerjaan :</p>
                    <ul className="fz-16">
                      <li>
                        Bekerja : Pekerjaan, Perusahaan/Institut Tempat Bekerja,
                        Penghasilan Tidak Bekerja
                      </li>
                      <li>
                        Pelajar/Mahasiswa: Sekolah/Perguruan Tinggi, Tahun Masuk
                      </li>
                    </ul>
                  </div>
                  <p
                    className="text-primary fz-16"
                    style={{ cursor: "pointer" }}
                    onClick={() => setLimitProfile(false)}
                  >
                    Lihat Sedikit
                  </p>
                </>
              ) : (
                <p
                  className="text-primary fz-16"
                  style={{ cursor: "pointer" }}
                  onClick={() => setLimitProfile(true)}
                >
                  Lihat Semua
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="card card-custom gutter-b">
          <div className="card-body py-4">
            <form onSubmit={submitHandler}>
              <h3 className="font-weight-bolder pb-5 pt-4">Form Pendaftaran</h3>
              <div className="form-group mb-4">
                <label className="col-form-label font-weight-bold">
                  Judul Form
                </label>
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
                  maxLength={100}
                />
                {simpleValidator.current.message(
                  "judul form",
                  title,
                  "required|max:100",
                  { className: "text-danger" }
                )}
              </div>

              {formBuilder.map((row, i) => (
                <div className="builder row" key={i}>
                  <div className="col-sm-12 col-md-2">
                    <div className="form-group mb-2">
                      <label className="col-form-label font-weight-bold">
                        Nama Field
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={row.name}
                        placeholder="Field"
                        autoComplete="off"
                        onChange={(e) => inputChangeHandler(e, i)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-2">
                    <div className="form-group mb-2">
                      <label className="col-form-label font-weight-bold">
                        Pilih Element
                      </label>
                      <select
                        className="form-control"
                        name="element"
                        value={row.element}
                        onChange={(e) => inputChangeHandler(e, i)}
                        required
                      >
                        <option value="" disabled selected>
                          -- PILIH --
                        </option>
                        {element.map((el, i) => (
                          <option key={i} value={el.value}>
                            {el.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-2">
                    <div className="form-group mb-2">
                      <label className="col-form-label font-weight-bold">
                        Size
                      </label>
                      <select
                        className="form-control"
                        name="size"
                        value={row.size}
                        onChange={(e) => inputChangeHandler(e, i)}
                        required
                      >
                        <option value="" disabled selected>
                          -- PILIH --
                        </option>
                        {size.map((siz, i) => (
                          <option key={i} value={siz.value}>
                            {siz.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {renderMultipleHandler(row, i)}
                  <div className="col-sm-6 col-md-2">
                    <label className="col-form-label font-weight-bold ml-md-10">
                      Required
                    </label>
                    <div className="d-flex align-items-end justify-content-between">
                      <div className="form-group ml-md-10">
                        <div className="form-check form-check-inline">
                          <input
                            type="checkbox"
                            name="required"
                            checked={row.required === "1" ? true : false}
                            className="form-check-input"
                            onChange={(e) => inputChangeHandler(e, i)}
                          />
                        </div>
                      </div>
                      {formBuilder.length !== 1 && row.key !== 1 ? (
                        <button
                          className="btn btn-link-action bg-danger text-white mb-3 "
                          type="button"
                          onClick={() => removeFieldHandler(i)}
                        >
                          <i className="ri-delete-bin-fill p-0 text-white"></i>
                        </button>
                      ) : (
                        <button
                          className="btn btn-link-action bg-danger text-white mb-3  invisible"
                          type="button"
                          onClick={() => removeFieldHandler(i)}
                        >
                          <i className="ri-delete-bin-fill p-0 text-white"></i>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

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
                  <button
                    className="btn btn-primary-rounded-full"
                    type="button"
                    onClick={addFieldHandler}
                  >
                    <i className="ri-pencil-fill"></i> Tambah Field
                  </button>
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
                  <button
                    className="btn btn-primary-rounded-full"
                    type="submit"
                  >
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
              propsToken={token}
            />
          </Modal>
        </div>
      </>
    </PageWrapper>
  );
};

export default AddMasterPelatihan;
