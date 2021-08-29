import React, { useState, useRef, useEffect } from 'react';

import Link from 'next/link'
import Image from 'next/image'
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from "next/router";
import { TagsInput } from "react-tag-input-component";
import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";

import { updateVideo, clearErrors } from '../../../../redux/actions/publikasi/video.actions'
import { NEW_ARTIKEL_RESET, UPDATE_VIDEO_RESET } from '../../../../redux/types/publikasi/video.type'
import { getAllKategori } from '../../../../redux/actions/publikasi/kategori.actions'
import PageWrapper from '../../../wrapper/page.wrapper';
import LoadingPage from '../../../LoadingPage';

const EditVideo = () => {
    const editorRef = useRef()
    const dispatch = useDispatch()
    const router = useRouter();

    const importSwitch = () => import('bootstrap-switch-button-react')
    const [editorLoaded, setEditorLoaded] = useState(false)
    const { CKEditor, ClassicEditor, Base64UploadAdapter } = editorRef.current || {}
    const SwitchButton = dynamic(importSwitch, {
        ssr: false
    })
    const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
    const { video } = useSelector(state => state.detailVideo)
    const { error, success, loading } = useSelector(state => state.updatedVideo)
    const { loading: allLoading, error: allError, kategori } = useSelector((state) => state.allKategori);

    useEffect(() => {

        dispatch(getAllKategori())

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
    const [gambar, setGambar] = useState(video.gambar)
    const [url_video, setUrlVideo] = useState(video.url_video)
    const [gambarPreview, setGambarPreview] = useState('/assets/media/default.jpg') //belum
    // const [gambarPreview, setGambarPreview] = useState(process.env.END_POINT_API_IMAGE_PUBLIKASI + "publikasi/images/" + video.gambar);
    const [gambarName, setGambarName] = useState (video.gambar)
    const [kategori_id, setKategoriId] = useState(video.kategori_id) 
    const [users_id, setUserId] = useState(video.users_id)
    const [tag, setTag] = useState(video.tag)
    const [publish, setPublish] = useState(video.publish === 1 ? true : false)
    const [_method, setMethod] = useState("put")

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

    const onSubmit = (e) => {
        e.preventDefault()
        if (error) {
            dispatch(clearErrors())
        }

        if (success) {
            dispatch({
                type: UPDATE_VIDEO_RESET 
            })
        }

        const data = {
            judul_video,
            isi_video,
            url_video,
            gambar,
            kategori_id,
            users_id,
            tag,
            publish,
            id,
            _method
        }

        dispatch(updateVideo(data))
        // console.log(data)
    }

    const onNewReset = () => {
        dispatch({ 
            type: UPDATE_VIDEO_RESET 
        })
    }

    const onSetPublish = (e) => {
        Swal.fire({
            title: 'Ubah status publikasi?',
            text: "Status publikasi akan berubah",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya !",
            cancelButtonText: "Batal",
          })
          
          .then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Berhasil',
                'Status publikasi telah diubah',
                'success'
              )
                
              console.log (e)
              setPublish(e)

            } else {
                Swal.fire(
                    'Batal',
                    'Status publikasi telah batal diubah',
                    'info'
                  )

                console.log (!e)
                setPublish(!e)
            }
          })
          
        // Swal.fire (
        //     'Berhasil',
        //     'Status publikasi telah diubah',
        //     'success'
        // )

        // setPublish(e)
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
                    : ''
                }
                {success ?
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
                }

                <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
                    {
                        loading ?
                            <LoadingPage loading={loading} />
                            : ''
                    }
                    <div className="card card-custom card-stretch gutter-b">
                        <div className="card-header border-0">
                            <h3 className="card-title font-weight-bolder text-dark">Update Video</h3>
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
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Deskripsi</label>
                                    <div className="col-sm-10">
                                        <textarea className="form-control" rows="10" placeholder="Deskripsi video" value={isi_video} onChange={e => setIsiVideo(e.target.value)} onBlur={() => simpleValidator.current.showMessageFor("isi_video")}/>
                                        {simpleValidator.current.message("isi_video",isi_video,"required|max:160|min:50",{ className: "text-danger" })}
                                        <small className='text-danger'>*Minimum 50 Karakter dan Maksimal 160 Karakter</small>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Upload Thumbnail</label>
                                    <div className="col-sm-1">
                                        <figure className='avatar item-rtl' data-toggle="modal" data-target="#exampleModalCenter">
                                            <Image
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
                                                <input type="file" name='gambar'accept="image/*" className="custom-file-input" id="inputGroupFile04" onChange={onChangeGambar} />
                                                <label className="custom-file-label" htmlFor="inputGroupFile04">Pilih file</label>
                                            </div>
                                            
                                        </div>
                                        <small>{gambarName}</small>
                                        {/* <div><h5>test</h5></div> */}
                                    </div>
                                    
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Link URL Video:</label>
                                    <div className="col-sm-10 input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">https://</div>
                                        </div>
                                        <input type="text" className="form-control ml-4" placeholder="Example" value={url_video} onChange={(e) => setUrlVideo(e.target.value)}/>
                                    </div>
                                    
                                </div>

                                {/* {
                                    console.log (kategori)
                                }
                                {
                                    console.log (kategori_id)
                                } */}

                                <div className="form-group row">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Kategori</label>
                                    <div className="col-sm-10">
                                        <select name="" id="" className='form-control' value={kategori_id} onChange={e => setKategoriId(e.target.value)} onBlur={e => { setKategoriId(e.target.value); simpleValidator.current.showMessageFor('kategori_id') }} >
                                            <option selected disabled value=''>-- Kategori --</option>
                                            {!kategori || (kategori && kategori.length === 0) ? (
                                                <option value="">Data kosong</option>
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

                                {/* {
                                    console.log (video)
                                } */}

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
                                            onChange={(checked) => onSetPublish(checked)}
                                            // onClick={(checked) => onSetPublish(checked)}
                                            // onChange={(checked) => setPublish(checked)}
                                        />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-sm-2"></div>
                                    <div className="col-sm-10">
                                        <Link href='/publikasi/video'>
                                            <a className='btn btn-outline-primary mr-2 btn-sm'>Kembali</a>
                                        </Link>
                                        <button className='btn btn-primary btn-sm'>Simpan</button>
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
                                <h5 className="modal-title" id="exampleModalLongTitle">Image Preview</h5>
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
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </>
    )
}

export default EditVideo