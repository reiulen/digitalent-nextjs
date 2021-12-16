import dynamic from "next/dynamic";
import Layout from "../../../../components/templates/layout.component";
// import StepTwo from "../../../../components/content/subvit/survey/tambah/step-2-entry";

import { getOneSurveyQuestionBanks } from "../../../../redux/actions/subvit/survey-question.actions";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";

const StepTwo = dynamic(
  () => import("../../../../components/content/subvit/survey/tambah/step-2-entry"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function TambahBankSoalTesSurveyStep2(props) {
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

      const permission = req.cookies.token_permission;

      await store.dispatch(
        getOneSurveyQuestionBanks(
          query.id,
          session.user.user.data.token,
          permission
        )
      );
      return {
        props: {
          session,
          title: "Tambah Bank Soal Tes Survey - Subvit",
          permission,
        },
      };
    }
);
