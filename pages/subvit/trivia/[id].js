import DetailSurvey from '../../../components/content/subvit/survey/detail-survey'
import Layout from '../../../components/templates/layout.component'

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
