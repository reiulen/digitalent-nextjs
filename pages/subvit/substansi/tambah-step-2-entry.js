import StepTwo from "/components/content/subvit/substansi/tambah/step-2-entry";

import { getAllSubtanceQuestionBanksType } from "../../../redux/actions/subvit/subtance-question-type.actions";
import { getOneSubtanceQuestionBanks } from "../../../redux/actions/subvit/subtance.actions";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

export default function TambahBankSoalTesSubstansiStep2(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <StepTwo token={session.token} />
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
            destination: "/login/admin",
            permanent: false,
          },
        };
      }
      await store.dispatch(
        getAllSubtanceQuestionBanksType(
          query.page,
          query.keyword,
          query.limit,
          session.user.user.data.token
        )
      );
      await store.dispatch(
        getOneSubtanceQuestionBanks(query.id, session.user.user.data.token)
      );

      return {
        props: { session, title: "Tambah Bank Soal Substansi - Subvit" },
      };
    }
);
