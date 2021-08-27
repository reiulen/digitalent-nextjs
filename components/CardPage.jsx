import React, { useState } from 'react'
import Image from 'next/image'

const CardPage = ({ background, icon, color, value, titleValue, title, publishedVal, routePublish }) => {
    return (
        <div className={`col ${background} px-6 py-8 rounded-xl mr-7 mb-7`} onClick={(publishedVal) => routePublish (publishedVal)} style={publishedVal !== "" ? {cursor: "pointer"}: {cursor: "default"}}>
            <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                <div className="row ml-4">
                    <Image alt='card-page-icon' src={`/assets/icon/${icon}`} width={30} height={30} />
                    <p className={`font-weight-bold font-size-h2 ml-2 my-auto`} style={{ color: color, opacity: '0.5' }}>{value} {titleValue}</p>
                </div>
            </span>
            <p className='ml-3 mt-2' style={{ color: color, fontSize: '15px', fontWeight: '500', opacity: '0.50' }}>{title}</p>
        </div >
    )
}


export default CardPage;