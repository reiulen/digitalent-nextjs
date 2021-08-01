import ReportSurvey from '../../../../components/content/subvit/survey/report-survey'
import Layout from '../../../../components/templates/layout.component'

export default function ReportSurveyPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Report Survey'>
                    <ReportSurvey />
                </Layout>
            </div>
        </>
    )
}
