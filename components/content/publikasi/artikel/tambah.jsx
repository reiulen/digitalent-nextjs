import React, { useState, useRef, useEffect } from 'react';

import Link from 'next/link'
import Image from 'next/image'
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from 'react-redux'
import { newArtikel, clearErrors } from '../../../../redux/actions/publikasi/artikel.actions'
import { NEW_ARTIKEL_RESET } from '../../../../redux/types/publikasi/artikel.type'

import PageWrapper from '../../../wrapper/page.wrapper';

const TambahArtikel = () => {
    const editorRef = useRef()
    const dispatch = useDispatch()

    const importSwitch = () => import('bootstrap-switch-button-react')
    const [editorLoaded, setEditorLoaded] = useState(false)
    const { CKEditor, ClassicEditor, Base64UploadAdapter } = editorRef.current || {}
    const SwitchButton = dynamic(importSwitch, {
        ssr: false
    })

    const { loading, error, success } = useSelector(state => state.newArtikel)

    useEffect(() => {

        editorRef.current = {
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, //Added .CKEditor
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
            // Base64UploadAdapter: require('@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter')
        }

        setEditorLoaded(true)

        // if (error) {
        //     dispatch(clearErrors())
        // }

        if (success) {
            dispatch({
                type: NEW_ARTIKEL_RESET
            })
        }

    }, [dispatch, error, success]);


    const [judul_artikel, setJudulArtikel] = useState('')
    const [isi_artikel, setIsiArtikel] = useState('');
    const [gambar, setGambar] = useState('')
    const [gambarPreview, setGambarPreview] = useState('/assets/media/default.jpg')
    const [kategori_id, setKategoriId] = useState('')
    const [user_id, setUserId] = useState(1)
    const [tag, setTag] = useState('')

    const onChangeGambar = (e) => {
        if (e.target.name === 'gambar') {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setGambar(reader.result)
                    setGambarPreview(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (error) {
            dispatch(clearErrors())
        }

        const data = {
            judul_artikel,
            isi_artikel,
            gambar,
            kategori_id,
            user_id,
            tag
        }

        dispatch(newArtikel(data))
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
            <div className="col-lg-12 col-xxl-4 order-1 order-xxl-2 px-0">
                <div className="card card-custom card-stretch gutter-b">
                    <div className="card-header border-0">
                        <h3 className="card-title font-weight-bolder text-dark">Tambah Artikel</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Judul</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder="Isi Judul disini" value={judul_artikel} onChange={(e) => setJudulArtikel(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Artikel</label>
                                <div className="col-sm-10">
                                    <div className="ckeditor">
                                        {editorLoaded ? <CKEditor
                                            editor={ClassicEditor}
                                            data={isi_artikel}
                                            onReady={editor => {
                                                // You can store the "editor" and use when it is needed.
                                                console.log('Editor is ready to use!', editor);
                                            }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData()
                                                setIsiArtikel(data);
                                                console.log({ event, editor, data })
                                            }}
                                        /> : <p>Tunggu Sebentar</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Upload Thumbnail</label>
                                <div className="col-sm-2">
                                    <figure className='avatar item-rtl'>
                                        <Image
                                            src={gambarPreview}
                                            alt='image'
                                            width={60}
                                            height={60}
                                        />
                                    </figure>
                                </div>
                                <div className="col-sm-8">
                                    <div class="input-group">
                                        <div class="custom-file">
                                            <input type="file" name='gambar' class="custom-file-input" id="inputGroupFile04" onChange={onChangeGambar} />
                                            <label class="custom-file-label" for="inputGroupFile04">Choose file</label>
                                        </div>
                                    </div>
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
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Slug</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder="Isi Slug disini" />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Publish ?</label>
                                <div className="col-sm-1">
                                    <SwitchButton
                                        checked={false}
                                        onlabel=' '
                                        onstyle='primary'
                                        offlabel=' '
                                        offstyle='danger'
                                        size='sm'
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-10">
                                    <Link href='/publikasi/artikel'>
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

export default TambahArtikel