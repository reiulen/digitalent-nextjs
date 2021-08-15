import EditSurveyStep1 from '../../../../components/content/subvit/survey/edit/step-1'
import Layout from '../../../../components/templates/layout.component'

import { getDetailSurveyQuestionBanks } from '../../../../redux/actions/subvit/survey-question.actions'
import { wrapper } from '../../../../redux/store'

export default function EditSurveyStep1Page() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Edit Test Survey - Step 1'>
                    <EditSurveyStep1 />
                </Layout>
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
    await store.dispatch(getDetailSurveyQuestionBanks(query.id))
})

