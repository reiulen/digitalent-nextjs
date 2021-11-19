import React, { useState, useRef, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import { TagsInput } from "react-tag-input-component";
import DatePicker from "react-datepicker";

import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";
import { Container } from "react-bootstrap";

import styles from "../../../../styles/previewGaleri.module.css";
import gambarImage from "../../../../public/assets/media/default.jpg";

const TambahArtikelPeserta = () => {
  const editorRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();

  const importSwitch = () => import("bootstrap-switch-button-react");
  const SwitchButton = dynamic(importSwitch, {
    ssr: false,
  });
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const [, forceUpdate] = useState();

  const allAkademi = useSelector((state) => state.allAkademi);
  const allKategori = useSelector((state) => state.allKategori);

  const { CKEditor, ClassicEditor, Base64UploadAdapter } =
    editorRef.current || {};
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [publish, setPublish] = useState(0);
  const [publishDate, setPublishDate] = useState(null);
  const [disablePublishDate, setDisablePublishDate] = useState(true);
  const [gambarPreview, setGambarPreview] = useState(
    "/assets/media/default.jpg"
  );
  const [gambar, setGambar] = useState("");
  const [gambarName, setGambarName] = useState(null);
  const [judul, setJudul] = useState(null);
  const [deskripsi, setDeskripsi] = useState(null);
  const [akademi, setAkademi] = useState(null);
  const [kategori, setKategori] = useState(null);
  const [tag, setTag] = useState([]);

  let optionAkademi = allAkademi.akademi.map((item) => {
    return {
      label: item.slug,
      value: item.id,
    };
  });

  function hasWhiteSpace(s) {
    return s.indexOf(' ') >= 0;
  }

  const handleTag = (data) => {
    for (let i = 0; i < data.length; i++) {
      if (hasWhiteSpace(data[i])) {
        data.splice([i], 1);
      }
    }
    if (tag.includes(data) !== true) {
      setTag(data);
    }
  };

  const onChangeGambar = (e) => {
    const type = ["image/jpg", "image/png", "image/jpeg"];

    if (type.includes(e.target?.files[0].type)) {
      if (e.target.files[0]?.size > "2000000") {
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

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(judul, deskripsi, akademi, kategori, tag);
  };

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };

    setEditorLoaded(true);
  }, [dispatch, simpleValidator, router]);

  return (
    <>
      <PesertaWrapper fluid className="px-md-20 px-10 pb-10">
        <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
          <div className="card card-custom card-stretch gutter-b">
            <div className="card-header">
              <h3 className="col-sm-4 card-title font-weight-bolder text-dark">
                Tambah Artikel
              </h3>
            </div>
            <div className="card-body">
              <div>
                <div className="form-group">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-4 col-form-label font-weight-bolder"
                  >
                    Upload Thumbnail
                  </label>
                  <div className="row ml-4">
                    <figure
                      className="avatar item-rtl position-relative"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                    >
                      <Image
                        src={gambarPreview}
                        alt="image12s"
                        width={160}
                        height={160}
                        objectFit="fill"
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
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={onChangeGambar}
                      />
                    </div>
                  </div>

                  <div
                    className={`${styles.resolusiTambah} mt-3 col-8 col-sm-6 col-md-4 col-lg-5 col-xl-4 text-muted`}
                  >
                    <p>
                      *JPG/JPEG/PNG (Max.2 MB) Recommended resolution 1024*512.
                    </p>
                  </div>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-2 col-form-label font-weight-bolder"
                  >
                    Judul
                  </label>
                  <div className={`${styles.judulTambah} col-sm-12`}>
                    <input
                      type="text"
                      value={judul}
                      className={`${styles.judulTambah} form-control`}
                      placeholder="Masukkan Judul Disini"
                      onChange={(e) => {
                        setJudul(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-4 col-form-label font-weight-bolder"
                  >
                    Isi Artikel
                  </label>
                  <div className={`${styles.deskripsiTambah} col-sm-12`}>
                    <div className="ckeditor">
                      {editorLoaded ? (
                        <CKEditor
                          editor={ClassicEditor}
                          config={{
                            placeholder: "Tulis Deskripsi",
                          }}
                          data={deskripsi}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setDeskripsi(data);
                          }}
                        />
                      ) : (
                        <p>Tunggu Sebentar</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-2 col-form-label font-weight-bolder"
                  >
                    Akademi
                  </label>
                  <div className={`${styles.selectKategori} col-sm-12`}>
                    <select
                      onChange={(e) => {
                        setAkademi(e.target.value);
                      }}
                      value={akademi}
                      className={`${styles.selectKategori} form-control dropdownArt`}
                    >
                      <option value="" selected disabled>
                        -------------------PILIH AKADEMI-------------------
                      </option>
                      {optionAkademi.map((item) => {
                        return (
                          <option value={item.label} key={item.id}>
                            {item.label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-4 col-form-label font-weight-bolder"
                  >
                    Kategori Artikel
                  </label>
                  <div className={`${styles.selectKategori} col-sm-12`}>
                    <select
                      onChange={(e) => {
                        setKategori(e.target.value);
                      }}
                      value={kategori}
                      className={`${styles.selectKategori} form-control dropdownArt`}
                    >
                      <option value="" selected disabled>
                        -------------------PILIH KATEGORI-------------------
                      </option>
                      {allKategori.kategori.kategori.map((item) => {
                        if (item.jenis_kategori === "Artikel")
                          return (
                            <option value={item.nama_kategori} key={item.id}>
                              {item.nama_kategori}
                            </option>
                          );
                      })}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="staticEmail"
                    className="col-sm-2 col-form-label font-weight-bolder"
                  >
                    Tag
                  </label>
                  <div
                    className={`${styles.tagStyle} col-sm-12`}
                    style={{ wordBreak: "break-word" }}
                  >
                    <TagsInput
                      value={tag}
                      onChange={(data) =>{handleTag(data); console.log(data) }}
                      name="fruits"
                      placeHolder="Isi Tag disini"
                      seprators={["Enter", "Tab"]}
                      onBlur={(e) => {
                        simpleValidator.current.showMessageFor("tag");
                      }}
                    />
                    
                  </div>
                </div>

                <div className="form-group row mr-0">
                  <div className="col-sm-2"></div>
                  <div className="col-sm-10 text-right">
                    <Link href="/publikasi/artikel">
                      <a
                        className={`${styles.btnKembali} btn btn-white-ghost-rounded-full rounded-pill mr-2 btn-sm`}
                      >
                        Batal
                      </a>
                    </Link>
                    <button
                      onClick={onSubmit}
                      className={`${styles.btnSimpan} btn btn-primary-rounded-full rounded-pill btn-sm border-0`}
                      style={{ backgroundColor: "#007cff" }}
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              </div>
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
                className={`${styles.modalsPrevImage} modal-body text-center`}
              >
                <Image
                  src={gambarPreview}
                  alt="image"
                  layout="fill"
                  objectFit="fill"
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
      </PesertaWrapper>
    </>
  );
};

export default TambahArtikelPeserta;
