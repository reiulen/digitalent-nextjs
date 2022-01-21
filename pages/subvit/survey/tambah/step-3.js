import dynamic from "next/dynamic";
import Layout from "../../../../components/templates/layout.component";
// import StepThree from "../../../../components/content/subvit/survey/tambah/step-3";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../redux/store";
import { getOneSurveyQuestionBanks } from "../../../../redux/actions/subvit/survey-question.actions";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";

const StepThree = dynamic(
  () => import("../../../../components/content/subvit/survey/tambah/step-3"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function TambahBankSoalTesSurveyStep3(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <StepThree token={session.token} tokenPermission={props.permission} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, query }) => {
      const session = await getSession({ req });

      const permission = req?.cookies.token_permission;

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
