import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const convertBreadcrumb = string => {
    return string
        .charAt(0)
        .toUpperCase() + string.slice(1)
            .concat('/')
            .split('?')[0]
};

const SubHeader = () => {
    const router = useRouter();

    const days = new Date().toLocaleTimeString('in-ID', { weekday: 'long' })
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
            <div className="subheader py-2 py-lg-4 subheader-solid" id="kt_subheader">
                <div className="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
                    <div className="d-flex align-items-center flex-wrap mr-2">
                        {breadcrumbs.map((breadcrumb, i) => {
                            return (
                                <Link href={breadcrumb.href} key={i}>
                                    <a>
                                        <p className="text-default mt-2 mb-2 font-weight-bold">
                                            {convertBreadcrumb(breadcrumb.breadcrumb)}
                                        </p>
                                    </a>
                                </Link>
                            );
                        })}

                    </div>
                    <div className="d-flex align-items-center">
                        <i className='flaticon2-crisp-icons-1 mr-2'></i>
                        <span className="text-muted font-size-base font-weight-bold mr-2"
                            id="kt_dashboard_daterangepicker_title">{days}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SubHeader