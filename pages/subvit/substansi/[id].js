import DetailSubstansi from "../../../components/content/subvit/substansi/detail-substansi";
// import Layout from "../../../components/templates/layout.component";

import { getAllSubtanceQuestionDetail } from "../../../redux/actions/subvit/subtance-question-detail.action";
import { getDetailSubtanceQuestionBanks } from "../../../redux/actions/subvit/subtance.actions";
import { getAllSubtanceQuestionBanksType } from "../../../redux/actions/subvit/subtance-question-type.actions";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";

export default function DetailSubstansiPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DetailSubstansi />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, query, req }) => {
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
        getAllSubtanceQuestionDetail(
          params.id,
          query.page,
          query.keyword,
          query.limit,
          query.status,
          query.category,
          query.pelatihan,
          session.user.user.data.token
        )
      );
      await store.dispatch(
        getDetailSubtanceQuestionBanks(params.id, session.user.user.data.token)
      );
      await store.dispatch(
        getAllSubtanceQuestionBanksType(session.user.user.data.token)
      );

      return {
        props: { session, title: "Detail Substansi - Subvit" },
      };
    }
);
