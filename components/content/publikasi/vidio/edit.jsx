import React, { useState, useRef, useEffect } from 'react';

import Link from 'next/link'
import Image from 'next/image'
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from "next/router";
import { TagsInput } from "react-tag-input-component";
import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import DatePicker from 'react-datepicker'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { updateVideo, clearErrors } from '../../../../redux/actions/publikasi/video.actions'
import { NEW_ARTIKEL_RESET, UPDATE_VIDEO_RESET } from '../../../../redux/types/publikasi/video.type'
import { getAllKategori } from '../../../../redux/actions/publikasi/kategori.actions'
import PageWrapper from '../../../wrapper/page.wrapper';
import LoadingPage from '../../../LoadingPage';

const EditVideo = ({ token }) => {
    const editorRef = useRef()
    const dispatch = useDispatch()
    const router = useRouter();

    const importSwitch = () => import('bootstrap-switch-button-react')
    const [editorLoaded, setEditorLoaded] = useState(false)
    const { CKEditor, ClassicEditor, Base64UploadAdapter } = editorRef.current || {}
    const SwitchButton = dynamic(importSwitch, {
        ssr: false
    })
    const simpleValidator = useRef(new SimpleReactValidator({
        locale: "id"
    }));
    const [, forceUpdate] = useState();
    const { video } = useSelector(state => state.detailVideo)
    const { error, success, loading } = useSelector(state => state.updatedVideo)
    const { loading: allLoading, error: allError, kategori } = useSelector((state) => state.allKategori);
    const { setting } = useSelector(state => state.allSettingPublikasi)

    useEffect(() => {

        // dispatch(getAllKategori())

        // editorRef.current = {
        //     CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, //Added .CKEditor
        //     ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
        //     // Base64UploadAdapter: require('@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter')
        // }

        setEditorLoaded(true)
        if (success) {

            router.push({
                pathname: `/publikasi/video`,
                query: { success: true }
            })
        }

    }, [dispatch, error, success, router]);

    const [id, setId] = useState(video.id)
    const [judul_video, setJudulVideo] = useState(video.judul_video)
    const [isi_video, setIsiVideo] = useState(video.isi_video);
    const [gambar, setGambar] = useState(process.env.END_POINT_API_IMAGE_PUBLIKASI + "publikasi/images/" + video.gambar);
    const [url_video, setUrlVideo] = useState(video.url_video)
    // const [gambarPreview, setGambarPreview] = useState('/assets/media/default.jpg') //belum
    const [iconPlus, setIconPlus] = useState(
        "/assets/icon/Add.svg"
    );
    const [gambarDB, setGambardb] = useState(process.env.END_POINT_API_IMAGE_PUBLIKASI + "publikasi/images/" + video.gambar);
    const [gambarPreview, setGambarPreview] = useState(process.env.END_POINT_API_IMAGE_PUBLIKASI + "publikasi/images/" + video.gambar);
    const [gambarName, setGambarName] = useState(video.gambar)
    // const [kategori_id, setKategoriId] = useState(video.kategori) 
    const [kategori_id, setKategoriId] = useState(video.kategori_id)
    const [users_id, setUserId] = useState(video.users_id)
    const [tag, setTag] = useState(video.tag)
    const [publish, setPublish] = useState(video.publish)
    // const [publish, setPublish] = useState(video.publish === 1 ? true : false)
    const [_method, setMethod] = useState("put")
    const [publishDate, setPublishDate] = useState(new Date(video.tanggal_publish));
    const [disablePublishDate, setDisablePublishDate] = useState(video.publish === 0 ? true : false)
    const [disableTag, setDisableTag] = useState(false)

    // const handleTag = (data) => {
    //     for (let i = 0; i < data.length; i++) {
    //         for (let j = 0; j < data[i].length; j++) {
    //             if (data[i][j] === " ") {
    //                 setDisableTag(true)
    //             } else {
    //                 setDisableTag(false)
    //             }
    //         }
    //     }
    //     setTag(data)
    // }

    function hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
    }

    const handleTag = (data) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            if (hasWhiteSpace(data[i])) {
                data.splice([i], 1);
            }
            // console.log(hasWhiteSpace(data[i]));
            // if(data[i] === " "){
            //     console.log(data[i]);
            //     data.splice(i, 1);
            // }
            // for (let j = 0; j < data[i].length; j++) {
            //     if (data[i][j] === " ") {
            //         data.splice(index, 1);
            //         // setDisableTag(true)
            //     }
            // }
        }
        setTag(data);
        // setTag(data)
    }

    const onChangeGambar = (e) => {
        const type = ["image/jpg", "image/png", "image/jpeg"]
        // console.log (e.target.files[0].type)
        // console.log (e.target.files[0])
        // console.log ("check")

        if (type.includes(e.target.files[0].type)) {
            if (e.target.files[0].size > parseInt(setting[0].max_size) + '000000') {
                e.target.value = null;
                Swal.fire("Oops !", "Data Image Melebihi Ketentuan", "error");
            } else {
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        // console.log(reader)
                        setGambar(reader.result);
                        setGambarPreview(reader.result);
                    }
                };
                // console.log(reader.onload)
                reader.readAsDataURL(e.target.files[0])
                // console.log (reader.readAsDataURL(e.target.files[0]))
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
        // setPublish(e.target.checked);
        setDisablePublishDate(!disablePublishDate)
        // console.log (e.target.checked)

        if (e.target.checked === false) {
            setPublishDate(null)
            setPublish(0)
        } else {
            setPublish(1)
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
                    // type: NEW_ARTIKEL_RESET
                    type: UPDATE_VIDEO_RESET,
                });
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
                        judul_video,
                        isi_video,
                        gambar,
                        kategori_id,
                        users_id,
                        tag,
                        publish,
                        id,
                        _method,
                        tanggal_publish: moment(today).format("YYYY-MM-DD"),
                        url_video
                    };

                    // dispatch(updateArtikel(data));

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
                                // if (success) {
                                //   dispatch({
                                //     // type: NEW_ARTIKEL_RESET
                                //     type: UPDATE_ARTIKEL_RESET,
                                //   });
                                // }

                                dispatch(updateVideo(data, token));
                                // console.log(data)
                            }
                        });
                } else {

                    const data = {
                        judul_video,
                        isi_video,
                        gambar,
                        kategori_id,
                        users_id,
                        tag,
                        publish,
                        id,
                        _method,
                        tanggal_publish: moment(publishDate).format("YYYY-MM-DD"),
                        url_video
                    };

                    // dispatch(updateArtikel(data));

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
                                // if (success) {
                                //   dispatch({
                                //     // type: NEW_ARTIKEL_RESET
                                //     type: UPDATE_ARTIKEL_RESET,
                                //   });
                                // }

                                dispatch(updateVideo(data, token));
                                // console.log(data)
                            }
                        });
                }


            } else {
                if (publishDate === null) {
                    let today = new Date

                    const data = {
                        judul_video,
                        isi_video,
                        gambar: "",
                        kategori_id,
                        users_id,
                        tag,
                        publish,
                        id,
                        _method,
                        tanggal_publish: moment(today).format("YYYY-MM-DD"),
                        url_video
                    };

                    // dispatch(updateArtikel(data));

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
                                // if (success) {
                                //   dispatch({
                                //     // type: NEW_ARTIKEL_RESET
                                //     type: UPDATE_ARTIKEL_RESET,
                                //   });
                                // }

                                dispatch(updateVideo(data, token));
                                // console.log(data)
                            }
                        });

                } else {
                    const data = {
                        judul_video,
                        isi_video,
                        gambar: "",
                        kategori_id,
                        users_id,
                        tag,
                        publish,
                        id,
                        _method,
                        tanggal_publish: moment(publishDate).format("YYYY-MM-DD"),
                        url_video
                    };

                    // dispatch(updateArtikel(data));

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
                                // if (success) {
                                //   dispatch({
                                //     // type: NEW_ARTIKEL_RESET
                                //     type: UPDATE_ARTIKEL_RESET,
                                //   });
                                // }

                                dispatch(updateVideo(data, token));
                                // console.log(data)
                            }
                        });
                }

            }

            // const data = {
            //   judul_artikel,
            //   isi_artikel,
            //   gambar,
            //   kategori_id,
            //   users_id,
            //   tag,
            //   publish,
            //   id,
            //   _method,
            // };

            // // dispatch(updateArtikel(data));

            // Swal.fire({
            //   title: "Apakah anda yakin ?",
            //   text: "Data ini akan diedit !",
            //   icon: "warning",
            //   showCancelButton: true,
            //   confirmButtonColor: "#3085d6",
            //   cancelButtonColor: "#d33",
            //   confirmButtonText: "Ya !",
            //   cancelButtonText: "Batal",
            // })
            //   .then((result) => {
            //     if (result.isConfirmed) {
            //       // if (success) {
            //       //   dispatch({
            //       //     // type: NEW_ARTIKEL_RESET
            //       //     type: UPDATE_ARTIKEL_RESET,
            //       //   });
            //       // }

            //       dispatch(updateArtikel(data));
            //       console.log(data)
            //     }
            // });

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

    const onNewReset = () => {
        dispatch({
            type: UPDATE_VIDEO_RESET
        })
    }

    // const onSetPublish = (e) => {
    //     Swal.fire({
    //         title: 'Ubah status publikasi?',
    //         text: "Status publikasi akan berubah",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Ya !",
    //         cancelButtonText: "Batal",
    //       })

    //       .then((result) => {
    //         if (result.isConfirmed) {
    //           Swal.fire(
    //             'Berhasil',
    //             'Status publikasi telah diubah',
    //             'success'
    //           )

    //         //   console.log (e)
    //           setPublish(e)

    //         } else {
    //             Swal.fire(
    //                 'Batal',
    //                 'Status publikasi telah batal diubah',
    //                 'info'
    //               )

    //             // console.log (!e)
    //             setPublish(!e)
    //         }
    //       })

    //     // Swal.fire (
    //     //     'Berhasil',
    //     //     'Status publikasi telah diubah',
    //     //     'success'
    //     // )

    //     // setPublish(e)
    // }

    return (
        <>
            <PageWrapper>
                {console.log(video)}
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
                            <h3 className="card-title font-weight-bolder text-dark">Ubah Video</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label font-weight-bolder">Judul</label>
                                    <div className="col-sm-12">
                                        <input type="text" className="form-control" placeholder="Isi Judul disini" value={judul_video} onChange={(e) => setJudulVideo(e.target.value)} onBlur={() => simpleValidator.current.showMessageFor("judul_video")} />
                                        {simpleValidator.current.message(
                                            "judul_video",
                                            judul_video,
                                            "required||min:5|max:200",
                                            { className: "text-danger" }
                                        )}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label font-weight-bolder">Deskripsi</label>
                                    <div className="col-sm-12">
                                        <textarea className="form-control" rows="10" placeholder="Deskripsi video" value={isi_video} onChange={e => setIsiVideo(e.target.value)} onBlur={() => simpleValidator.current.showMessageFor("isi_video")} />
                                        {simpleValidator.current.message("isi_video", isi_video, "required|min:5|max:5000", { className: "text-danger" })}
                                        {/* <small className='text-danger'>*Minimum 50 Karakter dan Maksimal 160 Karakter</small> */}
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

                                <div className="form-group">
                                    <label htmlFor="staticEmail" className="col-sm-4 col-form-label font-weight-bolder">Link URL Video:</label>
                                    <div className="col-sm-12 input-group">
                                        {/* <div className="input-group-prepend">
                                            <div className="input-group-text">https://</div>
                                        </div> */}
                                        <input type="text" className="form-control ml-1" placeholder="https://www.example.com" value={url_video} onChange={(e) => setUrlVideo(e.target.value)} onBlur={() => simpleValidator.current.showMessageFor("url_video")} />
                                    </div>

                                    {simpleValidator.current.message(
                                        "url_video",
                                        url_video,
                                        "required|url",
                                        { className: "text-danger ml-4" }
                                    )}

                                </div>

                                {/* {
                                    console.log (kategori)
                                }
                                {
                                    console.log (kategori_id)
                                }
                                {
                                    console.log(video)
                                } */}

                                <div className="form-group">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label font-weight-bolder">Kategori</label>
                                    <div className="col-sm-12">
                                        <select name="" id="" className='form-control' value={kategori_id} onChange={e => setKategoriId(e.target.value)} onBlur={e => { setKategoriId(e.target.value); simpleValidator.current.showMessageFor('kategori_id') }} >
                                            <option selected disabled value=''>-- Video --</option>
                                            {!kategori || (kategori && kategori.length === 0) ? (
                                                <option value="">Data Tidak Ditemukan</option>
                                            ) : (
                                                kategori && kategori.kategori && kategori.kategori.map((row) => {
                                                    return (
                                                        row.jenis_kategori == "Video" ?
                                                            <option key={row.id} value={row.id} selected={kategori_id === row.id ? true : false}>
                                                                {row.nama_kategori}
                                                            </option>

                                                            :
                                                            null
                                                    );
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
                                            name="fruits"
                                            placeHolder="Isi Tag disini"
                                        // onBlur={() => simpleValidator.current.showMessageFor('tag')}
                                        />
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

                                {/* <div className="form-group row">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Publish</label>
                                    <div className="col-sm-1">
                                        <SwitchButton
                                            checked={publish}
                                            onlabel=' '
                                            onstyle='primary'
                                            offlabel=' '
                                            offstyle='danger'
                                            size='sm'
                                            width={30}
                                            // onChange={(checked) => onSetPublish(checked)}
                                            // onClick={(checked) => onSetPublish(checked)}
                                            onChange={(checked) => setPublish(checked)}
                                        />
                                    </div>
                                </div> */}

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
                                                        disabled={disablePublishDate === true || disablePublishDate === null}
                                                    // minDate={addDays(new Date(), 20)}
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
                                        <Link href='/publikasi/video'>
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

export default EditVideo