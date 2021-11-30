import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import LoadingTable from "../../../../LoadingTable";
import IconEye from "../../../../assets/icon/Eye";
import IconPencil from "../../../../assets/icon/Pencil";
import IconDelete from "../../../../assets/icon/Delete";
import IconAdd from "../../../../assets/icon/Add";
import IconSearch from "../../../../assets/icon/Search";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../../../../styles/previewGaleri.module.css";
import SimpleReactValidator from "simple-react-validator";

import Swal from "sweetalert2";
import Image from "next/image";
import { postPage, updatePage } from "../../../../../redux/actions/site-management/settings/page.actions";

const UbahPage = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor, Base64UploadAdapter } =
    editorRef.current || {};
  const {
    loading: allLoading,
    error,
    pages,
  } = useSelector((state) => state.detailPage);

  const { isUpdateSuccess, errorUpdate } = useSelector((state) => state.updatePage);

  const [isi_artikel, setIsiArtikel] = useState(pages.property_template.content);
  const [pageName, setPageName] = useState(pages.name);
  const [pageStatus, setPageStatus] = useState(pages.status);
  const [titlePage, setTitlePage] = useState(pages.property_template.title);
  const [template, setTemplate] = useState(pages.template_type.toString());
  const [gambar, setGambar] = useState(""
  );
  const [gambarPreview, setGambarPreview] = useState(
    process.env.END_POINT_API_IMAGE_SITE_MANAGEMENT +
      "site-management/images/" +
      pages.property_template.image
  );
  const [gambarName, setGambarName] = useState(null);
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const notify = (value) =>
    toast.info(`${value}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const onChangeGambar = (e) => {
    const type = ["image/jpg", "image/png", "image/jpeg"];

    if (type.includes(e.target.files[0].type)) {
      if (e.target.files[0].size > "5000000") {
        e.target.value = null;
        Swal.fire("Oops !", "Data Image Melebihi Ketentuan", "error");
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setGambar(reader.result);
            setGambarPreview(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
        setGambarName(e.target.files[0].name);
      }
    } else {
      e.target.value = null;
      Swal.fire("Oops !", "Thumbnail harus berupa data gambar.", "error");
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      Swal.fire({
        title: "Apakah anda yakin simpan ?",
        // text: "Data ini tidak bisa dikembalikan !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Batal",
        confirmButtonText: "Ya !",
        dismissOnDestroy: false,
      }).then((result) => {
        if (result.value) {
          let sendData = {};
          if (template === "1") {
            sendData = {
              name: pageName,
              template_type: template,
              status: pageStatus,
              "_method": "PUT",
              property_template: {
                title: titlePage,
                content: isi_artikel,
              },
            };
          } else {
            sendData = {
              name: pageName,
              template_type: template,
              "_method": "PUT",
              status: pageStatus,
              property_template: {
                title: titlePage,
                content: isi_artikel,
                image: gambar,
              },
            };
          }
          dispatch(updatePage(sendData, pages.id, token ));
        }
      });
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
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };

    if (isUpdateSuccess) {
      Swal.fire("Berhasil Update data", "", "success").then(() => {
        router.push({
          pathname: `/site-management/setting/page`,
          query: { success: true },
        });
      });
    }
    if (errorUpdate) {
      Swal.fire(errorUpdate, "", "error").then(() => {});
    }

    setEditorLoaded(true);
  }, [errorUpdate, isUpdateSuccess, router]);
  return (
    <PageWrapper>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <form onSubmit={submit}>
        <div className="row">
          <div
            className="col-12 col-xl-4 order-1"
            style={{
              height: "max-content",
            }}
          >
            <div className="card card-custom card-stretch gutter-b">
              <div className="card-header border-0">
                <h3 className="card-title font-weight-bolder text-dark border-0 w-100 pb-5 my-0 pt-5 my-sm-5 titles-1">
                  Page Attributes
                </h3>
                <div className="w-100">
                  <div className="form-group">
                    <label style={{ fontSize: "16px" }}>Page Name</label>
                    <input
                      value={pageName}
                      onChange={(e) => setPageName(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Masukkan Page Name"
                      onBlur={(e) => {
                        simpleValidator.current.showMessageFor("pageName");
                      }}
                    />
                    {simpleValidator.current.message(
                      "pageName",
                      pageName,
                      "required",
                      {
                        className: "text-danger",
                      }
                    )}
                    {/* <span className="form-text text-muted">
                      Please enter your full name
                    </span> */}
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleSelect1">Page Status</label>
                    <select
                      className="form-control"
                      id="exampleSelect1"
                      onChange={(e) => setPageStatus(e.target.value)}
                      value={pageStatus}
                      onBlur={(e) => {
                        simpleValidator.current.showMessageFor("pageStatus");
                      }}
                    >
                      <option value="" disabled selected>
                        Pilih Status
                      </option>
                      <option value="1">Listed</option>
                      <option value="0">Unlisted</option>
                    </select>
                    {simpleValidator.current.message(
                      "pageStatus",
                      pageStatus,
                      "required",
                      {
                        className: "text-danger",
                      }
                    )}
                    {/* <span className="form-text text-muted">
                      Please enter your full name
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {template === "0" && (
            <div className="col-12 col-xl-8 order-1">
              <div className="card card-custom card-stretch gutter-b">
                <div className="card-header border-0 mt-6">
                  <h3 className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 my-0 my-sm-5 titles-1">
                    Page Content
                  </h3>
                </div>
                <div className="card-body pt-0">
                  <div>
                    <h3
                      className="font-weight-bolder text-dark border-0 w-100"
                      style={{ fontSize: "16px" }}
                    >
                      Title Page
                    </h3>
                    <div
                      className="mb-10"
                      style={{
                        width: "100%",
                      }}
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Tulis judul halaman"
                        value={titlePage}
                        onChange={(e) => {
                          setTitlePage(
                            e.target.value.replace(/[^a-zA-Z0-9 ]/g, "")
                          );
                        }}
                        onBlur={(e) => {
                          simpleValidator.current.showMessageFor("titlePage");
                        }}
                      />
                      {simpleValidator.current.message(
                        "titlePage",
                        titlePage,
                        template === "0" ? "required" : "",
                        {
                          className: "text-danger",
                        }
                      )}
                    </div>
                  </div>
                  <div className={`${styles.selectKategori} form-group`}>
                    <label
                      htmlFor="staticEmail"
                      className="col-sm-4 col-form-label font-weight-bolder"
                    >
                      Image
                    </label>
                    <div className="row ml-4">
                      <figure
                        className="avatar item-rtl position-relative"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                      >
                        <Image
                          src={gambarPreview}
                          alt="image"
                          width={160}
                          height={160}
                          objectFit="fill"
                          onBlur={(e) => {
                            simpleValidator.current.showMessageFor("gambarPreview");
                          }}
                        />
                        {simpleValidator.current.message(
                          "gambarPreview",
                          gambarPreview,
                          template === "0" ? "required" : "",
                          {
                            className: "text-danger",
                          }
                        )}
                      </figure>
                      <div className="position-relative">
                        <label
                          className="circle-top"
                          htmlFor="inputGroupFile04"
                        >
                          <i className="ri-add-line text-dark"></i>
                        </label>
                        <input
                          type="file"
                          name="gambar"
                          className="custom-file-input"
                          id="inputGroupFile04"
                          onChange={onChangeGambar}
                          accept="image/*"
                          onBlur={() =>
                            simpleValidator.current.showMessageFor("gambar")
                          }
                          style={{ display: "none" }}
                        />
                      </div>
                    </div>

                    <div className="ml-4"></div>
                  </div>
                  <div>
                    <h3
                      className="font-weight-bolder text-dark border-0 w-100"
                      style={{ fontSize: "16px" }}
                    >
                      Content Page
                    </h3>
                    <div
                      className="mb-10"
                      style={{
                        width: "100%",
                      }}
                    >
                      <div className="ckeditor">
                        {editorLoaded ? (
                          <CKEditor
                            editor={ClassicEditor}
                            data={isi_artikel}
                            onReady={(editor) => {
                              // You can store the "editor" and use when it is needed.
                            }}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setIsiArtikel(data);
                            }}
                            config={{
                              placeholder: "Tulis Deskripsi",
                            }}
                            onBlur={(e) => {
                              simpleValidator.current.showMessageFor(
                                "isi_artikel"
                              );
                            }}
                          />
                        ) : (
                          <p>Tunggu Sebentar</p>
                        )}
                        {simpleValidator.current.message(
                          "isi_artikel",
                          isi_artikel,
                          template === "0" ? "required" : "",
                          {
                            className: "text-danger",
                          }
                        )}
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-12 d-flex justify-content-end">
                        <Link href="/site-management/setting/page" passHref>
                          <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                            Kembali
                          </a>
                        </Link>
                        <button
                          type="submit"
                          className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                        >
                          Simpan
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {template === "1" && (
            <div className="col-12 col-xl-8 order-1">
              <div className="card card-custom card-stretch gutter-b">
                <div className="card-header border-0 mt-6">
                  <h3 className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 my-0 my-sm-5 titles-1">
                    Page Content
                  </h3>
                </div>
                <div className="card-body pt-0">
                  <div>
                    <h3
                      className="font-weight-bolder text-dark border-0 w-100"
                      style={{ fontSize: "16px" }}
                    >
                      Title Page
                    </h3>
                    <div
                      className="mb-10"
                      style={{
                        width: "100%",
                      }}
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Tulis judul halaman"
                        value={titlePage}
                        onChange={(e) => {
                          setTitlePage(
                            e.target.value.replace(/[^a-zA-Z0-9 ]/g, "")
                          );
                        }}
                        onBlur={(e) => {
                          simpleValidator.current.showMessageFor("titlePage");
                        }}
                      />
                      {simpleValidator.current.message(
                        "titlePage",
                        titlePage,
                        template === "1" ? "required" : "",
                        {
                          className: "text-danger",
                        }
                      )}
                    </div>
                  </div>
                  <div>
                    <h3
                      className="font-weight-bolder text-dark border-0 w-100"
                      style={{ fontSize: "16px" }}
                    >
                      Content Page
                    </h3>
                    <div
                      className="mb-10"
                      style={{
                        width: "100%",
                      }}
                    >
                      <div className="ckeditor">
                        {editorLoaded ? (
                          <CKEditor
                            editor={ClassicEditor}
                            data={isi_artikel}
                            onReady={(editor) => {}}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setIsiArtikel(data);
                            }}
                            config={{
                              placeholder: "Tulis Deskripsi",
                            }}
                            onBlur={(e) => {
                              simpleValidator.current.showMessageFor(
                                "isi_artikel"
                              );
                            }}
                          />
                        ) : (
                          <p>Tunggu Sebentar</p>
                        )}
                        {simpleValidator.current.message(
                          "isi_artikel",
                          isi_artikel,
                          template === "1" ? "required" : "",
                          {
                            className: "text-danger",
                          }
                        )}
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-12 d-flex justify-content-end">
                        <Link href="/site-management/setting/page" passHref>
                          <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                            Kembali
                          </a>
                        </Link>
                        <button
                          type="submit"
                          className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                        >
                          Simpan
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {template === "2" && (
            <div className="col-12 col-xl-8 order-1">
              <div className="card card-custom card-stretch gutter-b">
                <div className="card-header border-0 mt-6">
                  <h3 className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 my-0 my-sm-5 titles-1">
                    Page Content
                  </h3>
                </div>
                <div className="card-body pt-0">
                  <div>
                    <h3
                      className="font-weight-bolder text-dark border-0 w-100"
                      style={{ fontSize: "16px" }}
                    >
                      Title Page
                    </h3>
                    <div
                      className="mb-10"
                      style={{
                        width: "100%",
                      }}
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Tulis judul halaman"
                        value={titlePage}
                        onChange={(e) => {
                          setTitlePage(
                            e.target.value.replace(/[^a-zA-Z0-9 ]/g, "")
                          );
                        }}
                        onBlur={(e) => {
                          simpleValidator.current.showMessageFor("titlePage");
                        }}
                      />
                      {simpleValidator.current.message(
                        "titlePage",
                        titlePage,
                        template === "2" ? "required" : "",
                        {
                          className: "text-danger",
                        }
                      )}
                    </div>
                  </div>
                  <div className={`${styles.selectKategori} form-group`}>
                    <label
                      htmlFor="staticEmail"
                      className="col-sm-4 col-form-label font-weight-bolder"
                    >
                      Image
                    </label>
                    <div className="row ml-4">
                      <figure
                        className="avatar item-rtl position-relative"
                        data-toggle="modal"
                        data-target="#exampleModalCenter"
                      >
                        <Image
                          src={gambarPreview}
                          alt="image"
                          width={160}
                          height={160}
                          objectFit="fill"
                          onBlur={(e) => {
                            simpleValidator.current.showMessageFor("gambar");
                          }}
                        />
                        {simpleValidator.current.message(
                          "gambar",
                          gambar,
                          template === "2" ? "required" : "",
                          {
                            className: "text-danger",
                          }
                        )}
                      </figure>
                      <div className="position-relative">
                        <label
                          className="circle-top"
                          htmlFor="inputGroupFile04"
                        >
                          <i className="ri-add-line text-dark"></i>
                        </label>
                        <input
                          type="file"
                          name="gambar"
                          className="custom-file-input"
                          id="inputGroupFile04"
                          onChange={onChangeGambar}
                          accept="image/*"
                          onBlur={() =>
                            simpleValidator.current.showMessageFor("gambar")
                          }
                          style={{ display: "none" }}
                        />
                      </div>
                    </div>

                    <div className="ml-4"></div>
                  </div>
                  <div>
                    <h3
                      className="card-title font-weight-bolder text-dark border-0 w-100"
                      style={{ fontSize: "16px" }}
                    >
                      Content Page
                    </h3>
                    <div
                      className="my-10"
                      style={{
                        width: "100%",
                      }}
                    >
                      <div className="ckeditor">
                        {editorLoaded ? (
                          <CKEditor
                            editor={ClassicEditor}
                            data={isi_artikel}
                            onReady={(editor) => {
                              // You can store the "editor" and use when it is needed.
                            }}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setIsiArtikel(data);
                            }}
                            config={{
                              placeholder: "Tulis Deskripsi",
                            }}
                            onBlur={(e) => {
                              simpleValidator.current.showMessageFor(
                                "isi_artikel"
                              );
                            }}
                          />
                        ) : (
                          <p>Tunggu Sebentar</p>
                        )}
                        {simpleValidator.current.message(
                          "isi_artikel",
                          isi_artikel,
                          template === "2" ? "required" : "",
                          {
                            className: "text-danger",
                          }
                        )}
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-12 d-flex justify-content-end">
                        <Link href="/site-management/setting/page" passHref>
                          <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                            Kembali
                          </a>
                        </Link>
                        <button
                          type="submit"
                          className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                        >
                          Simpan
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </PageWrapper>
  );
};

export default UbahPage;
