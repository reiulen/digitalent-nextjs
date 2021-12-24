import dynamic from "next/dynamic";
import Layout from "/components/templates/layout.component";
// import StepTwo from "/components/content/subvit/substansi/clone/step-two";
import { getAllSubtanceQuestionDetail } from "../../../../redux/actions/subvit/subtance-question-detail.action";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { getAllSurveyQuestionDetail } from "../../../../redux/actions/subvit/survey-question-detail.action";

const StepTwo = dynamic(
  () => import("/components/content/subvit/survey/clone/step-two"),
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
        <StepTwo token={session.token} tokenPermission={props.permission} />
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

      const permission = req.cookies.token_permission;

      await store.dispatch(
        getAllSurveyQuestionDetail(
          query.id,
          query.page,

          query.limit,
          query.keyword,

          session.user.user.data.token,
          permission
        )
      );
      return {
        props: {
          session,
          title: "Clone Bank Survey - Subvit",
          permission,
        },
      };
    }
);
