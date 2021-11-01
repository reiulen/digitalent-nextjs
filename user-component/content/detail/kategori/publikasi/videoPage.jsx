import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import SubHeaderComponent from '../../../../components/template/Subheader.component';

const VideoPage = ({ token }) => {
    const dispatch = useDispatch()
    const router = useRouter()

    const { loading: allLoading, error, video } = useSelector(state => state.allVideo)
    const { kategori } = useSelector((state) => state.allKategori);

    let loading = false
    let { page = 1, keyword, success } = router.query

    if (allLoading) {
        loading = allLoading
        // } else if (deleteLoading) {
        //     loading = deleteLoading
        // } else if (playLoading) {
        //     loading = playLoading
    }

    page = Number(page)

    return (
        <>
            {/* {console.log("Data Video : ", video)} */}
            {/* {console.log("Data Kategori : ", kategori)} */}
            <SubHeaderComponent />
            <div>
                <h1>Video Terupdate dan Terkini</h1>
                <span>Temukan konten terupdate dan terkini mengenai Digital Talent Scholarship</span>
            </div>
            <div className="col-lg-10 row my-5">
                {
                    kategori.kategori && kategori.kategori.length === 0 ? null :
                        kategori.kategori.map((row, i) => {
                            console.log("data row : ", row.jenis_kategori !== "Video" ? null : row.nama_kategori)
                            return (
                                <div className="">
                                    {row.jenis_kategori === "Video" ? row.nama_kategori : null}
                                </div>
                            )
                        })
                }
            </div>
            <div className="col-lg-9 my-5">
                <div
                    className="position-relative overflow-hidden mt-3"
                    // style={{ maxWidth: "330px" }}
                >
                    <i className="ri-search-line left-center-absolute ml-2"></i>
                    <input
                        type="text"
                        className="form-control pl-10"
                        placeholder="Cari Video..."
                    // value={search}
                    // onChange={(e) => setSearch(e.target.value)}
                    style={{borderRadius:'30px'}}
                    />
                    <button
                        className="btn bg-blue-primary text-white right-center-absolute"
                        style={{
                            borderTopLeftRadius: "0",
                            borderBottomLeftRadius: "0",
                            borderTopRightRadius:'18px',
                            borderBottomRightRadius:'18px'
                        }}
                    // onClick={handleSearch}
                    >
                        Cari
                    </button>
                </div>
            </div>
            <div className="col-lg-3">

            </div>
        </>
    )
}

export default VideoPage;