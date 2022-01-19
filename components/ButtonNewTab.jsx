import React from 'react';
import Head from 'next/head'

import Image from 'next/image'
import Link from 'next/link'

const ButtonNewTab = ({ icon, link = '/', title }) => {
    return (
        <>
            {/* <Head>
                <title>{title}</title>
            </Head> */}

            <Link href={link}>
                <a target="_blank">
                    <button className='btn mr-1' data-toggle="tooltip" data-placement="bottom" title= {title} style={{ background: '#F3F6F9', borderRadius: '6px' }}>
                        <Image alt='button-action' src={`/assets/icon/${icon}`} width={18} height={18} />
                    </button>
                </a>
            </Link>
        </>
        
    )
}

export default ButtonNewTab