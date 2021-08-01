import EditSoalSurvey from '../../../../components/content/subvit/survey/edit-soal-survey'
import Layout from '../../../../components/templates/layout.component'

export default function EditSoalSurveyPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Edit Soal Survey'>
                    <EditSoalSurvey />
                </Layout>
            </div>
        </>
    )
}
