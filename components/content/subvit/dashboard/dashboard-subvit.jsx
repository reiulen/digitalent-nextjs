import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import PageWrapper from '../../../wrapper/page.wrapper'
import CardDashboardMini from '../../../CardDashboardMini'

const DashbardSubvit = () => {
    return (
        <>
            <PageWrapper>
                <div className="row">
                    <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 pb-0">
                        <div className="card card-custom bg-light-primary gutter-b mt-5">
                            <div className="card-body pt-2" style={{ backgroundPosition: 'left bottom', backgroundImage: "url('/assets/media/jukut.svg')", backgroundRepeat: 'no-repeat' }}>
                                <div className="d-flex align-items-center mb-10" >
                                    <div className="d-flex flex-column flex-grow-1 font-weight-bold"  >
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="col-md-12 mt-5">
                                                    <h4 className="font-weight-bolder text-primary">Halo Admin A</h4>
                                                </div>
                                                <div className="col-md-12">
                                                    <p className='font-weight-bold text-muted'>Sudah Makan Hari ini? <br /> Kalau sudah yuk dicheck verifikasi Test untuk hari ini :)</p>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="ml-auto float-right ilustrator-dashboard"
                                                    style={{
                                                        position: 'absolute', right: '10px',
                                                        top: '-50px'
                                                    }}>
                                                    <Image src='/assets/media/ilustrator-1.svg' width={300} height={200} alt='ilustrator-1' />
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xxl-6 order-1 order-xxl-2">
                        <div className="row mx-auto">
                            <CardDashboardMini link='/subvit/substansi' background='bg-primary' icon='book-white.svg' color='text-white' title='Tes Subtansi' />
                            <CardDashboardMini link='/subvit/survey' background='bg-white' icon='blok4-secondary.svg' color='text-muted' title='Survey' />
                            <CardDashboardMini link='/subvit/trivia' background='bg-white' icon='movie-secondary.svg' color='text-muted' title='Trivia' />
                        </div>

                        <div className="card card-custom pb-0" style={{ background: '#0BB783', backgroundImage: "url('/assets/media/human1.svg')", backgroundRepeat: 'no-repeat', backgroundPosition: 'right bottom', backgroundSize: '150px' }}>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <p className='text-white' style={{ lineHeigh: '30px', fontWeight: '600', fontSize: '20px', letterSpacing: '-0.02em' }}>Tambah Tes <br /> Substansi klik <br /> Tombol dibawah</p>

                                        <Link href='/subvit/substansi/tambah-step-1'>
                                            <a className='btn btn-warning' style={{ marginTop: '30px' }}>Tambah Test Substansi</a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-xxl-6 order-1 order-xxl-2">
                        <div className="row h-100">
                            <div className="col-md-6">
                                <div className="card card-custom h-100" style={{ background: '#C9F7F5', backgroundImage: "url('/assets/media/human2.svg')", backgroundRepeat: 'no-repeat', backgroundPosition: 'right bottom', backgroundSize: '100px' }}>
                                    <div className="row">
                                        <div className="card-body">
                                            <p style={{ lineHeigh: '30px', fontWeight: '600', fontSize: '20px', letterSpacing: '-0.02em', color: '#1BC5BD' }}>Tambah Survey ? <br /> Klik Tombol <br /> dibawah</p>

                                            <Link href='/subvit/survey/tambah'>
                                                <a className='btn btn-success' style={{ marginTop: '100px' }}>Tambah Survey</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card card-custom h-100 p-5" style={{ background: '#8950FC', backgroundImage: "url('/assets/media/human3.svg')", backgroundRepeat: 'no-repeat', backgroundPosition: 'right bottom', backgroundSize: '120px' }}>
                                    <div className="row">
                                        <div className="card-body">
                                            <h2 className='text-white' style={{ fontWeight: 'bold', fontSize: '24px', lineHeight: '36px' }}>Tambah TRIVIA</h2>
                                            <p style={{ lineHeigh: '22px', fontWeight: '500', fontSize: '15px', color: '#EEE5FF' }}>Klik tombol dibawah <br /> ini untuk tambah <br /> TRIVIA</p>

                                            <Link href='/subvit/trivia/tambah'>
                                                <a className='btn btn-success' style={{ marginTop: '50px' }}>Tambah TRIVIA</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageWrapper>

        </>
    )
}

export default DashbardSubvit