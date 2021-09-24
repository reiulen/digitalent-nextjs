import React, { useState, useRef, useEffect } from 'react';

import Link from 'next/link'
import Image from 'next/image'
import dynamic from "next/dynamic";
// import { useDropzone } from 'react-dropzone';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'
import DatePicker from 'react-datepicker'
// import Swal from "sweetalert2";
import { TagsInput } from "react-tag-input-component";

import { newGaleri, clearErrors } from '../../../../redux/actions/publikasi/galeri.actions'
import { NEW_GALERI_RESET } from '../../../../redux/types/publikasi/galeri.type'
// import { getAllKategori } from "../../../../redux/actions/publikasi/kategori.actions";

import PageWrapper from '../../../wrapper/page.wrapper';
import LoadingPage from "../../../LoadingPage";

// const thumbsContainer = {
//     display: 'flex',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginTop: 16
// };

// const thumb = {
//     display: 'inline-flex',
//     borderRadius: 2,
//     border: '1px solid #eaeaea',
//     marginBottom: 8,
//     marginRight: 8,
//     width: 250,
//     height: 150,
//     padding: 4,
//     boxSizing: 'border-box'
// };

// const thumbInner = {
//     display: 'flex',
//     minWidth: 0,
//     overflow: 'hidden'
// };

// const img = {
//     display: 'block',
//     width: 'auto',
//     height: '100%'
// };

const TambahGaleri = ({ token }) => {
    const dispatch = useDispatch()
    const router = useRouter();

    const importSwitch = () => import('bootstrap-switch-button-react')

    const SwitchButton = dynamic(importSwitch, {
        ssr: false
    })
    const simpleValidator = useRef(new SimpleReactValidator({ locale: 'id' }))
    const [, forceUpdate] = useState();

    const { loading, error, success } = useSelector(state => state.newGaleri)
    const { loading: allLoading, error: allError, kategori } = useSelector((state) => state.allKategori);

    // const [files, setFiles] = useState([]);
    // const { getRootProps, getInputProps } = useDropzone({
    //     accept: 'image/*',
    //     onDrop: acceptedFiles => {
    //         setFiles(acceptedFiles.map(file => Object.assign(file, {
    //             preview: URL.createObjectURL(file)
    //         })));
    //     }
    // });

    // const thumbs = files.map(file => (
    //     <div style={thumb} key={file.name}>
    //         {console.log("IMAGE : ", file)}
    //         <div style={thumbInner}>
    //             <Image
    //                 loader={() => file.preview}
    //                 src={file.preview}
    //                 alt="thumb"
    //                 // layout="fill"
    //                 width={250}
    //                 height="100%"
    //                 display="block"
    //                 objectFit="fill"
    //                 unoptimized={true}
    //             />
    //             {/* <img
    //                 src={file.preview}
    //                 alt="thumb"
    //                 width= '10vh'
    //                 height= '10vh'>
    //             </img> */}

    //             {/* {
    //                 console.log (file)
    //             } */}
    //         </div>
    //     </div>
    // ));

    const Thumb = () => {
        return (
            <div>
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

                    {/* <div className="ml-5 mt-5 py-5">
                        <button className="btn btn-primary-rounded-full px-6 font-weight-bold btn-block ">
                        <i className="ri-pencil-fill pb-1 text-white mr-2 "></i>
                            Tambah Gambar
                        </button>
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
        )
    }
        
    

    useEffect(() => {
        // dispatch(getAllKategori());

        // files.forEach(file => URL.revokeObjectURL(file.preview));

        if (success) {
            dispatch({
                type: NEW_GALERI_RESET
            })
        }

        // let temps = []

        // for (let i = 0; i < files.length; i++) {
        //     const reader = new FileReader()

        //     reader.onload = () => {
        //         temps.push(reader.result)
        //     }

        //     reader.readAsDataURL(files[i])
        // }

        // setGambar(temps)

        if (success) {
            router.push({
                pathname: `/publikasi/galeri`,
                query: { success: true }
            })
        }

    // }, [dispatch, error, success, files, router]);
    }, [dispatch, error, success, router]);


    const [judul, setJudulGaleri] = useState('')
    const [isi_galleri, setIsiGaleri] = useState('');
    const [gambar, setGambar] = useState([])
    // const [gambarPreview, setGambarPreview] = useState(null)
    const [gambarPreview, setGambarPreview] = useState(
        "/assets/media/default.jpg"
      );
    const [kategori_id, setKategoriId] = useState('')
    // const [kategori_id, setKategoriId] = useState(1)
    const [users_id, setUserId] = useState(3)
    const [tag, setTag] = useState([])
    const [publish, setPublish] = useState(false)
    const [publishDate, setPublishDate] = useState(null);
    const [disablePublishDate, setDisablePublishDate] = useState(true)
    const [gambarName, setGambarName] = useState (null)
    const [ totalImage, setTotalImage ] = useState(1)

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
            'Data yang bisa dimasukkan hanya berupa data gambar.',
            'error'
          )
        }
    };

    const handleAddImage = () => {
        setTotalImage ((totalImage) + 1)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (error) {
            dispatch(clearErrors())
        }

        if (success) {
            dispatch({
                type: NEW_GALERI_RESET,
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
                judul,
                isi_galleri,
                gambar,
                kategori_id,
                users_id,
                tag,
                publish,
                tanggal_publish: moment(today).format("YYYY-MM-DD")
            }

            dispatch(newGaleri(data, token))
            // console.log("Non Publish data : ",data)
        } else {
            const data = {
                judul,
                isi_galleri,
                gambar,
                kategori_id,
                users_id,
                tag,
                publish,
                tanggal_publish: moment(publishDate).format("YYYY-MM-DD")
            }

            dispatch(newGaleri(data, token))
            // console.log("Publish data : ", data)
        }


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
                {loading ? <LoadingPage loading={loading} /> : ""}
                <div className="card card-custom card-stretch gutter-b">
                    <div className="card-header">
                        <h3 className="card-title font-weight-bolder text-dark">Tambah Galeri</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label font-weight-bolder">Judul</label>
                                <div className="col-sm-12">
                                    <input type="text" className="form-control" placeholder="Masukkan Judul Disini" value={judul} onChange={(e) => setJudulGaleri(e.target.value)} onBlur={() => simpleValidator.current.showMessageFor("judul")} />
                                    {simpleValidator.current.message(
                                        "judul",
                                        judul,
                                        "required|min:5|max:50",
                                        { className: "text-danger" }
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label font-weight-bolder">Deskripsi</label>
                                <div className="col-sm-12">
                                    <textarea className='form-control' placeholder='Tulis Deskripsi' name="deskripsi" id="" rows="10" onChange={e => setIsiGaleri(e.target.value)} value={isi_galleri} onBlur={() => simpleValidator.current.showMessageFor("deskripsi")}></textarea>
                                    {simpleValidator.current.message(
                                        "judul",
                                        judul,
                                        "required|min:5|max:50",
                                        { className: "text-danger" }
                                    )}
                                    {/* <small className='text-danger'>*Maksimal 160 Karakter</small> */}
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label font-weight-bolder">Upload Gambar</label>
                                
                                {
                                    totalImage === 1 ?
                                        <div>
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

                                                <div className="ml-5 mt-5 py-5">
                                                    <button className="btn btn-primary-rounded-full px-6 font-weight-bold btn-block" onClick={handleAddImage} style={{marginTop: "30px"}}>
                                                    <i className="ri-pencil-fill pb-1 text-white mr-2 "></i>
                                                        Tambah Gambar
                                                    </button>
                                                </div>
                                                
                                            </div>
                                            
                                            <div className="d-flex flex-column">
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
                                        </div>
                                    :
                                        totalImage === 2 ?
                                            <div>
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

                                                    <div className="position-relative mr-5">
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
                                                    
                                                    <figure
                                                        className="avatar item-rtl position-relative ml-5"
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

                                                    <div className="position-relative mr-5">
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

                                                    <div className="ml-5 mt-5 py-5">
                                                        <button className="btn btn-primary-rounded-full px-6 font-weight-bold btn-block" onClick={handleAddImage} style={{marginTop: "30px"}}>
                                                        <i className="ri-pencil-fill pb-1 text-white mr-2 "></i>
                                                            Tambah Gambar
                                                        </button>
                                                    </div>
                                                    
                                                </div>
                                                
                                                <div className="d-flex flex-column">
                                                    <div className="mt-3 col-sm-5 text-muted d-flex flex-row">
                                                        <div className="mr-5">
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

                                                        <div className="ml-5">
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
                                                        
                                                    </div>

                                                    <div className="mt-3 col-sm-5 text-muted d-flex flex-row">
                                                        <p className="mr-5">
                                                        Resolusi yang direkomendasikan adalah 1024 * 512. Fokus visual pada bagian tengah gambar.
                                                        </p>

                                                        <p className="ml-5">
                                                        Resolusi yang direkomendasikan adalah 1024 * 512. Fokus visual pada bagian tengah gambar.
                                                        </p>
                                                        
                                                    </div>
                                                </div>

                                            </div>
                                        :
                                            totalImage === 3 ?
                                                <div>
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

                                                        <div className="position-relative mr-5">
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
                                                        
                                                        <figure
                                                            className="avatar item-rtl position-relative ml-5"
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

                                                        <div className="position-relative mr-5">
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

                                                        <figure
                                                            className="avatar item-rtl position-relative ml-5"
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

                                                        <div className="position-relative mr-5">
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

                                                        <div className="ml-5 mt-5 py-5">
                                                            <button className="btn btn-primary-rounded-full px-6 font-weight-bold btn-block" onClick={handleAddImage} style={{marginTop: "30px"}}>
                                                            <i className="ri-pencil-fill pb-1 text-white mr-2 "></i>
                                                                Tambah Gambar
                                                            </button>
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                    <div className="d-flex flex-column">
                                                        <div className="mt-3 col-sm85 text-muted d-flex flex-row">
                                                            <div className="mr-5">
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

                                                            <div className="mr-5">
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

                                                            <div className="mr-5">
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
                                                            
                                                        </div>

                                                        <div className="mt-3 col-sm-8 text-muted d-flex flex-row">
                                                            <p className="mr-5">
                                                            Resolusi yang direkomendasikan adalah 1024 * 512. Fokus visual pada bagian tengah gambar.
                                                            </p>

                                                            <p className="mr-5">
                                                            Resolusi yang direkomendasikan adalah 1024 * 512. Fokus visual pada bagian tengah gambar.
                                                            </p>

                                                            <p className="mr-5">
                                                            Resolusi yang direkomendasikan adalah 1024 * 512. Fokus visual pada bagian tengah gambar.
                                                            </p>
                                                            
                                                        </div>
                                                    </div>

                                                </div>
                                                
                                            :
                                                totalImage === 4 ?
                                                    <div>
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

                                                            <div className="position-relative mr-5">
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
                                                            
                                                            <figure
                                                                className="avatar item-rtl position-relative ml-5"
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

                                                            <div className="position-relative mr-5">
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

                                                            <figure
                                                                className="avatar item-rtl position-relative ml-5"
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

                                                            <div className="position-relative mr-5">
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

                                                            <div className="ml-5 mt-5 py-5">
                                                                <button className="btn btn-primary-rounded-full px-6 font-weight-bold btn-block" onClick={handleAddImage} style={{marginTop: "30px"}}>
                                                                <i className="ri-pencil-fill pb-1 text-white mr-2 "></i>
                                                                    Tambah Gambar
                                                                </button>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="d-flex flex-column mb-3">
                                                            <div className="mt-3 col-sm-8 text-muted d-flex flex-row">
                                                                <div className="mr-5">
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

                                                                <div className="mr-5">
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

                                                                <div className="mr-5">
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

                                                                <div className="mr-5">
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
                                                                
                                                            </div>

                                                            <div className="mt-3 col-sm-8 text-muted d-flex flex-row">
                                                                <p className="mr-5">
                                                                Resolusi yang direkomendasikan adalah 1024 * 512. Fokus visual pada bagian tengah gambar.
                                                                </p>

                                                                <p className="mr-5">
                                                                Resolusi yang direkomendasikan adalah 1024 * 512. Fokus visual pada bagian tengah gambar.
                                                                </p>

                                                                <p className="mr-5">
                                                                Resolusi yang direkomendasikan adalah 1024 * 512. Fokus visual pada bagian tengah gambar.
                                                                </p>
                                                                
                                                                <p className="mr-5">
                                                                Resolusi yang direkomendasikan adalah 1024 * 512. Fokus visual pada bagian tengah gambar.
                                                                </p>
                                                            </div>
                                                        </div>

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

                                                            <div className="position-relative mr-5">
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
                                                            
                                                            <figure
                                                                className="avatar item-rtl position-relative ml-5"
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

                                                            <div className="position-relative mr-5">
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

                                                            <figure
                                                                className="avatar item-rtl position-relative ml-5"
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

                                                            <div className="position-relative mr-5">
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

                                                            {/* <div className="ml-5 mt-5 py-5">
                                                                <button className="btn btn-primary-rounded-full px-6 font-weight-bold btn-block" onClick={handleAddImage} style={{marginTop: "30px"}}>
                                                                <i className="ri-pencil-fill pb-1 text-white mr-2 "></i>
                                                                    Tambah Gambar
                                                                </button>
                                                            </div> */}
                                                        </div>
                                                        
                                                        <div className="d-flex flex-column mb-3">
                                                            <div className="mt-3 col-sm-8 text-muted d-flex flex-row">
                                                                <div className="mr-5">
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

                                                                <div className="mr-5">
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

                                                                <div className="mr-5">
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

                                                                <div className="mr-5">
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
                                                                
                                                            </div>

                                                            <div className="mt-3 col-sm-8 text-muted d-flex flex-row">
                                                                <p className="mr-5">
                                                                Resolusi yang direkomendasikan adalah 1024 * 512. Fokus visual pada bagian tengah gambar.
                                                                </p>

                                                                <p className="mr-5">
                                                                Resolusi yang direkomendasikan adalah 1024 * 512. Fokus visual pada bagian tengah gambar.
                                                                </p>

                                                                <p className="mr-5">
                                                                Resolusi yang direkomendasikan adalah 1024 * 512. Fokus visual pada bagian tengah gambar.
                                                                </p>
                                                                
                                                                <p className="mr-5">
                                                                Resolusi yang direkomendasikan adalah 1024 * 512. Fokus visual pada bagian tengah gambar.
                                                                </p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    // <div>
                                                    //     test
                                                    // </div>
                                                    
                                                :
                                                    null


                                }
                                
                                {/* <div className="col-sm-12">
                                    <div {...getRootProps({ className: 'dropzone' })} style={{ background: '#f3f6f9', border: ' 1px dashed #3699FF', height: '100px' }}>
                                        <input {...getInputProps()} />
                                        <p className='text-center my-auto'>Seret gambar ke sini atau klik untuk memilih.</p>
                                        <p className='text-center my-auto'>Untuk memilih banyak gambar klik dengan menekan tombol CTRL atau seret gambar dengan menekan Shift</p>
                                    </div>
                                    <aside style={thumbsContainer}>
                                        {thumbs}
                                    </aside>
                                </div> */}

                                {/* <div className="ml-3 row">
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

                                    <div className="ml-5 mt-5 py-5">
                                        <button className="btn btn-primary-rounded-full px-6 font-weight-bold btn-block ">
                                        <i className="ri-pencil-fill pb-1 text-white mr-2 "></i>
                                            Tambah Gambar
                                        </button>
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

                                <div className="mt-3 col-sm-3 text-muted">
                                    <p>
                                    Resolusi yang direkomendasikan adalah 1024 * 512. Fokus visual pada bagian tengah gambar.
                                    </p>
                                    
                                </div> */}
                                {/* <div>

                                    <div className="ml-5 mt-5 py-5">
                                        <button className="btn btn-primary-rounded-full px-6 font-weight-bold btn-block ">
                                        <i className="ri-pencil-fill pb-1 text-white mr-2 "></i>
                                            Tambah Gambar
                                        </button>
                                    </div>

                                </div> */}
                                
                            </div>

                            {/* {
                                console.log (kategori)
                            } */}

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
                                            -- Galeri --
                                        </option>
                                        {!kategori || (kategori && kategori.length === 0) ? (
                                            <option value="">Data kosong</option>
                                        ) : (
                                            kategori &&
                                            kategori.kategori &&
                                            kategori.kategori.map((row) => {
                                                return (
                                                    row.jenis_kategori == "Galeri" ?
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
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label font-weight-bolder">Tag</label>
                                <div className="col-sm-12">
                                    <TagsInput
                                        value={tag}
                                        onChange={setTag}
                                        name="fruits"
                                        placeHolder="Isi Tag disini dan Enter"
                                    // onBlur={() => simpleValidator.current.showMessageFor('tag')}
                                    />
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
                                        onChange={(checked) => setPublish(checked)}
                                    />
                                </div>
                            </div> */}

                            <div className="form-group row">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-10 text-right">
                                    <Link href='/publikasi/galeri'>
                                        <a className='btn btn-white-ghost-rounded-full rounded-pill mr-2 btn-sm'>Kembali</a>
                                    </Link>
                                    <button className='btn btn-primary-rounded-full rounded-pill btn-sm'>Simpan</button>
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
    )
}

export default TambahGaleri