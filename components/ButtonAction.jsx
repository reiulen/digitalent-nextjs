import React from 'react';
import Image from 'next/image'

const ButtonAction = ({ icon }) => {
    return (
        <button className='btn mr-1' style={{ background: '#F3F6F9', borderRadius: '6px' }}>
            <Image alt='button-action' src={`/assets/icon/${icon}`} width={18} height={18} />
        </button>
    )
}

export default ButtonAction