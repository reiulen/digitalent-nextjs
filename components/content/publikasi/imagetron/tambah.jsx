import React, { useState, useRef, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import { TagsInput } from "react-tag-input-component";
import DatePicker from "react-datepicker";

import styles from "../../../../styles/previewGaleri.module.css";

import {
  newImagetron,
  clearErrors,
} from "../../../../redux/actions/publikasi/imagetron.actions";
import { getAllKategori } from "../../../../redux/actions/publikasi/kategori.actions";
import { NEW_IMAGETRON_RESET } from "../../../../redux/types/publikasi/imagetron.type";
import PageWrapper from "../../../wrapper/page.wrapper";
import LoadingPage from "../../../LoadingPage";

const TambahImagetron = ({ token, id }) => {
  const editorRef = useRef()
  const dispatch = useDispatch()
  const router = useRouter();

  const importSwitch = () => import('bootstrap-switch-button-react')

  const SwitchButton = dynamic(importSwitch, {
    ssr: false
  })
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const { loading, error, success } = useSelector(state => state.newImagetron)
  const {
    loading: allLoading,
    error: allError,
    kategori,
  } = useSelector((state) => state.allKategori);
  const { setting } = useSelector(state => state.allSettingPublikasi)
  const [, forceUpdate] = useState();

  useEffect(() => {
    if (success) {
      router.push({
        pathname: `/publikasi/imagetron`,
        query: { success: true },
      });
    }

  }, [dispatch, error, success, simpleValidator, router]);

  const [kategori_id, setKategoriId] = useState('')
  const [judul, setJudulImagetron] = useState('')
  const [gambar, setGambar] = useState('')
  const [gambarPreview, setGambarPreview] = useState('/assets/media/default.jpg')
  const [iconPlus, setIconPlus] = useState(
    "/assets/icon/Add.svg"
  );
  const [gambarName, setGambarName] = useState(null)
  const [url_link, setUrlRedirect] = useState('')
  const [publish, setPublish] = useState(0)
  const [users_id, setUserId] = useState(id)
  const [publishDate, setPublishDate] = useState(null);
  const [disablePublishDate, setDisablePublishDate] = useState(true)

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
      // setGambar("")
      // setGambarPreview("/assets/media/default.jpg")
      // setGambarName(null)
      // simpleValidator.current.showMessages();
      // forceUpdate(1);
      e.target.value = null
      Swal.fire(
        'Oops !',
        'Data yang bisa dimasukkan hanya berupa data gambar.',
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

  const onSubmit = (e) => {
    e.preventDefault()
    if (simpleValidator.current.allValid()) {
      if (error) {
        dispatch(clearErrors())
      }

      if (publish === true) {
        setPublish(1)

      } else if (publish === false) {
        setPublish(0)

      }

      if (publishDate === null) {
        let today = new Date

        const data = {
          kategori_id,
          judul,
          url_link,
          gambar,
          publish,
          users_id,
          tanggal_publish: moment(today).format("YYYY-MM-DD")
        }

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
              dispatch(newImagetron(data, token))
            }
          });

      } else {
        const data = {
          kategori_id,
          judul,
          url_link,
          gambar,
          publish,
          users_id,
          tanggal_publish: moment(publishDate).format("YYYY-MM-DD")
        }

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
              dispatch(newImagetron(data, token))
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

  }

  const onNewReset = () => {
    dispatch({ type: NEW_IMAGETRON_RESET })
  }

  return (
    <PageWrapper>
      {error ?
        <div className="alert alert-custom alert-light-danger fade show mb-5" role="alert">
          <div className="alert-icon"><i className="flaticon-warning"></i></div>
          <div className="alert-text">{error}</div>
          <div className="alert-close">
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true"><i className="ki ki-close"></i></span>
            </button>
          </div>
        </div>
        : ''
      }
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header">
            <h3 className="col-sm-4 card-title font-weight-bolder text-dark">Tambah Imagetron</h3>
          </div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label font-weight-bolder"
                >
                  Kategori
                </label>
                <div className={`${styles.selectKategori} col-sm-12`}>
                  <select
                    name=""
                    id=""
                    className={`${styles.selectKategori} form-control`}
                    value={kategori_id}
                    onChange={(e) => setKategoriId(e.target.value)}
                    onBlur={(e) => {
                      setKategoriId(e.target.value);
                      simpleValidator.current.showMessageFor("kategori");
                    }}
                  >
                    <option selected disabled value="">
                      -- Imagetron --
                    </option>
                    {!kategori || (kategori && kategori.length === 0) ? (
                      <option value="">Data Kosong</option>
                    ) : (
                      kategori &&
                      kategori.kategori &&
                      kategori.kategori.map((row) => {
                        return (
                          row.jenis_kategori == "Imagetron" ?
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
                    "kategori",
                    kategori_id,
                    "required",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label font-weight-bolder">Judul</label>
                <div className={`${styles.judulTambah} col-sm-12`}>
                  <input
                    type="text"
                    className={`${styles.judulTambah} form-control`}
                    placeholder="Masukkan Judul Disini"
                    value={judul}
                    onChange={(e) => setJudulImagetron(e.target.value)}
                    onBlur={() => simpleValidator.current.showMessageFor("judul")
                    } />
                  {simpleValidator.current.message(
                    "judul",
                    judul,
                    "required|min:5|max:200",
                    { className: "text-danger" }
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className='col-sm-4 col-form-label font-weight-bolder'>Link URL</label>
                <div className={`${styles.judulTambah} col-sm-12`}>
                  <div className="input-group">
                    <input type="text" className={`${styles.judulTambah} form-control`} value={url_link} onChange={e => setUrlRedirect(e.target.value)} placeholder="https://www.example.com" onBlur={() => simpleValidator.current.showMessageFor("url_link")} />

                  </div>
                  {/* {simpleValidator.current.message(
                    "url_link",
                    url_link,
                    "required|url",
                    { className: "text-danger" }
                  )} */}
                </div>
              </div>

              <div className={`${styles.selectKategori} form-group`}>
                <label
                  htmlFor="staticEmail"
                  className="col-sm-4 col-form-label font-weight-bolder"
                >
                  Upload Thumbnail
                </label>
                <div className="ml-4 row">
                  <figure
                    className="avatar item-rtl"
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
                  <div>
                    <label htmlFor="inputGroupFile04" className="icon-plus">
                      <Image
                        src={iconPlus}
                        alt="plus"
                        width={60}
                        height={60}
                      />
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

                <div className={`${styles.resolusiTambah} mt-3 col-sm-6 col-md-6 col-lg-7 col-xl-3 text-muted`}>
                  <p>
                    Resolusi yang direkomendasikan adalah 1024 * 512. Fokus visual pada bagian tengah gambar
                  </p>

                </div>

              </div>

              {/* <div className="form-group">
                    <label className='col-sm-2 col-form-label font-weight-bolder'>URL Link</label>
                    <div className="col-sm-12">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">https://</div>
                            </div>
                            <input type="text" className="form-control" value={url_link} onChange={e => setUrlRedirect(e.target.value)} placeholder="Isi Link Disini" onBlur={() => simpleValidator.current.showMessageFor("url_link")}/>
                            {simpleValidator.current.message(
                                "url_link",
                                url_link,
                                "required",
                                { className: "text-danger" }
                            )}
                        </div>
                    </div>
                </div> */}

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
                          className={`${styles.setPublish} form-search-date form-control-sm form-control`}
                          selected={publishDate}
                          onChange={(date) => handlePublishDate(date)}
                          selectsStart
                          startDate={publishDate}
                          dateFormat="dd/MM/yyyy"
                          placeholderText="Silahkan Isi Tanggal Publish"
                          wrapperClassName="col-12 col-lg-12 col-xl-12"
                          disabled={disablePublishDate === true || disablePublishDate === null}
                        />
                      </div>
                    </div>
                  </div>
                  :
                  null
              }

              <div className="form-group row mr-0">
                <div className="col-sm-2"></div>
                <div className="col-sm-10 text-right">
                  <Link href='/publikasi/imagetron'>
                    <a className={`${styles.btnKembali} btn btn-white-ghost-rounded-full rounded-pill mr-2 btn-sm`}>Kembali</a>
                  </Link>
                  <button className={`${styles.btnSimpan} btn btn-primary-rounded-full rounded-pill btn-sm`}>Simpan</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Pratinjau Gambar</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className={`${styles.modalsPrevImage} modal-body text-center`}>
              <Image
                src={gambarPreview}
                alt='image'
                layout='fill'
                objectFit='fill'
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Tutup</button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default TambahImagetron;
