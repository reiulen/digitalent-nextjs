import React from 'react'
import Head from "next/head";
import "../../styles/preview.module.css"

const PreviewWrapper = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="d-flex flex-column-fluid" style={{backgroundColor: "#ffffff"}}>
                <div className="container">
                    {children}
                </div>
            </div>
        </>
        
    )
}

export default PreviewWrapper