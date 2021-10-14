import EditSurveyBank from "../../../components/content/subvit/survey/question-bank-soal/edit";
import Layout from "../../../components/templates/layout.component";

import { detailSurveyQuestionDetail } from "../../../redux/actions/subvit/survey-question-detail.action";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

export default function EditSurveyBankPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditSurveyBank token={session.token} />
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

      await store.dispatch(
        detailSurveyQuestionDetail(query.id, session.user.user.data.token)
      );
      return {
        props: { session, title: "Edit Soal Survey - Subvit" },
      };
    }
);
