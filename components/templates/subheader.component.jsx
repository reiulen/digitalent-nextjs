import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const convertBreadcrumb = string => {
    return string
        .charAt(0)
        .toUpperCase() + string.slice(1);
};

const SubHeader = () => {
    const router = useRouter();
    const [breadcrumbs, setBreadcrumbs] = useState(null);

    useEffect(() => {
        if (router) {
            const linkPath = router.asPath.split('/');
            linkPath.shift();

            const pathArray = linkPath.map((path, i) => {
                return { breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') };
            });

            setBreadcrumbs(pathArray);
        }
    }, [router]);

    if (!breadcrumbs) {
        return null;
    }

    return (
        <>
            {/* <!--begin::Subheader--> */}
            <div className="subheader py-2 py-lg-4 subheader-solid" id="kt_subheader">
                <div className="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
                    {/* <!--begin::Info--> */}
                    <div className="d-flex align-items-center flex-wrap mr-2">
                        {/* <!--begin::Page Title--> */}
                        {/* // <!--end::Page Title--> */}
                        {breadcrumbs.map((breadcrumb, i) => {
                            return (
                                <Link href={breadcrumb.href}>
                                    <a>
                                        <h5 className="text-default mt-2 mb-2">
                                            {convertBreadcrumb(breadcrumb.breadcrumb)} /
                                        </h5>
                                    </a>
                                </Link>
                            );
                        })}

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