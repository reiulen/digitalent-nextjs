import React, { useState, useRef, useEffect } from 'react';

import Link from 'next/link'
import Image from 'next/image'
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux'
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import { TagsInput } from "react-tag-input-component";

import { newVideo, clearErrors } from '../../../../redux/actions/publikasi/video.actions'
import { NEW_VIDEO_RESET } from '../../../../redux/types/publikasi/video.type'
import { getAllKategori } from "../../../../redux/actions/publikasi/kategori.actions";
import PageWrapper from '../../../wrapper/page.wrapper';
import LoadingPage from '../../../LoadingPage';

const TambahVidio = () => {
    const editorRef = useRef()
    const dispatch = useDispatch()
    const router = useRouter();

    const importSwitch = () => import('bootstrap-switch-button-react')
    const [editorLoaded, setEditorLoaded] = useState(false)

    const SwitchButton = dynamic(importSwitch, {
        ssr: false
    })
    const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

    const { loading, error, success } = useSelector(state => state.newVideo)
    const {
        loading: allLoading,
        error: allError,
        kategori,
      } = useSelector((state) => state.allKategori);

    useEffect(() => {
        dispatch(getAllKategori());
        // if (error) {
        //     dispatch(clearErrors())
        // }

        // if (success) {
        //     setKategoriId('')
        //     setJudulVideo('')
        //     setIsiVideo('')
        //     setUrlVideo('')
        //     setGambar('')
        //     setPublish(false)
        //     setTag('')
        //     setGambarPreview('/assets/media/default.jpg')
        //     // dispatch({
        //     //     type: NEW_ARTIKEL_RESET
        //     // })
        // }

        // setEditorLoaded(true)
        if (success) {
            router.push({
                pathname: `/publikasi/video`,
                query: { success: true }
            })
        }

    }, [dispatch, error, success, router]);


    const [kategori_id, setKategoriId] = useState('')
    const [users_id, setUserId] = useState(3)
    const [judul_video, setJudulVideo] = useState('')
    const [isi_video, setIsiVideo] = useState('');
    const [url_video, setUrlVideo] = useState('')
    const [gambar, setGambar] = useState('')
    const [tag, setTag] = useState('')
    const [gambarPreview, setGambarPreview] = useState('/assets/media/default.jpg')
    const [gambarName, setGambarName] = useState (null)
    const [publish, setPublish] = useState(false)

    const onChangeGambar = (e) => {
        const type = ["image/jpg", "image/png", "image/jpeg"]
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
        setGambarName(e.target.files[0].name)
        // console.log (reader.readAsDataURL(e.target.files[0]))
        } 

        // if (e.target.name === 'gambar') {
        //     const reader = new FileReader()
        //     reader.onload = () => {
        //         if (reader.readyState === 2) {
        //             setGambar(reader.result)
        //             setGambarPreview(reader.result)
        //         }
        //     }
        //     reader.readAsDataURL(e.target.files[0])
        // }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (simpleValidator.current.allValid()){
            if (error) {
                dispatch(clearErrors())
            }
            if (success) {
                dispatch({
                    type: NEW_VIDEO_RESET
                })
            }
    
            const data = {
                kategori_id,
                users_id,
                judul_video,
                isi_video,
                url_video,
                gambar,
                tag,
                publish
            }
    
            dispatch(newVideo(data))
            console.log(data)
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
        dispatch({ type: NEW_VIDEO_RESET })
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
                        <h3 className="card-title font-weight-bolder text-dark">Tambah Video</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Judul</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder="Isi Judul disini" value={judul_video} onChange={(e) => setJudulVideo(e.target.value)}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Deskripsi Video</label>
                                <div className="col-sm-10">
                                    <textarea className='form-control' placeholder='isi deskripsi video disini' name="deskripsi" id="" rows="10" onChange={e => setIsiVideo(e.target.value)} value={isi_video} onBlur={() => simpleValidator.current.showMessageFor("isi_video")}></textarea>
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
                                            <input type="file" name='gambar' className="custom-file-input" id="inputGroupFile04" accept="image/*" onChange={onChangeGambar} />
                                            <label className="custom-file-label" htmlFor="inputGroupFile04">Pilih File</label>
                                        </div>
                                    </div>
                                    {
                                        gambarName !== null ?
                                            <small className="text-danger">{gambarName}</small>
                                        :
                                            null
                                    }
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className='col-sm-2 col-form-label'>Link URL Video</label>
                                <div className="col-sm-10">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">https://</div>
                                        </div>
                                        <input type="text" className="form-control" value={url_video} onChange={e => setUrlVideo(e.target.value)} placeholder="example" />
                                    </div>
                                </div>
                            </div>

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
                                                row.jenis_kategori == "Video" ?
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
    )
}

export default TambahVidio