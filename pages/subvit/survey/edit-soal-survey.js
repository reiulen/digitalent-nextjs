import dynamic from "next/dynamic";
// import EditSurveyBank from "../../../components/content/subvit/survey/question-bank-soal/edit";
import Layout from "../../../components/templates/layout.component";

import { detailSurveyQuestionDetail } from "../../../redux/actions/subvit/survey-question-detail.action";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";
import LoadingSkeleton from "../../../components/LoadingSkeleton";

const EditSurveyBank = dynamic(
  () =>
    import("../../../components/content/subvit/survey/question-bank-soal/edit"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function EditSurveyBankPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditSurveyBank
          token={session.token}
          tokenPermission={props.permission}
        />
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
        detailSurveyQuestionDetail(
          query.id,
          session.user.user.data.token,
          permission
        )
      );
      return {
        props: { session, title: "Edit Soal Survey - Subvit", permission },
      };
    }
);
