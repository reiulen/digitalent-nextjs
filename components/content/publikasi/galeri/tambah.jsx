import React, { useState, useRef, useEffect } from 'react';

import Link from 'next/link'
import Image from 'next/image'
import dynamic from "next/dynamic";
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux'

import { newArtikel, clearErrors } from '../../../../redux/actions/publikasi/artikel.actions'
import { NEW_ARTIKEL_RESET } from '../../../../redux/types/publikasi/artikel.type'

import PageWrapper from '../../../wrapper/page.wrapper';

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

const TambahGaleri = () => {
    const dispatch = useDispatch()

    const importSwitch = () => import('bootstrap-switch-button-react')

    const SwitchButton = dynamic(importSwitch, {
        ssr: false
    })

    const { loading, error, success } = useSelector(state => state.newArtikel)
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
                <img
                    src={file.preview}
                    style={img}
                    width={img.width}
                    height={img.height}
                    alt="thumb"
                />
            </div>
        </div>
    ));

    useEffect(() => {

        files.forEach(file => URL.revokeObjectURL(file.preview));

        if (success) {
            dispatch({
                type: NEW_ARTIKEL_RESET
            })
        }

    }, [dispatch, error, success, files]);


    const [judul_video, setJudulVideo] = useState('')
    const [isi_vedeo, setIsiVideo] = useState('');
    const [gambar, setGambar] = useState('')
    const [gambarPreview, setGambarPreview] = useState('/assets/media/default.jpg')
    const [url_video, setUrlVideo] = useState('')
    const [kategori_id, setKategoriId] = useState('')
    const [user_id, setUserId] = useState(1)
    const [tag, setTag] = useState('')
    const [publish, setPublish] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        if (error) {
            dispatch(clearErrors())
        }

        const data = {
            files
        }

        // dispatch(newArtikel(data))
        console.log(data)
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
                    <div className="card-header border-0">
                        <h3 className="card-title font-weight-bolder text-dark">Tambah Galeri</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Judul</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder="Isi Judul disini" value={judul_video} onChange={(e) => setJudulVideo(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Deskripsi Foto</label>
                                <div className="col-sm-10">
                                    <textarea className='form-control' placeholder='isi deskripsi foto disini' name="deskripsi" id="" rows="10" onChange={e => setIsiVideo(e.target.value)} value={isi_vedeo}></textarea>
                                    <small className='text-danger'>*Maksimal 160 Karakter</small>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Upload Gambar</label>
                                <div className="col-sm-10">
                                    <div {...getRootProps({ className: 'dropzone' })} style={{ background: '#f3f6f9', border: ' 1px dashed #3699FF', height: '100px' }}>
                                        <input {...getInputProps()} />
                                        <p className='text-center my-auto'>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                    <aside style={thumbsContainer}>
                                        {thumbs}
                                    </aside>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Kategori</label>
                                <div className="col-sm-10">
                                    <select name="" id="" className='form-control' onChange={e => setKategoriId(e.target.value)}>
                                        <option value="Kategori">Kategori</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Tag</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder="Isi Tag disini" value={tag} onChange={e => setTag(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Publish ?</label>
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
                                    <button className='btn btn-primary btn-sm'>Submit</button>
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