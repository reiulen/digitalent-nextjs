import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const RegisterAdmin = () => {

    return (
        <>
            <div className="authentication-wraper">
                <div className="row m-0 bg-white " style={{ minHeight: '100vh' }}>
                    <div className="col-lg-5 p-0 d-none d-lg-block" style={{ backgroundImage: "url('/assets/media/ilustrator-2.svg')", backgroundRepeat: 'no-repeat', backgroundPosition: 'center bottom', backgroundSize: '500px' }}>
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
                                <h3 className='align-middle font-weight-bold' style={{ fontSize: '25px' }}>Daftar Baru</h3>
                                <p style={{ fontSize: '18px', color: '#7E8299' }}>Silahkan isi detail akun baru anda</p>
                            </div>

                            <div className="title-form col-lg-7 p-0" style={{ marginTop: '30px' }}>
                                <form>
                                    <div class="form-group">
                                        <input type="text" class="form-control form-control-auth" placeholder='Nama Lembaga' />
                                    </div>
                                    <div class="form-group">
                                        <input type="email" class="form-control form-control-auth" placeholder='Email' />
                                    </div>
                                    <div class="form-group">
                                        <input type="password" class="form-control form-control-auth" placeholder='Kata Sandi' />
                                    </div>
                                    <div class="form-group">
                                        <input type="password" class="form-control form-control-auth" placeholder='Konfirmasi Kata Sandi' />
                                    </div>

                                    <Link href='/'>
                                        <a class="btn btn-outline-primary mt-3 mr-2">Kembali</a>
                                    </Link>
                                    <button type="button" class="btn btn-primary mt-3">Buat Akun</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterAdmin