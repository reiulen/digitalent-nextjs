import dynamic from "next/dynamic";
import Layout from "/components/templates/layout.component";
// import StepFour from "../../../../components/content/subvit/substansi/clone/step-four";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";
import { dropdownAkademi } from "../../../../redux/actions/pelatihan/function.actions";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";
import { getAllSubtanceQuestionBanks } from "../../../../redux/actions/subvit/subtance.actions";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { getAllSurveyQuestionDetail } from "../../../../redux/actions/subvit/survey-question-detail.action";

const StepFour = dynamic(
  () => import("../../../../components/content/subvit/survey/clone/step-two"),
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
        <StepFour token={session.token} tokenPermission={props.permission} />
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
        getAllSurveyQuestionDetail(
          query.id,
          query.page,

          query.limit,
          query.keyword,

          session.user.user.data.token,
          permission
        )
      );
      await store.dispatch(
        dropdownAkademi(session.user.user.data.token, permission)
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
