import React from 'react'
import Image from 'next/image'

const CardDashboardMini = ({ background, icon, color, title }) => {
    return (
        <div className={`col mr-5 ${background} px-6 py-8 rounded-xl mb-7 text-center`} >
            <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                <Image alt='card-icon' src={`/assets/icon/${icon}`} width={50} height={50} />
            </span>
            <p className={`${color} font-weight-bold font-size-h6`}>{title}</p>
        </div >
    )
}

export default CardDashboardMini