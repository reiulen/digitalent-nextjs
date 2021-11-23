import { getSession } from "next-auth/client";
import EditSurveyStep2 from "../../../../components/content/subvit/survey/edit/step-2";
import Layout from "../../../../components/templates/layout.component";

import { getDetailSurveyQuestionBanks } from "../../../../redux/actions/subvit/survey-question.actions";
import { wrapper } from "../../../../redux/store";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";

export default function EditSurveyStep2Page(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditSurveyStep2 token={session.token} />
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
        getDetailSurveyQuestionBanks(query.id, session.user.user.data.token)
      );
      return {
        props: { session, title: "Edit Test Survey - Step 2" },
      };
    }
);
