import ListSurvey from '../../../components/content/subvit/survey/list-survey'
import Layout from '../../../components/templates/layout.component'

import { getAllSurveyQuestionBanks } from '../../../redux/actions/subvit/survey-question.actions'
import { wrapper } from '../../../redux/store'

export default function Survey() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='List Test Survey'>
                    <ListSurvey />
                </Layout>
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
    await store.dispatch(getAllSurveyQuestionBanks(query.page, query.keyword, query.limit))
})
