import React, { useState, useRef, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import SimpleReactValidator from 'simple-react-validator'
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from 'react-dropzone';
import { useRouter } from "next/router";
// import { withContext as ReactTags } from "react-tag-input"
import { TagsInput } from "react-tag-input-component";
import Swal from "sweetalert2";
import DatePicker from 'react-datepicker'


import styles from "../../../../styles/previewGaleri.module.css";

import {
    updateGaleri,
    clearErrors,
} from "../../../../redux/actions/publikasi/galeri.actions";
import {
    NEW_GALERI_RESET,
    UPDATE_GALERI_RESET,
} from "../../../../redux/types/publikasi/galeri.type";
import { getAllKategori } from '../../../../redux/actions/publikasi/kategori.actions'
import PageWrapper from "../../../wrapper/page.wrapper";
import LoadingPage from "../../../LoadingPage";

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 250,
    height: 150,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};


const EditGaleri = ({ token }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const importSwitch = () => import("bootstrap-switch-button-react");
    const SwitchButton = dynamic(importSwitch, {
        ssr: false,
    });

    // const { artikel, error, success } = useSelector(state => state.detailArtikel)
    const simpleValidator = useRef(new SimpleReactValidator({ locale: 'id' }))
    const { galeri } = useSelector((state) => state.detailGaleri);
    const { error, success, loading } = useSelector((state) => state.updatedGaleri);
    const { loading: allLoading, error: allError, kategori } = useSelector((state) => state.allKategori);
    const { setting } = useSelector(state => state.allSettingPublikasi)
    const { role_permission } = useSelector((state) => state.allRolePermission);

    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <Image
                    loader={() => file.preview}
                    src={file.preview}
                    alt="thumb"
                    width={250}
                    height="100%"
                    display="block"
                    objectFit="fill"

                />
                {/* <img
                    src={file.preview}
                    alt="thumb"
                    width= '10vh'
                    height= '10vh'>
                </img> */}
            </div>
        </div>
    ));

    useEffect(() => {

        handleDataToArr(galeri.gambar)

        files.forEach(file => URL.revokeObjectURL(file.preview));

        if (success) {
            router.push({
                pathname: `/publikasi/galeri`,
                query: { success: true }
            })
        }
    }, [dispatch, error, success, files, router, galeri.gambar]);

    const [id, setId] = useState(galeri.id_gallery);
    const [judul, setJudulGaleri] = useState(galeri.judul);
    const [isi_galleri, setIsiGaleri] = useState(galeri.isi_galeri);
    const [gambar, setGambar] = useState(galeri.gambar);
    //   const [gambarPreview, setGambarPreview] = useState(
    //     "/assets/media/default.jpg"
    //   ); //belum
    const [kategori_id, setKategoriId] = useState(galeri.kategori_id); //belum
    const [users_id, setUserId] = useState(galeri.users_id);
    const [tag, setTag] = useState(galeri.tag);
    // const [publish, setPublish] = useState(galeri.publish === 1 ? true : false);
    const [publish, setPublish] = useState(galeri.publish);
    const [_method, setMethod] = useState("put");
    const [publishDate, setPublishDate] = useState(galeri.tanggal_publish ? new Date(galeri.tanggal_publish) : null);
    const [disablePublishDate, setDisablePublishDate] = useState(galeri.publish === 0 ? true : false)
    const [image, setImage] = useState(null)
    const [totalImage, setTotalImage] = useState(1)
    const [disableTag, setDisableTag] = useState(false)
    const [deleteImg, setDeleteImg] = useState([])

    const handleDataToArr = (data) => {
        let arr = []
        for (let i = 0; i < data.length; i++) {
            // const reader = new FileReader();
            // getBase64FromUrl(process.env.END_POINT_API_IMAGE_PUBLIKASI + "publikasi/images/" + data[i].gambar)
            let obj = {
                id: data[i].id,
                imageName: data[i].gambar,
                imagePreview: process.env.END_POINT_API_IMAGE_PUBLIKASI + "publikasi/images/" + data[i].gambar,
                imageBase64: process.env.END_POINT_API_IMAGE_PUBLIKASI + "publikasi/images/" + data[i].gambar,
                // imageBase64: reader.readAsDataURL(process.env.END_POINT_API_IMAGE_PUBLIKASI + "publikasi/images/" + data[i].gambar)
                // imageBase64: getBase64Image(process.env.END_POINT_API_IMAGE_PUBLIKASI + "publikasi/images/" + data[i].gambar)
                // imageBase64: getBase64FromUrl(process.env.END_POINT_API_IMAGE_PUBLIKASI + "publikasi/images/" + data[i].gambar)
            }

            arr.push(obj)
        }
        setImage(arr)
        setTotalImage(data.length)
    }

    const onChangeImage = (e, index) => {
        const type = ["image/jpg", "image/png", "image/jpeg"];
        let list = [...image];
        if (type.includes(e.target.files[0].type)) {
            if (e.target.files[0].size > parseInt(setting[0].max_size) + '000000') {
                e.target.value = null;
                Swal.fire("Oops !", "Data Image Melebihi Ketentuan", "error");
            } else {
                list[index].imageFile = e.target.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        list[index].imagePreview = reader.result;
                        list[index].imageBase64 = reader.result;
                        // list[index].imageFile = e.target.files[0];
                        // list[index].imagePreview = URL.createObjectURL(e.target.files[0]);
                        // list[index].imageName = e.target.files[0].name;
                        setImage(list);
                    }
                };
                reader.readAsDataURL(e.target.files[0]);
                list[index].imageName = e.target.files[0].name;
            }
        } else {
            e.target.value = null;
            Swal.fire(
                "Oops !",
                "Data yang bisa dimasukkan hanya berupa data gambar.",
                "error"
            );
        }
    };

    const handleChangePublish = (e) => {
        setDisablePublishDate(!disablePublishDate)
        setPublishDate(null)

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

    const onDeleteImage = (index) => {

        if (totalImage === 1) {
            Swal.fire(
                "Oops !",
                "Harus memasukkan minimal 1 Gambar !",
                "error"
            );
        } else {
            const list = [...image];
            list.splice(index, 1);
            setImage(list);
            setTotalImage((totalImage) - 1)
            setDeleteImg([
                ...deleteImg,
                {
                    gambar: gambar[index].gambar,
                    id: gambar[index].id
                }
            ])
        }
    };

    const onAddImage = () => {
        setImage([
            ...image,
            {
                imageName: "",
                id: ""
            },
        ]);
        setTotalImage((totalImage) + 1)
    };


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

    const handleData = (temps, onCall) => {
        if (publishDate === null) {
            let today = new Date

            const data = {
                judul,
                isi_galleri,
                gambar: temps,
                kategori_id: Number(kategori_id),
                users_id,
                tag,
                publish,
                tanggal_publish: moment(today).format("YYYY-MM-DD"),
                id,
                _method,
                image_delete: deleteImg
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
                        dispatch(onCall(data, token))
                    }
                });
        } else {
            const data = {
                judul,
                isi_galleri,
                gambar: temps,
                kategori_id: Number(kategori_id),
                users_id,
                tag,
                publish,
                tanggal_publish: moment(publishDate).format("YYYY-MM-DD"),
                id,
                _method,
                image_delete: deleteImg
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
                        dispatch(onCall(data, token))
                    }
                });
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (simpleValidator.current.allValid()) {
            if (image[0].imageName === "") {
                Swal.fire(
                    "Oops !",
                    "Harus memasukkan minimal 1 Gambar !",
                    "error"
                );
            } else {
                if (error) {
                    dispatch(clearErrors())
                }

                if (success) {
                    dispatch({
                        type: UPDATE_GALERI_RESET,
                    });
                }

                if (publish === true) {
                    setPublish(1)

                } else if (publish === false) {
                    setPublish(0)
                }

                let temps = []

                let flag = 0

                for (let i = 0; i < image.length; i++) {
                    flag += 1

                    if (image[i].imageBase64 !== undefined) {
                        // temps.push(image[i])
                        temps.push(image[i].imageBase64)
                    }

                    if (flag === image.length) {
                        handleData(temps, updateGaleri)
                    }
                }
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
        dispatch({
            type: UPDATE_GALERI_RESET,
        });
    };


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
                {loading ? <LoadingPage loading={loading} /> : ""}
                <div className="card card-custom card-stretch gutter-b">
                    <div className="card-header">
                        <h3 className="card-title font-weight-bolder text-dark">Ubah Galeri</h3>
                    </div>
                    <div className="card-body">
                        <div>
                            <div className="form-group">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label font-weight-bolder">Judul</label>
                                <div className={`${styles.judulTambah} col-sm-12`}>
                                    <input type="text" className="form-control" placeholder="Masukkan Judul disini" value={judul} onChange={(e) => setJudulGaleri(e.target.value)} onBlur={() => simpleValidator.current.showMessageFor("judul_galeri")} />
                                    {simpleValidator.current.message(
                                        "judul_galeri",
                                        judul,
                                        "required|min:5|max:200",
                                        { className: "text-danger" }
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="staticEmail" className="col-sm-4 col-form-label font-weight-bolder">Deskripsi Galeri</label>
                                <div className={`${styles.deskripsiTambah} col-sm-12`}>
                                    <textarea className='form-control' placeholder='Isi deskripsi foto disini' name="deskripsi" id="" rows="10" onChange={e => setIsiGaleri(e.target.value)} value={isi_galleri} onBlur={() => simpleValidator.current.showMessageFor("isi_galleri")}></textarea>
                                    {simpleValidator.current.message("isi_galleri", isi_galleri, "required|min:5|max:5000", { className: "text-danger" })}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="staticEmail" className="col-sm-4 col-form-label font-weight-bolder">Upload Gambar</label>

                                {
                                    image ?
                                        <div className="form-group mb-4">
                                            <div className="row align-items-center ml-4">
                                                {image.map((row, i) => (
                                                    <div className={`${styles.imgPrevTambah} col-4 col-md-2 col-lg-2 p-0 mb-2`} key={row.id}>
                                                        <div
                                                            className="position-relative mx-auto mt-5"
                                                            style={{ maxWidth: "max-content" }}
                                                        >
                                                            <figure
                                                                className="avatar item-rtl position-relative"
                                                                data-toggle="modal"
                                                                data-target="#exampleModalCenter"
                                                            >
                                                                <Image
                                                                    src={row.imagePreview ? row.imagePreview : "/assets/media/default.jpg"}
                                                                    alt="image"
                                                                    width={160}
                                                                    height={160}
                                                                    objectFit="cover"
                                                                    id={row.imagePreview}
                                                                />

                                                                <label className={`${styles.circleTop} circle-top`} htmlFor={`inputGroupFile${i}`}>
                                                                    {
                                                                        row.imageName ?
                                                                            <i className="ri-pencil-fill text-dark"></i>
                                                                            :
                                                                            <i className="ri-add-line text-dark"></i>
                                                                    }
                                                                </label>
                                                                <input
                                                                    type="file"
                                                                    name="gambar"
                                                                    className="custom-file-input"
                                                                    id={`inputGroupFile${i}`}
                                                                    accept="image/*"
                                                                    style={{ display: "none" }}
                                                                    onChange={(e) => onChangeImage(e, i)}
                                                                />

                                                            </figure>

                                                            <div className="position-relative">
                                                                <label
                                                                    className={`${styles.circleBottom} circle-bottom`}
                                                                    id={`inputGroupFile${i}`}
                                                                    // htmlFor={`inputGroupFile${i}`}
                                                                    onClick={() => onDeleteImage(i)}
                                                                >
                                                                    <i className="ri-delete-bin-fill text-dark"></i>
                                                                </label>
                                                            </div>

                                                            {
                                                                image[i].imageName !== "" ?

                                                                    <div className="mt-3 text-danger">
                                                                        <small className="text-danger">{image[i].imageName}</small>
                                                                    </div>
                                                                    :
                                                                    null
                                                            }
                                                        </div>
                                                    </div>
                                                ))}

                                                <button
                                                    className="btn btn-primary-rounded-full text-white ml-5 mt-5"
                                                    style={{ borderRadius: '10px', textAlign: 'center', width: '45px' }}
                                                    onClick={onAddImage}
                                                    type="button"
                                                    disabled={totalImage === 6 ? true : false}
                                                >
                                                    <i className="ri-add-line text-white"></i>
                                                </button>
                                            </div>

                                            <div className={`${styles.resolusiTambah} mt-3 col-sm-6 col-md-6 col-lg-7 col-xl-3 text-muted`}>
                                                <p>Resolusi yang direkomendasikan adalah 650 * 650. Fokus visual pada bagian tengah gambar.</p>
                                            </div>
                                        </div>
                                        :
                                        null
                                }

                            </div>

                            <div className="form-group">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label font-weight-bolder">Kategori</label>
                                <div className={`${styles.selectKategori} col-sm-12`}>
                                    <select name="" id="" className={`${styles.selectKategori} form-control`} value={kategori_id} onChange={e => setKategoriId(e.target.value)} onBlur={e => { setKategoriId(e.target.value); simpleValidator.current.showMessageFor('kategori') }} >
                                        <option selected disabled value=''>-- Galeri --</option>
                                        {!kategori || (kategori && kategori.length === 0) ? (
                                            <option value="">Data Tidak Ditemukan</option>
                                        ) : (
                                            kategori && kategori.kategori && kategori.kategori.map((row) => {
                                                return (
                                                    row.jenis_kategori == "Galeri" ?
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
                                    // onBlur={() => simpleValidator.current.showMessageFor('tag')}
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
                                            </div>
                                        </div>
                                        :
                                        null : null
                            }

                            <div className="form-group row mr-0">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-10 text-right">
                                    <Link href='/publikasi/galeri'>
                                        <a className={`${styles.btnKembali} btn btn-white-ghost-rounded-full rounded-pill mr-2 btn-sm`}>Kembali</a>
                                    </Link>
                                    <button onClick={onSubmit} className={`${styles.btnSimpan} btn btn-primary-rounded-full rounded-pill btn-sm`}>Simpan</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </PageWrapper>
    );
};

export default EditGaleri;