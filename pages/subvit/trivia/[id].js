import DetailTrivia from '../../../components/content/subvit/trivia/detail-trivia'
import Layout from '../../../components/templates/layout.component'

import { getAllTriviaQuestionDetail } from '../../../redux/actions/subvit/trivia-question-detail.action'
import { getDetailTriviaQuestionBanks } from '../../../redux/actions/subvit/trivia-question.actions'
import { wrapper } from '../../../redux/store'

export default function DetailTriviaPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Detail Trivia'>
                    <DetailTrivia />
                </Layout>
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ params, query }) => {
    await store.dispatch(getAllTriviaQuestionDetail(params.id, query.page, query.keyword, query.limit))
    await store.dispatch(getDetailTriviaQuestionBanks(params.id))
})