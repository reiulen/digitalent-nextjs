import EditTriviaStep1 from "../../../../components/content/subvit/trivia/edit/step-1";
import Layout from "../../../../components/templates/layout.component";

import { getDetailTriviaQuestionBanks } from '../../../../redux/actions/subvit/trivia-question.actions'
import { wrapper } from '../../../../redux/store'

export default function EditTriviaStep1Page() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Edit Test Trivia - Step 1">
          <EditTriviaStep1 />
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
  await store.dispatch(getDetailTriviaQuestionBanks(query.id))
})
