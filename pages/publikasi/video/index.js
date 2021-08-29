import Layout from "../../../components/templates/layout.component";
import Vidio from "../../../components/content/publikasi/vidio/vidio";

import { getAllVideo } from '../../../redux/actions/publikasi/video.actions'
import { wrapper } from '../../../redux/store'

export default function VidioPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Managemen Video'>
                    <Vidio />
                </Layout>
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
    await store.dispatch(getAllVideo(query.page, query.keyword, query.limit, query.publish, query.startdate, query.enddate))
})