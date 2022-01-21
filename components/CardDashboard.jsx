import React from 'react'
import Image from 'next/image'

const CardDashboard = ({ background = 'bg-white', color = 'text-dark', icon = 'mail.svg', title = 'Judul Card', muted = 'Dibaca', mutedValue = '0' }) => {
    return (
        <div className={`col ${background} px-6 py-8 rounded-xl mr-7`} >
            <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                <Image alt='card-icon' src={`/assets/icon/${icon}`} width={50} height={50} />
            </span>
            <p className={`${color} font-weight-bold font-size-h6`}>{title}</p>
            <span className={`${color}`}>{muted} : {mutedValue}</span>
        </div >
    )
}

export default CardDashboard