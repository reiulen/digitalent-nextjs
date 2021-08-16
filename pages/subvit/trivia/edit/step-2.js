import EditTriviaStep2 from "../../../../components/content/subvit/trivia/edit/step-2";
import Layout from "../../../../components/templates/layout.component";

import { getDetailTriviaQuestionBanks } from '../../../../redux/actions/subvit/trivia-question.actions'
import { wrapper } from '../../../../redux/store'

export default function EditTriviaStep2Page() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Edit Trivia - Step 2">
          <EditTriviaStep2 />
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
  await store.dispatch(getDetailTriviaQuestionBanks(query.id))
})
