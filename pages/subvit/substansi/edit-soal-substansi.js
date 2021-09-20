import EditSubstansiBank from "../../../components/content/subvit/substansi/question-bank-soal/edit";

import { detailSubtanceQuestionDetail } from "../../../redux/actions/subvit/subtance-question-detail.action";
import { getAllSubtanceQuestionBanksType } from "../../../redux/actions/subvit/subtance-question-type.actions";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

export default function EditSubstansiBankPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditSubstansiBank />
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
            destination: "/",
            permanent: false,
          },
        };
      }

      await store.dispatch(
        detailSubtanceQuestionDetail(query.id, session.user.user.data.token)
      );
      await store.dispatch(
        getAllSubtanceQuestionBanksType(
          query.page,
          query.keyword,
          query.limit,
          session.user.user.data.token
        )
      );

      return {
        props: { session, title: "Edit Soal Substansi - Subvit" },
      };
    }
);
