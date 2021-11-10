import { getSession } from "next-auth/client";
import EditSurveyStep1 from "../../../../components/content/subvit/survey/edit/step-1";
import Layout from "../../../../components/templates/layout.component";
import {
  dropdownAkademi,
  dropdownPelatihan,
  dropdownTema,
} from "../../../../redux/actions/pelatihan/function.actions";

import { getDetailSurveyQuestionBanks } from "../../../../redux/actions/subvit/survey-question.actions";
import { wrapper } from "../../../../redux/store";

export default function EditSurveyStep1Page(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditSurveyStep1 token={session.token} />
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

      await store.dispatch(dropdownAkademi(session.user.user.data.token));
      await store.dispatch(dropdownTema(session.user.user.data.token));
      await store.dispatch(dropdownPelatihan(session.user.user.data.token));

      await store.dispatch(
        getDetailSurveyQuestionBanks(query.id, session.user.user.data.token)
      );
      return {
        props: { session, title: "Edit Test Survey - Step 1" },
      };
    }
);
