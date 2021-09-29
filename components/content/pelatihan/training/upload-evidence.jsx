import React, { useEffect, useState, useRef } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch, useSelector } from "react-redux";

import PageWrapper from "../../../wrapper/page.wrapper";
import LoadingPage from "../../../LoadingPage";

const UploadEvidence = () => {
  const editorRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();

  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor, Base64UploadAdapter } =
    editorRef.current || {};

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const [numberDocument, setNumberDocument] = useState("");
  const [dateReport, setDateReport] = useState("");
  const [responsible, setResponsible] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([
    { key: 1, imagePreview: "", imageFile: "", imageName: "" },
  ]);
  const [linkVideo, setLinkVideo] = useState("");
  const [teacher, setTeacher] = useState([
    { key: 1, name: "", agency: "" },
    { key: 2, name: "", agency: "" },
  ]);

  const [name, setName] = useState("");

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
      // Base64UploadAdapter: require('@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter')
    };

    setEditorLoaded(true);
  }, []);

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  const onDeleteImage = (index) => {
    const list = [...image];
    list.splice(index, 1);
    setImage(list);
  };

  const onChangeImage = (e, index) => {
    const type = ["image/jpg", "image/png", "image/jpeg"];
    let list = [...image];
    if (type.includes(e.target.files[0].type)) {
      if (e.target.files[0].size > 5000000) {
        e.target.value = null;
        Swal.fire("Oops !", "Gambar maksimal 5 MB.", "error");
      } else {
        list[index].imageFile = e.target.files[0];
        list[index].imagePreview = URL.createObjectURL(e.target.files[0]);
        list[index].imageName = e.target.files[0].name;
        console.log(list)
        setImage(list);
      }
      // const reader = new FileReader();
      // reader.onload = () => {
      //   if (reader.readyState === 2) {
      //   }
      // };
      // reader.readAsDataURL(e.target.files[0]);
    } else {
      e.target.value = null;
      Swal.fire(
        "Oops !",
        "Data yang bisa dimasukkan hanya berupa data gambar.",
        "error"
      );
    }
  };

  const onAddImage = () => {
    let newKey = 1;
    if (image.length > 0) {
      newKey = image[image.length - 1].key + 1;
    }
    setImage([
      ...image,
      {
        key: newKey,
        imagePreview: "",
        imageFile: "",
        imageName: "",
      },
    ]);
  };

  const onInputTeacher = (e, index) => {
    const { name, value } = e.target;
    let list = [...teacher];
    list[index][name] = value;
    setTeacher(list);
  };

  const onAddTeacher = () => {
    let newKey = 1;
    if (teacher.length > 0) {
      newKey = teacher[teacher.length - 1].key + 1;
    }
    setTeacher([...teacher, { key: newKey, name: "", agency: "" }]);
  };

  const onRemoveTeacher = (index) => {
    const list = [...teacher];
    list.splice(index, 1);
    setTeacher(list);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      const data = {
        numberDocument,
        dateReport,
        responsible,
        description,
        image,
        linkVideo,
        teacher,
      };
      console.log(data);
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

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header mt-3">
            <h2
              className="card-title text-dark mt-2"
              style={{ fontSize: "24px" }}
            >
              Upload Evidence
            </h2>
          </div>

          <div className="card-body py-4">
            <form onSubmit={submitHandler}>
              <div className="form-group mb-4">
                <label className="col-form-label font-weight-bold">
                  Nomor Dokumen
                </label>
                <input
                  type="number"
                  placeholder="Masukan Nomor Dokumen"
                  className="form-control"
                  value={numberDocument}
                  onChange={(e) => setNumberDocument(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("nomor dokumen")
                  }
                />
                {simpleValidator.current.message(
                  "nomor dokumen",
                  numberDocument,
                  "required|integer",
                  { className: "text-danger" }
                )}
              </div>

              <div className="form-group mb-4">
                <label className="col-form-label font-weight-bold">
                  Tanggal Laporan
                </label>
                <input
                  type="date"
                  placeholder="Silahkan Pilih Tanggal Laporan"
                  className="form-control"
                  value={dateReport}
                  onChange={(e) => setDateReport(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("tanggal laporan")
                  }
                />
                {simpleValidator.current.message(
                  "tanggal laporan",
                  dateReport,
                  "required",
                  { className: "text-danger" }
                )}
              </div>

              <div className="form-group mb-4">
                <label className="col-form-label font-weight-bold">
                  Nama Penanggung Jawab
                </label>
                <input
                  type="text"
                  placeholder="Masukan Nama Penanggung Jawab"
                  className="form-control"
                  value={responsible}
                  onChange={(e) => setResponsible(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor(
                      "nama penanggung jawab"
                    )
                  }
                />
                {simpleValidator.current.message(
                  "nama penanggung jawab",
                  responsible,
                  "required",
                  { className: "text-danger" }
                )}
              </div>

              <div className="form-group mb-4">
                <label className="col-form-label font-weight-bold">
                  Deskripsi
                </label>
                <div className="ckeditor">
                  {editorLoaded ? (
                    <CKEditor
                      editor={ClassicEditor}
                      data={description}
                      onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setDescription(data);
                        // console.log({ event, editor, data });
                      }}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("deskripsi")
                      }
                      config={{
                        placeholder: "Silahkan Masukan Deskripsi Detail",
                      }}
                    />
                  ) : (
                    <p>Tunggu Sebentar</p>
                  )}
                  {simpleValidator.current.message(
                    "deskripsi",
                    description,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group mb-4">
                <label
                  htmlFor="staticEmail"
                  className="col-form-label font-weight-bold"
                >
                  Upload Gambar
                </label>
                <div className="row align-items-center">
                  {image.map((row, i) => (
                    <div className="col-12 col-sm-6 col-md-3" key={i}>
                      <div
                        className="position-relative mt-5"
                        style={{ maxWidth: "max-content" }}
                      >
                        <figure
                          className="avatar item-rtl position-relative"
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                        >
                          <img
                            src={
                              row.imagePreview === ""
                                ? "/assets/media/default.jpg"
                                : row.imagePreview
                            }
                            alt="image"
                            style={{
                              objectFit: "cover",
                              width: "250px",
                              height: "160px",
                            }}
                            className="img-fluid"
                          />
                          <div
                            className="circle-top"
                            onClick={() => onDeleteImage(i)}
                          >
                            <i className="ri-delete-bin-fill text-dark"></i>
                          </div>
                        </figure>
                        <div className="position-relative">
                          <label
                            className="circle-bottom"
                            htmlFor={`inputGroupFile${i}`}
                          >
                            <i className="ri-pencil-fill text-dark"></i>
                          </label>
                          <input
                            type="file"
                            name="gambar"
                            className="custom-file-input"
                            id={`inputGroupFile${i}`}
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => onChangeImage(e, i)}
                          />
                        </div>
                        {row.imageFile !== "" ? (
                          <label>{row.imageName}</label>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    className="btn btn-rounded-full bg-blue-secondary text-white ml-5 mt-5"
                    onClick={onAddImage}
                    type="button"
                  >
                    <i className="ri-add-fill text-white"></i> Tambah Gambar
                  </button>
                </div>
                <div className="mt-3 col-sm-12 text-muted pl-0">
                  <p>Format Image(.png) & Maksimal 5MB</p>
                </div>
              </div>

              <div className="form-group mb-4">
                <label className="col-form-label font-weight-bold">
                  Link Video
                </label>
                <input
                  type="text"
                  placeholder="Link Video"
                  className="form-control"
                  value={linkVideo}
                  onChange={(e) => setLinkVideo(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("link video")
                  }
                />
                {simpleValidator.current.message(
                  "link video",
                  linkVideo,
                  "required",
                  { className: "text-danger" }
                )}
              </div>

              <h3 className="font-weight-bolder pb-2 pt-4">Pengajar</h3>

              <div className="row">
                {teacher.map((row, i) => (
                  <>
                    <div
                      className="form-group col-md-5 col-sm-12 mb-0 pb-0"
                      key={i + 1}
                    >
                      <label className="col-form-label font-weight-bold">
                        Nama Pengajar
                      </label>
                      <input
                        type="text"
                        placeholder="Masukan Nama Pengajar"
                        className="form-control"
                        autoComplete="off"
                        name="name"
                        value={row.name}
                        onChange={(e) => onInputTeacher(e, i)}
                        onBlur={() =>
                          simpleValidator.current.showMessageFor(
                            `nama pengajar ${i + 1}`
                          )
                        }
                      />
                      {simpleValidator.current.message(
                        `nama pengajar ${i + 1}`,
                        row.name,
                        "required",
                        { className: "text-danger" }
                      )}
                    </div>
                    <div className="form-group col-md-5 col-sm-10 mb-0 pb-0">
                      <label className="col-form-label font-weight-bold">
                        Instansi Pengajar
                      </label>
                      <input
                        type="text"
                        placeholder="Masukan Instansi Pengajar"
                        className="form-control"
                        autoComplete="off"
                        name="agency"
                        value={row.agency}
                        onChange={(e) => onInputTeacher(e, i)}
                        onBlur={() =>
                          simpleValidator.current.showMessageFor(
                            `instansi pengajar ${i + 1}`
                          )
                        }
                      />
                      {simpleValidator.current.message(
                        `instansi pengajar ${i + 1}`,
                        row.agency,
                        "required",
                        { className: "text-danger" }
                      )}
                    </div>
                    <div className="col-md-2 d-flex align-items-end">
                      {i !== 0 ? (
                        <button
                          className="btn btn-link-action bg-danger text-white mt-2"
                          type="button"
                          onClick={() => onRemoveTeacher(i)}
                        >
                          <i className="ri-delete-bin-fill p-0 text-white"></i>
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </>
                ))}
              </div>

              <div className="row">
                <div className="ml-auto mb-5 mt-4">
                  <button
                    className="btn btn-rounded-full bg-blue-secondary text-white"
                    type="button"
                    onClick={onAddTeacher}
                  >
                    <i className="ri-add-fill text-white"></i> Tambah Field
                  </button>
                </div>
              </div>

              <div className="form-group my-5 pb-5">
                <div className="float-right mb-5">
                  <button
                    className="btn btn-light-ghost-rounded-full mr-2"
                    type="button"
                    onClick={() => router.back()}
                  >
                    Batal
                  </button>
                  <button
                    className="btn btn-primary-rounded-full"
                    type="submit"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default UploadEvidence;
