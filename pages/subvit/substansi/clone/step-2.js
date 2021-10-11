import Layout from "/components/templates/layout.component";
import StepTwo from "/components/content/subvit/substansi/clone/step-two";

import { getAllSubtanceQuestionDetail } from "../../../../redux/actions/subvit/subtance-question-detail.action";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

export default function CloneSoalSubtansi(props) {
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
        getAllSubtanceQuestionDetail(
          query.id,
          query.page,
          query.keyword,
          query.limit,
          query.status,
          query.category,
          query.pelatihan,
          session.user.user.data.token
        )
      );
      return {
        props: { session, title: "Clone Bank Soal Tes Subtansi - Subvit" },
      };
    }
);
