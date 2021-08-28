import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import Pagination from 'react-js-pagination';
import { css } from '@emotion/react'
import BeatLoader from 'react-spinners/BeatLoader'
import DatePicker from 'react-datepicker'
import { addDays } from 'date-fns'
import Swal from "sweetalert2";
import moment from "moment";

import PageWrapper from '../../../wrapper/page.wrapper'
import CardPage from '../../../CardPage'
import ButtonAction from '../../../ButtonAction'
import LoadingTable from "../../../LoadingTable";
// import ButtonNewTab from "../../../ButtonNewTab";

import { useDispatch, useSelector } from 'react-redux'
import { deleteGaleri, clearErrors } from '../../../../redux/actions/publikasi/galeri.actions'

import {
    DELETE_GALERI_RESET
  } from '../../../../redux/types/publikasi/galeri.type'

const Galeri = () => {

    const dispatch = useDispatch()
    const router = useRouter()

    // const { loading, error, galeri } = useSelector(state => state.allGaleri)
    const { loading: allLoading, error, galeri } = useSelector((state) => state.allGaleri);
    const { loading: deleteLoading, error: deleteError, isDeleted } = useSelector((state) => state.deleteGaleri);

    const [search, setSearch] = useState('')
    const [limit, setLimit] = useState(null)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [publishValue, setPublishValue] = useState(null)
    const [index_galleri, setIndexGalleri] = useState (null)

    let loading = false

    let { page = 1, keyword, success } = router.query;
    if (allLoading) {
        loading = allLoading
    } else if (deleteLoading) {
        loading = deleteLoading
    }
    page = Number(page);

    useEffect(() => {
        // if (limit) {
        //   router.push(`${router.pathname}?page=1&limit=${limit}`)
        // }

        if (isDeleted) {
          Swal.fire("Berhasil ", "Data berhasil dihapus.", "success").then((result) => {
            if (result.isConfirmed) {
              window.location.reload()
            }
          });
          dispatch({
            type: DELETE_GALERI_RESET
          })
        }

      }, [isDeleted, dispatch]);

    // const override = css`
    //     margin: 0 auto;
    // `;

    const onNewReset = () => {
        router.replace('/publikasi/galeri', undefined, { shallow: true })
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Apakah anda yakin ?",
            text: "Data ini tidak bisa dikembalikan !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya !",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
            dispatch(deleteGaleri(id));
            }
        });
    };

    const handlePagination = (pageNumber) => {
        if (limit !== null  && search === "" && startDate === null && endDate === null) {
            router.push(`${router.pathname}?page=${pageNumber}&limit=${limit}`)
        
        } else if (limit !== null && search !== "" && startDate === null && endDate === null) {
            router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&limit=${limit}`)
    
        } else if (limit === null && search !== "" && startDate === null && endDate === null) {
            router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}`)
    
        } else if (limit !== null  && search === "" && startDate !== null && endDate !== null) {
            router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)
    
        } else if (limit !== null  && search !== "" && startDate !== null && endDate !== null) {
            router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&limit=${limit}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)
        
        } else if (limit === null  && search !== "" && startDate !== null && endDate !== null) {
            router.push(`${router.pathname}?page=${pageNumber}&keyword=${search}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)
        
        } else {
            router.push(`${router.pathname}?page=${pageNumber}`)
        }
      }

    const handleSearch = () => {
        if (limit != null && startDate === null && endDate === null) {
           router.push(`${router.pathname}?page=1&keyword=${search}&limit=${limit}`)
    
        } else if (limit !== null && startDate !== null && endDate !== null ) {
           router.push(`${router.pathname}?page=1&keyword=${search}&limit=${limit}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)
    
        } else {
          router.push(`${router.pathname}?page=1&keyword=${search}`)
        }
    }

    const handleSearchDate = () => {
        if (moment(startDate).format("YYYY-MM-DD") > moment(endDate).format("YYYY-MM-DD")){
            Swal.fire(
                'Oops !',
                'Tanggal sebelum tidak boleh melebihi tanggal sesudah.',
                'error'
            )
            setStartDate (null)
            setEndDate (null)
    
        } else {
            if (limit !== null && search === null) {
                router.push(
                    `${router.pathname}?page=1&keyword=${search}startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&limit=${limit}`
                );
    
            } else if (limit !== null && search !== null) {
              `${router.pathname}?page=1&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&limit=${limit}`
    
            } else {
                router.push(
                    `${router.pathname}?page=1&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`
                ); 
            }
        }
    };

    const handleLimit = (val) => {
        setLimit(val)
        if (search === "") {
            router.push(`${router.pathname}?page=1&limit=${val}`);
        
        } else {
            router.push(`${router.pathname}?page=1&keyword=${val}&limit=${limit}`)
        }
        
    };
    
    const handlePublish = (val) => {
        if (val !== null || val !== "") {
          setPublishValue (val)
    
          if ( startDate === null && endDate === null && limit === null && search === null){
            router.push(`${router.pathname}?publish=${val}`);
      
          } else if ( startDate !== null && endDate !== null && limit === null && search === null) {
              router.push(`${router.pathname}?publish=${val}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`)
      
          } else if ( startDate !== null && endDate !== null && limit !== null && search === null) {
              router.push(`${router.pathname}?publish=${val}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&limit=${limit}`)
          
          } else if ( startDate !== null && endDate !== null && limit === null && search !== null) {
              router.push(`${router.pathname}?publish=${val}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&keyword=${search}`)
      
          } else if ( startDate === null && endDate === null && limit !== null && search === null) {
              router.push(`${router.pathname}?publish=${val}&limit=${limit}`);
      
          } else if ( startDate === null && endDate === null && limit === null && search !== null) {
              router.push(`${router.pathname}?publish=${val}&keyword=${search}`);
          
          } else if ( startDate === null && endDate === null && limit !== null && search !== null) {
              router.push(`${router.pathname}?publish=${val}&limit=${limit}&keyword=${search}`);
          
          } else if ( startDate !== null && endDate !== null && limit !== null && search !== null) {
              router.push(`${router.pathname}?publish=${val}&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&limit=${limit}&keyword=${search}`)
          }
        }
        
    }

    const handleIndexGallery = (i) => {
        setIndexGalleri(i)
    }

    return (
        <PageWrapper>
            {
                console.log (galeri)
            }
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
                    <div className="alert-text">Berhasil Menambah Data</div>
                    <div className="alert-close">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={onNewReset} >
                        <span aria-hidden="true"><i className="ki ki-close"></i></span>
                        </button>
                    </div>
                    </div>
                    : ''
                }

            <div className="col-lg-12 col-md-12">
                <div className="row">
                    <CardPage 
                        background='bg-light-info' 
                        icon='mail-purple.svg' 
                        color='#8A50FC' 
                        value={galeri && galeri.publish != "" ? galeri.publish : 0} 
                        titleValue='Galeri' 
                        title='Total Publish'
                        publishedVal = "1"
                        routePublish = { () => handlePublish("1")} 
                    />
                    <CardPage 
                        background='bg-light-warning' 
                        icon='garis-yellow.svg' 
                        color='#634100' 
                        value='64' 
                        titleValue='Galeri' 
                        title='Total Author' 
                        publishedVal = ""
                        routePublish = { () => handlePublish("")}
                    />
                    <CardPage 
                        background='bg-light-success' 
                        icon='orang-tambah-green.svg' 
                        color='#74BBB7' 
                        value='64' 
                        titleValue='K' 
                        title='Total Yang Baca' 
                        publishedVal = ""
                        routePublish = { () => handlePublish("")}
                    />
                    <CardPage 
                        background='bg-light-danger' 
                        icon='kotak-kotak-red.svg' 
                        color='#F65464' 
                        value={galeri && galeri.unpublish != "" ? galeri.unpublish : 0} 
                        titleValue='Galeri' 
                        title='Total Unpublish' 
                        publishedVal = "0"
                        routePublish = { () => handlePublish("0")}
                    />
                </div>
            </div>


            <div className="col-lg-12 order-1 px-0">
                <div className="card card-custom card-stretch gutter-b">
                    <div className="card-header border-0">
                        <h3 className="card-title font-weight-bolder text-dark">Manajemen Galeri</h3>
                        <div className="card-toolbar">
                            <Link href='/publikasi/galeri/tambah'>
                                <a className="btn btn-light-success px-6 font-weight-bold btn-block ">
                                    Tambah Galeri
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
                                        onChange={e => setSearch(e.target.value)}
                                        />
                                        <span>
                                        <i className="flaticon2-search-1 text-muted"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-xl-2">
                                    <button type="button" className='btn btn-light-primary btn-block' onClick={handleSearch}>Cari</button>
                                </div>
                            </div>
                            <div className="row align-items-right">
                                <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5">
                                    <DatePicker
                                        className="form-search-date form-control-sm form-control"
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        dateFormat="dd/MM/yyyy"
                                    // minDate={addDays(new Date(), 20)}
                                    />
                                    <small className="form-text text-muted">
                                        Dari Tanggal
                                    </small>
                                </div>
                                <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5">
                                    <DatePicker
                                        className="form-search-date form-control-sm form-control"
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                        maxDate={addDays(startDate, 20)}
                                        dateFormat="dd/MM/yyyy"
                                    />
                                    <small className="form-text text-muted">
                                        Sampai Tanggal
                                    </small>
                                </div>
                                <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5">
                                    <button
                                        type='button'
                                        className="btn btn-sm btn-light-primary px-6 font-weight-bold btn-block"
                                        onClick={handleSearchDate}
                                    >
                                        Cari
                                    </button>
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
                                                <th className="text-center">No</th>
                                                <th className='text-center'>Thumbnail</th>
                                                <th>Kategori</th>
                                                <th>Judul</th>
                                                <th>Tanggal Publish</th>
                                                <th>Dibuat</th>
                                                <th>Status</th>
                                                <th>Role</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        {/* {
                                            console.log (galeri)
                                        } */}
                                        <tbody>
                                            {
                                                !galeri || galeri && galeri.gallery.length === 0 ?
                                                    <td className='align-middle text-center' colSpan={8}>Data Masih Kosong</td> :
                                                    galeri && galeri.gallery.map((row, i) => {
                                                        return <tr key={row.id}>
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
                                                            <td className='text-center'>
                                                                <Image alt='name_image' 
                                                                unoptimized={
                                                                    process.env.ENVIRONMENT !== "PRODUCTION"
                                                                }
                                                                loader={() => (process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                                                    "publikasi/images/" +
                                                                    row.gambar)}
                                                                src={
                                                                    process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                                                    "publikasi/images/" +
                                                                    row.gambar
                                                                } 
                                                                width={80} height={50} />
                                                            </td>
                                                            <td className='align-middle'>{row.kategori_id}</td>
                                                            <td className='align-middle'>{row.judul}</td>
                                                            <td className='align-middle'>{
                                                                row.status === 1 ? (
                                                                    row.tanggal_publish
                                                                  ) : (
                                                                    <span className="label label-inline label-light-danger font-weight-bold">
                                                                      Belum dipublish
                                                                    </span>
                                                                  )
                                                            }</td>
                                                            <td className='align-middle'>
                                                                {/* {row.role_name} */}
                                                                Super Admin
                                                            </td>
                                                            <td className='align-middle'>
                                                                { row.status  === 1 ? (
                                                                    <span className="label label-inline label-light-success font-weight-bold">
                                                                    Publish
                                                                  </span>
                                                                ) : (
                                                                  <span className="label label-inline label-light-warning font-weight-bold">
                                                                    Belum di publish
                                                                  </span>
                                                                )}
                                                            </td>
                                                            <td className='align-middle'>Super Admin</td>
                                                            <td className='align-middle'>
                                                                {/* <ButtonAction icon='setting.svg' data-toggle="modal" data-target="#exampleModalCenter"/> */}
                                                                <button
                                                                    className='btn mr-1' 
                                                                    style={{ background: '#F3F6F9', borderRadius: '6px' }} 
                                                                    data-target="#exampleModalCenter" 
                                                                    data-toggle="modal"
                                                                    onClick={() => handleIndexGallery(i)}
                                                                    
                                                                >
                                                                    <Image
                                                                        alt="button-action"
                                                                        src={`/assets/icon/setting.svg`}
                                                                        width={18}
                                                                        height={18}
                                                                    />
                                                                </button>
                                                                <ButtonAction icon='write.svg' link={`/publikasi/galeri/${row.id_gallery}`} title="Edit"/>
                                                                <button
                                                                    onClick={() => handleDelete(row.id_gallery)}
                                                                    className="btn mr-1"
                                                                    style={{
                                                                        background: "#F3F6F9",
                                                                        borderRadius: "6px",
                                                                    }}
                                                                    data-toggle="tooltip" 
                                                                    data-placement="bottom" 
                                                                    title="Hapus"
                                                                    >
                                                                    <Image
                                                                        alt="button-action"
                                                                        src={`/assets/icon/trash.svg`}
                                                                        width={18}
                                                                        height={18}
                                                                    />
                                                                </button>
                                                            </td>
                                                        </tr>

                                                    })
                                            }
                                        </tbody>
                                    </table> : ''
                                }
                            </div>

                            <div className="row">
                                {galeri && galeri.perPage < galeri.total &&
                                    <div className="table-pagination">
                                        <Pagination
                                            activePage={page}
                                            itemsCountPerPage={galeri.perPage}
                                            totalItemsCount={galeri.total}
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
                                {galeri && galeri.total > 5 ?
                                    <div className="table-total ml-auto">
                                        <div className="row">
                                            <div className="col-4 mr-0 p-0">
                                                <select className="form-control" id="exampleFormControlSelect2" style={{ width: '65px', background: '#F3F6F9', borderColor: '#F3F6F9', color: '#9E9E9E' }} onChange={e => handleLimit(e.target.value)} onBlur={e => handleLimit(e.target.value)}>
                                                    <option value='5' selected={limit == "5" ? true: false}>5</option>
                                                    <option value='10' selected={limit == "10" ? true: false}>10</option>
                                                    <option value='15' selected={limit == "15" ? true: false}>15</option>
                                                    <option value='20' selected={limit == "20" ? true: false}>20</option>
                                                </select>
                                            </div>
                                            <div className="col-8 my-auto">
                                                <p className='align-middle mt-3' style={{ color: '#B5B5C3' }}>Total Data {galeri.total}</p>
                                            </div>
                                        </div>
                                    </div> : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Modal */}
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Image Preview</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {/* {
                            console.log (galeri)
                        } */}
                        <div className="modal-body text-center" style={{ height: '400px' }}>
                            <div className="row">
                                <div className="col-7">
                                    {
                                        galeri && galeri.gallery.length !== 0 ?
                                            galeri.gallery.map ((row, i) => {
                                                return (
                                                    <Image
                                                    key={i}
                                                    loader={() => (process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                                        "publikasi/images/" +
                                                        row.gambar)}
                                                    src={
                                                        process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                                        "publikasi/images/" +
                                                        row.gambar
                                                    } 
                                                    
                                                    alt='image'
                                                    layout='fill'
                                                    objectFit='cover'
                                                    />
                                                )
                                            })
                                            
                                        :
                                            null
                                    }
                                </div>
                                <div className="col-5">
                                    {
                                        galeri && galeri.gallery.length !== 0  && index_galleri !== null ?
                                        <>
                                            <div className="row mb-1">
                                                <h5>
                                                    {galeri.gallery[index_galleri].judul}
                                                </h5>
                                            </div>
                                            <div className="row mb-1">
                                                <div style={{ background: "#F3F6F9"}} 
                                                    className="mr-5 px-3 py-1 rounded mb-1">
                                                    <i className="flaticon2-user"></i>
                                                    <span className="ml-1">
                                                        User : Super Admin 
                                                        {/* User : {galeri.gallery[index_galleri].role_name}  */}
                                                    </span>
                                                </div>

                                                <div style={{ background: "#F3F6F9"}} 
                                                    className="mr-5 px-3 py-1 rounded mb-1">
                                                    <i className="flaticon2-calendar-4"></i>
                                                    <span className="ml-1">
                                                        Publish: {galeri.gallery[index_galleri].tanggal_publish}  
                                                    </span>
                                                </div>

                                                
                                            
                                            </div>
                                            <div className="row mb-1">
                                                <p dangerouslySetInnerHTML={{__html: galeri.gallery[index_galleri].isi_galleri}}>
                                                </p>
                                            </div>
                                        </>
                                        :
                                        <div>
                                            Data Kosong
                                        </div>
                                    }
                                    
                                </div>
                                
                            </div>
                            
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Tutup</button>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}


export default Galeri