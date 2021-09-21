import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";

// import ListTrivia from "/components/content/subvit/trivia/list-trivia";
const ListTrivia = dynamic(
  () => import("../../../components/content/subvit/trivia/list-trivia"),
  { suspense: true, loading: () => <LoadingSkeleton /> }
);

import { getAllTriviaQuestionBanks } from "../../../redux/actions/subvit/trivia-question.actions";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

export default function Trivia(props) {
  const session = props.session.user.user.data;

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ListTrivia token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getAllTriviaQuestionBanks(
          query.page,
          query.keyword,
          query.limit,
          session.user.user.data.token
        )
      );

      return {
        props: { session, title: "Trivia - Subvit" },
      };
    }
);
