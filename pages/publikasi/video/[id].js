import Layout from "../../../components/templates/layout.component";
import EditVideo from "../../../components/content/publikasi/vidio/edit";

import { getDetailVideo } from '../../../redux/actions/publikasi/video.actions'
import { wrapper } from '../../../redux/store'

export default function EditArtikelPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Update Artikel'>
                    <EditVideo />
                </Layout>
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ params }) => {
    await store.dispatch(getDetailVideo(params.id))
})