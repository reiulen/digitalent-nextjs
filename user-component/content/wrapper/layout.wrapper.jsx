import React from 'react'
import Head from "next/head";
import dynamic from "next/dynamic";

// import Navigationbar from '../../../components/templates/navbar.component';
// import Footer from "../../../components/templates/footer.component"
import "../../../styles/beranda.module.css"

const NavigationBar = dynamic (() => import ("../../../components/templates/navbar.component"), {
    ssr: false,
})

const Footer = dynamic (() => import ("../../../components/templates/footer.component"), {
    ssr: false,
})

const Layout = ({ children, title }) => {

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>

            <NavigationBar />

            <div className="d-flex flex-column-fluid bg-white">
                <div className="container">
                    {children}
                </div>
            </div>

            <Footer />
        
        </>
    )
}

export default Layout