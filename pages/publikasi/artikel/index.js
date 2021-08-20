import Layout from "../../../components/templates/layout.component";
import Artikel from "../../../components/content/publikasi/artikel/artikel";

import { getAllArtikel } from '../../../redux/actions/publikasi/artikel.actions'
import { wrapper } from '../../../redux/store'

export default function ArtikelPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Dashboard Publikasi'>
                    <Artikel />
                </Layout>
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
    await store.dispatch(getAllArtikel(query.page, query.keyword, query.limit, query.publish, query.startdate, query.enddate))
})
