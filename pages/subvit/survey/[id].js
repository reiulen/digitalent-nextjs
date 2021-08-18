import DetailSurvey from '../../../components/content/subvit/survey/detail-survey'
import Layout from '../../../components/templates/layout.component'

import { getAllSurveyQuestionDetail } from '../../../redux/actions/subvit/survey-question-detail.action'
import { getDetailSurveyQuestionBanks } from '../../../redux/actions/subvit/survey-question.actions'
import { wrapper } from '../../../redux/store'

export default function DetailSurveyPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Detail Survey'>
                    <DetailSurvey />
                </Layout>
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ params, query }) => {
    await store.dispatch(getAllSurveyQuestionDetail(params.id, query.page, query.limit, query.keyword))
    await store.dispatch(getDetailSurveyQuestionBanks(params.id))
})