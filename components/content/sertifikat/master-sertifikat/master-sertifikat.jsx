// #Next & React
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// #Page, Component & Library
import PageWrapper from "../../../wrapper/page.wrapper";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import LoadingTable from "../../../LoadingTable";
import Pagination from "react-js-pagination";
import Image from "next/image";
// #Icon
import IconArrow from "../../../assets/icon/Arrow";
import IconClose from "../../../assets/icon/Close";
import IconFilter from "../../../assets/icon/Filter";

export default function MasterSertifikat() {
    const router = useRouter();

    const handleLimit = () => {
        console.log("");
    };

    const handleSearch = () => {
        console.log("");
    };

    // #DatePicker
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const resetValueSort = () => {
        setStartDate(null);
        setEndDate(null);
    };
    // #DatePicker

    const [limit, setLimit] = useState(null);

    const loading = false;
    let { page = 1, keyword, success } = router.query;

    const artikel = {
        total: 20,
        artikel: [
            {
                id: 110,
                akademi: "FGA",
                nama_pelatihan: "Security Awareness",
                nama_sertifikat: "Sertifikat A",
                jenis_sertifikat: "1 sisi",
                status: "belum tersedia",
            },
            {
                id: 111,
                akademi: "FGA",
                nama_pelatihan: "Security Awareness",
                nama_sertifikat: "Sertifikat B",
                jenis_sertifikat: "1 sisi",
                status: "review",
            },
            {
                id: 112,
                akademi: "FGA",
                nama_pelatihan: "Security Awareness",
                nama_sertifikat: "Sertifikat C",
                jenis_sertifikat: "1 sisi",
                status: "draft",
            },
            {
                id: 112,
                akademi: "FGA",
                nama_pelatihan: "Security Awareness",
                nama_sertifikat: "Sertifikat C",
                jenis_sertifikat: "1 sisi",
                status: "publish",
            },
            {
                id: 112,
                akademi: "FGA",
                nama_pelatihan: "Security Awareness",
                nama_sertifikat: "Sertifikat C",
                jenis_sertifikat: "1 sisi",
                status: "ditolak",
            },
            {
                id: 112,
                akademi: "FGA",
                nama_pelatihan: "Security Awareness",
                nama_sertifikat: "Sertifikat C",
                jenis_sertifikat: "1 sisi",
                status: "revisi",
            },
        ],
    };

    return (
        <PageWrapper>
            {/* error START */}
            {/* error END */}
            <div className="col-lg-12 order-1 px-0">
                <div className="card card-custom card-stretch gutter-b">
                    <div className="card-header border-0">
                        <h3 className="card-title font-weight-bolder text-dark">
                            Master Sertifikat
                        </h3>
                        <div className="card-toolbar">
                            <Link href="/sertifikat/master-sertifikat/tambah">
                                <a className="btn btn-primary-rounded-full px-6 font-weight-bolder px-5 py-3 mt-2">
                                    <i className="ri-pencil-fill"></i>
                                    Buat Design
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="card-body pt-0">
                        {/* START SEARCHBAR */}
                        <div className="table-filter">
                            <div className="row align-items-center">
                                <div className="col-lg-6 col-xl-6 col-sm-9">
                                    <div
                                        className="position-relative overflow-hidden mt-3"
                                        style={{ maxWidth: "330px" }}
                                    >
                                        <i className="ri-search-line left-center-absolute ml-2"></i>
                                        <input
                                            type="text"
                                            className="form-control pl-10"
                                            placeholder="Ketik disini untuk Pencarian..."
                                            onChange={e =>
                                                setSearch(e.target.value)
                                            }
                                        />
                                        <button
                                            className="btn bg-blue-primary text-white right-center-absolute"
                                            style={{
                                                borderTopLeftRadius: "0",
                                                borderBottomLeftRadius: "0",
                                            }}
                                            onClick={handleSearch}
                                        >
                                            Cari
                                        </button>
                                    </div>
                                </div>
                                {/* START MODAL */}
                                <div className="col-lg-6 col-xl-6 col-sm-9">
                                    <div className="d-flex flex-wrap align-items-center justify-content-end mt-2">
                                        {/* sortir by modal */}
                                        <button
                                            className="avatar item-rtl btn border d-flex align-items-center justify-content-between mt-2"
                                            data-toggle="modal"
                                            data-target="#exampleModalCenter"
                                            style={{
                                                color: "#464646",
                                                minWidth: "230px",
                                            }}
                                        >
                                            <div className="d-flex align-items-center">
                                                <IconFilter className="mr-3" />
                                                Pilih Akademi
                                            </div>
                                            <IconArrow
                                                fill="#E4E6EF"
                                                width="11"
                                                height="11"
                                            />
                                        </button>

                                        {/* START MODAL UNFINISH*/}
                                        <form
                                            // id="kt_docs_formvalidation_text"
                                            className="form text-left"
                                            // action="#"
                                            // autoComplete="off"
                                            // onSubmit={handleSubmitSearchMany}
                                        >
                                            <div
                                                className="modal fade"
                                                id="exampleModalCenter"
                                                tabIndex="-1"
                                                role="dialog"
                                                aria-labelledby="exampleModalCenterTitle"
                                                aria-hidden="true"
                                            >
                                                <div
                                                    className="modal-dialog modal-dialog-centered"
                                                    role="document"
                                                >
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5
                                                                className="modal-title font-weight-bold"
                                                                id="exampleModalLongTitle"
                                                            >
                                                                Filter
                                                            </h5>
                                                            <button
                                                                type="button"
                                                                className="close"
                                                                data-dismiss="modal"
                                                                aria-label="Close"
                                                                onClick={() =>
                                                                    resetValueSort()
                                                                }
                                                            >
                                                                <IconClose />
                                                            </button>
                                                        </div>

                                                        <div
                                                            className="modal-body text-left"
                                                            style={{
                                                                height: "200px",
                                                            }}
                                                        >
                                                            <div className="mb-10 col-12">
                                                                <label className="required fw-bold fs-6 mb-2">
                                                                    Tanggal
                                                                </label>

                                                                <div>
                                                                    <DatePicker
                                                                        className="form-search-date form-control-sm form-control"
                                                                        selected={
                                                                            startDate
                                                                        }
                                                                        onChange={date =>
                                                                            setStartDate(
                                                                                date
                                                                            )
                                                                        }
                                                                        selectsStart
                                                                        startDate={
                                                                            startDate
                                                                        }
                                                                        endDate={
                                                                            endDate
                                                                        }
                                                                        dateFormat="dd/MM/yyyy"
                                                                        placeholderText="Silahkan Isi Tanggal Dari"
                                                                        wrapperClassName="col-12 col-lg-12 col-xl-12"
                                                                        minDate={moment().toDate()}
                                                                        // minDate={addDays(new Date(), 20)}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="mb-10 col-12">
                                                                <label className="required fw-bold fs-6 mb-2">
                                                                    Tanggal
                                                                </label>

                                                                <div>
                                                                    <DatePicker
                                                                        className="form-search-date form-control-sm form-control"
                                                                        selected={
                                                                            endDate
                                                                        }
                                                                        onChange={date =>
                                                                            setEndDate(
                                                                                date
                                                                            )
                                                                        }
                                                                        selectsEnd
                                                                        startDate={
                                                                            startDate
                                                                        }
                                                                        endDate={
                                                                            endDate
                                                                        }
                                                                        dateFormat="dd/MM/yyyy"
                                                                        // minDate={startDate}
                                                                        minDate={moment().toDate()}
                                                                        maxDate={addDays(
                                                                            startDate,
                                                                            20
                                                                        )}
                                                                        placeholderText="Silahkan Isi Tanggal Sampai"
                                                                        wrapperClassName="col-12 col-lg-12 col-xl-12"
                                                                        // minDate={addDays(new Date(), 20)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <div className="d-flex justify-content-end align-items-center">
                                                                <button
                                                                    className="btn btn-white-ghost-rounded-full"
                                                                    type="button"
                                                                    onClick={() =>
                                                                        resetValueSort()
                                                                    }
                                                                >
                                                                    Reset
                                                                </button>
                                                                <button
                                                                    className="btn btn-primary-rounded-full ml-4"
                                                                    type="button"
                                                                    data-dismiss="modal"
                                                                    onClick={() =>
                                                                        handleSearchDate()
                                                                    }
                                                                >
                                                                    Terapkan
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        {/* END modal */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* END SEARCHBAR */}
                        {/* START CONTENT */}
                        <div className="mt-5">
                            <div className="row justify-content-start">
                                {/* START LOOP */}
                                <div className="col-lg-4 p-10 col-sm-6">
                                    <div className="my-10 justify-content-center d-flex">
                                        <Image
                                            src="https://dts-sertifikat-dev.s3.ap-southeast-1.amazonaws.com/certificate/images/certificate-images/2d08970e-7c1a-483a-ae55-ce19e6b8d36f.jpg"
                                            alt="fitur"
                                            height={191}
                                            width={270}
                                        />
                                    </div>
                                    <div className="align-self-center text-center my-5">
                                        Sertifikat A
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <Link
                                            href={`/subvit/substansi/${""}`}
                                            // isi id
                                        >
                                            <a
                                                className="btn btn-link-action bg-blue-secondary text-white mr-2"
                                                data-toggle="tooltip"
                                                data-placement="bottom"
                                                title="Detail"
                                            >
                                                <i className="ri-eye-fill p-0 text-white"></i>
                                            </a>
                                        </Link>
                                        <Link
                                            href={`/subvit/substansi/edit?id=${""}`}
                                            // isi id
                                        >
                                            <a
                                                className="btn btn-link-action bg-warning text-white mr-2"
                                                data-toggle="tooltip"
                                                data-placement="bottom"
                                                title="Edit"
                                            >
                                                <i className="ri-pencil-fill p-0 text-white"></i>
                                            </a>
                                        </Link>
                                        <button
                                            className="btn btn-link-action bg-danger text-white"
                                            onClick={() =>
                                                // handleDelete(subtance.id)
                                                console.log("")
                                            }
                                            data-toggle="tooltip"
                                            data-placement="bottom"
                                            title="Hapus"
                                        >
                                            <i className="ri-delete-bin-fill p-0 text-white"></i>
                                        </button>
                                    </div>
                                </div>
                                {/* END LOOP */}
                            </div>
                            {/* END CONTENT*/}
                            {/* START Pagination */}
                            <div className="row">
                                {artikel && artikel.perPage < artikel.total && (
                                    <div className="table-pagination">
                                        <Pagination
                                            activePage={page}
                                            itemsCountPerPage={artikel.perPage}
                                            totalItemsCount={artikel.total}
                                            pageRangeDisplayed={3}
                                            onChange={handlePagination}
                                            nextPageText={">"}
                                            prevPageText={"<"}
                                            firstPageText={"<<"}
                                            lastPageText={">>"}
                                            itemClass="page-item"
                                            linkClass="page-link"
                                        />
                                    </div>
                                )}
                                {artikel ? (
                                    <div className="table-total ml-auto">
                                        <div className="row mt-3">
                                            <div className="col-4 mr-0 p-0 my-auto">
                                                <select
                                                    className="form-control"
                                                    id="exampleFormControlSelect2"
                                                    style={{
                                                        width: "65px",
                                                        background: "#F3F6F9",
                                                        borderColor: "#F3F6F9",
                                                        color: "#9E9E9E",
                                                    }}
                                                    onChange={e =>
                                                        handleLimit(
                                                            e.target.value
                                                        )
                                                    }
                                                    onBlur={e =>
                                                        handleLimit(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option
                                                        value="5"
                                                        selected={
                                                            limit == "5"
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        5
                                                    </option>
                                                    <option
                                                        value="10"
                                                        selected={
                                                            limit == "10"
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        10
                                                    </option>
                                                    <option
                                                        value="15"
                                                        selected={
                                                            limit == "15"
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        15
                                                    </option>
                                                    <option
                                                        value="20"
                                                        selected={
                                                            limit == "20"
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        20
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="col-8 my-auto">
                                                <p
                                                    className="align-middle my-auto"
                                                    style={{ color: "#B5B5C3" }}
                                                >
                                                    Total Data{" "}
                                                    {artikel.artikel.length}
                                                    {
                                                        // artikel.total
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                            {/* End Pagination */}
                        </div>
                        {/* END TABLE */}
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}
