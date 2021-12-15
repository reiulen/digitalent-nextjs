import dynamic from "next/dynamic";
// import DetailTrivia from "../../../components/content/subvit/trivia/detail-trivia";

import { getAllTriviaQuestionDetail } from "../../../redux/actions/subvit/trivia-question-detail.action";
import { getDetailTriviaQuestionBanks } from "../../../redux/actions/subvit/trivia-question.actions";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";
import { getPermissionSubvit } from "../../../redux/actions/subvit/subtance.actions";
import LoadingSkeleton from "../../../components/LoadingSkeleton";

const DetailTrivia = dynamic(
  () => import("../../../components/content/subvit/trivia/detail-trivia"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function DetailTriviaPage(props) {
  const session = props.session.user.user.data;

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DetailTrivia
          token={session.token}
          tokenPermission={props.permission}
        />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, query, req }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "/",
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
        getAllTriviaQuestionDetail(
          params.id,
          query.page,
          query.keyword,
          query.limit,
          session.user.user.data.token
        )
      );

      const permission = req.cookies.token_permission;

      await store.dispatch(
        getDetailTriviaQuestionBanks(
          params.id,
          session.user.user.data.token,
          permission
        )
      );

      await store.dispatch(
        getPermissionSubvit(session.user.user.data.token, permission)
      );
      return {
        props: { session, title: "Detail Trivia - Subvit", permission },
      };
    }
);
