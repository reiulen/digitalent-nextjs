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

  const [logoPreview, setLogoPreview] = useState("/assets/media/default.jpg");
  const [logoFile, setLogoFile] = useState("");
  const [logoName, setLogoName] = useState("");

  const [image, setImage] = useState([
    { key: 1, imagePreview: "", imageFile: "", imageName: "" },
  ]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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
      list[index].imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          list[index].imagePreview = reader.result;
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      list[index].imageName = e.target.files[0].name;

      setImage(list);
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
    const newKey = image[image.length - 1].key + 1;
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

  const onShowImage = (row, i) => {};

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(image);
    // if (simpleValidator.current.allValid()) {
    // } else {
    //   simpleValidator.current.showMessages();
    //   forceUpdate(1);
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "Isi data yang bener dong lu !",
    //   });
    // }
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
                <label
                  htmlFor="staticEmail"
                  className="col-form-label font-weight-bold"
                >
                  Upload Gambar
                </label>
                <div className="row align-items-center">
                  {image.map((row, i) => (
                    <div className="col-4 col-md-2 col-lg-2 p-0 ml-5">
                      <div
                        className="position-relative mx-auto mt-5"
                        style={{ maxWidth: "max-content" }}
                      >
                        <figure
                          className="avatar item-rtl position-relative"
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                        >
                          <Image
                            src={
                              row.imagePreview === ""
                                ? "/assets/media/default.jpg"
                                : row.imagePreview
                            }
                            alt="image"
                            width={160}
                            height={160}
                            objectFit="cover"
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
                <div className="mt-3 col-sm-12 text-muted">
                  <p>Format Image(.png) & Maksimal 5MB</p>
                </div>
              </div>

              <div className="form-group mb-4">
                <label className="col-form-label font-weight-bold">
                  Nama Akademi
                </label>
                <input
                  type="text"
                  placeholder="placeholder"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() =>
                    simpleValidator.current.showMessageFor("nama akademi")
                  }
                />
                {simpleValidator.current.message(
                  "nama akademi",
                  name,
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

              <div className="form-group">
                <div className="text-right">
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
