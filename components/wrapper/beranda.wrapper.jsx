import React from 'react'
import Head from "next/head";
import "../../styles/beranda.module.css"

const BerandaWrapper = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div>
                {children}
            </div>
        </>
        
    )
}

export default BerandaWrapper