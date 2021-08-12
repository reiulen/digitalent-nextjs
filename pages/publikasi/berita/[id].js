import Layout from "../../../components/templates/layout.component";
import EditBerita from "../../../components/content/publikasi/berita/edit"

import { getDetailBerita } from '../../../redux/actions/publikasi/berita.actions'
import { wrapper } from '../../../redux/store'

export default function EditBeritaPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Update Berita'>
                    <EditBerita />
                </Layout>
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ params }) => {
    await store.dispatch(getDetailBerita(params.id))
})