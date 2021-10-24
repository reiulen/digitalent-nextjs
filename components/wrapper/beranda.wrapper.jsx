import React from 'react'
import Head from "next/head";

import NavigationBar from "../../user-component/components/template/Navbar.component"
import Footer from "../../user-component/components/beranda/footer"

import "../../styles/beranda.module.css"

const BerandaWrapper = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div>
                <NavigationBar />
                {children}
            
            </div>

            {/* <Footer /> */}
        </>
        
    )
}

export default BerandaWrapper