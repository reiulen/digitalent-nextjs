import React, { useState, useRef, useEffect } from 'react';

import Link from 'next/link'
import Image from 'next/image'
import dynamic from "next/dynamic";
import SimpleReactValidator from 'simple-react-validator'
import Swal from "sweetalert2";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import { TagsInput } from 'react-tag-input-component';
import DatePicker from 'react-datepicker'

import { updateBerita, clearErrors } from '../../../../redux/actions/publikasi/berita.actions'
import { NEW_BERITA_RESET, UPDATE_BERITA_RESET } from '../../../../redux/types/publikasi/berita.type'
// import { getAllKategori } from '../../../../redux/actions/publikasi/kategori.actions'
import PageWrapper from '../../../wrapper/page.wrapper';
import LoadingPage from '../../../LoadingPage';

const EditBerita = ({ token }) => {
    const editorRef = useRef()
    const dispatch = useDispatch()
    const router = useRouter();

    const importSwitch = () => import('bootstrap-switch-button-react')
    const [editorLoaded, setEditorLoaded] = useState(false)
    const { CKEditor, ClassicEditor, Base64UploadAdapter } = editorRef.current || {}
    const SwitchButton = dynamic(importSwitch, {
        ssr: false
    })

    const simpleValidator = useRef(new SimpleReactValidator({ locale: 'id' }))
    const [, forceUpdate] = useState();
    // const forceUpdate = React.useReducer(() => ({}))[1]
    const { berita } = useSelector(state => state.detailBerita)
    const { loading, error, success } = useSelector(state => state.updatedBerita)
    const { loading: allLoading, error: allError, kategori } = useSelector((state) => state.allKategori);
    const { setting } = useSelector(state => state.allSettingPublikasi)

    useEffect(() => {

        // dispatch(getAllKategori())

        editorRef.current = {
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, //Added .CKEditor
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
            // Base64UploadAdapter: require('@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter')
        }

        setEditorLoaded(true)
        if (success) {
            // setJudulBerita('')
            // setIsiBerita('')
            // setGambar('')
            // setGambarPreview('/assets/media/default.jpg')
            // setKategoriId('')
            // setTag([])

            router.push({
                pathname: `/publikasi/berita`,
                query: { success: true }
            })
        }

    }, [dispatch, error, success, loading, router]);

    const [id, setId] = useState(berita.id)
    const [judul_berita, setJudulBerita] = useState(berita.judul_berita)
    const [isi_berita, setIsiBerita] = useState(berita.isi_berita);
    // const [gambar, setGambar] = useState(berita.gambar)
    const [gambar, setGambar] = useState(process.env.END_POINT_API_IMAGE_PUBLIKASI + "publikasi/images/" + berita.gambar)
    const [gambarDB, setGambardb] = useState(process.env.END_POINT_API_IMAGE_PUBLIKASI + "publikasi/images/" + berita.gambar);
    // const [gambarPreview, setGambarPreview] = useState("/assets/media/default.jpg") 
    const [iconPlus, setIconPlus] = useState(
        "/assets/icon/Add.svg"
    );
    const [gambarPreview, setGambarPreview] = useState(process.env.END_POINT_API_IMAGE_PUBLIKASI + "publikasi/images/" + berita.gambar);
    const [gambarName, setGambarName] = useState(berita.gambar)
    const [kategori_id, setKategoriId] = useState(berita.kategori_id)
    const [users_id, setUserId] = useState(berita.users_id)
    const [tag, setTag] = useState(berita.tag)
    const [publish, setPublish] = useState(berita.publish)
    // const [publish, setPublish] = useState(berita.publish === 1 ? true : false)
    const [_method, setMethod] = useState("put")
    // const [publishDate, setPublishDate] = useState(null);
    const [publishDate, setPublishDate] = useState(berita.tanggal_publish ? (new Date(berita.tanggal_publish)) : null);
    const [disablePublishDate, setDisablePublishDate] = useState(berita.publish === 0 ? true : false)
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
        setPublish(e.target.checked);
        setDisablePublishDate(!disablePublishDate)
        if (e.target.checked === false) {
            setPublishDate(null)
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
        e.preventDefault()
        if (simpleValidator.current.allValid() && disableTag === false) {
            if (error) {
                dispatch(clearErrors())
            }

            if (success) {
                dispatch({
                    // type: NEW_BERITA_RESET
                    type: UPDATE_BERITA_RESET
                })
            }

            if (publish === true) {
                setPublish(1)

            } else if (publish === false) {
                setPublish(0)

            }

            if (gambarDB !== gambar) {

                if (publishDate === null) {
                    let today = new Date

                    const data = {
                        judul_berita,
                        isi_berita,
                        gambar,
                        kategori_id,
                        users_id,
                        tag,
                        publish,
                        id,
                        _method,
                        tanggal_publish: moment(today).format("YYYY-MM-DD")
                    }

                    Swal.fire({
                        title: "Apakah anda yakin ?",
                        text: "Data ini akan diedit !",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Ya !",
                        cancelButtonText: "Batal",
                    })
                        .then((result) => {
                            if (result.isConfirmed) {
                                dispatch(updateBerita(data, token));
                            }
                        });

                } else {

                    const data = {
                        judul_berita,
                        isi_berita,
                        gambar,
                        kategori_id,
                        users_id,
                        tag,
                        publish,
                        id,
                        _method,
                        tanggal_publish: moment(publishDate).format("YYYY-MM-DD")
                    }

                    Swal.fire({
                        title: "Apakah anda yakin ?",
                        text: "Data ini akan diedit !",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Ya !",
                        cancelButtonText: "Batal",
                    })
                        .then((result) => {
                            if (result.isConfirmed) {
                                dispatch(updateBerita(data, token));
                            }
                        });
                }


            } else {

                if (publishDate === null) {
                    let today = new Date

                    const data = {
                        judul_berita,
                        isi_berita,
                        gambar: "",
                        kategori_id,
                        users_id,
                        tag,
                        publish,
                        id,
                        _method,
                        tanggal_publish: moment(today).format("YYYY-MM-DD")
                    }

                    Swal.fire({
                        title: "Apakah anda yakin ?",
                        text: "Data ini akan diedit !",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Ya !",
                        cancelButtonText: "Batal",
                    })
                        .then((result) => {
                            if (result.isConfirmed) {
                                dispatch(updateBerita(data, token));
                            }
                        });

                } else {
                    const data = {
                        judul_berita,
                        isi_berita,
                        gambar: "",
                        kategori_id,
                        users_id,
                        tag,
                        publish,
                        id,
                        _method,
                        tanggal_publish: moment(publishDate).format("YYYY-MM-DD")
                    }

                    Swal.fire({
                        title: "Apakah anda yakin ?",
                        text: "Data ini akan diedit !",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Ya !",
                        cancelButtonText: "Batal",
                    })
                        .then((result) => {
                            if (result.isConfirmed) {
                                dispatch(updateBerita(data, token));
                            }
                        });
                }

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
    }

    const onNewReset = () => {
        dispatch({
            // type: NEW_BERITA_RESET 
            type: UPDATE_BERITA_RESET
        })
    }

    return (
        <>
            {/* {
                console.log(berita)
            } */}
            {/* {
                console.log(setting)
            } */}
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
                    : ""
                }
                {/* {success ?
                    <div className="alert alert-custom alert-light-success fade show mb-5" role="alert">
                        <div className="alert-icon"><i className="flaticon2-checkmark"></i></div>
                        <div className="alert-text">{success}</div>
                        <div className="alert-close">
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={onNewReset} >
                                <span aria-hidden="true"><i className="ki ki-close"></i></span>
                            </button>
                        </div>
                    </div>
                    : ''
                } */}

                <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
                    {
                        loading ?
                            <LoadingPage loading={loading} />
                            : ''
                    }
                    <div className="card card-custom card-stretch gutter-b">
                        <div className="card-header">
                            <h3 className="col-sm-4 card-title font-weight-bolder text-dark">Ubah Berita</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label font-weight-bolder">Judul</label>
                                    <div className="col-sm-12">
                                        <input type="text" className="form-control" placeholder="Isi Judul disini" value={judul_berita} onChange={(e) => setJudulBerita(e.target.value)} onBlur={() => simpleValidator.current.showMessageFor("judul_berita")} />
                                        {simpleValidator.current.message(
                                            "judul_berita",
                                            judul_berita,
                                            "required|min:5|max:200",
                                            { className: "text-danger" }
                                        )}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="staticEmail" className="col-sm-4 col-form-label font-weight-bolder">Isi Berita</label>
                                    <div className="col-sm-12">
                                        <div className="ckeditor">
                                            {editorLoaded ? <CKEditor
                                                ck-editor__editable
                                                editor={ClassicEditor}
                                                data={isi_berita}
                                                onReady={editor => {
                                                    // You can store the "editor" and use when it is needed.
                                                    // console.log('Editor is ready to use!', editor);
                                                }}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData()
                                                    setIsiBerita(data);
                                                }}
                                                onBlur={() =>
                                                    simpleValidator.current.showMessageFor(
                                                        "isi_berita"
                                                    )
                                                }
                                                config={{ placeholder: "Tulis Deskripsi" }}
                                            /> : <p>Tunggu Sebentar</p>}
                                            {simpleValidator.current.message(
                                                "isi_berita",
                                                isi_berita,
                                                "required|min:100|max:12000",
                                                { className: "text-danger" }
                                            )}
                                        </div>
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
                                            className="avatar item-rtl"
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
                                            Resolusi yang direkomendasikan adalah 1024 * 512. Fokus visual pada bagian tengah gambar
                                        </p>

                                    </div>

                                </div>

                                {/* <div className="form-group row">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Upload Thumbnail</label>
                                    <div className="col-sm-1">
                                        <figure className='avatar item-rtl' data-toggle="modal" data-target="#exampleModalCenter">
                                            <Image
                                                loader={() => gambarPreview}
                                                src={gambarPreview}
                                                alt='image'
                                                width={60}
                                                height={60}
                                            />
                                        </figure>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className="input-group">
                                            <div className="custom-file">
                                                <input type="file" name='gambar' className="custom-file-input" id="inputGroupFile04" onChange={onChangeGambar} accept="image/*"/>
                                                <label className="custom-file-label" htmlFor="inputGroupFile04">Pilih file</label>
                                            </div>
                                        </div>
                                        <small>{gambarName}</small>
                                    </div>
                                </div> */}


                                <div className="form-group">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label font-weight-bolder">Kategori</label>
                                    <div className="col-sm-12">
                                        <select name="" id="" className='form-control' value={kategori_id} onChange={e => setKategoriId(e.target.value)} onBlur={e => { setKategoriId(e.target.value); simpleValidator.current.showMessageFor('kategori_id') }} >
                                            <option selected disabled value=''>-- Berita --</option>
                                            {!kategori || (kategori && kategori.length === 0) ? (
                                                <option value="">Data Tidak Ditemukan</option>
                                            ) : (
                                                kategori && kategori.kategori && kategori.kategori.map((row) => {
                                                    return (
                                                        row.jenis_kategori == "Berita" ?
                                                            <option key={row.id} value={row.id} selected={kategori_id === row.id ? true : false}>
                                                                {row.nama_kategori}
                                                            </option>
                                                            :
                                                            null
                                                        // <option key={row.id} value={row.id} selected={kategori_id === row.id ? true : false}>{row.jenis_kategori}</option>
                                                    )
                                                })
                                            )}

                                        </select>
                                        {simpleValidator.current.message('kategori_id', kategori_id, 'required', { className: 'text-danger' })}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label font-weight-bolder">Tag</label>
                                    <div className="col-sm-12">
                                        <TagsInput
                                            value={tag}
                                            onChange={(data) => handleTag(data)}
                                            // onChange={setTag}
                                            name="tag"
                                            placeHolder="Isi Tag disini dan tekan `Enter` atau `Tab`."
                                            seprators={["Enter", "Tab"]}
                                        />
                                        {
                                            disableTag === true ?
                                                <p className="text-danger">
                                                    Tag tidak bisa terdiri dari "SPACE" character saja
                                                </p>
                                                :
                                                null
                                        }
                                        {/* <input type="text" className="form-control" placeholder="Isi Tag disini" value={tag} onChange={e => setTag(e.target.value)} /> */}
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
                                                {/* {
                                                    disablePublishDate === true ?
                                                        <small className="text-muted">Harap ubah status publikasi menjadi aktif untuk mengisi Tanggal Publish</small>
                                                    :
                                                        null
                                                } */}
                                            </div>
                                        </div>
                                        :
                                        null
                                }



                                <div className="form-group row">
                                    <div className="col-sm-2"></div>
                                    <div className="col-sm-10 text-right">
                                        <Link href='/publikasi/berita'>
                                            <a className='btn btn-white-ghost-rounded-full rounded-pill mr-2 btn-sm'>Kembali</a>
                                        </Link>
                                        <button className='btn btn-primary-rounded-full rounded-pill btn-sm'>Simpan</button>
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
                            <div className="modal-body text-center" style={{ height: '400px' }}>
                                <Image
                                    src={gambarPreview}
                                    alt='image'
                                    layout='fill'
                                    objectFit='cover'
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Tutup</button>
                            </div>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </>
    )
}


export default EditBerita