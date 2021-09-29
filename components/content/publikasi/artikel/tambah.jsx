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

import {
  newArtikel,
  clearErrors,
} from "../../../../redux/actions/publikasi/artikel.actions";
import { getAllKategori } from "../../../../redux/actions/publikasi/kategori.actions";
import { NEW_ARTIKEL_RESET } from "../../../../redux/types/publikasi/artikel.type";
import PageWrapper from "../../../wrapper/page.wrapper";
import LoadingPage from "../../../LoadingPage";

const TambahArtikel = ({token}) => {
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

  const { loading, error, success } = useSelector((state) => state.newArtikel);
  const {
    loading: allLoading,
    error: allError,
    kategori,
  } = useSelector((state) => state.allKategori);

  useEffect(() => {
    // dispatch(getAllKategori());

    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
      // Base64UploadAdapter: require('@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter')
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
  const [gambarName, setGambarName] = useState (null)
  const [kategori_id, setKategoriId] = useState("");
  const [users_id, setUserId] = useState(3);
  const [tag, setTag] = useState([]);
  const [publish, setPublish] = useState(0);
  const [publishDate, setPublishDate] = useState(null);
  const [disablePublishDate, setDisablePublishDate] = useState(true)
  // const [disablePublishDate, setDisablePublishDate] = useState(null)

  const onChangeGambar = (e) => {
    const type = ["image/jpg", "image/png", "image/jpeg"]
    // console.log (e.target.files[0].type)
    // console.log (e.target.files[0])
    // console.log ("check")

    if (type.includes (e.target.files[0].type)){
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setGambar(reader.result);
          setGambarPreview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0])
      // console.log (reader.readAsDataURL(e.target.files[0]))
      setGambarName(e.target.files[0].name)
    } 
    else {
      // setGambar("")
      // setGambarPreview("/assets/media/default.jpg")
      // setGambarName(null)
      // simpleValidator.current.showMessages();
      // forceUpdate(1);
      e.target.value = null
      Swal.fire(
        'Oops !',
        'Thumbnail harus berupa data gambar.',
        'error'
      )
    }
  };

  const handleChangePublish = (e) => {
    // setPublish(e.target.checked);
    setDisablePublishDate(!disablePublishDate)
    // console.log (e.target.checked)

    if (e.target.checked === false){
        setPublishDate (null)
        setPublish (0)
    } else {
        setPublish (1)
    }
  };

  const handlePublishDate = (date) => {
    // let result = moment(date).format("YYYY-MM-DD")
    if (disablePublishDate === false) {
      // setPublishDate(result)
      setPublishDate(date)
      // console.log (result)
    }
  }

  const onSubmit = (e) => {

    e.preventDefault();
    if (simpleValidator.current.allValid()) {
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

        // console.log (today)

        const data = {
          judul_artikel,
          isi_artikel,
          gambar,
          kategori_id,
          users_id,
          tag,
          publish,
          tanggal_publish : moment(today).format("YYYY-MM-DD")
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
              // if (success) {
              //   dispatch({
              //     type: NEW_ARTIKEL_RESET,
              //   });
              // }
  
              dispatch(newArtikel(data, token));
  
              console.log(data);
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
          tanggal_publish : moment(publishDate).format("YYYY-MM-DD")
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
              // if (success) {
              //   dispatch({
              //     type: NEW_ARTIKEL_RESET,
              //   });
              // }
  
              dispatch(newArtikel(data, token));
  
              console.log(data);
            }
        });
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

  return (
    <>
    {
      console.log (kategori)
    }
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
                      "required|min:5|max:50",
                      { className: "text-danger" }
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-2 col-form-label font-weight-bolder"
                  >
                    Isi Artikel
                  </label>
                  <div className="col-sm-12">
                    <div className="ckeditor">
                      {editorLoaded ? (
                        <CKEditor
                          ck-editor__editable
                          editor={ClassicEditor}
                          data={isi_artikel}
                          onReady={(editor) => {
                            // You can store the "editor" and use when it is needed.
                            console.log("Editor is ready to use!", editor);
                          }}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setIsiArtikel(data);
                            console.log({ event, editor, data });
                          }}
                          onBlur={() =>
                            simpleValidator.current.showMessageFor(
                              "isi_artikel"
                            )
                          }
                          config ={{placeholder: "Tulis Deskripsi"}}

                        />
                      ) : (
                        <p>Tunggu Sebentar</p>
                      )}
                      {simpleValidator.current.message(
                        "isi_artikel",
                        isi_artikel,
                        "required|min:100|max:2500",
                        { className: "text-danger" }
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-2 col-form-label font-weight-bolder"
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
                        style={{display: "none"}}
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

                  <div className="mt-3 col-sm-3 text-muted">
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
                        <option value="">Data kosong</option>
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
                      onChange={setTag}
                      name="fruits"
                      placeHolder="Isi Tag disini dan enter."
                      // onBlur={() => simpleValidator.current.showMessageFor('tag')}
                    />
                    {/* {simpleValidator.current.message('tag', tag, 'required', { className: 'text-danger' })} */}
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
                          className={`sliders round ${
                            publish ? "text-white" : "pl-2"
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
                            disabled = {disablePublishDate === true || disablePublishDate === null}
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
