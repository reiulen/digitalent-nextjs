import Layout from "/components/templates/layout.component";
import EditTipeSoal from "../../../../components/content/subvit/substansi/tipe-soal/edit";

import { getDetailSubtanceQuestionBanksType } from "../../../../redux/actions/subvit/subtance-question-type.actions";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

export default function EditTipeSoalTestSubstansi(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditTipeSoal token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, req }) => {
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
        getDetailSubtanceQuestionBanksType(
          params.id,
          session.user.user.data.token
        )
      );
      return {
        props: { session, title: "Ubah Tipe Soal Test Subtansi - Subvit" },
      };
    }
);
