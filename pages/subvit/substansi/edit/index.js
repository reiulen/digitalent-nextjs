import EditSubstansiStep1 from "../../../../components/content/subvit/substansi/edit/step-1";
import { getSession } from "next-auth/client";

import { getDetailSubtanceQuestionBanks } from "../../../../redux/actions/subvit/subtance.actions";
import { wrapper } from "../../../../redux/store";

export default function EditSubstansiStep1Page(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditSubstansiStep1 token={session.token} />
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
            destination: "http://dts-dev.majapahit.id/",
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getDetailSubtanceQuestionBanks(query.id, session.user.user.data.token)
      );

      return {
        props: { session, title: "Ubah Tes Substansi Step 1 - Subvit" },
      };
    }
);
