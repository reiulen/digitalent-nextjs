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
import Swal from "sweetalert2";
import {
  postPage
} from "../../../../../redux/actions/site-management/settings/page.actions";

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
          const sendData = {
            name: pageName,
            content: isi_artikel,
            status: pageStatus,
          };
          dispatch(postPage(sendData,token));
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
          <div className="col-12 col-xl-8 order-1">
            <div className="card card-custom card-stretch gutter-b">
              <div className="card-header border-0">
                <h3
                  className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 my-0 my-sm-5 titles-1"
                >
                  Tambah Page
                </h3>
              </div>
              <div className="card-body pt-0">
                <div>
                  <h3
                    className="card-title font-weight-bolder text-dark border-0 w-100 pb-5"
                    style={{ fontSize: "16px" }}
                  >
                    Konten Page
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
                            // console.log("Editor is ready to use!", editor);
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
          <div className="col-12 col-xl-4 order-1">
            <div className="card card-custom card-stretch gutter-b">
              <div className="card-header border-0">
                <h3
                  className="card-title font-weight-bolder text-dark border-0 w-100 pb-5 my-0 pt-5 my-sm-5 titles-1"
                >
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
                      placeholder="Placeholder"
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
                      <option value="">Pilih Status</option>
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
        </div>
      </form>
    </PageWrapper>
  );
};

export default TambahPage;
