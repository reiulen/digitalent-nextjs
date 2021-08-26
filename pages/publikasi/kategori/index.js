import Layout from "../../../components/templates/layout.component";
import Kategori from "../../../components/content/publikasi/kategori/kategori";

import { getAllKategori, paginationKategori } from '../../../redux/actions/publikasi/kategori.actions'
import { wrapper } from '../../../redux/store'

export default function KategoriPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Managemen Kategori'>
                    <Kategori />
                </Layout>
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
    // await store.dispatch(getAllKategori(query.page, query.keyword, query.limit, query.publish, query.startdate, query.enddate))
    await store.dispatch(getAllKategori())
    await store.dispatch(paginationKategori(query.page, query.keyword, query.limit, query.publish, query.startdate, query.enddate))
})
