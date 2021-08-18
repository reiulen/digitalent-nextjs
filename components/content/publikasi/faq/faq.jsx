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
import { deleteFaq, updatePinFaq } from '../../../../redux/actions/publikasi/faq.actions'
import { DELETE_FAQ_RESET } from '../../../../redux/types/publikasi/faq.type'

const Faq = () => {
    const importSwitch = () => import("bootstrap-switch-button-react");
    const SwitchButton = dynamic(importSwitch, {
        ssr: false,
    });

    const dispatch = useDispatch()
    const router = useRouter()

    const { loading, error, faq } = useSelector(state => state.allFaq)
    const { error: deleteError, isDeleted } = useSelector(state => state.deleteFaq)

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [limit, setLimit] = useState(null)
    const [search, setSearch] = useState('')

    let { page = 1, success } = router.query
    page = Number(page)

    useEffect(() => {
        if (limit) {
            router.push(`${router.pathname}?page=1&limit=${limit}`)
        }
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
    }, [dispatch, limit, isDeleted])

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
        if (limit !== null) {
            router.push(`${router.pathname}?page=${pageNumber}&limit=${limit}`);
        } else {
            router.push(`${router.pathname}?page=${pageNumber}`);
        }
    };

    const handleSearch = () => {
        if (limit !== null) {
            router.push(`${router.pathname}?page=1&keyword=${search}&limit=${limit}`);
        } else {
            router.push(`${router.pathname}?page=1&keyword=${search}`);
        }
    };

    const handleSearchDate = () => {
        if (limit !== null) {
            router.push(
                `${router.pathname}?page=1&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}&limit=${limit}`
            );
        } else {
            router.push(
                `${router.pathname}?page=1&startdate=${moment(startDate).format("YYYY-MM-DD")}&enddate=${moment(endDate).format("YYYY-MM-DD")}`
            ); 
        }
        
    };

    const handleLimit = (val) => {
        setLimit(val);
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
                    <CardPage background='bg-light-info' icon='mail-purple.svg' color='#8A50FC' value='90' titleValue='FAQ' title='Total Publish' />
                    <CardPage background='bg-light-warning' icon='garis-yellow.svg' color='#634100' value='64' titleValue='FAQ' title='Total Author' />
                    <CardPage background='bg-light-danger' icon='kotak-kotak-red.svg' color='#F65464' value='64' titleValue='FAQ' title='Total Unpublish' />
                </div>
            </div>


            <div className="col-lg-12 order-1 px-0">
                <div className="card card-custom card-stretch gutter-b">
                    <div className="card-header border-0">
                        <h3 className="card-title font-weight-bolder text-dark">Managemen FAQ</h3>
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
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                !faq || faq && faq.faq.length === 0 ?
                                                    <td className='align-middle text-center' colSpan={9}>Data Masih Kosong</td> :
                                                    faq && faq.faq.map((row, i) => {
                                                        return <tr key={row.id}>
                                                            <td className='align-middle text-center'>
                                                                <span className="badge badge-secondary text-muted">
                                                                    {i + 1 * (page * 5 || limit) - 4}
                                                                </span>
                                                            </td>
                                                            <td className='align-middle'>{row.judul}</td>
                                                            <td className='align-middle'>{row.kategori}</td>
                                                            <td className='align-middle'>
                                                                {row.publish === 1 ? (
                                                                    row.created_at
                                                                ) : (
                                                                    <span class="label label-inline label-light-danger font-weight-bold">
                                                                        Belum dipublish
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className='align-middle'>{row.dibuat}</td>
                                                            <td className='align-middle'>
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
                                                            </td>
                                                            <td className='align-middle'>
                                                                {row.publish === 1 ? (
                                                                    <span class="label label-inline label-light-success font-weight-bold">
                                                                        Publish
                                                                    </span>
                                                                ) : (
                                                                    <span class="label label-inline label-light-warning font-weight-bold">
                                                                        Belum dipublish
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className='align-middle'>{row.role}</td>
                                                            <td className='align-middle'>
                                                                <ButtonAction icon='write.svg' link={`/publikasi/faq/${row.id}`} />
                                                                <button
                                                                    onClick={() => handleDelete(row.id)}
                                                                    className="btn mr-1"
                                                                    style={{
                                                                        background: "#F3F6F9",
                                                                        borderRadius: "6px",
                                                                    }}
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
                                {faq && faq.total > 5 ?
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
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}

export default Faq