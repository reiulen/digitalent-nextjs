import ListSurvey from '../../../components/content/subvit/survey/list-survey'
import Layout from '../../../components/templates/layout.component'

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
