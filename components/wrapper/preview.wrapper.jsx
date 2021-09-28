import React from 'react'
import Head from "next/head";

const PreviewWrapper = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="d-flex flex-column-fluid">
                <div className="container">
                    {children}
                </div>
            </div>
        </>
        
    )
}

export default PreviewWrapper