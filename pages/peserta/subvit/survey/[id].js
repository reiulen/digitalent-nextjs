import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import Layout from "../../../../user-component/components/template/Layout.component";

import { middlewareAuthPesertaSession } from "../../../../utils/middleware/authMiddleware";
import { getDataPribadi } from "../../../../redux/actions/pelatihan/function.actions";
import { getRandomSurveyQuestionDetail } from "../../../../redux/actions/subvit/survey-question-detail.action";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

const SurveyUser = dynamic(
  () => import("../../../../user-component-new/content/peserta/subvit/survey"),
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
        <Layout title="Survey - Subvit" session={session}>
          <SurveyUser token={session.token} />
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
        getRandomSurveyQuestionDetail(
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
          title: "Survey - Subvit ",
        },
      };
    }
);
