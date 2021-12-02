import React, { useState, useRef, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import { TagsInput } from "react-tag-input-component";
import { updateArtikelPeserta } from "../../../../redux/actions/publikasi/artikel.actions";
import DatePicker from "react-datepicker";

import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";
import { Container } from "react-bootstrap";
import { useQuill } from "react-quilljs";

import styles from "../../../../styles/previewGaleri.module.css";

const EditArtikelPeserta = ({ session }) => {
  const editorRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();

  const detailArtikelsPeserta = useSelector(
    (state) => state.detailArtikelsPeserta
  );
  const allAkademi = useSelector((state) => state.allAkademi);
  const allKategori = useSelector((state) => state.allKategori);

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

  const importSwitch = () => import("bootstrap-switch-button-react");
  const SwitchButton = dynamic(importSwitch, {
    ssr: false,
  });

  const [, forceUpdate] = useState();

  const [editorLoaded, setEditorLoaded] = useState(false);
  const [publish, setPublish] = useState(0);
  const [publishDate, setPublishDate] = useState(null);
  const [disablePublishDate, setDisablePublishDate] = useState(true);
  const [gambarDB, setGambarDB] = useState(
    process.env.END_POINT_API_IMAGE_PUBLIKASI +
    "publikasi/images/" +
    detailArtikelsPeserta.artikel.data.gambar
  );
  const [gambarPreview, setGambarPreview] = useState(
    process.env.END_POINT_API_IMAGE_PUBLIKASI +
    "publikasi/images/" +
    detailArtikelsPeserta.artikel.data.gambar
  );
  const [gambar, setGambar] = useState(
    process.env.END_POINT_API_IMAGE_PUBLIKASI +
    "publikasi/images/" +
    detailArtikelsPeserta.artikel.data.gambar
  );

  // const [gambar, setGambar] = useState("");
  const [gambarName, setGambarName] = useState(null);
  const [judul, setJudul] = useState(
    detailArtikelsPeserta.artikel.data.judul_artikel
  );
  const [deskripsi, setDeskripsi] = useState(
    detailArtikelsPeserta.artikel.data.isi_artikel
  );
  const [akademi, setAkademi] = useState(
    detailArtikelsPeserta.artikel.data.kategori_akademi
  );
  const [kategori, setKategori] = useState(
    detailArtikelsPeserta.artikel.data.kategori_id
  );
  const [tag, setTag] = useState(detailArtikelsPeserta.artikel.data.tag);
  const [checkTag, setCheckTag] = useState(false);

  const { quill, quillRef } = useQuill();
  const limit = 12000

  let optionAkademi = allAkademi.akademi.map((item) => {
    return {
      label: item.slug,
      value: item.id,
    };
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
      Swal.fire(
        "Oops !",
        "Thumbnail harus berupa data gambar.",
        "error"
      );
    }
  };

  function hasWhiteSpace(s) {
    return s.indexOf(" ") >= 0;
  }

  const handleTag = (data, type) => {
    for (let i = 0; i < data.length; i++) {
      if (hasWhiteSpace(data[i])) {
        data.splice([i], 1);
      }
    }
    setTag(data);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      if (gambarDB !== gambar) {
        const data = {
          isi_artikel: deskripsi,
          judul_artikel: judul,
          gambar: gambar,
          kategori_akademi: akademi,
          kategori_id: kategori,
          tag: tag,
          _method: "put",
        };
        dispatch(updateArtikelPeserta(data, session.token, router.query.id));
      } else {
        const data = {
          isi_artikel: deskripsi,
          judul_artikel: judul,
          gambar: "",
          kategori_akademi: akademi,
          kategori_id: kategori,
          tag: tag,
          _method: "put",
        };
        dispatch(updateArtikelPeserta(data, session.token, router.query.id));
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
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(deskripsi);
      quill.on('text-change', (delta, oldDelta, source) => {
        setDeskripsi(quill.root.innerHTML); // Get innerHTML using quill

        if (quill.root.innerText.length <= limit) {
          return;
        }
        const { ops } = delta;
        let updatedOps;
        if (ops.length === 1) {
          updatedOps = [{ delete: ops[0].insert.length }];
        } else {
          updatedOps = [ops[0], { delete: ops[1].insert.length }];
        }
        quill.updateContents({ ops: updatedOps });
      });
    }

    setEditorLoaded(true);
  }, [dispatch, simpleValidator, router, quill]);

  return (
    <PesertaWrapper fluid className="px-md-20 px-10 pb-10">
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header">
            <h3 className="col-sm-4 card-title font-weight-bolder text-dark">
              Edit Artikel
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
                      accept="image/*"
                      style={{ display: "none" }}
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("gambar")
                      }
                    />
                  </div>
                </div>

                <div className="ml-4">
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

                <div
                  className={`${styles.resolusiTambah} mt-3 col-8 col-sm-6 col-md-4 col-lg-5 col-xl-4 text-muted`}
                >
                  <p>
                    *JPG/JPEG/PNG (Max.5 MB) Recommended resolution 1024*512.
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
                    className={`${styles.judulTambah} form-control`}
                    placeholder="Masukkan Judul Disini"
                    value={judul}
                    onChange={(e) => {
                      setJudul(e.target.value);
                    }}
                    onBlur={() =>
                      simpleValidator.current.showMessageFor("judul")
                    }
                  />
                  {simpleValidator.current.message(
                    "judul",
                    judul,
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
                <div className={`${styles.deskripsiTambah} col-sm-12`}>
                  <div className="ckeditor">
                    {editorLoaded ? (
                      <div style={{ width: "100%", height: "300px" }}>
                        <div
                          ref={quillRef}
                          onBlur={() =>
                            simpleValidator.current.showMessageFor("deskripsi")
                          }
                        />
                      </div>
                    ) : (
                      <p>Tunggu Sebentar</p>
                    )}
                    {simpleValidator.current.message(
                      "deskripsi",
                      deskripsi,
                      "required",
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
                  Akademi
                </label>
                <div className={`${styles.selectKategori} col-sm-12`}>
                  <select
                    onChange={(e) => {
                      setAkademi(e.target.value);
                    }}
                    value={akademi}
                    className={`${styles.selectKategori} form-control dropdownArt`}
                    onBlur={(e) => {
                      setAkademi(e.target.value);
                      simpleValidator.current.showMessageFor("akademi");
                    }}
                  >
                    {optionAkademi.map((item) => {
                      return (
                        <option value={item.label} key={item.id}>
                          {item.label}
                        </option>
                      );
                    })}
                  </select>
                  {simpleValidator.current.message(
                    "akademi",
                    akademi,
                    "required",
                    { className: "text-danger" }
                  )}
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
                    onBlur={(e) => {
                      setKategori(e.target.value);
                      simpleValidator.current.showMessageFor("kategori");
                    }}
                  >
                    {allKategori.kategori.kategori.map((item) => {
                      if (item.jenis_kategori === "Artikel")
                        return (
                          <option value={item.id} key={item.id}>
                            {item.nama_kategori}
                          </option>
                        );
                    })}
                  </select>
                  {simpleValidator.current.message(
                    "kategori",
                    kategori,
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
                <div
                  className={`${styles.tagStyle} col-sm-12`}
                  style={{ wordBreak: "break-word" }}
                >
                  <TagsInput
                    name="fruits"
                    placeHolder="Isi Tag disini dan Enter"
                    seprators={["Enter", "Tab"]}
                    value={tag}
                    onExisting={(data) => {
                      setCheckTag(true);
                    }}
                    onChange={(data) => {
                      setCheckTag(false);
                      handleTag(data);
                    }}
                  />
                  {checkTag && (
                    <span className="text-danger">Tag tidak boleh sama</span>
                  )}
                </div>
              </div>

              <div className="form-group row mr-0">
                <div className="col-sm-2"></div>
                <div className="col-sm-10 text-right">
                  <Link href="/peserta/artikel">
                    <a
                      className={`${styles.btnKembali} btn btn-white-ghost-rounded-full rounded-pill mr-2 btn-sm`}
                    >
                      Batal
                    </a>
                  </Link>
                  <button
                    className={`${styles.btnSimpan} btn btn-primary-rounded-full rounded-pill btn-sm border-0`}
                    style={{ backgroundColor: "#007cff" }}
                    onClick={onSubmit}
                  >
                    Ubah
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
            <div className={`${styles.modalsPrevImage} modal-body text-center`}>
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
  );
};

export default EditArtikelPeserta;
