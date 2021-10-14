import React from 'react'
import Head from "next/head";
import "../../styles/beranda.module.css"

const BerandaWrapper = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="d-flex flex-column-fluid "style={{backgroundColor: "#ffffff"}}>
                <div>
                    {children}
                </div>
            </div>
        </>
        
    )
}

export default BerandaWrapper