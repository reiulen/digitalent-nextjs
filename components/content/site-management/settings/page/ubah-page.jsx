import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PageWrapper from "../../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

import {
  updatePage
} from "../../../../../redux/actions/site-management/settings/page.actions";

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


  const {
    isUpdateSuccess,
  } = useSelector((state) => state.updatePage);

  const [isi_artikel, setIsiArtikel] = useState(pages.content);
  const [pageName, setPageName] = useState(pages.name);
  const [pageUrl, setPageUrl] = useState(pages.url);
  const [pageStatus, setPageStatus] = useState(pages.status);
  const [errorr, setError] = useState({
    isi_artikel: "",
    pageName: "",
    pageStatus: "",
  });

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
            _method:"PUT"
          };
          
          dispatch(updatePage(sendData,router.query.id, token));
        }
      });
    }
  };

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };

    if (isUpdateSuccess) {
      Swal.fire("Berhasil Mengupdate data", "", "success").then(() => {
        router.push({
          pathname: `/site-management/setting/page`,
          query: { successUpdate: true },
        });
      });
    }

    setEditorLoaded(true);
  }, [dispatch, error, isUpdateSuccess, router]);

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
                className="card-title font-weight-bolder text-dark border-bottom w-100 pb-5 mb-5 mt-5 titles-1"
              >
                Ubah Page
              </h3>
            </div>
            <div className="card-body pt-0">
              <div>
                <h3
                  className="card-title font-weight-bolder text-dark border-0 w-100 pb-5  my-0 my-sm-5"
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
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setIsiArtikel(data);
                          }}
                          // onBlur={() =>
                          //   simpleValidator.current.showMessageFor(
                          //     "isi_artikel"
                          //   )
                          // }
                          config={{
                            placeholder: "Tulis Deskripsi",
                            // plugins: [
                            //   Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize, LinkImage
                            // ],
                            // image: {
                            //   toolbar: [
                            //     'imageStyle:block',
                            //     'imageStyle:side',
                            //     '|',
                            //     'toggleImageCaption',
                            //     'imageTextAlternative',
                            //   ]
                            // }
                          }}
                          // config={{
                          //   plugins: [
                          //     Essentials,
                          //     Paragraph,
                          //     Bold,
                          //     Italic,
                          //     Heading,
                          //     Indent,
                          //     IndentBlock,
                          //     Underline,
                          //     Strikethrough,
                          //     BlockQuote,
                          //     Font,
                          //     Alignment,
                          //     List,
                          //     Link,
                          //     MediaEmbed,
                          //     PasteFromOffice,
                          //     Image,
                          //     ImageStyle,
                          //     ImageToolbar,
                          //     ImageUpload,
                          //     ImageResize,
                          //     Base64UploadAdapter,
                          //     Table,
                          //     TableToolbar,
                          //     TextTransformation,
                          //   ],
                          //   toolbar: [
                          //     'heading',
                          //     '|',
                          //     'bold',
                          //     'italic',
                          //     'underline',
                          //     'strikethrough',
                          //     '|',
                          //     'fontSize',
                          //     'fontColor',
                          //     'fontBackgroundColor',
                          //     '|',
                          //     'alignment',
                          //     'outdent',
                          //     'indent',
                          //     'bulletedList',
                          //     'numberedList',
                          //     'blockQuote',
                          //     '|',
                          //     'link',
                          //     'insertTable',
                          //     'imageUpload',
                          //     'mediaEmbed',
                          //     '|',
                          //     'undo',
                          //     'redo',
                          //   ],
                          //   heading: {
                          //     options: [
                          //       {
                          //         model: 'paragraph',
                          //         view: 'p',
                          //         title: 'Paragraph',
                          //         class: 'ck-heading_paragraph'
                          //       },
                          //       {
                          //         model: 'heading1',
                          //         view: 'h1',
                          //         title: 'Heading 1',
                          //         class: 'ck-heading_heading1'
                          //       },
                          //       {
                          //         model: 'heading2',
                          //         view: 'h2',
                          //         title: 'Heading 2',
                          //         class: 'ck-heading_heading2'
                          //       },
                          //       {
                          //         model: 'heading3',
                          //         view: 'h3',
                          //         title: 'Heading 3',
                          //         class: 'ck-heading_heading3'
                          //       }
                          //     ]
                          //   },
                          //   fontSize: {
                          //     options: [
                          //       9,
                          //       10,
                          //       11,
                          //       12,
                          //       13,
                          //       14,
                          //       15,
                          //       16,
                          //       17,
                          //       18,
                          //       19,
                          //       20,
                          //       21,
                          //       23,
                          //       25,
                          //       27,
                          //       29,
                          //       31,
                          //       33,
                          //       35
                          //     ]
                          //   },
                          //   alignment: {
                          //     options: ['justify', 'left', 'center', 'right']
                          //   },
                          //   table: {
                          //     contentToolbar: [
                          //       'tableColumn',
                          //       'tableRow',
                          //       'mergeTableCells'
                          //     ]
                          //   },
                          //   image: {
                          //     resizeUnit: 'px',
                          //     toolbar: [
                          //       'imageStyle:alignLeft',
                          //       'imageStyle:full',
                          //       'imageStyle:alignRight',
                          //       '|',
                          //       'imageTextAlternative'
                          //     ],
                          //     styles: ['full', 'alignLeft', 'alignRight']
                          //   },
                          //   typing: {
                          //     transformations: {
                          //       remove: [
                          //         'enDash',
                          //         'emDash',
                          //         'oneHalf',
                          //         'oneThird',
                          //         'twoThirds',
                          //         'oneForth',
                          //         'threeQuarters'
                          //       ]
                          //     }
                          //   },
                          //   placeholder: 'Tulis Deskripsi'
                          // }}
                        />
                      ) : (
                        <p>Tunggu Sebentar</p>
                      )}
                    </div>
                    
                </div>
                <div className="form-group row">
                  <div className="col-sm-12 d-flex justify-content-end">
                    <Link href="/site-management/setting/page">
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
                className="card-title font-weight-bolder text-dark border-0 w-100 pt-5 pb-5 my-0 my-sm-5 titles-1"
              >
                Page Attributes
              </h3>
              <form className="w-100">
                <div className="form-group">
                  <label style={{ fontSize: "16px" }}>Page name</label>
                  <input
                  onChange={(e)=>setPageName(e.target.value)}
                    value={pageName}
                    type="text"
                    className="form-control"
                    placeholder="Placeholder"
                  />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: "16px" }}>Page url</label>
                  <input
                  disabled
                  onChange={(e)=>setPageUrl(e.target.value)}
                    value={pageUrl}
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
                  {pages.status === "Listed" ? (
                    <select className="form-control" onChange={(e)=>setPageStatus(e.target.value)} id="exampleSelect1">
                      <option value="Listed">Listed</option>
                      <option value="Unlisted">Unlisted</option>
                    </select>
                  ) : (
                    <select className="form-control" onChange={(e)=>setPageStatus(e.target.value)} id="exampleSelect1">
                      <option value="Unlisted">Unlisted</option>
                      <option value="Listed">Listed</option>
                    </select>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </form>
    </PageWrapper>
  );
};

export default UbahPage;
