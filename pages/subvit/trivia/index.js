import dynamic from "next/dynamic";
import Layout from "/components/templates/layout.component";
import LoadingSkeleton from "../../../components/LoadingSkeleton";

// import ListTrivia from "/components/content/subvit/trivia/list-trivia";
const ListTrivia = dynamic(
  () => import("../../../components/content/subvit/trivia/list-trivia"),
  { suspense: true, loading: () => <LoadingSkeleton /> }
);

import { getAllTriviaQuestionBanks } from "../../../redux/actions/subvit/trivia-question.actions";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      await store.dispatch(
        getAllTriviaQuestionBanks(query.page, query.keyword, query.limit)
      );
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }

      return {
        props: { session },
      };
    }
);
