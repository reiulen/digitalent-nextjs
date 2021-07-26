import React from 'react'

import Head from 'next/head'

import Sidebar from './sidebar.component'
import Header from './header.component'
import HeaderMobile from './header-mobile.component'
// Content
import SubHeader from './subheader.component'
// Wrapper
import ContentWrapper from '../wrapper/content.wrapper'

import Footer from './footer.component'

const Layout = ({ children, title = 'Dashboard' }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <HeaderMobile />
            <div div className="d-flex flex-row flex-column-fluid page" >
                <Sidebar />
                <div className="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper">
                    <Header />
                    <ContentWrapper>
                        <SubHeader />
                        {children}
                    </ContentWrapper>
                    {/* <Footer /> */}
                </div>
            </div >

            {/* // <!-- begin::User Panel--> */}
            <div id="kt_quick_user" className="offcanvas offcanvas-right p-10">
                {/* // <!--begin::Header--> */}
                <div className="offcanvas-header d-flex align-items-center justify-content-between pb-5">
                    <h3 className="font-weight-bold m-0">User Profile
                    </h3>
                    <a href="#" className="btn btn-xs btn-icon btn-light btn-hover-primary" id="kt_quick_user_close">
                        <i className="ki ki-close icon-xs text-muted"></i>
                    </a>
                </div>
                {/* // <!--end::Header--> */}
                {/* // <!--begin::Content--> */}
                <div className="offcanvas-content pr-5 mr-n5">
                    {/* // <!--begin::Header--> */}
                    <div className="d-flex align-items-center mt-5">
                        <div className="symbol symbol-100 mr-5">
                            <div className="symbol-label" style={{ backgroundImage: 'url("assets/media/users/300_21.jpg")' }}></div>
                            <i className="symbol-badge bg-success"></i>
                        </div>
                        <div className="d-flex flex-column">
                            <a href="#" className="font-weight-bold font-size-h5 text-dark-75 text-hover-primary">James Jones</a>
                            <div className="text-muted mt-1">Application Developer</div>
                            <div className="navi mt-2">
                                <a href="#" className="navi-item">
                                    <span className="navi-link p-0 pb-2">
                                        <span className="navi-icon mr-1">
                                            <span className="svg-icon svg-icon-lg svg-icon-primary">
                                                {/* // <!--begin::Svg Icon | path:assets/media/svg/icons/Communication/Mail-notification.svg--> */}
                                                <rect x="0" y="0" width="24" height="24" />
                                                <circle fill="#000000" opacity="0.3" cx="19.5" cy="17.5" r="2.5" />
                                                {/* // <!--end::Svg Icon--> */}
                                            </span>
                                        </span>
                                        <span className="navi-text text-muted text-hover-primary">jm@softplus.com</span>
                                    </span>
                                </a>
                                <a href="#" className="btn btn-sm btn-light-primary font-weight-bolder py-2 px-5">Sign Out</a>
                            </div>
                        </div>
                    </div>
                    {/* // <!--end::Header--> */}

                    {/* // <!--begin::Separator--> */}
                    <div className="separator separator-dashed mt-8 mb-5"></div>
                    {/* // <!--end::Separator--> */}

                    {/* // <!--begin::Nav--> */}
                    <div className="navi navi-spacer-x-0 p-0">
                        {/* // <!--begin::Item--> */}
                        <a href="custom/apps/user/profile-1/personal-information.html" className="navi-item">
                            <div className="navi-link">
                                <div className="symbol symbol-40 bg-light mr-3">
                                    <div className="symbol-label">
                                        <span className="svg-icon svg-icon-md svg-icon-success">
                                            {/* // <!--begin::Svg Icon | path:assets/media/svg/icons/General/Notification2.svg--> */}
                                            <rect x="0" y="0" width="24" height="24" />
                                            <circle fill="#000000" opacity="0.3" cx="18.5" cy="5.5" r="2.5" />
                                            {/* // <!--end::Svg Icon--> */}
                                        </span>
                                    </div>
                                </div>
                                <div className="navi-text">
                                    <div className="font-weight-bold">My Profile</div>
                                    <div className="text-muted">Account settings and more
                                        <span className="label label-light-danger label-inline font-weight-bold">update</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                        {/* // <!--end:Item--> */}
                        {/* // <!--begin::Item--> */}
                        <a href="custom/apps/user/profile-3.html" className="navi-item">
                            <div className="navi-link">
                                <div className="symbol symbol-40 bg-light mr-3">
                                    <div className="symbol-label">
                                        <span className="svg-icon svg-icon-md svg-icon-warning">
                                            {/* // <!--begin::Svg Icon | path:assets/media/svg/icons/Shopping/Chart-bar1.svg--> */}
                                            <rect x="0" y="0" width="24" height="24" />
                                            <rect fill="#000000" opacity="0.3" x="12" y="4" width="3" height="13" rx="1.5" />
                                            <rect fill="#000000" opacity="0.3" x="7" y="9" width="3" height="8" rx="1.5" />
                                            <rect fill="#000000" opacity="0.3" x="17" y="11" width="3" height="6" rx="1.5" />
                                            {/* // <!--end::Svg Icon--> */}
                                        </span>
                                    </div>
                                </div>
                                <div className="navi-text">
                                    <div className="font-weight-bold">My Messages</div>
                                    <div className="text-muted">Inbox and tasks</div>
                                </div>
                            </div>
                        </a>
                        {/* // <!--end:Item--> */}
                    </div>
                    {/* // <!--end::Nav--> */}

                </div>
                {/* // <!--end::Content--> */}
            </div>
            {/* // <!-- end::User Panel--> */}
            {/* // <!--begin::Scrolltop--> */}
            <div id="kt_scrolltop" className="scrolltop">
                <span className="svg-icon">
                    {/* // <!--begin::Svg Icon | path:assets/media/svg/icons/Navigation/Up-2.svg--> */}
                    <rect fill="#000000" opacity="0.3" x="11" y="10" width="2" height="10" rx="1" />
                    {/* // <!--end::Svg Icon--> */}
                </span>
            </div>
            {/* // <!--end::Scrolltop--> */}
        </>
    )
}

export default Layout