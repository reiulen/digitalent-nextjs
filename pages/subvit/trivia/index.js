import ListTrivia from "/components/content/subvit/trivia/list-trivia";
import Layout from "/components/templates/layout.component";

import { getAllTriviaQuestionBanks } from '../../../redux/actions/subvit/trivia-question.actions'
import { wrapper } from '../../../redux/store'

export default function Trivia() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="List Test Trivia">
          <ListTrivia />
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
  await store.dispatch(getAllTriviaQuestionBanks(query.page, query.keyword, query.limit))
})
