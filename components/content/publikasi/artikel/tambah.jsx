import React, { useState, useRef, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import { TagsInput } from "react-tag-input-component";
import DatePicker from 'react-datepicker'
import Select from 'react-select'

// import Editor from 'ckeditor5-custom-build/build/ckeditor';
// import { CKEditor } from '@ckeditor/ckeditor5-react'

// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
// import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline'
// import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough'
// // import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote'
// import Links from '@ckeditor/ckeditor5-link/src/link'
// import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed'
// import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice'
// import Heading from '@ckeditor/ckeditor5-heading/src/heading'
// import Font from '@ckeditor/ckeditor5-font/src/font'
// import Images from '@ckeditor/ckeditor5-image/src/image'
// import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle'
// import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar'
// import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload'
// import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize'
// import List from '@ckeditor/ckeditor5-list/src/list'
// import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'
// import Table from '@ckeditor/ckeditor5-table/src/table'
// import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar'
// import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation'
// import Indent from '@ckeditor/ckeditor5-indent/src/indent'
// import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock'
// import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter'

import {
  newArtikel,
  clearErrors,
} from "../../../../redux/actions/publikasi/artikel.actions";
// import { getAllKategori } from "../../../../redux/actions/publikasi/kategori.actions";
import { NEW_ARTIKEL_RESET } from "../../../../redux/types/publikasi/artikel.type";
import PageWrapper from "../../../wrapper/page.wrapper";
import LoadingPage from "../../../LoadingPage";

const TambahArtikel = ({ token }) => {
  const editorRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();

  const importSwitch = () => import("bootstrap-switch-button-react");
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor, Base64UploadAdapter } =
    editorRef.current || {};
  const SwitchButton = dynamic(importSwitch, {
    ssr: false,
  });
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();
  // const forceUpdate = React.useReducer(() => ({}))[1]

  const { loading, error, success } = useSelector((state) => state.newArtikel);
  const { setting } = useSelector(state => state.allSettingPublikasi)
  const {
    loading: allLoading,
    error: allError,
    kategori,
  } = useSelector((state) => state.allKategori);

  // const Editor = dynamic(() => import ("../../../Editor"), {
  //   ssr: false
  // })

  // const editorConfiguration = {
  //   placeholder: "Tulis Deskripsi",
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
  //     // BlockQuote,
  //     Font,
  //     Alignment,
  //     List,
  //     Links,
  //     MediaEmbed,
  //     PasteFromOffice,
  //     Images,
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
  // };

  useEffect(() => {
    // dispatch(getAllKategori());

    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
      // Base64UploadAdapter: require('@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter'),
      // Essentials: require('@ckeditor/ckeditor5-essentials/src/essentials'),
      // Paragraph: require('@ckeditor/ckeditor5-paragraph/src/paragraph'),
      // Bold: require('@ckeditor/ckeditor5-basic-styles/src/bold'),
      // Italic: require ('@ckeditor/ckeditor5-basic-styles/src/italic'),
      // Underline: require ('@ckeditor/ckeditor5-basic-styles/src/underline'),
      // Strikethrough: require ('@ckeditor/ckeditor5-basic-styles/src/strikethrough'),
      // BlockQuote: require ('@ckeditor/ckeditor5-block-quote/src/blockquote'),
      // Link: require ('@ckeditor/ckeditor5-link/src/link'),
      // LinkImage: require ('@ckeditor/ckeditor5-link/src/linkimage'),
      // MediaEmbed: require ('@ckeditor/ckeditor5-media-embed/src/mediaembed'),
      // PasteFromOffice: require ('@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice'),
      // Heading: require ('@ckeditor/ckeditor5-heading/src/heading'),
      // Font: require ('@ckeditor/ckeditor5-font/src/font'),
      // Image: require ('@ckeditor/ckeditor5-image/src/image'),
      // ImageStyle: require ('@ckeditor/ckeditor5-image/src/imagestyle'),
      // ImageToolbar: require ('@ckeditor/ckeditor5-image/src/imagetoolbar'),
      // ImageUpload: require ('@ckeditor/ckeditor5-image/src/imageupload'),
      // ImageResize: require ('@ckeditor/ckeditor5-image/src/imageresize'),
      // List: require ('@ckeditor/ckeditor5-list/src/list'),
      // Alignment: require ('@ckeditor/ckeditor5-alignment/src/alignment'),
      // Table: require ('@ckeditor/ckeditor5-table/src/table'),
      // TableToolbar: require ('@ckeditor/ckeditor5-table/src/tabletoolbar'),
      // TextTransformation: require ('@ckeditor/ckeditor5-typing/src/texttransformation'),
      // Indent: require ('@ckeditor/ckeditor5-indent/src/indent'),
      // IndentBlock: require ('@ckeditor/ckeditor5-indent/src/indentblock'),
      // Base64UploadAdapter: require ('@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter'),
    };

    setEditorLoaded(true);
    if (success) {
      router.push({
        pathname: `/publikasi/artikel`,
        query: { success: true },
      });
    }
  }, [dispatch, error, success, simpleValidator, router]);

  const [judul_artikel, setJudulArtikel] = useState("");
  const [isi_artikel, setIsiArtikel] = useState("");
  const [gambar, setGambar] = useState("");
  const [gambarPreview, setGambarPreview] = useState(
    "/assets/media/default.jpg"
  );
  const [iconPlus, setIconPlus] = useState(
    "/assets/icon/Add.svg"
  );
  const [gambarName, setGambarName] = useState(null)
  const [kategori_id, setKategoriId] = useState("");
  const [users_id, setUserId] = useState(87);
  const [tag, setTag] = useState([]);
  const [publish, setPublish] = useState(0);
  const [publishDate, setPublishDate] = useState(null);
  const [disablePublishDate, setDisablePublishDate] = useState(true)
  const [disableTag, setDisableTag] = useState(false)

  const onChangeGambar = (e) => {
    const type = ["image/jpg", "image/png", "image/jpeg"]

    if (type.includes(e.target.files[0].type)) {
      if (e.target.files[0].size > parseInt(setting[0].max_size) + '000000') {
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
        reader.readAsDataURL(e.target.files[0])
        setGambarName(e.target.files[0].name)
      }
    }
    else {
      e.target.value = null
      Swal.fire(
        'Oops !',
        'Thumbnail harus berupa data gambar.',
        'error'
      )
    }
  };

  const handleChangePublish = (e) => {
    setDisablePublishDate(!disablePublishDate)

    if (e.target.checked === false) {
      setPublishDate(null)
      setPublish(0)
    } else {
      setPublish(1)
    }
  };

  const handlePublishDate = (date) => {
    if (disablePublishDate === false) {
      setPublishDate(date)
    }
  }

  function hasWhiteSpace(s) {
    return s.indexOf(' ') >= 0;
  }

  const handleTag = (data) => {
    for (let i = 0; i < data.length; i++) {
      if (hasWhiteSpace(data[i])) {
        data.splice([i], 1);
      }
    }
    setTag(data);    
  }

  const onSubmit = (e) => {

    e.preventDefault();
    if (simpleValidator.current.allValid() && disableTag === false) {
      if (error) {
        dispatch(clearErrors());
      }

      if (success) {
        dispatch({
          type: NEW_ARTIKEL_RESET,
        });
      }

      if (publish === true) {
        setPublish(1)

      } else if (publish === false) {
        setPublish(0)

      }

      if (publishDate === null) {
        let today = new Date

        const data = {
          judul_artikel,
          isi_artikel,
          gambar,
          kategori_id,
          users_id,
          tag,
          publish,
          tanggal_publish: moment(today).format("YYYY-MM-DD")
        };

        Swal.fire({
          title: "Apakah anda yakin ?",
          text: "Data ini akan ditambahkan !",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya !",
          cancelButtonText: "Batal",
        })
          .then((result) => {
            if (result.isConfirmed) {
              dispatch(newArtikel(data, token));
            }
          });

      } else {

        const data = {
          judul_artikel,
          isi_artikel,
          gambar,
          kategori_id,
          users_id,
          tag,
          publish,
          tanggal_publish: moment(publishDate).format("YYYY-MM-DD")
        };


        Swal.fire({
          title: "Apakah anda yakin ?",
          text: "Data ini akan ditambahkan !",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya !",
          cancelButtonText: "Batal",
        })
          .then((result) => {
            if (result.isConfirmed) {
              dispatch(newArtikel(data, token));
            }
          });
      }

    } else {
      simpleValidator.current.showMessages();
      forceUpdate(1);
      // forceUpdate;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Isi data dengan benar !",
      });
    }
  };

  return (
    <>
      {/* {
        console.log (setting)
      } */}
      <PageWrapper>
        {error ? (
          <div
            className="alert alert-custom alert-light-danger fade show mb-5"
            role="alert"
          >
            <div className="alert-icon">
              <i className="flaticon-warning"></i>
            </div>
            <div className="alert-text">{error}</div>
            <div className="alert-close">
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  <i className="ki ki-close"></i>
                </span>
              </button>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
          {loading ? <LoadingPage loading={loading} /> : ""}
          <div className="card card-custom card-stretch gutter-b">
            <div className="card-header">
              <h3 className="card-title font-weight-bolder text-dark">
                Tambah Artikel
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-2 col-form-label font-weight-bolder"
                  >
                    Judul
                  </label>
                  <div className="col-sm-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Masukkan Judul Disini"
                      value={judul_artikel}
                      onChange={(e) => setJudulArtikel(e.target.value)}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("judul_artikel")
                      }
                    />
                    {simpleValidator.current.message(
                      "judul_artikel",
                      judul_artikel,
                      "required|min:5|max:200",
                      { className: "text-danger" }
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-4 col-form-label font-weight-bolder"
                  >
                    Isi Artikel
                  </label>
                  <div className="col-sm-12">
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
                          onBlur={() =>
                            simpleValidator.current.showMessageFor(
                              "isi_artikel"
                            )
                          }
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
                      {simpleValidator.current.message(
                        "isi_artikel",
                        isi_artikel,
                        "required|min:100|max:12000",
                        { className: "text-danger" }
                      )}
                    </div>
                    {/* <Editor value="" onChange={(data) => setIsiArtikel(data)}/> */}
                    {/* <CKEditor 
                      editor={ Editor }
                      config={ editorConfiguration }
                      onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                      }}
                    /> */}
                  </div>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-4 col-form-label font-weight-bolder"
                  >
                    Upload Thumbnail
                  </label>
                  <div className="ml-3 row">
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
                        objectFit="cover"
                      />
                    </figure>
                    <div className="position-relative">
                      <label className="circle-top" htmlFor="inputGroupFile04">
                        <i className="ri-add-line text-dark"></i>
                      </label>
                      <input
                        type="file"
                        name="gambar"
                        className="custom-file-input"
                        id="inputGroupFile04"
                        onChange={onChangeGambar}
                        // onChange={(e) => onChangeGambar(e)}
                        accept="image/*"
                        onBlur={() =>
                          simpleValidator.current.showMessageFor("gambar")
                        }
                        style={{ display: "none" }}
                      />
                    </div>
                    {/* <div>
                      <label htmlFor="inputGroupFile04" className="icon-plus">
                        <Image
                          src={iconPlus}
                          alt="plus"
                          width={60}
                          height={60} 
                        />
                      </label>
                      <div className="circle-top" onClick={onChangeGambar}>
                        <i className="ri-add-line text-dark"></i>
                      </div>
                      
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
                        style={{display: "none"}}
                      />
                    </div> */}

                  </div>

                  <div className="ml-3">
                    {simpleValidator.current.message(
                      "gambar",
                      gambar,
                      "required",
                      { className: "text-danger" }
                    )}
                    {
                      gambarName !== null ?
                        <small className="text-danger">{gambarName}</small>
                        :
                        null
                    }
                  </div>

                  <div className="mt-3 col-sm-6 col-md-6 col-lg-7 col-xl-3 text-muted">
                    <p>
                      Resolusi yang direkomendasikan adalah 1024 * 512. Fokus visual pada bagian tengah gambar.
                    </p>

                  </div>

                </div>

                {/* <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-2 col-form-label"
                  >
                    Upload Thumbnail
                  </label>
                  <div className="col-sm-1">
                    <figure
                      className="avatar item-rtl"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                    >
                      <Image
                        src={gambarPreview}
                        alt="image"
                        width={60}
                        height={60}
                      />
                    </figure>
                  </div>
                  <div className="col-sm-9">
                    <div className="input-group">
                      <div className="custom-file">
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
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="inputGroupFile04"
                        >
                          Pilih file
                        </label>
                      </div>
                    </div>
                    {simpleValidator.current.message(
                      "gambar",
                      gambar,
                      "required",
                      { className: "text-danger" }
                    )}
                    {
                      gambarName !== null ?
                        <small className="text-danger">{gambarName}</small>
                      :
                        null
                    }
                  </div>
                  
                </div> */}
                <div className="form-group">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-2 col-form-label font-weight-bolder"
                  >
                    Kategori
                  </label>
                  <div className="col-sm-12">
                    <select
                      name=""
                      id=""
                      className="form-control"
                      value={kategori_id}
                      onChange={(e) => setKategoriId(e.target.value)}
                      onBlur={(e) => {
                        setKategoriId(e.target.value);
                        simpleValidator.current.showMessageFor("kategori_id");
                      }}
                    >
                      <option selected disabled value="">
                        -- Artikel --
                      </option>
                      {!kategori || (kategori && kategori.length === 0) ? (
                        <option value="">Data Tidak Ditemukan</option>
                      ) : (
                        kategori &&
                        kategori.kategori &&
                        kategori.kategori.map((row) => {
                          return (
                            row.jenis_kategori == "Artikel" ?
                              <option key={row.id} value={row.id}>
                                {row.nama_kategori}
                              </option>
                              :
                              null
                          );
                        })
                      )}
                    </select>
                    {simpleValidator.current.message(
                      "kategori_id",
                      kategori_id,
                      "required",
                      { className: "text-danger" }
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-2 col-form-label font-weight-bolder"
                  >
                    Tag
                  </label>
                  <div className="col-sm-12">
                    <TagsInput
                      value={tag}
                      onChange={(data) => handleTag(data)}
                      // onChange={setTag}
                      name="fruits"
                      placeHolder="Isi Tag disini"
                      // onBlur={() => simpleValidator.current.showMessageFor('tag')}
                      seprators={["Enter", "Tab"]}
                    />
                    {/* {simpleValidator.current.message('tag', tag, 'required', { className: 'text-danger' })} */}
                    {
                      disableTag === true ?
                        <p className="text-danger">
                          Tag tidak bisa terdiri dari "SPACE" character saja
                        </p>
                        :
                        null
                    }
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="staticEmail"
                    className="ml-5 pl-4 font-weight-bolder"
                  >
                    Publish
                  </label>
                  <div className="col-sm-1 ml-4">
                    <div className="">
                      <label className="switches">
                        <input
                          // required
                          className="checkbox"
                          checked={publish}
                          type="checkbox"
                          // onChange={(checked) => setPublish(checked)}
                          onChange={(e) => handleChangePublish(e)}
                        />
                        <span
                          className={`sliders round ${publish ? "text-white" : "pl-2"
                            }`}
                        >
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {
                  disablePublishDate === false ?
                    <div className="form-group">
                      <label className='col-sm-5 col-form-label font-weight-bolder'>Set Tanggal Publish</label>
                      <div className="col-sm-12">
                        <div className="input-group">
                          <DatePicker
                            className="form-search-date form-control-sm form-control"
                            selected={publishDate}
                            onChange={(date) => handlePublishDate(date)}
                            // onChange={(date) => setPublishDate(date)}
                            selectsStart
                            startDate={publishDate}
                            // endDate={endDate}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Silahkan Isi Tanggal Publish"
                            wrapperClassName="col-12 col-lg-12 col-xl-12"
                            // minDate={moment().toDate()}
                            // minDate={addDays(new Date(), 20)}
                            disabled={disablePublishDate === true || disablePublishDate === null}
                          />
                        </div>
                        {
                          // disablePublishDate === true ?
                          //   <small className="text-muted">Harap ubah status publikasi menjadi aktif untuk mengisi Tanggal Publish</small>
                          // :
                          //   null
                        }
                      </div>
                    </div>
                    :
                    null

                }


                <div className="form-group row">
                  <div className="col-sm-2"></div>
                  <div className="col-sm-10 text-right">
                    <Link href="/publikasi/artikel">
                      <a className="btn btn-white-ghost-rounded-full rounded-pill mr-2 btn-sm">
                        Kembali
                      </a>
                    </Link>
                    <button className="btn btn-primary-rounded-full rounded-pill btn-sm">Simpan</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Pratinjau Gambar
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div
                className="modal-body text-center"
                style={{ height: "400px" }}
              >
                <Image
                  src={gambarPreview}
                  alt="image"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};


export default TambahArtikel;
