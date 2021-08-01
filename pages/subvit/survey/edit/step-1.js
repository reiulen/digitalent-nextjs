import EditSurveyStep1 from '../../../../components/content/subvit/survey/edit/step-1'
import Layout from '../../../../components/templates/layout.component'

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
