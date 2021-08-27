import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import dynamic from "next/dynamic";

import Pagination from 'react-js-pagination';
import DatePicker from 'react-datepicker'
import { addDays } from 'date-fns'
import LoadingTable from '../../../LoadingTable';

import PageWrapper from '../../../wrapper/page.wrapper'
import CardPage from '../../../CardPage'
import ButtonAction from '../../../ButtonAction'

import { useDispatch, useSelector } from 'react-redux'
import { deleteFaq, updatePinFaq, getAllFaqPagination } from '../../../../redux/actions/publikasi/faq.actions'
import { DELETE_FAQ_RESET } from '../../../../redux/types/publikasi/faq.type'

const Faq = () => {
    const importSwitch = () => import("bootstrap-switch-button-react");
    const SwitchButton = dynamic(importSwitch, {
        ssr: false,
    });

    const dispatch = useDispatch()
    const router = useRouter()

    const { loading, error, faq } = useSelector(state => state.allFaq)
    const { paginateFaq } = useSelector(state => state.paginationFaq)
    const { error: deleteError, isDeleted } = useSelector(state => state.deleteFaq)

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [limit, setLimit] = useState(null)
    const [search, setSearch] = useState('')

    const [publishValue, setPublishValue] = useState(null);

    let { page = 1, success } = router.query
    page = Number(page)

    useEffect(() => {
        // dispatch (getAllFaqPagination())

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
                type: DELETE_FAQ_RESET
            })
        }

    }, [dispatch, isDeleted, ])

    const onSetPin = (checked, id) => {
        const data = {
            pinned: checked === true ? 1 : 0,
            _method: 'put'
        }

        dispatch(updatePinFaq(data, id))
    };

    const onNewReset = () => {
        router.replace("/publikasi/faq", undefined, { shallow: true });
    };

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
                dispatch(deleteFaq(id));
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

    };

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
            {success ? (
                <div
                    className="alert alert-custom alert-light-success fade show mb-5"
                    role="alert"
                >
                    <div className="alert-icon">
                        <i className="flaticon2-checkmark"></i>
                    </div>
                    <div className="alert-text">Berhasil Menyimpan Data</div>
                    <div className="alert-close">
                        <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-label="Close"
                            onClick={onNewReset}
                        >
                            <span aria-hidden="true">
                                <i className="ki ki-close"></i>
                            </span>
                        </button>
                    </div>
                </div>
            ) : (
                ""
            )}

            <div className="col-lg-12 col-md-12">
                <div className="row">
                    <CardPage 
                        background='bg-light-info' 
                        icon='mail-purple.svg' 
                        color='#8A50FC' 
                        value={faq && faq.publish != "" ? faq.publish : 0} 
                        titleValue='FAQ' 
                        title='Total Publish'
                        publishedVal="1"
                        routePublish={() => handlePublish("1")} 
                    />
                    <CardPage 
                        background='bg-light-warning' 
                        icon='garis-yellow.svg' 
                        color='#634100' 
                        value='64' 
                        titleValue='FAQ' 
                        title='Total Author'
                        publishedVal=""
                        routePublish={() => handlePublish("")} 
                    />
                    <CardPage 
                        background='bg-light-danger' 
                        icon='kotak-kotak-red.svg' 
                        color='#F65464' 
                        value={faq && faq.publish != "" ? faq.unpublish : 0}  
                        titleValue='FAQ' 
                        title='Total Unpublish' 
                        publishedVal="0"
                        routePublish={() => handlePublish("0")}
                    />
                </div>
            </div>

            <div className="col-lg-12 order-1 px-0">
                <div className="card card-custom card-stretch gutter-b">
                    <div className="card-header border-0">
                        <h3 className="card-title font-weight-bolder text-dark">Manajemen FAQ</h3>
                        <div className="card-toolbar">
                            <Link href='/publikasi/faq/tambah'>
                                <a className="btn btn-light-success px-6 font-weight-bold btn-block ">
                                    Tambah FAQ
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
                                <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5">
                                    <DatePicker
                                        className="form-search-date form-control-sm form-control"
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        dateFormat="dd/MM/yyyy"
                                    />
                                    <small className="form-text text-muted">Dari Tanggal</small>
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
                                    <small className="form-text text-muted">Sampai Tanggal</small>
                                </div>
                                <div className="col-lg-2 col-xl-2 mt-5 mt-lg-5">
                                    <button
                                        type="button"
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
                                                <th className='text-center'>No</th>
                                                <th>Judul</th>
                                                <th>Kategori</th>
                                                <th>Tanggal Publish</th>
                                                <th>Dibuat</th>
                                                <th>Pin FAQ</th>
                                                <th>Status</th>
                                                <th>Role</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                !faq || faq && faq.faq.length === 0 ?
                                                    <td className='align-middle text-center' colSpan={9}>Data Masih Kosong</td> :
                                                    faq && faq.faq.map((row, i) => {
                                                        return <tr key={row.id}>
                                                            {/* <td className='align-middle text-center'>
                                                                <span className="badge badge-secondary text-muted">
                                                                    {i + 1 * (page * 5 || limit) - 4}
                                                                </span>
                                                            </td> */}
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
                                                            <td className='align-middle'>{row.judul}</td>
                                                            <td className='align-middle'>{row.kategori}</td>
                                                            <td className='align-middle'>
                                                                {row.publish === 1 ? (
                                                                    row.tanggal_publish
                                                                ) : (
                                                                    <span className="label label-inline label-light-danger font-weight-bold">
                                                                        Belum dipublish
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className='align-middle'>
                                                                {/* {row.dibuat} */}
                                                                Super Admin
                                                            </td>
                                                            <td className='align-middle'>
                                                                {
                                                                    row.publish === 1 ? 
                                                                    <SwitchButton
                                                                        checked={row.pinned === 1 ? true : false}
                                                                        onlabel=" "
                                                                        onstyle="primary"
                                                                        offlabel=" "
                                                                        offstyle="secondary"
                                                                        size="sm"
                                                                        width={30}
                                                                        onChange={(checked) => onSetPin(checked, row.id)}
                                                                    />
                                                                    :
                                                                    <div className="text-center ml-1"> - </div>
                                                                }
                                                                
                                                            </td>
                                                            <td className='align-middle'>
                                                                {row.publish === 1 ? (
                                                                    <span className="label label-inline label-light-success font-weight-bold">
                                                                        Publish
                                                                    </span>
                                                                ) : (
                                                                    <span className="label label-inline label-light-warning font-weight-bold">
                                                                        Belum dipublish
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className='align-middle'>
                                                                {/* {row.role} */}
                                                                Super Admin
                                                            </td>
                                                            <td className='align-middle'>
                                                                <ButtonAction icon='write.svg' link={`/publikasi/faq/${row.id}`} title="Edit"/>
                                                                <button
                                                                    onClick={() => handleDelete(row.id)}
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
                                {faq && faq.perPage < faq.total &&
                                    <div className="table-pagination">
                                        <Pagination
                                            activePage={page}
                                            itemsCountPerPage={faq.perPage}
                                            totalItemsCount={faq.total}
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
                                {/* {faq && faq.total > 5 ?
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
                                                    <option value='5'>5</option>
                                                    <option value='10'>10</option>
                                                    <option value='15'>15</option>
                                                    <option value='20'>20</option>
                                                </select>
                                            </div>
                                            <div className="col-8 my-auto">
                                                <p className='align-middle mt-3' style={{ color: '#B5B5C3' }}>Total Data {faq.total}</p>
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
                                                <option value='15' selected={limit == "15" ? true: false}>15</option>
                                                <option value='20' selected={limit == "20" ? true: false}>20</option>
                                            </select>
                                        </div>
                                        <div className="col-8 my-auto">
                                            <p className='align-middle mt-3' style={{ color: '#B5B5C3' }}>Total Data {faq.total}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}


export default Faq