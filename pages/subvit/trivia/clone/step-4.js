import dynamic from "next/dynamic";
import Layout from "/components/templates/layout.component";
// import StepTree from "../../../../components/content/subvit/substansi/clone/step-tree";

import { getDetailSubtanceQuestionBanks } from "../../../../redux/actions/subvit/subtance.actions";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { getDetailTriviaQuestionBanks } from "../../../../redux/actions/subvit/trivia-question.actions";

const StepTree = dynamic(
  () => import("../../../../components/content/subvit/trivia/clone/step-tree"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function CloneSoalSubtansi(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <StepTree token={session.token} tokenPermission={props.permission} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });

      const middleware = middlewareAuthAdminSession(session);
      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }

      const permission = req.cookies.token_permission;

      await store.dispatch(
        getDetailTriviaQuestionBanks(
          query.id,
          session.user.user.data.token,
          permission
        )
      );
      return {
        props: { session, title: "Clone Bank  TRIVIA - Subvit", permission },
      };
    }
);
