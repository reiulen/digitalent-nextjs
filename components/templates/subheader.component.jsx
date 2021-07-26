import React from 'react'

const SubHeader = () => {
    return (
        <>
            {/* <!--begin::Subheader--> */}
            <div className="subheader py-2 py-lg-4 subheader-solid" id="kt_subheader">
                <div className="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
                    {/* <!--begin::Info--> */}
                    <div className="d-flex align-items-center flex-wrap mr-2">
                        {/* <!--begin::Page Title--> */}
                        <h5 className="text-dark font-weight-bold mt-2 mb-2 mr-5">Dashboard Publikasi</h5>
                        {/* // <!--end::Page Title--> */}

                    </div>
                    {/* // <!--end::Info--> */}
                    {/* // <!--begin::Toolbar--> */}
                    <div className="d-flex align-items-center">

                        {/* // <!--begin::Daterange--> */}
                        <a href="#" className="btn btn-sm btn-light font-weight-bold mr-2"
                            id="kt_dashboard_daterangepicker" data-toggle="tooltip"
                            title="Select dashboard daterange" data-placement="left">
                            <span className="text-muted font-size-base font-weight-bold mr-2"
                                id="kt_dashboard_daterangepicker_title">Today</span>
                            <span className="text-primary font-size-base font-weight-bolder"
                                id="kt_dashboard_daterangepicker_date">Aug 16</span>
                        </a>
                        {/* // <!--end::Daterange--> */}

                    </div>
                    {/* // <!--end::Toolbar--> */}
                </div>
            </div>
            {/* // <!--end::Subheader--> */}
        </>
    )
}

export default SubHeader