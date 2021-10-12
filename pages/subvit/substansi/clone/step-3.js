import Layout from "/components/templates/layout.component";
import StepTree from "/components/content/subvit/substansi/clone/step-tree";

import { getDetailSubtanceQuestionBanks } from "../../../../redux/actions/subvit/subtance.actions";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

export default function CloneSoalSubtansi(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <StepTree token={session.token} />
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
        getDetailSubtanceQuestionBanks(query.id, session.user.user.data.token)
      );
      return {
        props: { session, title: "Clone Bank Soal Test Subtansi - Subvit" },
      };
    }
);
