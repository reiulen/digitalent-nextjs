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

import Swal from "sweetalert2";
import Image from "next/image";
import { postPage } from "../../../../../redux/actions/site-management/settings/page.actions";

const TambahPage = ({ token }) => {
  let dispatch = useDispatch();
  const router = useRouter();

  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor, Base64UploadAdapter } =
    editorRef.current || {};

  const [isi_artikel, setIsiArtikel] = useState("");
  const [pageName, setPageName] = useState("");
  const [pageStatus, setPageStatus] = useState("");
  const [errorr, setError] = useState({
    isi_artikel: "",
    pageName: "",
    pageStatus: "",
  });
  const [titlePage, setTitlePage] = useState(null);
  const [template, setTemplate] = useState(localStorage.getItem("template"));
  const [gambar, setGambar] = useState("");
  const [gambarPreview, setGambarPreview] = useState(
    "/assets/media/default.jpg"
  );
  const [gambarName, setGambarName] = useState(null);

  const { loading, error, success } = useSelector((state) => state.newPage);

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
    if (isi_artikel === "") {
      setError({
        ...errorr,
        isi_artikel: "Konten tidak boleh kosong",
      });
      notify("Konten tidak boleh kosong");
    } else if (pageName === "") {
      setError({ ...errorr, pageName: "page name tidak boleh kosong" });
      notify("page name tidak boleh kosong");
    } else if (titlePage === "") {
      setError({ ...errorr, pageName: "title page tidak boleh kosong" });
      notify("title page tidak boleh kosong");
    } else if (pageStatus === "") {
      setError({ ...errorr, pageStatus: "page status tidak boleh kosong" });
      notify("page status tidak boleh kosong");
    } else {
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
              property_template: {
                title: titlePage,
                content: isi_artikel,
              },
            };
          } else {
            sendData = {
              name: pageName,
              template_type: template,
              status: pageStatus,
              property_template: {
                title: titlePage,
                content: isi_artikel,
                image: gambar,
              },
            };
          }
          dispatch(postPage(sendData, token));
        }
      });
    }
  };

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };

    if (success) {
      Swal.fire("Berhasil Menyimpan data", "", "success").then(() => {
        router.push({
          pathname: `/site-management/setting/page`,
          query: { success: true },
        });
      });
    }
    if (error) {
      Swal.fire(error, "", "error").then(() => {});
    }

    setEditorLoaded(true);
  }, [dispatch, error, success, router]);
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
                    />
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
                      defaultValue={pageStatus}
                    >
                      <option value="" disabled selected>
                        Pilih Status
                      </option>
                      <option value="1">Listed</option>
                      <option value="0">Unlisted</option>
                    </select>
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
                      className="card-title font-weight-bolder text-dark border-0 w-100"
                      style={{ fontSize: "16px" }}
                    >
                      Title Page
                    </h3>
                    <div
                      className="my-10"
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
                      />
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
                        />
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
                          />
                        ) : (
                          <p>Tunggu Sebentar</p>
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
                      className="card-title font-weight-bolder text-dark border-0 w-100"
                      style={{ fontSize: "16px" }}
                    >
                      Title Page
                    </h3>
                    <div
                      className="my-10"
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
                      />
                    </div>
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
                            onReady={(editor) => {}}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setIsiArtikel(data);
                            }}
                            config={{
                              placeholder: "Tulis Deskripsi",
                            }}
                          />
                        ) : (
                          <p>Tunggu Sebentar</p>
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
                      className="card-title font-weight-bolder text-dark border-0 w-100"
                      style={{ fontSize: "16px" }}
                    >
                      Title Page
                    </h3>
                    <div
                      className="my-10"
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
                      />
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
                        />
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
                          />
                        ) : (
                          <p>Tunggu Sebentar</p>
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

export default TambahPage;
