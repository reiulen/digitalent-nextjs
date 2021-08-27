import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Swal from 'sweetalert2'

import Pagination from 'react-js-pagination';

import PageWrapper from '../../../wrapper/page.wrapper'
import ButtonAction from '../../../ButtonAction'
import LoadingTable from '../../../LoadingTable';

import { useDispatch, useSelector } from 'react-redux'
import { deleteKategori, clearErrors, getAllKategori } from '../../../../redux/actions/publikasi/kategori.actions'
import { DELETE_KATEGORI_RESET } from '../../../../redux/types/publikasi/kategori.type'

const Kategori = () => {

    const dispatch = useDispatch()
    const router = useRouter()

    const { loading, error, kategori } = useSelector(state => state.allKategori)
    const { paginateKategori } = useSelector(state => state.paginationKategori)
    const { error: deleteError, isDeleted } = useSelector(state => state.deleteKategori)

    let { page = 1, success } = router.query
    page = Number(page)

    const [limit, setLimit] = useState(null)
    const [search, setSearch] = useState('')

    // useEffect (() => {
    //     dispatch (getAllKategori())
    // }, [])

    useEffect(() => {
        // if (limit !== null && search === "") {
        //     router.push(`${router.pathname}?page=1&limit=${limit}`)

        // } else if (limit !== null && search !== ""){
        //     router.push(`${router.pathname}?page=1&keyword=${search}&limit=${limit}`)
        // }

        if (isDeleted) {
            Swal.fire("Berhasil ", "Data berhasil dihapus.", "success").then((result) => {
                if (result.isConfirmed) {
                    window.location.reload()
                }
            });
            dispatch({
                type: DELETE_KATEGORI_RESET
            })
        }
    }, [dispatch, isDeleted ])

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Apakah anda yakin ?',
            text: "Data ini tidak bisa dikembalikan !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya !',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteKategori(id))
            }
        })
    }

    const onNewReset = () => {
        router.replace('/publikasi/kategori', undefined, { shallow: true })
    }

    const handlePagination = (pageNumber) => {
        if (limit !== null  && search === "") {
            router.push(`${router.pathname}?page=${pageNumber}&limit=${limit}`)
        
        } else if (limit !== null && search !== "" ) {
            router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&limit=${limit}`)

        } else if (limit === null && search !== "" ) {
            router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}`)
        
        } else {
            router.push(`${router.pathname}?page=${pageNumber}`)
        }
    }

    const handleSearch = () => {
        if (limit != null) {
            router.push(`${router.pathname}?page=1&keyword=${search}&limit=${limit}`)

        // } else if (limit !== null && keyword !== null ) {
        //     router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&limit=${limit}`)

        } else {
            router.push(`${router.pathname}?page=1&keyword=${search}`)
        }
    }

    const handleLimit = (val) => {
        setLimit(val)
        if (search === "") {
            router.push(`${router.pathname}?page=1&limit=${val}`);
        
        } else {
            router.push(`${router.pathname}?page=1&keyword=${val}&limit=${limit}`)
        }
        
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
            {success ?
                <div className="alert alert-custom alert-light-success fade show mb-5" role="alert">
                    <div className="alert-icon"><i className="flaticon2-checkmark"></i></div>
                    <div className="alert-text">Berhasil Menyimpan Data</div>
                    <div className="alert-close">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={onNewReset} >
                            <span aria-hidden="true"><i className="ki ki-close"></i></span>
                        </button>
                    </div>
                </div>
                : ''
            }

            <div className="col-lg-12 order-1 px-0">
                <div className="card card-custom card-stretch gutter-b">
                    <div className="card-header border-0">
                        <h3 className="card-title font-weight-bolder text-dark">Manajemen Kategori</h3>
                        <div className="card-toolbar">
                            <Link href='/publikasi/kategori/tambah'>
                                <a className="btn btn-light-success px-6 font-weight-bold btn-block ">
                                    Tambah Kategori
                                </a>
                            </Link>
                        </div>
                    </div>

                    <div className="card-body pt-0">

                        <div className="table-filter">
                            <div className="row align-items-center">
                                <div className="col-lg-10 col-xl-10">
                                    <div className="input-icon">
                                        <input
                                            style={{ background: "#F3F6F9", border: "none" }}
                                            type="text"
                                            className="form-control"
                                            placeholder="Search..."
                                            id="kt_datatable_search_query"
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                        <span>
                                            <i className="flaticon2-search-1 text-muted"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-xl-2">
                                    <button
                                        type="button"
                                        className="btn btn-light-primary btn-block"
                                        onClick={handleSearch}
                                    >
                                        Cari
                                    </button>
                                </div>
                            </div>
                            <div className="row align-items-right">
                                <div className="col-lg-3 col-xl-3 mt-5 mt-lg-5">
                                    <select
                                        className='form-control form-control-sm form-search-date'
                                        onChange={e => setSearch(e.target.value)}
                                        onBlur={e => setSearch(e.target.value)}
                                    >
                                        <option value="" selected>-- SEMUA  --</option>
                                        <option value="Berita">Berita</option>
                                        <option value="Artikel">Artikel</option>
                                        <option value="Galeri">Galeri</option>
                                        <option value="Video">Video</option>
                                        <option value="Imagetron">Imagetron</option>
                                        <option value="Faq">Faq</option>
                                    </select>
                                    <small className="form-text text-muted">
                                        Jenis Kategori
                                    </small>
                                </div>
                                <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5">
                                    <a href="#" className="btn btn-sm btn-light-primary px-6 font-weight-bold btn-block" onClick={handleSearch}>Filter</a>
                                </div>
                            </div>
                        </div>

                        <div className="table-page mt-5">
                            <div className="table-responsive">

                                <LoadingTable loading={loading} />

                                {loading === false ?
                                    <table className='table table-separate table-head-custom table-checkable'>
                                        <thead style={{ background: '#F3F6F9' }}>
                                            <tr>
                                                <th className='text-center'>No</th>
                                                <th >Nama</th>
                                                <th>Jenis Kategori</th>
                                                <th className='text-center'>Aksi</th>
                                            </tr>
                                        </thead>
                                        
                                        <tbody>
                                            {
                                                !paginateKategori || paginateKategori && paginateKategori.kategori.length === 0 ?
                                                    <td className='align-middle text-center' colSpan={4}>Data Masih Kosong</td> :
                                                    paginateKategori && paginateKategori.kategori.map((row, i) => {
                                                        return <tr key={row.id}>
                                                            {/* <td className='align-middle text-center'>{i + 1 * (page * 5 || limit) - 4}</td> */}
                                                            <td className='align-middle text-center'>
                                                                {
                                                                    limit === null ?
                                                                    <span className="badge badge-secondary text-muted">
                                                                        {i + 1 * (page * 5 ) - (5 - 1 )}
                                                                    </span>
                                                                    :
                                                                    <span className="badge badge-secondary text-muted">
                                                                        {i + 1 * (page * limit) - (limit - 1)}
                                                                    </span>
                                                                }
                                                                
                                                            </td>
                                                            <td className='align-middle'>{row.nama_kategori}</td>
                                                            <td className='align-middle'>{row.jenis_kategori}</td>
                                                            <td className='align-middle text-center'>
                                                                <ButtonAction icon='write.svg' link={`/publikasi/kategori/${row.id}`} title="Edit"/>
                                                                <button 
                                                                    onClick={() => handleDelete(row.id)} 
                                                                    className='btn mr-1' 
                                                                    style={{ background: '#F3F6F9', borderRadius: '6px' }}
                                                                    data-toggle="tooltip" 
                                                                    data-placement="bottom" 
                                                                    title="Hapus"
                                                                >
                                                                    <Image alt='button-action' src={`/assets/icon/trash.svg`} width={18} height={18} />
                                                                </button>
                                                            </td>
                                                        </tr>

                                                    })
                                            }
                                        </tbody>
                                    </table> : ''
                                }
                            </div>

                            {
                                console.log (kategori)
                            }
                            {
                                console.log (paginateKategori)
                            }
                            {
                                kategori && paginateKategori ?
                                    <div className="row">
                                        {paginateKategori.perPage < kategori.total &&
                                            <div className="table-pagination">
                                                <Pagination
                                                    activePage={page}
                                                    itemsCountPerPage={paginateKategori.perPage}
                                                    totalItemsCount={kategori.total}
                                                    pageRangeDisplayed={3}
                                                    onChange={handlePagination}
                                                    nextPageText={'>'}
                                                    prevPageText={'<'}
                                                    firstPageText={'<<'}
                                                    lastPageText={'>>'}
                                                    itemClass='page-item'
                                                    linkClass='page-link'
                                                />
                                            </div>
                                        }
                                        {/* {kategori && kategori.total > 5 ?
                                            <div className="table-total ml-auto">
                                                <div className="row">
                                                    <div className="col-4 mr-0 p-0">
                                                        <select
                                                            className="form-control"
                                                            id="exampleFormControlSelect2"
                                                            style={{
                                                                width: "65px",
                                                                background: "#F3F6F9",
                                                                borderColor: "#F3F6F9",
                                                                color: "#9E9E9E",
                                                            }}
                                                            onChange={e => handleLimit(e.target.value)}
                                                            onBlur={e => handleLimit(e.target.value)}
                                                        >
                                                            <option value='5' selected={limit == "5" ? true: false}>5</option>
                                                            <option value='10' selected={limit == "10" ? true: false}>10</option>
                                                            <option value='15' selected={limit === "15" ? true: false}>15</option>
                                                            <option value='20' selected={limit === "20" ? true: false}>20</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-8 my-auto">
                                                        <p className='align-middle mt-3' style={{ color: '#B5B5C3' }}>Total Data {kategori.total}</p>
                                                    </div>
                                                </div>
                                            </div> : ''
                                        } */}
                                        <div className="table-total ml-auto">
                                            <div className="row">
                                                <div className="col-4 mr-0 p-0">
                                                    <select
                                                        className="form-control"
                                                        id="exampleFormControlSelect2"
                                                        style={{
                                                            width: "65px",
                                                            background: "#F3F6F9",
                                                            borderColor: "#F3F6F9",
                                                            color: "#9E9E9E",
                                                        }}
                                                        onChange={e => handleLimit(e.target.value)}
                                                        onBlur={e => handleLimit(e.target.value)}
                                                    >
                                                        <option value='5' selected={limit == "5" ? true: false}>5</option>
                                                        <option value='10' selected={limit == "10" ? true: false}>10</option>
                                                        <option value='15' selected={limit === "15" ? true: false}>15</option>
                                                        <option value='20' selected={limit === "20" ? true: false}>20</option>
                                                    </select>
                                                </div>
                                                <div className="col-8 my-auto">
                                                    <p className='align-middle mt-3' style={{ color: '#B5B5C3' }}>Total Data {kategori.total}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                :
                                    null
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}

export default Kategori