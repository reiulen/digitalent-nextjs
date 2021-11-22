import StepTwo from "/components/content/subvit/trivia/tambah/step-2-entry";

import { getOneTriviaQuestionBanks } from "../../../../redux/actions/subvit/trivia-question.actions";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";

export default function TambahBankSoalTesTriviaStep2(props) {
  const session = props.session.user.user.data;

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <StepTwo token={session.token} />
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
      const middleware = middlewareAuthAdminSession(session);
      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }
      await store.dispatch(
        getOneTriviaQuestionBanks(query.id, session.user.user.data.token)
      );
      return {
        props: { session, title: "Step 2 Entry - Subvit" },
      };
    }
);
