import Layout from "../../../components/templates/layout.component";
import Galeri from "../../../components/content/publikasi/galeri/galeri";

import { getAllGaleri } from '../../../redux/actions/publikasi/galeri.actions'
import { wrapper } from '../../../redux/store'

export default function GaleriPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Managemen Galeri'>
                    <Galeri />
                </Layout>
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
    await store.dispatch(getAllGaleri(query.page, query.keyword, query.limit, query.publish))
})