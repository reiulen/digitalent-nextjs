import React, { useState, useRef, useEffect } from 'react';

import Link from 'next/link'
import Image from 'next/image'
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from 'react-redux'
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import { TagsInput } from "react-tag-input-component";

import { newImagetron, clearErrors } from '../../../../redux/actions/publikasi/imagetron.actions'
import { getAllKategori } from "../../../../redux/actions/publikasi/kategori.actions";
import { NEW_IMAGETRON_RESET } from '../../../../redux/types/publikasi/imagetron.type'
import PageWrapper from '../../../wrapper/page.wrapper';
import LoadingPage from "../../../LoadingPage";

const TambahImagetron = () => {
    const editorRef = useRef()
    const dispatch = useDispatch()
    const router = useRouter();

    const importSwitch = () => import('bootstrap-switch-button-react')

    const SwitchButton = dynamic(importSwitch, {
        ssr: false
    })
    const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
    const { loading, error, success } = useSelector(state => state.newImagetron)
    const {
        loading: allLoading,
        error: allError,
        kategori,
      } = useSelector((state) => state.allKategori);

    useEffect(() => {

        dispatch(getAllKategori());

        if (success) {
            router.push({
              pathname: `/publikasi/imagetron`,
              query: { success: true },
            });
          }

        // if (error) {
        //     dispatch(clearErrors())
        // }

        // if (success) {
        //     dispatch({
        //         type: NEW_IMAGETRON_RESET
        //     })
        // }

    }, [dispatch, error, success, simpleValidator]);


    const [kategori_id, setKategoriId] = useState('')
    const [judul, setJudulImagetron] = useState('')
    const [gambar, setGambar] = useState('')
    const [gambarPreview, setGambarPreview] = useState('/assets/media/default.jpg')
    const [url_link, setUrlRedirect] = useState('')
    const [publish, setPublish] = useState(false)
    const [users_id, setUserId] = useState(1)

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
            kategori_id,
            judul,
            url_link,
            gambar,
            publish,
            users_id
        }

        dispatch(newImagetron(data))
        console.log(data)
    }

    const onNewReset = () => {
        dispatch({ type: NEW_IMAGETRON_RESET })
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
                <div className="card card-custom card-stretch gutter-b">
                    <div className="card-header border-0">
                        <h3 className="card-title font-weight-bolder text-dark">Tambah Imagetron</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
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
                            <option key={row.id} value={row.id}>
                              {row.jenis_kategori}
                            </option>
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
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Judul</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" placeholder="Isi Judul disini" value={judul} onChange={(e) => setJudulImagetron(e.target.value)} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Upload</label>
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
                                            <input type="file" name='gambar' className="custom-file-input" id="inputGroupFile04" onChange={onChangeGambar} />
                                            <label className="custom-file-label" htmlFor="inputGroupFile04">Choose file</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className='col-sm-2 col-form-label'>URL Link</label>
                                <div className="col-sm-10">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">https://</div>
                                        </div>
                                        <input type="text" className="form-control" value={url_link} onChange={e => setUrlRedirect(e.target.value)} placeholder="Isi Link Disini" />
                                    </div>
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
                                    <Link href='/publikasi/imagetron'>
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

export default TambahImagetron