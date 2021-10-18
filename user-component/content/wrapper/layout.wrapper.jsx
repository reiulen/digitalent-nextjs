import React from 'react'
import Head from "next/head";
import dynamic from "next/dynamic";

// import Navigationbar from '../../../components/templates/navbar.component';
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
                {title}
            </Head>

            <NavigationBar />

            <div className="d-flex flex-column-fluid" style={{backgroundColor:"#FFFFFF"}}>
                <div className="container">
                    {children}
                </div>
            </div>

            <Footer />
        
        </>
    )
}

export default Layout