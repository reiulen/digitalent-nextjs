import EditSurveyBank from "../../../components/content/subvit/survey/question-bank-soal/edit";
import Layout from "../../../components/templates/layout.component";

import { detailSurveyQuestionDetail } from '../../../redux/actions/subvit/survey-question-detail.action'
import { wrapper } from '../../../redux/store'

export default function EditSurveyBankPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title="Edit Soal Survey">
                    <EditSurveyBank />
                </Layout>
            </div>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
    await store.dispatch(detailSurveyQuestionDetail(query.id))
})
