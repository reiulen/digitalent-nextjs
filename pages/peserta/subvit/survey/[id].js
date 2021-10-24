import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { getRandomSubtanceQuestionDetail } from "../../../../redux/actions/subvit/subtance-question-detail.action";
import { wrapper } from "../../../../redux/store";
import Layout from "../../../../user-component/components/template/Layout.component";
import { middlewareAuthPesertaSession } from "../../../../utils/middleware/authMiddleware";

const SubtansiUser = dynamic(
  () => import("../../../../user-component/content/subvit/substansi"),
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
        getRandomSubtanceQuestionDetail(
          query.training_id,
          query.theme_id,
          query.category,
          session.user.user.data.token
        )
      );

      return {
        props: {
          data: "auth",
          session,
          title: "Survey - Subvit ",
        },
      };
    }
);
