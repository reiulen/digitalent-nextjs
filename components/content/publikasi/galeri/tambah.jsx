import React, { useState, useRef, useEffect } from 'react';

import Link from 'next/link'
import Image from 'next/image'
import dynamic from "next/dynamic";
import { useDropzone } from 'react-dropzone';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux'
import SimpleReactValidator from 'simple-react-validator'
// import Swal from "sweetalert2";
import { TagsInput } from "react-tag-input-component";

import { newGaleri, clearErrors } from '../../../../redux/actions/publikasi/galeri.actions'
import { NEW_GALERI_RESET } from '../../../../redux/types/publikasi/galeri.type'
import { getAllKategori } from "../../../../redux/actions/publikasi/kategori.actions";

import PageWrapper from '../../../wrapper/page.wrapper';
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

// const img = {
//     display: 'block',
//     width: 'auto',
//     height: '100%'
// };

const TambahGaleri = () => {
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
                    // layout="fill"
                    width= {250}
                    height= "100%"
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
        dispatch(getAllKategori());

        files.forEach(file => URL.revokeObjectURL(file.preview));

        if (success) {
            dispatch({
                type: NEW_GALERI_RESET
            })
        }

        let temps= []

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader()

            reader.onload = () => {
                temps.push (reader.result)
            }

            reader.readAsDataURL(files[i])
        }

        setGambar(temps)

        if (success) {
            router.push({
                pathname: `/publikasi/galeri`,
                query: { success: true }
            })
        }

    }, [dispatch, error, success, files, router]);


    const [judul, setJudulGaleri] = useState('')
    const [isi_galleri, setIsiGaleri] = useState('');
    const [gambar, setGambar] = useState([])
    const [gambarPreview, setGambarPreview] = useState(null)
    const [kategori_id, setKategoriId] = useState('')
    // const [kategori_id, setKategoriId] = useState(1)
    const [users_id, setUserId] = useState(1)
    const [tag, setTag] = useState([])
    const [publish, setPublish] = useState(false)

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

        const data = {
            judul,
            isi_galleri,
            gambar,
            kategori_id,
            users_id,
            tag,
            publish
        }

        dispatch(newGaleri(data))
        // console.log(data)
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
                    <div className="card-header border-0">
                        <h3 className="card-title font-weight-bolder text-dark">Tambah Galeri</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Judul</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder="Isi Judul disini" value={judul} onChange={(e) => setJudulGaleri(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Deskripsi Foto</label>
                                <div className="col-sm-10">
                                    <textarea className='form-control' placeholder='isi deskripsi foto disini' name="deskripsi" id="" rows="10" onChange={e => setIsiGaleri(e.target.value)} value={isi_galleri}></textarea>
                                    <small className='text-danger'>*Maksimal 160 Karakter</small>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Upload Gambar</label>
                                <div className="col-sm-10">
                                    <div {...getRootProps({ className: 'dropzone' })} style={{ background: '#f3f6f9', border: ' 1px dashed #3699FF', height: '100px' }}>
                                        <input {...getInputProps()} />
                                        <p className='text-center my-auto'>Seret gambar ke sini atau klik untuk memilih.</p>
                                        <p className='text-center my-auto'>Untuk memilih banyak gambar klik dengan menekan tombol CTRL atau seret gambar dengan menekan Shift</p>
                                    </div>
                                    <aside style={thumbsContainer}>
                                        {thumbs}
                                    </aside>
                                </div>
                            </div>
                            {/* {
                                console.log (kategori)
                            } */}

                            <div className="form-group row">
                                <label
                                    htmlFor="staticEmail"
                                    className="col-sm-2 col-form-label"
                                >
                                    Kategori
                                </label>
                                <div className="col-sm-10">
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
                                        -- Kategori --
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

                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Tag</label>
                                <div className="col-sm-10">
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
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-10">
                                    <Link href='/publikasi/galeri'>
                                        <a className='btn btn-outline-primary mr-2 btn-sm'>Kembali</a>
                                    </Link>
                                    <button className='btn btn-primary btn-sm'>Simpan</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </PageWrapper>
    )
}

export default TambahGaleri