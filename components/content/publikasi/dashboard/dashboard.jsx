import React from 'react'
import Image from 'next/image'
import CardDashboard from '../../../CardDashboard'
import PageWrapper from '../../../wrapper/page.wrapper'

const DashbardPublikasi = () => {
    return (
        <>
            <PageWrapper>
                <div className="row">
                    <div className="col-lg-12 col-xxl-12 mt-4">
                        <div className="card card-custom bg-light-primary">
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
                                                    <Image src='/assets/media/ilustrator-1.svg' width={300} height={200} alt="dashboard-pict"/>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 col-xxl-12 my-5">
                        {/* <!--begin::Row--> */}
                        <div className="row m-0">
                            <CardDashboard background='bg-white' color='text-dark' icon='mail.svg' title='Total Berita yang dibaca' muted='Dibaca' mutedValue='200k' />
                            <CardDashboard background='bg-primary' color='text-white' icon='list-white.svg' title='Total Artikel yang dibaca' muted='Dibaca' mutedValue='200k' />
                            <CardDashboard background='bg-warning' color='text-white' icon='blok4-white.svg' title='Jumlah Semua Konten' muted='Publish' mutedValue='200k' />
                        </div>
                        {/* <!--end::Row--> */}
                    </div>
                    {/* <!--end::Stats--> */}

                    <div className="col-lg-6 col-xxl-4">
                        {/* <!--begin::List Widget 3--> */}
                        <div className="card card-custom card-stretch gutter-b">
                            {/* <!--begin::Header--> */}
                            <div className="card-header border-0">
                                <h3 className="card-title font-weight-bolder text-dark">3 Top Berita</h3>
                            </div>
                            {/* <!--end::Header--> */}
                            {/* <!--begin::Body--> */}
                            <div className="card-body pt-2">
                                {/* <!--begin::Item--> */}
                                <div className="d-flex align-items-center mb-10">
                                    {/* <!--begin::Symbol--> */}
                                    <div className="symbol symbol-40 symbol-light-success mr-5">
                                        <Image width={94} height={63} src="/assets/media/dummy-banner.png" className="align-self-end rounded" alt="" />
                                    </div>
                                    {/* <!--end::Symbol--> */}
                                    {/* <!--begin::Text--> */}
                                    <div className="d-flex flex-column flex-grow-1 font-weight-bold">
                                        <p className="text-dark text-hover-primary mb-1 font-size-lg">Data Peserta DTS yang Lulus</p>
                                        <span className="text-muted">Kategori : <span className='text-primary'>VGA</span></span>
                                        <span className="text-muted">Created By : <span className='text-primary'>Mee</span></span>
                                    </div>
                                    {/* <!--end::Text--> */}

                                    {/* <!--begin::Text--> */}
                                    <div className="d-flex flex-column flex-grow-1 font-weight-bold">
                                        <p className="text-dark text-hover-primary mb-1 font-size-lg">120.000</p>
                                        <span className="text-muted">Dibaca</span>
                                    </div>
                                    {/* <!--end::Text--> */}


                                </div>
                                {/* <!--end::Item--> */}

                            </div>
                            {/* <!--end::Body--> */}
                        </div>
                        {/* <!--end::List Widget 3--> */}
                    </div>
                    <div className="col-lg-6 col-xxl-4 order-1 order-xxl-2">
                        {/* <!--begin::List Widget 3--> */}
                        <div className="card card-custom card-stretch gutter-b">
                            {/* <!--begin::Header--> */}
                            <div className="card-header border-0">
                                <h3 className="card-title font-weight-bolder text-dark">3 Top Artikel</h3>
                            </div>
                            {/* <!--end::Header--> */}
                            {/* <!--begin::Body--> */}
                            <div className="card-body pt-2">
                                {/* <!--begin::Item--> */}
                                <div className="d-flex align-items-center mb-10">
                                    {/* <!--begin::Symbol--> */}
                                    <div className="symbol symbol-40 symbol-light-success mr-5">
                                        <Image width={94} height={63} src="/assets/media/dummy-banner.png" className="align-self-end rounded" alt="" />
                                    </div>
                                    {/* <!--end::Symbol--> */}
                                    {/* <!--begin::Text--> */}
                                    <div className="d-flex flex-column flex-grow-1 font-weight-bold">
                                        <p className="text-dark text-hover-primary mb-1 font-size-lg">Data Peserta DTS yang Lulus</p>
                                        <span className="text-muted">Kategori : <span className='text-primary'>VGA</span></span>
                                        <span className="text-muted">Created By : <span className='text-primary'>Mee</span></span>
                                    </div>
                                    {/* <!--end::Text--> */}

                                    {/* <!--begin::Text--> */}
                                    <div className="d-flex flex-column flex-grow-1 font-weight-bold">
                                        <p className="text-dark text-hover-primary mb-1 font-size-lg">120.000</p>
                                        <span className="text-muted">Dibaca</span>
                                    </div>
                                    {/* <!--end::Text--> */}


                                </div>
                                {/* <!--end::Item--> */}

                            </div>
                            {/* <!--end::Body--> */}
                        </div>
                        {/* <!--end::List Widget 3--> */}
                    </div>
                    <div className="col-lg-6 col-xxl-4 order-1 order-xxl-2">
                        {/* <!--begin::List Widget 3--> */}
                        <div className="card card-custom card-stretch gutter-b">
                            {/* <!--begin::Header--> */}
                            <div className="card-header border-0">
                                <h3 className="card-title font-weight-bolder text-dark">3 Top Vidio</h3>
                            </div>
                            {/* <!--end::Header--> */}
                            {/* <!--begin::Body--> */}
                            <div className="card-body pt-2">
                                {/* <!--begin::Item--> */}
                                <div className="d-flex align-items-center mb-10">
                                    {/* <!--begin::Symbol--> */}
                                    <div className="symbol symbol-40 symbol-light-success mr-5">
                                        <Image width={94} height={63} src="/assets/media/dummy-banner.png" className="align-self-end rounded" alt="" />
                                    </div>
                                    {/* <!--end::Symbol--> */}
                                    {/* <!--begin::Text--> */}
                                    <div className="d-flex flex-column flex-grow-1 font-weight-bold">
                                        <p className="text-dark text-hover-primary mb-1 font-size-lg">Data Peserta DTS yang Lulus</p>
                                        <span className="text-muted">Kategori : <span className='text-primary'>VGA</span></span>
                                        <span className="text-muted">Created By : <span className='text-primary'>Mee</span></span>
                                    </div>
                                    {/* <!--end::Text--> */}

                                    {/* <!--begin::Text--> */}
                                    <div className="d-flex flex-column flex-grow-1 font-weight-bold">
                                        <p className="text-dark text-hover-primary mb-1 font-size-lg">120.000</p>
                                        <span className="text-muted">Dibaca</span>
                                    </div>
                                    {/* <!--end::Text--> */}


                                </div>
                                {/* <!--end::Item--> */}

                            </div>
                            {/* <!--end::Body--> */}
                        </div>
                        {/* <!--end::List Widget 3--> */}
                    </div>
                    <div className="col-lg-6 col-xxl-4 order-1 order-xxl-2">
                        {/* <!--begin::List Widget 3--> */}
                        <div className="card card-custom card-stretch gutter-b">
                            {/* <!--begin::Header--> */}
                            <div className="card-header border-0">
                                <h3 className="card-title font-weight-bolder text-dark">3 Top Galeri</h3>
                            </div>
                            {/* <!--end::Header--> */}
                            {/* <!--begin::Body--> */}
                            <div className="card-body pt-2">
                                {/* <!--begin::Item--> */}
                                <div className="d-flex align-items-center mb-10">
                                    {/* <!--begin::Symbol--> */}
                                    <div className="symbol symbol-40 symbol-light-success mr-5">
                                        <Image width={94} height={63} src="/assets/media/dummy-banner.png" className="align-self-end rounded" alt="" />
                                    </div>
                                    {/* <!--end::Symbol--> */}
                                    {/* <!--begin::Text--> */}
                                    <div className="d-flex flex-column flex-grow-1 font-weight-bold">
                                        <p className="text-dark text-hover-primary mb-1 font-size-lg">Data Peserta DTS yang Lulus</p>
                                        <span className="text-muted">Kategori : <span className='text-primary'>VGA</span></span>
                                        <span className="text-muted">Created By : <span className='text-primary'>Mee</span></span>
                                    </div>
                                    {/* <!--end::Text--> */}

                                    {/* <!--begin::Text--> */}
                                    <div className="d-flex flex-column flex-grow-1 font-weight-bold">
                                        <p className="text-dark text-hover-primary mb-1 font-size-lg">120.000</p>
                                        <span className="text-muted">Dibaca</span>
                                    </div>
                                    {/* <!--end::Text--> */}


                                </div>
                                {/* <!--end::Item--> */}

                            </div>
                            {/* <!--end::Body--> */}
                        </div>
                        {/* <!--end::List Widget 3--> */}
                    </div>
                </div>
            </PageWrapper>

        </>
    )
}

export default DashbardPublikasi