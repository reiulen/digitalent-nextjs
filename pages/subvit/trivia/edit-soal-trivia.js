import EditTriviaBank from "../../../components/content/subvit/trivia/question-bank-soal/edit";
import Layout from "../../../components/templates/layout.component";

import { detailTriviaQuestionDetail } from '../../../redux/actions/subvit/trivia-question-detail.action'
import { wrapper } from '../../../redux/store'

export default function EditTriviaBankPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title="Edit Soal Trivia">
                    <EditTriviaBank />
                </Layout>
            </div>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
    await store.dispatch(detailTriviaQuestionDetail(query.id))
})
