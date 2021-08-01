import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ReCAPTCHA from "react-google-recaptcha";

const LoginAdmin = () => {
    const onChange = (value) => {
        console.log(value)
    }
    return (
        <>
            <div className="authentication-wraper">
                <div className="row m-0 bg-white " style={{ minHeight: '100vh' }}>
                    <div className="col-lg-5 p-0 d-none d-lg-block" style={{ backgroundImage: "url('/assets/media/ilustrator-2.svg')", backgroundRepeat: 'no-repeat', backgroundPosition: 'center bottom', backgroundSize: '90%' }}>
                        <div className="container">
                            <div className="body-right text-center" style={{ marginTop: '90px' }}>
                                <Image src='/assets/logo/logo-3.svg' width={200} height={90} />
                                <p className='mt-5' style={{ color: '#7E8299', fontSize: '18px', lineHeight: '21px' }}>Tagline Digitalen Scholarship Tagline Digitalen Scholarship
                                    Tagline Digitalen Scholarship</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 d-flex align-items-center justify-content-center" style={{ background: '#F3F5F9' }}>
                        <div className="container">
                            <div className="title-login">
                                <h3 className='align-middle font-weight-bold' style={{ fontSize: '25px' }}>Login</h3>
                                <p style={{ fontSize: '18px', color: '#7E8299' }}>Partner Baru?
                                    <Link href='/auth/register'>
                                        <a className='text-primary ml-2'>Daftar Sekarang</a>
                                    </Link>
                                </p>
                            </div>

                            <div className="title-form col-lg-7 p-0" style={{ marginTop: '30px' }}>
                                <form>
                                    <div class="form-group">
                                        <label className='form-auth-label'>Email</label>
                                        <input type="email" class="form-control form-control-auth" />
                                    </div>
                                    <div class="form-group">
                                        <label className='form-auth-label'>Password</label>
                                        <a className='float-right text-primary'>Lupa Password ?</a>
                                        <input type="password" class="form-control form-control-auth" />
                                    </div>


                                    <div className="capcha">
                                        <ReCAPTCHA
                                            sitekey={process.env.CAPTCHA_SITE_KEY}
                                            onChange={onChange}
                                        />
                                    </div>

                                    <Link href='/publikasi/'>
                                        <a class="btn btn-primary mt-3">Masuk</a>
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginAdmin