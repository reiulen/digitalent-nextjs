import React from 'react'
import Image from 'next/image'

const AuthWrapper = ({ children, image, desc }) => {
    return (
        <>
            <div className="authentication-wraper">
                <div className="row m-0 bg-white " style={{ minHeight: '100vh' }}>
                    <div className="col-lg-5 p-0 d-none d-lg-block" style={{ backgroundImage: `url(/assets/media/${image})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center bottom', backgroundSize: '90%' }}>
                        <div className="container">
                            <div className="body-right text-center" style={{ marginTop: '90px' }}>
                                <Image src='/assets/logo/logo-3.svg' width={200} height={90} alt='logo-3' />
                                <p className='mt-5' style={{ color: '#7E8299', fontSize: '18px', lineHeight: '21px' }}>{desc}</p>
                            </div>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </>
    )
}

export default AuthWrapper