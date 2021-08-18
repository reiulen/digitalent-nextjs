import Layout from "/components/templates/layout.component";
import StepTwo from "/components/content/subvit/substansi/clone/step-two";

import { getAllSubtanceQuestionDetail } from '../../../../redux/actions/subvit/subtance-question-detail.action'
import { wrapper } from '../../../../redux/store'

export default function CloneSoalSubtansi() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Clone Bank Soal Tes Subtansi'>
                    <StepTwo />
                </Layout>
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
    await store.dispatch(getAllSubtanceQuestionDetail(query.id, query.page, query.keyword, query.limit))
})