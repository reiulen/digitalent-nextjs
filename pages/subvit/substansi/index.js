import ListSubstansi from '../../../components/content/subvit/substansi/list-substansi'
import Layout from '../../../components/templates/layout.component'

import { getAllSubtanceQuestionBanks } from '../../../redux/actions/subvit/subtance.actions'
import { wrapper } from '../../../redux/store'

export default function Substansi() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='List Test Substansi'>
                    <ListSubstansi />
                </Layout>
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
    await store.dispatch(getAllSubtanceQuestionBanks(query.page, query.keyword))
})
