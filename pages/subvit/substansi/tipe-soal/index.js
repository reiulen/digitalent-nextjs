import ListTipeSoal from "../../../../components/content/subvit/substansi/tipe-soal/list";
import Layout from "/components/templates/layout.component";

import { getAllSubtanceQuestionBanksType } from "../../../../redux/actions/subvit/subtance-question-type.actions";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

export default function TipeSoal(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <ListTipeSoal token={session.token} />
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
        getAllSubtanceQuestionBanksType(
          query.page,
          query.keyword,
          query.limit,
          session.user.user.data.token
        )
      );
      return {
        props: { session, title: "Tipe Soal Substansi - Subvit" },
      };
    }
);
