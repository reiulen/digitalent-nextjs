import Layout from "../../../components/templates/layout.component";
import Imagetron from "../../../components/content/publikasi/imagetron/imagetron";

import { getAllImagetron } from '../../../redux/actions/publikasi/imagetron.actions'
import { wrapper } from '../../../redux/store'

export default function ImagetronPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Managemen Imagetron'>
                    <Imagetron />
                </Layout>
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
    await store.dispatch(getAllImagetron(query.page, query.keyword, query.limit, query.publish, query.startdate, query.enddate))
})