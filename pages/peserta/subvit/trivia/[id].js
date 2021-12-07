import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { getDataPribadi } from "../../../../redux/actions/pelatihan/function.actions";
import { getRandomSubtanceQuestionDetail } from "../../../../redux/actions/subvit/subtance-question-detail.action";
import { getRandomTriviaQuestionDetail } from "../../../../redux/actions/subvit/trivia-question-detail.action";
import { wrapper } from "../../../../redux/store";
import Layout from "../../../../user-component-new/components/template/Layout-peserta.component";
import { middlewareAuthPesertaSession } from "../../../../utils/middleware/authMiddleware";

const SubtansiUser = dynamic(
  () => import("../../../../user-component-new/content/peserta/subvit/trivia"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function SubvitUserSubtansi(props) {
  const session = props.session.user.user.data.user;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="TRIVIA " session={session}>
          <SubtansiUser token={session.token} />
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });
      const middleware = middlewareAuthPesertaSession(session);

      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getRandomTriviaQuestionDetail(
          query.training_id,
          query.theme_id,
          session.user.user.data.token
        )
      );

      if (session) {
        await store.dispatch(
          getDataPribadi(session?.user.user.data.user.token)
        );
      }

      return {
        props: {
          data: "auth",
          session,
          title: "TRIVIA - Subvit ",
        },
      };
    }
);
