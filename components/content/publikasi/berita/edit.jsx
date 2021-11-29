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

import styles from "../../../../styles/previewGaleri.module.css";

import { updateBerita, clearErrors } from '../../../../redux/actions/publikasi/berita.actions'
import { NEW_BERITA_RESET, UPDATE_BERITA_RESET } from '../../../../redux/types/publikasi/berita.type'
// import { getAllKategori } from '../../../../redux/actions/publikasi/kategori.actions'
import PageWrapper from '../../../wrapper/page.wrapper';
import LoadingPage from '../../../LoadingPage';
import { useQuill } from "react-quilljs";

const EditBerita = ({ token, idUser }) => {
    const editorRef = useRef()
    const dispatch = useDispatch()
    const router = useRouter();

    const importSwitch = () => import('bootstrap-switch-button-react')
    const [editorLoaded, setEditorLoaded] = useState(false)

    const SwitchButton = dynamic(importSwitch, {
        ssr: false
    })

    const simpleValidator = useRef(new SimpleReactValidator({ locale: 'id' }))
    const [, forceUpdate] = useState();
    const { berita } = useSelector(state => state.detailBerita)
    const { loading, error, success } = useSelector(state => state.updatedBerita)
    const { loading: allLoading, error: allError, kategori } = useSelector((state) => state.allKategori);
    const { setting } = useSelector(state => state.allSettingPublikasi)
    const { akademi } = useSelector(state => state.allAkademi);
    const { role_permission } = useSelector((state) => state.allRolePermission);

    const { quill, quillRef } = useQuill();
    const limit = 12000

    useEffect(() => {
        if (quill) {
            quill.clipboard.dangerouslyPasteHTML(isi_berita);
            quill.on('text-change', (delta, oldDelta, source) => {
                setIsiBerita(quill.root.innerHTML); // Get innerHTML using quill

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

        setEditorLoaded(true)
        if (success) {
            router.push({
                pathname: `/publikasi/berita`,
                query: { success: true }
            })
        }

    }, [dispatch, error, success, loading, router, quill]);

    const [id, setId] = useState(berita.id)
    const [judul_berita, setJudulBerita] = useState(berita.judul_berita)
    const [isi_berita, setIsiBerita] = useState(berita.isi_berita);
    const [gambar, setGambar] = useState(process.env.END_POINT_API_IMAGE_PUBLIKASI + "publikasi/images/" + berita.gambar)
    const [gambarDB, setGambardb] = useState(process.env.END_POINT_API_IMAGE_PUBLIKASI + "publikasi/images/" + berita.gambar);
    const [iconPlus, setIconPlus] = useState(
        "/assets/icon/Add.svg"
    );
    const [gambarPreview, setGambarPreview] = useState(process.env.END_POINT_API_IMAGE_PUBLIKASI + "publikasi/images/" + berita.gambar);
    const [gambarName, setGambarName] = useState(berita.gambar)
    const [kategori_id, setKategoriId] = useState(berita.kategori_id)
    const [users_id, setUserId] = useState(berita.users_id)
    const [kategori_akademi, setKategoriAkademi] = useState(berita.kategori_akademi);
    const [tag, setTag] = useState(berita.tag)
    const [publish, setPublish] = useState(berita.publish)
    const [_method, setMethod] = useState("put")
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
            e.target.value = null
            Swal.fire(
                'Oops !',
                'Data yang bisa dimasukkan hanya berupa data gambar.',
                'error'
            )
        }
    };

    const handleChangePublish = e => {
        setDisablePublishDate(!disablePublishDate);
        setPublishDate(null);

        if (e.target.checked === false) {
            setPublishDate(null);
            setPublish(0);
        } else {
            setPublish(1);
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
                        kategori_akademi,
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
                        kategori_akademi,
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
                        kategori_akademi,
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
                        kategori_akademi,
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
            type: UPDATE_BERITA_RESET
        })
    }

    return (
        <>
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
                            <div>
                                <div className="form-group">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label font-weight-bolder">Judul</label>
                                    <div className={`${styles.judulTambah} col-sm-12`}>
                                        <input type="text" className={`${styles.judulTambah} form-control`} placeholder="Isi Judul disini" value={judul_berita} onChange={(e) => setJudulBerita(e.target.value)} onBlur={() => simpleValidator.current.showMessageFor("judul_berita")} />
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
                                    <div className={`${styles.deskripsiTambah} col-sm-12`}>
                                        <div className="ckeditor">
                                            {editorLoaded ?
                                                <div style={{ width: "100%", height: "300px" }}>
                                                    <div
                                                        ref={quillRef}
                                                    />
                                                </div>
                                                :
                                                <p>Tunggu Sebentar</p>}
                                            {simpleValidator.current.message(
                                                "isi_berita",
                                                isi_berita,
                                                "required",
                                                { className: "text-danger" }
                                            )}
                                        </div>
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
                                            Resolusi yang direkomendasikan adalah 837 * 640. Fokus visual pada bagian tengah gambar
                                        </p>

                                    </div>

                                </div>


                                <div className="form-group">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label font-weight-bolder">Akademi</label>
                                    <div className={`${styles.selectKategori} col-sm-12`}>
                                        <select name="" id="" className={`${styles.selectKategori} form-control`} value={kategori_akademi} onChange={e => setKategoriAkademi(e.target.value)} onBlur={e => { setKategoriAkademi(e.target.value); simpleValidator.current.showMessageFor('akademi') }} >
                                            <option selected disabled value=''>-- Akademi --</option>
                                            {!akademi || (akademi && akademi.length === 0) ? (
                                                <option value="">Data Tidak Ditemukan</option>
                                            ) : (
                                                akademi && akademi.map((row) => {
                                                    return (
                                                        <option key={row.id} value={row.slug} selected={kategori_akademi === row.slug ? true : false}>
                                                            {row.slug}
                                                        </option>
                                                    )
                                                })
                                            )}

                                        </select>
                                        {simpleValidator.current.message('akademi', kategori_akademi, 'required', { className: 'text-danger' })}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label font-weight-bolder">Kategori</label>
                                    <div className={`${styles.selectKategori} col-sm-12`}>
                                        <select name="" id="" className={`${styles.selectKategori} form-control`} value={kategori_id} onChange={e => setKategoriId(e.target.value)} onBlur={e => { setKategoriId(e.target.value); simpleValidator.current.showMessageFor('kategori') }} >
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
                                                    )
                                                })
                                            )}

                                        </select>
                                        {simpleValidator.current.message('kategori', kategori_id, 'required', { className: 'text-danger' })}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label font-weight-bolder">Tag</label>
                                    <div className={`${styles.tagStyle} col-sm-12`} style={{ wordBreak: 'break-word' }}>
                                        <TagsInput
                                            value={tag}
                                            onChange={(data) => {
                                                handleTag(data)
                                                setDisableTag(false)
                                            }}
                                            onExisting={(data) => setDisableTag(true)}
                                            name="tag"
                                            placeHolder="Isi Tag disini dan Enter"
                                            seprators={["Enter", "Tab"]}
                                        />
                                        {
                                            disableTag === true ?
                                                <p className="text-danger">
                                                    Tag tidak boleh sama
                                                </p>
                                                :
                                                null
                                        }
                                    </div>
                                </div>

                                {
                                    role_permission.roles.includes("Super Admin") ?
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
                                        : null
                                }

                                {
                                    role_permission.roles.includes("Super Admin") ?
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
                                            null : null
                                }



                                <div className="form-group row mr-0">
                                    <div className="col-sm-2"></div>
                                    <div className="col-sm-10 text-right">
                                        <Link href='/publikasi/berita'>
                                            <a className={`${styles.btnKembali} btn btn-white-ghost-rounded-full rounded-pill mr-2 btn-sm`}>Kembali</a>
                                        </Link>
                                        <button onClick={onSubmit} className={`${styles.btnSimpan} btn btn-primary-rounded-full rounded-pill btn-sm`}>Simpan</button>
                                    </div>
                                </div>
                            </div>
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
        </>
    )
}


export default EditBerita