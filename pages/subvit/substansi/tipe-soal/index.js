import ListTipeSoal from '/components/content/subvit/substansi/tipe-soal/list'
import Layout from '/components/templates/layout.component'

import { getAllSubtanceQuestionBanksType } from '../../../../redux/actions/subvit/subtance-question-type.actions'
import { wrapper } from '../../../../redux/store'

export default function TipeSoal() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='List Tipe Soal Test Substansi'>
                    <ListTipeSoal />
                </Layout>
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
    await store.dispatch(getAllSubtanceQuestionBanksType(query.page, query.keyword, query.limit))
})