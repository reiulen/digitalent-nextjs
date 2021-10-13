import EditTriviaStep1 from "../../../../components/content/subvit/trivia/edit/step-1";

import { getDetailTriviaQuestionBanks } from "../../../../redux/actions/subvit/trivia-question.actions";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

export default function EditTriviaStep1Page(props) {
  const session = props.session.user.user.data;

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditTriviaStep1 token={session.token} />
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
            destination: "http://dts-dev.majapahit.id/login/admin",
            permanent: false,
          },
        };
      }
      await store.dispatch(
        getDetailTriviaQuestionBanks(query.id, session.user.user.data.token)
      );

      return {
        props: { session, title: "Ubah Trivia Step 1 - Subvit" },
      };
    }
);
